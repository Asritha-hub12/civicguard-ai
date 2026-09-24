// CIVICGUARD AI - Landing Page Component
window.LandingPageComponent = {
  render() {
    const t = (k, f) => window.I18N.t(k, f);

    return `
      <div class="relative overflow-hidden">
        
        <!-- Animated Canvas Mesh Background -->
        <canvas id="hero-network-canvas" class="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"></canvas>

        <!-- Hero Section -->
        <section class="relative z-10 pt-10 pb-16 lg:pt-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Innovation Badge -->
          <div class="flex justify-center mb-5">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide shadow-sm">
              <span class="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              <span>THEME: INNOVATE WITHOUT BORDERS</span>
              <span class="text-sky-300">|</span>
              <span class="text-sky-700">CivicTech + AI + GovTech</span>
            </div>
          </div>

          <!-- Hero Main Copy -->
          <div class="text-center max-w-4xl mx-auto mb-10">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              CIVICGUARD <span class="text-gradient-civic">AI</span>
            </h1>
            <p class="mt-3 text-xl sm:text-2xl font-bold text-slate-700 font-display">
              “AI-Powered Civic Problem Management”
            </p>
            <p class="mt-2 text-lg sm:text-xl font-extrabold text-sky-600 tracking-wider uppercase">
              “Report. Resolve. Track. Transform.”
            </p>
            <p class="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Empowering citizens with computer-vision grievance reporting, automating municipal dispatch to field workers, and providing smart-city leaders with real-time transparent resolution intelligence.
            </p>

            <!-- Primary CTAs -->
            <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button onclick="window.ReportModalComponent.open()" class="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all transform active:scale-95 flex items-center gap-2.5">
                <i data-lucide="camera" class="w-5 h-5"></i>
                <span>${t('reportProblem')}</span>
              </button>
              
              <button onclick="store.setView('dashboard')" class="px-7 py-3.5 rounded-2xl bg-white border border-slate-300/80 text-slate-700 font-bold text-base hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 shadow-sm transition-all flex items-center gap-2">
                <i data-lucide="compass" class="w-5 h-5 text-sky-600"></i>
                <span>${t('explorePlatform')}</span>
              </button>

              <button onclick="window.VoiceAssistantModalComponent.open()" class="px-5 py-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 font-bold text-sm hover:bg-sky-100 transition-all flex items-center gap-2">
                <i data-lucide="mic" class="w-4 h-4 text-sky-600 animate-bounce"></i>
                <span>Ask CivicGuard Voice</span>
              </button>
            </div>

            <!-- Quick Judge Persona Launcher Bar -->
            <div class="mt-7 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-sm text-xs font-semibold">
              <span class="text-slate-500 px-2 flex items-center gap-1"><i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i> Judge 1-Click Launch:</span>
              <button onclick="store.setRole('citizen')" class="px-3 py-1.5 rounded-xl bg-white text-sky-700 shadow-xs hover:bg-sky-50 transition-all">Citizen View</button>
              <button onclick="store.setRole('employee')" class="px-3 py-1.5 rounded-xl bg-white text-amber-800 shadow-xs hover:bg-amber-50 transition-all">Municipal Worker View</button>
              <button onclick="store.setRole('admin')" class="px-3 py-1.5 rounded-xl bg-white text-purple-700 shadow-xs hover:bg-purple-50 transition-all">City Command Center</button>
            </div>
          </div>

          <!-- Hero Multi-Card Visual Showcase (Citizen Mobile + Field Worker + AI Network + Smart City) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            
            <!-- Visual 1: Citizen Mobile Experience -->
            <div class="glass-panel p-5 rounded-3xl relative overflow-hidden glass-card-hover group">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    <i data-lucide="smartphone" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Citizen Mobile Flow</h3>
                    <p class="text-[11px] text-slate-500">Instant AI Classification</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Live AI</span>
              </div>
              
              <div class="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900/5 aspect-video mb-3">
                <img src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80" alt="Civic Issue" class="w-full h-full object-cover">
                <div class="scan-line"></div>
                <div class="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-[11px]">
                  <div class="flex items-center justify-between font-bold">
                    <span>CG-1024 Detected</span>
                    <span class="text-sky-300">96.4% Conf.</span>
                  </div>
                  <p class="text-slate-300 truncate">Waste Management • Urgent</p>
                </div>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                Take a photo or speak in Hindi, Telugu, Odia or English. Computer vision extracts category, location & priority automatically.
              </p>
            </div>

            <!-- Visual 2: Municipal Field Worker Dispatch -->
            <div class="glass-panel p-5 rounded-3xl relative overflow-hidden glass-card-hover group border-amber-200/60">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <i data-lucide="hard-hat" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Worker Fast-Dispatch</h3>
                    <p class="text-[11px] text-slate-500">Ramesh Kumar (Zone 4)</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">In Progress</span>
              </div>

              <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-3 space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Task #CG-1024</span>
                  <span class="text-amber-700">850 Points ⭐</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-600">
                  <i data-lucide="navigation" class="w-3.5 h-3.5 text-amber-600"></i>
                  <span>MG Road Rythu Bazar, Vijayawada</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-amber-500 h-1.5 rounded-full" style="width: 65%"></div>
                </div>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                Field teams accept tasks, navigate GPS routes, upload completion proofs, and earn civic points & recognition.
              </p>
            </div>

            <!-- Visual 3: City Command Center & GIS Map -->
            <div class="glass-panel p-5 rounded-3xl relative overflow-hidden glass-card-hover group">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <i data-lucide="activity" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Admin Command Center</h3>
                    <p class="text-[11px] text-slate-500">Live GIS & AI Insights</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Smart City</span>
              </div>

              <div class="grid grid-cols-2 gap-2 mb-3">
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p class="text-lg font-black text-slate-900">96.2%</p>
                  <p class="text-[10px] text-slate-500 font-semibold">SLA Compliance</p>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p class="text-lg font-black text-emerald-600">3h 48m</p>
                  <p class="text-[10px] text-slate-500 font-semibold">Avg Turnaround</p>
                </div>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                Predictive heatmaps detect civic problem spikes before they escalate. Automated prescriptive recommendations for municipal resources.
              </p>
            </div>

          </div>

        </section>

        <!-- Trust & Impact Pillar Section -->
        <section class="relative z-10 py-12 bg-white/90 border-y border-slate-200/80">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-8">
              <h2 class="text-xs font-black uppercase tracking-widest text-sky-600">Engineered for Municipal Scale & Trust</h2>
              <p class="text-xl font-bold text-slate-900 mt-1">Four Pillars of CIVICGUARD AI</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <!-- Pillar 1 -->
              <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 transition-all">
                <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
                  <i data-lucide="cpu" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-900 mb-1">AI-Powered</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Computer vision verifies severity and auto-routes issues directly to the right municipal department without manual delays.</p>
              </div>

              <!-- Pillar 2 -->
              <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-cyan-300 transition-all">
                <div class="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
                  <i data-lucide="clock" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-900 mb-1">Real-Time Tracking</h3>
                <p class="text-xs text-slate-600 leading-relaxed">7-stage transparent timeline tracking from dispatch to on-site worker GPS and resolution timestamps.</p>
              </div>

              <!-- Pillar 3 -->
              <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <i data-lucide="check-check" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-900 mb-1">Transparent Resolution</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Before-and-After photo verification paired with citizen 5-star rating updates employee performance points.</p>
              </div>

              <!-- Pillar 4 -->
              <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 transition-all">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                  <i data-lucide="languages" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-900 mb-1">Multilingual Access</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Speaks English, Hindi, Telugu, and Odia. Designed for high accessibility so any citizen can submit issues in seconds.</p>
              </div>

            </div>
          </div>
        </section>

        <!-- Product Journey Flow Section -->
        <section class="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">End-to-End System Flow</span>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">How CIVICGUARD AI Solves City Problems</h2>
            <p class="text-sm text-slate-500 max-w-xl mx-auto mt-1">From initial camera photo to AI verification and municipal leaderboard</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            
            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center mb-2">1</span>
              <i data-lucide="camera" class="w-5 h-5 text-sky-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">Citizen Snap</h4>
              <p class="text-[10px] text-slate-500">Photo + GPS</p>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center mb-2">2</span>
              <i data-lucide="cpu" class="w-5 h-5 text-cyan-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">AI Analysis</h4>
              <p class="text-[10px] text-slate-500">Priority & Dept</p>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center mb-2">3</span>
              <i data-lucide="user-check" class="w-5 h-5 text-indigo-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">Auto Route</h4>
              <p class="text-[10px] text-slate-500">Ward Officer</p>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center mb-2">4</span>
              <i data-lucide="wrench" class="w-5 h-5 text-amber-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">Worker Action</h4>
              <p class="text-[10px] text-slate-500">On-site Repair</p>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-teal-100 text-teal-800 text-xs font-black flex items-center justify-center mb-2">5</span>
              <i data-lucide="image" class="w-5 h-5 text-teal-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">After Photo</h4>
              <p class="text-[10px] text-slate-500">Proof Upload</p>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mb-2">6</span>
              <i data-lucide="shield-check" class="w-5 h-5 text-emerald-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">AI Verify</h4>
              <p class="text-[10px] text-slate-500">Vision Check</p>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center">
              <span class="w-7 h-7 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center mb-2">7</span>
              <i data-lucide="star" class="w-5 h-5 text-purple-600 mb-1"></i>
              <h4 class="text-xs font-bold text-slate-800">Citizen Rating</h4>
              <p class="text-[10px] text-slate-500">Points & Closes</p>
            </div>

          </div>

          <!-- Bottom CTA Banner -->
          <div class="mt-12 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-8 text-white relative overflow-hidden shadow-xl">
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 class="text-2xl font-black">Ready to experience CIVICGUARD AI?</h3>
                <p class="text-sm text-slate-300 mt-1">Explore our interactive citizen reporting, municipal worker queue, and smart-city GIS dashboard.</p>
              </div>
              <div class="flex items-center gap-3">
                <button onclick="store.setView('dashboard')" class="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all shadow-md">
                  Go to Live Dashboard
                </button>
              </div>
            </div>
          </div>

        </section>

      </div>
    `;
  },

  initCanvas() {
    const canvas = document.getElementById('hero-network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = [];
    const numParticles = Math.min(width > 768 ? 45 : 20, 60);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.5,
        color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#06b6d4' : '#6366f1'
      });
    }

    function animate() {
      if (!document.getElementById('hero-network-canvas')) return;
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    });
  }
};
