// CIVICGUARD AI - Completion Evidence Verification Modal (Before vs After Image Comparison)
window.VerificationModalComponent = {
  isOpen: false,
  complaintId: null,
  afterImagePreview: null,
  isVerifyingAI: false,

  open(complaintId) {
    this.isOpen = true;
    this.complaintId = complaintId;
    const comp = window.store.getComplaint(complaintId);
    this.afterImagePreview = comp.afterImage || window.store.getSampleAfterImage(comp.category);
    this.isVerifyingAI = false;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  close() {
    this.isOpen = false;
    const root = document.getElementById('verification-modal-root');
    if (root) root.innerHTML = '';
  },

  handleAfterUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.afterImagePreview = event.target.result;
        this.render();
        if (window.lucide) window.lucide.createIcons();
      };
      reader.readAsDataURL(file);
    }
  },

  setPresetAfterImage() {
    const comp = window.store.getComplaint(this.complaintId);
    this.afterImagePreview = window.store.getSampleAfterImage(comp.category);
    this.render();
    if (window.lucide) window.lucide.createIcons();
    window.store.showToast('Cleaned resolution proof photo loaded', 'info');
  },

  async confirmCompletion() {
    this.isVerifyingAI = true;
    this.render();
    if (window.lucide) window.lucide.createIcons();

    // Call service layer for AI Verification
    const comp = window.store.getComplaint(this.complaintId);
    await window.civicService.verifyResolutionAI(comp.beforeImage, this.afterImagePreview);

    await window.store.completeTask(
  this.complaintId,
  this.afterImagePreview
);
    this.isVerifyingAI = false;
    this.close();

    // Re-render current view
    if (window.store.activeView === 'employee') {
      window.EmployeeDashboardComponent.render();
    }
  },

  render() {
    const root = document.getElementById('verification-modal-root');
    if (!root) return;

    if (!this.isOpen) {
      root.innerHTML = '';
      return;
    }

    const comp = window.store.getComplaint(this.complaintId);
    const beforeImg = comp.beforeImage || window.SAMPLE_DATA.sampleImages.garbage_before;
    const afterImg = this.afterImagePreview;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
        <div class="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-md">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-slate-900 text-base">Resolution Proof & Verification</h3>
                <p class="text-[11px] text-slate-500">Task #${comp.id} • ${comp.title}</p>
              </div>
            </div>
            <button onclick="window.VerificationModalComponent.close()" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 overflow-y-auto space-y-6">
            
            <!-- Timing & Resolution Summary Banner per Section 8 Specification -->
            <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-center">
              <div>
                <span class="text-[10px] font-bold text-slate-500 uppercase">Complaint Reported</span>
                <p class="text-sm font-black text-slate-800 mt-0.5">${comp.reportedAt || '10:30 AM'}</p>
              </div>
              <div class="border-x border-sky-200">
                <span class="text-[10px] font-bold text-slate-500 uppercase">Work Completed</span>
                <p class="text-sm font-black text-teal-700 mt-0.5">2:15 PM (Just now)</p>
              </div>
              <div>
                <span class="text-[10px] font-bold text-slate-500 uppercase">Total Resolution Time</span>
                <p class="text-sm font-black text-emerald-700 mt-0.5">3h 45m</p>
              </div>
            </div>

            <!-- Side-by-Side Before & After Images -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Before Image -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span class="flex items-center gap-1.5 text-rose-600">
                    <span class="w-2 h-2 rounded-full bg-rose-500"></span> Before Image (Citizen Upload)
                  </span>
                  <span class="text-slate-400 text-[10px]">Reported: 10:30 AM</span>
                </div>
                <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-video relative">
                  <img src="${beforeImg}" alt="Before remediation" class="w-full h-full object-cover">
                  <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-rose-600/80 text-[10px] text-white font-bold">
                    Anomaly Present
                  </div>
                </div>
              </div>

              <!-- After Image -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span class="flex items-center gap-1.5 text-emerald-600">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> After Image (Worker Completion)
                  </span>
                  <span class="text-slate-400 text-[10px]">Completed: 2:15 PM</span>
                </div>
                
                ${afterImg ? `
                  <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-video relative group">
                    <img src="${afterImg}" alt="After remediation" class="w-full h-full object-cover">
                    <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-600/80 text-[10px] text-white font-bold">
                      Remediated Spot
                    </div>
                    <label class="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-[10px] font-bold text-white cursor-pointer transition-all">
                      Replace Photo
                      <input type="file" accept="image/*" class="hidden" onchange="window.VerificationModalComponent.handleAfterUpload(event)">
                    </label>
                  </div>
                ` : `
                  <div class="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center flex flex-col items-center justify-center aspect-video bg-slate-50">
                    <i data-lucide="camera" class="w-8 h-8 text-slate-400 mb-2"></i>
                    <p class="text-xs font-bold text-slate-700">Upload clean completion photo</p>
                    <div class="mt-3 flex gap-2">
                      <label class="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer hover:bg-sky-500">
                        Upload
                        <input type="file" accept="image/*" class="hidden" onchange="window.VerificationModalComponent.handleAfterUpload(event)">
                      </label>
                      <button type="button" onclick="window.VerificationModalComponent.setPresetAfterImage()" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                        Use Sample Clean Photo
                      </button>
                    </div>
                  </div>
                `}
              </div>

            </div>

            <!-- AI Verification Result Card per Section 8 Specification -->
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <i data-lucide="check-check" class="w-5 h-5"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-black uppercase tracking-wider text-emerald-800">AI Visual Verification</h4>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Vision Match 96%
                  </span>
                </div>
                <p class="text-xs text-emerald-900 mt-1 font-medium">
                  “Completion evidence appears consistent with the reported civic issue. Thorough cleanup and obstruction removal detected.”
                </p>
              </div>
            </div>

          </div>

          <!-- Footer Confirmation -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button onclick="window.VerificationModalComponent.close()" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100">
              Cancel
            </button>

            <button onclick="window.VerificationModalComponent.confirmCompletion()" ${this.isVerifyingAI ? 'disabled' : ''} class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-extrabold shadow-md shadow-teal-500/20 transition-all flex items-center gap-2">
              ${this.isVerifyingAI ? `
                <span class="animate-spin">⚙️</span>
                <span>AI Checking Evidence...</span>
              ` : `
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Mark Work Completed (+50 Points)</span>
              `}
            </button>
          </div>

        </div>
      </div>
    `;
  }
};
