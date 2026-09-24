// CIVICGUARD AI - Multilingual Localization (English, Hindi, Telugu, Odia)
window.I18N = {
  currentLang: localStorage.getItem('civicguard_lang') || 'en',

  translations: {
    en: {
      appName: 'CIVICGUARD AI',
      tagline: 'Our City, Our Guard.',
      theme: 'INNOVATE WITHOUT BORDERS',
      heroTitle: 'AI-Powered Civic Problem Management',
      heroSubtitle: 'Report. Resolve. Track. Transform.',
      heroDesc: 'Connecting citizens, municipal workers, and smart-city administrators through computer vision, automated urgency scoring, and transparent resolution tracking.',
      reportProblem: 'Report a Problem',
      explorePlatform: 'Explore Platform',
      askVoice: 'Ask CivicGuard',
      quickDemo: 'Quick Persona Switcher',
      citizen: 'Citizen',
      employee: 'Municipal Employee',
      admin: 'City Administrator',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      myComplaints: 'My Complaints',
      trackComplaint: 'Track Complaint',
      notifications: 'Notifications',
      voiceAssistant: 'Voice Assistant',
      profile: 'Profile',
      activeComplaints: 'Active Complaints',
      resolvedComplaints: 'Resolved Complaints',
      avgResolutionTime: 'Average Resolution Time',
      myReports: 'My Reports',
      reportCivicProblem: 'Report a Civic Problem',
      fastEasyAi: 'AI-Assisted in under 60 seconds',
      complaintId: 'Complaint ID',
      status: 'Status',
      category: 'Category',
      priority: 'Priority',
      location: 'Location',
      reportedAt: 'Reported At',
      actions: 'Actions',
      viewDetails: 'View Details',
      categories: {
        garbage: 'Garbage & Waste',
        roads: 'Roads & Potholes',
        streetlights: 'Street Lights',
        water: 'Water Supply',
        drainage: 'Drainage & Sewage',
        electricity: 'Electricity & Grid',
        safety: 'Public Safety',
        other: 'Other Civic Issue'
      },
      statuses: {
        reported: 'Reported',
        ai_analyzed: 'AI Analyzed',
        assigned: 'Assigned',
        in_progress: 'Worker In Progress',
        completed: 'Work Completed',
        verified: 'Verified',
        resolved: 'Resolved'
      },
      priorities: {
        high: 'High Priority',
        medium: 'Medium Priority',
        low: 'Low Priority'
      },
      voicePrompt: 'Click the mic or speak your civic problem in your language',
      voiceSample1: 'There is garbage overflowing near Gandhi Market street.',
      voiceSample2: 'Dangerous pothole on Ring Road causing severe traffic.',
      voiceSample3: 'Streetlights are off on 4th Main Road since two days.'
    },
    hi: {
      appName: 'सिविकगार्ड AI',
      tagline: 'हमारा शहर, हमारा रक्षक।',
      theme: 'सीमाओं से परे नवाचार',
      heroTitle: 'एआई-संचालित नागरिक समस्या प्रबंधन',
      heroSubtitle: 'रिपोर्ट करें. समाधान पाएं. ट्रैक करें. बदलें.',
      heroDesc: 'नागरिकों, नगरपालिका कर्मचारियों और स्मार्ट-सिटी प्रशासकों को कंप्यूटर विज़न और पारदर्शी ट्रैकिंग से जोड़ना।',
      reportProblem: 'समस्या रिपोर्ट करें',
      explorePlatform: 'प्लेटफ़ॉर्म देखें',
      askVoice: 'सिविकगार्ड से बोलें',
      quickDemo: 'डेमो रोल बदलें',
      citizen: 'नागरिक',
      employee: 'नगरपालिका कर्मचारी',
      admin: 'शहर प्रशासक',
      login: 'लॉग इन',
      register: 'पंजीकरण',
      logout: 'लॉग आउट',
      dashboard: 'डैशबोर्ड',
      myComplaints: 'मेरी शिकायतें',
      trackComplaint: 'शिकायत ट्रैक करें',
      notifications: 'सूचनाएं',
      voiceAssistant: 'वॉयस असिस्टेंट',
      profile: 'प्रोफ़ाइल',
      activeComplaints: 'सक्रिय शिकायतें',
      resolvedComplaints: 'हल की गई शिकायतें',
      avgResolutionTime: 'औसत समाधान समय',
      myReports: 'मेरी रिपोर्टें',
      reportCivicProblem: 'नागरिक समस्या दर्ज करें',
      fastEasyAi: 'एआई सहायता से 60 सेकंड में',
      complaintId: 'शिकायत संख्या',
      status: 'स्थिति',
      category: 'श्रेणी',
      priority: 'प्राथमिकता',
      location: 'स्थान',
      reportedAt: 'दर्ज समय',
      actions: 'कार्रवाई',
      viewDetails: 'विवरण देखें',
      categories: {
        garbage: 'कचरा और सफाई',
        roads: 'सड़क और गड्ढे',
        streetlights: 'स्ट्रीट लाइट',
        water: 'पानी की आपूर्ति',
        drainage: 'नाली और सीवरेज',
        electricity: 'बिजली समस्या',
        safety: 'सार्वजनिक सुरक्षा',
        other: 'अन्य नागरिक समस्या'
      },
      statuses: {
        reported: 'दर्ज की गई',
        ai_analyzed: 'एआई विश्लेषित',
        assigned: 'कार्य सौंपा गया',
        in_progress: 'कार्य प्रगति पर',
        completed: 'कार्य पूर्ण',
        verified: 'सत्यापित',
        resolved: 'हल हो गया'
      },
      priorities: {
        high: 'उच्च प्राथमिकता',
        medium: 'मध्यम प्राथमिकता',
        low: 'सामान्य'
      },
      voicePrompt: 'माइक दबाएं या अपनी भाषा में नागरिक समस्या बोलें',
      voiceSample1: 'गांधी मार्केट के पास सड़क पर बहुत कचरा फैला हुआ है।',
      voiceSample2: 'रिंग रोड पर बड़ा गड्ढा है जिससे दुर्घटना का खतरा है।',
      voiceSample3: 'चौथे मेन रोड की स्ट्रीट लाइट दो दिनों से बंद है।'
    },
    te: {
      appName: 'సివిక్‌గార్డ్ AI',
      tagline: 'మన నగరం, మన రక్షణ.',
      theme: 'సరిహద్దులు లేని ఆవిష్కరణ',
      heroTitle: 'AI ఆధారిత పౌర సమస్యల పరిష్కార వేదిక',
      heroSubtitle: 'నివేదించండి. పరిష్కరించండి. ట్రాక్ చేయండి. మార్పు తీసుకురండి.',
      heroDesc: 'పౌరులు, మున్సిపల్ సిబ్బంది మరియు పరిపాలనా అధికారులను AI ద్వారా అనుసంధానించే అధునాతన వ్యవస్థ.',
      reportProblem: 'సమస్యను నివేదించండి',
      explorePlatform: 'ప్లాట్‌ఫారమ్‌ను చూడండి',
      askVoice: 'సివిక్‌గార్డ్ వాయిస్ అసిస్టెంట్',
      quickDemo: 'డెమో పాత్ర మార్చండి',
      citizen: 'పౌరుడు',
      employee: 'మున్సిపల్ ఉద్యోగి',
      admin: 'నగర నిర్వాహకుడు',
      login: 'లాగిన్',
      register: 'రిజిస్టర్',
      logout: 'లాగ్ అవుట్',
      dashboard: 'డ్యాష్‌బోర్డ్',
      myComplaints: 'నా ఫిర్యాదులు',
      trackComplaint: 'ఫిర్యాదు ట్రాక్ చేయండి',
      notifications: 'నోటిఫికేషన్లు',
      voiceAssistant: 'వాయిస్ అసిస్టెంట్',
      profile: 'ప్రొఫైల్',
      activeComplaints: 'పరిష్కారంలో ఉన్నవి',
      resolvedComplaints: 'పరిష్కరించబడినవి',
      avgResolutionTime: 'సగటు పరిష్కార సమయం',
      myReports: 'నా నివేదికలు',
      reportCivicProblem: 'పౌర సమస్యను నమోదు చేయండి',
      fastEasyAi: 'AI సహాయంతో 60 సెకన్లలో',
      complaintId: 'ఫిర్యాదు సంఖ్య',
      status: 'స్థితి',
      category: 'విభాగం',
      priority: 'ప్రాధాన్యత',
      location: 'ప్రాంతం',
      reportedAt: 'నమోదు సమయం',
      actions: 'చర్యలు',
      viewDetails: 'వివరాలు చూడండి',
      categories: {
        garbage: 'చెత్త & పారిశుధ్యం',
        roads: 'రహదారులు & గుంతలు',
        streetlights: 'వీధి దీపాలు',
        water: 'తాగునీటి సరఫరా',
        drainage: 'డ్రైనేజీ & మురుగునీరు',
        electricity: 'విద్యుత్ సరఫరా',
        safety: 'ప్రజా భద్రత',
        other: 'ఇతర పౌర సమస్య'
      },
      statuses: {
        reported: 'నమోదైంది',
        ai_analyzed: 'AI విశ్లేషించింది',
        assigned: 'సిబ్బందికి కేటాయించబడింది',
        in_progress: 'పని జరుగుతోంది',
        completed: 'పని పూర్తయింది',
        verified: 'ధృవీకరించబడింది',
        resolved: 'పరిష్కరించబడింది'
      },
      priorities: {
        high: 'అత్యవసరం (హై)',
        medium: 'మధ్యస్థం',
        low: 'సాధారణం'
      },
      voicePrompt: 'మైక్ క్లిక్ చేసి మీ సమస్యను తెలుగులో మాట్లాడండి',
      voiceSample1: 'విజయవాడ మార్కెట్ రోడ్డులో చెత్త ఎక్కువగా పేరుకుపోయింది.',
      voiceSample2: 'మెయిన్ రోడ్డుపై పెద్ద గుంత ప్రమాదకరంగా ఉంది.',
      voiceSample3: 'రెండు రోజులుగా వీధి లైట్లు వెలగడం లేదు.'
    },
    or: {
      appName: 'ସିଭିକ୍‌ଗାର୍ଡ AI',
      tagline: 'ଆମ ସହର, ଆମ ସୁରକ୍ଷା।',
      theme: 'ସୀମାହୀନ ନବସୃଜନ',
      heroTitle: 'AI-ଚାଳିତ ନାଗରିକ ସମସ୍ୟା ସମାଧାନ',
      heroSubtitle: 'ରିପୋର୍ଟ କରନ୍ତୁ. ସମାଧାନ ପାଆନ୍ତୁ. ଟ୍ରାକ୍ କରନ୍ତୁ. ପରିବର୍ତ୍ତନ ଆଣନ୍ତୁ.',
      heroDesc: 'ନାଗରିକ, ପୌରପାଳିକା କର୍ମଚାରୀ ଏବଂ ସହର ପ୍ରଶାସକଙ୍କୁ ସଂଯୋଗ କରୁଥିବା ଆଧୁନିକ ଗଭଟେକ୍ ପ୍ଲାଟଫର୍ମ।',
      reportProblem: 'ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ',
      explorePlatform: 'ପ୍ଲାଟଫର୍ମ ଦେଖନ୍ତୁ',
      askVoice: 'ସିଭିକ୍‌ଗାର୍ଡ ସହିତ କଥା ହୁଅନ୍ତୁ',
      quickDemo: 'ଡେମୋ ରୋଲ୍ ବଦଳାନ୍ତୁ',
      citizen: 'ନାଗରିକ',
      employee: 'ପୌର କର୍ମଚାରୀ',
      admin: 'ସହର ପ୍ରଶାସକ',
      login: 'ଲଗ୍ ଇନ୍',
      register: 'ପଞ୍ଜୀକରଣ',
      logout: 'ଲଗ୍ ଆଉଟ୍',
      dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
      myComplaints: 'ମୋର ଅଭିଯୋଗ',
      trackComplaint: 'ଟ୍ରାକ୍ କରନ୍ତୁ',
      notifications: 'ବିଜ୍ଞପ୍ତି',
      voiceAssistant: 'ଭଏସ୍ ସହାୟକ',
      profile: 'ପ୍ରୋଫାଇଲ୍',
      activeComplaints: 'ଚାଲୁଥିବା ଅଭିଯୋଗ',
      resolvedComplaints: 'ସମାଧାନ ହୋଇଥିବା',
      avgResolutionTime: 'ହାରାହାରି ସମାଧାନ ସମୟ',
      myReports: 'ମୋର ରିପୋର୍ଟ',
      reportCivicProblem: 'ନାଗରିକ ସମସ୍ୟା ଦାଖଲ କରନ୍ତୁ',
      fastEasyAi: 'AI ସହାୟତାରେ ୬୦ ସେକେଣ୍ଡରେ',
      complaintId: 'ଅଭିଯୋଗ ଆଇଡି',
      status: 'ସ୍ଥିତି',
      category: 'ବିଭାଗ',
      priority: 'ପ୍ରାଥମିକତା',
      location: 'ସ୍ଥାନ',
      reportedAt: 'ଦାଖଲ ସମୟ',
      actions: 'କାର୍ଯ୍ୟାନୁଷ୍ଠାନ',
      viewDetails: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
      categories: {
        garbage: 'ଆବର୍ଜନା ଓ ସଫେଇ',
        roads: 'ରାସ୍ତା ଓ ଖାଲଖମା',
        streetlights: 'ଷ୍ଟ୍ରିଟ୍ ଲାଇଟ୍',
        water: 'ପାନୀୟ ଜଳ ଯୋଗାଣ',
        drainage: 'ଡ୍ରେନେଜ୍ ଓ ନାଳ',
        electricity: 'ବିଦ୍ୟୁତ୍ ସେବା',
        safety: 'ସର୍ବସାଧାରଣ ସୁରକ୍ଷା',
        other: 'ଅନ୍ୟାନ୍ୟ ନାଗରିକ ସମସ୍ୟା'
      },
      statuses: {
        reported: 'ଦାଖଲ ହୋଇଛି',
        ai_analyzed: 'AI ବିଶ୍ଳେଷିତ',
        assigned: 'କର୍ମଚାରୀଙ୍କୁ ନ୍ୟସ୍ତ',
        in_progress: 'କାମ ଚାଲିଛି',
        completed: 'କାମ ସମ୍ପୂର୍ଣ୍ଣ',
        verified: 'ଯାଞ୍ଚିତ',
        resolved: 'ସମାଧାନ ହୋଇଛି'
      },
      priorities: {
        high: 'ଅତି ଜରୁରୀ (High)',
        medium: 'ମଧ୍ୟମ',
        low: 'ସାଧାରଣ'
      },
      voicePrompt: 'ମାଇକ୍ ଚିପି ନିଜ ଭାଷାରେ ସମସ୍ୟା କୁହନ୍ତୁ',
      voiceSample1: 'ଗାନ୍ଧୀ ମାର୍କେଟ୍ ରାସ୍ତାରେ ଅଳିଆ ଜମା ହୋଇ ରହିଛି।',
      voiceSample2: 'ମୁଖ୍ୟ ରାସ୍ତାରେ ବଡ ଖାଲ ହୋଇ ଦୁର୍ଘଟଣା ଘଟୁଛି।',
      voiceSample3: 'ଦୁଇ ଦିନ ହେଲା ଷ୍ଟ୍ରିଟ୍ ଲାଇଟ୍ ଜଳୁନାହିଁ।'
    }
  },

  setLang(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('civicguard_lang', lang);
      document.documentElement.lang = lang;
      if (window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('civicguard:langChanged', { detail: { lang } }));
      }
    }
  },

  t(key, fallback = '') {
    const keys = key.split('.');
    let res = this.translations[this.currentLang];
    for (const k of keys) {
      if (res && res[k] !== undefined) {
        res = res[k];
      } else {
        // Fallback to English
        let enRes = this.translations.en;
        for (const ek of keys) {
          if (enRes && enRes[ek] !== undefined) enRes = enRes[ek];
          else return fallback || key;
        }
        return enRes;
      }
    }
    return res;
  }
};
