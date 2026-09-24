// CIVICGUARD AI - Frosted Modern Navbar Component
window.NavbarComponent = {
  render() {
    const store = window.store;
    const t = (k, f) => window.I18N.t(k, f);
    const role = store.currentRole;
    const user = store.currentUser;
    const unreadCount = store.notifications.filter(n => n.role === role && n.unread).length;
    const currentLang = window.I18N.currentLang;

    // Navigation links per role
    let navLinks = '';
    if (role === 'citizen') {
      navLinks = `
        <button onclick="store.setView('dashboard')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'dashboard' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="layout-dashboard" class="w-4 h-4 inline mr-1.5"></i>${t('dashboard')}
        </button>
        <button onclick="window.ReportModalComponent.open()" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100/60">
          <i data-lucide="plus-circle" class="w-4 h-4 inline mr-1.5 text-sky-500"></i>${t('reportProblem')}
        </button>
        <button onclick="store.setView('tracking')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'tracking' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="map-pin" class="w-4 h-4 inline mr-1.5"></i>${t('trackComplaint')}
        </button>
      `;
    } else if (role === 'employee') {
      navLinks = `
        <button onclick="store.setView('employee')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'employee' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="clipboard-list" class="w-4 h-4 inline mr-1.5"></i>Assigned Tasks
        </button>
        <button onclick="store.setView('tracking')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'tracking' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="navigation" class="w-4 h-4 inline mr-1.5"></i>Live Route
        </button>
      `;
    } else if (role === 'admin') {
      navLinks = `
        <button onclick="store.setView('admin')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'admin' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="shield" class="w-4 h-4 inline mr-1.5"></i>Command Center
        </button>
        <button onclick="store.setView('map')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'map' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="map" class="w-4 h-4 inline mr-1.5"></i>City GIS Map
        </button>
        <button onclick="store.setView('analytics')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'analytics' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
          <i data-lucide="bar-chart-3" class="w-4 h-4 inline mr-1.5"></i>AI Analytics
        </button>
      `;
    }

    return `
      <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          <!-- Logo & Brand Tagline -->
          <div class="flex items-center gap-3 cursor-pointer" onclick="store.setView('${role === 'citizen' ? 'dashboard' : role}')">
            <div class="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-sky-500/20 flex items-center justify-center text-white">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-display font-black text-lg tracking-tight text-slate-900">CIVICGUARD <span class="text-sky-600">AI</span></span>
                <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">GovTech</span>
              </div>
              <p class="text-[11px] font-medium text-slate-500 tracking-wide">“${t('tagline')}”</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/60">
            <button onclick="store.setView('landing')" class="nav-item px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all ${store.activeView === 'landing' ? 'bg-sky-50 text-sky-600 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
              <i data-lucide="home" class="w-4 h-4 inline mr-1.5"></i>Home
            </button>
            ${navLinks}
          </nav>

          <!-- Action Controls (Language, Voice Assistant, Notifications, Profile) -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Language Switcher -->
            <div class="relative">
              <select onchange="window.I18N.setLang(this.value)" class="appearance-none bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer shadow-sm">
                <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
                <option value="hi" ${currentLang === 'hi' ? 'selected' : ''}>🇮🇳 हिन्दी</option>
                <option value="te" ${currentLang === 'te' ? 'selected' : ''}>🇮🇳 తెలుగు</option>
                <option value="or" ${currentLang === 'or' ? 'selected' : ''}>🇮🇳 ଓଡ଼ିଆ</option>
              </select>
              <i data-lucide="globe" class="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"></i>
            </div>

            <!-- Voice Assistant Trigger Button -->
            <button onclick="window.VoiceAssistantModalComponent.open()" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-600 transition-all transform active:scale-95">
              <i data-lucide="mic" class="w-3.5 h-3.5 animate-pulse"></i>
              <span>${t('askVoice')}</span>
            </button>

            <!-- Notifications Bell -->
            <button onclick="window.NotificationDrawerComponent.toggle()" class="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all">
              <i data-lucide="bell" class="w-5 h-5"></i>
              ${unreadCount > 0 ? `
                <span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">${unreadCount}</span>
              ` : ''}
            </button>

            <!-- Persona Switcher Pill (Crucial for Hackathon Judges) -->
            <div class="relative group">
              <button class="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 transition-all text-xs font-semibold text-slate-700">
                <img src="${user.avatar}" alt="${user.name}" class="w-6 h-6 rounded-lg object-cover ring-1 ring-sky-500/40">
                <span class="hidden lg:inline-block truncate max-w-[100px]">${user.name.split(' ')[0]}</span>
                <span class="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded ${
                  role === 'admin' ? 'bg-purple-100 text-purple-700' :
                  role === 'employee' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-700'
                }">${role}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>

              <!-- Persona Dropdown -->
              <div class="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 hidden group-hover:block transition-all z-50">
                <div class="px-3 py-2 border-b border-slate-100">
                  <p class="text-xs font-bold text-slate-900">${user.name}</p>
                  <p class="text-[11px] text-slate-500 truncate">${user.email}</p>
                </div>
                <div class="p-1.5">
                  <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Switch Demo Persona:</div>
                  <button onclick="store.setRole('citizen')" class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 ${role === 'citizen' ? 'bg-sky-50/80 text-sky-700 font-bold' : ''}">
                    <span class="w-2 h-2 rounded-full bg-sky-500"></span> Citizen (Ananya)
                  </button>
                  <button onclick="store.setRole('employee')" class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 ${role === 'employee' ? 'bg-amber-50/80 text-amber-700 font-bold' : ''}">
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span> Field Worker (Ramesh)
                  </button>
                  <button onclick="store.setRole('admin')" class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 ${role === 'admin' ? 'bg-purple-50/80 text-purple-700 font-bold' : ''}">
                    <span class="w-2 h-2 rounded-full bg-purple-500"></span> City Admin (Dr. Rao)
                  </button>
                </div>
                <div class="border-t border-slate-100 p-1.5">
                  <button onclick="window.AuthModalComponent.open()" class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">
                    <i data-lucide="log-in" class="w-3.5 h-3.5"></i> Custom Login / Register
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    `;
  }
};
