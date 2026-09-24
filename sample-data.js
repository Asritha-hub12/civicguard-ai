// CIVICGUARD AI - Rich Realistic Sample Data & Imagery
window.SAMPLE_DATA = {
  users: {
    citizen: {
      id: 'usr_cit_1',
      name: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '+91 98765 43210',
      role: 'citizen',
      location: 'Ward 14, Zone 4, Vijayawada',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'Jan 2026',
      totalSubmitted: 6
    },
    employee: {
      id: 'EMP-408',
      name: 'Ramesh Kumar',
      email: 'ramesh.kumar@vijayawada.gov.in',
      phone: '+91 94401 23456',
      role: 'employee',
      department: 'Sanitation & Solid Waste Management',
      zone: 'Zone 4 - Central Urban',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      score: 850,
      tasksCompleted: 42,
      avgResolutionHours: 2.8,
      citizenRating: 4.9,
      badges: [
        { id: 'b1', title: 'Fast Resolver', icon: '🏆', desc: 'Resolved 10+ complaints under 2 hours' },
        { id: 'b2', title: 'Citizen Choice', icon: '⭐', desc: 'Maintained 4.8+ rating over 30 reviews' },
        { id: 'b3', title: 'Quick Response', icon: '⚡', desc: 'Accepted dispatch in under 5 minutes' },
        { id: 'b4', title: 'Civic Champion', icon: '🛡️', desc: 'Top 5 field officer of the month' }
      ]
    },
    admin: {
      id: 'adm_01',
      name: 'Dr. K. S. Rao, IAS',
      title: 'Municipal Commissioner & Smart City Director',
      email: 'commissioner@vijayawada.gov.in',
      role: 'admin',
      zone: 'All Municipal Zones (1 - 5)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    }
  },

  departments: [
    { id: 'dept_sanitation', name: 'Sanitation & Solid Waste', head: 'R. K. Sharma', activeWorkers: 48, slaRate: '96.2%', color: '#0d9488' },
    { id: 'dept_roads', name: 'Public Works & Roads', head: 'V. Sundaram', activeWorkers: 34, slaRate: '91.8%', color: '#0284c7' },
    { id: 'dept_electrical', name: 'Electrical & Street Lighting', head: 'K. Meena', activeWorkers: 26, slaRate: '97.5%', color: '#f59e0b' },
    { id: 'dept_water', name: 'Water Supply & Sewerage', head: 'P. Verma', activeWorkers: 39, slaRate: '94.0%', color: '#06b6d4' }
  ],

  zones: [
    { id: 'zone_1', name: 'Zone 1 - One Town Old City', complaints: 84, risk: 'Medium' },
    { id: 'zone_2', name: 'Zone 2 - Governorpet Commercial', complaints: 62, risk: 'Low' },
    { id: 'zone_3', name: 'Zone 3 - Suryaraopet Residential', complaints: 45, risk: 'Low' },
    { id: 'zone_4', name: 'Zone 4 - MG Road & Market District', complaints: 142, risk: 'High' },
    { id: 'zone_5', name: 'Zone 5 - Benz Circle & Ring Road', complaints: 98, risk: 'Medium' }
  ],

  sampleImages: {
    garbage_before: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
    garbage_after: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    pothole_before: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    pothole_after: 'https://images.unsplash.com/photo-1584463699031-6456f91f7ff0?w=800&auto=format&fit=crop&q=80',
    streetlight_before: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    streetlight_after: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    water_leak_before: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80',
    water_leak_after: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
  },

  complaints: [
    {
      id: 'CG-1024',
      title: 'Massive garbage accumulation near Vegetable Market',
      category: 'garbage',
      categoryLabel: 'Garbage & Waste',
      description: 'Solid waste container overflowing onto the pedestrian footpath for past 24 hours. Stray animals scattering plastic and organic waste across the road.',
      location: 'Opposite Rythu Bazar, MG Road, Zone 4, Vijayawada',
      lat: 16.5062,
      lng: 80.6480,
      priority: 'high',
      status: 'in_progress', // reported -> ai_analyzed -> assigned -> in_progress -> completed -> verified -> resolved
      reportedAt: 'Today, 10:30 AM',
      reportedAtIso: '2026-09-21T10:30:00',
      timeElapsed: '2h 15m',
      expectedCompletion: 'Today, 02:30 PM',
      citizen: {
        name: 'Ananya Sharma',
        phone: '+91 98765 43210'
      },
      aiAnalysis: {
        category: 'Waste Management',
        severity: 'High',
        priority: 'High',
        department: 'Sanitation & Solid Waste',
        confidence: 96.4,
        urgency: 'Immediate Action (< 4h)',
        detectedObjects: ['Organic Waste', 'Plastic Bags', 'Footpath Obstruction']
      },
      assignedDepartment: 'Sanitation & Solid Waste Management',
      assignedEmployee: {
        id: 'EMP-408',
        name: 'Ramesh Kumar',
        phone: '+91 94401 23456',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      beforeImage: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
      afterImage: null,
      verificationResult: null,
      feedback: null
    },
    {
      id: 'CG-1025',
      title: 'Hazardous deep pothole on Ring Road curve',
      category: 'roads',
      categoryLabel: 'Roads & Potholes',
      description: 'Deep road crater developed after recent pipe excavation. Two-wheelers are losing balance in night hours.',
      location: 'Near Benz Circle Flyover Pillar 24, Zone 5, Vijayawada',
      lat: 16.4971,
      lng: 80.6558,
      priority: 'high',
      status: 'assigned',
      reportedAt: 'Today, 09:15 AM',
      reportedAtIso: '2026-09-21T09:15:00',
      timeElapsed: '3h 30m',
      expectedCompletion: 'Today, 04:00 PM',
      citizen: {
        name: 'K. Venkatesh',
        phone: '+91 98480 11223'
      },
      aiAnalysis: {
        category: 'Road Infrastructure',
        severity: 'Critical',
        priority: 'High',
        department: 'Public Works & Roads',
        confidence: 94.2,
        urgency: 'Immediate Action (< 4h)',
        detectedObjects: ['Asphalt Fracture', 'Pothole Depth > 15cm', 'Traffic Lane Compromised']
      },
      assignedDepartment: 'Public Works & Roads',
      assignedEmployee: {
        id: 'EMP-312',
        name: 'Sunita Verma',
        phone: '+91 98234 56789',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      },
      beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
      afterImage: null,
      verificationResult: null,
      feedback: null
    },
    {
      id: 'CG-1022',
      title: 'Series of 4 broken street lights causing blind spot',
      category: 'streetlights',
      categoryLabel: 'Street Lights',
      description: 'The street lights have been dark for 3 days. Women and elderly citizens feel unsafe walking after 7 PM.',
      location: '4th Cross Road, Suryaraopet, Zone 3, Vijayawada',
      lat: 16.5124,
      lng: 80.6322,
      priority: 'medium',
      status: 'resolved',
      reportedAt: 'Yesterday, 10:30 AM',
      reportedAtIso: '2026-09-20T10:30:00',
      timeElapsed: 'Completed',
      expectedCompletion: 'Resolved in 3h 45m',
      resolutionDuration: '3h 45m',
      citizen: {
        name: 'Ananya Sharma',
        phone: '+91 98765 43210'
      },
      aiAnalysis: {
        category: 'Public Electrical',
        severity: 'Medium',
        priority: 'Medium',
        department: 'Electrical & Street Lighting',
        confidence: 98.1,
        urgency: 'Scheduled (< 8h)',
        detectedObjects: ['LED Luminaire Failure', 'Junction Box Loose Wire']
      },
      assignedDepartment: 'Electrical & Street Lighting',
      assignedEmployee: {
        id: 'EMP-188',
        name: 'Anil Rao',
        phone: '+91 97000 88990',
        rating: 4.95,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      },
      beforeImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
      afterImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      verificationResult: {
        verified: true,
        score: 98,
        aiVerdict: 'Completion evidence appears consistent with the reported civic issue. Fully illuminated 90W LED luminaires detected.'
      },
      feedback: {
        rating: 5,
        comment: 'Very fast and prompt resolution! Technicians arrived within 2 hours and replaced the bulbs. Great service.',
        date: 'Yesterday, 03:15 PM'
      }
    },
    {
      id: 'CG-1028',
      title: 'Main pipeline leakage wasting potable drinking water',
      category: 'water',
      categoryLabel: 'Water Supply',
      description: 'Underground drinking water feeder pipe burst, water gushing onto the road and flooding residential basements.',
      location: 'Near Old Bus Stand, One Town, Zone 1, Vijayawada',
      lat: 16.5188,
      lng: 80.6195,
      priority: 'high',
      status: 'ai_analyzed',
      reportedAt: 'Today, 11:10 AM',
      reportedAtIso: '2026-09-21T11:10:00',
      timeElapsed: '35m',
      expectedCompletion: 'Today, 03:00 PM',
      citizen: {
        name: 'M. Jagadish',
        phone: '+91 99123 44556'
      },
      aiAnalysis: {
        category: 'Water Distribution',
        severity: 'High',
        priority: 'High',
        department: 'Water Supply & Sewerage',
        confidence: 95.8,
        urgency: 'Critical Action (< 2h)',
        detectedObjects: ['Pressurized Water Plume', 'Asphalt Submersion']
      },
      assignedDepartment: 'Water Supply & Sewerage',
      assignedEmployee: null,
      beforeImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80',
      afterImage: null,
      verificationResult: null,
      feedback: null
    },
    {
      id: 'CG-1019',
      title: 'Storm drain clogged with construction debris',
      category: 'drainage',
      categoryLabel: 'Drainage & Sewage',
      description: 'Drainage canal blocked by cement bags and gravel causing backflow of wastewater into colony lanes.',
      location: 'Lane 7, Governorpet, Zone 2, Vijayawada',
      lat: 16.5098,
      lng: 80.6401,
      priority: 'medium',
      status: 'completed',
      reportedAt: 'Yesterday, 08:30 AM',
      reportedAtIso: '2026-09-20T08:30:00',
      timeElapsed: '4h 10m',
      expectedCompletion: 'Verification Pending',
      resolutionDuration: '4h 10m',
      citizen: {
        name: 'P. Lakshmi',
        phone: '+91 98499 77889'
      },
      aiAnalysis: {
        category: 'Drainage Sanitation',
        severity: 'Medium',
        priority: 'Medium',
        department: 'Sanitation & Solid Waste',
        confidence: 93.7,
        urgency: 'Standard (< 6h)',
        detectedObjects: ['Debris Blockage', 'Silt Accumulation']
      },
      assignedDepartment: 'Sanitation & Solid Waste Management',
      assignedEmployee: {
        id: 'EMP-408',
        name: 'Ramesh Kumar',
        phone: '+91 94401 23456',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      beforeImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      afterImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      verificationResult: {
        verified: true,
        score: 95,
        aiVerdict: 'Completion evidence appears consistent with the reported civic issue. Clear drainage flow restored.'
      },
      feedback: null
    }
  ],

  aiInsights: {
    mostReported: 'Garbage & Solid Waste (38% of total)',
    highRiskZone: 'Zone 4 - MG Road & Market District',
    avgResolutionTime: '3h 48m',
    increasingTrend: 'Road Potholes (+24% this week following monsoon showers)',
    recommendation: 'Waste-management complaints have increased by 38% in Zone 4 commercial belt. AI recommends increasing compactor collection frequency from 1x to 3x daily between 6 AM and 2 PM to eliminate peak backlog.',
    categoryBreakdown: {
      labels: ['Garbage & Waste', 'Roads & Potholes', 'Street Lights', 'Water Supply', 'Drainage', 'Public Safety'],
      data: [38, 24, 16, 12, 7, 3]
    },
    weeklyTrend: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      reported: [42, 58, 65, 52, 74, 48, 36],
      resolved: [40, 55, 62, 50, 71, 46, 35]
    },
    deptPerformance: {
      labels: ['Sanitation', 'Roads (PWD)', 'Electrical', 'Water Supply'],
      scores: [96.2, 91.8, 97.5, 94.0]
    }
  },

  notifications: [
    {
      id: 'notif_1',
      role: 'citizen',
      title: 'Complaint In Progress',
      message: 'Field Officer Ramesh Kumar has accepted task CG-1024 and is on-site at Rythu Bazar, MG Road.',
      time: '12 mins ago',
      unread: true,
      complaintId: 'CG-1024'
    },
    {
      id: 'notif_2',
      role: 'citizen',
      title: 'Complaint Resolved & Verified',
      message: 'Your streetlight complaint CG-1022 at Suryaraopet has been verified resolved. Please share your rating.',
      time: '1 hour ago',
      unread: false,
      complaintId: 'CG-1022'
    },
    {
      id: 'notif_3',
      role: 'employee',
      title: 'High-Priority Dispatch Assigned',
      message: 'New Urgent civic issue CG-1024 (Garbage accumulation) assigned to your beat in Zone 4.',
      time: '25 mins ago',
      unread: true,
      complaintId: 'CG-1024'
    },
    {
      id: 'notif_4',
      role: 'employee',
      title: 'Citizen Rating Received',
      message: 'Ananya Sharma rated you 5 Stars for Streetlight Resolution CG-1022. +50 Performance Points awarded!',
      time: '2 hours ago',
      unread: false,
      complaintId: 'CG-1022'
    },
    {
      id: 'notif_5',
      role: 'admin',
      title: 'Spike Alert: Zone 4 Waste Backlog',
      message: 'AI detected 38% surge in garbage reports near MG Road commercial cluster. Recommended auto-dispatch of backup compactor.',
      time: '30 mins ago',
      unread: true,
      complaintId: 'CG-1024'
    },
    {
      id: 'notif_6',
      role: 'admin',
      title: 'Critical Infrastructure Alert',
      message: 'High priority drinking water pipeline rupture detected in Zone 1 (CG-1028). Emergency team notified.',
      time: '45 mins ago',
      unread: true,
      complaintId: 'CG-1028'
    }
  ]
};
