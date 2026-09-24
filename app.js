// CIVICGUARD AI - Main Application Coordinator & Reactive View Router
window.App = {
  init() {
    // Subscribe to state store changes
    window.store.subscribe((event, data) => {
      this.handleStateChange(event, data);
    });

    // Listen to language changes
    window.addEventListener('civicguard:langChanged', () => {
      this.renderCurrentView();
    });

    // Render initial view
    this.renderCurrentView();
  },

  handleStateChange(event, data) {
    if (['view:changed', 'role:changed', 'complaint:created', 'complaint:updated', 'complaint:completed', 'complaint:feedbackSubmitted'].includes(event)) {
      this.renderCurrentView();
    } else if (event === 'toast:show') {
      this.renderToast(data);
    } else if (event === 'toast:hide') {
      this.hideToast();
    } else if (event.startsWith('notification:')) {
      // Re-render navbar to update unread badge
      const navContainer = document.getElementById('navbar-root');
      if (navContainer) {
        navContainer.innerHTML = window.NavbarComponent.render();
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  renderToast(toast) {
    let container = document.getElementById('toast-root');
    if (!container) return;

    const bgColors = {
      success: 'bg-emerald-600 text-white',
      error: 'bg-rose-600 text-white',
      info: 'bg-slate-900 text-white'
    };

    container.innerHTML = `
      <div class="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl ${bgColors[toast.type] || bgColors.info} shadow-2xl animate-bounce border border-white/20 text-xs font-bold">
        <i data-lucide="${toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'alert-triangle' : 'info'}" class="w-4 h-4"></i>
        <span>${toast.message}</span>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  },

  hideToast() {
    let container = document.getElementById('toast-root');
    if (container) container.innerHTML = '';
  },

  renderCurrentView() {
    const store = window.store;
    const view = store.activeView;

    // 1. Render Sticky Frosted Navbar
    const navRoot = document.getElementById('navbar-root');
    if (navRoot) {
      navRoot.innerHTML = window.NavbarComponent.render();
    }

    // 2. Render Main Body View
    const mainRoot = document.getElementById('main-content-view');
    if (mainRoot) {
      if (view === 'landing') {
        mainRoot.innerHTML = window.LandingPageComponent.render();
        setTimeout(() => window.LandingPageComponent.initCanvas(), 100);
      } else if (view === 'dashboard') {
        mainRoot.innerHTML = window.CitizenDashboardComponent.render();
      } else if (view === 'tracking') {
        mainRoot.innerHTML = window.TrackingViewComponent.render();
        const comp = store.getComplaint(store.trackingComplaintId);
        setTimeout(() => window.TrackingViewComponent.initMap(comp), 120);
      } else if (view === 'employee') {
        window.EmployeeDashboardComponent.render();
      } else if (view === 'admin') {
        mainRoot.innerHTML = window.AdminDashboardComponent.render();
      } else if (view === 'map') {
        mainRoot.innerHTML = window.AdminMapComponent.render();
        setTimeout(() => window.AdminMapComponent.initMap(), 120);
      } else if (view === 'analytics') {
        mainRoot.innerHTML = window.AIAnalyticsComponent.render();
        setTimeout(() => window.AIAnalyticsComponent.initCharts(), 120);
      }
    }

    // 3. Render Mobile Bottom Nav
    const bottomNavRoot = document.getElementById('bottom-nav-root');
    if (bottomNavRoot) {
      bottomNavRoot.innerHTML = window.BottomNavComponent.render();
    }

    // 4. Update Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 5. Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Auto-boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
