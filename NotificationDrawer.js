// CIVICGUARD AI - Real-Time Notification Center Drawer Component
window.NotificationDrawerComponent = {
  isOpen: false,
  activeTab: 'all', // 'all', 'citizen', 'employee', 'admin'

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.activeTab = window.store.currentRole;
    }
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  close() {
    this.isOpen = false;
    const root = document.getElementById('notification-drawer-root');
    if (root) root.innerHTML = '';
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  markAllRead() {
    window.store.markNotificationsRead(this.activeTab === 'all' ? null : this.activeTab);
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  inspectComplaint(id) {
    this.close();
    window.store.setView('tracking', { complaintId: id });
  },

  render() {
    const root = document.getElementById('notification-drawer-root');
    if (!root) return;

    if (!this.isOpen) {
      root.innerHTML = '';
      return;
    }

    const allNotifs = window.store.notifications;
    const filtered = allNotifs.filter(n => this.activeTab === 'all' || n.role === this.activeTab);

    root.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-hidden" onclick="window.NotificationDrawerComponent.close()">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10" onclick="event.stopPropagation()">
          <div class="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slideLeft">
            
            <!-- Drawer Header -->
            <div class="p-5 pb-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <i data-lucide="bell" class="w-4 h-4"></i>
                </div>
                <div>
                  <h3 class="text-sm font-black text-slate-900 font-display">Notifications Hub</h3>
                  <p class="text-[11px] text-slate-500">Live Grid Dispatch & Alerts</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.NotificationDrawerComponent.markAllRead()" class="text-[11px] font-bold text-sky-600 hover:underline">
                  Mark read
                </button>
                <button onclick="window.NotificationDrawerComponent.close()" class="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <!-- Role Tabs per Section 16 -->
            <div class="p-3 border-b border-slate-100 bg-white">
              <div class="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-center text-xs font-bold">
                <button onclick="window.NotificationDrawerComponent.setTab('all')" class="py-1 rounded-lg transition-all ${this.activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}">All</button>
                <button onclick="window.NotificationDrawerComponent.setTab('citizen')" class="py-1 rounded-lg transition-all ${this.activeTab === 'citizen' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500'}">Citizen</button>
                <button onclick="window.NotificationDrawerComponent.setTab('employee')" class="py-1 rounded-lg transition-all ${this.activeTab === 'employee' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-500'}">Worker</button>
                <button onclick="window.NotificationDrawerComponent.setTab('admin')" class="py-1 rounded-lg transition-all ${this.activeTab === 'admin' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}">Admin</button>
              </div>
            </div>

            <!-- Notification Items List -->
            <div class="flex-1 overflow-y-auto p-4 space-y-3">
              ${filtered.length === 0 ? `
                <div class="text-center py-12 text-slate-400">
                  <i data-lucide="bell-off" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                  <p class="text-xs">No notifications for this view</p>
                </div>
              ` : filtered.map(n => `
                <div class="p-3.5 rounded-2xl border transition-all ${
                  n.unread ? 'bg-sky-50/50 border-sky-200' : 'bg-white border-slate-200/80 hover:bg-slate-50'
                } relative group">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        n.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        n.role === 'employee' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-700'
                      }">${n.role}</span>
                      <h4 class="text-xs font-bold text-slate-900">${n.title}</h4>
                    </div>
                    <span class="text-[10px] text-slate-400 shrink-0">${n.time}</span>
                  </div>

                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${n.message}</p>

                  ${n.complaintId ? `
                    <div class="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
                      <span class="font-mono text-[10px] font-bold text-slate-500">#${n.complaintId}</span>
                      <button onclick="window.NotificationDrawerComponent.inspectComplaint('${n.complaintId}')" class="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                        View Issue <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      </div>
    `;
  }
};
