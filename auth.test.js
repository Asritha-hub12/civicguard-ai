const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

process.env.NODE_ENV = 'test';

// Load environment variables
dotenv.config();

// Ensure JWT secret is set for tests
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test_secret_for_civicguard_authentication_test_suite_2026';
}

const User = require('../models/User');
const { app } = require('../server');

// Helper to make HTTP requests using Node native http module
function makeRequest({ method, path, headers = {}, body = null, port }) {
  return new Promise((resolve, reject) => {
    const serializedBody = body ? JSON.stringify(body) : null;
    const reqHeaders = { ...headers };

    if (serializedBody) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(serializedBody);
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: reqHeaders,
      },
      (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = responseData ? JSON.parse(responseData) : null;
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: parsed,
              raw: responseData,
            });
          } catch (e) {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: null,
              raw: responseData,
            });
          }
        });
      }
    );

    req.on('error', reject);

    if (serializedBody) {
      req.write(serializedBody);
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log('   CIVICGUARD AI - Authentication Test Suite (Phase 1)');
  console.log('======================================================\n');

  let mongod = null;
  let server = null;
  const TEST_PORT = 5099;

  // Step 1: Connect to Database (try in-memory MongoDB first, fallback to configured MONGODB_URI)
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    console.log('[Setup] Starting embedded MongoDB test instance...');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.disconnect(); // Disconnect from default server.js connection
    await mongoose.connect(uri);
    console.log(`[Setup] Connected to embedded MongoDB at: ${uri}`);
  } catch (err) {
    console.log(`[Setup] In-memory MongoDB notice: ${err.message}`);
    console.log(`[Setup] Connecting to configured URI: ${process.env.MONGODB_URI}`);
    await mongoose.connect(process.env.MONGODB_URI);
  }

  // Clear existing test collections
  await User.deleteMany({});

  // Step 2: Start test HTTP server
  server = await new Promise((resolve) => {
    const s = app.listen(TEST_PORT, () => {
      console.log(`[Setup] Test server listening on http://127.0.0.1:${TEST_PORT}\n`);
      resolve(s);
    });
  });

  const stats = { passed: 0, failed: 0, tests: [] };

  function assert(title, condition, detail = '') {
    if (condition) {
      console.log(`  PASS: ${title}`);
      stats.passed++;
      stats.tests.push({ title, status: 'PASS' });
    } else {
      console.error(`  FAIL: ${title} ${detail ? `(${detail})` : ''}`);
      stats.failed++;
      stats.tests.push({ title, status: 'FAIL', detail });
    }
  }

  let citizenToken = '';
  let adminToken = '';

  try {
    // -------------------------------------------------------------
    // TEST 1: Health Check Endpoint
    // -------------------------------------------------------------
    console.log('--- Suite 1: Server Health ---');
    const healthRes = await makeRequest({
      method: 'GET',
      path: '/api/health',
      port: TEST_PORT,
    });
    assert('Health check returns 200 OK', healthRes.status === 200);
    assert('Health status is online', healthRes.body && healthRes.body.status === 'online');

    // -------------------------------------------------------------
    // TEST 2: Register a Citizen User
    // -------------------------------------------------------------
    console.log('\n--- Suite 2: User Registration ---');
    const regRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/register',
      port: TEST_PORT,
      body: {
        name: 'Ananya Sharma',
        email: 'ananya.sharma@example.com',
        phone: '+91 9876543210',
        password: 'CivicSecurePassword#2026',
        role: 'admin', // SECURITY ATTEMPT: Trying to register directly as admin!
        language: 'te',
      },
    });

    assert('Registration returns HTTP 201 Created', regRes.status === 201);
    assert('Registration response has success: true', regRes.body && regRes.body.success === true);
    assert('Registration returns a valid JWT token', typeof regRes.body?.token === 'string' && regRes.body.token.length > 20);
    assert('Registration strips passwordHash from returned user', regRes.body?.user?.passwordHash === undefined);
    assert(
      'Security: Public registration forces role="citizen" (ignores requested "admin")',
      regRes.body?.user?.role === 'citizen',
      `Got role: ${regRes.body?.user?.role}`
    );
    assert('Registration persists correct name', regRes.body?.user?.name === 'Ananya Sharma');
    assert('Registration persists normalized lowercase email', regRes.body?.user?.email === 'ananya.sharma@example.com');

    // -------------------------------------------------------------
    // TEST 3: Duplicate Email Prevention
    // -------------------------------------------------------------
    console.log('\n--- Suite 3: Duplicate Email Validation ---');
    const dupRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/register',
      port: TEST_PORT,
      body: {
        name: 'Another User',
        email: 'ANANYA.SHARMA@EXAMPLE.COM', // Different case
        password: 'AnotherPassword123',
      },
    });
    assert('Duplicate email registration rejected with HTTP 400', dupRes.status === 400);
    assert('Duplicate email returns success: false', dupRes.body && dupRes.body.success === false);

    // -------------------------------------------------------------
    // TEST 4: Login with Correct Credentials
    // -------------------------------------------------------------
    console.log('\n--- Suite 4: Login Authentication ---');
    const loginSuccessRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/login',
      port: TEST_PORT,
      body: {
        email: 'ananya.sharma@example.com',
        password: 'CivicSecurePassword#2026',
      },
    });
    assert('Login with correct credentials returns HTTP 200 OK', loginSuccessRes.status === 200);
    assert('Login response contains success: true', loginSuccessRes.body && loginSuccessRes.body.success === true);
    assert('Login returns JWT token', typeof loginSuccessRes.body?.token === 'string');
    assert('Login response returns user profile without passwordHash', loginSuccessRes.body?.user?.passwordHash === undefined);
    assert('Login user role is citizen', loginSuccessRes.body?.user?.role === 'citizen');

    citizenToken = loginSuccessRes.body?.token;

    // -------------------------------------------------------------
    // TEST 5: Login with Incorrect Credentials
    // -------------------------------------------------------------
    const loginFailRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/login',
      port: TEST_PORT,
      body: {
        email: 'ananya.sharma@example.com',
        password: 'WrongPassword#999',
      },
    });
    assert('Login with incorrect password returns HTTP 401 Unauthorized', loginFailRes.status === 401);
    assert('Login with non-existent email returns HTTP 401 Unauthorized', (await makeRequest({
      method: 'POST',
      path: '/api/auth/login',
      port: TEST_PORT,
      body: { email: 'nobody@nowhere.com', password: 'Password123' },
    })).status === 401);

    // -------------------------------------------------------------
    // TEST 6: Get Authenticated User Profile (GET /api/auth/me)
    // -------------------------------------------------------------
    console.log('\n--- Suite 5: Protected Route (GET /api/auth/me) ---');
    const meRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/me',
      port: TEST_PORT,
      headers: {
        Authorization: `Bearer ${citizenToken}`,
      },
    });
    assert('GET /api/auth/me with valid token returns HTTP 200 OK', meRes.status === 200);
    assert('GET /api/auth/me returns matching user email', meRes.body?.user?.email === 'ananya.sharma@example.com');
    assert('GET /api/auth/me returns role="citizen"', meRes.body?.user?.role === 'citizen');
    assert('GET /api/auth/me excludes passwordHash', meRes.body?.user?.passwordHash === undefined);

    // -------------------------------------------------------------
    // TEST 7: Invalid or Missing JWT Handling
    // -------------------------------------------------------------
    console.log('\n--- Suite 6: Token Verification & Guardrails ---');
    const noTokenRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/me',
      port: TEST_PORT,
    });
    assert('Request with missing Authorization header returns HTTP 401', noTokenRes.status === 401);

    const badTokenRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/me',
      port: TEST_PORT,
      headers: {
        Authorization: 'Bearer this.is.a.completely.tampered.token',
      },
    });
    assert('Request with invalid JWT token returns HTTP 401', badTokenRes.status === 401);

    // -------------------------------------------------------------
    // TEST 8: Role-Based Authorization
    // -------------------------------------------------------------
    console.log('\n--- Suite 7: Role-Based Authorization Access Control ---');

    // Citizen attempting to access Admin-only route
    const citizenToAdminRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/test/admin',
      port: TEST_PORT,
      headers: {
        Authorization: `Bearer ${citizenToken}`,
      },
    });
    assert('Citizen accessing Admin-only endpoint returns HTTP 403 Forbidden', citizenToAdminRes.status === 403);

    // Citizen accessing Citizen route
    const citizenToCitizenRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/test/citizen',
      port: TEST_PORT,
      headers: {
        Authorization: `Bearer ${citizenToken}`,
      },
    });
    assert('Citizen accessing Citizen endpoint returns HTTP 200 OK', citizenToCitizenRes.status === 200);

    // Seed an authoritative Admin user in DB to verify Admin role authorization
    const adminPasswordHash = await bcrypt.hash('AdminSecurePass#2026', 10);
    const adminUser = await User.create({
      name: 'Commissioner Dr. K. S. Rao',
      email: 'commissioner@vijayawada.gov.in',
      phone: '+91 8662425000',
      passwordHash: adminPasswordHash,
      role: 'admin',
      language: 'en',
    });

    const adminLoginRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/login',
      port: TEST_PORT,
      body: {
        email: 'commissioner@vijayawada.gov.in',
        password: 'AdminSecurePass#2026',
      },
    });
    adminToken = adminLoginRes.body?.token;
    assert('Admin user logs in successfully', adminLoginRes.status === 200 && adminLoginRes.body?.user?.role === 'admin');

    // Admin accessing Admin-only route
    const adminToAdminRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/test/admin',
      port: TEST_PORT,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    assert('Admin accessing Admin endpoint returns HTTP 200 OK', adminToAdminRes.status === 200);

    // Admin accessing Employee endpoint (permitted because admin has supervisory role)
    const adminToEmployeeRes = await makeRequest({
      method: 'GET',
      path: '/api/auth/test/employee',
      port: TEST_PORT,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    assert('Admin accessing Employee endpoint returns HTTP 200 OK', adminToEmployeeRes.status === 200);

  } catch (testErr) {
    console.error('Fatal test error:', testErr);
    stats.failed++;
  } finally {
    // Teardown
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }

    console.log('\n======================================================');
    console.log(` Test Execution Finished: ${stats.passed} Passed, ${stats.failed} Failed`);
    console.log('======================================================\n');

    if (stats.failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}

runTests();
