// CIVICGUARD AI - Mobile-First Bottom Navigation Bar
window.BottomNavComponent = {
  render() {
    const store = window.store;
    const t = (k, f) => window.I18N.t(k, f);
    const role = store.currentRole;

    // Show mobile bottom navigation primarily for citizen, but also convenient for field worker
    if (role === 'admin') return '';

    return `
      <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2 flex items-center justify-around shadow-2xl pb-safe">
        
        <!-- Dashboard / Tasks -->
        <button onclick="store.setView('${role === 'citizen' ? 'dashboard' : 'employee'}')" class="flex flex-col items-center gap-1 text-xs ${store.activeView === 'dashboard' || store.activeView === 'employee' ? 'text-sky-600 font-bold' : 'text-slate-500'}">
          <i data-lucide="${role === 'citizen' ? 'layout-dashboard' : 'clipboard-list'}" class="w-5 h-5"></i>
          <span>${role === 'citizen' ? t('dashboard') : 'Tasks'}</span>
        </button>

        <!-- Track Complaint -->
        <button onclick="store.setView('tracking')" class="flex flex-col items-center gap-1 text-xs ${store.activeView === 'tracking' ? 'text-sky-600 font-bold' : 'text-slate-500'}">
          <i data-lucide="map-pin" class="w-5 h-5"></i>
          <span>${t('trackComplaint')}</span>
        </button>

        <!-- Centered Big FAB: Report Problem -->
        ${role === 'citizen' ? `
          <button onclick="window.ReportModalComponent.open()" class="-mt-6 flex flex-col items-center group">
            <div class="w-13 h-13 p-3 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow-lg shadow-sky-500/40 transform group-active:scale-95 transition-all flex items-center justify-center">
              <i data-lucide="plus" class="w-6 h-6 stroke-[2.5]"></i>
            </div>
            <span class="text-[10px] font-bold text-sky-700 mt-1">Report</span>
          </button>
        ` : ''}

        <!-- Voice Assistant Floating Trigger -->
        <button onclick="window.VoiceAssistantModalComponent.open()" class="flex flex-col items-center gap-1 text-xs text-slate-500 hover:text-sky-600">
          <i data-lucide="mic" class="w-5 h-5 text-sky-500 animate-pulse"></i>
          <span>Voice AI</span>
        </button>

        <!-- Persona Switcher -->
        <button onclick="store.setRole('${role === 'citizen' ? 'employee' : 'citizen'}')" class="flex flex-col items-center gap-1 text-xs text-slate-500">
          <i data-lucide="user-check" class="w-5 h-5"></i>
          <span>Switch</span>
        </button>

      </div>
    `;
  }
};
