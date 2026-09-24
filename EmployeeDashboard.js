// CIVICGUARD AI - Municipal Employee Dashboard
window.EmployeeDashboardComponent = {
  currentTab: 'assigned',

  setTab(tab) {
    this.currentTab = tab;

    const view = document.getElementById('employee-tab-view');

    if (view) {
      view.innerHTML = this.renderTabContent();

      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  },

  async acceptTask(complaintId) {
    const token = localStorage.getItem('civicguard_token');

    try {
      const response = await fetch(
        `http://localhost:5000/api/complaints/${complaintId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: 'in_progress'
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Failed to update complaint'
        );
      }

      const complaint = window.store.complaints.find(
        c => (c.id || c.complaintId) === complaintId 
      );

      if (complaint) {
        complaint.status = data.complaint.status;
      }

      this.render();

      if (window.lucide) {
        window.lucide.createIcons();
      }

      window.store.showToast(
        'Task accepted. Status changed to In Progress.',
        'success'
      );

    } catch (error) {
      console.error('Failed to accept task:', error);

      window.store.showToast(
        error.message || 'Failed to update task',
        'error'
      );
    }
  },

  openUploadCompletion(complaintId) {
    if (
      window.VerificationModalComponent &&
      window.VerificationModalComponent.open
    ) {
      window.VerificationModalComponent.open(complaintId);
    }
  },

  renderTabContent() {
    const store = window.store;
    const all = store.getComplaints();

    if (this.currentTab === 'performance') {
      return this.renderPerformanceView();
    }

    let tasks = [];

    if (this.currentTab === 'assigned') {
      tasks = all.filter(c =>
        ['submitted', 'assigned'].includes(c.status)
      );
    }

    if (this.currentTab === 'active') {
      tasks = all.filter(c =>
        c.status === 'in_progress'
      );
    }

    if (this.currentTab === 'completed') {
  tasks = all.filter(c =>
    ['completed', 'resolved', 'closed'].includes(c.status)
  );
}

    if (tasks.length === 0) {
      return `
        <div class="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">

          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <i data-lucide="check-circle" class="w-6 h-6"></i>
          </div>

          <h4 class="text-sm font-bold text-slate-700">
            No tasks in this queue
          </h4>

          <p class="text-xs text-slate-500 mt-1">
            All dispatched civic tasks are up to date.
          </p>

        </div>
      `;
    }

    return tasks.map(task => {

      const complaintId = task.id || task.complaintId;
      const isUrgent = task.priority === 'high';

      return `
        <div class="bg-white p-5 mb-4 rounded-2xl border border-slate-200 shadow-sm">

          <div class="flex items-start justify-between gap-4">

            <div>
              <div class="text-xs font-bold text-slate-400">
                #${complaintId}
              </div>

              <h3 class="text-lg font-bold text-slate-800 mt-1">
                ${task.title || task.categoryLabel || 'Civic Complaint'}
              </h3>

              <p class="text-sm text-slate-500 mt-1">
                ${task.description || 'No description available'}
              </p>
            </div>

            ${
              isUrgent
                ? `
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    HIGH PRIORITY
                  </span>
                `
                : ''
            }

          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

            <div>
              <p class="text-xs text-slate-400">Category</p>
              <p class="font-semibold text-slate-700 mt-1">
                ${task.categoryLabel || task.category || 'N/A'}
              </p>
            </div>

            <div>
              <p class="text-xs text-slate-400">Location</p>
              <p class="font-semibold text-slate-700 mt-1">
                ${task.location || 'Not available'}
              </p>
            </div>

            <div>
              <p class="text-xs text-slate-400">Status</p>
              <p class="font-semibold text-slate-700 mt-1">
                ${task.status || 'submitted'}
              </p>
            </div>

          </div>

          <div class="flex flex-wrap gap-2 mt-5">

            ${
              ['submitted', 'assigned'].includes(task.status)
                ? `
                  <button
                    onclick="window.EmployeeDashboardComponent.acceptTask('${complaintId}')"
                    class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold">
                    Accept Task
                  </button>
                `
                : ''
            }

            ${
              task.status === 'in_progress'
                ? `
                  <button
                    onclick="window.EmployeeDashboardComponent.openUploadCompletion('${complaintId}')"
                    class="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-bold">
                    Upload Completion Photo
                  </button>
                `
                : ''
            }

            <button
              onclick="store.setView('tracking', { complaintId: '${complaintId}' })"
              class="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-bold">
              Navigate
            </button>

            ${
              window.ComplaintDetailsModalComponent
                ? `
                  <button
                    onclick="window.ComplaintDetailsModalComponent.open('${complaintId}')"
                    class="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-bold">
                    View Details
                  </button>
                `
                : ''
            }

          </div>

        </div>
      `;

    }).join('');
  },

  renderPerformanceView() {
    const complaints = window.store.getComplaints();

    const completed = complaints.filter(c =>
      ['resolved', 'closed'].includes(c.status)
    ).length;

    const active = complaints.filter(c =>
      c.status === 'in_progress'
    ).length;

    return `
      <div class="bg-white p-8 rounded-2xl border border-slate-200">

        <h3 class="text-xl font-bold text-slate-800">
          Performance & Gamification
        </h3>

        <p class="text-sm text-slate-500 mt-2">
          Track your civic service performance.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          <div class="p-5 rounded-xl bg-slate-50">
            <p class="text-xs text-slate-500">
              Tasks Completed
            </p>

            <p class="text-2xl font-bold text-slate-800 mt-1">
              ${completed}
            </p>
          </div>

          <div class="p-5 rounded-xl bg-slate-50">
            <p class="text-xs text-slate-500">
              Active Tasks
            </p>

            <p class="text-2xl font-bold text-slate-800 mt-1">
              ${active}
            </p>
          </div>

          <div class="p-5 rounded-xl bg-slate-50">
            <p class="text-xs text-slate-500">
              Total Complaints
            </p>

            <p class="text-2xl font-bold text-slate-800 mt-1">
              ${complaints.length}
            </p>
          </div>

        </div>

      </div>
    `;
  },

  render() {
    const store = window.store;
    const complaints = store.getComplaints();

    const assignedCount = complaints.filter(c =>
      ['submitted', 'assigned'].includes(c.status)
    ).length;

    const activeCount = complaints.filter(c =>
      c.status === 'in_progress'
    ).length;

    const completedCount = complaints.filter(c =>
  ['completed', 'resolved', 'closed'].includes(c.status)
).length;

    const main = document.getElementById('main-content-view');

    if (!main) {
      console.error('main-content-view not found');
      return;
    }

    const userName =
      store.currentUser?.name ||
      'Municipal Employee';

    main.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 py-8">

        <div class="mb-8">

          <p class="text-sm text-slate-500">
            Welcome
          </p>

          <h1 class="text-3xl font-bold text-slate-800">
            ${userName}
          </h1>

          <p class="text-sm text-slate-500 mt-1">
            Municipal Employee Dashboard
          </p>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div class="bg-white p-5 rounded-2xl border border-slate-200">
            <p class="text-sm text-slate-500">
              Assigned
            </p>

            <p class="text-3xl font-bold text-slate-800 mt-2">
              ${assignedCount}
            </p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200">
            <p class="text-sm text-slate-500">
              Active
            </p>

            <p class="text-3xl font-bold text-slate-800 mt-2">
              ${activeCount}
            </p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200">
            <p class="text-sm text-slate-500">
              Completed
            </p>

            <p class="text-3xl font-bold text-slate-800 mt-2">
              ${completedCount}
            </p>
          </div>

        </div>

        <div class="flex flex-wrap gap-2 mb-6">

          <button
            onclick="window.EmployeeDashboardComponent.setTab('assigned')"
            class="px-4 py-2 rounded-lg border bg-white font-semibold">
            Assigned
          </button>

          <button
            onclick="window.EmployeeDashboardComponent.setTab('active')"
            class="px-4 py-2 rounded-lg border bg-white font-semibold">
            Active
          </button>

          <button
            onclick="window.EmployeeDashboardComponent.setTab('completed')"
            class="px-4 py-2 rounded-lg border bg-white font-semibold">
            Completed
          </button>

          <button
            onclick="window.EmployeeDashboardComponent.setTab('performance')"
            class="px-4 py-2 rounded-lg border bg-white font-semibold">
            Performance
          </button>

        </div>

        <div id="employee-tab-view">
          ${this.renderTabContent()}
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
};