// CIVICGUARD AI - Admin Interactive GIS Map Component
window.AdminMapComponent = {
  mapInstance: null,
  markersLayer: null,

  filters: {
    category: 'all',
    priority: 'all',
    status: 'all',
    department: 'all'
  },

  setFilter(key, val) {
    this.filters[key] = val;
    this.updateMapMarkers();
  },

  render() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
        
        <!-- Map Header & Filter Controls -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <i data-lucide="map" class="w-4 h-4"></i>
              </div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900 font-display">Citywide Smart GIS Incident Map</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Spatial intelligence across Vijayawada Municipal Corporation (Wards 1 - 50)</p>
          </div>

          <!-- Color Legend per Section 12 Specification -->
          <div class="flex items-center gap-2.5 flex-wrap bg-white p-2 px-3 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500 border border-white ring-2 ring-rose-200"></span> High Priority</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500 border border-white ring-2 ring-amber-200"></span> Medium Priority</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-sky-500 border border-white ring-2 ring-sky-200"></span> In Progress</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500 border border-white ring-2 ring-emerald-200"></span> Resolved</span>
          </div>
        </div>

        <!-- Filter Dropdown Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-xs">
          
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
            <select onchange="window.AdminMapComponent.setFilter('category', this.value)" class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 outline-none focus:border-sky-500">
              <option value="all">All Categories</option>
              <option value="garbage">Garbage & Waste</option>
              <option value="roads">Roads & Potholes</option>
              <option value="streetlights">Street Lights</option>
              <option value="water">Water Supply</option>
              <option value="drainage">Drainage & Sewage</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Priority</label>
            <select onchange="window.AdminMapComponent.setFilter('priority', this.value)" class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 outline-none focus:border-sky-500">
              <option value="all">All Priorities</option>
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟠 Medium Priority</option>
              <option value="low">⚪ Low Priority</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
            <select onchange="window.AdminMapComponent.setFilter('status', this.value)" class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 outline-none focus:border-sky-500">
              <option value="all">All Statuses</option>
              <option value="in_progress">In Progress</option>
              <option value="assigned">Assigned</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Department</label>
            <select onchange="window.AdminMapComponent.setFilter('department', this.value)" class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 outline-none focus:border-sky-500">
              <option value="all">All Departments</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Roads">Public Works (Roads)</option>
              <option value="Electrical">Electrical</option>
              <option value="Water">Water Supply</option>
            </select>
          </div>

        </div>

        <!-- Full Leaflet Map View Container -->
        <div class="relative glass-panel rounded-3xl p-3 border border-slate-200 shadow-sm overflow-hidden">
          <div id="admin-city-map" class="w-full h-[620px] rounded-2xl border border-slate-200 z-10"></div>
          
          <!-- Bottom Map Mini Floating Stats -->
          <div class="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 px-4 rounded-2xl border border-slate-200 shadow-lg text-xs">
            <span class="text-slate-500 font-bold">Grid Area: <strong class="text-slate-800">Zone 1 - Zone 5 (Krishna Basin)</strong></span>
            <span class="text-slate-300">|</span>
            <span class="text-slate-500 font-bold">Active GPS Beacons: <strong class="text-sky-600">148 Municipal Units</strong></span>
          </div>
        </div>

      </div>
    `;
  },

  initMap() {
    const mapDiv = document.getElementById('admin-city-map');
    if (!mapDiv || typeof L === 'undefined') return;

    if (this.mapInstance) {
      this.mapInstance.remove();
    }

    this.mapInstance = L.map('admin-city-map').setView([16.5062, 80.6480], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | CIVICGUARD AI'
    }).addTo(this.mapInstance);

    this.markersLayer = L.layerGroup().addTo(this.mapInstance);
    this.updateMapMarkers();
  },

  updateMapMarkers() {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    const complaints = window.store.getComplaints();

    const filtered = complaints.filter(c => {
      const matchCat = this.filters.category === 'all' || c.category === this.filters.category;
      const matchPri = this.filters.priority === 'all' || c.priority === this.filters.priority;
      const matchSta = this.filters.status === 'all' || 
        (this.filters.status === 'in_progress' && c.status === 'in_progress') ||
        (this.filters.status === 'assigned' && c.status === 'assigned') ||
        (this.filters.status === 'resolved' && ['completed', 'verified', 'resolved'].includes(c.status));
      const matchDep = this.filters.department === 'all' || (c.assignedDepartment && c.assignedDepartment.includes(this.filters.department));

      return matchCat && matchPri && matchSta && matchDep;
    });

    for (const c of filtered) {
      const lat = c.lat || 16.5062;
      const lng = c.lng || 80.6480;

      // Color coding according to section 12:
      // 🔴 High Priority
      // 🟠 Medium Priority
      // 🟢 Resolved
      // 🔵 In Progress
      let markerBg = '#ef4444'; // Red default for high
      if (['resolved', 'verified', 'completed'].includes(c.status)) {
        markerBg = '#10b981'; // Green
      } else if (c.status === 'in_progress') {
        markerBg = '#0284c7'; // Blue
      } else if (c.priority === 'medium') {
        markerBg = '#f59e0b'; // Orange
      }

      const customIcon = L.divIcon({
        className: 'custom-marker-wrapper',
        html: `
          <div class="custom-marker" style="width: 32px; height: 32px; background: ${markerBg};">
            <span style="font-size: 11px;">#</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupHtml = `
        <div style="min-width: 220px; font-family: sans-serif;" class="p-1">
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-mono font-bold text-slate-800 text-xs">#${c.id}</span>
            <span style="background: ${markerBg}; color: white; padding: 2px 6px; border-radius: 9999px; font-size: 10px; font-weight: bold;">
              ${c.status.toUpperCase()}
            </span>
          </div>
          ${c.beforeImage ? `
            <img src="${c.beforeImage}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;">
          ` : ''}
          <h5 style="font-size: 12px; font-weight: bold; margin: 0 0 4px 0; color: #0f172a;">${c.title}</h5>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0;">${c.location}</p>
          <div style="display: flex; gap: 4px;">
            <button onclick="window.ComplaintDetailsModalComponent.open('${c.id}')" style="flex: 1; padding: 6px; background: #0284c7; color: white; border: none; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
              Inspect Details
            </button>
            <button onclick="store.setView('tracking', { complaintId: '${c.id}' })" style="flex: 1; padding: 6px; background: #e0f2fe; color: #0369a1; border: none; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
              Track SLA
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.markersLayer.addLayer(marker);
    }
  }
};
