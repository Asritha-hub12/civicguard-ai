// CIVICGUARD AI - Smart-City Command Center & Admin Dashboard
window.AdminDashboardComponent = {
  currentTab: 'overview', // 'overview', 'complaints', 'employees', 'departments', 'zones'

  setTab(tab) {
    this.currentTab = tab;
    const container = document.getElementById('admin-tab-content');
    if (container) {
      container.innerHTML = this.renderTabContent();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  renderTabContent() {
    const store = window.store;
    const complaints = store.getComplaints();
    const depts = window.SAMPLE_DATA.departments;
    const zones = window.SAMPLE_DATA.zones;

    if (this.currentTab === 'complaints') {
      return `
        <div class="glass-panel p-6 rounded-3xl border border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-bold text-slate-900">All Municipal Grievances Master Table</h4>
            <span class="text-xs text-slate-500">Live feed from Vijayawada Municipal Grid</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th class="p-3">ID</th>
                  <th class="p-3">Issue Title</th>
                  <th class="p-3">Category</th>
                  <th class="p-3">Zone / Location</th>
                  <th class="p-3">Priority</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Assigned To</th>
                  <th class="p-3">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${complaints.map(c => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-3 font-mono font-bold text-slate-800">#${c.complaintId || c.id}</td>
                    <td class="p-3 font-semibold text-slate-900">${c.title}</td>
                    <td class="p-3 text-slate-600">${c.categoryLabel}</td>
                    <td class="p-3 text-slate-600 max-w-[150px] truncate">${c.location}</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.priority === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                      }">${c.priority.toUpperCase()}</span>
                    </td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-700'
                      }">${c.status}</span>
                    </td>
                    <td class="p-3 text-slate-700 font-medium">${c.assignedEmployee?.name || 'Unassigned'}</td>
                    <td class="p-3">
                      <button onclick="window.ComplaintDetailsModalComponent.open('${c.complaintId || c.id}')" class="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-bold hover:bg-sky-100">
                        Inspect
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (this.currentTab === 'employees') {
      return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-panel p-5 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Ramesh" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400 mb-2">
            <h4 class="text-sm font-bold text-slate-900">Ramesh Kumar</h4>
            <p class="text-[11px] text-slate-500">Sanitation Field Lead (Zone 4)</p>
            <div class="mt-3 w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between">
              <span>Points: <strong>${window.SAMPLE_DATA.users.employee.score}</strong></span>
              <span>Rating: <strong>4.9 ★</strong></span>
              <span>Tasks: <strong>${window.SAMPLE_DATA.users.employee.tasksCompleted}</strong></span>
            </div>
            <span class="mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active on Beat</span>
          </div>

          <div class="glass-panel p-5 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Sunita" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-400 mb-2">
            <h4 class="text-sm font-bold text-slate-900">Sunita Verma</h4>
            <p class="text-[11px] text-slate-500">Public Works Engineer (Zone 5)</p>
            <div class="mt-3 w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between">
              <span>Points: <strong>780</strong></span>
              <span>Rating: <strong>4.8 ★</strong></span>
              <span>Tasks: <strong>38</strong></span>
            </div>
            <span class="mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">In Field</span>
          </div>

          <div class="glass-panel p-5 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Anil" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400 mb-2">
            <h4 class="text-sm font-bold text-slate-900">Anil Rao</h4>
            <p class="text-[11px] text-slate-500">Electrical Inspector (Zone 3)</p>
            <div class="mt-3 w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between">
              <span>Points: <strong>910</strong></span>
              <span>Rating: <strong>4.95 ★</strong></span>
              <span>Tasks: <strong>45</strong></span>
            </div>
            <span class="mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active on Beat</span>
          </div>
        </div>
      `;
    }

    if (this.currentTab === 'departments') {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${depts.map(d => `
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between">
                <span class="w-3 h-3 rounded-full" style="background: ${d.color}"></span>
                <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">${d.slaRate} SLA</span>
              </div>
              <h4 class="text-sm font-black text-slate-900">${d.name}</h4>
              <p class="text-[11px] text-slate-500">Head: ${d.head}</p>
              <div class="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
                <span>Active Field Crew:</span>
                <strong>${d.activeWorkers} Personnel</strong>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (this.currentTab === 'zones') {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          ${zones.map(z => `
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 text-center">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                z.risk === 'High' ? 'bg-rose-100 text-rose-700' :
                z.risk === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }">${z.risk} Risk Alert</span>
              <h4 class="text-xs font-black text-slate-900 mt-2">${z.name}</h4>
              <p class="text-2xl font-black text-slate-900 font-display mt-2">${z.complaints}</p>
              <p class="text-[10px] text-slate-400 font-semibold">Active Incidents</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Default: 'overview'
    return `
      <!-- Recent Alerts & Quick Map Launcher -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Live Alert Feed -->
        <div class="glass-panel p-6 rounded-3xl border border-slate-200 lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              Live Smart-City Alert Dispatch
            </h4>
            <button onclick="store.setView('map')" class="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1">
              View GIS Map <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="space-y-3">
            <div class="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex items-start gap-3">
              <i data-lucide="alert-octagon" class="w-5 h-5 text-rose-600 shrink-0 mt-0.5"></i>
              <div class="flex-1 text-xs">
                <div class="flex items-center justify-between font-bold text-rose-900">
                  <span>Critical Pipeline Rupture (Zone 1)</span>
                  <span class="text-[10px] text-rose-600">35m ago</span>
                </div>
                <p class="text-rose-800 mt-0.5">Drinking water feeder pipe burst near Old Bus Stand. Pressure drop reported across 1,200 households.</p>
                <div class="mt-2 flex items-center gap-2">
                  <button onclick="store.setView('tracking', { complaintId: 'CG-1028' })" class="px-2.5 py-1 bg-white text-rose-800 rounded-lg font-bold border border-rose-300 hover:bg-rose-100">Inspect Issue</button>
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
              <i data-lucide="trending-up" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
              <div class="flex-1 text-xs">
                <div class="flex items-center justify-between font-bold text-amber-900">
                  <span>Waste Accumulation Spike (Zone 4)</span>
                  <span class="text-[10px] text-amber-600">2h ago</span>
                </div>
                <p class="text-amber-800 mt-0.5">AI detected 38% increase in market garbage reports. Beat Officer Ramesh Kumar on-site with compactor team.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Prescriptive Recommendation Mini Card -->
        <div class="glass-panel-navy text-white p-6 rounded-3xl border border-sky-400/20 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-3 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <i data-lucide="sparkles" class="w-4 h-4"></i> AI Prescriptive Engine
            </div>
            <h4 class="text-base font-bold leading-snug">Autonomous Resource Allocation</h4>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
              “Waste-management complaints have spiked in Zone 4. AI recommends increasing compactor collection frequency from 1x to 3x daily.”
            </p>
          </div>

          <div class="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <span class="text-[11px] text-emerald-400 font-bold">Confidence: 96.8%</span>
            <button onclick="store.setView('analytics')" class="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all">
              Deep Analytics
            </button>
          </div>
        </div>

      </div>
    `;
  },

  render() {
    const store = window.store;
    const complaints = store.getComplaints();
    const user = store.currentUser; // Dr. K. S. Rao

    // 8 Required Statistics from Section 11:
    const totalComplaints = complaints.length + 420; // adding baseline city stats for realism
    const activeComplaints = complaints.filter(c => ['reported', 'ai_analyzed', 'assigned', 'in_progress'].includes(c.status)).length + 18;
    const resolvedComplaints = complaints.filter(c => ['completed', 'verified', 'resolved'].includes(c.status)).length + 395;
    const pendingComplaints = complaints.filter(c => ['reported', 'ai_analyzed'].includes(c.status)).length + 7;
    const avgResolutionTime = '3h 48m';
    const highPriorityComplaints = complaints.filter(c => c.priority === 'high').length + 12;
    const employeePerformance = '96.2%';
    const citizenSatisfaction = '94.8%';

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        
        <!-- Header Banner -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white shadow-xl">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold mb-2">
              <i data-lucide="shield" class="w-3.5 h-3.5"></i> Smart City Command & Control Centre (ICCC)
            </div>
            <h2 class="text-2xl sm:text-3xl font-black font-display tracking-tight">Municipal Command Center</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-0.5">${user.name} • ${user.title}</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="store.setView('map')" class="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2">
              <i data-lucide="map" class="w-4 h-4"></i>
              <span>City GIS Map</span>
            </button>
            <button onclick="store.setView('analytics')" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-2">
              <i data-lucide="bar-chart-3" class="w-4 h-4 text-cyan-400"></i>
              <span>AI Analytics</span>
            </button>
          </div>
        </div>

        <!-- 8 Required Statistics Cards per Specification #11 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          
          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-slate-400 uppercase">Total Complaints</span>
            <p class="text-xl font-black text-slate-900 font-display mt-0.5">${totalComplaints}</p>
            <span class="text-[9px] text-slate-500 font-medium">All wards</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-amber-700 uppercase">Active Complaints</span>
            <p class="text-xl font-black text-amber-600 font-display mt-0.5">${activeComplaints}</p>
            <span class="text-[9px] text-amber-600 font-medium">On-ground</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-emerald-700 uppercase">Resolved</span>
            <p class="text-xl font-black text-emerald-600 font-display mt-0.5">${resolvedComplaints}</p>
            <span class="text-[9px] text-emerald-600 font-medium">Verified</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-slate-500 uppercase">Pending Review</span>
            <p class="text-xl font-black text-sky-600 font-display mt-0.5">${pendingComplaints}</p>
            <span class="text-[9px] text-sky-600 font-medium">Triaged</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-slate-500 uppercase">Avg Resolution</span>
            <p class="text-xl font-black text-slate-900 font-display mt-0.5">${avgResolutionTime}</p>
            <span class="text-[9px] text-emerald-600 font-semibold">⚡ Fast</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-rose-700 uppercase">High Priority</span>
            <p class="text-xl font-black text-rose-600 font-display mt-0.5">${highPriorityComplaints}</p>
            <span class="text-[9px] text-rose-600 font-medium">SLA < 4h</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-indigo-700 uppercase">Worker SLA</span>
            <p class="text-xl font-black text-indigo-600 font-display mt-0.5">${employeePerformance}</p>
            <span class="text-[9px] text-indigo-600 font-medium">On-time</span>
          </div>

          <div class="glass-panel p-3.5 rounded-2xl border border-slate-200 text-center">
            <span class="text-[9px] font-bold text-emerald-700 uppercase">Citizen Trust</span>
            <p class="text-xl font-black text-emerald-600 font-display mt-0.5">${citizenSatisfaction}</p>
            <span class="text-[9px] text-emerald-600 font-medium">Satisfaction</span>
          </div>

        </div>

        <!-- Navigation Tabs per Section 11 -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
            <button onclick="window.AdminDashboardComponent.setTab('overview')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${this.currentTab === 'overview' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">
              Overview
            </button>
            <button onclick="window.AdminDashboardComponent.setTab('complaints')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${this.currentTab === 'complaints' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">
              Complaints (${complaints.length})
            </button>
            <button onclick="window.AdminDashboardComponent.setTab('employees')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${this.currentTab === 'employees' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">
              Employees & Field Officers
            </button>
            <button onclick="window.AdminDashboardComponent.setTab('departments')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${this.currentTab === 'departments' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">
              Departments (${window.SAMPLE_DATA.departments.length})
            </button>
            <button onclick="window.AdminDashboardComponent.setTab('zones')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${this.currentTab === 'zones' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">
              Municipal Zones
            </button>
          </div>

          <!-- Tab Content Area -->
          <div id="admin-tab-content">
            ${this.renderTabContent()}
          </div>
        </div>

      </div>
    `;
  }
};
