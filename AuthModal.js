// CIVICGUARD AI - Role-Based Authentication Modal
window.AuthModalComponent = {
  isOpen: false,
  mode: 'login', // 'login' or 'register'
  currentTab: 'citizen', // 'citizen', 'employee', 'admin'
  showPassword: false,

  open(tab = 'citizen', mode = 'login') {
    this.isOpen = true;
    this.currentTab = tab;
    this.mode = mode;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  close() {
    this.isOpen = false;
    const modal = document.getElementById('auth-modal-root');
    if (modal) modal.innerHTML = '';
  },

  togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.getElementById('auth-password-input');
    const icon = document.getElementById('auth-password-icon');
    if (input) input.type = this.showPassword ? 'text' : 'password';
    if (icon) {
      icon.setAttribute('data-lucide', this.showPassword ? 'eye-off' : 'eye');
      if (window.lucide) window.lucide.createIcons();
    }
  },

  async handleLogin(e) {
  if (e) e.preventDefault();

  const emailInput = document.querySelector('form input[type="text"]');
  const passwordInput = document.getElementById('auth-password-input');

  const email = emailInput?.value?.trim();
  const password = passwordInput?.value;

  if (!email || !password) {
    window.store.showToast('Please enter email and password.', 'error');
    return;
  }

  const btn = document.getElementById('auth-submit-btn');

  if (btn) {
    btn.innerHTML = `<span class="inline-block animate-spin mr-2">⚙️</span> Authenticating...`;
    btn.disabled = true;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }

    // Store JWT token
    localStorage.setItem('civicguard_token', data.token);

    // Store real logged-in user
    localStorage.setItem('civicguard_user', JSON.stringify(data.user));

    // Update frontend role/user
    window.store.currentRole = data.user.role;
    window.store.currentUser = data.user;

    // Open correct dashboard
    if (data.user.role === 'citizen') {
      window.store.activeView = 'dashboard';
    } else if (data.user.role === 'employee') {
      window.store.activeView = 'employee';
    } else if (data.user.role === 'admin') {
      window.store.activeView = 'admin';
    }

    window.store.notify('role:changed', {
      role: data.user.role,
      user: data.user
    });

    this.close();

    window.store.showToast(
      `Welcome back, ${data.user.name}!`,
      'success'
    );

  } catch (error) {
    console.error('Login error:', error);

    window.store.showToast(
      error.message || 'Unable to connect to the server.',
      'error'
    );

    if (btn) {
      btn.innerHTML = `Sign In as ${this.currentTab.charAt(0).toUpperCase() + this.currentTab.slice(1)}`;
      btn.disabled = false;
    }
  }
},
  async handleRegister(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('reg-name')?.value?.trim();
  const email = document.getElementById('reg-email')?.value?.trim();
  const location = document.getElementById('reg-location')?.value?.trim();
  const userType = document.getElementById('reg-usertype')?.value || 'citizen';

  // Get the registration password
  const passwordInput = document.querySelector(
    'input[type="password"]:not(#auth-password-input)'
  );
  const password = passwordInput?.value;

  if (!name || !email || !password) {
    window.store.showToast('Please fill all required fields.', 'error');
    return;
  }

  const btn = document.getElementById('auth-submit-btn');

  if (btn) {
    btn.innerHTML = `<span class="inline-block animate-spin mr-2">⚙️</span> Creating Account...`;
    btn.disabled = true;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: userType,
        phone: '',
        language: 'en'
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    // Save JWT if backend returns one
    if (data.token) {
      localStorage.setItem('civicguard_token', data.token);
    }

    if (data.user) {
      localStorage.setItem(
        'civicguard_user',
        JSON.stringify(data.user)
      );

      window.store.currentRole = data.user.role;
      window.store.currentUser = data.user;

      if (data.user.role === 'citizen') {
        window.store.activeView = 'dashboard';
      } else if (data.user.role === 'employee') {
        window.store.activeView = 'employee';
      } else if (data.user.role === 'admin') {
        window.store.activeView = 'admin';
      }

      window.store.notify('role:changed', {
        role: data.user.role,
        user: data.user
      });
    }

    this.close();

    window.store.showToast(
      `Account registered successfully! Welcome, ${name}.`,
      'success'
    );

  } catch (error) {
    console.error('Registration error:', error);

    window.store.showToast(
      error.message || 'Unable to connect to the server.',
      'error'
    );

    if (btn) {
      btn.innerHTML = 'Create CIVICGUARD AI Account';
      btn.disabled = false;
    }
  }
},

  quickLogin(role) {
    this.currentTab = role;
    this.handleLogin();
  },

  render() {
    const root = document.getElementById('auth-modal-root');
    if (!root) return;

    if (!this.isOpen) {
      root.innerHTML = '';
      return;
    }

    const t = (k, f) => window.I18N.t(k, f);
    const tabColors = {
      citizen: 'sky',
      employee: 'amber',
      admin: 'purple'
    };
    const activeColor = tabColors[this.currentTab];

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative" onclick="event.stopPropagation()">
          
          <!-- Header Bar -->
          <div class="p-6 pb-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-slate-900 text-base">CIVICGUARD AI</h3>
                <p class="text-[11px] text-slate-500">Secure Role-Based Portal</p>
              </div>
            </div>
            <button onclick="window.AuthModalComponent.close()" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Role Selector Tabs -->
          <div class="p-4 bg-white border-b border-slate-100">
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Portal Role:</p>
            <div class="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button onclick="window.AuthModalComponent.open('citizen', '${this.mode}')" class="py-1.5 text-xs font-bold rounded-lg transition-all ${this.currentTab === 'citizen' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                Citizen
              </button>
              <button onclick="window.AuthModalComponent.open('employee', '${this.mode}')" class="py-1.5 text-xs font-bold rounded-lg transition-all ${this.currentTab === 'employee' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                Employee
              </button>
              <button onclick="window.AuthModalComponent.open('admin', '${this.mode}')" class="py-1.5 text-xs font-bold rounded-lg transition-all ${this.currentTab === 'admin' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                Admin
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6">
            
            ${this.mode === 'login' ? `
              <!-- Login Form -->
              <form onsubmit="window.AuthModalComponent.handleLogin(event)" class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Email or Mobile Number</label>
                  <div class="relative">
                    <input type="text" required value="${
                      this.currentTab === 'citizen' ? 'ananya.sharma@example.com' :
this.currentTab === 'employee' ? 'ramesh.employee@civicguard.com' : 'admin@civicguard.com'
                    }" class="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                    <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-bold text-slate-700">Password</label>
                    <a href="javascript:void(0)" onclick="alert('Demo Mode: Default password is prepopulated for evaluation.')" class="text-[11px] font-semibold text-sky-600 hover:underline">Forgot password?</a>
                  </div>
                  <div class="relative">
                    <input id="auth-password-input" type="password" required value="Admin@123" class="w-full px-3.5 py-2.5 pl-9 pr-10 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                    <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                    <button type="button" onclick="window.AuthModalComponent.togglePassword()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <i id="auth-password-icon" data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between text-xs">
                  <label class="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input type="checkbox" checked class="rounded border-slate-300 text-sky-600 focus:ring-sky-500">
                    <span>Remember this device</span>
                  </label>
                  <span class="text-emerald-600 font-bold flex items-center gap-1">
                    <i data-lucide="shield" class="w-3 h-3"></i> 256-Bit SSL
                  </span>
                </div>

                <button id="auth-submit-btn" type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r ${
                  this.currentTab === 'citizen' ? 'from-sky-600 to-cyan-600' :
                  this.currentTab === 'employee' ? 'from-amber-600 to-orange-600' : 'from-purple-600 to-indigo-600'
                } text-white font-bold text-sm shadow-md hover:opacity-95 transition-all">
                  Sign In as ${this.currentTab.charAt(0).toUpperCase() + this.currentTab.slice(1)}
                </button>

                <!-- 1-Click Fast Demo Login for Judges -->
                <div class="pt-2">
                  <button type="button" onclick="window.AuthModalComponent.quickLogin('${this.currentTab}')" class="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                    <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500"></i> Instant 1-Click Judge Demo Login
                  </button>
                </div>
              </form>
            ` : `
              <!-- Registration Form -->
              <form onsubmit="window.AuthModalComponent.handleRegister(event)" class="space-y-3.5">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input id="reg-name" type="text" required placeholder="e.g. Ramesh Kumar" value="Priya Sundaram" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Email / Mobile Number</label>
                  <input id="reg-email" type="text" required placeholder="priya@example.com" value="priya.s@example.com" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Location / Ward</label>
                  <input id="reg-location" type="text" required placeholder="e.g. Zone 4, Vijayawada" value="Zone 3, Suryaraopet, Vijayawada" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                  <select id="reg-usertype" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                    <option value="citizen">Citizen (General Public)</option>
                    <option value="employee">Municipal Field Employee</option>
                    <option value="admin">City Administrator / Commissioner</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <input type="password" required value="CivicSecurePass#2026" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                </div>

                <button id="auth-submit-btn" type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:opacity-95 transition-all">
                  Create CIVICGUARD AI Account
                </button>
              </form>
            `}

            <!-- Footer Switch -->
            <div class="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              ${this.mode === 'login' ? `
                Don't have an account yet? 
                <button onclick="window.AuthModalComponent.open('${this.currentTab}', 'register')" class="font-bold text-sky-600 hover:underline">Register now</button>
              ` : `
                Already registered? 
                <button onclick="window.AuthModalComponent.open('${this.currentTab}', 'login')" class="font-bold text-sky-600 hover:underline">Log in</button>
              `}
            </div>

          </div>

        </div>
      </div>
    `;
  }
};
