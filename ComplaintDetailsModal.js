// CIVICGUARD AI - Comprehensive Complaint Details Modal with 5 Sub-Tabs
window.ComplaintDetailsModalComponent = {
  isOpen: false,
  complaintId: null,
  activeTab: 'overview', // 'overview', 'timeline', 'evidence', 'location', 'feedback'

  open(id) {
    this.isOpen = true;
    this.complaintId = id;
    this.activeTab = 'overview';
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  close() {
    this.isOpen = false;
    const root = document.getElementById('details-modal-root');
    if (root) root.innerHTML = '';
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  render() {
    const root = document.getElementById('details-modal-root');
    if (!root) return;

    if (!this.isOpen) {
      root.innerHTML = '';
      return;
    }

    const c = window.store.getComplaint(this.complaintId);
    if (!c) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
        <div class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="p-5 pb-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="font-mono text-sm font-black px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-800 border border-sky-200">
                #${c.id}
              </span>
              <div>
                <h3 class="font-display font-black text-slate-900 text-base leading-tight">${c.title}</h3>
                <p class="text-[11px] text-slate-500">${c.location}</p>
              </div>
            </div>
            <button onclick="window.ComplaintDetailsModalComponent.close()" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- 5 Tabs per Section 17 Specification -->
          <div class="p-2.5 border-b border-slate-100 bg-white">
            <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
              <button onclick="window.ComplaintDetailsModalComponent.setTab('overview')" class="px-3 py-1.5 rounded-xl transition-all ${this.activeTab === 'overview' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">Overview</button>
              <button onclick="window.ComplaintDetailsModalComponent.setTab('timeline')" class="px-3 py-1.5 rounded-xl transition-all ${this.activeTab === 'timeline' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">Timeline</button>
              <button onclick="window.ComplaintDetailsModalComponent.setTab('evidence')" class="px-3 py-1.5 rounded-xl transition-all ${this.activeTab === 'evidence' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">Evidence</button>
              <button onclick="window.ComplaintDetailsModalComponent.setTab('location')" class="px-3 py-1.5 rounded-xl transition-all ${this.activeTab === 'location' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">Location</button>
              <button onclick="window.ComplaintDetailsModalComponent.setTab('feedback')" class="px-3 py-1.5 rounded-xl transition-all ${this.activeTab === 'feedback' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}">Feedback</button>
            </div>
          </div>

          <!-- Tab Content Body -->
          <div class="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
            
            ${this.activeTab === 'overview' ? `
              <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 class="font-bold text-slate-800 text-sm">Grievance Description</h4>
                  <p class="text-slate-600 leading-relaxed">${c.description}</p>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Category</span>
                    <p class="font-bold text-slate-800 mt-0.5">${c.categoryLabel}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Computed Priority</span>
                    <p class="font-bold text-rose-600 mt-0.5">${c.priority.toUpperCase()}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Current Status</span>
                    <p class="font-bold text-sky-600 mt-0.5">${c.status.toUpperCase()}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Reporting Citizen</span>
                    <p class="font-bold text-slate-800 mt-0.5">${c.citizen?.name || 'Citizen'}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Assigned Department</span>
                    <p class="font-bold text-slate-800 mt-0.5 truncate">${c.assignedDepartment}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Field Officer</span>
                    <p class="font-bold text-slate-800 mt-0.5">${c.assignedEmployee?.name || 'Unassigned'}</p>
                  </div>
                </div>

                ${c.aiAnalysis ? `
                  <div class="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                    <h5 class="font-bold text-sky-900 mb-1 flex items-center gap-1.5">
                      <i data-lucide="cpu" class="w-3.5 h-3.5 text-sky-600"></i> AI Diagnostic Summary
                    </h5>
                    <p class="text-sky-800">Confidence: <strong>${c.aiAnalysis.confidence}%</strong> • Urgency: <strong>${c.aiAnalysis.urgency}</strong></p>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            ${this.activeTab === 'timeline' ? `
              <div class="space-y-3">
                <p class="text-slate-500 mb-2">Audit record of grievance transitions:</p>
                <div class="border-l-2 border-sky-400 pl-4 ml-2 space-y-4">
                  <div class="relative">
                    <span class="w-3 h-3 rounded-full bg-sky-500 absolute -left-[23px] top-1"></span>
                    <h5 class="font-bold text-slate-900">Complaint Reported</h5>
                    <p class="text-slate-500 text-[11px]">${c.reportedAt} • Verified by Citizen</p>
                  </div>
                  <div class="relative">
                    <span class="w-3 h-3 rounded-full bg-cyan-500 absolute -left-[23px] top-1"></span>
                    <h5 class="font-bold text-slate-900">AI Triage Completed</h5>
                    <p class="text-slate-500 text-[11px]">Categorized into ${c.categoryLabel} with 96% confidence</p>
                  </div>
                  <div class="relative">
                    <span class="w-3 h-3 rounded-full bg-indigo-500 absolute -left-[23px] top-1"></span>
                    <h5 class="font-bold text-slate-900">Dispatched to Officer Ramesh Kumar</h5>
                    <p class="text-slate-500 text-[11px]">Assigned to Zone 4 Sanitation crew</p>
                  </div>
                  ${c.status === 'completed' || c.status === 'resolved' ? `
                    <div class="relative">
                      <span class="w-3 h-3 rounded-full bg-emerald-500 absolute -left-[23px] top-1"></span>
                      <h5 class="font-bold text-slate-900">Work Completed & AI Verified</h5>
                      <p class="text-slate-500 text-[11px]">Remediation proof uploaded</p>
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            ${this.activeTab === 'evidence' ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-bold text-slate-800 mb-1">Before Remediation</h5>
                  ${c.beforeImage ? `
                    <div class="rounded-xl overflow-hidden border border-slate-200 aspect-video">
                      <img src="${c.beforeImage}" class="w-full h-full object-cover">
                    </div>
                  ` : `<p class="text-slate-400">No before photo</p>`}
                </div>
                <div>
                  <h5 class="font-bold text-slate-800 mb-1">After Remediation Proof</h5>
                  ${c.afterImage ? `
                    <div class="rounded-xl overflow-hidden border border-slate-200 aspect-video">
                      <img src="${c.afterImage}" class="w-full h-full object-cover">
                    </div>
                  ` : `<div class="rounded-xl border border-dashed border-slate-200 aspect-video flex items-center justify-center text-slate-400">Remediation in progress</div>`}
                </div>
              </div>
            ` : ''}

            ${this.activeTab === 'location' ? `
              <div class="space-y-2">
                <p class="text-slate-700 font-semibold">${c.location}</p>
                <p class="text-slate-500 text-[11px]">GPS Coordinates: Lat ${c.lat || 16.5062}, Lng ${c.lng || 80.6480} (Zone 4 District)</p>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span class="text-slate-600">Open in Live City Map</span>
                  <button onclick="window.ComplaintDetailsModalComponent.close(); store.setView('tracking', { complaintId: '${c.id}' });" class="px-3 py-1.5 bg-sky-600 text-white rounded-lg font-bold">
                    View on Route Map
                  </button>
                </div>
              </div>
            ` : ''}

            ${this.activeTab === 'feedback' ? `
              <div>
                ${c.feedback ? `
                  <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left space-y-2">
                    <div class="flex items-center gap-2">
                      <span class="text-amber-500 text-base">★★★★★</span>
                      <span class="font-bold text-amber-900">${c.feedback.rating} / 5 Stars</span>
                    </div>
                    <p class="text-slate-700 italic">“${c.feedback.comment}”</p>
                    <p class="text-[10px] text-slate-400">${c.feedback.date || 'Submitted after resolution'}</p>
                  </div>
                ` : `
                  <div class="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                    <i data-lucide="message-square" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                    <p>No citizen feedback submitted yet for this grievance.</p>
                    <button onclick="window.ComplaintDetailsModalComponent.close(); window.CitizenFeedbackModalComponent.open('${c.id}');" class="mt-3 px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500">
                      Submit Citizen Feedback Now
                    </button>
                  </div>
                `}
              </div>
            ` : ''}

          </div>

          <!-- Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button onclick="window.ComplaintDetailsModalComponent.close()" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100">
              Close
            </button>
            <button onclick="window.ComplaintDetailsModalComponent.close(); store.setView('tracking', { complaintId: '${c.id}' });" class="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> Track Status
            </button>
          </div>

        </div>
      </div>
    `;
  }
};
