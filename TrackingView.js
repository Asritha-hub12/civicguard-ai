// CIVICGUARD AI - 7-Stage Complaint Tracking View

window.TrackingViewComponent = {
  mapInstance: null,

  searchComplaint(id) {
    const trimmed = id.trim();

    const comp = window.store.getComplaint(trimmed);

    if (comp) {
      window.store.trackingComplaintId =
        comp.complaintId || comp.id;

      const root = document.getElementById('main-content-view');

      if (root) {
        root.innerHTML = this.render();

        if (window.lucide) {
          window.lucide.createIcons();
        }

        setTimeout(() => {
          this.initMap(comp);
        }, 100);
      }

    } else {
      window.store.showToast(
        `Complaint ID #${id} not found`,
        'error'
      );
    }
  },

  render() {
    const store = window.store;

    const trackingId =
      store.trackingComplaintId || 'CG-1024';

    const c = store.getComplaint(trackingId);

    const t = (k, f) =>
      window.I18N.t(k, f);

    // Always use the actual complaintId
    const complaintId =
      c.complaintId || c.id;

    // 7-Stage Timeline Definition
    const stages = [
      {
        id: 'reported',
        label: 'Reported',
        icon: 'file-text',
        desc: 'Logged by citizen'
      },
      {
        id: 'ai_analyzed',
        label: 'AI Analyzed',
        icon: 'cpu',
        desc: 'Urgency & Dept assigned'
      },
      {
        id: 'assigned',
        label: 'Assigned',
        icon: 'user-check',
        desc: 'Dispatched to beat officer'
      },
      {
        id: 'in_progress',
        label: 'Employee Working',
        icon: 'wrench',
        desc: 'On-site remediation'
      },
      {
        id: 'completed',
        label: 'Work Completed',
        icon: 'image',
        desc: 'Evidence submitted'
      },
      {
        id: 'verified',
        label: 'Verified',
        icon: 'shield-check',
        desc: 'AI visual check passed'
      },
      {
        id: 'resolved',
        label: 'Resolved',
        icon: 'check-circle-2',
        desc: 'Closed with rating'
      }
    ];

    const stageOrder = [
      'reported',
      'ai_analyzed',
      'assigned',
      'in_progress',
      'completed',
      'verified',
      'resolved'
    ];

    // Backend status → Tracking status
    const statusMap = {
      submitted: 'reported',
      assigned: 'assigned',
      in_progress: 'in_progress',
      completed: 'completed',
      resolved: 'resolved',
      closed: 'resolved'
    };

    const trackingStatus =
      statusMap[c.status] || 'reported';

    const currentStageIndex =
      stageOrder.indexOf(trackingStatus);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">

        <!-- Header & Search Bar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>
            <div class="flex items-center gap-2 mb-1">

              <span class="font-mono text-sm font-black px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-800 border border-sky-200">
                #${complaintId}
              </span>

              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800">
                ● ${t(`statuses.${c.status}`, c.status)}
              </span>

            </div>

            <h2 class="text-2xl font-black text-slate-900 tracking-tight font-display">
              ${c.title}
            </h2>

            <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <i
                data-lucide="map-pin"
                class="w-3.5 h-3.5 text-rose-500"
              ></i>
              ${c.location}
            </p>
          </div>

          <!-- Quick Tracker Input -->
          <div class="flex items-center gap-2">

            <div class="relative w-full sm:w-64">

              <input
                id="tracking-search-input"
                type="text"
                placeholder="Track other ID (e.g. CG-1025)..."
                value="${complaintId}"
                class="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-xs"
              >

              <i
                data-lucide="search"
                class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              ></i>

            </div>

            <button
              onclick="window.TrackingViewComponent.searchComplaint(document.getElementById('tracking-search-input').value)"
              class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-all shrink-0"
            >
              Track
            </button>

          </div>
        </div>


        <!-- 7-Stage Status Timeline Card -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">

          <div class="flex items-center justify-between mb-6">

            <div>
              <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider font-display">
                Resolution Progress Timeline
              </h3>

              <p class="text-xs text-slate-500">
                Real-time status updates broadcasted over municipal grid
              </p>
            </div>

            <span class="text-xs font-extrabold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Stage ${currentStageIndex + 1} of 7
            </span>

          </div>


          <!-- Timeline -->
          <div class="relative">

            <!-- Timeline Connector -->
            <div class="hidden lg:block absolute top-6 left-8 right-8 h-1 bg-slate-200 -z-0">

              <div
                class="bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 h-1 transition-all duration-500"
                style="width: ${(currentStageIndex / 6) * 100}%"
              ></div>

            </div>


            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">

              ${stages.map((st, idx) => {

                const isPassed =
                  idx <= currentStageIndex;

                const isCurrent =
                  idx === currentStageIndex;

                return `
                  <div
                    class="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-2 text-left lg:text-center p-2 rounded-xl ${
                      isCurrent
                        ? 'bg-sky-50/80 ring-1 ring-sky-300'
                        : ''
                    }"
                  >

                    <div
                      class="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shrink-0 ${
                        isPassed
                          ? 'bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow-md shadow-sky-500/25 ring-4 ring-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      } ${
                        isCurrent
                          ? 'animate-pulse scale-105'
                          : ''
                      }"
                    >
                      <i
                        data-lucide="${st.icon}"
                        class="w-5 h-5"
                      ></i>
                    </div>

                    <div>

                      <h4
                        class="text-xs font-bold ${
                          isPassed
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }"
                      >
                        ${st.label}
                      </h4>

                      <p
                        class="text-[10px] ${
                          isPassed
                            ? 'text-sky-700 font-semibold'
                            : 'text-slate-400'
                        }"
                      >
                        ${st.desc}
                      </p>

                    </div>

                  </div>
                `;
              }).join('')}

            </div>

          </div>
        </div>


        <!-- Detailed Metrics Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">


          <!-- Grievance Metadata -->
          <div class="lg:col-span-1 space-y-4">

            <div class="glass-panel p-5 rounded-2xl border border-slate-200/80 space-y-4">

              <h4 class="text-xs font-black uppercase tracking-wider text-slate-400">
                Grievance Metadata
              </h4>

              <div class="space-y-3 text-xs">

                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span class="text-slate-500">
                    Complaint ID
                  </span>

                  <span class="font-mono font-bold text-slate-800">
                    #${complaintId}
                  </span>
                </div>


                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span class="text-slate-500">
                    Department
                  </span>

                  <span class="font-semibold text-slate-800">
                    ${c.assignedDepartment || 'Sanitation Dept'}
                  </span>
                </div>


                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span class="text-slate-500">
                    Time Elapsed
                  </span>

                  <span class="font-bold text-sky-600">
                    ${c.timeElapsed || '2h 15m'}
                  </span>
                </div>


                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span class="text-slate-500">
                    Expected SLA
                  </span>

                  <span class="font-bold text-emerald-600">
                    ${c.expectedCompletion || 'Today, 02:30 PM'}
                  </span>
                </div>


                <div class="flex items-center justify-between">

                  <span class="text-slate-500">
                    AI Urgency Score
                  </span>

                  <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700">
                    96.4% Critical
                  </span>

                </div>

              </div>
            </div>


            <!-- Assigned Employee -->
            ${c.assignedEmployee ? `

              <div class="glass-panel p-5 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-amber-50/50 to-white">

                <div class="flex items-center justify-between mb-3">

                  <span class="text-xs font-black uppercase tracking-wider text-amber-800">
                    Assigned Beat Officer
                  </span>

                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    On Duty
                  </span>

                </div>


                <div class="flex items-center gap-3">

                  <img
                    src="${c.assignedEmployee.avatar}"
                    alt="Employee"
                    class="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-400"
                  >

                  <div>

                    <h5 class="text-sm font-bold text-slate-900">
                      ${c.assignedEmployee.name}
                    </h5>

                    <p class="text-[11px] text-slate-500">
                      Sanitation Inspector • ID #${c.assignedEmployee.id}
                    </p>

                    <div class="flex items-center gap-2 mt-1 text-[11px] font-bold text-amber-700">

                      <span>
                        ★ ${c.assignedEmployee.rating || '4.9'} Rating
                      </span>

                      <span>•</span>

                      <span>
                        ${c.assignedEmployee.phone}
                      </span>

                    </div>

                  </div>

                </div>


                <div class="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">

                  <a
                    href="tel:${c.assignedEmployee.phone}"
                    class="px-3 py-1.5 rounded-xl bg-white text-slate-700 border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5"
                  >
                    <i
                      data-lucide="phone"
                      class="w-3.5 h-3.5 text-emerald-600"
                    ></i>
                    Call Officer
                  </a>


                  ${
                    c.status === 'completed' && !c.feedback
                      ? `
                        <button
                          onclick="window.CitizenFeedbackModalComponent.open('${complaintId}')"
                          class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all"
                        >
                          Rate Resolution
                        </button>
                      `
                      : ''
                  }

                </div>

              </div>

            ` : ''}


          </div>


          <!-- Live Leaflet Map -->
          <div class="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-200/80 flex flex-col">

            <div class="flex items-center justify-between mb-3">

              <div class="flex items-center gap-2">

                <i
                  data-lucide="map"
                  class="w-4 h-4 text-sky-600"
                ></i>

                <h4 class="text-xs font-black uppercase tracking-wider text-slate-700">
                  Live Incident Location & Route
                </h4>

              </div>

              <span class="text-[11px] font-bold text-slate-500">
                ${c.location}
              </span>

            </div>


            <div
              id="tracking-leaflet-map"
              class="w-full h-80 rounded-xl border border-slate-200 shadow-inner overflow-hidden z-10 flex-1"
            ></div>

          </div>

        </div>

      </div>
    `;
  },


  // Initialize Leaflet Map
  initMap(complaint) {

    const mapDiv =
      document.getElementById('tracking-leaflet-map');

    if (!mapDiv || typeof L === 'undefined') {
      return;
    }

    if (this.mapInstance) {
      this.mapInstance.remove();
    }

    const complaintId =
      complaint.complaintId || complaint.id;

    const lat =
      complaint.lat || 16.5062;

    const lng =
      complaint.lng || 80.6480;


    this.mapInstance =
      L.map('tracking-leaflet-map')
        .setView([lat, lng], 15);


    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.mapInstance);


    // Complaint Incident Marker
    const incidentIcon = L.divIcon({
      className: 'custom-map-pin',

      html: `
        <div class="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">

          <i
            data-lucide="alert-triangle"
            class="w-4 h-4"
          ></i>

        </div>
      `,

      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });


    L.marker(
      [lat, lng],
      {
        icon: incidentIcon
      }
    )
      .addTo(this.mapInstance)
      .bindPopup(`
        <div class="p-2 text-xs">

          <strong>
            #${complaintId}: ${complaint.title}
          </strong>

          <br>

          <span>
            Status: ${complaint.status}
          </span>

          <br>

          <span class="text-slate-500">
            ${complaint.location}
          </span>

        </div>
      `)
      .openPopup();


    // Worker Marker
    const workerLat =
      lat + 0.0035;

    const workerLng =
      lng - 0.0028;


    const workerIcon = L.divIcon({

      className: 'custom-map-pin',

      html: `
        <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">

          <i
            data-lucide="hard-hat"
            class="w-4 h-4"
          ></i>

        </div>
      `,

      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });


    L.marker(
      [workerLat, workerLng],
      {
        icon: workerIcon
      }
    )
      .addTo(this.mapInstance)
      .bindPopup(
        `<strong>Ramesh Kumar (Worker)</strong><br>En route to incident`
      );


    // Route line
    L.polyline(
      [
        [workerLat, workerLng],
        [lat, lng]
      ],
      {
        color: '#0284c7',
        weight: 3,
        dashArray: '5, 8'
      }
    ).addTo(this.mapInstance);


    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
};