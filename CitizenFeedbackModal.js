// CIVICGUARD AI - Citizen Feedback & Star Rating Modal
window.CitizenFeedbackModalComponent = {
  isOpen: false,
  complaintId: null,
  currentRating: 5,
  hoverRating: 0,

  open(complaintId) {
    this.isOpen = true;
    this.complaintId = complaintId;
    this.currentRating = 5;
    this.hoverRating = 0;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  close() {
    this.isOpen = false;
    const root = document.getElementById('feedback-modal-root');
    if (root) root.innerHTML = '';
  },

  setRating(val) {
    this.currentRating = val;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  setHover(val) {
    this.hoverRating = val;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  async submitFeedback() {
    const comment = document.getElementById('feedback-comment-textarea')?.value || 'Prompt and clean resolution by municipal staff.';
    await window.store.submitFeedback(this.complaintId, this.currentRating, comment);
    this.close();
  },

  render() {
    const root = document.getElementById('feedback-modal-root');
    if (!root) return;

    if (!this.isOpen) {
      root.innerHTML = '';
      return;
    }

    const comp = window.store.getComplaint(this.complaintId);
    const worker = comp.assignedEmployee || window.SAMPLE_DATA.users.employee;
    const ratingToDisplay = this.hoverRating || this.currentRating;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="p-5 pb-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <i data-lucide="star" class="w-4 h-4 fill-amber-500 text-amber-500"></i>
              </span>
              <div>
                <h3 class="font-display font-black text-slate-900 text-base">Citizen Rating & Feedback</h3>
                <p class="text-[11px] text-slate-500">Grievance #${comp.id}</p>
              </div>
            </div>
            <button onclick="window.CitizenFeedbackModalComponent.close()" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 text-center space-y-4">
            
            <div>
              <h4 class="text-base font-bold text-slate-900">How was your civic issue resolved?</h4>
              <p class="text-xs text-slate-500 mt-1">Your review directly credits performance points to the field worker.</p>
            </div>

            <!-- Worker mini card -->
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-left">
              <img src="${worker.avatar}" alt="${worker.name}" class="w-10 h-10 rounded-xl object-cover ring-1 ring-amber-400">
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-900">${worker.name}</p>
                <p class="text-[11px] text-slate-500 truncate">Field Officer • ${comp.assignedDepartment || 'Sanitation'}</p>
              </div>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                Resolved in 3h 45m
              </span>
            </div>

            <!-- 5-Star Interactive Rating System -->
            <div class="py-2">
              <div class="flex items-center justify-center gap-2">
                ${[1, 2, 3, 4, 5].map(star => `
                  <button type="button" onclick="window.CitizenFeedbackModalComponent.setRating(${star})" onmouseenter="window.CitizenFeedbackModalComponent.setHover(${star})" onmouseleave="window.CitizenFeedbackModalComponent.setHover(0)" class="p-1 transform hover:scale-125 transition-transform">
                    <i data-lucide="star" class="w-8 h-8 ${
                      star <= ratingToDisplay 
                        ? 'fill-amber-400 text-amber-400 drop-shadow-sm' 
                        : 'text-slate-300'
                    }"></i>
                  </button>
                `).join('')}
              </div>
              <p class="text-xs font-bold text-amber-600 mt-2">
                ${ratingToDisplay === 5 ? '⭐⭐⭐⭐⭐ Exceptional Service!' :
                  ratingToDisplay === 4 ? '⭐⭐⭐⭐ Good and Prompt Resolution' :
                  ratingToDisplay === 3 ? '⭐⭐⭐ Satisfactory Resolution' :
                  ratingToDisplay === 2 ? '⭐⭐ Needs Improvement' : '⭐ Unsatisfactory'}
              </p>
            </div>

            <!-- Feedback Comment Box -->
            <div class="text-left">
              <label class="block text-xs font-bold text-slate-700 mb-1">Optional Feedback</label>
              <textarea id="feedback-comment-textarea" rows="2" class="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" placeholder="Share your experience with the field worker or speed of resolution..."></textarea>
              
              <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                <button type="button" onclick="document.getElementById('feedback-comment-textarea').value='Prompt action by field staff! Area is completely clean.'" class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 hover:bg-slate-200">Spotless cleanup</button>
                <button type="button" onclick="document.getElementById('feedback-comment-textarea').value='Worker was very polite and completed work quickly.'" class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 hover:bg-slate-200">Courteous staff</button>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="button" onclick="window.CitizenFeedbackModalComponent.submitFeedback()" class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all">
              Submit Feedback & Close Complaint
            </button>

          </div>

        </div>
      </div>
    `;
  }
};
