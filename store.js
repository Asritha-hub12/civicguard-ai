// CIVICGUARD AI - Reactive State Store
class CivicGuardStore {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    const savedComplaints = localStorage.getItem('civicguard_complaints');
    if (savedComplaints) {
      try {
        this.complaints = JSON.parse(savedComplaints);
      } catch (e) {
        this.complaints = [...window.SAMPLE_DATA.complaints];
      }
    } else {
      this.complaints = [...window.SAMPLE_DATA.complaints];
      this.saveComplaints();
    }

    const savedRole = localStorage.getItem('civicguard_role') || 'citizen';
const savedUser = localStorage.getItem('civicguard_user');

this.currentRole = savedRole;

if (savedUser) {
  try {
    this.currentUser = JSON.parse(savedUser);
  } catch (e) {
    this.currentUser =
      window.SAMPLE_DATA.users[savedRole] ||
      window.SAMPLE_DATA.users.citizen;
  }
} else {
  this.currentUser =
    window.SAMPLE_DATA.users[savedRole] ||
    window.SAMPLE_DATA.users.citizen;
}

    const savedNotifs = localStorage.getItem('civicguard_notifications');
    this.notifications = savedNotifs ? JSON.parse(savedNotifs) : [...window.SAMPLE_DATA.notifications];

    this.activeView = 'dashboard'; // 'landing', 'dashboard', 'report', 'tracking', 'employee', 'admin', 'map', 'analytics', 'tasks'
    this.selectedComplaintId = 'CG-1024';
    this.trackingComplaintId = 'CG-1024';
    this.toast = null;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event, data) {
    for (const listener of this.listeners) {
      listener(event, data, this);
    }
  }

  saveComplaints() {
    localStorage.setItem('civicguard_complaints', JSON.stringify(this.complaints));
  }

  saveNotifications() {
    localStorage.setItem('civicguard_notifications', JSON.stringify(this.notifications));
  }

  setRole(role) {
  if (['citizen', 'employee', 'admin'].includes(role)) {
    this.currentRole = role;

    const savedUser = localStorage.getItem('civicguard_user');

    if (savedUser) {
      try {
        const realUser = JSON.parse(savedUser);

        if (realUser.role === role) {
          this.currentUser = realUser;
        } else {
          this.currentUser = window.SAMPLE_DATA.users[role];
        }
      } catch (e) {
        this.currentUser = window.SAMPLE_DATA.users[role];
      }
    } else {
      this.currentUser = window.SAMPLE_DATA.users[role];
    }

    localStorage.setItem('civicguard_role', role);

    if (role === 'citizen') this.activeView = 'dashboard';
    else if (role === 'employee') this.activeView = 'employee';
    else if (role === 'admin') this.activeView = 'admin';

    this.showToast(
      `Switched persona to ${this.currentUser.name} (${role.toUpperCase()})`,
      'info'
    );

    this.notify('role:changed', {
      role,
      user: this.currentUser
    });
  }
}

  setView(view, params = {}) {
    this.activeView = view;
    if (params.complaintId) {
      this.selectedComplaintId = params.complaintId;
      this.trackingComplaintId = params.complaintId;
    }
    this.notify('view:changed', { view, params });
  }

  getComplaints() {
    return this.complaints;
  }

  getComplaint(id) {
  return this.complaints.find(
    c => c.id === id || c.complaintId === id
  ) || this.complaints[0];
}

  addComplaint(complaintData) {
    const id = `CG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint = {
      id,
      title: complaintData.title || `${complaintData.categoryLabel || 'Civic'} Issue`,
      category: complaintData.category || 'other',
      categoryLabel: complaintData.categoryLabel || 'Civic Issue',
      description: complaintData.description || 'Reported via CIVICGUARD AI citizen portal',
      location: complaintData.location || 'Zone 4, MG Road, Vijayawada',
      lat: complaintData.lat || 16.5062 + (Math.random() - 0.5) * 0.03,
      lng: complaintData.lng || 80.6480 + (Math.random() - 0.5) * 0.03,
      priority: complaintData.priority || 'high',
      status: 'reported', // Starts as reported
      reportedAt: 'Just now',
      reportedAtIso: new Date().toISOString(),
      timeElapsed: 'Just submitted',
      expectedCompletion: 'Under Review',
      citizen: {
        name: this.currentUser?.name || 'Ananya Sharma',
        phone: this.currentUser?.phone || '+91 98765 43210'
      },
      aiAnalysis: complaintData.aiAnalysis || {
        category: complaintData.categoryLabel || 'Civic Grievance',
        severity: complaintData.priority === 'high' ? 'High' : 'Moderate',
        priority: complaintData.priority || 'High',
        department: this.getDepartmentForCategory(complaintData.category),
        confidence: 95.2,
        urgency: 'Immediate Action (< 4h)',
        detectedObjects: ['Civic Anomaly', 'Public Safety Impact']
      },
      assignedDepartment: this.getDepartmentForCategory(complaintData.category),
      assignedEmployee: {
        id: 'EMP-408',
        name: 'Ramesh Kumar',
        phone: '+91 94401 23456',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      beforeImage: complaintData.beforeImage || window.SAMPLE_DATA.sampleImages.garbage_before,
      afterImage: null,
      verificationResult: null,
      feedback: null
    };

    // Prepend to complaints
    this.complaints.unshift(newComplaint);
    this.saveComplaints();

    // Add notification
    this.addNotification({
      role: 'citizen',
      title: 'Complaint Registered',
      message: `Your complaint #${newComplaint.id} (${newComplaint.title}) has been logged with AI Confidence 95.2%.`,
      complaintId: newComplaint.id
    });

    this.addNotification({
      role: 'employee',
      title: 'New Dispatch Alert',
      message: `Task #${newComplaint.id} at ${newComplaint.location} routed to your queue.`,
      complaintId: newComplaint.id
    });

    this.addNotification({
      role: 'admin',
      title: 'Civic Grievance Ingested',
      message: `AI categorized #${newComplaint.id} as [${newComplaint.priority.toUpperCase()}] priority.`,
      complaintId: newComplaint.id
    });

    this.showToast(`Complaint #${newComplaint.id} submitted successfully!`, 'success');
    this.notify('complaint:created', newComplaint);
    return newComplaint;
  }

  acceptTask(complaintId) {
    const comp = this.complaints.find(c => c.id === complaintId);
    if (comp) {
      comp.status = 'in_progress';
      comp.assignedEmployee = window.SAMPLE_DATA.users.employee;
      this.saveComplaints();

      this.addNotification({
        role: 'citizen',
        title: 'Worker On-Site',
        message: `${window.SAMPLE_DATA.users.employee.name} has accepted task #${comp.id} and started resolution.`,
        complaintId: comp.id
      });

      this.showToast(`Accepted Task #${comp.id}. Status changed to "Work In Progress"`, 'success');
      this.notify('complaint:updated', comp);
    }
  }
async completeTask(complaintId, afterImage = null) {
  console.log("COMPLETE TASK CALLED:", complaintId);

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
          status: 'completed'
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || 'Failed to mark complaint as completed'
      );
    }

    const comp = this.complaints.find(
      c => c.complaintId === complaintId || c.id === complaintId
    );

    if (comp) {
      comp.status = 'completed';
      comp.afterImage =
        afterImage || this.getSampleAfterImage(comp.category);

      comp.resolutionDuration = '3h 15m';

      comp.verificationResult = {
        verified: true,
        score: 96,
        aiVerdict:
          'Completion evidence appears consistent with the reported civic issue. Thorough cleanup detected.'
      };
    }

    await this.loadMyComplaints();

    this.addNotification({
      role: 'citizen',
      title: 'Work Completed - Please Verify',
      message: `Officer Ramesh Kumar has submitted resolution proof for #${complaintId}. Please confirm & rate.`,
      complaintId: complaintId
    });

    this.showToast(
      `Work for #${complaintId} completed & AI verification passed! (+50 pts)`,
      'success'
    );

    this.notify('complaint:completed', data.complaint);

    return data.complaint;

  } catch (error) {
    console.error('Failed to complete task:', error);

    this.showToast(
      error.message || 'Failed to mark task as completed',
      'error'
    );

    throw error;
  }
}

  async submitFeedback(complaintId, rating, comment) {
  const token = localStorage.getItem('civicguard_token');

  try {
    const response = await fetch(
      `http://localhost:5000/api/complaints/${complaintId}/feedback`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          comment: comment || 'Issue resolved smoothly by the civic team.'
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || 'Failed to submit feedback'
      );
    }

    const comp = this.complaints.find(
      c => c.complaintId === complaintId || c.id === complaintId
    );

    if (comp) {
      comp.status = 'resolved';

      comp.feedback = {
        rating,
        comment: comment || 'Issue resolved smoothly by the civic team.',
        date: 'Just now'
      };
    }

    window.SAMPLE_DATA.users.employee.score += 25;

    this.saveComplaints();

    this.addNotification({
      role: 'employee',
      title: 'Citizen Feedback Received',
      message: `Citizen gave ${rating}★ rating for #${complaintId}. +25 bonus performance points awarded!`,
      complaintId: complaintId
    });

    this.showToast(
      `Thank you! Your feedback has been recorded. Issue #${complaintId} closed.`,
      'success'
    );

    this.notify('complaint:feedbackSubmitted', comp);

    return data.complaint;

  } catch (error) {
    console.error('Failed to submit feedback:', error);

    this.showToast(
      error.message || 'Failed to submit feedback',
      'error'
    );
  }
}
  addNotification(notif) {
    const newNotif = {
      id: `notif_${Date.now()}_${Math.random()}`,
      time: 'Just now',
      unread: true,
      ...notif
    };
    this.notifications.unshift(newNotif);
    this.saveNotifications();
    this.notify('notification:added', newNotif);
  }

  markNotificationsRead(role = null) {
    for (const n of this.notifications) {
      if (!role || n.role === role) {
        n.unread = false;
      }
    }
    this.saveNotifications();
    this.notify('notification:read', {});
  }

  getDepartmentForCategory(cat) {
    const mapping = {
      garbage: 'Sanitation & Solid Waste Management',
      drainage: 'Sanitation & Solid Waste Management',
      roads: 'Public Works & Roads',
      streetlights: 'Electrical & Street Lighting',
      electricity: 'Electrical & Street Lighting',
      water: 'Water Supply & Sewerage',
      safety: 'Public Safety & Enforcement'
    };
    return mapping[cat] || 'General Municipal Administration';
  }

  getSampleAfterImage(cat) {
    const samples = window.SAMPLE_DATA.sampleImages;
    if (cat === 'roads') return samples.pothole_after;
    if (cat === 'streetlights') return samples.streetlight_after;
    if (cat === 'water') return samples.water_leak_after;
    return samples.garbage_after;
  }
  async loadMyComplaints() {
  const token = localStorage.getItem('civicguard_token');

  if (!token) {
    return;
  }

  try {
    const user = JSON.parse(
      localStorage.getItem('civicguard_user') || '{}'
    );

    const isEmployee = user.role === 'employee';

    const endpoint = isEmployee
      ? 'http://localhost:5000/api/complaints/all'
      : 'http://localhost:5000/api/complaints/my';

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || 'Failed to load complaints'
      );
    }

    this.complaints = data.complaints;

    this.notify('complaints:loaded', this.complaints);

    if (window.App && this.activeView === 'dashboard') {
      window.App.renderCurrentView();
    }

    this.notify('store:updated', this.complaints);

  } catch (error) {
    console.error('Failed to load complaints:', error);
  }
}

  showToast(message, type = 'info') {
    this.toast = { message, type, id: Date.now() };
    this.notify('toast:show', this.toast);
    setTimeout(() => {
      if (this.toast && this.toast.id === this.toast.id) {
        this.toast = null;
        this.notify('toast:hide', {});
      }
    }, 4000);
  }
}

window.store = new CivicGuardStore();
window.store.loadMyComplaints();
