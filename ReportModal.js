// CIVICGUARD AI - Step-by-Step Problem Reporting Wizard with AI Scanner
window.ReportModalComponent = {
  isOpen: false,
  currentStep: 1, // 1: Description & Category, 2: Evidence Upload, 3: Location, 4: AI Scanner & Finalize
  mapInstance: null,
  mapMarker: null,

  formData: {
    category: 'garbage',
    categoryLabel: 'Garbage & Waste',
    description: '',
    evidenceImage: null,
    locationAddress: 'Opposite Rythu Bazar, MG Road, Zone 4, Vijayawada',
    lat: 16.5062,
    lng: 80.6480,
    aiAnalysis: null,
    isAnalyzing: false
  },

  open() {
    this.isOpen = true;
    this.currentStep = 1;
    this.formData = {
      category: 'garbage',
      categoryLabel: 'Garbage & Waste',
      description: 'Solid waste and plastic bags overflowing on the roadside pedestrian walk, causing foul smell and health hazard.',
      evidenceImage: window.SAMPLE_DATA.sampleImages.garbage_before,
      locationAddress: 'Opposite Rythu Bazar, MG Road, Zone 4, Vijayawada',
      lat: 16.5062,
      lng: 80.6480,
      aiAnalysis: null,
      isAnalyzing: false
    };
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  close() {
    this.isOpen = false;
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
    const root = document.getElementById('report-modal-root');
    if (root) root.innerHTML = '';
  },

  setCategory(catKey, catLabel) {
    this.formData.category = catKey;
    this.formData.categoryLabel = catLabel;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  setPresetPhoto(photoKey) {
    const samples = window.SAMPLE_DATA.sampleImages;
    if (photoKey === 'garbage') {
      this.formData.evidenceImage = samples.garbage_before;
      this.formData.category = 'garbage';
      this.formData.categoryLabel = 'Garbage & Waste';
      this.formData.description = 'Overflowing garbage bin and scattered solid plastic waste obstructing pedestrians.';
    } else if (photoKey === 'pothole') {
      this.formData.evidenceImage = samples.pothole_before;
      this.formData.category = 'roads';
      this.formData.categoryLabel = 'Roads & Potholes';
      this.formData.description = 'Deep hazardous pothole on main road lane dangerous for two-wheelers and night traffic.';
    } else if (photoKey === 'streetlight') {
      this.formData.evidenceImage = samples.streetlight_before;
      this.formData.category = 'streetlights';
      this.formData.categoryLabel = 'Street Lights';
      this.formData.description = 'Four street poles completely dark causing public safety concerns after dusk.';
    } else if (photoKey === 'water') {
      this.formData.evidenceImage = samples.water_leak_before;
      this.formData.category = 'water';
      this.formData.categoryLabel = 'Water Supply';
      this.formData.description = 'Underground municipal water pipeline burst, flooding the residential road with fresh drinking water.';
    }
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.formData.evidenceImage = event.target.result;
        this.render();
        if (window.lucide) window.lucide.createIcons();
      };
      reader.readAsDataURL(file);
    }
  },

  triggerCamera() {
    // Simulates instant camera capture with sample snapshot
    this.formData.evidenceImage = window.SAMPLE_DATA.sampleImages.garbage_before;
    window.store.showToast('Camera snapshot captured successfully!', 'success');
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  goToStep(step) {
    this.currentStep = step;
    this.render();
    if (window.lucide) window.lucide.createIcons();

    if (step === 3) {
      setTimeout(() => this.initStepMap(), 150);
    }

    if (step === 4) {
      this.runAIAnalysis();
    }
  },

  initStepMap() {
    const mapDiv = document.getElementById('report-step-map');
    if (!mapDiv || typeof L === 'undefined') return;

    if (this.mapInstance) {
      this.mapInstance.remove();
    }

    this.mapInstance = L.map('report-step-map').setView([this.formData.lat, this.formData.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapInstance);

    const pinIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
          <i data-lucide="map-pin" class="w-5 h-5"></i>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    this.mapMarker = L.marker([this.formData.lat, this.formData.lng], {
      draggable: true,
      icon: pinIcon
    }).addTo(this.mapInstance);

    this.mapMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      this.formData.lat = pos.lat;
      this.formData.lng = pos.lng;
      this.formData.locationAddress = `Near GPS Pin (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}), Zone 4, Vijayawada`;
      const addrInput = document.getElementById('report-address-input');
      if (addrInput) addrInput.value = this.formData.locationAddress;
    });

    if (window.lucide) window.lucide.createIcons();
  },

  detectCurrentLocation() {
    this.formData.locationAddress = 'Ward 14, Near Rythu Bazar, MG Road, Vijayawada (GPS Detected)';
    this.formData.lat = 16.5062;
    this.formData.lng = 80.6480;
    if (this.mapInstance && this.mapMarker) {
      this.mapInstance.setView([16.5062, 80.6480], 16);
      this.mapMarker.setLatLng([16.5062, 80.6480]);
    }
    const input = document.getElementById('report-address-input');
    if (input) input.value = this.formData.locationAddress;
    window.store.showToast('Current GPS Coordinates Detected', 'info');
  },

  async runAIAnalysis() {
    this.formData.isAnalyzing = true;
    this.render();
    if (window.lucide) window.lucide.createIcons();

    // Call service layer for AI inference
    const result = await window.civicService.analyzeEvidenceAI(
      this.formData.description,
      this.formData.category,
      this.formData.evidenceImage
    );

    this.formData.aiAnalysis = result;
    this.formData.isAnalyzing = false;
    this.render();
    if (window.lucide) window.lucide.createIcons();
  },

  async submitComplaint() {
  const desc =
    document.getElementById('report-description-textarea')?.value ||
    this.formData.description;

  const addr =
    document.getElementById('report-address-input')?.value ||
    this.formData.locationAddress;

  const token = localStorage.getItem('civicguard_token');

  if (!token) {
    window.store.showToast(
      'Please sign in before submitting a complaint.',
      'error'
    );
    return;
  }

  try {
    const response = await fetch(
      'http://localhost:5000/api/complaints',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: `${this.formData.categoryLabel} Issue`,
          category: this.formData.category,
          categoryLabel: this.formData.categoryLabel,
          description: desc,
          location: addr,
          latitude: this.formData.lat,
          longitude: this.formData.lng,
          priority:
            this.formData.aiAnalysis?.priority?.toLowerCase() || 'high',
          beforeImage: this.formData.evidenceImage,
          aiAnalysis: this.formData.aiAnalysis
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || 'Failed to submit complaint'
      );
    }

    window.store.showToast(
      'Complaint submitted successfully!',
      'success'
    );

    this.close();

    window.store.setView('tracking', {
      complaintId: data.complaint.complaintId
    });

  } catch (error) {
    console.error('Complaint submission error:', error);

    window.store.showToast(
      error.message || 'Unable to submit complaint.',
      'error'
    );
  }
},

  render() {
    const root = document.getElementById('report-modal-root');
    if (!root) return;

    if (!this.isOpen) {
      root.innerHTML = '';
      return;
    }

    const t = (k, f) => window.I18N.t(k, f);
    const categories = [
      { id: 'garbage', label: 'Garbage & Waste', icon: 'trash-2', color: 'teal' },
      { id: 'roads', label: 'Roads & Potholes', icon: 'cone', color: 'blue' },
      { id: 'streetlights', label: 'Street Lights', icon: 'lightbulb', color: 'amber' },
      { id: 'water', label: 'Water Supply', icon: 'droplet', color: 'cyan' },
      { id: 'drainage', label: 'Drainage & Sewage', icon: 'waves', color: 'indigo' },
      { id: 'electricity', label: 'Electricity & Grid', icon: 'zap', color: 'yellow' },
      { id: 'safety', label: 'Public Safety', icon: 'shield-alert', color: 'rose' },
      { id: 'other', label: 'Other Civic Issue', icon: 'help-circle', color: 'slate' }
    ];

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]" onclick="event.stopPropagation()">
          
          <!-- Modal Header with Stepper Progress -->
          <div class="p-5 pb-3 bg-slate-50 border-b border-slate-200/80">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                  <i data-lucide="plus-circle" class="w-4 h-4"></i>
                </div>
                <div>
                  <h3 class="font-display font-black text-slate-900 text-base">Report a Civic Grievance</h3>
                  <p class="text-[11px] text-slate-500">CIVICGUARD AI Automated Triage Pipeline</p>
                </div>
              </div>
              <button onclick="window.ReportModalComponent.close()" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Stepper Progress Bar -->
            <div class="grid grid-cols-4 gap-2 text-center text-xs font-bold">
              <div class="flex items-center gap-1.5 ${this.currentStep >= 1 ? 'text-sky-600' : 'text-slate-400'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${this.currentStep >= 1 ? 'bg-sky-600 text-white font-black' : 'bg-slate-200 text-slate-600'}">1</span>
                <span class="hidden sm:inline">Describe</span>
              </div>
              <div class="flex items-center gap-1.5 ${this.currentStep >= 2 ? 'text-sky-600' : 'text-slate-400'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${this.currentStep >= 2 ? 'bg-sky-600 text-white font-black' : 'bg-slate-200 text-slate-600'}">2</span>
                <span class="hidden sm:inline">Evidence</span>
              </div>
              <div class="flex items-center gap-1.5 ${this.currentStep >= 3 ? 'text-sky-600' : 'text-slate-400'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${this.currentStep >= 3 ? 'bg-sky-600 text-white font-black' : 'bg-slate-200 text-slate-600'}">3</span>
                <span class="hidden sm:inline">Location</span>
              </div>
              <div class="flex items-center gap-1.5 ${this.currentStep >= 4 ? 'text-sky-600' : 'text-slate-400'}">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${this.currentStep >= 4 ? 'bg-sky-600 text-white font-black' : 'bg-slate-200 text-slate-600'}">4</span>
                <span class="hidden sm:inline">AI Analysis</span>
              </div>
            </div>
            <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div class="bg-gradient-to-r from-sky-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300" style="width: ${(this.currentStep / 4) * 100}%"></div>
            </div>
          </div>

          <!-- Modal Scrollable Content Area -->
          <div class="p-6 overflow-y-auto flex-1 space-y-5">
            
            ${this.currentStep === 1 ? `
              <!-- Step 1: Describe the Problem & Category -->
              <div>
                <h4 class="text-sm font-bold text-slate-900 mb-1">Step 1: Select Category & Describe the Problem</h4>
                <p class="text-xs text-slate-500 mb-3">Choose the type of civic grievance affecting your street or ward.</p>

                <!-- Category Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  ${categories.map(c => `
                    <button type="button" onclick="window.ReportModalComponent.setCategory('${c.id}', '${c.label}')" class="p-3 rounded-2xl border text-left transition-all flex flex-col items-start gap-1.5 ${
                      this.formData.category === c.id 
                        ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-500/20 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }">
                      <div class="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center ${this.formData.category === c.id ? 'text-sky-600' : 'text-slate-600'}">
                        <i data-lucide="${c.icon}" class="w-4 h-4"></i>
                      </div>
                      <span class="text-xs font-bold ${this.formData.category === c.id ? 'text-sky-900' : 'text-slate-800'}">${c.label}</span>
                    </button>
                  `).join('')}
                </div>

                <!-- Problem Description -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Problem Description</label>
                  <textarea id="report-description-textarea" rows="3" class="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" placeholder="Provide details such as exact landmarks, severity, or danger to pedestrians...">${this.formData.description}</textarea>
                  
                  <!-- Suggestion chips -->
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span class="text-[10px] font-bold text-slate-400">Quick Fill:</span>
                    <button type="button" onclick="document.getElementById('report-description-textarea').value='Solid waste container overflowing for 24h near vegetable market.'; window.ReportModalComponent.formData.description=document.getElementById('report-description-textarea').value" class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 hover:bg-slate-200">Garbage overflow</button>
                    <button type="button" onclick="document.getElementById('report-description-textarea').value='Dangerous pothole causing traffic jams on main lane.'; window.ReportModalComponent.formData.description=document.getElementById('report-description-textarea').value" class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 hover:bg-slate-200">Deep pothole</button>
                    <button type="button" onclick="document.getElementById('report-description-textarea').value='Dark streetlights making area unsafe after 7 PM.'; window.ReportModalComponent.formData.description=document.getElementById('report-description-textarea').value" class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 hover:bg-slate-200">Streetlight dark</button>
                  </div>
                </div>
              </div>
            ` : ''}

            ${this.currentStep === 2 ? `
              <!-- Step 2: Upload Evidence & Camera -->
              <div>
                <h4 class="text-sm font-bold text-slate-900 mb-1">Step 2: Upload Photographic Evidence</h4>
                <p class="text-xs text-slate-500 mb-3">Clear photographs enable CIVICGUARD AI to verify urgency and dispatch appropriate municipal equipment.</p>

                <!-- 1-Click Judge Presets for Instant Testing -->
                <div class="p-3 rounded-2xl bg-sky-50/70 border border-sky-200/80 mb-4">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-sky-900 mb-2">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-sky-600"></i>
                    <span>Judge Fast Presets (Click any to test instant AI scan):</span>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button type="button" onclick="window.ReportModalComponent.setPresetPhoto('garbage')" class="px-2.5 py-1.5 rounded-xl bg-white text-[11px] font-bold text-teal-800 border border-teal-200 hover:bg-teal-50 transition-all text-center">
                      🗑️ Garbage Heap
                    </button>
                    <button type="button" onclick="window.ReportModalComponent.setPresetPhoto('pothole')" class="px-2.5 py-1.5 rounded-xl bg-white text-[11px] font-bold text-blue-800 border border-blue-200 hover:bg-blue-50 transition-all text-center">
                      🕳️ Road Pothole
                    </button>
                    <button type="button" onclick="window.ReportModalComponent.setPresetPhoto('streetlight')" class="px-2.5 py-1.5 rounded-xl bg-white text-[11px] font-bold text-amber-800 border border-amber-200 hover:bg-amber-50 transition-all text-center">
                      💡 Dark Streetlight
                    </button>
                    <button type="button" onclick="window.ReportModalComponent.setPresetPhoto('water')" class="px-2.5 py-1.5 rounded-xl bg-white text-[11px] font-bold text-cyan-800 border border-cyan-200 hover:bg-cyan-50 transition-all text-center">
                      💧 Pipe Burst
                    </button>
                  </div>
                </div>

                <!-- Preview or Upload Box -->
                ${this.formData.evidenceImage ? `
                  <div class="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-video group">
                    <img src="${this.formData.evidenceImage}" alt="Civic Evidence" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                      <div class="text-white">
                        <span class="px-2 py-0.5 rounded-md bg-emerald-500/80 text-[10px] font-bold">Photo Attached</span>
                        <p class="text-xs font-semibold mt-1 text-slate-200">Evidence verified for AI computer vision model</p>
                      </div>
                    </div>
                    <button type="button" onclick="window.ReportModalComponent.formData.evidenceImage = null; window.ReportModalComponent.render();" class="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors">
                      <i data-lucide="trash" class="w-4 h-4"></i>
                    </button>
                  </div>
                ` : `
                  <div class="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-sky-400 transition-colors bg-slate-50/50">
                    <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 mx-auto flex items-center justify-center mb-3">
                      <i data-lucide="camera" class="w-6 h-6"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-800">Drag & drop evidence photo here</p>
                    <p class="text-[11px] text-slate-500 mt-0.5">Supports JPG, PNG, HEIC up to 15MB</p>
                    
                    <div class="mt-4 flex items-center justify-center gap-3">
                      <label class="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer hover:bg-sky-500 transition-all shadow-xs">
                        Browse Files
                        <input type="file" accept="image/*" class="hidden" onchange="window.ReportModalComponent.handleFileUpload(event)">
                      </label>
                      <button type="button" onclick="window.ReportModalComponent.triggerCamera()" class="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all">
                        Simulate Camera Snap
                      </button>
                    </div>
                  </div>
                `}
              </div>
            ` : ''}

            ${this.currentStep === 3 ? `
              <!-- Step 3: Location & Interactive Map Pin -->
              <div>
                <h4 class="text-sm font-bold text-slate-900 mb-1">Step 3: Pin Precise Incident Location</h4>
                <p class="text-xs text-slate-500 mb-3">Confirm the GPS position or drag the marker directly to the grievance spot.</p>

                <div class="flex items-center gap-2 mb-3">
                  <div class="relative flex-1">
                    <input id="report-address-input" type="text" value="${this.formData.locationAddress}" class="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20">
                    <i data-lucide="map-pin" class="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2"></i>
                  </div>
                  <button type="button" onclick="window.ReportModalComponent.detectCurrentLocation()" class="px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-all flex items-center gap-1.5 shrink-0">
                    <i data-lucide="crosshair" class="w-3.5 h-3.5"></i>
                    <span>Detect GPS</span>
                  </button>
                </div>

                <!-- Leaflet Interactive Pin Map -->
                <div id="report-step-map" class="w-full h-56 rounded-2xl border border-slate-200 shadow-inner overflow-hidden z-10"></div>
                <p class="text-[10px] text-slate-400 mt-1.5 text-center">Tip: You can drag the red map marker to pinpoint the exact road corner.</p>
              </div>
            ` : ''}

            ${this.currentStep === 4 ? `
              <!-- Step 4: AI Analysis Scanner Card -->
              <div>
                ${this.formData.isAnalyzing ? `
                  <div class="p-8 text-center glass-panel-navy text-white rounded-3xl relative overflow-hidden shadow-2xl">
                    <div class="scan-line"></div>
                    <div class="w-16 h-16 rounded-full border-4 border-sky-500/40 border-t-sky-400 animate-spin mx-auto mb-4"></div>
                    <h3 class="font-display font-black text-xl text-sky-300 tracking-wider animate-pulse">
                      CIVICGUARD AI ANALYZING...
                    </h3>
                    <p class="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                      Executing computer-vision classification, urgency scoring, and municipal jurisdiction routing...
                    </p>
                  </div>
                ` : `
                  <!-- AI Analysis Card Result -->
                  <div class="glass-panel-navy text-white p-6 rounded-3xl relative overflow-hidden shadow-2xl border border-sky-400/30">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                      <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <h4 class="font-display font-bold text-sm tracking-wider uppercase text-sky-400">CIVICGUARD AI TRIAGE COMPLETED</h4>
                      </div>
                      <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                        AI Confidence: ${this.formData.aiAnalysis?.confidence || 96.4}%
                      </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                        <span class="text-[10px] uppercase font-bold text-slate-400">Detected Category</span>
                        <p class="text-sm font-black text-white mt-0.5">${this.formData.aiAnalysis?.category || 'Waste Management'}</p>
                      </div>

                      <div class="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                        <span class="text-[10px] uppercase font-bold text-slate-400">Computed Priority</span>
                        <p class="text-sm font-black text-rose-400 mt-0.5 flex items-center gap-1.5">
                          <span class="w-2 h-2 rounded-full bg-rose-500"></span> ${this.formData.aiAnalysis?.priority || 'High'}
                        </p>
                      </div>

                      <div class="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                        <span class="text-[10px] uppercase font-bold text-slate-400">Suggested Municipal Dept</span>
                        <p class="text-xs font-black text-sky-300 mt-0.5">${this.formData.aiAnalysis?.suggestedDepartment || 'Sanitation & Solid Waste'}</p>
                      </div>

                      <div class="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                        <span class="text-[10px] uppercase font-bold text-slate-400">Estimated Urgency</span>
                        <p class="text-xs font-black text-amber-300 mt-0.5">${this.formData.aiAnalysis?.estimatedUrgency || 'Immediate Action (< 4 Hours)'}</p>
                      </div>
                    </div>

                    <div class="mt-4 p-3 rounded-2xl bg-sky-950/60 border border-sky-800/60">
                      <p class="text-xs text-sky-200">
                        <strong>Auto-Dispatch Preview:</strong> Complaint will be dispatched immediately to Officer <strong>Ramesh Kumar (Zone 4)</strong> upon confirmation.
                      </p>
                    </div>
                  </div>
                `}
              </div>
            ` : ''}

          </div>

          <!-- Modal Footer Controls -->
          <div class="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
            ${this.currentStep > 1 ? `
              <button type="button" onclick="window.ReportModalComponent.goToStep(${this.currentStep - 1})" class="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back
              </button>
            ` : `<div></div>`}

            ${this.currentStep < 4 ? `
              <button type="button" onclick="window.ReportModalComponent.goToStep(${this.currentStep + 1})" class="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5">
                <span>Continue</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            ` : `
              <button type="button" onclick="window.ReportModalComponent.submitComplaint()" ${this.formData.isAnalyzing ? 'disabled' : ''} class="px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center gap-2">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Submit Grievance</span>
              </button>
            `}
          </div>

        </div>
      </div>
    `;
  }
};
