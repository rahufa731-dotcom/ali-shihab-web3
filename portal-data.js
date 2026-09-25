/**
 * DNAC Digital Campus - Master Data Store
 * Darunnajath Arabic College (DNAC) • كلية دار النجاة العربية
 * Concept Note Implementation: Comprehensive Institutional Data
 */

const DNAC_DATA = {
  collegeInfo: {
    name: "Darunnajath Arabic College",
    campusName: "DNAC Koonanchery",
    shortName: "DNAC",
    arabicName: "كلية دار النجاة العربية - كوننجيري",
    tagline: "Centre of Excellence in Islamic & Arabic Studies • Founded by K.K.M. Koya Musliyar (1987)",
    affiliation: "Affiliated with Darul Huda Islamic University (DHIU)",
    recognition: "Under Darul Huda Islamic University Academic System",
    accreditation: "DHIU Certified Academic Excellence",
    established: "1987",
    cmsUrl: "https://app.dnaclive.in",
    campusArea: "Lush Green Academic Quadrangle Campus",
    location: {
      address: "DNAC Koonanchery, Ulliyeri - Modakkallur Road, Kozhikode District, Kerala, India",
      city: "Koonanchery",
      state: "Kerala",
      pincode: "673323",
      phonePrimary: "+91 4933 245 889",
      phoneAdmissions: "+91 4933 245 890",
      phonePrincipal: "+91 4933 245 891",
      email: "info@dnaclive.in",
      admissionsEmail: "admissions@dnaclive.in",
      examEmail: "exams@dnaclive.in"
    },
    stats: {
      heritageYears: 50,
      enrolledStudents: 1280,
      totalAlumni: 16500,
      facultyCount: 52,
      placementRate: "96.4%",
      universityRanks: 42
    },
    principalMessage: {
      name: "Usthad Hassainar Baqawi",
      arabicName: "أستاذ حسينار البقاوي",
      title: "Principal & Scholar",
      qualifications: "Baqawi • Islamic Jurisprudence & Classical Studies",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "At DNAC Koonanchery, our mission is to nurture visionary scholars whose profound command of Islamic sciences and classical wisdom illuminates contemporary society with ethical leadership and intellectual integrity.",
      fullMessage: "Darunnajath Arabic College (DNAC) Koonanchery stands as a distinguished center of Islamic and Arabic education affiliated with Darul Huda Islamic University (DHIU). Founded under the visionary leadership of Marhum K.K.M. Koya Musliyar in 1987, we take pride in offering our students a vibrant campus environment where classical Islamic disciplines, moral cultivation, and modern linguistic excellence harmonize."
    },
    vision: "To be an internationally recognized center of excellence in Arabic linguistics, literary criticism, and Islamic jurisprudence, nurturing intellectually capable, morally grounded, and socially responsible global leaders.",
    mission: [
      "Impart intensive, high-standard instruction in classical and contemporary Arabic language, literature, and philology.",
      "Cultivate advanced research capabilities in Islamic jurisprudence, comparative cultural studies, and professional translation.",
      "Integrate cutting-edge digital pedagogy, language laboratories, and modern humanities to enhance global career competence.",
      "Foster pluralism, ethical stewardship, community service, and intercultural dialogue among aspiring scholars."
    ],
    coreValues: [
      { title: "Scholarly Rigor", icon: "fa-book-open-reader", desc: "Uncompromising dedication to authentic classical knowledge and critical textual analysis." },
      { title: "Ethical Integrity", icon: "fa-scale-balanced", desc: "Living principles of universal justice, humility, and moral responsibility." },
      { title: "Linguistic Mastery", icon: "fa-feather-pointed", desc: "Excellence in eloquent written, spoken, and professional Arabic communication." },
      { title: "Digital Innovation", icon: "fa-microchip", desc: "Harnessing digital translation suites, e-makthaba libraries, and modern pedagogy." }
    ]
  },

  facilities: [
    {
      id: "library",
      title: "Allama Shibli Nomani Central Library & Research Wing",
      arabicTitle: "المكتبة المركزية",
      category: "Academic",
      icon: "fa-book-bookmark",
      image: "assets/images/library.jpg",
      description: "A dedicated library and reading space that supports Arabic, Islamic and general studies through quiet, focused learning.",
      features: ["Reference Collections", "Arabic & Islamic Studies", "Reading Space", "Student Research Support"]
    },
    {
      id: "lang-lab",
      title: "Computer & Digital Learning Lab",
      arabicTitle: "مختبر اللغات والترجمة الفورية",
      category: "Technology",
      icon: "fa-headphones-simple",
      image: "assets/images/computer-lab.jpg",
      description: "A digital learning space for computer literacy, research, academic projects and technology-enabled learning.",
      features: ["Computer Workstations", "Digital Learning", "Academic Research", "Technology Support"]
    },
    {
      id: "auditorium",
      title: "Campus Auditorium",
      arabicTitle: "قاعة المؤتمرات الدولية",
      category: "Campus",
      icon: "fa-landmark",
      image: "assets/images/auditorium.jpg",
      description: "A dedicated venue for assemblies, lectures, cultural programmes, presentations and campus gatherings.",
      features: ["Stage & Seating", "Academic Events", "Cultural Programmes", "Guest Sessions"]
    },
    {
      id: "classrooms",
      title: "Digital Smart Classrooms & Seminar Halls",
      arabicTitle: "الفصول الذكية",
      category: "Academic",
      icon: "fa-chalkboard-user",
      image: "assets/images/smart-classroom.jpg",
      description: "Technology-enabled classrooms designed to support engaging lessons, collaboration and modern teaching methods.",
      features: ["Digital Displays", "Collaborative Learning", "Flexible Seating", "Teaching Technology"]
    },
    {
      id: "hostels",
      title: "Residential Student Life",
      arabicTitle: "السكن الجامعي والمطعم",
      category: "Life",
      icon: "fa-hotel",
      image: "assets/images/residential.webp",
      description: "A supportive residential environment that helps students balance study, community life and personal growth.",
      features: ["Residential Support", "Study-Friendly Environment", "Community Living", "Student Wellbeing"]
    },
    {
      id: "sports",
      title: "Campus Sports Complex & Botanical Grounds",
      arabicTitle: "المجمع الرياضي والحديقة",
      category: "Life",
      icon: "fa-futbol",
      image: "assets/images/sports.jpg",
      description: "Sports and recreation activities that encourage teamwork, fitness and a healthy campus life.",
      features: ["Football Activities", "Teamwork", "Fitness", "Student Recreation"]
    }
  ],

  studentActivities: [
    {
      id: "union",
      title: "DISA (Darunnajath Islamic Students' Association)",
      arabicTitle: "اتحاد ديسا للطلبة",
      category: "Leadership",
      icon: "fa-people-roof",
      image: "assets/images/student-group.png",
      description: "The official, vibrant student association of DNAC Koonanchery organizing campus debates, academic magazines, inter-collegiate festivals, and social initiatives."
    },
    {
      id: "nadi-adab",
      title: "Nadi Al-Adab (Spoken Arabic & Literary Guild)",
      arabicTitle: "نادي الأدب العربي",
      category: "Literary",
      icon: "fa-pen-nib",
      image: "assets/images/student-presentation.webp",
      description: "Weekly Arabic debates, extempore speeches, dramatic plays, and creative writing workshops to hone native-like fluency in Modern Standard Arabic."
    },
    {
      id: "calligraphy",
      title: "Diwan Al-Khatt (Arabic Calligraphy Club)",
      arabicTitle: "ديوان الخط العربي",
      category: "Arts",
      icon: "fa-paintbrush",
      image: "assets/images/student-session.webp",
      description: "Preserving the sacred classical script traditions — Thuluth, Naskh, Diwani, Ruq'ah, and Kufic — under master calligraphers."
    },
    {
      id: "qiraat",
      title: "Tajweed & Qira'at Excellence Forum",
      arabicTitle: "منتدى التجويد والقراءات",
      category: "Spiritual",
      icon: "fa-book-quran",
      image: "assets/images/mentorship.png",
      description: "Specialized training in Quranic recitation rules, maqamat acoustics, and inter-collegiate recitation competitions."
    },
    {
      id: "nss",
      title: "National Service Scheme (NSS Unit #142)",
      arabicTitle: "خدمة المجتمع والبيئة",
      category: "Service",
      icon: "fa-hand-holding-heart",
      image: "assets/images/student-speaker.png",
      description: "Community health camps, environmental drives, literacy campaigns in rural Malappuram, and disaster relief volunteer networks."
    },
    {
      id: "sports-club",
      title: "DNAC Sports Club & Athletics Wing",
      arabicTitle: "النادي الرياضي",
      category: "Sports",
      icon: "fa-medal",
      image: "assets/images/sports.jpg",
      description: "Competitive training in football, cricket, volleyball, track & field, and regional inter-collegiate university tournaments."
    }
  ],

  upcomingEvents: [
    {
      id: "ev1",
      title: "International Arabic Language Day Global Symposium 2026",
      date: "December 18, 2026",
      tag: "International Conference",
      venue: "Dr. Kalam Auditorium",
      description: "Renowned linguists from Cairo, Riyadh, and premier Indian universities deliver keynote addresses on 'AI and Natural Language Processing in Classical Arabic'."
    },
    {
      id: "ev2",
      title: "Annual State Inter-Collegiate Arabic Fest: 'Sawt Al-Nahda 2026'",
      date: "November 14-16, 2026",
      tag: "Cultural Fest",
      venue: "DNAC Open Amphitheater",
      description: "Over 35 Arabic and Arts colleges across Kerala compete in 24 literary, artistic, and oratory events."
    },
    {
      id: "ev3",
      title: "Special Workshop on Legal & Medical Arabic Translation",
      date: "October 28, 2026",
      tag: "Career Development",
      venue: "Digital Translation Lab",
      description: "Hands-on certification workshop conducted by senior certified translators from Gulf diplomatic consulates."
    }
  ],

  notices: [
    {
      id: 1,
      title: "Darul Huda Islamic University: Semester Examination Time Table & Hall Tickets Published",
      date: "2026-09-22",
      category: "Semester Examination",
      isNew: true,
      file: "dhiu_semester_exam_timetable_2026.pdf",
      description: "Official Semester Examination timetable for all degree and foundation batches has been published under DHIU Examination Board."
    },
    {
      id: 2,
      title: "DISA Najath Annual Cultural & Oratory Fest 'Sawt Al-Nahda' Announced",
      date: "2026-09-20",
      category: "Events",
      isNew: true,
      file: "disa_fest_schedule_2026.pdf",
      description: "The Students' Association DISA announces the dates and competition guidelines for the annual state-level Arabic literary conclave."
    },
    {
      id: 3,
      title: "National Seminar on 'Classical Arabic Rhetoric in Contemporary Discourse' - Call for Papers",
      date: "2026-09-18",
      category: "Academic",
      isNew: false,
      file: "call_for_papers_rhetoric.pdf",
      description: "Two-day National Seminar organized by the Department of Arabic Literature & Research Cell. Scholars can submit abstracts."
    },
    {
      id: 4,
      title: "Publication of Semester Examination Internal Marks: Semester II & Semester IV",
      date: "2026-09-15",
      category: "Semester Examination",
      isNew: false,
      file: "internal_assessment_s2_s4.pdf",
      description: "Internal assessment marks for the ongoing semester examination have been published on the student portal."
    },
    {
      id: 5,
      title: "Annual Inter-Departmental Sports & Football Championship 2026",
      date: "2026-09-12",
      category: "Events",
      isNew: false,
      file: "sports_schedule_2026.pdf",
      description: "The Annual Sports Championship organized by the Physical Education wing will commence at DNAC sports ground."
    },
    {
      id: 6,
      title: "Special Academic Symposium on Usul al-Fiqh & Legal Hermeneutics",
      date: "2026-09-08",
      category: "Academic",
      isNew: false,
      file: "usul_fiqh_symposium.pdf",
      description: "Intensive academic lecture series conducted by distinguished visiting professors from Darul Huda Islamic University."
    }
  ],

  programs: [
    {
      id: "afzal-prelim",
      code: "AUP-101",
      title: "Afzal-ul-Ulama Preliminary",
      duration: "2 Years",
      level: "Higher Secondary Foundation",
      department: "Arabic Language & Foundations",
      intake: "60 Seats",
      description: "A comprehensive preparatory program equipping students with intensive Arabic grammar, morphology, translation, and Islamic foundation studies.",
      curriculum: ["Classical Arabic Grammar (Nahw & Sarf)", "Quranic Exegesis (Tafsir)", "Hadith Literature", "Islamic History", "English & Modern Languages"],
      eligibility: "SSLC / Matriculation with passing marks.",
      career: "Direct eligibility for B.A. Afzal-ul-Ulama, language teacher roles, and higher secondary equivalency."
    },
    {
      id: "ba-arabic",
      code: "BA-AFZAL",
      title: "B.A. Afzal-ul-Ulama (Arabic)",
      duration: "3 Years (6 Semesters)",
      level: "Undergraduate (UG)",
      department: "Department of Arabic Literature",
      intake: "50 Seats",
      description: "Premier degree program affiliated with Darul Huda Islamic University (DHIU) covering classical and modern Arabic literature, linguistics, commercial translation, and Islamic jurisprudence.",
      curriculum: ["Classical & Modern Prose & Poetry", "Arabic Fiction, Drama & Short Story", "Commercial & Technical Arabic Translation", "Principles of Jurisprudence (Fiqh)", "Modern History of Arab World"],
      eligibility: "Plus Two or Afzal-ul-Ulama Preliminary pass.",
      career: "Civil Services, High School Arabic Teaching (HST), Embassies & Diplomatic Missions, Translation & Localization agencies, Content creation."
    },
    {
      id: "ma-arabic",
      code: "MA-ARAB",
      title: "M.A. Post Graduate in Arabic",
      duration: "2 Years (4 Semesters)",
      level: "Postgraduate (PG)",
      department: "Research & Postgraduate Center",
      intake: "25 Seats",
      description: "Advanced post-graduate research degree focusing on literary criticism, comparative literature, semiotics, research methodology, and contemporary Arab studies.",
      curriculum: ["Advanced Arabic Literary Criticism", "Contemporary Arabic Thought & Ideology", "Comparative Afro-Asian & Middle Eastern Literature", "Research Methodology & Thesis Dissertation", "Simultaneous Interpretation"],
      eligibility: "B.A. Arabic or B.A. Afzal-ul-Ulama with minimum 50% aggregate.",
      career: "College Professorship (NET/JRF), Diplomatic translators, International Journalism (Al Jazeera, BBC Arabic), Cultural diplomacy."
    },
    {
      id: "diploma-trans",
      code: "DIP-TRANS",
      title: "Diploma in Commercial Arabic & Translation",
      duration: "1 Year",
      level: "Professional Diploma",
      department: "Translation Studies Cell",
      intake: "40 Seats",
      description: "Career-oriented technical course focusing on medical, legal, commercial, and technical translation between Arabic, English, and Malayalam.",
      curriculum: ["Legal Document Drafting & Translation", "Medical Terminology & Healthcare Interpreting", "Diplomatic Correspondence", "Computer-Assisted Translation (CAT) Tools", "Business Communication"],
      eligibility: "Graduation in any discipline with basic Arabic knowledge.",
      career: "Certified Legal Translator, Medical Interpreter, MNC Gulf Documentation Specialist."
    }
  ],

  faculty: [
    {
      id: "mujeeb",
      name: "Mujeeb Haithami",
      arabicName: "مجيب الهيثمي",
      subject: "THAFSEER",
      badge: "FACULTY",
      badgeType: "faculty",
      isPrimary: false,
      department: "Islamic Studies",
      role: "Faculty • Thafseer (Quranic Exegesis)",
      qualifications: "Haithami • Scholar in Tafsir & Quranic Sciences",
      experience: "Senior Faculty Member",
      specialization: "Quranic Exegesis, Hermeneutics & Tafsir Literature"
    },
    {
      id: "kasim",
      name: "Kasim Baqawi",
      arabicName: "قاسم البقاوي",
      subject: "TEACHER",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "Islamic Studies",
      role: "Faculty • Islamic Sciences",
      qualifications: "Baqawi • Islamic Jurisprudence & Classical Studies",
      experience: "Senior Faculty",
      specialization: "Classical Islamic Disciplines & Shari'ah"
    },
    {
      id: "ali-hamza",
      name: "Ali Hamza",
      arabicName: "علي حمزة",
      subject: "TEACHER",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "General",
      role: "Faculty • General Sciences",
      qualifications: "Educator & Academic Guide",
      experience: "Faculty Member",
      specialization: "General Curricula & Foundational Studies"
    },
    {
      id: "mansoor",
      name: "Mansoor Hudawi",
      arabicName: "منصور الهداوي",
      subject: "THAMADUN",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "Philosophy",
      role: "Faculty • Thamadun (Islamic Civilization)",
      qualifications: "Hudawi • Islamic History & Cultural Studies",
      experience: "Faculty Member",
      specialization: "Islamic Civilization, History & Historiography"
    },
    {
      id: "muhammad",
      name: "Muhammad Hudawi",
      arabicName: "محمد الهداوي",
      subject: "ADAB",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "Arabic",
      role: "Teacher • Adab (Arabic Literature)",
      qualifications: "Hudawi • Classical & Modern Arabic Belles-Lettres",
      experience: "Faculty Member",
      specialization: "Classical Arabic Poetry, Prose & Rhetoric (Balagha)"
    },
    {
      id: "swabeer",
      name: "Swabeer Gazzali",
      arabicName: "صوابير الغزالي",
      subject: "SOCIAL SCIENCE",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "General",
      role: "Teacher • Social Science",
      qualifications: "Gazzali • Social Sciences & Humanities",
      experience: "Faculty Member",
      specialization: "Social Sciences, Political Geography & Modern Studies"
    },
    {
      id: "samad",
      name: "Samad Hudawi",
      arabicName: "عبد الصمد الهداوي",
      subject: "TEACHER",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "Islamic Studies",
      role: "Teacher • Islamic Studies",
      qualifications: "Hudawi • Classical Islamic Disciplines",
      experience: "Faculty Member",
      specialization: "Moral Education & Islamic Sciences"
    },
    {
      id: "raoof",
      name: "Raoof Hudawi",
      arabicName: "رؤوف الهداوي",
      subject: "PHILOSOPHY",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "Philosophy",
      role: "Teacher • Philosophy (Falsafa)",
      qualifications: "Hudawi • Logic & Islamic Thought",
      experience: "Faculty Member",
      specialization: "Logic (Mantiq), Islamic Philosophy & Kalam"
    },
    {
      id: "swalih",
      name: "Swalih Hudawi",
      arabicName: "صالح الهداوي",
      subject: "TEACHER",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "Islamic Studies",
      role: "Teacher • Islamic Studies",
      qualifications: "Hudawi • Islamic Thought & Pedagogy",
      experience: "Faculty Member",
      specialization: "Islamic Curricula & Language Studies"
    },
    {
      id: "shabeeb",
      name: "Shabeeb Hudawi",
      arabicName: "شبيب الهداوي",
      subject: "ENGLISH",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "General",
      role: "Faculty • English & Modern Languages",
      qualifications: "Hudawi • English Language & Literature",
      experience: "Faculty Member",
      specialization: "English Phonetics, Grammar & Composition"
    },
    {
      id: "shinas",
      name: "Shinas Hudawi",
      arabicName: "شيناس الهداوي",
      subject: "AQEEDA",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "Islamic Studies",
      role: "Faculty • Aqeeda (Islamic Theology)",
      qualifications: "Hudawi • Islamic Theology & Comparative Creed",
      experience: "Faculty Member",
      specialization: "Aqeeda, Theological Discourse & Comparative Religion"
    },
    {
      id: "murshid",
      name: "Murshid Hudawi",
      arabicName: "مرشد الهداوي",
      subject: "TEACHER",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "Islamic Studies",
      role: "Teacher • Islamic Studies",
      qualifications: "Hudawi • Islamic Studies Scholar",
      experience: "Faculty Member",
      specialization: "Islamic Sciences & Academic Guidance"
    },
    {
      id: "shanif",
      name: "Shanif Hudawi",
      arabicName: "شانف الهداوي",
      subject: "TEACHER",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "Islamic Studies",
      role: "Faculty • Teacher",
      qualifications: "Hudawi • Advanced Islamic Sciences",
      experience: "Faculty Member",
      specialization: "Islamic Jurisprudence & Pedagogy"
    },
    {
      id: "rasheed",
      name: "Rasheed Anwari",
      arabicName: "رشيد الأنواري",
      subject: "TEACHER",
      badge: "TEACHER",
      badgeType: "teacher",
      department: "Islamic Studies",
      role: "Teacher • Islamic Studies",
      qualifications: "Anwari • Islamic Pedagogy",
      experience: "Faculty Member",
      specialization: "Islamic Principles & Student Mentorship"
    },
    {
      id: "shafi",
      name: "Shafi Hudawi",
      arabicName: "شافي الهداوي",
      subject: "USUL FIQH",
      badge: "FACULTY",
      badgeType: "faculty",
      department: "Islamic Studies",
      role: "Faculty • Usul Fiqh (Principles of Jurisprudence)",
      qualifications: "Hudawi • Specialist in Legal Hermeneutics",
      experience: "Faculty Member",
      specialization: "Usul al-Fiqh, Islamic Legal Theory & Qawaid Fiqhiyya"
    }
  ],

  demoStudent: {
    id: "DNAC-2024-042",
    name: "Muhammad Farhan K.",
    arabicName: "محمد فرحان ك",
    email: "farhan.k@student.dnaclive.in",
    program: "Degree in Islamic & Arabic Studies (DHIU)",
    semester: "Semester IV (2024-2027 Batch)",
    rollNo: "AFZ-24-042",
    regNo: "DHIU-DNAC-042",
    advisor: "Usthad Shafi Hudawi (Department Head)",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    attendancePercentage: 91.5,
    cgpa: "3.84 / 4.00",
    rank: "2nd in Class",
    attendanceDetails: [
      { subject: "Modern Arabic Poetry & Poetics", code: "ARB4B01", total: 42, attended: 40, percentage: 95.2 },
      { subject: "Classical Arabic Grammar & Rhetoric", code: "ARB4B02", total: 38, attended: 35, percentage: 92.1 },
      { subject: "Commercial Translation & Tech Writing", code: "ARB4B03", total: 34, attended: 30, percentage: 88.2 },
      { subject: "Principles of Islamic Jurisprudence", code: "ARB4B04", total: 30, attended: 28, percentage: 93.3 },
      { subject: "General English & Communications", code: "ENG4A06", total: 28, attended: 25, percentage: 89.3 }
    ],
    recentGrades: [
      { semester: "Semester III", code: "ARB3B01", course: "Classical Arabic Prose", internal: 19, external: 72, total: 91, grade: "A+", points: 4.0 },
      { semester: "Semester III", code: "ARB3B02", course: "Hadith Literature Studies", internal: 18, external: 68, total: 86, grade: "A", points: 3.8 },
      { semester: "Semester III", code: "ARB3B03", course: "History of Arabic Literature", internal: 20, external: 74, total: 94, grade: "A+", points: 4.0 },
      { semester: "Semester III", code: "ENG3A05", course: "Native Voices & Literature", internal: 18, external: 65, total: 83, grade: "A", points: 3.7 }
    ],
    timetable: [
      { day: "Monday", periods: ["Classical Grammar (Hall 4)", "Modern Poetry (Hall 4)", "Translation Lab", "Islamic Jurisprudence", "Library Reference", "Spoken Arabic Club"] },
      { day: "Tuesday", periods: ["Islamic Jurisprudence", "General English", "Modern Poetry", "Classical Grammar", "Seminar Session", "Sports / Physical Ed."] },
      { day: "Wednesday", periods: ["Translation Lab", "Classical Grammar", "General English", "Modern Poetry", "Hadith Studies", "Mentorship Hour"] },
      { day: "Thursday", periods: ["Modern Poetry", "Islamic Jurisprudence", "Translation Lab", "General English", "Group Discussion", "Digital Library"] },
      { day: "Friday", periods: ["Classical Grammar", "Hadith Studies", "Friday Prayers & Assembly", "Library / Research", "Cultural Forum", "-"] }
    ],
    hallTicket: {
      examTitle: "Fourth Semester DHIU Degree Regular Semester Examination - April/May 2026",
      center: "DNAC Central Examination Hall (Block B, Room 204)",
      candidateName: "MUHAMMAD FARHAN K",
      candidateRegNo: "DHIU-DNAC-042",
      dob: "14/08/2005",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      papers: [
        { code: "ARB4B05", subject: "Modern Arabic Poetry & Poetics", date: "12-10-2026", time: "09:30 AM - 12:00 PM" },
        { code: "ARB4B06", subject: "Classical Arabic Grammar & Rhetoric", date: "15-10-2026", time: "09:30 AM - 12:00 PM" },
        { code: "ARB4B07", subject: "Commercial Translation & Tech Writing", date: "19-10-2026", time: "09:30 AM - 12:00 PM" },
        { code: "ARB4B08", subject: "Principles of Islamic Jurisprudence", date: "22-10-2026", time: "09:30 AM - 12:00 PM" },
        { code: "ENG4A06", subject: "English in the Workplace", date: "26-10-2026", time: "09:30 AM - 12:00 PM" }
      ]
    },
    fees: {
      semesterFee: "₹ 4,850",
      examFee: "₹ 1,220",
      labFee: "₹ 600",
      status: "PAID",
      receiptNo: "DNAC-REC-2026-8819",
      paidOn: "12-08-2026"
    }
  },

  gallery: [
    {
      id: 1,
      title: "DNAC Main Academic Quadrangle & Campus Courtyard",
      category: "campus",
      thumbnail: "assets/images/dnac-campus-main.jpg",
      full: "assets/images/dnac-campus-main.jpg",
      caption: "A courtyard view of the DNAC Koonanchery campus."
    },
    {
      id: 2,
      title: "Library & Reading Space",
      category: "library",
      thumbnail: "assets/images/library.jpg",
      full: "assets/images/library.jpg",
      caption: "The college library supports study, reading and research."
    },
    {
      id: 3,
      title: "Computer & Digital Learning Lab",
      category: "academic",
      thumbnail: "assets/images/computer-lab.jpg",
      full: "assets/images/computer-lab.jpg",
      caption: "Computer facilities for digital learning and academic work."
    },
    {
      id: 4,
      title: "Student Learning Session",
      category: "events",
      thumbnail: "assets/images/student-session.webp",
      full: "assets/images/student-session.webp",
      caption: "An active student session at the campus."
    },
    {
      id: 5,
      title: "Student Presentation",
      category: "events",
      thumbnail: "assets/images/student-presentation.webp",
      full: "assets/images/student-presentation.webp",
      caption: "A student shares a presentation during a campus programme."
    },
    {
      id: 6,
      title: "Campus Auditorium",
      category: "campus",
      thumbnail: "assets/images/auditorium.jpg",
      full: "assets/images/auditorium.jpg",
      caption: "A venue for lectures, events and campus gatherings."
    },
    {
      id: 7,
      title: "Student Residence",
      category: "campus",
      thumbnail: "assets/images/residential.webp",
      full: "assets/images/residential.webp",
      caption: "Residential life is part of the college community experience."
    },
    {
      id: 8,
      title: "Students at a Campus Programme",
      category: "events",
      thumbnail: "assets/images/student-audience.png",
      full: "assets/images/student-audience.png",
      caption: "Students taking part in a campus programme."
    }
  ]
};
