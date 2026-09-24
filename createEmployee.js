const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createEmployee() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/civicguard_db');

    const passwordHash = await bcrypt.hash('Employee@123', 10);

    const employee = await User.create({
      name: 'Ramesh Kumar',
      email: 'ramesh.employee@civicguard.com',
      phone: '',
      passwordHash,
      role: 'employee',
      language: 'en'
    });

    console.log('Employee created successfully!');
    console.log(employee);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createEmployee();