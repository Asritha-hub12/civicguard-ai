// CIVICGUARD AI - Citizen Dashboard Component
window.CitizenDashboardComponent = {
  filterStatus: 'all',
  searchQuery: '',
  refreshComplaints() {
  const container = document.getElementById('citizen-complaints-list');

  if (container) {
    container.innerHTML = this.renderComplaintsList();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
},

  setFilter(status) {
    this.filterStatus = status;
    const container = document.getElementById('citizen-complaints-list');
    if (container) {
      container.innerHTML = this.renderComplaintsList();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  handleSearch(query) {
    this.searchQuery = query.toLowerCase();
    const container = document.getElementById('citizen-complaints-list');
    if (container) {
      container.innerHTML = this.renderComplaintsList();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  renderComplaintsList() {
    const store = window.store;
    const all = store.getComplaints();
    const t = (k, f) => window.I18N.t(k, f);

    const filtered = all.filter(c => {
      const matchStatus = this.filterStatus === 'all' || 
        (this.filterStatus === 'active' && ['reported', 'ai_analyzed', 'assigned', 'in_progress'].includes(c.status)) ||
        (this.filterStatus === 'completed' && ['completed', 'verified'].includes(c.status)) ||
        (this.filterStatus === 'resolved' && c.status === 'resolved');
      
      const matchQuery = !this.searchQuery || 
        (c.id || c.complaintId).toLowerCase().includes(this.searchQuery) ||
        c.title.toLowerCase().includes(this.searchQuery) ||
        c.location.toLowerCase().includes(this.searchQuery) ||
        c.categoryLabel.toLowerCase().includes(this.searchQuery);

      return matchStatus && matchQuery;
    });

    if (filtered.length === 0) {
      return `
        <div class="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <i data-lucide="inbox" class="w-6 h-6"></i>
          </div>
          <h4 class="text-sm font-bold text-slate-700">No complaints found</h4>
          <p class="text-xs text-slate-500 mt-1">Try resetting your filters or report a new issue.</p>
        </div>
      `;
    }

    return filtered.map(c => {
      const complaintId=c.complaintId || c.id;
      console.log("COMPLAINT ID:", complaintId);
      const statusBadgeColors = {
        reported: 'bg-blue-50 text-blue-700 border-blue-200',
        ai_analyzed: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        assigned: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        in_progress: 'bg-amber-50 text-amber-800 border-amber-200',
        completed: 'bg-teal-50 text-teal-800 border-teal-200',
        verified: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        resolved: 'bg-green-50 text-green-800 border-green-200'
      };

      const priorityColors = {
        high: 'text-rose-600 bg-rose-50 border-rose-200',
        medium: 'text-amber-600 bg-amber-50 border-amber-200',
        low: 'text-slate-600 bg-slate-100 border-slate-200'
      };

      return `
        <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/90 glass-card-hover transition-all">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                #${complaintId}
              </span>
              <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${statusBadgeColors[c.status] || 'bg-slate-100 text-slate-700'}">
                ● ${t(`statuses.${c.status}`, c.status)}
              </span>
              <span class="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${priorityColors[c.priority]}">
                ${c.priority.toUpperCase()} PRIORITY
              </span>
            </div>
            <span class="text-xs text-slate-400 font-medium flex items-center gap-1">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recently'}
            </span>
          </div>

          <div class="flex flex-col md:flex-row gap-4 items-start">
            <!-- Thumbnail preview if available -->
            ${c.beforeImage ? `
              <div class="w-full sm:w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative group">
                <img src="${c.beforeImage}" alt="Complaint" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <span class="absolute bottom-1 right-1 px-1 py-0.2 bg-slate-900/70 text-[9px] text-white rounded">Before</span>
              </div>
            ` : ''}

            <!-- Details -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm sm:text-base font-bold text-slate-900 hover:text-sky-600 cursor-pointer transition-colors" onclick="window.ComplaintDetailsModalComponent.open('${complaintId}')">
                ${c.title}
              </h4>
              <p class="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">${c.description}</p>
              
              <div class="mt-2.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 font-medium">
                <span class="flex items-center gap-1">
                  <i data-lucide="tag" class="w-3.5 h-3.5 text-sky-500"></i> ${c.categoryLabel}
                </span>
                <span class="flex items-center gap-1 truncate">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500"></i> ${c.location}
                </span>
                ${c.assignedEmployee ? `
                  <span class="flex items-center gap-1 text-slate-700 font-semibold">
                    <i data-lucide="user-check" class="w-3.5 h-3.5 text-amber-500"></i> ${c.assignedEmployee.name}
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
              <button onclick="store.setView('tracking', { complaintId: '${complaintId}' })" class="flex-1 sm:flex-none w-full px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-sky-200/80">
                <i data-lucide="activity" class="w-3.5 h-3.5"></i> Track
              </button>
              <button onclick="window.ComplaintDetailsModalComponent.open('${complaintId}')" class="flex-1 sm:flex-none w-full px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i> Details
              </button>
              ${c.status === 'completed' && !c.feedback?.rating ? `
                <button onclick="window.CitizenFeedbackModalComponent.open('${complaintId}')" class="flex-1 sm:flex-none w-full px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <i data-lucide="star" class="w-3.5 h-3.5"></i> Rate Work
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },
  render() {
    const store = window.store;
    const user = store.currentUser;
    const complaints = store.getComplaints();
    const t = (k, f) => window.I18N.t(k, f);
    const totalSubmitted = complaints.filter(c => c.complaintId).length;
    
    const activeCount = complaints.filter(c =>
  ['submitted', 'reported', 'ai_analyzed', 'assigned', 'in_progress'].includes(c.status)
).length;
    const resolvedCount = complaints.filter(c =>
  ['resolved', 'closed'].includes(c.status)
).length;
    const avgTime = '3.4 Hours';

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        
        <!-- Welcome Hero & Big Action Card -->
        <div class="relative rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 p-6 sm:p-8 text-white shadow-xl shadow-sky-500/20 overflow-hidden">
          <div class="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="max-w-xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/20">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-cyan-200"></i>
                <span>Zone 4 Civic Portal • Vijayawada</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome, ${user.name}!
              </h2>
              <p class="mt-2 text-sm sm:text-base text-sky-100 leading-relaxed">
                Spot a civic grievance in your neighborhood? Upload a photo or speak in your native language. Our AI automatically classifies urgency and routes it to the local field crew.
              </p>
            </div>

            <!-- Large "Report a Civic Problem" Button -->
            <div class="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button onclick="window.ReportModalComponent.open()" class="px-7 py-4 rounded-2xl bg-white text-sky-700 font-extrabold text-base shadow-lg hover:bg-sky-50 hover:shadow-xl hover:scale-102 transition-all transform active:scale-98 flex items-center justify-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                  <i data-lucide="camera" class="w-4 h-4"></i>
                </div>
                <span>${t('reportCivicProblem')}</span>
              </button>

              <button onclick="window.VoiceAssistantModalComponent.open()" class="px-5 py-3 rounded-2xl bg-sky-500/30 hover:bg-sky-500/50 text-white font-bold text-xs backdrop-blur-md border border-white/25 transition-all flex items-center justify-center gap-2">
                <i data-lucide="mic" class="w-4 h-4 text-cyan-200 animate-pulse"></i>
                <span>Speak Grievance in Native Language</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4 KPI Summary Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <!-- Card 1: My Reports -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-200/80 glass-card-hover">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${t('myReports')}</span>
              <div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <i data-lucide="file-text" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="mt-3 text-2xl sm:text-3xl font-black text-slate-900 font-display">${totalSubmitted}</p>
            <p class="text-[11px] text-slate-400 font-medium mt-1">Submitted from your device</p>
          </div>

          <!-- Card 2: Active Complaints -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-200/80 glass-card-hover">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${t('activeComplaints')}</span>
              <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <i data-lucide="clock-4" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="mt-3 text-2xl sm:text-3xl font-black text-amber-600 font-display">${activeCount}</p>
            <p class="text-[11px] text-amber-600 font-semibold mt-1">● Being processed by field crew</p>
          </div>

          <!-- Card 3: Resolved -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-200/80 glass-card-hover">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${t('resolvedComplaints')}</span>
              <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="mt-3 text-2xl sm:text-3xl font-black text-emerald-600 font-display">${resolvedCount}</p>
            <p class="text-[11px] text-emerald-600 font-semibold mt-1">✓ Closed & verified</p>
          </div>

          <!-- Card 4: Avg Resolution Time -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-200/80 glass-card-hover">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${t('avgResolutionTime')}</span>
              <div class="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <i data-lucide="zap" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="mt-3 text-2xl sm:text-3xl font-black text-slate-900 font-display">${avgTime}</p>
            <p class="text-[11px] text-emerald-600 font-semibold mt-1">⚡ 18% faster this month</p>
          </div>

        </div>

        <!-- Complaints Header & Interactive Filter Bar -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-black text-slate-900 font-display">My Civic Reports & Grievances</h3>
              <p class="text-xs text-slate-500">Live lifecycle tracking from dispatch to verification</p>
            </div>

            <!-- Search input -->
            <div class="relative w-full sm:w-64">
              <input type="text" placeholder="Search by ID or keywords..." oninput="window.CitizenDashboardComponent.handleSearch(this.value)" class="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-xs">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            </div>
          </div>

          <!-- Status Filters -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1">
            <button onclick="window.CitizenDashboardComponent.setFilter('all')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.filterStatus === 'all' ? 'bg-sky-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
              All Complaints (${complaints.length})
            </button>
            <button onclick="window.CitizenDashboardComponent.setFilter('active')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.filterStatus === 'active' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
              Active (${activeCount})
            </button>
            <button onclick="window.CitizenDashboardComponent.setFilter('completed')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.filterStatus === 'completed' ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
              Completed (${complaints.filter(c => ['completed', 'verified'].includes(c.status)).length})
            </button>
            <button onclick="window.CitizenDashboardComponent.setFilter('resolved')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.filterStatus === 'resolved' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
              Closed & Resolved (${complaints.filter(c => c.status === 'resolved').length})
            </button>
          </div>

          <!-- Complaints List Container -->
          <div id="citizen-complaints-list" class="space-y-3.5">
            ${this.renderComplaintsList()}
          </div>
        </div>

      </div>
    `;
  }
};
