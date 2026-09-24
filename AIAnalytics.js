// CIVICGUARD AI - Predictive AI Analytics & Smart-City Insights
window.AIAnalyticsComponent = {
  charts: {},

  render() {
    const data = window.SAMPLE_DATA.aiInsights;

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-2">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-cyan-600"></i>
              <span>CIVICGUARD Neural Core 4.2</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-display">AI Predictive Analytics & Insights</h2>
            <p class="text-xs text-slate-500 mt-0.5">Machine learning anomaly detection, recurring failure clusters, and municipal dispatch forecasts</p>
          </div>

          <button onclick="store.setView('admin')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Command Center
          </button>
        </div>

        <!-- 5 AI Insight Cards per Section 13 Specification -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Card 1: Most Reported Problem -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200 glass-card-hover">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Most Reported Problem</span>
            <div class="flex items-center gap-2 mt-2">
              <span class="p-2 rounded-xl bg-teal-100 text-teal-700 font-bold text-lg">🗑️</span>
              <div>
                <h4 class="text-base font-black text-slate-900">Garbage Accumulation</h4>
                <p class="text-[11px] text-teal-700 font-semibold">38% of all city grievances</p>
              </div>
            </div>
          </div>

          <!-- Card 2: High-Risk Area -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200 glass-card-hover">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High-Risk Area</span>
            <div class="flex items-center gap-2 mt-2">
              <span class="p-2 rounded-xl bg-rose-100 text-rose-700 font-bold text-lg">⚠️</span>
              <div>
                <h4 class="text-base font-black text-slate-900">Zone 4 (MG Road)</h4>
                <p class="text-[11px] text-rose-600 font-semibold">142 Active Incidents / Wards</p>
              </div>
            </div>
          </div>

          <!-- Card 3: Avg Resolution Time -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200 glass-card-hover">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Resolution Time</span>
            <div class="flex items-center gap-2 mt-2">
              <span class="p-2 rounded-xl bg-sky-100 text-sky-700 font-bold text-lg">⚡</span>
              <div>
                <h4 class="text-base font-black text-slate-900">4h 32m</h4>
                <p class="text-[11px] text-emerald-600 font-semibold">14% faster than municipal SLA</p>
              </div>
            </div>
          </div>

          <!-- Card 4: Increasing Problem -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200 glass-card-hover">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Increasing Problem</span>
            <div class="flex items-center gap-2 mt-2">
              <span class="p-2 rounded-xl bg-amber-100 text-amber-700 font-bold text-lg">📈</span>
              <div>
                <h4 class="text-base font-black text-slate-900">Road Damage / Potholes</h4>
                <p class="text-[11px] text-amber-700 font-semibold">+24% weekly post-monsoon</p>
              </div>
            </div>
          </div>

        </div>

        <!-- AI Prescriptive Recommendation Banner per Section 13 Specification -->
        <div class="glass-panel-navy text-white p-6 sm:p-7 rounded-3xl border border-sky-400/30 relative overflow-hidden shadow-xl">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-sky-500/30 border border-sky-400/40 text-sky-300 flex items-center justify-center shrink-0 shadow-md">
              <i data-lucide="lightbulb" class="w-6 h-6"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-black uppercase tracking-widest text-sky-400">AI Prescriptive Policy Recommendation</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Actionable</span>
              </div>
              <p class="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                “${data.recommendation}”
              </p>
              <div class="mt-3 flex items-center gap-3">
                <button onclick="alert('Autonomous Municipal Notice: Compactor frequencies updated for Zone 4 route schedule.')" class="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-sm">
                  Apply Autonomous Adjustment
                </button>
                <span class="text-xs text-slate-400">Estimated SLA Gain: +18.4%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Analytics Charts Grid (Clean, not overcrowded) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Chart 1: Grievances by Category -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-slate-900">Grievances by Category</h4>
                <p class="text-[11px] text-slate-500">Distribution across municipal service lines</p>
              </div>
              <span class="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">Real-time</span>
            </div>
            <div class="w-full h-64 relative flex items-center justify-center">
              <canvas id="categoryChart"></canvas>
            </div>
          </div>

          <!-- Chart 2: 7-Day Velocity Trend -->
          <div class="glass-panel p-6 rounded-3xl border border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-slate-900">7-Day Resolution Velocity</h4>
                <p class="text-[11px] text-slate-500">Reported vs. Resolved throughput</p>
              </div>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">96.2% SLA</span>
            </div>
            <div class="w-full h-64 relative">
              <canvas id="velocityChart"></canvas>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  initCharts() {
    if (typeof Chart === 'undefined') return;

    // Destroy prior charts if exist
    if (this.charts.cat) this.charts.cat.destroy();
    if (this.charts.vel) this.charts.vel.destroy();

    const data = window.SAMPLE_DATA.aiInsights;

    // 1. Category Chart
    const catCanvas = document.getElementById('categoryChart');
    if (catCanvas) {
      this.charts.cat = new Chart(catCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: data.categoryBreakdown.labels,
          datasets: [{
            data: data.categoryBreakdown.data,
            backgroundColor: ['#0d9488', '#0284c7', '#f59e0b', '#06b6d4', '#6366f1', '#f43f5e'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                font: { size: 10, family: 'Plus Jakarta Sans', weight: 'bold' },
                color: '#475569'
              }
            }
          }
        }
      });
    }

    // 2. Velocity Chart
    const velCanvas = document.getElementById('velocityChart');
    if (velCanvas) {
      this.charts.vel = new Chart(velCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: data.weeklyTrend.labels,
          datasets: [
            {
              label: 'Reported',
              data: data.weeklyTrend.reported,
              borderColor: '#0284c7',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Resolved',
              data: data.weeklyTrend.resolved,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                font: { size: 11, family: 'Plus Jakarta Sans', weight: 'bold' },
                color: '#475569'
              }
            }
          },
          scales: {
            y: {
              grid: { color: '#f1f5f9' },
              ticks: { font: { size: 10 } }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 } }
            }
          }
        }
      });
    }
  }
};
