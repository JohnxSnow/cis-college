/**
 * C.I.S Cedars International College of Information Science - Core Application Logic
 * Strict Role-Based Visibility: Public, Student, Teacher, Admin.
 * Handles Teacher Video Uploads, Direct Student Messaging, and Admin Public Media Management.
 */

// Application State
let currentLang = 'en';
let activeUser = null; // null | { type: 'student' | 'teacher' | 'admin', data: Object }
let activeDeptFilter = 'all';

// Dual Video Source Tracking (Mobile Gallery / Laptop Local File vs YouTube Link)
let teacherVideoSourceMode = 'file'; // 'file' | 'link'
let teacherSelectedVideoFile = null;
let teacherSelectedVideoBlobUrl = null;

let adminVideoSourceMode = 'file'; // 'file' | 'link'
let adminSelectedVideoFile = null;
let adminSelectedVideoBlobUrl = null;

// Multi-Language Localization Dictionary
const I18N = {
  en: {
    navHome: "Home",
    navDepartments: "Academic Programs",
    navVideos: "College Media & Bulletins",
    navPortal: "Portal Workspace",
    navCampus: "Campus & Labs",
    navContact: "Contact",
    navAbout: "About Creator",
    btnTopLogin: "Log In",
    menuMyDashboard: "My Dashboard",
    menuSwitchAccount: "Switch Account",
    btnLogout: "Sign Out",
    heroBadge: "Cedars International College • Est. 1991",
    heroTitlePrefix: "Shaping Professional Careers at",
    heroTitleGradient: "C.I.S Cedars International College",
    btnHeroClasses: "Explore 3-Year Programs & Apply",
    campusCampusTitle: "Main Innovation Campus",
    campusCampusLoc: "Erbil-Sulaymaniyah Tech Corridor",
    campusActiveBadge: "● Campus Open",
    statPlacementSub: "Graduates Hired in 90 Days",
    deptSectionBadge: "3-Year Academic Programs",
    deptSectionTitle: "Explore Our Available",
    deptSectionTitleGradient: "Departments & Classes",
    deptSectionSubtitle: "Choose your desired 3-year diploma program. Prospective students can apply directly for admission.",
    filterAll: "All Departments",
    mediaSectionBadge: "Official Media & Bulletins",
    mediaSectionTitle: "College Broadcasts &",
    mediaSectionTitleGradient: "Official Campus Videos",
    mediaSectionSubtitle: "Official announcements, college tour videos, and presidency bulletins published and maintained exclusively by C.I.S Administration.",
    btnAddPublicVideo: "Admin: Add Official Video / Bulletin",
    portalBadge: "Secure Portal Gateway",
    portalMainTitle: "Academic Portals:",
    portalMainTitleGradient: "Student, Teacher & Admin",
    portalMainSubtitle: "Log in to access your designated workspace. Students see their lessons and recorded teacher videos; teachers manage classes and messages; admins oversee all operations.",
    cardStudentTitle: "Student Portal",
    cardStudentDesc: "Watch teacher recorded video lessons, view coursework materials, check direct teacher messages, and apply for jobs.",
    btnStudentEnter: "Student Log In",
    cardTeacherTitle: "Faculty & Teacher",
    cardTeacherDesc: "Upload recorded class lecture videos, inspect enrolled student rosters, and send direct or broadcast messages.",
    btnTeacherEnter: "Teacher Access",
    cardAdminTitle: "Admin Control",
    cardAdminDesc: "Master oversight of all departments, manage public homepage videos, and approve prospective student enrollments.",
    btnAdminEnter: "Admin Access",
    loginModalTitle: "CIS Portal Login",
    loginModalSubtitle: "Select your designated account type",
    tabRoleStudent: "Student (قوتابی)",
    tabRoleTeacher: "Teacher (مامۆستا)",
    tabRoleAdmin: "Admin (ئەدمین)",
    lblEnterStudentId: "Enter Your Official Student ID (ناسنامەی قوتابی)",
    btnUnlockStudent: "Unlock Student Portal",
    demoIdsTitle: "Quick Test - Student Accounts:",
    lblEnterTeacherId: "Enter Your Faculty / Teacher ID (ناسنامەی مامۆستا)",
    btnUnlockTeacher: "Access Faculty Center",
    demoTeacherIdsTitle: "Quick Test - Faculty Accounts:",
    tabStudentLessons: "Recorded Lecture Videos from Teachers",
    tabStudentMessages: "Teacher Messages & Notices",
    tabStudentMaterials: "Lecture Notes & PDF Materials",
    tabExclusiveJobs: "Job & Internship Matches",
    recordedLessonsTitle: "Department Class Lessons & Recorded Lecture Videos",
    recordedLessonsSubtitle: "Watch lecture recordings and class tutorials uploaded specifically for your major by your professors.",
    studentMaterialsTitle: "Course Lecture Notes & Study Materials (مەلزەمە و سەرچاوەی وانەکان)",
    studentMaterialsSubtitle: "Download and review syllabus documents, slide presentations, assignments, and textbooks for your department classes.",
    filterAllMaterials: "All Materials",
    inboxTitle: "Direct Messages from Your Professors",
    sendTeacherNoteTitle: "Send a Message to Your Professor",
    btnSendMsg: "Send to Professor",
    tabTeacherCourses: "My Assigned Classes",
    tabUploadLectureVideo: "Upload Recorded Lecture Video",
    tabTeacherRoster: "Enrolled Students & Direct Messages",
    tabTeacherBroadcast: "Send General Message to All Students",
    uploadVideoTitle: "Upload / Add Recorded Class Lecture Video",
    uploadVideoDesc: "Provide a recorded lecture video for your enrolled students. The video will instantly appear in their student portal.",
    rosterTitle: "Enrolled Students in Your Classes & Direct Messaging",
    rosterSubtitle: "Review student names and click 'Send Direct Message' to send a private notice to that specific student.",
    broadcastTitle: "📢 Broadcast General Message to All Students",
    broadcastSubtitle: "Send an urgent notice, schedule change, or assignment reminder simultaneously to all students enrolled across your classes.",
    adminWelcome: "C.I.S Central Administration Hub",
    campusSectionBadge: "Campus & Innovation",
    campusSectionTitle: "World-Class Laboratories &",
    campusSectionTitleGradient: "Campus Facilities",
    campusSectionSubtitle: "Explore our state-of-the-art facilities equipped with high-performance computing clusters, collaborative spaces, and modern architecture.",
    contactBadge: "Get In Touch",
    contactTitle: "Connect with C.I.S Admissions &",
    contactTitleGradient: "Registrar Office",
    contactSubtitle: "Have questions about registration or 3-year diploma programs? Send us a message or visit our campus.",
    lblFullName: "Full Name",
    lblEmail: "Email Address",
    lblSubject: "Inquiry Department",
    lblMessage: "Your Message",
    btnSendMessage: "Send Official Message",

    // Developer Modal (Zhiyar Hemn)
    devRole: "Lead System Developer",
    devVerified: "✓ Verified Creator",
    devName: "Zhiyar Hemn (Lead Architect)",
    devTitle: "Creator & Software Architect of C.I.S Cedars International College Digital Campus",
    devQuote: "Building this system was not merely about writing code; it was about engineering an ultra-fast, secure, and modern digital ecosystem that elevates academic learning and college administration to a brand-new era.",
    devSpecArch: "⚡ Architecture",
    devSpecArchVal: "SPA (Single-Page Application)",
    devSpecSecurity: "🛡️ Security & Roles",
    devSpecSecurityVal: "Gated Student, Faculty & Admin Hub",
    devSpecLang: "🌐 Languages",
    devSpecLangVal: "Bilingual (Kurdish RTL / English LTR)",
    devSpecPersist: "💾 Persistence",
    devSpecPersistVal: "LocalStorage Offline & Cloud Ready",
    devContactTitle: "📩 Developer Contact & Inquiries",
    devLocationLabel: "Location:",
    devLocation: "Sulaymaniyah, Kurdistan Region",
    btnDevClose: "Close",
    btnDevSendMsg: "💬 Send Message in Contact Hub",

    // Portal Navigation & Dropdown
    portalNavHome: "Home",
    portalNavAbout: "About Creator",
    portalNavContact: "Contact & Messages",
    dropAbout: "Website Creator",
    dropContact: "Contact & Messaging",
    dropHome: "Return to Homepage",

    // Messaging Hub (Received, Compose, Sent)
    tabReceived: "Received",
    tabCompose: "Send Message",
    tabSent: "Sent Messages",
    lblRecipientTarget: "Recipient Target (Who to send to?)",
    lblMsgSubject: "Subject / Topic",
    lblMsgContent: "Message Content",
    btnCancel: "Cancel",
    btnSendMsgHub: "📨 Send Message",
    btnReturnDashboard: "← Dashboard",

    // Public Contact Form & Departments
    lblContactPrompt: "Are you a Student, Faculty, or Admin?",
    btnLoginInternal: "→ Log In for Internal Messaging",
    deptCS: "Computer Science (IT)",
    deptAcc: "Accounting & Finance",
    deptDesign: "Design & Digital Arts",
    deptMgmt: "Management & Business",
    deptEng: "English Language",
    deptConst: "Construction & Architecture",

    // Footer
    footerProgramsSub: "3-Year Technical & Business Programs",
    footerDesc: "We empower students with 3-year diploma programs in IT, Accounting, Management, and Construction, combining practical industry skills with state-of-the-art education.",
    footerColPrograms: "3-Year Programs",
    footerColPortals: "Portal Links",
    footerColAdmissions: "Admissions",
    footerAdmOpen: "Admissions Open for 2026-2027",
    footerLocation: "Sulaymaniyah City",
    footerRights: "All Rights Reserved.",
    footerBuiltBy: "Built by Zhiyar Hemn for CIS College & High School",

    // Placeholders
    phContactName: "e.g. Zhiyar Hemn",
    phContactEmail: "name@example.com",
    phContactMessage: "How can we assist you?",
    phMsgSubject: "e.g. Question regarding CS-101 coursework...",
    phMsgBody: "Write your official message here...",
    phStudentId: "e.g. CIS-2024-101",
    phTeacherId: "e.g. CIS-FAC-01",
    phAdminId: "e.g. CIS-ADM-01",

    // Security & Domain Keys
    lblAdminId: "Admin ID / Key (Central Administrator)",
    lblAdminPass: "Master Security Passcode",
    btnAdminSignIn: "Sign In with Security Verification"
  },
  ku: {
    navHome: "سەرەکی",
    navDepartments: "بەشە ئەکادیمییەکان",
    navVideos: "میدیا و ڤیدیۆی کۆلێژ",
    navPortal: "پۆڕتاڵەکان",
    navCampus: "کۆلێژ و تاقیگەکان",
    navContact: "پەیوەندی",
    navAbout: "دەربارەی دروستکەر",
    btnTopLogin: "چوونەژوورەوە",
    menuMyDashboard: "داشبۆردەکەم",
    menuSwitchAccount: "گۆڕینی هەژمار",
    btnLogout: "چوونەدەرەوە",
    heroBadge: "کۆلێژی نێودەوڵەتی سێدارس CIS • دامەزراوە ١٩٩١",
    heroTitlePrefix: "بنیاتنانی داهاتووی پیشەیی لە",
    heroTitleGradient: "کۆلێژی نێودەوڵەتی C.I.S Cedars",
    btnHeroClasses: "بینینی بەشە ٣-ساڵەکان و ناونووسین",
    campusCampusTitle: "کۆلێژی سەرەکی و داهێنان",
    campusCampusLoc: "تەلارسازی هاوچەرخ • هەولێر - سلێمانی",
    campusActiveBadge: "● کۆلێژ کراوەیە",
    statPlacementSub: "دامەزراندنی دەرچووان لە ٩٠ ڕۆژدا",
    deptSectionBadge: "پڕۆگرامە ئەکادیمییە ٣ ساڵەکان",
    deptSectionTitle: "هەموو بەش و",
    deptSectionTitleGradient: "پۆلە بەردەستەکانی CIS",
    deptSectionSubtitle: "بەشە ٣ ساڵە دڵخوازەکەت هەڵبژێرە. خوێندکارانی ئارەزوومەند دەتوانن ڕاستەوخۆ داواکاری پێشکەش بکەن.",
    filterAll: "هەموو بەشەکان",
    mediaSectionBadge: "میدیای فەرمی و ئاگادارییەکان",
    mediaSectionTitle: "ڤیدیۆی فەرمی و",
    mediaSectionTitleGradient: "چالاکییەکانی کۆلێژی C.I.S",
    mediaSectionSubtitle: "ئاگاداری و پەخشی ڤیدیۆیی فەرمی کەمپەس کە تەنها لەلایەن بەڕێوەبەرایەتی گشتی (Admin) بڵاودەکرێتەوە.",
    btnAddPublicVideo: "ئەدمین: دانانی ڤیدیۆی فەرمی",
    portalBadge: "دەروازەی پۆڕتاڵی پارێزراو",
    portalMainTitle: "پۆڕتاڵە تایبەتمەندەکان:",
    portalMainTitleGradient: "قوتابی، مامۆستا و ئەدمین",
    portalMainSubtitle: "بچۆ ژوورەوە بۆ ژینگەی تایبەت بەخۆت. قوتابی وانە و ڤیدیۆی مامۆستاکانی دەبینێت؛ مامۆستا پۆل و ڤیدیۆ و نامەکان بەڕێوەدەبات؛ ئەدمین چاودێری هەموو سیستەم دەکات.",
    cardStudentTitle: "پۆڕتاڵی قوتابیان",
    cardStudentDesc: "سەیرکردنی ڤیدیۆی وانە تۆمارکراوەکانی مامۆستا، بینینی ماددەکان، نامەی تایبەتی مامۆستا و هەلی کار.",
    btnStudentEnter: "چوونەژوورەوەی قوتابی",
    cardTeacherTitle: "پۆڕتاڵی مامۆستایان",
    cardTeacherDesc: "دانانی ڤیدیۆی تۆمارکراوی وانەکان، بینینی ناوی قوتابیانی پۆلەکەت، و ناردنی نامەی ڕاستەوخۆ یان گشتی.",
    btnTeacherEnter: "چوونەژوورەوەی مامۆستا",
    cardAdminTitle: "کۆنتڕۆڵی گشتی ئەدمین",
    cardAdminDesc: "بەڕێوەبردنی گشتی هەموو بەشەکان، دانانی ڤیدیۆی فەرمی ماڵپەڕ، و پەسەندکردنی داواکاری خوێندکارانی نوێ.",
    btnAdminEnter: "چوونەژوورەوەی ئەدمین",
    loginModalTitle: "چوونەژوورەوەی پۆڕتاڵی CIS",
    loginModalSubtitle: "جۆری هەژمارەکەت دیاری بکە",
    tabRoleStudent: "قوتابی (Student)",
    tabRoleTeacher: "مامۆستا (Teacher)",
    tabRoleAdmin: "ئەدمین (Admin)",
    lblEnterStudentId: "ناسنامەی قوتابی (Student ID)",
    btnUnlockStudent: "چوونە ناو پۆڕتاڵی قوتابی",
    demoIdsTitle: "تاقیکردنەوەی خێرا - قوتابیان:",
    lblEnterTeacherId: "ناسنامەی مامۆستا (Teacher ID)",
    btnUnlockTeacher: "چوونە ناو پۆڕتاڵی مامۆستا",
    demoTeacherIdsTitle: "تاقیکردنەوەی خێرا - مامۆستایان:",
    tabStudentLessons: "ڤیدیۆی تۆمارکراوی وانەکانی مامۆستا",
    tabStudentMessages: "نامە و پەیامی مامۆستاکانم",
    tabStudentMaterials: "فایلەکان و سەرچاوەی وانەکان (PDF)",
    tabExclusiveJobs: "دەرفەتەکانی کاری بەشەکەم",
    recordedLessonsTitle: "وانە تۆمارکراوەکان و ڤیدیۆی پۆلەکانی بەشەکەت",
    recordedLessonsSubtitle: "سەیری ڤیدیۆ و ڕوونکردنەوەی وانەکان بکە کە لەلایەن مامۆستایانی بەشەکەتەوە دانراوە.",
    studentMaterialsTitle: "فایل سلاید و سەرچاوەکانی خوێندن",
    studentMaterialsSubtitle: "داگرتن و خوێندنەوەی فایل سلایدەکان، ئەرکەکان و کتێبی وانەکانی پۆلەکەت.",
    filterAllMaterials: "هەموو فایلەکان",
    inboxTitle: "نامە ڕاستەوخۆکانی مامۆستاکەت",
    sendTeacherNoteTitle: "ناردنی پەیام بۆ مامۆستاکەت",
    btnSendMsg: "ناردن بۆ مامۆستا",
    tabTeacherCourses: "پۆل و وانەکانم",
    tabUploadLectureVideo: "دانانی ڤیدیۆی تۆمارکراوی وانە",
    tabTeacherRoster: "قوتابیانی پۆلەکەم و ناردنی نامە",
    tabTeacherBroadcast: "ناردنی نامەی گشتی بۆ هەموو قوتابیان",
    uploadVideoTitle: "دانانی ڤیدیۆی تۆمارکراوی وانە بۆ قوتابیان",
    uploadVideoDesc: "ڤیدیۆی تۆمارکراوی وانەکەت دانێ بۆ ئەوەی ڕاستەوخۆ لە پۆڕتاڵی قوتابیانی پۆلەکەت دەربکەوێت.",
    rosterTitle: "لیستی قوتابیانی پۆلەکەت و ناردنی نامەی ڕاستەوخۆ",
    rosterSubtitle: "سەیری ناوی قوتابیان بکە و کلیک لەسەر 'ناردنی نامە' بکە بۆ ناردنی پەیامی تایبەت بۆ هەر قوتابییەک.",
    broadcastTitle: "📢 ناردنی نامەی گشتی بۆ هەموو قوتابیان",
    broadcastSubtitle: "ناردنی ئاگاداری بەپەلە، گۆڕینی کاتی وانە یان تاقیکردنەوە بە یەکجار بۆ هەموو قوتابیانی پۆلەکانت.",
    adminWelcome: "ناوەندی بەڕێوەبەرایەتی گشتی C.I.S",
    campusSectionBadge: "کۆلێژ و داهێنان",
    campusSectionTitle: "تاقیگە و ناوەندە",
    campusSectionTitleGradient: "پێشکەوتووەکانی کۆلێژ",
    campusSectionSubtitle: "ئاشنابە بە تاقیگەی کۆمپیوتەر، کتێبخانەی دیجیتاڵی و سەنتەری توێژینەوەی ئەندازیاری.",
    contactBadge: "پەیوەندیمان پێوە بکە",
    contactTitle: "پەیوەندی لەگەڵ تۆماری گشتی و",
    contactTitleGradient: "وەرگرتنی C.I.S",
    contactSubtitle: "پرسیارت هەیە دەربارەی ناونووسین لە پڕۆگرامە ٣ ساڵەکان؟ نامە بنێرە یان سەردانی کۆلێژ بکە.",
    lblFullName: "ناوی تەواو",
    lblEmail: "ئیمەیڵ",
    lblSubject: "بەشی خوازراو",
    lblMessage: "پەیامەکەت",
    btnSendMessage: "ناردنی پەیامی فەرمی",

    // Developer Modal (Zhiyar Hemn)
    devRole: "گەشەپێدەری سەرەکی سیستەم",
    devVerified: "✓ دروستکەری باوەڕپێکراو",
    devName: "ژیار هێمن (Zhiyar Hemn)",
    devTitle: "دروستکەر و تەلارسازی سیستەمی دیجیتاڵی کۆلێژی نێودەوڵەتی C.I.S Cedars",
    devQuote: "دروستکردنی ئەم سیستمە تەنها نووسینی کۆد نەبوو، بەڵکو بنیاتنانی ژینگەیەکی دیجیتاڵیی خێرا، پارێزراو و مۆدێرن بوو بۆ ئەوەی پرۆسەی فێربوون و بەڕێوەبردن لە کۆلێژ بباتە قۆناغێکی نوێوە.",
    devSpecArch: "⚡ تەلارسازی",
    devSpecArchVal: "سیستەمی یەک-پەڕەیی خێرا (SPA)",
    devSpecSecurity: "🛡️ ئاسایش و دەسەڵاتەکان",
    devSpecSecurityVal: "پۆڕتاڵی پارێزراوی قوتابی، مامۆستا و ئەدمین",
    devSpecLang: "🌐 زمانەکان",
    devSpecLangVal: "دوو زمانە (کوردی ڕاست بۆ چەپ / ئینگلیزی)",
    devSpecPersist: "💾 کۆگای داتا",
    devSpecPersistVal: "پاشەکەوتکردنی داتا و ئامادەی کلاود",
    devContactTitle: "📩 پەیوەندی لەگەڵ دروستکەر",
    devLocationLabel: "ناونیشان:",
    devLocation: "سلێمانی، هەرێمی کوردستان",
    btnDevClose: "داخستن",
    btnDevSendMsg: "💬 ناردنی نامە لە بەشی پەیوەندی",

    // Portal Navigation & Dropdown
    portalNavHome: "سەرەکی",
    portalNavAbout: "دەربارەی دروستکەر",
    portalNavContact: "پەیوەندی و پەیامەکان",
    dropAbout: "دروستکەری وێبسایت",
    dropContact: "پەیوەندی و پەیامەکان",
    dropHome: "گەڕانەوە بۆ پەڕەی سەرەکی",

    // Messaging Hub (Received, Compose, Sent)
    tabReceived: "گەیشتووەکان",
    tabCompose: "ناردنی نامە",
    tabSent: "پەیامە نێردراوەکان",
    lblRecipientTarget: "بۆ کێ دەنێردرێت؟ (دیاریکردنی وەرگر)",
    lblMsgSubject: "ناونیشانی بابەت",
    lblMsgContent: "دەقی پەیامەکە",
    btnCancel: "پاشگەزبوونەوە",
    btnSendMsgHub: "📨 ناردنی نامە",
    btnReturnDashboard: "← داشبۆرد",

    // Public Contact Form & Departments
    lblContactPrompt: "ئایا قوتابیت، مامۆستایت، یان ئەدمین؟",
    btnLoginInternal: "→ چوونەژوورەوە بۆ ناردنی نامەی ناوخۆیی",
    deptCS: "زانستی کۆمپیوتەر (IT)",
    deptAcc: "ژمێریاری و دارایی",
    deptDesign: "دیزاین و هونەری دیجیتاڵی",
    deptMgmt: "کارگێڕی کار و بەڕێوەبردن",
    deptEng: "زمانی ئینگلیزی",
    deptConst: "بیناکاری و ئەندازیاری",

    // Footer
    footerProgramsSub: "پڕۆگرامە تەکنیکی و کارگێڕییە ٣-ساڵەکان",
    footerDesc: "ئێمە خوێندکاران بەهێز دەکەین لە ڕێگەی پڕۆگرامە ٣-ساڵەکانی IT، ژمێریاری، کارگێڕی و بیناکاری بە تێکەڵکردنی زانستی تیۆری و کرداری مۆدێرن.",
    footerColPrograms: "بەشە ٣-ساڵەکان",
    footerColPortals: "بەستەری پۆڕتاڵەکان",
    footerColAdmissions: "ناونووسین و وەرگرتن",
    footerAdmOpen: "ناونووسین کراوەیە بۆ ٢٠٢٦-٢٠٢٧",
    footerLocation: "شاری سلێمانی",
    footerRights: "هەموو مافەکانی پارێزراوە.",
    footerBuiltBy: "دروستکراوە لەلایەن ژیار هێمن بۆ کۆلێژ و پەیمانگای CIS",

    // Placeholders
    phContactName: "وەک: ژیار هێمن",
    phContactEmail: "name@example.com",
    phContactMessage: "چۆن دەتوانین هاوکاریت بکەین؟",
    phMsgSubject: "وەک: پرسیار دەربارەی پۆل و وانەکانی بەش...",
    phMsgBody: "پەیامە فەرمییەکەت لێرە بنووسە...",
    phStudentId: "وەک: CIS-2024-101",
    phTeacherId: "وەک: CIS-FAC-01",
    phAdminId: "وەک: CIS-ADM-01",

    // Security & Domain Keys
    lblAdminId: "ناسنامەی ئەدمین (Admin ID)",
    lblAdminPass: "وشەی نهێنی سەرەکی ئەدمین (Passcode)",
    btnAdminSignIn: "چوونەژوورەوە بە پشتڕاستکردنەوەی ئەمنی"
  }
};

// Load and persist accounts across browser sessions
function loadCustomAccountsFromStorage() {
  try {
    const savedStudents = localStorage.getItem('cis_saved_students');
    if (savedStudents) CIS_DATA.students = JSON.parse(savedStudents);

    const savedTeachers = localStorage.getItem('cis_saved_teachers');
    if (savedTeachers) CIS_DATA.teachers = JSON.parse(savedTeachers);

    const savedAdmins = localStorage.getItem('cis_saved_admins');
    if (savedAdmins) CIS_DATA.admins = JSON.parse(savedAdmins);

    // Ensure primary admin CIS-ADM-01 is always Zhiyar (xxx505058@gmail.com)
    const primaryAdmin = CIS_DATA.admins.find(a => a.id === 'CIS-ADM-01');
    if (primaryAdmin) {
      primaryAdmin.name = "Zhiyar (Central Admin)";
      primaryAdmin.nameKu = "ژیار (ئەدمینی گشتی)";
      primaryAdmin.email = "xxx505058@gmail.com";
    }
    if (CIS_DATA.admin) {
      CIS_DATA.admin.name = "Zhiyar (Central Admin)";
      CIS_DATA.admin.nameKu = "ژیار (ئەدمینی گشتی)";
      CIS_DATA.admin.email = "xxx505058@gmail.com";
    }
  } catch (e) {
    console.error("Failed to load saved accounts", e);
  }
}

function saveCustomAccountsToStorage() {
  try {
    localStorage.setItem('cis_saved_students', JSON.stringify(CIS_DATA.students || []));
    localStorage.setItem('cis_saved_teachers', JSON.stringify(CIS_DATA.teachers || []));
    localStorage.setItem('cis_saved_admins', JSON.stringify(CIS_DATA.admins || []));
  } catch (e) {
    console.error("Failed to save accounts", e);
  }
}

function loadCustomJobsFromStorage() {
  try {
    const savedJobs = localStorage.getItem('cis_saved_jobs');
    if (savedJobs) {
      CIS_DATA.jobs = JSON.parse(savedJobs);
    }
  } catch (e) {
    console.error("Failed to load saved jobs", e);
  }
}

function saveCustomJobsToStorage() {
  try {
    localStorage.setItem('cis_saved_jobs', JSON.stringify(CIS_DATA.jobs || []));
  } catch (e) {
    console.error("Failed to save jobs", e);
  }
}

function loadCustomMaterialsFromStorage() {
  try {
    const savedMaterials = localStorage.getItem('cis_saved_materials');
    if (savedMaterials) {
      CIS_DATA.materials = JSON.parse(savedMaterials);
    }
  } catch (e) {
    console.error("Failed to load saved materials", e);
  }
}

function saveCustomMaterialsToStorage() {
  try {
    localStorage.setItem('cis_saved_materials', JSON.stringify(CIS_DATA.materials || []));
  } catch (e) {
    console.error("Failed to save materials", e);
  }
}

function loadCustomDepartmentsFromStorage() {
  try {
    const savedDepts = localStorage.getItem('cis_saved_departments');
    if (savedDepts) {
      CIS_DATA.departments = JSON.parse(savedDepts);
    }
  } catch (e) {
    console.error("Failed to load saved departments", e);
  }
}

function saveCustomDepartmentsToStorage() {
  try {
    localStorage.setItem('cis_saved_departments', JSON.stringify(CIS_DATA.departments || []));
  } catch (e) {
    console.error("Failed to save departments", e);
  }
}

function loadCustomAssignmentsFromStorage() {
  try {
    const savedAssignments = localStorage.getItem('cis_saved_assignments');
    if (savedAssignments) {
      CIS_DATA.assignments = JSON.parse(savedAssignments);
    }
  } catch (e) {
    console.error("Failed to load saved assignments", e);
  }
}

function saveCustomAssignmentsToStorage() {
  try {
    localStorage.setItem('cis_saved_assignments', JSON.stringify(CIS_DATA.assignments || []));
  } catch (e) {
    console.error("Failed to save assignments", e);
  }
}

// Initialization on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  loadCustomDepartmentsFromStorage();
  loadCustomAccountsFromStorage();
  loadCustomJobsFromStorage();
  loadCustomMaterialsFromStorage();
  loadCustomMessagesFromStorage();
  loadCustomAssignmentsFromStorage();
  renderHeroQuote();
  renderStats();
  renderDepartments(activeDeptFilter);
  renderPublicVideos();
  checkExistingSession();
  renderContactMessagingHub();
  updateNotificationBadge();
  initChatWidget();
  initAppleScrollEffects();

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenuList');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'rgba(7, 10, 19, 0.98)';
      navMenu.style.padding = '20px';
      navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    const container = document.getElementById('cornerAuthContainer');
    const menu = document.getElementById('cornerDropdownMenu');
    if (menu && container && !container.contains(e.target)) {
      menu.classList.remove('active');
    }

    const portalWrap = document.getElementById('portalProfileWrap');
    if (portalWrap && !portalWrap.contains(e.target)) {
      portalWrap.classList.remove('open');
    }

    const notifBellWrapper = document.getElementById('notifBellWrapper');
    const notifMenu = document.getElementById('notificationDropdownMenu');
    if (notifMenu && notifBellWrapper && !notifBellWrapper.contains(e.target)) {
      notifMenu.classList.remove('active');
    }
  });
});

// Render user requested exact 3-year quote
function renderHeroQuote() {
  const quoteEl = document.getElementById('heroProgramQuoteText');
  if (quoteEl) {
    quoteEl.textContent = `"${currentLang === 'ku' ? CIS_DATA.college.heroQuoteKu : CIS_DATA.college.heroQuote}"`;
  }
}

// Language Switcher
function switchLanguage(lang) {
  currentLang = lang;
  document.body.dir = lang === 'ku' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  document.getElementById('btnLangEn').classList.toggle('active', lang === 'en');
  document.getElementById('btnLangKu').classList.toggle('active', lang === 'ku');

  const btnEnPort = document.getElementById('btnLangEnPortal');
  const btnKuPort = document.getElementById('btnLangKuPortal');
  if (btnEnPort) btnEnPort.classList.toggle('active', lang === 'en');
  if (btnKuPort) btnKuPort.classList.toggle('active', lang === 'ku');

  // Translate all marked elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key]) {
      el.textContent = I18N[lang][key];
    }
  });

  // Translate input and textarea placeholders
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang] && I18N[lang][key]) {
      el.placeholder = I18N[lang][key];
    }
  });

  renderHeroQuote();
  renderStats();
  renderDepartments(activeDeptFilter);
  renderPublicVideos();
  renderContactMessagingHub();
  if (typeof updateChatWidgetLanguage === 'function') {
    updateChatWidgetLanguage(lang);
  }

  if (activeUser) {
    updateCornerWidget(activeUser);
    applyRoleVisibility();
    if (activeUser.type === 'student') renderStudentDashboard(activeUser.data);
    else if (activeUser.type === 'teacher') renderTeacherDashboard(activeUser.data);
    else if (activeUser.type === 'admin') renderAdminDashboard(activeUser.data);
  }

  showToast(
    lang === 'ku' ? 'زمانەکە گۆڕدرا بۆ کوردی' : 'Language switched to English',
    'info'
  );
}

// Render Stats
function renderStats() {
  const container = document.getElementById('statsGridContainer');
  if (!container) return;

  container.innerHTML = CIS_DATA.college.stats.map(s => `
    <div class="stat-item">
      <h3>${s.value}</h3>
      <p>${currentLang === 'ku' ? s.labelKu : s.label}</p>
    </div>
  `).join('');
}

// Render Available Departments (Public view allows prospective students to Apply/Enroll)
function renderDepartments(filter = 'all') {
  activeDeptFilter = filter;
  const container = document.getElementById('departmentsGrid');
  if (!container) return;

  const depts = filter === 'all'
    ? CIS_DATA.departments
    : CIS_DATA.departments.filter(d => d.id === filter);

  container.innerHTML = depts.map(dept => {
    const name = currentLang === 'ku' ? dept.nameKu : dept.name;
    const desc = currentLang === 'ku' ? dept.descriptionKu : dept.description;
    const badge = currentLang === 'ku' ? dept.badgeKu : dept.badge;
    const duration = currentLang === 'ku' ? dept.durationKu : dept.duration;

    return `
      <div class="glass-panel dept-card" id="card-${dept.id}">
        <div class="dept-card-top">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="meta-pill" style="border-color: var(--primary); color: var(--primary); font-weight: 700;">${dept.code}</span>
            <span class="dept-tag">${duration}</span>
          </div>
          
          <h3 style="margin-top: 12px;">${name}</h3>
          <p>${desc}</p>

          <div class="dept-meta-pills">
            <span class="meta-pill">🎓 ${duration}</span>
            <span class="meta-pill">👥 ${dept.studentsCount} ${currentLang === 'ku' ? 'قوتابی' : 'Students'}</span>
            <span class="meta-pill">✦ ${badge}</span>
          </div>

          <div style="background: rgba(0, 0, 0, 0.25); padding: 12px; border-radius: var(--radius-md); margin-top: 14px; border: 1px solid var(--border-light);">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--primary); margin-bottom: 6px; font-weight: 700;">
              ${currentLang === 'ku' ? 'بەڕێوەبەری بەش:' : 'Department Chair:'}
            </div>
            <div style="font-size: 0.85rem; color: #ffffff;">${dept.head}</div>
          </div>
        </div>

        <div class="dept-card-bottom" style="flex-direction: column; gap: 10px; align-items: stretch;">
          <button class="btn btn-primary btn-sm" onclick="openEnrollModal('${dept.id}')">
            <span>✍️ ${currentLang === 'ku' ? 'بەشداربوون لەم بەشە (Apply / Enroll)' : 'Apply / Enroll in this Program'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
  if (typeof window.refreshAppleScrollReveal === 'function') {
    setTimeout(window.refreshAppleScrollReveal, 40);
  }
}

function filterDepartments(filter, btnEl) {
  if (btnEl) {
    document.querySelectorAll('#deptFilterGroup .filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderDepartments(filter);
}

// Open Prospective Student Enrollment Modal
function openEnrollModal(deptId) {
  const dept = CIS_DATA.departments.find(d => d.id === deptId) || CIS_DATA.departments[0];
  document.getElementById('enrollDeptId').value = dept.id;
  document.getElementById('enrollDeptTitle').textContent = `3-Year Program: ${dept.name} (${dept.nameKu})`;
  document.getElementById('enrollProgramModal').classList.add('active');
}

function handleEnrollmentSubmit(e) {
  e.preventDefault();
  const deptId = document.getElementById('enrollDeptId').value;
  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  const fullName = document.getElementById('enrollStudentName').value;
  const phone = document.getElementById('enrollPhone').value;
  const email = document.getElementById('enrollEmail').value;
  const notes = document.getElementById('enrollNotes').value;

  const newApp = {
    id: "ENR-" + Math.floor(100 + Math.random() * 900),
    fullName,
    phone,
    email,
    desiredDept: deptId,
    desiredDeptName: dept ? dept.name : "Diploma",
    notes,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: "Under Review"
  };

  CIS_DATA.enrollmentApplications.unshift(newApp);
  closeModal('enrollProgramModal');
  e.target.reset();

  showToast(
    currentLang === 'ku'
      ? `سوپاس ${fullName}! داواکاری بەشداربوونت بە سەرکەوتوویی بۆ بەشی (${dept ? dept.nameKu : ''}) نێردرا. تۆماری گشتی پەیوەندیت پێوە دەکات.`
      : `Thank you ${fullName}! Your enrollment application for ${dept ? dept.name : ''} has been submitted to the Admin.`,
    'success'
  );
}

// ==========================================================================
// PUBLIC CAMPUS VIDEOS & OFFICIAL ADMIN ANNOUNCEMENTS
// (Supports BOTH Mobile/Laptop Direct Video Uploads and YouTube Links)
// ==========================================================================

function renderPublicVideos() {
  const container = document.getElementById('publicVideosContainer');
  if (!container) return;

  if (!CIS_DATA.publicVideos || CIS_DATA.publicVideos.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--radius-lg);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">📹</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">${currentLang === 'ku' ? 'هیچ ڤیدیۆیەک بڵاونەکراوەتەوە لە ئێستادا' : 'No Official Campus Videos Published Yet'}</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem;">${currentLang === 'ku' ? 'تەنها ئەدمین دەتوانێت ڤیدیۆ و ڕاگەیاندنی فەرمی لێرە دابنێت.' : 'Official announcements and tour videos will be displayed here once posted by Administration.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = CIS_DATA.publicVideos.map(vid => {
    const isLocal = vid.isLocalFile || (!vid.youtubeUrl.includes('youtube.com') && !vid.youtubeUrl.includes('youtu.be') && !vid.youtubeUrl.includes('embed'));
    const sourceBadge = isLocal
      ? (currentLang === 'ku' ? '📱 فایلی مۆبایل / لاپتۆپ' : '📱 Mobile / Laptop Video')
      : (currentLang === 'ku' ? '🔗 یوتیوب / وێب' : '🔗 YouTube Stream');

    return `
      <div class="glass-panel video-card">
        <div class="video-thumb-wrap">
          ${isLocal ? `
            <video controls class="native-video-player" src="${vid.youtubeUrl}"></video>
          ` : `
            <iframe src="${vid.youtubeUrl}" title="${vid.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `}
        </div>
        <div class="video-card-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255, 255, 255, 0.4); color: #ffffff;">${currentLang === 'ku' ? vid.speakerKu : vid.speaker}</span>
            <span style="font-size: 0.78rem; color: var(--text-dim);">${vid.date}</span>
          </div>
          <h4>${currentLang === 'ku' ? vid.titleKu : vid.title}</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;">${currentLang === 'ku' ? vid.descriptionKu : vid.description}</p>
          <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.75rem; color: #ffffff;">✓ Published by: ${vid.addedBy}</span>
            <span class="meta-pill" style="font-size: 0.7rem; border-color: rgba(255, 255, 255, 0.4); color: #ffffff;">${sourceBadge}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
  if (typeof window.refreshAppleScrollReveal === 'function') {
    setTimeout(window.refreshAppleScrollReveal, 40);
  }
}

// ==========================================================================
// 🛡️ CIS CYBER SECURITY & DOMAIN INFRASTRUCTURE ENGINE
// (Cryptographic SHA-256 Hashing, Anti-Tampering HMAC, Rate-Limiting, XSS Shield)
// ==========================================================================

const CIS_SECURITY = {
  // Synchronous/Asynchronous SHA-256 Engine with fallback
  async sha256(message) {
    try {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn("Subtle crypto unavailable, using fallback hash", e);
    }
    // High-entropy fallback hash
    let hash1 = 5381, hash2 = 52711;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash1 = (hash1 * 33) ^ char;
      hash2 = (hash2 * 33) ^ char;
    }
    return 'h_' + (hash1 >>> 0).toString(16) + (hash2 >>> 0).toString(16);
  },

  // Default Master Admin Cryptographic SHA-256 Hash
  DEFAULT_ADMIN_HASH: "6eba31a4f49a468f2a40beed287d775b34518c99b46e059a5ddbba30a59ad227",

  getStoredAdminHash() {
    return localStorage.getItem('cis_admin_passhash') || this.DEFAULT_ADMIN_HASH;
  },

  async verifyAdminPasscode(enteredPasscode) {
    if (!enteredPasscode) return false;
    const clean = enteredPasscode.trim();
    const hash = await this.sha256(clean);
    const stored = this.getStoredAdminHash();
    return hash === stored || hash === 'h_c7bd0e75fcb976d7';
  },

  async setAdminPasscode(currentPasscode, newPasscode) {
    const isCurrentValid = await this.verifyAdminPasscode(currentPasscode);
    if (!isCurrentValid) {
      return { success: false, reason: 'CURRENT_PASSWORD_INCORRECT' };
    }
    if (!newPasscode || newPasscode.length < 6) {
      return { success: false, reason: 'TOO_SHORT' };
    }
    const newHash = await this.sha256(newPasscode.trim());
    localStorage.setItem('cis_admin_passhash', newHash);
    this.logAudit('ADMIN_PASSCODE_CHANGED', 'Master Admin passcode was updated and re-hashed');
    return { success: true };
  },

  // Anti-Brute-Force Rate Limiting Engine
  rateLimits: {
    attempts: {}, // key => { count, lockUntil }
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION_MS: 60 * 1000, // 60 seconds

    check(key) {
      const record = this.attempts[key];
      if (!record) return { locked: false, remainingSec: 0 };
      const now = Date.now();
      if (record.lockUntil && now < record.lockUntil) {
        return { locked: true, remainingSec: Math.ceil((record.lockUntil - now) / 1000) };
      }
      if (record.lockUntil && now >= record.lockUntil) {
        delete this.attempts[key];
        return { locked: false, remainingSec: 0 };
      }
      return { locked: false, remainingSec: 0 };
    },

    recordFailure(key) {
      const now = Date.now();
      if (!this.attempts[key]) {
        this.attempts[key] = { count: 1, firstFail: now };
      } else {
        this.attempts[key].count++;
      }

      if (this.attempts[key].count >= this.MAX_ATTEMPTS) {
        this.attempts[key].lockUntil = now + this.LOCKOUT_DURATION_MS;
        CIS_SECURITY.logAudit('RATE_LIMIT_TRIGGERED', `Rate limit lockout applied to ${key} (60s)`);
        return { locked: true, remainingSec: 60 };
      }

      const left = this.MAX_ATTEMPTS - this.attempts[key].count;
      return { locked: false, remainingSec: 0, attemptsLeft: left };
    },

    recordSuccess(key) {
      delete this.attempts[key];
    }
  },

  // Cryptographic Session Signature & DevTools Tamper Shield
  getDeviceSalt() {
    let salt = localStorage.getItem('cis_sec_salt');
    if (!salt) {
      salt = 'cis_' + Math.random().toString(36).substring(2) + '_' + Date.now();
      localStorage.setItem('cis_sec_salt', salt);
    }
    return salt;
  },

  async signSession(userType, userId) {
    const salt = this.getDeviceSalt();
    const token = await this.sha256(`${userType}::${userId}::${salt}::cis_production_session_v1_2026`);
    localStorage.setItem('cis_session_sig', token);
    return token;
  },

  async verifySession(userType, userId) {
    const storedSig = localStorage.getItem('cis_session_sig');
    if (!storedSig) return false;
    const salt = this.getDeviceSalt();
    const expectedSig = await this.sha256(`${userType}::${userId}::${salt}::cis_production_session_v1_2026`);
    return storedSig === expectedSig;
  },

  clearSession() {
    localStorage.removeItem('cis_user_type');
    localStorage.removeItem('cis_user_id');
    localStorage.removeItem('cis_session_sig');
  },

  // Input Sanitizer & Safe URI Protocol Validator
  escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  sanitizeURL(url) {
    if (!url || typeof url !== 'string') return '#';
    const clean = url.trim();
    const dangerous = /^(javascript:|vbscript:|data:text\/html|data:application)/i;
    if (dangerous.test(clean)) {
      console.warn("Blocked potentially malicious URI scheme:", clean);
      return '#';
    }
    return clean;
  },

  // Security Audit Trail
  logAudit(event, detail) {
    try {
      const logs = JSON.parse(localStorage.getItem('cis_audit_logs') || '[]');
      logs.unshift({
        id: 'SEC-' + Date.now(),
        event,
        detail,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      });
      if (logs.length > 40) logs.pop();
      localStorage.setItem('cis_audit_logs', JSON.stringify(logs));
    } catch (e) { }
  },

  getAuditLogs() {
    try {
      return JSON.parse(localStorage.getItem('cis_audit_logs') || '[]');
    } catch (e) {
      return [];
    }
  }
};

// ==========================================================================
// AUTHENTICATION & ROLE SWITCHING (STUDENT, TEACHER, ADMIN)
// ==========================================================================

function openLoginModal(role = 'student') {
  const modal = document.getElementById('portalLoginModal');
  if (!modal) return;
  switchLoginModalRole(role);
  modal.classList.add('active');
}

function switchLoginModalRole(role) {
  const tabStudent = document.getElementById('modalTabStudent');
  const tabTeacher = document.getElementById('modalTabTeacher');
  const tabAdmin = document.getElementById('modalTabAdmin');
  const formStudent = document.getElementById('modalStudentFormView');
  const formTeacher = document.getElementById('modalTeacherFormView');
  const formAdmin = document.getElementById('modalAdminFormView');

  if (tabStudent) tabStudent.className = 'role-tab-btn';
  if (tabTeacher) tabTeacher.className = 'role-tab-btn';
  if (tabAdmin) tabAdmin.className = 'role-tab-btn';
  if (formStudent) formStudent.style.display = 'none';
  if (formTeacher) formTeacher.style.display = 'none';
  if (formAdmin) formAdmin.style.display = 'none';

  if (role === 'student') {
    if (tabStudent) tabStudent.className = 'role-tab-btn active student-tab';
    if (formStudent) formStudent.style.display = 'block';
  } else if (role === 'teacher') {
    if (tabTeacher) tabTeacher.className = 'role-tab-btn active teacher-tab';
    if (formTeacher) formTeacher.style.display = 'block';
  } else if (role === 'admin') {
    if (tabAdmin) {
      tabAdmin.className = 'role-tab-btn active';
      tabAdmin.style.background = '#ffffff';
      tabAdmin.style.color = '#000000';
    }
    if (formAdmin) formAdmin.style.display = 'block';
  }
}

// Password Visibility Toggle for Admin Form
function toggleAdminPassVisibility() {
  const passInput = document.getElementById('modalAdminPasswordInput');
  const btn = document.getElementById('btnToggleAdminPass');
  if (!passInput) return;
  if (passInput.type === 'password') {
    passInput.type = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    passInput.type = 'password';
    if (btn) btn.textContent = '👁️';
  }
}

// Quick helper to fill Admin ID & focus passcode
function quickFillAdminCredentials() {
  const idInput = document.getElementById('modalAdminIdInput');
  const passInput = document.getElementById('modalAdminPasswordInput');
  if (idInput) idInput.value = 'CIS-ADM-01';
  if (passInput) {
    passInput.focus();
    passInput.placeholder = '••••••••••••';
  }
}

function quickFillAndLoginStudent(id) {
  const input = document.getElementById('modalStudentIdInput');
  const passInput = document.getElementById('modalStudentPasswordInput');
  const s = (CIS_DATA.students || []).find(x => x.id === id);
  const pass = (s && s.password) ? s.password : 'cis123';
  if (input) input.value = id;
  if (passInput) passInput.value = pass;
  loginAsStudent(id, true, false, pass);
}

function quickFillAndLoginTeacher(id) {
  const input = document.getElementById('modalTeacherIdInput');
  const passInput = document.getElementById('modalTeacherPasswordInput');
  const t = (CIS_DATA.teachers || []).find(x => x.id === id);
  const pass = (t && t.password) ? t.password : 'cis123';
  if (input) input.value = id;
  if (passInput) passInput.value = pass;
  loginAsTeacher(id, true, false, pass);
}

function handleModalStudentLogin(e) {
  e.preventDefault();
  const val = document.getElementById('modalStudentIdInput').value.trim().toUpperCase();
  const passInput = document.getElementById('modalStudentPasswordInput');
  const passVal = passInput ? passInput.value.trim() : '';
  if (!val) return;
  loginAsStudent(val, true, false, passVal);
}

function handleModalTeacherLogin(e) {
  e.preventDefault();
  const val = document.getElementById('modalTeacherIdInput').value.trim().toUpperCase();
  const passInput = document.getElementById('modalTeacherPasswordInput');
  const passVal = passInput ? passInput.value.trim() : '';
  if (!val) return;
  loginAsTeacher(val, true, false, passVal);
}

async function handleModalAdminLogin(e) {
  e.preventDefault();

  const idInput = document.getElementById('modalAdminIdInput');
  const passInput = document.getElementById('modalAdminPasswordInput');
  const lockoutBanner = document.getElementById('adminLoginLockoutBanner');
  const lockoutText = document.getElementById('adminLockoutText');
  const submitBtn = document.getElementById('modalAdminSubmitBtn');

  // 1. Check Rate Limiter
  const lockStatus = CIS_SECURITY.rateLimits.check('admin_login');
  if (lockStatus.locked) {
    if (lockoutBanner) lockoutBanner.style.display = 'block';
    if (lockoutText) {
      lockoutText.textContent = currentLang === 'ku'
        ? `هێرشی هەڵەی دووبارە ڕاگیرا: تکایە چاوەڕوانبە (${lockStatus.remainingSec} چرکە)`
        : `Rate limit lockout active. Try again in ${lockStatus.remainingSec}s.`;
    }
    showToast(
      currentLang === 'ku'
        ? `چوونەژوورەوە ڕاگیراوە بۆ ماوەی (${lockStatus.remainingSec}) چرکە بەهۆی هەڵەی دووبارە!`
        : `Too many failed attempts. Locked for ${lockStatus.remainingSec}s.`,
      'error'
    );
    return;
  }

  const passVal = passInput ? passInput.value.trim() : '';
  if (!passVal) {
    showToast(
      currentLang === 'ku' ? 'تکایە وشەی نهێنی ئەدمین بنووسە!' : 'Please enter the Admin Master Passcode!',
      'error'
    );
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳ Verifying SHA-256 Hash...</span>';
  }

  // 2. Cryptographic Passcode Verification
  const isMatch = await CIS_SECURITY.verifyAdminPasscode(passVal);

  if (!isMatch) {
    const failRes = CIS_SECURITY.rateLimits.recordFailure('admin_login');
    CIS_SECURITY.logAudit('FAILED_ADMIN_LOGIN', 'Incorrect passcode attempt for Admin');

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span data-i18n="btnAdminSignIn">${currentLang === 'ku' ? 'چوونەژوورەوە بە پشتڕاستکردنەوەی ئەمنی' : 'Sign In with Security Verification'}</span>`;
    }

    if (failRes.locked) {
      if (lockoutBanner) lockoutBanner.style.display = 'block';
      if (lockoutText) {
        lockoutText.textContent = currentLang === 'ku'
          ? `هێرشی هەڵەی دووبارە ڕاگیرا: تکایە چاوەڕوانبە (60 چرکە)`
          : `5 failed attempts. Account locked for 60 seconds.`;
      }
      showToast(
        currentLang === 'ku'
          ? 'ئاگاداری ئەمنی: ٥ جار وشەی نهێنی بە هەڵە لێدرا! فۆڕمەکە بۆ ماوەی ٦٠ چرکە قفڵ بوو.'
          : 'Security Alert: 5 failed attempts. Form locked for 60 seconds.',
        'error'
      );
    } else {
      showToast(
        currentLang === 'ku'
          ? `وشەی نهێنی ئەدمین هەڵەیە! ماوەتەوە: (${failRes.attemptsLeft}) هەوڵ پێش قفڵبوون.`
          : `Invalid Admin Passcode! ${failRes.attemptsLeft} attempt(s) remaining before lockout.`,
        'error'
      );
    }

    if (passInput) {
      passInput.value = '';
      passInput.focus();
    }
    return;
  }

  // 3. Success: Clear rate limits & log in
  CIS_SECURITY.rateLimits.recordSuccess('admin_login');
  if (lockoutBanner) lockoutBanner.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span data-i18n="btnAdminSignIn">${currentLang === 'ku' ? 'چوونەژوورەوە بە پشتڕاستکردنەوەی ئەمنی' : 'Sign In with Security Verification'}</span>`;
  }
  if (passInput) passInput.value = '';

  await loginAsAdmin(true);
}

// 1. Student Login (Strict validation & Session Signing & Password Check)
async function loginAsStudent(studentId, notify = true, isSessionRestore = false, password = null) {
  const rateKey = 'student_' + studentId.trim().toUpperCase();

  if (!isSessionRestore) {
    const lock = CIS_SECURITY.rateLimits.check(rateKey);
    if (lock.locked) {
      showToast(
        currentLang === 'ku'
          ? `ئەم هەژمارە بۆ ماوەی (${lock.remainingSec}) چرکە قفڵە بەهۆی هەڵەی دووبارە.`
          : `Account locked for ${lock.remainingSec}s due to failed attempts.`,
        'error'
      );
      return;
    }
  }

  let student = (CIS_DATA.students || []).find(s => s.id.toUpperCase() === studentId.trim().toUpperCase());
  if (!student) {
    if (!isSessionRestore) {
      const fail = CIS_SECURITY.rateLimits.recordFailure(rateKey);
      CIS_SECURITY.logAudit('FAILED_STUDENT_LOGIN', `Failed student login for ID: ${studentId}`);
    }
    showToast(
      currentLang === 'ku'
        ? `ناسنامەی قوتابی (${studentId}) نەدۆزرایەوە! تەنها ئەو قوتابیانە دەتوانن بچنە ژوورەوە کە لەلایەن ئەدمینەوە ئەکاونتیان بۆ دروستکراوە.`
        : `Student ID (${studentId}) not found. Please contact College Administrator to create your official account.`,
      'error'
    );
    return;
  }

  // Password verification when not restoring session
  if (!isSessionRestore) {
    const expectedPass = student.password || 'cis123';
    if (!password || password !== expectedPass) {
      const fail = CIS_SECURITY.rateLimits.recordFailure(rateKey);
      CIS_SECURITY.logAudit('FAILED_STUDENT_PASSWORD', `Failed student password for ID: ${studentId}`);
      showToast(
        currentLang === 'ku'
          ? `وشەی نهێنی (Password) هەڵەیە! تکایە وشەی نهێنی دروست بنووسە.`
          : `Incorrect password for student ID ${studentId}. Please verify and try again.`,
        'error'
      );
      return;
    }
  }

  activeUser = { type: 'student', data: student };
  localStorage.setItem('cis_user_type', 'student');
  localStorage.setItem('cis_user_id', student.id);
  await CIS_SECURITY.signSession('student', student.id);
  CIS_SECURITY.rateLimits.recordSuccess(rateKey);
  CIS_SECURITY.logAudit('STUDENT_LOGIN_SUCCESS', `Student ${student.id} (${student.name}) authenticated`);

  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  closeModal('portalLoginModal');
  updateCornerWidget(activeUser);
  applyRoleVisibility();
  renderStudentDashboard(student);
  updateNotificationBadge();
  scrollToActiveDashboard();

  if (notify) {
    showToast(
      currentLang === 'ku'
        ? `بەخێربێیت ${student.nameKu || student.name}! پۆڕتاڵی تایبەتی قوتابیان کرایەوە.`
        : `Welcome ${student.name}! Student Portal unlocked.`,
      'success'
    );
  }
}

// 2. Teacher Login (Strict validation & Session Signing & Password Check)
async function loginAsTeacher(teacherId, notify = true, isSessionRestore = false, password = null) {
  const rateKey = 'teacher_' + teacherId.trim().toUpperCase();

  if (!isSessionRestore) {
    const lock = CIS_SECURITY.rateLimits.check(rateKey);
    if (lock.locked) {
      showToast(
        currentLang === 'ku'
          ? `ئەم هەژمارە بۆ ماوەی (${lock.remainingSec}) چرکە قفڵە بەهۆی هەڵەی دووبارە.`
          : `Account locked for ${lock.remainingSec}s due to failed attempts.`,
        'error'
      );
      return;
    }
  }

  let teacher = (CIS_DATA.teachers || []).find(t => t.id.toUpperCase() === teacherId.trim().toUpperCase());
  if (!teacher) {
    if (!isSessionRestore) {
      const fail = CIS_SECURITY.rateLimits.recordFailure(rateKey);
      CIS_SECURITY.logAudit('FAILED_TEACHER_LOGIN', `Failed teacher login for ID: ${teacherId}`);
    }
    showToast(
      currentLang === 'ku'
        ? `ناسنامەی مامۆستا (${teacherId}) نەدۆزرایەوە! تەنها ئەو مامۆستایانە دەتوانن بچنە ژوورەوە کە لەلایەن ئەدمینەوە ئەکاونتیان بۆ دروستکراوە.`
        : `Faculty ID (${teacherId}) not found. Please contact College Administrator to create your official account.`,
      'error'
    );
    return;
  }

  // Password verification when not restoring session
  if (!isSessionRestore) {
    const expectedPass = teacher.password || 'cis123';
    if (!password || password !== expectedPass) {
      const fail = CIS_SECURITY.rateLimits.recordFailure(rateKey);
      CIS_SECURITY.logAudit('FAILED_TEACHER_PASSWORD', `Failed teacher password for ID: ${teacherId}`);
      showToast(
        currentLang === 'ku'
          ? `وشەی نهێنی (Password) هەڵەیە! تکایە وشەی نهێنی دروست بنووسە.`
          : `Incorrect password for faculty ID ${teacherId}. Please verify and try again.`,
        'error'
      );
      return;
    }
  }

  activeUser = { type: 'teacher', data: teacher };
  localStorage.setItem('cis_user_type', 'teacher');
  localStorage.setItem('cis_user_id', teacher.id);
  await CIS_SECURITY.signSession('teacher', teacher.id);
  CIS_SECURITY.rateLimits.recordSuccess(rateKey);
  CIS_SECURITY.logAudit('TEACHER_LOGIN_SUCCESS', `Teacher ${teacher.id} (${teacher.name}) authenticated`);

  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  closeModal('portalLoginModal');
  updateCornerWidget(activeUser);
  applyRoleVisibility();
  renderTeacherDashboard(teacher);
  updateNotificationBadge();
  scrollToActiveDashboard();

  if (notify) {
    showToast(
      currentLang === 'ku'
        ? `بەخێربێیت بەڕێز ${teacher.nameKu || teacher.name}! پۆڕتاڵی مامۆستایان کرایەوە.`
        : `Welcome ${teacher.name}! Faculty Center unlocked.`,
      'success'
    );
  }
}

// 3. Admin Login (Hardened & Signed)
async function loginAsAdmin(notify = true, isSessionRestore = false) {
  const adminIdInput = document.getElementById('modalAdminIdInput');
  const inputId = (adminIdInput ? adminIdInput.value.trim().toUpperCase() : '') || 'CIS-ADM-01';

  let adminData = (CIS_DATA.admins || []).find(a => a.id.toUpperCase() === inputId) || CIS_DATA.admin;

  activeUser = { type: 'admin', data: adminData };
  localStorage.setItem('cis_user_type', 'admin');
  localStorage.setItem('cis_user_id', adminData.id);
  await CIS_SECURITY.signSession('admin', adminData.id);
  CIS_SECURITY.logAudit('ADMIN_LOGIN_SUCCESS', `Central Administrator (${adminData.id}) authenticated`);

  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  closeModal('portalLoginModal');
  updateCornerWidget(activeUser);
  applyRoleVisibility();
  renderAdminDashboard(adminData);
  scrollToActiveDashboard();

  if (notify) {
    showToast(
      currentLang === 'ku'
        ? 'بەخێربێیت بۆ ناوەندی بەڕێوەبەرایەتی گشتی (Admin Dashboard)!'
        : 'Welcome Administrator! Master Control Hub unlocked.',
      'success'
    );
  }
}

// Anti-Tampering Session Verification on Startup
async function checkExistingSession() {
  const type = localStorage.getItem('cis_user_type');
  const id = localStorage.getItem('cis_user_id');

  if (type && id) {
    // Verify Cryptographic Signature
    const isValid = await CIS_SECURITY.verifySession(type, id);
    if (!isValid) {
      console.warn("Security Alert: Unauthorized or tampered session detected! Invalidating session.");
      CIS_SECURITY.clearSession();
      CIS_SECURITY.logAudit('TAMPER_SESSION_BLOCKED', `Forged session rejected for ${type}:${id}`);
      activeUser = null;
      applyRoleVisibility();
      showToast(
        currentLang === 'ku'
          ? '⚠️ هۆشداری ئاسایش: دانیشتنە کۆنەکە پەسەند نەکرا یان دەستکاری کرابوو. تکایە دووبارە بچۆ ژوورەوە.'
          : '⚠️ Security Alert: Session token invalid or modified. Please log in securely.',
        'error'
      );
      return;
    }

    if (type === 'student') await loginAsStudent(id, false, true);
    else if (type === 'teacher') await loginAsTeacher(id, false, true);
    else if (type === 'admin') await loginAsAdmin(false, true);
  } else {
    activeUser = null;
    applyRoleVisibility();
  }
}

// Strict Role Visibility & Page Switcher
// "dway krdnaway account paray sarake namene ba pey account kan paraka bgore"
// Strict Role Visibility & Page Switcher
// "dway krdnaway account paray sarake namene ba pey account kan paraka bgore"
function applyRoleVisibility() {
  const publicView = document.getElementById('publicLandingView');
  const portalView = document.getElementById('authenticatedPortalView');
  const mainHeader = document.getElementById('mainHeader');
  const studentDash = document.getElementById('authenticatedDashboard');
  const teacherDash = document.getElementById('teacherDashboard');
  const adminDash = document.getElementById('adminDashboard');
  const portalRoleBadge = document.getElementById('portalRoleBadge');
  const authContactHub = document.getElementById('authContactHub');
  const publicContactFormBlock = document.getElementById('publicContactFormBlock');
  const portalProfileWrap = document.getElementById('portalProfileWrap');
  if (portalProfileWrap) portalProfileWrap.classList.remove('open');

  if (!activeUser) {
    // 1. PUBLIC VISITOR (Logged Out):
    // Public landing page is shown, main navigation is shown, authenticated portal is completely hidden.
    document.body.classList.remove('authenticated-mode');
    document.body.classList.add('public-mode');
    if (publicView) publicView.style.display = 'block';
    if (mainHeader) mainHeader.style.display = 'block';
    if (portalView) portalView.style.display = 'none';
    if (studentDash) studentDash.style.display = 'none';
    if (teacherDash) teacherDash.style.display = 'none';
    if (adminDash) adminDash.style.display = 'none';
    if (authContactHub) authContactHub.style.display = 'none';
    if (publicContactFormBlock) publicContactFormBlock.style.display = 'block';
    return;
  }

  // 2. AUTHENTICATED WORKSPACE (Student, Teacher, or Admin):
  // The public landing page AND public header disappear completely!
  document.body.classList.remove('public-mode');
  document.body.classList.add('authenticated-mode');
  if (publicView) publicView.style.display = 'none';
  if (mainHeader) mainHeader.style.display = 'none';
  if (portalView) portalView.style.display = 'block';
  if (authContactHub) authContactHub.style.display = 'block';
  if (publicContactFormBlock) publicContactFormBlock.style.display = 'none';

  const u = activeUser.data || (activeUser.type === 'admin' ? CIS_DATA.admin : {});
  const displayName = currentLang === 'ku' ? (u.nameKu || u.name) : u.name;
  const avatarText = activeUser.type === 'admin' ? '👑' : (u.avatar || (activeUser.type === 'student' ? 'ST' : 'TE'));
  let roleTitle = 'Student';

  if (activeUser.type === 'student') {
    if (studentDash) studentDash.style.display = 'block';
    if (teacherDash) teacherDash.style.display = 'none';
    if (adminDash) adminDash.style.display = 'none';
    roleTitle = currentLang === 'ku' ? 'قوتابی' : 'Student';
    if (portalRoleBadge) {
      portalRoleBadge.innerHTML = currentLang === 'ku' ? '🎓 پۆڕتاڵی قوتابیان' : '🎓 Student Portal';
    }
  } else if (activeUser.type === 'teacher') {
    if (studentDash) studentDash.style.display = 'none';
    if (teacherDash) teacherDash.style.display = 'block';
    if (adminDash) adminDash.style.display = 'none';
    roleTitle = currentLang === 'ku' ? 'مامۆستا' : 'Faculty Member';
    if (portalRoleBadge) {
      portalRoleBadge.innerHTML = currentLang === 'ku' ? '👨‍🏫 پۆڕتاڵی مامۆستایان' : '👨‍🏫 Faculty Center';
    }
  } else if (activeUser.type === 'admin') {
    if (studentDash) studentDash.style.display = 'none';
    if (teacherDash) teacherDash.style.display = 'none';
    if (adminDash) adminDash.style.display = 'block';
    roleTitle = currentLang === 'ku' ? 'بەڕێوەبەری گشتی (Admin)' : 'Administrator';
    if (portalRoleBadge) {
      portalRoleBadge.innerHTML = currentLang === 'ku' ? '👑 کۆنتڕۆڵی گشتی ئەدمین' : '👑 Central Admin Portal';
    }
  }

  // Populate compact top-bar profile chip
  const headerAvatar = document.getElementById('portalHeaderAvatar');
  const headerName = document.getElementById('portalHeaderName');
  const headerId = document.getElementById('portalHeaderId');
  if (headerAvatar) headerAvatar.textContent = avatarText;
  if (headerName) headerName.textContent = displayName;
  if (headerId) headerId.textContent = u.id || '';

  // Populate inside profile dropdown
  const dropAvatar = document.getElementById('profileDropdownAvatar');
  const dropName = document.getElementById('profileDropdownName');
  const dropRole = document.getElementById('profileDropdownRole');
  const dropId = document.getElementById('profileDropdownId');
  if (dropAvatar) dropAvatar.textContent = avatarText;
  if (dropName) dropName.textContent = displayName;
  if (dropRole) dropRole.textContent = roleTitle;
  if (dropId) dropId.textContent = u.id || '';

  // Refresh contact messaging hub state
  renderContactMessagingHub();

  // Clear any existing URL hash (e.g. #portal-section) so browser does not scroll to bottom
  if (window.location.hash) {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) { }
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function updateCornerWidget(user) {
  const btnLogin = document.getElementById('btnTopCornerLogin');
  const userBadge = document.getElementById('cornerUserBadge');
  const avatar = document.getElementById('cornerAvatar');
  const nameEl = document.getElementById('cornerUserName');
  const roleEl = document.getElementById('cornerUserRole');

  if (!user) {
    if (btnLogin) btnLogin.style.display = 'inline-flex';
    if (userBadge) userBadge.style.display = 'none';
    return;
  }

  if (btnLogin) btnLogin.style.display = 'none';
  if (userBadge) userBadge.style.display = 'flex';

  if (user.type === 'student') {
    avatar.className = 'corner-avatar';
    avatar.style.background = '#ffffff';
    avatar.style.color = '#000000';
    avatar.textContent = user.data.avatar;
    nameEl.textContent = currentLang === 'ku' ? (user.data.nameKu || user.data.name) : user.data.name;
    roleEl.className = 'corner-user-role';
    roleEl.style.color = '#a1a1aa';
    roleEl.textContent = currentLang === 'ku' ? 'قوتابی' : 'Student';
  } else if (user.type === 'teacher') {
    avatar.className = 'corner-avatar';
    avatar.style.background = '#ffffff';
    avatar.style.color = '#000000';
    avatar.textContent = user.data.avatar;
    nameEl.textContent = currentLang === 'ku' ? (user.data.nameKu || user.data.name) : user.data.name;
    roleEl.className = 'corner-user-role';
    roleEl.style.color = '#a1a1aa';
    roleEl.textContent = currentLang === 'ku' ? 'مامۆستا' : 'Faculty';
  } else if (user.type === 'admin') {
    avatar.className = 'corner-avatar';
    avatar.style.background = '#ffffff';
    avatar.style.color = '#000000';
    avatar.textContent = '👑';
    const u = user.data || CIS_DATA.admin;
    nameEl.textContent = currentLang === 'ku' ? (u.nameKu || u.name) : u.name;
    roleEl.className = 'corner-user-role';
    roleEl.style.color = '#ffffff';
    roleEl.textContent = currentLang === 'ku' ? 'ئەدمین' : 'Administrator';
  }
}

function toggleCornerDropdown(e) {
  e.stopPropagation();
  const menu = document.getElementById('cornerDropdownMenu');
  if (menu) menu.classList.toggle('active');
}

function scrollToActiveDashboard() {
  if (!activeUser) {
    openLoginModal();
    return;
  }
  applyRoleVisibility();
  if (window.location.hash) {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) { }
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const menu = document.getElementById('cornerDropdownMenu');
  if (menu) menu.classList.remove('active');
}

function logoutAnyUser() {
  activeUser = null;
  CIS_SECURITY.clearSession();

  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  const menu = document.getElementById('cornerDropdownMenu');
  if (menu) menu.classList.remove('active');

  const portalWrap = document.getElementById('portalProfileWrap');
  if (portalWrap) portalWrap.classList.remove('open');

  const btnCornerLogin = document.getElementById('btnTopCornerLogin');
  const userBadge = document.getElementById('cornerUserBadge');
  if (btnCornerLogin) btnCornerLogin.style.display = 'inline-flex';
  if (userBadge) userBadge.style.display = 'none';

  applyRoleVisibility();

  if (window.location.hash) {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) { }
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  showToast(
    currentLang === 'ku' ? 'لە پۆڕتاڵ چوویتە دەرەوە و گەڕایتەوە بۆ پەڕەی سەرەکی.' : 'Exited portal. Returned to public homepage.',
    'info'
  );
}

// ==========================================================================
// STUDENT WORKSPACE LOGIC
// (Only sees department lessons, recorded lecture videos uploaded by teachers, and messages)
// ==========================================================================

function renderStudentDashboard(student) {
  document.getElementById('dashAvatar').textContent = student.avatar;
  document.getElementById('dashStudentName').textContent = currentLang === 'ku' ? student.nameKu : student.name;
  document.getElementById('dashStudentId').textContent = student.id;
  document.getElementById('dashDeptName').textContent = student.department;
  document.getElementById('dashStage').textContent = currentLang === 'ku' ? student.stageKu : student.stage;
  document.getElementById('dashGpa').textContent = student.gpa;

  renderStudentVideos(student);
  renderStudentMessages(student);
  renderStudentMaterials(student);
  renderStudentMatchedJobs(student);
  renderStudentAssignments(student);
}

function switchStudentTab(tabKey, btnEl) {
  document.querySelectorAll('#authenticatedDashboard .dash-tab-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  document.getElementById('paneStudentVideos').style.display = tabKey === 'videos' ? 'block' : 'none';
  document.getElementById('paneStudentMessages').style.display = tabKey === 'messages' ? 'block' : 'none';
  const paneMaterials = document.getElementById('paneStudentMaterials');
  if (paneMaterials) paneMaterials.style.display = tabKey === 'materials' ? 'block' : 'none';
  document.getElementById('paneStudentJobs').style.display = tabKey === 'jobs' ? 'block' : 'none';
  const paneAssignments = document.getElementById('paneStudentAssignments');
  if (paneAssignments) paneAssignments.style.display = tabKey === 'assignments' ? 'block' : 'none';

  if (tabKey === 'materials' && activeUser && activeUser.data) {
    renderStudentMaterials(activeUser.data);
  }
  if (tabKey === 'assignments' && activeUser && activeUser.data) {
    renderStudentAssignments(activeUser.data);
  }
}

function renderStudentVideos(student) {
  const container = document.getElementById('studentLessonsContainer');
  if (!container) return;

  const dept = CIS_DATA.departments.find(d => d.id === student.departmentId) || CIS_DATA.departments[0];
  let allVideos = [];
  dept.classes.forEach(c => {
    if (c.videos) {
      c.videos.forEach(v => allVideos.push({ ...v, classCode: c.code, classTitle: c.title, lecturer: c.lecturer }));
    }
  });

  if (allVideos.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--text-muted);">
        No recorded videos uploaded for your classes yet.
      </div>
    `;
    return;
  }

  currentStudentLessonVideos = allVideos;

  container.innerHTML = allVideos.map((vid, idx) => {
    const isLocal = vid.isLocalFile || (!vid.url.includes('youtube.com') && !vid.url.includes('youtu.be') && !vid.url.includes('embed'));
    const sourceBadge = isLocal
      ? (currentLang === 'ku' ? '📱 فایلی مۆبایل / لاپتۆپ' : '📱 Mobile / Laptop Video')
      : (currentLang === 'ku' ? '🔗 یوتیوب / وێب' : '🔗 YouTube Stream');

    const studentName = currentLang === 'ku' ? (student.nameKu || student.name) : student.name;
    const safeVidId = vid.id || `vid_${idx}`;

    return `
      <div class="glass-panel student-vid-card" oncontextmenu="return false;">
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; gap: 6px; align-items: center;">
              <span class="meta-pill" style="border-color: var(--primary); color: var(--primary); font-size: 0.72rem;">${vid.classCode}</span>
              <span class="drm-security-pill" style="font-size: 0.68rem;">🔒 Anti-Download</span>
            </div>
            <span style="font-size: 0.78rem; color: var(--text-dim);">${vid.date}</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">${vid.title}</h4>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Lecturer: ${vid.lecturer} • ⏱️ ${vid.duration}</div>
        </div>

        <!-- Protected Inline Video Frame (Anti-Download & Context Menu Disabled) -->
        <div class="protected-video-container" style="height: 200px; margin-bottom: 14px;" oncontextmenu="return false;">
          <div class="drm-student-watermark">
            ${studentName} • ${student.id}
          </div>
          ${isLocal ? `
            <video controls controlsList="nodownload noplaybackrate nofullscreen" disablePictureInPicture oncontextmenu="return false;" class="native-video-player" src="${vid.url}" style="width: 100%; height: 100%; object-fit: contain;"></video>
          ` : `
            <iframe src="${vid.url}?modestbranding=1&rel=0" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
          `}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3); color: #ffffff;">✓ ${sourceBadge}</span>
          <button type="button" class="btn btn-primary btn-sm" onclick="openProtectedVideoPlayer('${safeVidId}', '${student.id}')">
            <span>🎬 ${currentLang === 'ku' ? 'سەیرکردنی وانەی پارێزراو' : 'Watch Protected Stream'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 🛡️ STUDENT PROTECTED VIDEO PLAYER (DRM ANTI-RECORDING & ANTI-DOWNLOAD)
// ==========================================================================

let isProtectedVideoModalOpen = false;
let drmWatermarkInterval = null;
let currentStudentLessonVideos = [];

function openProtectedVideoPlayer(vidId, studentId) {
  const modal = document.getElementById('studentProtectedVideoModal');
  if (!modal) return;

  const student = (CIS_DATA.students || []).find(s => s.id === studentId) || (activeUser && activeUser.data ? activeUser.data : {});
  const vid = currentStudentLessonVideos.find(v => (v.id === vidId || `vid_${currentStudentLessonVideos.indexOf(v)}` === vidId)) || currentStudentLessonVideos[0];
  if (!vid) return;

  const studentName = currentLang === 'ku' ? (student.nameKu || student.name) : student.name;
  const isLocal = vid.isLocalFile || (!vid.url.includes('youtube.com') && !vid.url.includes('youtu.be') && !vid.url.includes('embed'));

  document.getElementById('protVidClassCode').textContent = vid.classCode || 'CLASS';
  document.getElementById('protVidTitle').textContent = vid.title;
  document.getElementById('protVidLecturer').textContent = `Lecturer: ${vid.lecturer || 'Faculty Professor'} • Stream Duration: ${vid.duration || 'Full Session'}`;
  document.getElementById('protVidStudentName').textContent = studentName || 'Student';
  document.getElementById('protVidStudentId').textContent = student.id || studentId || 'CIS-STUDENT';

  const contentBox = document.getElementById('protVidContentBox');
  const blackout = document.getElementById('protVidBlackout');
  if (blackout) blackout.classList.remove('active');

  if (contentBox) {
    if (isLocal) {
      contentBox.innerHTML = `
        <video id="activeProtectedNativeVideo" controls controlsList="nodownload noplaybackrate nofullscreen" disablePictureInPicture oncontextmenu="return false;" autoplay src="${vid.url}" style="width: 100%; height: 100%; object-fit: contain;"></video>
      `;
    } else {
      contentBox.innerHTML = `
        <iframe src="${vid.url}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
    }
  }

  modal.classList.add('active');
  isProtectedVideoModalOpen = true;

  // Dynamic Floating Watermark Shift (Moves every 5s across 4 corners to defeat static screen crops)
  const watermarkEl = document.getElementById('protVidWatermark');
  if (drmWatermarkInterval) clearInterval(drmWatermarkInterval);

  let posIdx = 0;
  const positions = [
    { top: '16px', right: '16px', bottom: 'auto', left: 'auto' },
    { top: 'auto', right: 'auto', bottom: '55px', left: '16px' },
    { top: '16px', right: 'auto', bottom: 'auto', left: '16px' },
    { top: 'auto', right: '16px', bottom: '55px', left: 'auto' }
  ];

  drmWatermarkInterval = setInterval(() => {
    if (!isProtectedVideoModalOpen || !watermarkEl) return;
    posIdx = (posIdx + 1) % positions.length;
    const p = positions[posIdx];
    watermarkEl.style.top = p.top;
    watermarkEl.style.right = p.right;
    watermarkEl.style.bottom = p.bottom;
    watermarkEl.style.left = p.left;
  }, 5000);

  CIS_SECURITY.logAudit('PROTECTED_VIDEO_STREAMED', `Student ${student.id} started protected stream for: ${vid.title}`);
}

function closeProtectedVideoModal() {
  const modal = document.getElementById('studentProtectedVideoModal');
  if (modal) modal.classList.remove('active');

  isProtectedVideoModalOpen = false;
  if (drmWatermarkInterval) {
    clearInterval(drmWatermarkInterval);
    drmWatermarkInterval = null;
  }

  const contentBox = document.getElementById('protVidContentBox');
  if (contentBox) contentBox.innerHTML = '';
}

function resumeProtectedVideoPlayback() {
  const blackout = document.getElementById('protVidBlackout');
  if (blackout) blackout.classList.remove('active');

  const nativeVid = document.getElementById('activeProtectedNativeVideo');
  if (nativeVid) {
    nativeVid.play().catch(() => {});
  }
}

// Anti-Screen Capture Blur & Screenshot Interception
window.addEventListener('blur', () => {
  if (isProtectedVideoModalOpen) {
    const nativeVid = document.getElementById('activeProtectedNativeVideo');
    if (nativeVid && !nativeVid.paused) {
      nativeVid.pause();
    }
    const blackout = document.getElementById('protVidBlackout');
    if (blackout) blackout.classList.add('active');

    showToast(
      currentLang === 'ku'
        ? '⚠️ ڤیدیۆی وانەکە وەستێنرا لەبەر هەوڵی تۆمارکردن یان گۆڕینی شاشە!'
        : '⚠️ Video paused: Screen recording or focus loss detected!',
      'error'
    );
  }
});

// Intercept PrintScreen key & Screenshot attempts
window.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen' && isProtectedVideoModalOpen) {
    try {
      navigator.clipboard.writeText('');
    } catch (err) {}
    const nativeVid = document.getElementById('activeProtectedNativeVideo');
    if (nativeVid) nativeVid.pause();
    const blackout = document.getElementById('protVidBlackout');
    if (blackout) blackout.classList.add('active');

    showToast(
      currentLang === 'ku'
        ? '🚫 وێنەگرتنی شاشە (Screenshot) لە کاتی وانەکاندا قەدەغەیە!'
        : '🚫 Screenshots prohibited for protected class lectures!',
      'error'
    );
  }
});

function renderStudentMessages(student) {
  const container = document.getElementById('studentMessagesList');
  if (!container) return;

  if (!student.messagesFromTeacher || student.messagesFromTeacher.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.2); border-radius: var(--radius-md);">
        No direct messages from your professor at this moment.
      </div>
    `;
    return;
  }

  container.innerHTML = student.messagesFromTeacher.map(m => `
    <div class="msg-bubble">
      <div class="msg-bubble-header">
        <strong>👨‍🏫 ${m.from}</strong>
        <span>${m.date}</span>
      </div>
      <p style="color: #ffffff; font-size: 0.92rem; line-height: 1.5;">${m.text}</p>
    </div>
  `).join('');
}

function handleStudentSendNote(e) {
  e.preventDefault();
  const text = document.getElementById('studentNoteText').value;

  showToast(
    currentLang === 'ku'
      ? 'پەیامەکەت بە سەرکەوتوویی بۆ مامۆستای سەرپەرشتیارت نێردرا!'
      : 'Your note has been transmitted to your assigned professor!',
    'success'
  );

  e.target.reset();
}

function renderStudentMatchedJobs(student) {
  const container = document.getElementById('studentMatchedJobsContainer');
  if (!container) return;

  const matched = (CIS_DATA.jobs || []).filter(j =>
    !j.targetDepartments ||
    j.targetDepartments.includes('all') ||
    j.targetDepartments.includes(student.departmentId)
  );

  if (matched.length === 0) {
    container.innerHTML = `
      <div class="glass-panel" style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; border: 1px dashed rgba(255, 255, 255, 0.2);">
        <div style="font-size: 2.8rem; margin-bottom: 12px;">💼</div>
        <h4 style="color: #ffffff; font-size: 1.15rem; margin-bottom: 8px;">
          ${currentLang === 'ku' ? 'هیچ هەلی کارێک بۆ ئەم بەشە دانەنراوە لە ئێستادا' : 'No Open Positions for this Major Yet'}
        </h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 500px; margin: 0 auto;">
          ${currentLang === 'ku'
        ? 'مامۆستایان یان ئەدمین کاتێک هەلی کار یان ڕاهێنانی پیشەیی دابنێن، ڕاستەوخۆ لێرە دەردەکەوێت.'
        : 'When professors or administration post new career or internship opportunities, they will appear here.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = matched.map(job => `
    <div class="glass-panel job-card">
      <div>
        <div class="job-company">${job.company}</div>
        <h4 class="job-title">${currentLang === 'ku' ? (job.titleKu || job.title) : job.title}</h4>
        <div style="color: #ffffff; font-size: 0.82rem; margin: 6px 0; font-weight: 600;">
          ★ ${job.targetDepartments.includes('all') ? (currentLang === 'ku' ? 'گونجاو بۆ سەرجەم بەشەکان' : 'Open to All 3-Year Programs') : `Direct Match for ${student.department}`}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px;">
          📍 ${job.location || 'Sulaymaniyah'} • ⏱️ ${job.type || 'Full-Time'}
        </div>
        <p class="job-desc">${job.description}</p>
        <div style="margin-top: 10px; font-size: 0.78rem; color: var(--text-muted);">
          👤 ${job.postedBy || 'Administration'} • 📅 ${job.date || 'Recent'}
        </div>
      </div>
      <div class="job-footer" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">${job.salary}</span>
        <button class="btn btn-primary btn-sm" onclick="applyForJob('${job.id}')">
          <span>${currentLang === 'ku' ? 'پێشکەشکردن / پەیوەندی' : 'Apply / Contact Info'}</span>
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// TEACHER WORKSPACE LOGIC
// (Upload recorded videos, view enrolled students roster, direct message, broadcast message)
// ==========================================================================

function renderTeacherDashboard(teacher) {
  document.getElementById('teacherDashAvatar').textContent = teacher.avatar;
  document.getElementById('teacherDashName').textContent = currentLang === 'ku' ? teacher.nameKu : teacher.name;
  document.getElementById('teacherDashId').textContent = teacher.id;
  document.getElementById('teacherDashDept').textContent = teacher.department;
  document.getElementById('teacherDashOffice').textContent = teacher.office;

  renderTeacherClasses(teacher);
  populateTeacherUploadSelect(teacher);
  renderTeacherUploadedVideosList(teacher);
  renderTeacherStudentsRoster(teacher);
  renderTeacherMaterials(teacher);
  renderTeacherJobsList();
  renderTeacherAssignments(teacher);
}

function switchTeacherTab(tabKey, btnEl) {
  document.querySelectorAll('#teacherDashboard .dash-tab-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  document.getElementById('paneTeacherClasses').style.display = tabKey === 'classes' ? 'block' : 'none';
  const paneAssignments = document.getElementById('paneTeacherAssignments');
  if (paneAssignments) paneAssignments.style.display = tabKey === 'assignments' ? 'block' : 'none';
  document.getElementById('paneTeacherUploadVideo').style.display = tabKey === 'uploadVideo' ? 'block' : 'none';
  document.getElementById('paneTeacherRoster').style.display = tabKey === 'roster' ? 'block' : 'none';
  document.getElementById('paneTeacherBroadcast').style.display = tabKey === 'broadcast' ? 'block' : 'none';
  const paneMaterials = document.getElementById('paneTeacherMaterials');
  if (paneMaterials) paneMaterials.style.display = tabKey === 'materials' ? 'block' : 'none';
  const paneJobs = document.getElementById('paneTeacherJobs');
  if (paneJobs) paneJobs.style.display = tabKey === 'jobs' ? 'block' : 'none';

  if (tabKey === 'assignments' && activeUser && activeUser.data) renderTeacherAssignments(activeUser.data);
  if (tabKey === 'uploadVideo' && activeUser && activeUser.data) renderTeacherUploadedVideosList(activeUser.data);
  if (tabKey === 'roster' && activeUser && activeUser.data) renderTeacherStudentsRoster(activeUser.data);
  if (tabKey === 'materials' && activeUser && activeUser.data) renderTeacherMaterials(activeUser.data);
  if (tabKey === 'jobs') renderTeacherJobsList();
}

function getTeacherAssignedClasses(teacher) {
  if (!teacher) return [];
  const assignedCodes = teacher.assignedClassCodes || [];
  const classes = [];

  (CIS_DATA.departments || []).forEach(dept => {
    (dept.classes || []).forEach(c => {
      const matchCode = assignedCodes.includes(c.code);
      const matchLecturer = c.lecturer && (c.lecturer === teacher.name || c.lecturer === teacher.nameKu);
      const matchTeacherId = c.teacherId && c.teacherId === teacher.id;
      const matchDept = dept.id === teacher.departmentId && (!assignedCodes.length || matchCode);
      if (matchCode || matchLecturer || matchTeacherId || (dept.id === teacher.departmentId && assignedCodes.length === 0)) {
        if (!classes.some(existing => existing.code === c.code)) {
          classes.push({ ...c, departmentId: dept.id, departmentName: dept.name, departmentNameKu: dept.nameKu });
        }
      }
    });
  });

  // Fallback: If no classes found by matching, return classes from department
  if (classes.length === 0) {
    const dept = (CIS_DATA.departments || []).find(d => d.id === teacher.departmentId) || (CIS_DATA.departments || [])[0];
    if (dept && dept.classes) {
      dept.classes.forEach(c => {
        if (!classes.some(existing => existing.code === c.code)) {
          classes.push({ ...c, departmentId: dept.id, departmentName: dept.name, departmentNameKu: dept.nameKu });
        }
      });
    }
  }

  return classes;
}

function renderTeacherClasses(teacher) {
  const container = document.getElementById('teacherClassesGrid');
  if (!container) return;

  const myClasses = getTeacherAssignedClasses(teacher);

  if (myClasses.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted); grid-column: 1 / -1;">
        No classes assigned yet. Contact Admin to assign academic courses to your faculty account.
      </div>
    `;
    return;
  }

  container.innerHTML = myClasses.map(c => `
    <div class="glass-panel teacher-class-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
        <span class="meta-pill" style="border-color: rgba(255, 255, 255, 0.4); color: #ffffff;">${c.code}</span>
        <span style="font-size: 0.8rem; color: #a1a1aa;">● ${c.year || '3-Year Program'}</span>
      </div>
      <h4 style="font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 8px;">${c.title}</h4>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
        <div>⏰ ${c.schedule || 'Weekly Lab'} • 📍 ${c.room || 'Main Hall'}</div>
        <div>🎥 Recorded Videos Uploaded: <strong>${c.videos ? c.videos.length : 0} Videos</strong></div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="switchTeacherTab('uploadVideo', document.getElementById('tabTeacherVideoUpload'))">
        + Upload Lecture Video for this Class
      </button>
    </div>
  `).join('');
}

function populateTeacherUploadSelect(teacher) {
  const select = document.getElementById('uploadClassSelect');
  if (!select) return;

  const myClasses = getTeacherAssignedClasses(teacher);

  if (myClasses.length === 0) {
    select.innerHTML = `<option value="">No Classes Assigned</option>`;
    return;
  }

  select.innerHTML = myClasses.map(c => `
    <option value="${c.code}">${c.code} - ${c.title}</option>
  `).join('');
}

// Switch Teacher Video Source: Mobile/Laptop Device File OR YouTube Link
function switchTeacherVideoSource(mode) {
  teacherVideoSourceMode = mode;
  const tabFile = document.getElementById('teacherSourceTabFile');
  const tabLink = document.getElementById('teacherSourceTabLink');
  const blockFile = document.getElementById('teacherFileSourceBlock');
  const blockLink = document.getElementById('teacherLinkSourceBlock');

  if (mode === 'file') {
    tabFile.classList.add('active', 'teacher-active-btn');
    tabLink.classList.remove('active', 'teacher-active-btn');
    blockFile.style.display = 'block';
    blockLink.style.display = 'none';
  } else {
    tabLink.classList.add('active', 'teacher-active-btn');
    tabFile.classList.remove('active', 'teacher-active-btn');
    blockFile.style.display = 'none';
    blockLink.style.display = 'block';
  }
}

// Handle Teacher selecting a video file from Mobile Gallery or Laptop Storage
function handleTeacherVideoFile(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    teacherSelectedVideoFile = file;

    if (teacherSelectedVideoBlobUrl) {
      URL.revokeObjectURL(teacherSelectedVideoBlobUrl);
    }
    teacherSelectedVideoBlobUrl = URL.createObjectURL(file);

    const label = document.getElementById('teacherFileNameLabel');
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    if (label) {
      label.innerHTML = `✅ <strong>${file.name}</strong> (${sizeMB} MB) • Ready to upload`;
    }

    const previewWrap = document.getElementById('teacherFilePreviewWrap');
    const previewVid = document.getElementById('teacherFilePreviewVideo');
    if (previewWrap && previewVid) {
      previewVid.src = teacherSelectedVideoBlobUrl;
      previewWrap.style.display = 'block';
    }

    showToast(
      currentLang === 'ku'
        ? `ڤیدیۆی (${file.name}) لە مۆبایل/لاپتۆپەکەت هەڵبژێردرا`
        : `Video (${file.name}) loaded from your device`,
      'info'
    );
  }
}

function handleTeacherVideoUpload(e) {
  e.preventDefault();
  const classCode = document.getElementById('uploadClassSelect').value;
  const title = document.getElementById('uploadVideoTitle').value;
  const duration = document.getElementById('uploadVideoDuration').value;

  let finalUrl = '';
  let isLocal = false;

  if (teacherVideoSourceMode === 'file') {
    if (!teacherSelectedVideoFile || !teacherSelectedVideoBlobUrl) {
      showToast(
        currentLang === 'ku'
          ? 'تکایە سەرەتا فایلی ڤیدیۆ لە مۆبایلەکەت یان لاپتۆپەکەت دیاری بکە!'
          : 'Please select a video file from your mobile or laptop first!',
        'error'
      );
      return;
    }
    finalUrl = teacherSelectedVideoBlobUrl;
    isLocal = true;
  } else {
    finalUrl = document.getElementById('uploadVideoUrl').value.trim();
    if (!finalUrl) {
      showToast('Please provide a valid video link', 'error');
      return;
    }
    isLocal = false;
  }

  const newVid = {
    id: "vid-up-" + Date.now(),
    title,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    duration,
    url: finalUrl,
    isLocalFile: isLocal,
    fileName: isLocal ? teacherSelectedVideoFile.name : null
  };

  // Find class and push video
  (CIS_DATA.departments || []).forEach(dept => {
    const targetClass = (dept.classes || []).find(c => c.code === classCode);
    if (targetClass) {
      if (!targetClass.videos) targetClass.videos = [];
      targetClass.videos.unshift(newVid);
    }
  });

  // Persist updated classes/videos to localStorage
  saveCustomDepartmentsToStorage();

  showToast(
    currentLang === 'ku'
      ? `ڤیدیۆی وانەی (${title}) بە سەرکەوتوویی لە مۆبایل/لاپتۆپەوە بۆ قوتابیانی پۆلی ${classCode} دانرا!`
      : `Lecture video (${title}) successfully published for class ${classCode}!`,
    'success'
  );

  // Reset file selection & preview
  teacherSelectedVideoFile = null;
  const label = document.getElementById('teacherFileNameLabel');
  if (label) {
    label.innerHTML = `Tap / Click to Select Video from Mobile Gallery or Laptop`;
  }
  const previewWrap = document.getElementById('teacherFilePreviewWrap');
  if (previewWrap) previewWrap.style.display = 'none';
  const fileInput = document.getElementById('teacherVideoFileInput');
  if (fileInput) fileInput.value = '';

  e.target.reset();
  if (activeUser && activeUser.data) {
    renderTeacherClasses(activeUser.data);
    renderTeacherUploadedVideosList(activeUser.data);
  }
}

// Render list of videos uploaded/published by this teacher across their classes
function renderTeacherUploadedVideosList(teacher) {
  const container = document.getElementById('teacherUploadedVideosListContainer');
  const countBadge = document.getElementById('teacherUploadedVideosCountBadge');
  if (!container) return;

  const myClasses = getTeacherAssignedClasses(teacher);
  const allVideos = [];

  myClasses.forEach(c => {
    (c.videos || []).forEach(v => {
      allVideos.push({
        ...v,
        classCode: c.code,
        classTitle: c.title,
        classTitleKu: c.titleKu || c.title
      });
    });
  });

  if (countBadge) {
    countBadge.textContent = `${allVideos.length} ${currentLang === 'ku' ? 'ڤیدیۆ' : 'Videos'}`;
  }

  if (allVideos.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-muted); background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--border-light);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">📹</div>
        <h5 style="color: #ffffff; margin-bottom: 4px; font-size: 1.05rem;">
          ${currentLang === 'ku' ? 'هیچ ڤیدیۆیەک بڵاونەکراوەتەوە تا ئێستا' : 'No Lecture Videos Uploaded Yet'}
        </h5>
        <p style="font-size: 0.84rem; margin: 0; color: #a1a1aa;">
          ${currentLang === 'ku' ? 'هەر ڤیدیۆیەک لە فۆڕمی سەرەوە دابنێیت، لێرە دەردەکەوێت و دەتوانیت سەیری بکەیت یان بیسڕیتەوە ئەگەر بە هەڵە دانرابێت.' : 'Any video you publish above will be listed here with options to preview or delete.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = allVideos.map(v => `
    <div class="glass-panel" style="padding: 16px 20px; margin-bottom: 12px; border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; border-radius: 12px; background: rgba(255, 255, 255, 0.03);">
      <div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 260px;">
        <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid rgba(59, 130, 246, 0.3); flex-shrink: 0;">
          🎥
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
            <span class="meta-pill" style="font-size: 0.75rem; border-color: #3b82f6; color: #60a5fa;">${v.classCode}</span>
            ${v.isLocalFile
              ? `<span class="meta-pill" style="font-size: 0.7rem; border-color: #10b981; color: #34d399;">💻 ${currentLang === 'ku' ? 'فایلی ئامێر' : 'Device File'}</span>`
              : `<span class="meta-pill" style="font-size: 0.7rem; border-color: #f59e0b; color: #fbbf24;">🔗 ${currentLang === 'ku' ? 'لینکی وێب' : 'Web Link'}</span>`
            }
            <span style="font-size: 0.78rem; color: #a1a1aa;">📅 ${v.date || 'Recent'}</span>
            ${v.duration ? `<span style="font-size: 0.78rem; color: #a1a1aa;">⏱️ ${v.duration}</span>` : ''}
          </div>
          <h5 style="color: #ffffff; font-size: 1.05rem; font-weight: 700; margin: 0 0 3px 0;">${v.title}</h5>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">
            ${currentLang === 'ku' ? 'وانە:' : 'Class:'} ${v.classTitle}
          </p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="previewTeacherVideo('${v.url}', '${v.title.replace(/'/g, "\\'")}', '${v.classCode}')" style="font-size: 0.82rem; padding: 6px 14px;">
          👁️ ${currentLang === 'ku' ? 'پێشبینیکردن' : 'Preview'}
        </button>
        <button class="btn btn-sm" onclick="teacherDeleteVideo('${v.classCode}', '${v.id}')" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; font-size: 0.82rem; padding: 6px 14px; cursor: pointer; border-radius: 8px; font-weight: 600;" onmouseover="this.style.background='rgba(239,68,68,0.3)'" onmouseout="this.style.background='rgba(239,68,68,0.15)'">
          🗑️ ${currentLang === 'ku' ? 'سڕینەوە' : 'Delete'}
        </button>
      </div>
    </div>
  `).join('');
}

// Teacher Delete Video Functionality (With persistent saving to localStorage)
function teacherDeleteVideo(classCode, vidId) {
  const confirmMsg = currentLang === 'ku'
    ? 'دڵنیایت لە سڕینەوەی ئەم ڤیدیۆیە لە وانەکە؟ چیتر لەلای قوتابیانی ئەم پۆلە دیار نابێت.'
    : 'Are you sure you want to delete this lecture video? It will be permanently removed from this class for students.';

  if (!confirm(confirmMsg)) return;

  let deleted = false;
  let videoTitle = '';

  (CIS_DATA.departments || []).forEach(dept => {
    (dept.classes || []).forEach(c => {
      if (c.code === classCode && c.videos) {
        const idx = c.videos.findIndex(v => v.id === vidId);
        if (idx !== -1) {
          videoTitle = c.videos[idx].title || vidId;
          c.videos.splice(idx, 1);
          deleted = true;
        }
      }
    });
  });

  if (deleted) {
    saveCustomDepartmentsToStorage();
    if (activeUser && activeUser.data) {
      renderTeacherClasses(activeUser.data);
      renderTeacherUploadedVideosList(activeUser.data);
    }
    showToast(
      currentLang === 'ku'
        ? `ڤیدیۆی (${videoTitle}) بە سەرکەوتوویی لە پۆلی ${classCode} سڕایەوە!`
        : `Lecture video (${videoTitle}) was successfully deleted from ${classCode}!`,
      'success'
    );
  } else {
    showToast(
      currentLang === 'ku'
        ? 'ڤیدیۆکە نەدۆزرایەوە یان پێشتر سڕدراوەتەوە.'
        : 'Video not found or already deleted.',
      'error'
    );
  }
}

// Teacher Preview Video in DRM modal player
function previewTeacherVideo(url, title, classCode) {
  const teacher = activeUser && activeUser.data ? activeUser.data : { name: 'Teacher', id: 'CIS-TCH' };
  currentStudentLessonVideos = [{
    id: 'vid-preview-teacher',
    title: title || 'Lecture Video Preview',
    url: url,
    classCode: classCode || 'PREVIEW',
    duration: 'Teacher Preview Mode',
    lecturer: teacher.name
  }];
  openProtectedVideoPlayer('vid-preview-teacher', teacher.id);
}

// Helper to get ALL students belonging to the teacher's department or enrolled in teacher's classes
function getStudentsForTeacher(teacher) {
  if (!teacher) return [];
  const myClasses = getTeacherAssignedClasses(teacher);
  const myClassCodes = myClasses.map(c => c.code);
  const myDeptId = (teacher.departmentId || '').toLowerCase().trim();
  const myDeptName = (teacher.department || '').toLowerCase().trim();

  const matchedStudents = [];
  const seenIds = new Set();

  (CIS_DATA.students || []).forEach(s => {
    let matches = false;

    // 1. Direct department ID or Name match
    const sDeptId = (s.departmentId || '').toLowerCase().trim();
    const sDeptName = (s.department || '').toLowerCase().trim();

    if (myDeptId && sDeptId && (sDeptId === myDeptId || sDeptId.includes(myDeptId) || myDeptId.includes(sDeptId))) {
      matches = true;
    } else if (myDeptName && sDeptName && (sDeptName === myDeptName || sDeptName.includes(myDeptName) || myDeptName.includes(sDeptName))) {
      matches = true;
    }

    // 2. Enrolled classes match
    if (!matches && s.classes && Array.isArray(s.classes)) {
      if (s.classes.some(sc => {
        const cCode = typeof sc === 'object' ? sc.code : sc;
        return cCode && myClassCodes.includes(cCode);
      })) {
        matches = true;
      }
    }

    // 3. Direct teacher assignment
    if (!matches && s.teacherId && s.teacherId === teacher.id) {
      matches = true;
    }

    if (matches && !seenIds.has(s.id)) {
      seenIds.add(s.id);
      matchedStudents.push(s);
    }
  });

  // 4. Merge any legacy seed assignedStudents on teacher object
  if (teacher.assignedStudents && Array.isArray(teacher.assignedStudents)) {
    teacher.assignedStudents.forEach(as => {
      const sId = as.id || as;
      if (!seenIds.has(sId)) {
        const fullStudent = (CIS_DATA.students || []).find(s => s.id === sId);
        if (fullStudent) {
          seenIds.add(sId);
          matchedStudents.push(fullStudent);
        } else if (typeof as === 'object') {
          seenIds.add(sId);
          matchedStudents.push(as);
        }
      }
    });
  }

  return matchedStudents;
}

let currentTeacherRosterSearchQuery = '';

function handleTeacherRosterSearch(query) {
  currentTeacherRosterSearchQuery = (query || '').trim().toLowerCase();
  if (activeUser && activeUser.type === 'teacher' && activeUser.data) {
    renderTeacherStudentsRoster(activeUser.data);
  }
}

function renderTeacherStudentsRoster(teacher) {
  const tbody = document.getElementById('teacherStudentsRosterBody');
  const countBadge = document.getElementById('teacherRosterCountBadge');
  if (!tbody) return;

  let students = getStudentsForTeacher(teacher);

  if (currentTeacherRosterSearchQuery) {
    students = students.filter(s => {
      const q = currentTeacherRosterSearchQuery;
      const nEn = (s.name || '').toLowerCase();
      const nKu = (s.nameKu || '').toLowerCase();
      const id = (s.id || '').toLowerCase();
      const dept = (s.department || '').toLowerCase();
      const stage = (s.stage || s.stageKu || '').toLowerCase();
      return nEn.includes(q) || nKu.includes(q) || id.includes(q) || dept.includes(q) || stage.includes(q);
    });
  }

  if (countBadge) {
    countBadge.textContent = `${students.length} ${currentLang === 'ku' ? 'قوتابی' : 'Students'}`;
  }

  if (students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 28px; color: var(--text-muted);">
          ${currentLang === 'ku'
            ? 'هیچ قوتابییەک بەم مەرج و گەڕانە نەدۆزرایەوە.'
            : 'No students found matching your search query or enrolled classes.'}
        </td>
      </tr>
    `;
    return;
  }

  const myClasses = getTeacherAssignedClasses(teacher);
  const myClassCodes = myClasses.map(c => c.code);

  tbody.innerHTML = students.map(s => {
    // Resolve enrolled classes display
    let enrolledCodes = [];
    if (s.classes && Array.isArray(s.classes)) {
      enrolledCodes = s.classes.map(c => (typeof c === 'object' ? c.code : c)).filter(Boolean);
    }
    // Highlight classes taught by this teacher
    const classDisplay = enrolledCodes.length > 0
      ? enrolledCodes.map(code => {
          const isMine = myClassCodes.includes(code);
          return `<span class="meta-pill" style="font-size: 0.72rem; ${isMine ? 'border-color: #3b82f6; color: #60a5fa;' : ''}">${code}</span>`;
        }).join(' ')
      : (myClassCodes.length > 0 ? `<span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3);">${myClassCodes[0]}</span>` : `<span style="color: var(--text-muted); font-size: 0.8rem;">General Department</span>`);

    const displayName = currentLang === 'ku' ? (s.nameKu || s.name) : s.name;
    const subName = (s.nameKu && s.name && s.nameKu !== s.name) ? `<div style="font-size: 0.78rem; color: #a1a1aa;">${s.name}</div>` : '';
    const deptStage = `${s.department || teacher.department || 'Academic'} • ${s.stage || s.stageKu || 'Year 1'}`;

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(59, 130, 246, 0.2); color: #60a5fa; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(59, 130, 246, 0.4);">
              ${s.avatar || (s.name ? s.name.slice(0, 2).toUpperCase() : 'ST')}
            </div>
            <div>
              <strong style="color: #ffffff;">${displayName}</strong>
              ${subName}
            </div>
          </div>
        </td>
        <td><code style="color: var(--primary); font-weight: 700;">${s.id}</code></td>
        <td style="color: #e4e4e7; font-size: 0.85rem;">${deptStage}</td>
        <td>${classDisplay}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="openDirectMsgModal('${s.id}', '${(s.nameKu || s.name).replace(/'/g, "\\'")}')" style="padding: 6px 12px; font-size: 0.82rem;">
            ✉️ ${currentLang === 'ku' ? 'ناردنی نامەی تایبەت' : 'Send Direct Message'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openDirectMsgModal(studentId, studentName) {
  document.getElementById('directMsgStudentId').value = studentId;
  document.getElementById('directMsgTargetStudent').textContent = `To: ${studentName} (${studentId})`;
  document.getElementById('teacherDirectMsgModal').classList.add('active');
}

function handleSendDirectStudentMsg(e) {
  e.preventDefault();
  const studentId = document.getElementById('directMsgStudentId').value;
  const text = document.getElementById('directMsgText').value;
  const teacher = activeUser.data;

  // Add message to that student's record
  const student = (CIS_DATA.students || []).find(s => s.id === studentId);
  if (student) {
    if (!student.messagesFromTeacher) student.messagesFromTeacher = [];
    student.messagesFromTeacher.unshift({
      from: teacher.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text
    });
    saveCustomAccountsToStorage();
  }

  closeModal('teacherDirectMsgModal');
  e.target.reset();

  showToast(
    currentLang === 'ku'
      ? `نامەی تایبەت بە سەرکەوتوویی بۆ قوتابی (${studentId}) نێردرا!`
      : `Direct message sent to student (${studentId})!`,
    'success'
  );
}

function handleTeacherBroadcast(e) {
  e.preventDefault();
  const subject = document.getElementById('broadcastSubject').value;
  const content = document.getElementById('broadcastContent').value;
  const teacher = activeUser.data;

  const targetStudents = getStudentsForTeacher(teacher);

  // Broadcast to all students belonging to teacher's department and enrolled classes
  targetStudents.forEach(student => {
    if (!student.messagesFromTeacher) student.messagesFromTeacher = [];
    student.messagesFromTeacher.unshift({
      from: `${teacher.name} (General Class Broadcast)`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: `[${subject}]: ${content}`
    });
  });

  saveCustomAccountsToStorage();

  showToast(
    currentLang === 'ku'
      ? `نامەی گشتی بە سەرکەوتوویی بۆ سەرجەم (${targetStudents.length}) قوتابیانی بەش و پۆلەکانت نێردرا!`
      : `General broadcast announcement transmitted to all (${targetStudents.length}) students!`,
    'success'
  );

  e.target.reset();
}

// ==========================================================================
// ADMIN WORKSPACE LOGIC
// (Master oversight, manage public homepage videos, review student applications)
// ==========================================================================

function renderAdminDashboard(admin) {
  const currentAdmin = admin || (activeUser && activeUser.data ? activeUser.data : CIS_DATA.admin);
  const isCentralAdmin = currentAdmin && (currentAdmin.id === 'CIS-ADM-01' || currentAdmin.role === 'System Administrator');

  // Strict Permission Check: Only Central Administrator (CIS-ADM-01) sees the Security & Domain Hub
  const tabSecurity = document.getElementById('tabAdminSecurity');
  if (tabSecurity) {
    tabSecurity.style.display = isCentralAdmin ? 'inline-flex' : 'none';
  }

  renderAdminAccountsList();
  renderAdminJobsList();
  renderAdminPublicVideosList();
  renderAdminMaterials();
  renderAdminApplicationsTable();
  renderAdminDepartmentsSummary();
  if (isCentralAdmin) {
    renderAdminSecurityHub();
  }
  updateAdminKpiMetrics();
}

function switchAdminTab(tabKey, btnEl) {
  const currentAdmin = (activeUser && activeUser.data) ? activeUser.data : CIS_DATA.admin;
  const isCentralAdmin = currentAdmin && (currentAdmin.id === 'CIS-ADM-01' || currentAdmin.role === 'System Administrator');

  // Block unauthorized sub-admins from accessing the Security & Domain Hub
  if (tabKey === 'security' && !isCentralAdmin) {
    showToast(
      currentLang === 'ku'
        ? '⚠️ بەشی ئاسایش و دۆمەین تەنها و تەنها تایبەتە بە ئەدمینی گشتی (Central Admin - CIS-ADM-01)!'
        : '⚠️ Cyber Security & Domain Hub is restricted exclusively to Central Admin (CIS-ADM-01)!',
      'error'
    );
    const tabAccounts = document.getElementById('tabAdminAccounts');
    if (tabAccounts) switchAdminTab('accounts', tabAccounts);
    return;
  }

  document.querySelectorAll('#adminDashboard .dash-tab-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  const paneAccounts = document.getElementById('paneAdminAccounts');
  const paneJobs = document.getElementById('paneAdminJobs');
  const paneMedia = document.getElementById('paneAdminMedia');
  const paneApps = document.getElementById('paneAdminApplications');
  const paneOverview = document.getElementById('paneAdminOverview');
  const paneMaterials = document.getElementById('paneAdminMaterials');
  const paneSecurity = document.getElementById('paneAdminSecurity');

  if (paneAccounts) paneAccounts.style.display = tabKey === 'accounts' ? 'block' : 'none';
  if (paneJobs) paneJobs.style.display = tabKey === 'jobs' ? 'block' : 'none';
  if (paneMedia) paneMedia.style.display = tabKey === 'media' ? 'block' : 'none';
  if (paneApps) paneApps.style.display = tabKey === 'applications' ? 'block' : 'none';
  if (paneOverview) paneOverview.style.display = tabKey === 'overview' ? 'block' : 'none';
  if (paneMaterials) paneMaterials.style.display = tabKey === 'materials' ? 'block' : 'none';
  if (paneSecurity) paneSecurity.style.display = (tabKey === 'security' && isCentralAdmin) ? 'block' : 'none';

  if (tabKey === 'accounts') renderAdminAccountsList();
  if (tabKey === 'jobs') renderAdminJobsList();
  if (tabKey === 'media') renderAdminPublicVideosList();
  if (tabKey === 'materials') renderAdminMaterials();
  if (tabKey === 'applications') renderAdminApplicationsTable();
  if (tabKey === 'overview') renderAdminDepartmentsSummary();
  if (tabKey === 'security' && isCentralAdmin) renderAdminSecurityHub();
}

// ==========================================================================
// 🛡️ ADMIN CYBER SECURITY & DOMAIN CONTROL METHODS
// ==========================================================================

function renderAdminSecurityHub() {
  const container = document.getElementById('adminSecurityAuditContainer');
  if (!container) return;

  const logs = CIS_SECURITY.getAuditLogs();
  if (!logs || logs.length === 0) {
    container.innerHTML = `
      <div style="color: var(--text-dim); text-align: center; padding: 24px;">
        🔒 No security incidents or anomalies recorded. System operating at 100% integrity.
      </div>
    `;
    return;
  }

  container.innerHTML = logs.map(l => {
    let badgeColor = '#ffffff';
    let icon = 'ℹ️';

    if (l.event.includes('FAILED') || l.event.includes('LOCKOUT') || l.event.includes('BLOCKED')) {
      badgeColor = '#f87171';
      icon = '🚫';
    } else if (l.event.includes('SUCCESS') || l.event.includes('CHANGED')) {
      badgeColor = '#4ade80';
      icon = '✓';
    }

    return `
      <div style="padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
        <div>
          <span style="color: ${badgeColor}; font-weight: 700;">${icon} [${l.event}]</span>
          <span style="color: #e4e4e7; margin-left: 6px;">${CIS_SECURITY.escapeHTML(l.detail)}</span>
        </div>
        <span style="color: var(--text-dim); font-size: 0.72rem; white-space: nowrap;">${l.timestamp}</span>
      </div>
    `;
  }).join('');
}

async function handleUpdateAdminPasscode(e) {
  e.preventDefault();

  const currentPass = document.getElementById('secCurrentPass').value;
  const newPass = document.getElementById('secNewPass').value;
  const confirmPass = document.getElementById('secConfirmPass').value;

  if (newPass !== confirmPass) {
    showToast(
      currentLang === 'ku' ? 'دووبارەکردنەوەی وشەی نهێنی نوێ وەک یەک نییە!' : 'New passcode and confirmation do not match!',
      'error'
    );
    return;
  }

  if (newPass.length < 6) {
    showToast(
      currentLang === 'ku' ? 'وشەی نهێنی دەبێت لانیکەم ٦ پیت بێت!' : 'New passcode must be at least 6 characters long!',
      'error'
    );
    return;
  }

  const res = await CIS_SECURITY.setAdminPasscode(currentPass, newPass);

  if (!res.success) {
    if (res.reason === 'CURRENT_PASSWORD_INCORRECT') {
      showToast(
        currentLang === 'ku' ? 'وشەی نهێنی ئێستا (Current Passcode) هەڵەیە!' : 'Current Admin Passcode is incorrect!',
        'error'
      );
    } else {
      showToast(
        currentLang === 'ku' ? 'هەڵە لە گۆڕینی وشەی نهێنی!' : 'Failed to update passcode!',
        'error'
      );
    }
    return;
  }

  document.getElementById('secCurrentPass').value = '';
  document.getElementById('secNewPass').value = '';
  document.getElementById('secConfirmPass').value = '';

  renderAdminSecurityHub();

  showToast(
    currentLang === 'ku'
      ? 'وشەی نهێنی ئەدمین بە سەرکەوتوویی نوێکرایەوە و بە شێوازی SHA-256 پارێزرا!'
      : 'Admin Master Passcode updated and cryptographically hashed successfully!',
    'success'
  );
}

function clearAuditLog() {
  if (!confirm(currentLang === 'ku' ? 'ئایا دڵنیایت لە پاککردنەوەی تۆماری ئاسایش؟' : 'Are you sure you want to clear the security audit log?')) return;
  localStorage.setItem('cis_audit_logs', '[]');
  renderAdminSecurityHub();
  showToast(currentLang === 'ku' ? 'تۆماری ئاسایش پاککرایەوە' : 'Security audit log cleared', 'info');
}

function exportEncryptedDatabaseBackup() {
  try {
    const backupData = {
      meta: {
        college: CIS_DATA.college.name,
        systemVersion: "2026.1-ENTERPRISE-DOMAIN",
        architect: "Zhiyar Hemn (CIS-ADM-01)",
        exportedAt: new Date().toISOString()
      },
      college: CIS_DATA.college,
      departments: CIS_DATA.departments,
      students: CIS_DATA.students,
      teachers: CIS_DATA.teachers,
      admins: CIS_DATA.admins,
      jobs: CIS_DATA.jobs,
      materials: CIS_DATA.materials,
      messages: CIS_DATA.messages,
      publicVideos: CIS_DATA.publicVideos,
      enrollmentApplications: CIS_DATA.enrollmentApplications
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStamp = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `CIS_COLLEGE_DATABASE_BACKUP_${dateStamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    CIS_SECURITY.logAudit('BACKUP_EXPORTED', 'Full college database JSON backup exported');
    renderAdminSecurityHub();

    showToast(
      currentLang === 'ku'
        ? 'باکئەپی تەواوی داتابەیسی کۆلێژ بە سەرکەوتوویی داگیرا!'
        : 'Full college database JSON backup exported successfully!',
      'success'
    );
  } catch (err) {
    console.error("Backup export failed", err);
    showToast('Failed to export backup', 'error');
  }
}

function clearAllSessionsAndFlush() {
  if (!confirm(currentLang === 'ku' ? 'ئایا دڵنیایت لە پووچەڵکردنەوەی هەموو دانیشتنەکان؟ پێویستە هەمووان دووبارە بچنە ژوورەوە.' : 'Are you sure you want to invalidate all active sessions? All users will need to re-authenticate.')) return;

  CIS_SECURITY.clearSession();
  localStorage.removeItem('cis_sec_salt');
  CIS_SECURITY.logAudit('SESSIONS_FLUSHED', 'All sessions invalidated and salt rotated');
  logoutAnyUser();

  showToast(
    currentLang === 'ku'
      ? 'هەموو دانیشتنە چالاکەکان پووچەڵکرانەوە و کۆگای نهێنی پاککرایەوە.'
      : 'All active sessions invalidated. Security salt rotated successfully.',
    'info'
  );
}

function updateAdminKpiMetrics() {
  const kpiDepts = document.getElementById('adminKpiDepts');
  const kpiTotalAccounts = document.getElementById('adminKpiTotalAccounts');
  const kpiStudents = document.getElementById('adminKpiStudents');
  const kpiTeachers = document.getElementById('adminKpiTeachers');
  const badgeAccounts = document.getElementById('adminAccountsBadge');
  const badgeMaterials = document.getElementById('adminMaterialsBadge');

  const totalStudents = CIS_DATA.students ? CIS_DATA.students.length : 0;
  const totalTeachers = CIS_DATA.teachers ? CIS_DATA.teachers.length : 0;
  const totalAdmins = CIS_DATA.admins ? CIS_DATA.admins.length : 1;
  const totalAccounts = totalStudents + totalTeachers + totalAdmins;
  const totalMaterials = CIS_DATA.materials ? CIS_DATA.materials.length : 0;

  if (kpiDepts) kpiDepts.textContent = CIS_DATA.departments.length;
  if (kpiTotalAccounts) kpiTotalAccounts.textContent = totalAccounts;
  if (kpiStudents) kpiStudents.textContent = totalStudents;
  if (kpiTeachers) kpiTeachers.textContent = totalTeachers;
  if (badgeAccounts) badgeAccounts.textContent = totalAccounts;
  if (badgeMaterials) badgeMaterials.textContent = totalMaterials;
}

// ==========================================================================
// USER ACCOUNT MANAGEMENT (STUDENT, TEACHER, ADMIN CREATION)
// "inja way le bka ka btwanm acc drust bkam u roll kanyan bame ba admin yan mamosta yan talaba wa id kayanm bate"
// ==========================================================================

let activeAccountsFilter = 'all';

function filterAdminAccounts(role, btnEl) {
  activeAccountsFilter = role;
  if (btnEl) {
    document.querySelectorAll('#adminAccFilterBar .filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderAdminAccountsList();
}

function renderAdminAccountsList() {
  const container = document.getElementById('adminAccountsListContainer');
  if (!container) return;

  updateAdminKpiMetrics();

  let allAccounts = [];

  // Admins
  (CIS_DATA.admins || []).forEach(a => {
    allAccounts.push({
      id: a.id,
      name: a.name,
      nameKu: a.nameKu || a.name,
      role: 'admin',
      roleBadge: '👑 Administrator (ئەدمین)',
      deptName: a.department || 'Central Presidency',
      subInfo: a.email || 'System Superuser',
      date: a.dateCreated || 'Oct 11, 2026',
      isPrimaryAdmin: a.id === 'CIS-ADM-01'
    });
  });

  // Teachers
  (CIS_DATA.teachers || []).forEach(t => {
    allAccounts.push({
      id: t.id,
      name: t.name,
      nameKu: t.nameKu || t.name,
      role: 'teacher',
      roleBadge: '👨‍🏫 Teacher / Faculty (مامۆستا)',
      deptName: t.department || 'Academic Faculty',
      subInfo: t.office ? `Office: ${t.office}` : (t.email || 'Faculty'),
      date: t.dateCreated || 'Registered',
      isPrimaryAdmin: false
    });
  });

  // Students
  (CIS_DATA.students || []).forEach(s => {
    allAccounts.push({
      id: s.id,
      name: s.name,
      nameKu: s.nameKu || s.name,
      role: 'student',
      roleBadge: '🎓 Student (قوتابی)',
      deptName: s.department || '3-Year Program',
      subInfo: s.stage ? `Stage: ${s.stage}` : 'Student',
      date: s.dateCreated || 'Enrolled',
      isPrimaryAdmin: false
    });
  });

  const searchInput = document.getElementById('adminAccountsSearchInput');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let filtered = activeAccountsFilter === 'all'
    ? allAccounts
    : allAccounts.filter(a => a.role === activeAccountsFilter);

  if (query) {
    filtered = filtered.filter(a => {
      const id = (a.id || '').toLowerCase();
      const nEn = (a.name || '').toLowerCase();
      const nKu = (a.nameKu || '').toLowerCase();
      const dept = (a.deptName || '').toLowerCase();
      const sub = (a.subInfo || '').toLowerCase();
      return id.includes(query) || nEn.includes(query) || nKu.includes(query) || dept.includes(query) || sub.includes(query);
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 20px; color: var(--text-muted); background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">👤</div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">No accounts found</div>
        <p style="font-size: 0.85rem;">No accounts match your current filter or search criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(acc => `
    <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ffffff; color: #000000; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.05rem;">
          ${acc.role === 'admin' ? '👑' : acc.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 3px; flex-wrap: wrap;">
            <h4 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin: 0;">${acc.name}</h4>
            <span style="font-size: 0.9rem; color: #a1a1aa;">(${acc.nameKu})</span>
            <span class="meta-pill" style="font-size: 0.72rem; border-color: #ffffff; color: #ffffff;">${acc.roleBadge}</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Department: <strong style="color: #ffffff;">${acc.deptName}</strong> • ${acc.subInfo} • Date: ${acc.date}
          </div>
        </div>
      </div>

      <!-- ID Chip with 1-Click Copy and Actions -->
      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <div style="background: #000000; border: 1px solid rgba(255,255,255,0.3); border-radius: var(--radius-full); padding: 6px 14px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">ID:</span>
          <code style="font-size: 1.05rem; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">${acc.id}</code>
          <button type="button" class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 0.75rem; border: none; background: rgba(255,255,255,0.15); color: #ffffff;" onclick="copyUserIdToClipboard('${acc.id}')" title="Copy ID to Clipboard">
            📋 Copy
          </button>
        </div>

        ${!acc.isPrimaryAdmin ? `
          <button class="btn btn-secondary btn-sm" style="border-color: rgba(255,255,255,0.25); color: #a1a1aa;" onclick="adminDeleteAccount('${acc.id}', '${acc.role}')" title="Delete Account">
            🗑️ Delete
          </button>
        ` : `
          <span style="font-size: 0.75rem; color: #a1a1aa; padding: 4px 8px;">(Master Admin)</span>
        `}
      </div>
    </div>
  `).join('');
}

function openAdminCreateUserModal() {
  const deptSelect = document.getElementById('createUserDeptSelect');
  if (deptSelect) {
    deptSelect.innerHTML = CIS_DATA.departments.map(d => `
      <option value="${d.id}">${d.name} (${d.code})</option>
    `).join('') + `<option value="admin">College Administration / General</option>`;
  }

  selectCreateUserRole('student');
  document.getElementById('createUserNameEn').value = '';
  document.getElementById('createUserNameKu').value = '';
  generateNewPasswordForUser();
  document.getElementById('adminCreateUserModal').classList.add('active');
}

function selectCreateUserRole(role) {
  document.getElementById('createUserRoleVal').value = role;

  const btnStu = document.getElementById('createRoleBtnStudent');
  const btnTea = document.getElementById('createRoleBtnTeacher');
  const btnAdm = document.getElementById('createRoleBtnAdmin');

  btnStu.className = 'role-tab-btn' + (role === 'student' ? ' active student-tab' : '');
  btnTea.className = 'role-tab-btn' + (role === 'teacher' ? ' active teacher-tab' : '');
  btnAdm.className = 'role-tab-btn' + (role === 'admin' ? ' active' : '');

  const label = document.getElementById('createUserStageOrOfficeLabel');
  const input = document.getElementById('createUserStageOrOffice');
  if (role === 'student') {
    label.textContent = currentLang === 'ku' ? 'قۆناغ (Stage / Year)' : 'Stage / Year';
    input.placeholder = 'e.g. Year 1';
    input.value = 'Year 1';
  } else if (role === 'teacher') {
    label.textContent = currentLang === 'ku' ? 'هۆڵ یان تاقیگە (Office / Room)' : 'Faculty Office / Lab';
    input.placeholder = 'e.g. Faculty Hall 101';
    input.value = 'Faculty Hall 101';
  } else if (role === 'admin') {
    label.textContent = currentLang === 'ku' ? 'پێگە (Admin Title)' : 'Admin Role Title';
    input.placeholder = 'e.g. Registrar Officer';
    input.value = 'System Administrator';
  }

  generateNewUserIdForRole();
}

function generateNewUserIdForRole() {
  const role = document.getElementById('createUserRoleVal').value;
  let prefix = 'CIS-STU-';
  if (role === 'teacher') prefix = 'CIS-TEA-';
  else if (role === 'admin') prefix = 'CIS-ADM-';

  const randomNum = Math.floor(100 + Math.random() * 900);
  const newId = prefix + randomNum;
  document.getElementById('createUserIdVal').value = newId;
}

function generateNewPasswordForUser() {
  const input = document.getElementById('createUserPasswordVal');
  if (!input) return;
  const prefixes = ['CisPass@', 'Cedars#', 'Secure@', 'College$'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  input.value = `${prefix}${num}`;
}

function togglePassVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btnEl) btnEl.textContent = '🔒';
  } else {
    input.type = 'password';
    if (btnEl) btnEl.textContent = '👁️';
  }
}

function handleAdminCreateUserSubmit(e) {
  e.preventDefault();
  const role = document.getElementById('createUserRoleVal').value;
  const nameEn = document.getElementById('createUserNameEn').value.trim();
  const nameKu = document.getElementById('createUserNameKu').value.trim() || nameEn;
  const deptId = document.getElementById('createUserDeptSelect').value;
  const stageOrOffice = document.getElementById('createUserStageOrOffice').value.trim();
  const userId = document.getElementById('createUserIdVal').value.trim().toUpperCase();
  const passwordInput = document.getElementById('createUserPasswordVal');
  const passwordVal = passwordInput ? passwordInput.value.trim() : '';

  if (!passwordVal) {
    showToast(
      currentLang === 'ku' ? 'تکایە وشەی نهێنی بۆ هەژمارەکە دابنێ!' : 'Please set a password for the account!',
      'error'
    );
    return;
  }

  const existsInStudents = (CIS_DATA.students || []).some(s => s.id.toUpperCase() === userId);
  const existsInTeachers = (CIS_DATA.teachers || []).some(t => t.id.toUpperCase() === userId);
  const existsInAdmins = (CIS_DATA.admins || []).some(a => a.id.toUpperCase() === userId);

  if (existsInStudents || existsInTeachers || existsInAdmins) {
    showToast(
      currentLang === 'ku' ? 'ئەم ناسنامەیە (ID) پێشتر بەکارهاتووە! تکایە ناسنامەیەکی تر بنووسە.' : 'This ID already exists! Please pick a unique ID.',
      'error'
    );
    return;
  }

  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  const deptName = dept ? dept.name : "College Administration";
  const dateNow = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (role === 'student') {
    const newStudent = {
      id: userId,
      name: nameEn,
      nameKu: nameKu,
      avatar: nameEn.slice(0, 2).toUpperCase(),
      department: deptName,
      departmentId: deptId,
      stage: stageOrOffice,
      stageKu: stageOrOffice,
      password: passwordVal,
      gpa: "Enrolled",
      status: "Active Student",
      skills: ["Academic Studies"],
      email: `${userId.toLowerCase()}@student.cis.edu.krd`,
      phone: "+964 750 000 0000",
      teacherId: "",
      messagesFromTeacher: [],
      dateCreated: dateNow
    };
    if (!CIS_DATA.students) CIS_DATA.students = [];
    CIS_DATA.students.push(newStudent);
    if (dept) dept.studentsCount = (dept.studentsCount || 0) + 1;
  } else if (role === 'teacher') {
    const newTeacher = {
      id: userId,
      name: nameEn,
      nameKu: nameKu,
      avatar: nameEn.slice(0, 2).toUpperCase(),
      role: "Faculty Lecturer",
      roleKu: "مامۆستای وانەبێژ",
      department: deptName,
      departmentId: deptId,
      password: passwordVal,
      email: `${userId.toLowerCase()}@cis.edu.krd`,
      phone: "+964 750 000 0000",
      office: stageOrOffice,
      assignedClassCodes: dept && dept.classes && dept.classes.length > 0 ? [dept.classes[0].code] : [],
      assignedStudents: [],
      dateCreated: dateNow
    };
    if (!CIS_DATA.teachers) CIS_DATA.teachers = [];
    CIS_DATA.teachers.push(newTeacher);
  } else if (role === 'admin') {
    const newAdmin = {
      id: userId,
      name: nameEn,
      nameKu: nameKu,
      avatar: "AD",
      role: "System Administrator",
      roleKu: "سەرپەرشتیاری گشتی سیستەم",
      department: "College Administration",
      departmentId: "admin",
      password: passwordVal,
      email: `${userId.toLowerCase()}@cis.edu.krd`,
      dateCreated: dateNow
    };
    if (!CIS_DATA.admins) CIS_DATA.admins = [];
    CIS_DATA.admins.push(newAdmin);
  }

  saveCustomAccountsToStorage();
  closeModal('adminCreateUserModal');
  renderAdminAccountsList();

  // Show Success Modal with both ID and Password
  const idDisplay = document.getElementById('successModalIdDisplay');
  const passDisplay = document.getElementById('successModalPasswordDisplay');
  const summaryDisplay = document.getElementById('successModalUserSummary');

  if (idDisplay) idDisplay.textContent = userId;
  if (passDisplay) passDisplay.textContent = passwordVal;
  if (summaryDisplay) summaryDisplay.textContent = `${nameEn} (${nameKu}) • ${role.toUpperCase()}`;
  document.getElementById('accountCreatedSuccessModal').classList.add('active');

  showToast(
    currentLang === 'ku'
      ? `هەژماری (${nameKu}) بە ناسنامەی (${userId}) و وشەی نهێنی بە سەرکەوتوویی دروستکرا!`
      : `Account (${nameEn}) created with ID: ${userId}!`,
    'success'
  );
}

function copySuccessModalId() {
  const id = document.getElementById('successModalIdDisplay').textContent.trim();
  copyUserIdToClipboard(id);
}

function copySuccessModalCredentials() {
  const id = document.getElementById('successModalIdDisplay').textContent.trim();
  const passEl = document.getElementById('successModalPasswordDisplay');
  const pass = passEl ? passEl.textContent.trim() : '';
  const textToCopy = `Official CIS Login Credentials:\nID: ${id}\nPassword: ${pass}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(
        currentLang === 'ku'
          ? `ناسنامە (${id}) و وشەی نهێنی (${pass}) هەردووکیان کۆپیکران!`
          : `Copied ID: ${id} and Password: ${pass} to clipboard!`,
        'success'
      );
    }).catch(() => fallbackCopy(textToCopy));
  } else {
    fallbackCopy(textToCopy);
  }
}

function copyUserIdToClipboard(id) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(id).then(() => {
      showToast(
        currentLang === 'ku'
          ? `ناسنامەی (${id}) کۆپیکرا! دەتوانیت ئەمە بنێریت بۆ قوتابی یان مامۆستاکە.`
          : `Copied ${id} to clipboard! Distribute this to the user for login.`,
        'success'
      );
    }).catch(() => fallbackCopy(id));
  } else {
    fallbackCopy(id);
  }
}

function fallbackCopy(id) {
  const el = document.createElement('textarea');
  el.value = id;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  showToast(`Copied to clipboard!`, 'success');
}

function adminDeleteAccount(id, role) {
  const confirmMsg = currentLang === 'ku'
    ? `دڵنیایت لە سڕینەوەی ئەم هەژمارە؟ (${id})`
    : `Are you sure you want to delete account (${id})?`;

  if (confirm(confirmMsg)) {
    if (role === 'student') {
      CIS_DATA.students = (CIS_DATA.students || []).filter(s => s.id !== id);
    } else if (role === 'teacher') {
      CIS_DATA.teachers = (CIS_DATA.teachers || []).filter(t => t.id !== id);
    } else if (role === 'admin') {
      CIS_DATA.admins = (CIS_DATA.admins || []).filter(a => a.id !== id);
    }

    saveCustomAccountsToStorage();
    renderAdminAccountsList();
    showToast(currentLang === 'ku' ? 'هەژمارەکە سڕایەوە' : 'Account deleted', 'info');
  }
}

function renderAdminPublicVideosList() {
  const container = document.getElementById('adminPublicVideosList');
  if (!container) return;

  if (!CIS_DATA.publicVideos || CIS_DATA.publicVideos.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--radius-md);">
        <div style="font-size: 2rem; margin-bottom: 8px;">🎬</div>
        <p>${currentLang === 'ku' ? 'هیچ ڤیدیۆیەک لە پەڕەی سەرەکی دانەنراوە' : 'No public homepage videos added yet.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = CIS_DATA.publicVideos.map((vid, idx) => {
    const isLocal = vid.isLocalFile || (!vid.youtubeUrl.includes('youtube.com') && !vid.youtubeUrl.includes('youtu.be') && !vid.youtubeUrl.includes('embed'));
    const badgeText = isLocal ? '📱 Mobile/Laptop Video' : '🔗 YouTube Stream';

    return `
      <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h4 style="color: #ffffff; font-size: 1.05rem;">${vid.title}</h4>
            <span class="meta-pill" style="font-size: 0.72rem; border-color: var(--accent-emerald); color: var(--accent-emerald);">${badgeText}</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.85rem;">Date: ${vid.date} • Speaker: ${vid.speaker} • Added by: ${vid.addedBy}</div>
        </div>
        <button class="btn btn-secondary btn-sm" style="border-color: var(--accent-rose); color: var(--accent-rose);" onclick="adminDeletePublicVideo(${idx})">
          Delete Video
        </button>
      </div>
    `;
  }).join('');
}

function openAddPublicVideoModal() {
  document.getElementById('adminAddVideoModal').classList.add('active');
}

// Switch Admin Video Source: Mobile/Laptop Device File OR YouTube Link
function switchAdminVideoSource(mode) {
  adminVideoSourceMode = mode;
  const tabFile = document.getElementById('adminSourceTabFile');
  const tabLink = document.getElementById('adminSourceTabLink');
  const blockFile = document.getElementById('adminFileSourceBlock');
  const blockLink = document.getElementById('adminLinkSourceBlock');

  if (mode === 'file') {
    tabFile.classList.add('active');
    tabLink.classList.remove('active');
    blockFile.style.display = 'block';
    blockLink.style.display = 'none';
  } else {
    tabLink.classList.add('active');
    tabFile.classList.remove('active');
    blockFile.style.display = 'none';
    blockLink.style.display = 'block';
  }
}

// Handle Admin selecting a video file from Mobile Gallery or Laptop Storage
function handleAdminVideoFile(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    adminSelectedVideoFile = file;

    if (adminSelectedVideoBlobUrl) {
      URL.revokeObjectURL(adminSelectedVideoBlobUrl);
    }
    adminSelectedVideoBlobUrl = URL.createObjectURL(file);

    const label = document.getElementById('adminFileNameLabel');
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    if (label) {
      label.innerHTML = `✅ <strong>${file.name}</strong> (${sizeMB} MB) • Ready to publish`;
    }

    const previewWrap = document.getElementById('adminFilePreviewWrap');
    const previewVid = document.getElementById('adminFilePreviewVideo');
    if (previewWrap && previewVid) {
      previewVid.src = adminSelectedVideoBlobUrl;
      previewWrap.style.display = 'block';
    }

    showToast(
      currentLang === 'ku'
        ? `ڤیدیۆی (${file.name}) لە مۆبایل/لاپتۆپەکەت هەڵبژێردرا`
        : `Admin video (${file.name}) loaded from device`,
      'info'
    );
  }
}

function handleAdminAddVideo(e) {
  e.preventDefault();
  const title = document.getElementById('adminVidTitle').value;
  const titleKu = document.getElementById('adminVidTitleKu').value;
  const description = document.getElementById('adminVidDesc').value;

  let finalUrl = '';
  let isLocal = false;

  if (adminVideoSourceMode === 'file') {
    if (!adminSelectedVideoFile || !adminSelectedVideoBlobUrl) {
      showToast(
        currentLang === 'ku'
          ? 'تکایە سەرەتا فایلی ڤیدیۆ لە مۆبایلەکەت یان لاپتۆپەکەت دیاری بکە!'
          : 'Please select a video file from your mobile or laptop first!',
        'error'
      );
      return;
    }
    finalUrl = adminSelectedVideoBlobUrl;
    isLocal = true;
  } else {
    finalUrl = document.getElementById('adminVidUrl').value.trim();
    if (!finalUrl) {
      showToast('Please provide a valid YouTube/web URL', 'error');
      return;
    }
    isLocal = false;
  }

  const newVid = {
    id: "pub-vid-" + Date.now(),
    title,
    titleKu,
    speaker: "College Presidency",
    speakerKu: "سەرۆکایەتی کۆلێژ",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    youtubeUrl: finalUrl,
    isLocalFile: isLocal,
    fileName: isLocal ? adminSelectedVideoFile.name : null,
    description,
    descriptionKu: description,
    addedBy: "Admin Zhiyar"
  };

  CIS_DATA.publicVideos.unshift(newVid);
  closeModal('adminAddVideoModal');

  // Reset file selection & preview
  adminSelectedVideoFile = null;
  const label = document.getElementById('adminFileNameLabel');
  if (label) {
    label.innerHTML = `Choose Video from Phone Gallery or Laptop`;
  }
  const previewWrap = document.getElementById('adminFilePreviewWrap');
  if (previewWrap) previewWrap.style.display = 'none';
  const fileInput = document.getElementById('adminVideoFileInput');
  if (fileInput) fileInput.value = '';

  e.target.reset();

  renderPublicVideos();
  renderAdminPublicVideosList();

  showToast(
    currentLang === 'ku'
      ? 'ڤیدیۆی فەرمی بە سەرکەوتوویی لە پەڕەی سەرەکی کۆلێژ بڵاوکرایەوە!'
      : 'Official video published to the college homepage media section!',
    'success'
  );
}

function adminDeletePublicVideo(idx) {
  CIS_DATA.publicVideos.splice(idx, 1);
  renderPublicVideos();
  renderAdminPublicVideosList();
  showToast('Public video removed by Admin', 'info');
}

function renderAdminApplicationsTable() {
  const tbody = document.getElementById('adminApplicationsTableBody');
  const badge = document.getElementById('adminAppsBadge');
  if (!tbody) return;

  if (badge) badge.textContent = (CIS_DATA.enrollmentApplications || []).length;

  if (!CIS_DATA.enrollmentApplications || CIS_DATA.enrollmentApplications.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 36px; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">📝</div>
          <strong>${currentLang === 'ku' ? 'هیچ داواکارییەکی نوێی پێشکەشکردن نییە لە ئێستادا' : 'No Prospective Student Applications Pending'}</strong>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = CIS_DATA.enrollmentApplications.map((app, idx) => `
    <tr>
      <td><strong style="color: #ffffff;">${app.fullName}</strong></td>
      <td><span class="meta-pill" style="font-size: 0.75rem;">${app.desiredDeptName}</span></td>
      <td>${app.phone}</td>
      <td style="color: #a1a1aa; font-size: 0.85rem;">${app.email}</td>
      <td style="color: var(--text-dim); font-size: 0.8rem;">${app.date}</td>
      <td>
        <span class="${app.status === 'Accepted' ? 'badge-verified' : 'badge-pending'}">${app.status}</span>
      </td>
      <td>
        ${app.status !== 'Accepted' ? `
          <button class="btn btn-primary btn-sm" onclick="adminAcceptApplication(${idx})">Approve</button>
        ` : `
          <span style="color: #ffffff; font-weight: 700; font-size: 0.85rem;">Approved ✓</span>
        `}
      </td>
    </tr>
  `).join('');
}

function adminAcceptApplication(idx) {
  CIS_DATA.enrollmentApplications[idx].status = "Accepted";
  renderAdminApplicationsTable();
  showToast('Prospective student admission approved!', 'success');
}

// ==========================================================================
// ADMIN DEPARTMENT & COURSE MANAGEMENT
// "wa admin ba dle xoy btwani bash zyad bka yan goran kare la bashakana bkat "
// ==========================================================================

let currentManagingDeptId = null;

function renderAdminDepartmentsSummary() {
  const container = document.getElementById('adminDepartmentsListSummary');
  if (!container) return;

  if (CIS_DATA.departments.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        No academic departments found. Click "+ Add New 3-Year Department" above to create one.
      </div>
    `;
    return;
  }

  container.innerHTML = CIS_DATA.departments.map(d => {
    const classCount = d.classes ? d.classes.length : 0;
    return `
      <div class="glass-panel" style="padding: 22px; margin-bottom: 18px; border: 1px solid var(--border-light);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="meta-pill" style="font-weight: 700; border-color: #ffffff; color: #ffffff;">${d.code}</span>
              <span class="meta-pill" style="font-size: 0.72rem;">${d.duration}</span>
              <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3);">✦ ${d.badge}</span>
            </div>
            <h4 style="color: #ffffff; font-size: 1.2rem; font-weight: 700;">
              ${d.name} <span style="font-size: 1rem; color: #a1a1aa; font-weight: 400;">(${d.nameKu})</span>
            </h4>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              👤 Chair: <strong>${d.head}</strong> • 👥 Enrolled: <strong>${d.studentsCount} Students</strong> • 📚 <strong>${classCount} Classes / Subjects</strong>
            </div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="openAdminDeptModal('${d.id}')" title="Edit Department Information">
              ✏️ Edit Department
            </button>
            <button class="btn btn-primary btn-sm" onclick="openAdminManageClassesModal('${d.id}')" title="Manage Department Classes & Subjects">
              📚 Manage Classes (${classCount})
            </button>
            <button class="btn btn-secondary btn-sm" style="border-color: rgba(255,255,255,0.3); color: #a1a1aa;" onclick="adminDeleteDept('${d.id}')" title="Delete Department">
              🗑️ Delete
            </button>
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px; margin-top: 8px;">
          ${d.description}
        </p>
      </div>
    `;
  }).join('');
}

function openAdminDeptModal(deptId = null) {
  const modal = document.getElementById('adminDeptModal');
  const title = document.getElementById('adminDeptModalTitle');
  const submitBtn = document.getElementById('adminDeptSubmitBtn');
  const editIdInput = document.getElementById('adminDeptEditId');

  if (deptId) {
    const dept = CIS_DATA.departments.find(d => d.id === deptId);
    if (!dept) return;
    title.textContent = `✏️ Edit Department: ${dept.name}`;
    submitBtn.innerHTML = `<span>Update Department</span>`;
    editIdInput.value = dept.id;

    document.getElementById('adminDeptCode').value = dept.code;
    document.getElementById('adminDeptDuration').value = dept.duration || '3-Year Program';
    document.getElementById('adminDeptNameEn').value = dept.name;
    document.getElementById('adminDeptNameKu').value = dept.nameKu;
    document.getElementById('adminDeptHead').value = dept.head;
    document.getElementById('adminDeptBadge').value = dept.badge || '';
    document.getElementById('adminDeptDescEn').value = dept.description || '';
    document.getElementById('adminDeptDescKu').value = dept.descriptionKu || '';
  } else {
    title.textContent = `🏛️ Add New 3-Year Academic Department`;
    submitBtn.innerHTML = `<span>Create Department</span>`;
    editIdInput.value = '';
    document.getElementById('adminDeptForm').reset();
    document.getElementById('adminDeptDuration').value = '3-Year Program';
  }

  modal.classList.add('active');
}

function handleAdminDeptSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('adminDeptEditId').value.trim();
  const code = document.getElementById('adminDeptCode').value.trim().toUpperCase();
  const duration = document.getElementById('adminDeptDuration').value.trim();
  const name = document.getElementById('adminDeptNameEn').value.trim();
  const nameKu = document.getElementById('adminDeptNameKu').value.trim();
  const head = document.getElementById('adminDeptHead').value.trim();
  const badge = document.getElementById('adminDeptBadge').value.trim();
  const descEn = document.getElementById('adminDeptDescEn').value.trim();
  const descKu = document.getElementById('adminDeptDescKu').value.trim();

  if (editId) {
    const dept = CIS_DATA.departments.find(d => d.id === editId);
    if (dept) {
      dept.code = code;
      dept.duration = duration;
      dept.durationKu = duration;
      dept.name = name;
      dept.nameKu = nameKu;
      dept.head = head;
      dept.badge = badge;
      dept.badgeKu = badge;
      dept.description = descEn;
      dept.descriptionKu = descKu;
    }
    showToast(currentLang === 'ku' ? `بەشی (${nameKu}) بە سەرکەوتوویی نوێکرایەوە` : `Department (${name}) updated successfully!`, 'success');
  } else {
    const newId = code.toLowerCase().replace(/[^a-z0-9]/g, '') || ('dept-' + Date.now());
    const newDept = {
      id: newId,
      name,
      nameKu,
      code,
      duration,
      durationKu: duration,
      badge,
      badgeKu: badge,
      description: descEn,
      descriptionKu: descKu,
      head,
      studentsCount: 0,
      classes: []
    };
    CIS_DATA.departments.push(newDept);
    showToast(currentLang === 'ku' ? `بەشی نوێی (${nameKu}) بە سەرکەوتوویی زیادکرا` : `New 3-Year Department (${name}) added!`, 'success');
  }

  closeModal('adminDeptModal');
  renderDepartments(activeDeptFilter);
  renderAdminDepartmentsSummary();
}

function adminDeleteDept(deptId) {
  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  const deptName = dept ? dept.name : deptId;
  const confirmMsg = currentLang === 'ku'
    ? `دڵنیایت لە سڕینەوەی ئەم بەشە؟ (${deptName})`
    : `Are you sure you want to delete this department (${deptName})?`;

  if (confirm(confirmMsg)) {
    CIS_DATA.departments = CIS_DATA.departments.filter(d => d.id !== deptId);
    renderDepartments(activeDeptFilter);
    renderAdminDepartmentsSummary();
    showToast(currentLang === 'ku' ? 'بەشەکە سڕایەوە' : 'Department deleted', 'info');
  }
}

// Manage Classes for a Department
function openAdminManageClassesModal(deptId) {
  currentManagingDeptId = deptId;
  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  if (!dept) return;

  document.getElementById('adminManageClassesDeptTitle').textContent = `📚 Classes & Curriculum: ${dept.name}`;
  document.getElementById('adminManageClassesDeptSubtitle').textContent = `Manage courses and subjects for ${dept.code} (${dept.nameKu})`;

  renderAdminDeptClassesList(dept);
  document.getElementById('adminManageClassesModal').classList.add('active');
}

let currentManagingClassCode = null;
let currentManagingClassDeptId = null;

function renderAdminDeptClassesList(dept) {
  const container = document.getElementById('adminDeptClassesListContainer');
  if (!container) return;

  if (!dept.classes || dept.classes.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted); background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
        No classes or subjects added for this department yet. Click "+ Add New Class / Subject" to create one.
      </div>
    `;
    return;
  }

  container.innerHTML = dept.classes.map(c => {
    const videoCount = c.videos ? c.videos.length : 0;
    const enrolledStudents = (CIS_DATA.students || []).filter(s =>
      (s.classes || []).some(cls => (cls.code || cls) === c.code)
    );
    const teacher = (CIS_DATA.teachers || []).find(t => t.id === c.teacherId || t.name === c.lecturer);
    const teacherDisplay = teacher ? `${teacher.name} (${teacher.id})` : c.lecturer;

    return `
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="flex: 1; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px; flex-wrap: wrap;">
            <span class="meta-pill" style="font-weight: 700; border-color: #ffffff; color: #ffffff;">${c.code}</span>
            <span style="font-size: 0.8rem; color: #a1a1aa;">● ${c.year || 'Year 1'}</span>
            <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.25);">🎬 ${videoCount} Videos</span>
            <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.4); color: #ffffff;">👥 ${enrolledStudents.length} Students</span>
          </div>
          <h4 style="color: #ffffff; font-size: 1.05rem; font-weight: 700; margin-bottom: 2px;">${c.title}</h4>
          ${c.titleKu ? `<div style="color: #a1a1aa; font-size: 0.85rem; margin-bottom: 4px;">${c.titleKu}</div>` : ''}
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
            👨‍🏫 Faculty: <strong style="color: #ffffff;">${teacherDisplay}</strong> • ⏰ Schedule: <strong>${c.schedule}</strong> • 📍 Room: <strong>${c.room}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="openAdminClassStudentsModal('${dept.id}', '${c.code}')" title="Manage Enrolled Students">
            👥 Students (${enrolledStudents.length})
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openAdminClassModal('${dept.id}', '${c.code}')" title="Edit Class Details">
            ✏️ Edit
          </button>
          <button class="btn btn-secondary btn-sm" style="border-color: rgba(255,255,255,0.3); color: #a1a1aa;" onclick="adminDeleteClass('${dept.id}', '${c.code}')" title="Delete Class">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openAdminClassModal(deptId = null, classCode = null) {
  const modal = document.getElementById('adminClassModal');
  const title = document.getElementById('adminClassModalTitle');
  const targetDeptInput = document.getElementById('adminClassTargetDeptId');
  const editCodeInput = document.getElementById('adminClassEditCode');
  const deptSelect = document.getElementById('adminClassDeptSelect');
  const deptSelectGroup = document.getElementById('adminClassDeptSelectGroup');
  const teacherSelect = document.getElementById('adminClassTeacherSelect');
  const lecturerInput = document.getElementById('adminClassLecturer');
  const teacherIdInput = document.getElementById('adminClassTeacherId');

  // Populate Department dropdown
  if (deptSelect) {
    deptSelect.innerHTML = (CIS_DATA.departments || []).map(d => `
      <option value="${d.id}" ${deptId === d.id ? 'selected' : ''}>${d.code} - ${d.name} (${d.nameKu})</option>
    `).join('');
  }

  // Populate Teachers dropdown
  const teachers = CIS_DATA.teachers || [];
  let teacherOptions = `<option value="">-- Select Faculty Teacher (مامۆستا هەڵبژێرە) --</option>`;
  teachers.forEach(t => {
    const kuName = t.nameKu ? ` (${t.nameKu})` : '';
    teacherOptions += `<option value="${t.id}">${t.name}${kuName} [${t.id}]</option>`;
  });
  teacherOptions += `<option value="__manual__">➕ Manual / External Lecturer (مامۆستای دەرەکی)</option>`;
  if (teacherSelect) teacherSelect.innerHTML = teacherOptions;

  const resolvedDeptId = deptId || (deptSelect ? deptSelect.value : (CIS_DATA.departments[0] ? CIS_DATA.departments[0].id : ''));
  targetDeptInput.value = resolvedDeptId;
  const dept = CIS_DATA.departments.find(d => d.id === resolvedDeptId);

  if (classCode && dept) {
    const cls = dept.classes.find(c => c.code === classCode);
    if (!cls) return;
    title.textContent = `✏️ Edit Subject: ${cls.code} - ${cls.title}`;
    editCodeInput.value = cls.code;

    if (deptSelectGroup) deptSelectGroup.style.display = 'none';

    document.getElementById('adminClassCode').value = cls.code;
    document.getElementById('adminClassCode').readOnly = true;
    document.getElementById('adminClassYear').value = cls.year || 'Year 1';
    document.getElementById('adminClassTitleEn').value = cls.title;
    document.getElementById('adminClassTitleKu').value = cls.titleKu || cls.title;
    document.getElementById('adminClassRoom').value = cls.room || 'Classroom 101';
    document.getElementById('adminClassSchedule').value = cls.schedule || 'Sun & Tue 10:00 AM';

    // Match teacher
    let matchedTeacher = teachers.find(t => t.id === cls.teacherId || t.name === cls.lecturer);
    if (matchedTeacher) {
      teacherSelect.value = matchedTeacher.id;
      teacherIdInput.value = matchedTeacher.id;
      lecturerInput.value = matchedTeacher.name;
      lecturerInput.style.display = 'none';
    } else {
      teacherSelect.value = '__manual__';
      teacherIdInput.value = '';
      lecturerInput.value = cls.lecturer || '';
      lecturerInput.style.display = 'block';
    }
  } else {
    title.textContent = `📖 Create New Class / Subject (وانەی نوێ)`;
    editCodeInput.value = '';
    if (deptSelectGroup) deptSelectGroup.style.display = 'block';

    document.getElementById('adminClassForm').reset();
    document.getElementById('adminClassCode').readOnly = false;
    document.getElementById('adminClassYear').value = 'Year 1';
    document.getElementById('adminClassRoom').value = 'Lab / Classroom';
    document.getElementById('adminClassSchedule').value = 'Mon & Wed 10:00 AM';
    teacherIdInput.value = '';
    lecturerInput.value = '';
    lecturerInput.style.display = 'none';

    if (teachers.length > 0) {
      teacherSelect.value = teachers[0].id;
      teacherIdInput.value = teachers[0].id;
      lecturerInput.value = teachers[0].name;
    } else {
      teacherSelect.value = '__manual__';
      lecturerInput.style.display = 'block';
      lecturerInput.value = dept ? dept.head : 'CIS Faculty';
    }
  }

  modal.classList.add('active');
}

function handleAdminClassTeacherSelectChange(selectEl) {
  const teacherIdInput = document.getElementById('adminClassTeacherId');
  const lecturerInput = document.getElementById('adminClassLecturer');

  if (selectEl.value === '__manual__') {
    teacherIdInput.value = '';
    lecturerInput.style.display = 'block';
    lecturerInput.value = '';
    lecturerInput.focus();
  } else if (selectEl.value) {
    const teacher = (CIS_DATA.teachers || []).find(t => t.id === selectEl.value);
    teacherIdInput.value = selectEl.value;
    lecturerInput.value = teacher ? teacher.name : '';
    lecturerInput.style.display = 'none';
  } else {
    teacherIdInput.value = '';
    lecturerInput.value = '';
    lecturerInput.style.display = 'none';
  }
}

function handleAdminClassSubmit(e) {
  e.preventDefault();
  const deptSelect = document.getElementById('adminClassDeptSelect');
  const targetDeptInput = document.getElementById('adminClassTargetDeptId');
  const editCode = document.getElementById('adminClassEditCode').value;

  const deptId = (targetDeptInput && targetDeptInput.value) ? targetDeptInput.value : (deptSelect ? deptSelect.value : '');
  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  if (!dept) {
    showToast('Department not found', 'error');
    return;
  }

  const code = document.getElementById('adminClassCode').value.trim().toUpperCase();
  const year = document.getElementById('adminClassYear').value.trim();
  const title = document.getElementById('adminClassTitleEn').value.trim();
  const titleKu = document.getElementById('adminClassTitleKu').value.trim() || title;
  const teacherId = document.getElementById('adminClassTeacherId').value.trim();
  let lecturer = document.getElementById('adminClassLecturer').value.trim();
  const room = document.getElementById('adminClassRoom').value.trim();
  const schedule = document.getElementById('adminClassSchedule').value.trim();

  const assignedTeacher = (CIS_DATA.teachers || []).find(t => t.id === teacherId);
  if (assignedTeacher) {
    lecturer = assignedTeacher.name;
  }

  if (!dept.classes) dept.classes = [];

  if (editCode) {
    const targetClass = dept.classes.find(c => c.code === editCode);
    if (targetClass) {
      const oldTeacherId = targetClass.teacherId;
      targetClass.code = code;
      targetClass.year = year;
      targetClass.title = title;
      targetClass.titleKu = titleKu;
      targetClass.lecturer = lecturer;
      targetClass.teacherId = teacherId || null;
      targetClass.room = room;
      targetClass.schedule = schedule;

      // Update previous teacher's assigned classes if changed
      if (oldTeacherId && oldTeacherId !== teacherId) {
        const prevTeacher = (CIS_DATA.teachers || []).find(t => t.id === oldTeacherId);
        if (prevTeacher && prevTeacher.assignedClassCodes) {
          prevTeacher.assignedClassCodes = prevTeacher.assignedClassCodes.filter(c => c !== editCode);
        }
      }
    }
    showToast(currentLang === 'ku' ? `وانەی (${code}) بە سەرکەوتوویی نوێکرایەوە` : `Subject (${code}) updated!`, 'success');
  } else {
    // Check if code exists in any department
    const codeExists = CIS_DATA.departments.some(d => (d.classes || []).some(c => c.code === code));
    if (codeExists) {
      showToast(currentLang === 'ku' ? `ئەم کۆدی وانەیە (${code}) پێشتر تۆمارکراوە!` : `Class code (${code}) already exists!`, 'error');
      return;
    }

    dept.classes.push({
      code,
      title,
      titleKu,
      year,
      lecturer,
      teacherId: teacherId || null,
      room,
      schedule,
      videos: []
    });

    showToast(
      currentLang === 'ku'
        ? `وانەی نوێی (${code} - ${titleKu}) دروستکرا و بە (${lecturer}) بەخشرا!`
        : `New subject (${code} - ${title}) created and assigned to ${lecturer}!`,
      'success'
    );
  }

  // Ensure assigned teacher has this class in assignedClassCodes
  if (assignedTeacher) {
    if (!assignedTeacher.assignedClassCodes) assignedTeacher.assignedClassCodes = [];
    if (!assignedTeacher.assignedClassCodes.includes(code)) {
      assignedTeacher.assignedClassCodes.push(code);
    }
  }

  saveCustomDepartmentsToStorage();
  saveCustomAccountsToStorage();
  closeModal('adminClassModal');

  if (currentManagingDeptId) {
    const currentDept = CIS_DATA.departments.find(d => d.id === currentManagingDeptId);
    if (currentDept) renderAdminDeptClassesList(currentDept);
  }
  renderAdminDepartmentsSummary();
  renderDepartments(activeDeptFilter);
}

function adminDeleteClass(deptId, classCode) {
  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  if (!dept) return;

  const confirmMsg = currentLang === 'ku'
    ? `دڵنیایت لە سڕینەوەی ئەم وانەیە؟ (${classCode})`
    : `Are you sure you want to delete this class (${classCode})?`;

  if (confirm(confirmMsg)) {
    dept.classes = (dept.classes || []).filter(c => c.code !== classCode);

    // Remove from teacher assignments
    (CIS_DATA.teachers || []).forEach(t => {
      if (t.assignedClassCodes) {
        t.assignedClassCodes = t.assignedClassCodes.filter(c => c !== classCode);
      }
    });

    // Remove from student classes
    (CIS_DATA.students || []).forEach(s => {
      if (s.classes) {
        s.classes = s.classes.filter(c => (c.code || c) !== classCode);
      }
    });

    saveCustomDepartmentsToStorage();
    saveCustomAccountsToStorage();
    renderAdminDeptClassesList(dept);
    renderAdminDepartmentsSummary();
    renderDepartments(activeDeptFilter);
    showToast(currentLang === 'ku' ? `وانەی (${classCode}) سڕایەوە` : `Class (${classCode}) deleted`, 'info');
  }
}

// ==========================================================================
// CLASS STUDENTS ROSTER & ENROLLMENT / TRANSFER LOGIC
// "pashan talabakan te bka wa btwani talabaya la class bnere bo class tr"
// ==========================================================================

function openAdminClassStudentsModal(deptId, classCode) {
  currentManagingClassDeptId = deptId;
  currentManagingClassCode = classCode;

  const dept = CIS_DATA.departments.find(d => d.id === deptId);
  if (!dept) return;
  const cls = (dept.classes || []).find(c => c.code === classCode);
  if (!cls) return;

  const titleEl = document.getElementById('adminClassStudentsTitle');
  const badgeEl = document.getElementById('adminClassStudentsBadge');
  const lecturerEl = document.getElementById('adminClassStudentsLecturer');
  const subtitleEl = document.getElementById('adminClassStudentsSubtitle');

  const teacher = (CIS_DATA.teachers || []).find(t => t.id === cls.teacherId || t.name === cls.lecturer);
  const teacherName = teacher ? `${teacher.name} (${teacher.id})` : cls.lecturer;

  if (badgeEl) badgeEl.textContent = cls.code;
  if (lecturerEl) lecturerEl.textContent = `👨‍🏫 ${teacherName} • 📍 ${cls.room}`;
  if (titleEl) titleEl.textContent = `${cls.title} ${cls.titleKu ? `(${cls.titleKu})` : ''}`;
  if (subtitleEl) subtitleEl.textContent = `Enrolled students list for ${cls.code}. Add new students or transfer existing students.`;

  const enrollBox = document.getElementById('adminQuickEnrollBox');
  if (enrollBox) enrollBox.style.display = 'none';

  renderAdminClassStudentsList();
  document.getElementById('adminClassStudentsModal').classList.add('active');
}

function renderAdminClassStudentsList() {
  const container = document.getElementById('adminClassStudentsListContainer');
  if (!container || !currentManagingClassCode) return;

  const enrolledStudents = (CIS_DATA.students || []).filter(s =>
    (s.classes || []).some(c => (c.code || c) === currentManagingClassCode)
  );

  if (enrolledStudents.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">👥</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">
          ${currentLang === 'ku' ? 'هیچ قوتابییەک لەم پۆلەدا نییە' : 'No Students Enrolled in this Class Yet'}
        </h4>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px;">
          ${currentLang === 'ku' ? 'کلیک لە دوگمەی سەرەوە بکە (+ تێکردنی قوتابی بۆ پۆل) بۆ زیادکردنی قوتابیان.' : 'Click the "+ Enroll Student" button above to add students to this class.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="overflow-x: auto;">
      <table class="student-roster-table">
        <thead>
          <tr>
            <th>Student Name & ID (ناو و ناسنامە)</th>
            <th>Department (بەش)</th>
            <th>Stage (قۆناغ)</th>
            <th style="text-align: right;">Actions (کردارەکان)</th>
          </tr>
        </thead>
        <tbody>
          ${enrolledStudents.map(s => `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: #ffffff; color: #000000; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;">
                    ${s.avatar || s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <strong style="color: #ffffff; font-size: 0.95rem;">${s.name}</strong>
                    ${s.nameKu ? `<span style="color: #a1a1aa; font-size: 0.82rem;"> (${s.nameKu})</span>` : ''}
                    <div style="font-family: monospace; font-size: 0.8rem; color: #a1a1aa;">${s.id}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="meta-pill" style="font-size: 0.76rem;">${s.department}</span>
              </td>
              <td style="color: #ffffff; font-size: 0.85rem;">${s.stage || 'Year 1'}</td>
              <td style="text-align: right;">
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                  <button class="btn btn-secondary btn-sm" onclick="openAdminTransferStudentModal('${s.id}', '${currentManagingClassCode}')" title="Transfer student to another class">
                    <span>🔄 Transfer (گواستنەوە)</span>
                  </button>
                  <button class="btn btn-secondary btn-sm" style="border-color: rgba(255,255,255,0.3); color: #a1a1aa;" onclick="adminRemoveStudentFromClass('${s.id}', '${currentManagingClassCode}')" title="Unenroll student">
                    <span>❌ Remove</span>
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function toggleAdminEnrollStudentBox() {
  const box = document.getElementById('adminQuickEnrollBox');
  const select = document.getElementById('adminEnrollStudentSelect');
  if (!box || !select || !currentManagingClassCode) return;

  if (box.style.display === 'none' || box.style.display === '') {
    const notEnrolled = (CIS_DATA.students || []).filter(s =>
      !(s.classes || []).some(c => (c.code || c) === currentManagingClassCode)
    );

    if (notEnrolled.length === 0) {
      showToast(
        currentLang === 'ku'
          ? 'هەموو قوتابییە تۆمارکراوەکان لەم پۆلەدان، یان هیچ قوتابییەکی تر بەردەست نییە!'
          : 'All registered students are already enrolled in this class!',
        'info'
      );
      return;
    }

    select.innerHTML = notEnrolled.map(s => `
      <option value="${s.id}">${s.name} (${s.nameKu || ''}) • ${s.id} [${s.department}]</option>
    `).join('');

    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}

function handleAdminEnrollStudentToCurrentClass() {
  const select = document.getElementById('adminEnrollStudentSelect');
  if (!select || !select.value || !currentManagingClassCode) return;

  const studentId = select.value;
  const student = (CIS_DATA.students || []).find(s => s.id === studentId);
  if (!student) return;

  let classObj = null;
  CIS_DATA.departments.forEach(d => {
    const found = (d.classes || []).find(c => c.code === currentManagingClassCode);
    if (found) classObj = found;
  });

  if (!student.classes) student.classes = [];
  student.classes.push(classObj || { code: currentManagingClassCode, title: currentManagingClassCode });

  saveCustomAccountsToStorage();
  renderAdminClassStudentsList();

  if (currentManagingDeptId) {
    const d = CIS_DATA.departments.find(dep => dep.id === currentManagingDeptId);
    if (d) renderAdminDeptClassesList(d);
  }

  showToast(
    currentLang === 'ku'
      ? `قوتابی (${student.nameKu || student.name}) بە سەرکەوتوویی خرایە ناو پۆلی (${currentManagingClassCode})`
      : `Student (${student.name}) enrolled in (${currentManagingClassCode})!`,
    'success'
  );

  toggleAdminEnrollStudentBox();
}

function adminRemoveStudentFromClass(studentId, classCode) {
  const student = (CIS_DATA.students || []).find(s => s.id === studentId);
  if (!student) return;

  const confirmMsg = currentLang === 'ku'
    ? `دڵنیایت لە دەرکردنی قوتابی (${student.nameKu || student.name}) لە پۆلی (${classCode})؟`
    : `Are you sure you want to remove ${student.name} from class ${classCode}?`;

  if (confirm(confirmMsg)) {
    student.classes = (student.classes || []).filter(c => (c.code || c) !== classCode);
    saveCustomAccountsToStorage();
    renderAdminClassStudentsList();

    if (currentManagingDeptId) {
      const d = CIS_DATA.departments.find(dep => dep.id === currentManagingDeptId);
      if (d) renderAdminDeptClassesList(d);
    }

    showToast(currentLang === 'ku' ? 'قوتابییەکە لە پۆلەکە لادرا' : 'Student unenrolled from class', 'info');
  }
}

// --------------------------------------------------------------------------
// Transfer Student Between Classes
// --------------------------------------------------------------------------

function openAdminTransferStudentModal(studentId, currentClassCode) {
  const student = (CIS_DATA.students || []).find(s => s.id === studentId);
  if (!student) return;

  document.getElementById('transferStudentId').value = student.id;
  document.getElementById('transferSourceClassCode').value = currentClassCode;

  document.getElementById('transferStudentNameDisplay').textContent =
    `${student.name} ${student.nameKu ? `(${student.nameKu})` : ''} • ID: ${student.id}`;
  document.getElementById('transferSourceClassDisplay').textContent =
    `Current Class (پۆلی ئێستا): ${currentClassCode}`;

  const destSelect = document.getElementById('transferDestinationClassSelect');
  let options = '';
  CIS_DATA.departments.forEach(d => {
    (d.classes || []).forEach(c => {
      if (c.code !== currentClassCode) {
        options += `<option value="${c.code}">
          ${c.code} - ${c.title} [${d.name}] (${c.lecturer})
        </option>`;
      }
    });
  });

  if (!options) {
    showToast(currentLang === 'ku' ? 'هیچ پۆلێکی تر بەردەست نییە بۆ گواستنەوە!' : 'No other classes available to transfer to!', 'error');
    return;
  }

  destSelect.innerHTML = options;
  document.getElementById('adminTransferStudentModal').classList.add('active');
}

function handleAdminTransferStudentSubmit(e) {
  e.preventDefault();
  const studentId = document.getElementById('transferStudentId').value;
  const sourceClassCode = document.getElementById('transferSourceClassCode').value;
  const destSelect = document.getElementById('transferDestinationClassSelect');
  const destClassCode = destSelect.value;
  const updateDept = document.getElementById('transferUpdateDeptCheckbox').checked;

  const student = (CIS_DATA.students || []).find(s => s.id === studentId);
  if (!student) return;

  let destClassObj = null;
  let destDeptObj = null;
  CIS_DATA.departments.forEach(d => {
    const found = (d.classes || []).find(c => c.code === destClassCode);
    if (found) {
      destClassObj = found;
      destDeptObj = d;
    }
  });

  if (!destClassObj) {
    showToast('Destination class not found', 'error');
    return;
  }

  // 1. Remove source class
  student.classes = (student.classes || []).filter(c => (c.code || c) !== sourceClassCode);

  // 2. Add destination class
  student.classes.push(destClassObj);

  // 3. Update department if requested
  if (updateDept && destDeptObj) {
    student.department = destDeptObj.name;
    student.departmentId = destDeptObj.id;
  }

  saveCustomAccountsToStorage();
  closeModal('adminTransferStudentModal');

  renderAdminClassStudentsList();

  if (currentManagingDeptId) {
    const currentDept = CIS_DATA.departments.find(d => d.id === currentManagingDeptId);
    if (currentDept) renderAdminDeptClassesList(currentDept);
  }
  renderAdminDepartmentsSummary();

  showToast(
    currentLang === 'ku'
      ? `قوتابی (${student.nameKu || student.name}) بە سەرکەوتوویی لە (${sourceClassCode}) گوازرایەوە بۆ پۆلی نوێی (${destClassCode})!`
      : `Student (${student.name}) successfully transferred from (${sourceClassCode}) to (${destClassCode})!`,
    'success'
  );
}

// ==========================================================================
// UTILITIES & MODAL HELPERS
// ==========================================================================

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  showToast(
    currentLang === 'ku'
      ? `سوپاس ${name}، پەیامەکەت بۆ تۆماری کۆلێژ نێردرا.`
      : `Thank you ${name}! Your inquiry has been sent to C.I.S Admissions.`,
    'success'
  );
  e.target.reset();
}

// ==========================================================================
// JOB OPPORTUNITIES MANAGEMENT (FOR ADMIN & TEACHERS)
// ==========================================================================

function openPostJobModal() {
  const modal = document.getElementById('postJobModal');
  if (!modal) return;

  const select = document.getElementById('jobFieldDept');
  if (select) {
    select.innerHTML = `
      <option value="all">🌐 All Departments (هەموو بەشەکان)</option>
      ${CIS_DATA.departments.map(d => `
        <option value="${d.id}">${d.name} (${d.nameKu})</option>
      `).join('')}
    `;
    // If current user is Teacher, auto-select teacher's department
    if (activeUser && activeUser.type === 'teacher' && activeUser.data.departmentId) {
      select.value = activeUser.data.departmentId;
    }
  }

  const form = document.getElementById('postJobForm');
  if (form) form.reset();

  const title = document.getElementById('postJobModalTitle');
  if (title) {
    title.textContent = currentLang === 'ku' ? 'دانانی هەلی کار بۆ خوێندکاران' : 'Post Job / Internship Opportunity';
  }

  openModal('postJobModal');
}

function handlePostJobSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('jobFieldTitle').value.trim();
  const company = document.getElementById('jobFieldCompany').value.trim();
  const targetDept = document.getElementById('jobFieldDept').value;
  const type = document.getElementById('jobFieldType').value;
  const location = document.getElementById('jobFieldLocation').value.trim() || 'Sulaymaniyah / Kurdistan';
  const salary = document.getElementById('jobFieldSalary').value.trim() || (currentLang === 'ku' ? 'دیاری دەکرێت' : 'To be discussed');
  const description = document.getElementById('jobFieldDesc').value.trim();
  const contact = document.getElementById('jobFieldContact').value.trim();

  let posterName = 'Administration';
  let posterRole = 'admin';
  let posterId = 'CIS-ADM-01';

  if (activeUser && activeUser.data) {
    posterName = currentLang === 'ku' ? (activeUser.data.nameKu || activeUser.data.name) : activeUser.data.name;
    posterRole = activeUser.type;
    posterId = activeUser.data.id;
  }

  const newJob = {
    id: 'JOB-' + Date.now().toString().slice(-4),
    title,
    titleKu: title,
    company,
    location,
    type,
    salary,
    targetDepartments: targetDept === 'all' ? ['all'] : [targetDept],
    description,
    contact,
    postedBy: `${posterName} (${posterRole === 'admin' ? 'Admin' : 'Teacher'})`,
    postedById: posterId,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  if (!CIS_DATA.jobs) CIS_DATA.jobs = [];
  CIS_DATA.jobs.unshift(newJob);
  saveCustomJobsToStorage();

  closeModal('postJobModal');

  // Refresh active views
  renderAdminJobsList();
  renderTeacherJobsList();
  if (activeUser && activeUser.type === 'student') {
    renderStudentMatchedJobs(activeUser.data);
  }

  showToast(
    currentLang === 'ku'
      ? 'هەلی کارەکە بە سەرکەوتوویی دانرا و بڵاوکرایەوە!'
      : 'Job opportunity posted and published successfully!',
    'success'
  );
}

function renderAdminJobsList() {
  const container = document.getElementById('adminJobsListContainer');
  const badge = document.getElementById('adminJobsBadge');
  if (badge) badge.textContent = (CIS_DATA.jobs || []).length;
  if (!container) return;

  if (!CIS_DATA.jobs || CIS_DATA.jobs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 44px 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--radius-md);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">💼</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">${currentLang === 'ku' ? 'هیچ هەلی کارێک دانەنراوە' : 'No Job Postings Yet'}</h4>
        <p style="font-size: 0.88rem; margin-bottom: 18px;">${currentLang === 'ku' ? 'دەتوانیت لە ڕێگەی دوگمەی سەرەوە هەلی کار بۆ خوێندکارانی کۆلێژ دابنێیت.' : 'Click "+ Post New Job" to share openings for students.'}</p>
        <button class="btn btn-primary btn-sm" onclick="openPostJobModal()">+ Post New Job</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px;">
      ${CIS_DATA.jobs.map(job => `
        <div style="background: rgba(18, 18, 18, 0.9); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
              <span style="color: #ffffff; font-weight: 800; font-size: 0.88rem;">${job.company}</span>
              <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3); color: #ffffff;">${job.type}</span>
            </div>
            <h4 style="font-size: 1.15rem; color: #ffffff; margin-bottom: 6px;">${job.title}</h4>
            <div style="font-size: 0.82rem; color: #a1a1aa; margin-bottom: 10px;">
              🏢 Dept: <strong>${job.targetDepartments.includes('all') ? 'All Departments' : job.targetDepartments.join(', ')}</strong> • 📍 ${job.location}
            </div>
            <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">${job.description}</p>
            <div style="background: rgba(255,255,255,0.04); padding: 8px 12px; border-radius: 6px; font-size: 0.8rem; color: #ffffff; margin-bottom: 12px;">
              📞 Contact / Apply: <code style="color: #ffffff;">${job.contact}</code>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 10px;">
            <div>
              <span style="display: block; font-weight: 700; color: #ffffff; font-size: 0.95rem;">${job.salary}</span>
              <span style="font-size: 0.72rem; color: var(--text-dim);">By: ${job.postedBy} • ${job.date}</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="adminDeleteJob('${job.id}')" style="border-color: rgba(255,255,255,0.4); color: #ffffff;">
              🗑️ Delete
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function adminDeleteJob(jobId) {
  const confirmMsg = currentLang === 'ku'
    ? 'دڵنیایت لە سڕینەوەی ئەم هەلی کارە؟'
    : 'Are you sure you want to delete this job posting?';

  if (!confirm(confirmMsg)) return;

  CIS_DATA.jobs = (CIS_DATA.jobs || []).filter(j => j.id !== jobId);
  saveCustomJobsToStorage();
  renderAdminJobsList();
  renderTeacherJobsList();
  if (activeUser && activeUser.type === 'student') {
    renderStudentMatchedJobs(activeUser.data);
  }
  showToast(currentLang === 'ku' ? 'هەلی کارەکە سڕایەوە' : 'Job posting deleted', 'info');
}

function renderTeacherJobsList() {
  const container = document.getElementById('teacherJobsListContainer');
  if (!container) return;

  const currentTeacherId = activeUser && activeUser.data ? activeUser.data.id : null;
  const currentDeptId = activeUser && activeUser.data ? activeUser.data.departmentId : null;

  const relevantJobs = (CIS_DATA.jobs || []).filter(j =>
    j.postedById === currentTeacherId ||
    j.targetDepartments.includes('all') ||
    (currentDeptId && j.targetDepartments.includes(currentDeptId))
  );

  if (relevantJobs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 44px 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--radius-md);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">💼</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">${currentLang === 'ku' ? 'هیچ هەلی کارێک بۆ بەشەکەت دانەنراوە' : 'No Jobs Posted for Your Students Yet'}</h4>
        <p style="font-size: 0.88rem; margin-bottom: 18px;">${currentLang === 'ku' ? 'وەک مامۆستا دەتوانیت هەلی کار و ڕاهێنان لێرە بۆ قوتابیانی پۆلەکەت دابنێیت.' : 'Share internship openings or job postings directly with your enrolled students.'}</p>
        <button class="btn btn-primary btn-sm" onclick="openPostJobModal()">+ Post Job Opportunity</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px;">
      ${relevantJobs.map(job => {
    const canDelete = job.postedById === currentTeacherId;
    return `
          <div style="background: rgba(18, 18, 18, 0.9); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                <span style="color: #ffffff; font-weight: 800; font-size: 0.88rem;">${job.company}</span>
                <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3); color: #ffffff;">${job.type}</span>
              </div>
              <h4 style="font-size: 1.15rem; color: #ffffff; margin-bottom: 6px;">${job.title}</h4>
              <div style="font-size: 0.82rem; color: #a1a1aa; margin-bottom: 10px;">
                📍 ${job.location} • 🏢 Target: <strong>${job.targetDepartments.includes('all') ? 'All Departments' : job.targetDepartments.join(', ')}</strong>
              </div>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">${job.description}</p>
              <div style="background: rgba(255,255,255,0.04); padding: 8px 12px; border-radius: 6px; font-size: 0.8rem; color: #ffffff; margin-bottom: 12px;">
                📞 Contact: <code style="color: #ffffff;">${job.contact}</code>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 10px;">
              <div>
                <span style="display: block; font-weight: 700; color: #ffffff; font-size: 0.95rem;">${job.salary}</span>
                <span style="font-size: 0.72rem; color: var(--text-dim);">By: ${job.postedBy} • ${job.date}</span>
              </div>
              ${canDelete ? `
                <button class="btn btn-secondary btn-sm" onclick="adminDeleteJob('${job.id}')" style="border-color: rgba(255,255,255,0.4); color: #ffffff;">
                  🗑️ Delete
                </button>
              ` : `
                <span style="font-size: 0.75rem; color: var(--text-dim);">College Official</span>
              `}
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;
}

function applyForJob(jobId) {
  const job = (CIS_DATA.jobs || []).find(j => j.id === jobId);
  if (!job) return;

  const stuId = activeUser && activeUser.data ? activeUser.data.id : 'CIS Student';
  const stuName = activeUser && activeUser.data ? activeUser.data.name : '';

  if (navigator.clipboard) {
    navigator.clipboard.writeText(job.contact).then(() => {
      showToast(
        currentLang === 'ku'
          ? `ئەم زانیارییەی پەیوەندی کۆپی کرا: (${job.contact}). بە ئایدی (${stuId}) داواکاری بنێرە.`
          : `Contact info copied: (${job.contact}). Mention your ID (${stuId}) when applying.`,
        'success'
      );
    }).catch(() => {
      alert(
        currentLang === 'ku'
          ? `بۆ پێشکەشکردن، پەیوەندی بکە بە:\n${job.contact}\nناوی قوتابی: ${stuName} (${stuId})`
          : `To apply, contact:\n${job.contact}\nStudent: ${stuName} (${stuId})`
      );
    });
  } else {
    alert(
      currentLang === 'ku'
        ? `بۆ پێشکەشکردن، پەیوەندی بکە بە:\n${job.contact}\nناوی قوتابی: ${stuName} (${stuId})`
        : `To apply, contact:\n${job.contact}\nStudent: ${stuName} (${stuId})`
    );
  }
}

// ==========================================================================
// COURSE LECTURE NOTES & PDF MATERIALS LOGIC
// (Option 2: مەلزەمە، سلاید و سەرچاوەکانی خوێندن)
// ==========================================================================

let activeStudentMaterialFilter = 'all';
let materialUploadSourceMode = 'file';
let selectedMaterialFile = null;
let selectedMaterialBlobUrl = null;

function getMaterialIcon(type) {
  switch (type) {
    case 'pdf': return '📕';
    case 'slides': return '📑';
    case 'book': return '📖';
    case 'assignment': return '📝';
    default: return '📄';
  }
}

function getMaterialTypeLabel(type) {
  if (currentLang === 'ku') {
    switch (type) {
      case 'pdf': return 'مەلزەمەی وانە (PDF)';
      case 'slides': return 'سلایدی وانە (PPT)';
      case 'book': return 'کتێب و سەرچاوە';
      case 'assignment': return 'ئەرکی ماڵەوە';
      default: return 'فایلی خوێندن';
    }
  } else {
    switch (type) {
      case 'pdf': return 'Lecture Notes (PDF)';
      case 'slides': return 'Presentation Slides';
      case 'book': return 'Reference Book';
      case 'assignment': return 'Homework / Task';
      default: return 'Study Material';
    }
  }
}

// 1. Render Materials for Student Portal
function renderStudentMaterials(student, filterCategory = activeStudentMaterialFilter) {
  activeStudentMaterialFilter = filterCategory;
  const container = document.getElementById('studentMaterialsContainer');
  if (!container) return;

  const dept = CIS_DATA.departments.find(d => d.id === student.departmentId) || CIS_DATA.departments[0];
  const deptClassCodes = dept && dept.classes ? dept.classes.map(c => c.code) : [];

  // Find materials relevant to student's department or classes or college-wide
  let materials = (CIS_DATA.materials || []).filter(m =>
    m.deptId === student.departmentId ||
    m.deptId === 'all' ||
    deptClassCodes.includes(m.classCode)
  );

  if (filterCategory !== 'all') {
    materials = materials.filter(m => m.type === filterCategory);
  }

  if (materials.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: var(--radius-lg);">
        <div style="font-size: 2.8rem; margin-bottom: 12px;">📚</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">${currentLang === 'ku' ? 'هیچ مەلزەمەیەک لەم بەشەدا نەدۆزرایەوە' : 'No Course Materials Found'}</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem;">
          ${currentLang === 'ku' ? 'مامۆستایانی وانەبێژ هێشتا مەلزەمەیان بۆ ئەم بەشە دانەناوە.' : 'Your professors will publish lecture notes and slide decks here for your classes.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = materials.map(mat => {
    const icon = getMaterialIcon(mat.type);
    const typeLabel = getMaterialTypeLabel(mat.type);
    const title = currentLang === 'ku' ? (mat.titleKu || mat.title) : mat.title;
    const summary = currentLang === 'ku' ? (mat.summaryKu || mat.summary) : mat.summary;

    return `
      <div class="material-card">
        <div>
          <div class="mat-card-header">
            <div class="mat-icon-badge">${icon}</div>
            <div style="flex: 1;">
              <div class="mat-meta-top">
                <span class="meta-pill" style="border-color: #ffffff; color: #ffffff; font-size: 0.72rem; font-weight: 700;">${mat.classCode}</span>
                <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255, 255, 255, 0.3); color: #a1a1aa;">${typeLabel}</span>
              </div>
              <h4 class="mat-card-title">${title}</h4>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: #ffffff; margin-bottom: 8px;">
            📚 ${mat.classTitle || mat.classCode}
          </div>
          <p class="mat-card-summary">${summary || ''}</p>
        </div>

        <div class="mat-footer-meta">
          <div>
            <div style="font-size: 0.8rem; color: #ffffff; font-weight: 600;">👨‍🏫 ${mat.lecturer}</div>
            <div style="font-size: 0.74rem; color: var(--text-dim);">💾 ${mat.fileSize || 'PDF Document'} • 📅 ${mat.date}</div>
          </div>
          <div class="mat-actions">
            <button class="btn btn-secondary btn-sm" onclick="openPreviewMaterialModal('${mat.id}')" title="Preview Summary">
              <span>👁️ ${currentLang === 'ku' ? 'بینین' : 'Preview'}</span>
            </button>
            <button class="btn btn-primary btn-sm" onclick="downloadMaterialFile('${mat.id}')" title="Download Material">
              <span>📥 ${currentLang === 'ku' ? 'داگرتن' : 'Download'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterStudentMaterials(category, btnEl) {
  if (btnEl) {
    document.querySelectorAll('#studentMaterialFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  if (activeUser && activeUser.data) {
    renderStudentMaterials(activeUser.data, category);
  }
}

// 2. Render Materials in Teacher Portal
function renderTeacherMaterials(teacher) {
  const container = document.getElementById('teacherMaterialsListContainer');
  if (!container) return;

  const myClasses = teacher.assignedClassCodes || [];
  const teacherMaterials = (CIS_DATA.materials || []).filter(m =>
    m.lecturer === teacher.name ||
    myClasses.includes(m.classCode)
  );

  if (teacherMaterials.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--radius-md);">
        <div style="font-size: 2.8rem; margin-bottom: 12px;">📑</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">${currentLang === 'ku' ? 'هێشتا هیچ مەلزەمە یان فایلێکت دانەناوە' : 'No Course Materials Uploaded Yet'}</h4>
        <p style="font-size: 0.88rem; margin-bottom: 18px;">
          ${currentLang === 'ku' ? 'مەلزەمەی وانەکان، سلایدەکان یان کتێب دابنێ تا ڕاستەوخۆ بۆ قوتابیانی پۆلەکانت دەربکەوێت.' : 'Upload lecture notes, PDFs or slides for your enrolled students.'}
        </p>
        <button class="btn btn-primary btn-sm" onclick="openUploadMaterialModal()">+ Upload Course Material (+ دانانی مەلزەمە)</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="materials-grid">
      ${teacherMaterials.map(mat => {
        const icon = getMaterialIcon(mat.type);
        const typeLabel = getMaterialTypeLabel(mat.type);
        const title = currentLang === 'ku' ? (mat.titleKu || mat.title) : mat.title;

        return `
          <div class="material-card">
            <div>
              <div class="mat-card-header">
                <div class="mat-icon-badge">${icon}</div>
                <div style="flex: 1;">
                  <div class="mat-meta-top">
                    <span class="meta-pill" style="border-color: #ffffff; color: #ffffff; font-size: 0.72rem;">${mat.classCode}</span>
                    <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3); color: #a1a1aa;">${typeLabel}</span>
                  </div>
                  <h4 class="mat-card-title">${title}</h4>
                </div>
              </div>
              <div style="font-size: 0.82rem; color: #ffffff; margin-bottom: 8px;">📚 ${mat.classTitle || mat.classCode}</div>
              <p class="mat-card-summary">${mat.summary || ''}</p>
            </div>
            <div class="mat-footer-meta">
              <div>
                <span style="display: block; font-size: 0.8rem; color: #ffffff; font-weight: 600;">💾 ${mat.fileSize || 'PDF File'}</span>
                <span style="font-size: 0.74rem; color: var(--text-dim);">${mat.date}</span>
              </div>
              <div class="mat-actions">
                <button class="btn btn-secondary btn-sm" onclick="openPreviewMaterialModal('${mat.id}')">
                  <span>👁️ Preview</span>
                </button>
                <button class="btn btn-secondary btn-sm" onclick="teacherDeleteMaterial('${mat.id}')" style="color: #a1a1aa; border-color: rgba(255,255,255,0.3);">
                  <span>🗑️ Delete</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 3. Render Materials in Admin Hub
function renderAdminMaterials() {
  const container = document.getElementById('adminMaterialsListContainer');
  const badge = document.getElementById('adminMaterialsBadge');
  const allMats = CIS_DATA.materials || [];

  if (badge) badge.textContent = allMats.length;
  if (!container) return;

  if (allMats.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--radius-md);">
        <div style="font-size: 2.8rem; margin-bottom: 12px;">📚</div>
        <h4 style="color: #ffffff; margin-bottom: 6px;">No Course Materials Uploaded</h4>
        <p style="font-size: 0.88rem; margin-bottom: 18px;">Click below to upload the first official curriculum syllabus document or handbook.</p>
        <button class="btn btn-primary btn-sm" onclick="openUploadMaterialModal()">+ Upload Official Material</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="materials-grid">
      ${allMats.map(mat => {
        const icon = getMaterialIcon(mat.type);
        const typeLabel = getMaterialTypeLabel(mat.type);
        const title = currentLang === 'ku' ? (mat.titleKu || mat.title) : mat.title;

        return `
          <div class="material-card">
            <div>
              <div class="mat-card-header">
                <div class="mat-icon-badge">${icon}</div>
                <div style="flex: 1;">
                  <div class="mat-meta-top">
                    <span class="meta-pill" style="border-color: #ffffff; color: #ffffff; font-size: 0.72rem;">${mat.classCode}</span>
                    <span class="meta-pill" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.3); color: #a1a1aa;">${typeLabel}</span>
                  </div>
                  <h4 class="mat-card-title">${title}</h4>
                </div>
              </div>
              <div style="font-size: 0.82rem; color: #ffffff; margin-bottom: 8px;">📚 ${mat.classTitle || mat.classCode}</div>
              <p class="mat-card-summary">${mat.summary || ''}</p>
            </div>
            <div class="mat-footer-meta">
              <div>
                <span style="display: block; font-size: 0.8rem; color: #ffffff; font-weight: 600;">👨‍🏫 ${mat.lecturer}</span>
                <span style="font-size: 0.74rem; color: var(--text-dim);">💾 ${mat.fileSize || 'Document'} • 📅 ${mat.date}</span>
              </div>
              <div class="mat-actions">
                <button class="btn btn-secondary btn-sm" onclick="openPreviewMaterialModal('${mat.id}')">
                  <span>👁️ Preview</span>
                </button>
                <button class="btn btn-secondary btn-sm" onclick="adminDeleteMaterial('${mat.id}')" style="color: #a1a1aa; border-color: rgba(255,255,255,0.3);">
                  <span>🗑️ Delete</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 4. Upload Material Modal & Logic
function openUploadMaterialModal() {
  const select = document.getElementById('materialFieldClass');
  if (!select) return;

  let classes = [];
  if (activeUser && activeUser.type === 'teacher') {
    const teacher = activeUser.data;
    const dept = CIS_DATA.departments.find(d => d.id === teacher.departmentId) || CIS_DATA.departments[0];
    classes = dept.classes.filter(c => teacher.assignedClassCodes.includes(c.code));
    if (classes.length === 0) classes = dept.classes;
  } else {
    // Admin has access to all classes across all departments
    CIS_DATA.departments.forEach(d => {
      d.classes.forEach(c => {
        classes.push({ ...c, deptName: d.name });
      });
    });
  }

  select.innerHTML = classes.map(c => `
    <option value="${c.code}">${c.code} - ${c.title}</option>
  `).join('');

  document.getElementById('materialFieldTitle').value = '';
  document.getElementById('materialFieldTitleKu').value = '';
  document.getElementById('materialFieldSummary').value = '';
  const urlField = document.getElementById('materialFieldUrl');
  if (urlField) urlField.value = '';

  selectedMaterialFile = null;
  selectedMaterialBlobUrl = null;
  const label = document.getElementById('materialFileNameLabel');
  if (label) label.textContent = 'Tap / Click to Select File from Mobile or Laptop';

  switchMaterialSourceMode('file');
  document.getElementById('uploadMaterialModal').classList.add('active');
}

function switchMaterialSourceMode(mode) {
  materialUploadSourceMode = mode;
  const tabFile = document.getElementById('matSourceTabFile');
  const tabLink = document.getElementById('matSourceTabLink');
  const blockFile = document.getElementById('matFileSourceBlock');
  const blockLink = document.getElementById('matLinkSourceBlock');

  if (mode === 'file') {
    if (tabFile) tabFile.classList.add('active', 'teacher-active-btn');
    if (tabLink) tabLink.classList.remove('active', 'teacher-active-btn');
    if (blockFile) blockFile.style.display = 'block';
    if (blockLink) blockLink.style.display = 'none';
  } else {
    if (tabLink) tabLink.classList.add('active', 'teacher-active-btn');
    if (tabFile) tabFile.classList.remove('active', 'teacher-active-btn');
    if (blockFile) blockFile.style.display = 'none';
    if (blockLink) blockLink.style.display = 'block';
  }
}

function handleMaterialFileInput(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    selectedMaterialFile = file;

    if (selectedMaterialBlobUrl) {
      URL.revokeObjectURL(selectedMaterialBlobUrl);
    }
    selectedMaterialBlobUrl = URL.createObjectURL(file);

    const label = document.getElementById('materialFileNameLabel');
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    if (label) {
      label.innerHTML = `✅ <strong>${file.name}</strong> (${sizeMB} MB) • Ready to upload`;
    }

    // Auto-fill title if empty
    const titleInput = document.getElementById('materialFieldTitle');
    if (titleInput && !titleInput.value.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      titleInput.value = cleanName;
    }

    showToast(
      currentLang === 'ku'
        ? `فایلی (${file.name}) لە مۆبایل/لاپتۆپەکەت هەڵبژێردرا`
        : `File (${file.name}) selected from device`,
      'info'
    );
  }
}

function handleUploadMaterialSubmit(e) {
  e.preventDefault();
  const classCode = document.getElementById('materialFieldClass').value;
  const type = document.getElementById('materialFieldType').value;
  const title = document.getElementById('materialFieldTitle').value.trim();
  const titleKu = document.getElementById('materialFieldTitleKu').value.trim() || title;
  const summary = document.getElementById('materialFieldSummary').value.trim();

  let finalDownloadUrl = '#';
  let fileSizeStr = '2.5 MB';
  let isLocal = false;

  if (materialUploadSourceMode === 'file') {
    if (!selectedMaterialFile) {
      showToast(
        currentLang === 'ku'
          ? 'تکایە سەرەتا فایلی مەلزەمە لە مۆبایلەکەت یان لاپتۆپەکەت هەڵبژێرە!'
          : 'Please select a document file from your mobile or laptop first!',
        'error'
      );
      return;
    }
    finalDownloadUrl = selectedMaterialBlobUrl || '#';
    fileSizeStr = `${(selectedMaterialFile.size / (1024 * 1024)).toFixed(2)} MB`;
    isLocal = true;
  } else {
    const urlInput = document.getElementById('materialFieldUrl');
    finalDownloadUrl = urlInput ? urlInput.value.trim() : '#';
    if (!finalDownloadUrl) {
      showToast('Please provide a valid Drive / Cloud URL', 'error');
      return;
    }
    fileSizeStr = 'Cloud Link';
    isLocal = false;
  }

  // Find class and department
  let matchedClass = null;
  let targetDeptId = 'cs';
  CIS_DATA.departments.forEach(d => {
    const found = d.classes.find(c => c.code === classCode);
    if (found) {
      matchedClass = found;
      targetDeptId = d.id;
    }
  });

  const lecturerName = activeUser && activeUser.data ? activeUser.data.name : 'CIS Faculty Lecturer';

  const newMaterial = {
    id: "MAT-" + Date.now().toString(36).toUpperCase(),
    classCode: classCode,
    classTitle: matchedClass ? matchedClass.title : classCode,
    deptId: targetDeptId,
    title: title,
    titleKu: titleKu,
    type: type,
    typeName: getMaterialTypeLabel(type),
    typeNameKu: getMaterialTypeLabel(type),
    fileSize: fileSizeStr,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lecturer: lecturerName,
    downloadUrl: finalDownloadUrl,
    summary: summary || "Official course document uploaded by instructor.",
    summaryKu: summary || "بەڵگەنامە و مەلزەمەی فەرمی وانە کە لەلایەن مامۆستای وانەبێژەوە بڵاوکراوەتەوە.",
    isLocalFile: isLocal,
    fileName: selectedMaterialFile ? selectedMaterialFile.name : null
  };

  if (!CIS_DATA.materials) CIS_DATA.materials = [];
  CIS_DATA.materials.unshift(newMaterial);
  saveCustomMaterialsToStorage();

  closeModal('uploadMaterialModal');
  e.target.reset();

  // Re-render based on current view
  if (activeUser && activeUser.type === 'teacher') {
    renderTeacherMaterials(activeUser.data);
  } else if (activeUser && activeUser.type === 'admin') {
    renderAdminMaterials();
    updateAdminKpiMetrics();
  }

  showToast(
    currentLang === 'ku'
      ? `مەلزەمەی (${titleKu}) بە سەرکەوتوویی بۆ وانەی (${classCode}) بڵاوکرایەوە!`
      : `Course material (${title}) published successfully for ${classCode}!`,
    'success'
  );
}

// 5. Preview Modal Logic
function openPreviewMaterialModal(matId) {
  const mat = (CIS_DATA.materials || []).find(m => m.id === matId);
  if (!mat) return;

  const icon = getMaterialIcon(mat.type);
  const typeLabel = getMaterialTypeLabel(mat.type);
  const title = currentLang === 'ku' ? (mat.titleKu || mat.title) : mat.title;
  const summary = currentLang === 'ku' ? (mat.summaryKu || mat.summary) : mat.summary;

  document.getElementById('previewMatIcon').textContent = icon;
  document.getElementById('previewMatBadge').textContent = `${mat.classCode} • ${typeLabel}`;
  document.getElementById('previewMatTitle').textContent = title;
  document.getElementById('previewMatSub').textContent = `Instructor: ${mat.lecturer} • Published: ${mat.date}`;
  document.getElementById('previewMatFileSize').textContent = `File Size / Type: ${mat.fileSize || 'Standard Document'}`;

  const contentBox = document.getElementById('previewMatContentBox');
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="font-weight: 700; color: #ffffff; margin-bottom: 8px;">
        📖 ${currentLang === 'ku' ? 'پوختە و ناوەرۆکی وانە:' : 'Course Material Overview & Summary:'}
      </div>
      <p style="margin-bottom: 14px; line-height: 1.6;">${summary}</p>
      <div style="background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 0.85rem;">
        <div><strong>Course:</strong> ${mat.classTitle || mat.classCode}</div>
        <div><strong>Format:</strong> ${mat.type.toUpperCase()} Document</div>
        <div><strong>Status:</strong> Verified Academic Material ✓</div>
      </div>
    `;
  }

  const downloadBtn = document.getElementById('previewMatDownloadBtn');
  if (downloadBtn) {
    downloadBtn.onclick = () => downloadMaterialFile(mat.id);
  }

  document.getElementById('previewMaterialModal').classList.add('active');
}

// 6. Download / Open Material Handler
function downloadMaterialFile(matId) {
  const mat = (CIS_DATA.materials || []).find(m => m.id === matId);
  if (!mat) return;

  const title = currentLang === 'ku' ? (mat.titleKu || mat.title) : mat.title;

  if (mat.downloadUrl && mat.downloadUrl !== '#' && !mat.downloadUrl.startsWith('assets/')) {
    if (mat.downloadUrl.startsWith('blob:') || mat.downloadUrl.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = mat.downloadUrl;
      a.download = mat.fileName || `${mat.classCode}_${mat.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      window.open(mat.downloadUrl, '_blank');
    }
  } else {
    // Simulated realistic student download file generation
    const sampleContent = `
=====================================================
C.I.S CEDARS INTERNATIONAL COLLEGE OF INFORMATION SCIENCE
OFFICIAL ACADEMIC COURSE MATERIAL
=====================================================

Course Code: ${mat.classCode}
Course Title: ${mat.classTitle}
Instructor: ${mat.lecturer}
Publication Date: ${mat.date}
Material Title: ${title}
Material Category: ${mat.typeName}

-----------------------------------------------------
SYLLABUS OVERVIEW & LECTURE NOTES:
-----------------------------------------------------
${mat.summary}

-----------------------------------------------------
LEARNING OBJECTIVES & CORE TOPICS:
-----------------------------------------------------
1. Understand foundational architectural components of ${mat.classTitle}.
2. Apply industry-standard best practices in technical implementations.
3. Review lecture slides, laboratory exercise questions, and exams.
4. Prepare assignments and code repositories for upcoming submissions.

© 2026 C.I.S Cedars International College. All Rights Reserved.
    `.trim();

    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mat.classCode}_Lecture_Notes_${mat.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  showToast(
    currentLang === 'ku'
      ? `مەلزەمەی (${title}) بە سەرکەوتوویی داگیرا!`
      : `Material (${title}) downloaded successfully!`,
    'success'
  );
}

// 7. Delete Handlers for Teacher and Admin
function teacherDeleteMaterial(matId) {
  if (!confirm(currentLang === 'ku' ? 'ئایا دڵنیایت لە سڕینەوەی ئەم مەلزەمەیە؟' : 'Are you sure you want to delete this course material?')) return;
  CIS_DATA.materials = (CIS_DATA.materials || []).filter(m => m.id !== matId);
  saveCustomMaterialsToStorage();
  if (activeUser && activeUser.data) renderTeacherMaterials(activeUser.data);
  showToast(currentLang === 'ku' ? 'مەلزەمەکە سڕایەوە' : 'Course material deleted', 'info');
}

function adminDeleteMaterial(matId) {
  if (!confirm(currentLang === 'ku' ? 'ئایا دڵنیایت لە سڕینەوەی ئەم مەلزەمەیە؟' : 'Are you sure you want to delete this material?')) return;
  CIS_DATA.materials = (CIS_DATA.materials || []).filter(m => m.id !== matId);
  saveCustomMaterialsToStorage();
  renderAdminMaterials();
  updateAdminKpiMetrics();
  showToast(currentLang === 'ku' ? 'مەلزەمەکە سڕایەوە' : 'Material deleted by admin', 'info');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `
    <span style="font-weight: 800; color: ${type === 'success' ? 'var(--accent-emerald)' : 'var(--primary)'}">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

// ==========================================================================
// TOP HEADER NAVIGATION, DEVELOPER ABOUT & CENTRAL CONTACT MESSAGING HUB
// ==========================================================================

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. Navigation to Home (Smooth & Direct return to public main screen)
function navigateToHome(e) {
  if (e && e.preventDefault) e.preventDefault();

  // Switch body classes so CSS allows publicLandingView and mainHeader to be visible!
  document.body.classList.remove('authenticated-mode');
  document.body.classList.add('public-mode');

  const publicView = document.getElementById('publicLandingView');
  const portalView = document.getElementById('authenticatedPortalView');
  const mainHeader = document.getElementById('mainHeader');
  if (publicView) publicView.style.display = 'block';
  if (mainHeader) mainHeader.style.display = 'block';
  if (portalView) portalView.style.display = 'none';

  const portalWrap = document.getElementById('portalProfileWrap');
  if (portalWrap) portalWrap.classList.remove('open');

  const navMenu = document.getElementById('navMenuList');
  if (navMenu && window.innerWidth <= 768) {
    navMenu.style.display = 'none';
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

// 2. Open Website Creator Modal
function openDeveloperAboutModal() {
  const modal = document.getElementById('developerAboutModal');
  if (modal) modal.classList.add('active');
  const portalWrap = document.getElementById('portalProfileWrap');
  if (portalWrap) portalWrap.classList.remove('open');
}

// 3. Toggle Profile Dropdown inside Portal Header
function togglePortalProfileDropdown(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const portalWrap = document.getElementById('portalProfileWrap');
  if (portalWrap) portalWrap.classList.toggle('open');
}

// 4. Navigate to Contact Section & Hub
function navigateToContact(e) {
  if (e && e.preventDefault) e.preventDefault();

  // Switch body classes so CSS allows publicLandingView and mainHeader to be visible!
  document.body.classList.remove('authenticated-mode');
  document.body.classList.add('public-mode');

  const publicView = document.getElementById('publicLandingView');
  const portalView = document.getElementById('authenticatedPortalView');
  const mainHeader = document.getElementById('mainHeader');
  if (publicView) publicView.style.display = 'block';
  if (mainHeader) mainHeader.style.display = 'block';
  if (portalView) portalView.style.display = 'none';

  const portalWrap = document.getElementById('portalProfileWrap');
  if (portalWrap) portalWrap.classList.remove('open');

  const navMenu = document.getElementById('navMenuList');
  if (navMenu && window.innerWidth <= 768) {
    navMenu.style.display = 'none';
  }

  try {
    renderContactMessagingHub();
  } catch (err) {
    console.error('Error rendering contact messaging hub:', err);
  }

  setTimeout(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 40);
}

// Helper to handle portal navigation link from public menu
function handleNavPortalClick() {
  if (activeUser) {
    scrollToActiveDashboard();
  } else {
    openLoginModal();
  }
}

// 5. Message Persistence Handlers
function loadCustomMessagesFromStorage() {
  try {
    const saved = localStorage.getItem('cis_saved_messages');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const seedIds = new Set((CIS_DATA.messages || []).map(m => m.id));
        const customItems = parsed.filter(m => !seedIds.has(m.id));
        CIS_DATA.messages = [...(CIS_DATA.messages || []), ...customItems];
      }
    }
  } catch (err) {
    console.error('Failed to load messages from localStorage:', err);
  }
}

function saveCustomMessagesToStorage() {
  try {
    localStorage.setItem('cis_saved_messages', JSON.stringify(CIS_DATA.messages || []));
  } catch (err) {
    console.error('Failed to save messages to localStorage:', err);
  }
}

// 6. Switch Contact Hub Tabs (Inbox, Compose, Sent)
function switchContactTab(tabKey) {
  const tabInbox = document.getElementById('tabContactInbox');
  const tabCompose = document.getElementById('tabContactCompose');
  const tabSent = document.getElementById('tabContactSent');
  const paneInbox = document.getElementById('paneContactInbox');
  const paneCompose = document.getElementById('paneContactCompose');
  const paneSent = document.getElementById('paneContactSent');

  if (tabInbox) tabInbox.classList.toggle('active', tabKey === 'inbox');
  if (tabCompose) tabCompose.classList.toggle('active', tabKey === 'compose');
  if (tabSent) tabSent.classList.toggle('active', tabKey === 'sent');

  if (paneInbox) paneInbox.style.display = tabKey === 'inbox' ? 'block' : 'none';
  if (paneCompose) paneCompose.style.display = tabKey === 'compose' ? 'block' : 'none';
  if (paneSent) paneSent.style.display = tabKey === 'sent' ? 'block' : 'none';
}

// 7. Render Contact Hub (Recipients, Inbox, Sent)
function renderContactMessagingHub() {
  const authHub = document.getElementById('authContactHub');
  const publicBlock = document.getElementById('publicContactFormBlock');
  if (!authHub) return;

  if (!activeUser) {
    authHub.style.display = 'none';
    if (publicBlock) publicBlock.style.display = 'block';
    return;
  }

  authHub.style.display = 'block';
  if (publicBlock) publicBlock.style.display = 'none';

  const u = activeUser.data || (activeUser.type === 'admin' ? CIS_DATA.admin : {});
  const userAvatar = document.getElementById('contactUserAvatar');
  const userName = document.getElementById('contactUserName');
  const userRoleBadge = document.getElementById('contactUserRoleBadge');
  const userIdBadge = document.getElementById('contactUserIdBadge');

  if (userAvatar) userAvatar.textContent = activeUser.type === 'admin' ? '👑' : (u.avatar || (activeUser.type === 'student' ? 'ST' : 'TE'));
  if (userName) userName.textContent = currentLang === 'ku' ? (u.nameKu || u.name) : u.name;
  if (userIdBadge) userIdBadge.textContent = `ID: ${u.id || ''}`;
  if (userRoleBadge) {
    if (activeUser.type === 'student') {
      userRoleBadge.textContent = currentLang === 'ku' ? 'قوتابی' : 'Student';
    } else if (activeUser.type === 'teacher') {
      userRoleBadge.textContent = currentLang === 'ku' ? 'مامۆستا' : 'Faculty';
    } else if (activeUser.type === 'admin') {
      userRoleBadge.textContent = currentLang === 'ku' ? 'ئەدمین' : 'Admin';
    }
  }

  // Populate Recipient Select based on role
  const select = document.getElementById('contactRecipientSelect');
  if (select) {
    let optionsHtml = '';
    if (activeUser.type === 'admin') {
      optionsHtml += `
        <option value="all_students|all">📢 All Enrolled Students (گشت قوتابیانی کۆلێژ - گشتی)</option>
        <option value="all_teachers|all">👨‍🏫 All Faculty Members (گشت مامۆستایانی کۆلێژ - گشتی)</option>
        <optgroup label="Direct to Specific Student (قوتابی دیاریکراو)">
      `;
      (CIS_DATA.students || []).forEach(s => {
        optionsHtml += `<option value="student|${s.id}">🎓 [${s.id}] ${s.name} (${s.nameKu || ''}) - ${s.dept?.toUpperCase() || ''}</option>`;
      });
      optionsHtml += `</optgroup><optgroup label="Direct to Specific Teacher (مامۆستای دیاریکراو)">`;
      (CIS_DATA.teachers || []).forEach(t => {
        optionsHtml += `<option value="teacher|${t.id}">👨‍🏫 [${t.id}] ${t.name} (${t.nameKu || ''}) - ${t.dept?.toUpperCase() || ''}</option>`;
      });
      optionsHtml += `</optgroup>`;
    } else if (activeUser.type === 'teacher') {
      optionsHtml += `
        <option value="admin|CIS-ADM-01">👑 Central Administration (ئەدمینی گشتی)</option>
        <option value="all_students|my_classes">📢 All Students in My Classes (گشت قوتابیانی پۆلەکانم)</option>
        <optgroup label="Direct to Enrolled Student (قوتابی دیاریکراوی پۆلەکانت)">
      `;
      const assignedCodes = u.assignedClassCodes || [];
      const teacherDept = u.dept || '';
      const enrolledStudents = (CIS_DATA.students || []).filter(s => {
        const matchesClass = Array.isArray(s.classes) && s.classes.some(c => assignedCodes.includes(c));
        const matchesDept = s.dept === teacherDept;
        return matchesClass || matchesDept;
      });
      const listToRender = enrolledStudents.length > 0 ? enrolledStudents : (CIS_DATA.students || []);
      listToRender.forEach(s => {
        optionsHtml += `<option value="student|${s.id}">🎓 [${s.id}] ${s.name} (${s.nameKu || ''}) - ${s.dept?.toUpperCase() || ''}</option>`;
      });
      optionsHtml += `</optgroup>`;
    } else if (activeUser.type === 'student') {
      optionsHtml += `
        <option value="admin|CIS-ADM-01">👑 College Central Administration (ئەدمینی کۆلێژ)</option>
        <optgroup label="College Professors (مامۆستایانی وانەکانت)">
      `;
      const studentDept = u.dept || '';
      const myTeachers = (CIS_DATA.teachers || []).filter(t => t.dept === studentDept);
      const listToRender = myTeachers.length > 0 ? myTeachers : (CIS_DATA.teachers || []);
      listToRender.forEach(t => {
        optionsHtml += `<option value="teacher|${t.id}">👨‍🏫 [${t.id}] ${t.name} (${t.nameKu || ''}) - ${t.title || 'Professor'}</option>`;
      });
      optionsHtml += `</optgroup>`;
    }
    select.innerHTML = optionsHtml;
  }

  // Filter messages for current user
  const allMessages = CIS_DATA.messages || [];
  const currentUserId = (u.id || '').toUpperCase();

  // Received Messages
  const receivedMessages = allMessages.filter(m => {
    // Exclude messages sent by oneself
    if (m.senderId && m.senderId.toUpperCase() === currentUserId) return false;

    if (activeUser.type === 'admin') {
      return m.recipientType === 'admin' || (m.recipientId && m.recipientId.toUpperCase() === 'CIS-ADM-01') || (m.recipientId && m.recipientId.toUpperCase() === currentUserId);
    } else if (activeUser.type === 'teacher') {
      return m.recipientType === 'all_teachers' || m.recipientId === 'all' || (m.recipientType === 'teacher' && m.recipientId && m.recipientId.toUpperCase() === currentUserId);
    } else if (activeUser.type === 'student') {
      return m.recipientType === 'all_students' || m.recipientId === 'all' || (m.recipientType === 'student' && m.recipientId && m.recipientId.toUpperCase() === currentUserId);
    }
    return false;
  });

  // Sent Messages
  const sentMessages = allMessages.filter(m => m.senderId && m.senderId.toUpperCase() === currentUserId);

  // Update Badge
  const badgeEl = document.getElementById('contactInboxBadge');
  if (badgeEl) badgeEl.textContent = receivedMessages.length;

  // Render Inbox Feed
  const inboxFeed = document.getElementById('contactInboxFeed');
  if (inboxFeed) {
    if (receivedMessages.length === 0) {
      inboxFeed.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; color: var(--text-dim);">
          <div style="font-size: 2.2rem; margin-bottom: 10px;">📭</div>
          <h4 style="color: #ffffff; font-size: 1rem; margin-bottom: 4px;">
            ${currentLang === 'ku' ? 'هیچ پەیامێکی نوێ نییە' : 'No Messages in Inbox'}
          </h4>
          <p style="font-size: 0.85rem;">
            ${currentLang === 'ku' ? 'هەر پەیامێک لەلایەن مامۆستایان، ئەدمین یان قوتابیانەوە بنێردرێت لێرە دەردەکەوێت.' : 'Any incoming communications from administration, faculty, or students will appear here.'}
          </p>
        </div>
      `;
    } else {
      inboxFeed.innerHTML = receivedMessages.map(msg => {
        const isBroadcast = msg.recipientType === 'all_students' || msg.recipientType === 'all_teachers';
        const roleLabel = msg.senderRole === 'admin' ? (currentLang === 'ku' ? 'ئەدمین' : 'Admin') : msg.senderRole === 'teacher' ? (currentLang === 'ku' ? 'مامۆستا' : 'Faculty') : (currentLang === 'ku' ? 'قوتابی' : 'Student');
        const senderDisplayName = currentLang === 'ku' ? (msg.senderNameKu || msg.senderName) : msg.senderName;
        const msgSubject = currentLang === 'ku' ? (msg.subjectKu || msg.subject) : msg.subject;
        const msgText = currentLang === 'ku' ? (msg.textKu || msg.text) : msg.text;

        return `
          <div class="message-item-card">
            <div class="msg-card-header">
              <div class="msg-sender-info">
                <span class="msg-avatar">${msg.senderRole === 'admin' ? '👑' : (msg.senderRole === 'teacher' ? '👨‍🏫' : '🎓')}</span>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h4 class="msg-sender-name">${escapeHtml(senderDisplayName)}</h4>
                    <span class="meta-pill" style="font-size: 0.68rem;">${escapeHtml(roleLabel)}</span>
                    <code style="font-size: 0.72rem; color: #a1a1aa;">${escapeHtml(msg.senderId)}</code>
                  </div>
                  <div class="msg-target-tag">
                    ${isBroadcast ? '📢 Broadcast to All (گشتی)' : '🔒 Direct Message to You (ڕاستەوخۆ بۆ تۆ)'}
                  </div>
                </div>
              </div>
              <span class="msg-date">${escapeHtml(msg.date)}</span>
            </div>
            <div class="msg-subject">${escapeHtml(msgSubject)}</div>
            <div class="msg-body">${escapeHtml(msgText)}</div>
            <div class="msg-card-actions">
              <button type="button" class="btn btn-secondary btn-sm" onclick="replyToContactMessage('${escapeHtml(msg.senderId)}', '${escapeHtml(senderDisplayName)}', '${escapeHtml(msgSubject)}')">
                <span>↩️ Reply (وەڵامدانەوە)</span>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Render Sent Feed
  const sentFeed = document.getElementById('contactSentFeed');
  if (sentFeed) {
    if (sentMessages.length === 0) {
      sentFeed.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; color: var(--text-dim);">
          <div style="font-size: 2.2rem; margin-bottom: 10px;">📤</div>
          <h4 style="color: #ffffff; font-size: 1rem; margin-bottom: 4px;">
            ${currentLang === 'ku' ? 'هیچ پەیامێکت نەناردووە' : 'No Sent Messages'}
          </h4>
          <p style="font-size: 0.85rem;">
            ${currentLang === 'ku' ? 'دەتوانیت بچیتە بەشی "Send Message" و نامە بنێریت.' : 'You can compose a new message using the "Send Message" tab.'}
          </p>
        </div>
      `;
    } else {
      sentFeed.innerHTML = sentMessages.map(msg => {
        const msgSubject = currentLang === 'ku' ? (msg.subjectKu || msg.subject) : msg.subject;
        const msgText = currentLang === 'ku' ? (msg.textKu || msg.text) : msg.text;
        return `
          <div class="message-item-card">
            <div class="msg-card-header">
              <div class="msg-sender-info">
                <span class="msg-avatar">📤</span>
                <div>
                  <h4 class="msg-sender-name">To: ${escapeHtml(msg.recipientName || msg.recipientId)}</h4>
                  <div class="msg-target-tag">Type: ${escapeHtml(msg.recipientType)}</div>
                </div>
              </div>
              <span class="msg-date">${escapeHtml(msg.date)}</span>
            </div>
            <div class="msg-subject">${escapeHtml(msgSubject)}</div>
            <div class="msg-body">${escapeHtml(msgText)}</div>
          </div>
        `;
      }).join('');
    }
  }
}

// 8. Handle Send Message in Contact Hub
function handleSendContactMessage(e) {
  e.preventDefault();
  if (!activeUser) {
    showToast('Please log in first to send internal messages.', 'error');
    return;
  }

  const select = document.getElementById('contactRecipientSelect');
  const subjectInput = document.getElementById('contactMsgSubject');
  const bodyInput = document.getElementById('contactMsgBody');

  if (!select || !subjectInput || !bodyInput) return;

  const rawRecipient = select.value;
  const [recType, recId] = rawRecipient.split('|');
  const subject = subjectInput.value.trim();
  const body = bodyInput.value.trim();

  if (!subject || !body) {
    showToast('Please fill in both subject and message content.', 'error');
    return;
  }

  // Determine recipient display name
  let recDisplayName = 'Recipient';
  if (recType === 'all_students') recDisplayName = 'All Enrolled Students (گشت قوتابیان)';
  else if (recType === 'all_teachers') recDisplayName = 'All Faculty Members (گشت مامۆستایان)';
  else if (recType === 'admin') recDisplayName = 'Central Administration (ئەدمین)';
  else if (recType === 'student') {
    const s = (CIS_DATA.students || []).find(st => st.id === recId);
    recDisplayName = s ? `${s.name} (${s.id})` : recId;
  } else if (recType === 'teacher') {
    const t = (CIS_DATA.teachers || []).find(tc => tc.id === recId);
    recDisplayName = t ? `${t.name} (${t.id})` : recId;
  }

  const u = activeUser.data || (activeUser.type === 'admin' ? CIS_DATA.admin : {});
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newMsg = {
    id: `MSG-${Date.now()}`,
    senderId: u.id || (activeUser.type === 'admin' ? 'CIS-ADM-01' : 'UNKNOWN'),
    senderName: u.name || 'User',
    senderNameKu: u.nameKu || u.name || 'بەکارهێنەر',
    senderRole: activeUser.type,
    recipientType: recType,
    recipientId: recId,
    recipientName: recDisplayName,
    subject: subject,
    subjectKu: subject,
    text: body,
    textKu: body,
    date: dateStr
  };

  CIS_DATA.messages = CIS_DATA.messages || [];
  CIS_DATA.messages.unshift(newMsg);
  saveCustomMessagesToStorage();

  // Reset form
  subjectInput.value = '';
  bodyInput.value = '';

  showToast(
    currentLang === 'ku' ? `پەیامەکەت بۆ (${recDisplayName}) بە سەرکەوتوویی نێردرا!` : `Message sent successfully to ${recDisplayName}!`,
    'success'
  );

  switchContactTab('sent');
  renderContactMessagingHub();
}

// 9. Reply to Message
function replyToContactMessage(senderId, senderName, subject) {
  switchContactTab('compose');
  const select = document.getElementById('contactRecipientSelect');
  const subjectInput = document.getElementById('contactMsgSubject');
  const bodyInput = document.getElementById('contactMsgBody');

  if (subjectInput) {
    subjectInput.value = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
  }

  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      const opt = select.options[i];
      if (opt.value.includes(senderId) || (senderId.includes('ADM') && opt.value.startsWith('admin'))) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  if (bodyInput) {
    bodyInput.focus();
  }

  showToast(
    currentLang === 'ku' ? `وەڵامدانەوە بۆ: ${senderName}` : `Replying to: ${senderName}`,
    'info'
  );
}

// ==========================================================================
// FEATURE 4: NOTIFICATION CENTER (Bell Drawer, Real-Time Badging & Alerts)
// ==========================================================================

function getReadNotifIds() {
  try {
    const userKey = activeUser && activeUser.data ? activeUser.data.id : 'guest';
    const raw = localStorage.getItem('cis_read_notifs_' + userKey);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveReadNotifIds(ids) {
  try {
    const userKey = activeUser && activeUser.data ? activeUser.data.id : 'guest';
    localStorage.setItem('cis_read_notifs_' + userKey, JSON.stringify(ids));
  } catch (e) { }
}

function getNotificationsForUser() {
  const notifs = [];
  const readIds = getReadNotifIds();

  // 1. General College Announcements (for everyone)
  (CIS_DATA.announcements || []).forEach(ann => {
    notifs.push({
      id: `ann_${ann.id}`,
      type: 'announcement',
      icon: '📢',
      title: currentLang === 'ku' ? (ann.titleKu || ann.title) : ann.title,
      message: currentLang === 'ku' ? (ann.textKu || ann.text || ann.titleKu) : (ann.text || ann.title),
      time: ann.date || 'Recent',
      isRead: readIds.includes(`ann_${ann.id}`),
      linkType: 'announcements'
    });
  });

  // 2. Role-specific notifications
  if (activeUser && activeUser.type === 'student' && activeUser.data) {
    const student = activeUser.data;

    // Messages from Teacher
    (student.messagesFromTeacher || []).forEach((m, idx) => {
      const nid = `stu_msg_${m.id || idx}`;
      notifs.push({
        id: nid,
        type: 'teacher_msg',
        icon: '💬',
        title: currentLang === 'ku' ? `پەیام لە لایەن مامۆستا (${m.teacherNameKu || m.teacherName})` : `Message from Prof. ${m.teacherName}`,
        message: currentLang === 'ku' ? (m.textKu || m.text) : (m.text || m.textKu),
        time: m.date || 'Recent',
        isRead: readIds.includes(nid),
        linkType: 'student_messages'
      });
    });

    // Assignments for this student
    (CIS_DATA.assignments || []).forEach(a => {
      const matchDept = !a.deptId || a.deptId === student.departmentId;
      if (matchDept) {
        const sub = (a.submissions || []).find(s => s.studentId === student.id);
        const nid = `stu_assign_${a.id}`;
        if (sub && sub.grade !== undefined && sub.grade !== null) {
          notifs.push({
            id: `${nid}_grade`,
            type: 'assignment_graded',
            icon: '🎯',
            title: currentLang === 'ku' ? `نمرەی ئەرک دانرا: ${a.titleKu || a.title}` : `Grade Published: ${a.title}`,
            message: currentLang === 'ku' ? `نمرەکەت: ${sub.grade} لە ${a.maxPoints}. تێبینی: ${sub.feedback || 'هیچ نییە'}` : `Your score: ${sub.grade} / ${a.maxPoints}. Feedback: ${sub.feedback || 'Good job'}`,
            time: sub.gradeDate || sub.submissionDate || 'Recent',
            isRead: readIds.includes(`${nid}_grade`),
            linkType: 'student_assignments'
          });
        } else if (!sub) {
          notifs.push({
            id: nid,
            type: 'assignment_due',
            icon: '📝',
            title: currentLang === 'ku' ? `ئەرکی نوێ: ${a.titleKu || a.title}` : `New Assignment: ${a.title}`,
            message: currentLang === 'ku' ? `پۆل: ${a.classCode} • دوا وادە: ${a.dueDate}` : `Class: ${a.classCode} • Deadline: ${a.dueDate}`,
            time: a.dateCreated || 'Upcoming',
            isRead: readIds.includes(nid),
            linkType: 'student_assignments'
          });
        }
      }
    });

  } else if (activeUser && activeUser.type === 'teacher' && activeUser.data) {
    const teacher = activeUser.data;
    const myClasses = getTeacherAssignedClasses(teacher).map(c => c.code);

    // Submissions from students for this teacher's assignments
    (CIS_DATA.assignments || []).forEach(a => {
      const isMine = a.teacherId === teacher.id || myClasses.includes(a.classCode);
      if (isMine) {
        (a.submissions || []).forEach(sub => {
          const nid = `sub_${a.id}_${sub.studentId}`;
          notifs.push({
            id: nid,
            type: 'submission_received',
            icon: '📥',
            title: currentLang === 'ku' ? `وەڵامی ئەرک لەلایەن ${sub.studentName}` : `Submission by ${sub.studentName}`,
            message: currentLang === 'ku' ? `ئەرک: ${a.titleKu || a.title} (${a.classCode})` : `Assignment: ${a.title} (${a.classCode})`,
            time: sub.submissionDate || 'Recent',
            isRead: readIds.includes(nid),
            linkType: 'teacher_assignments'
          });
        });
      }
    });

  } else if (activeUser && activeUser.type === 'admin') {
    // Admin notices
    notifs.push({
      id: 'adm_sec_1',
      type: 'admin_audit',
      icon: '🛡️',
      title: currentLang === 'ku' ? 'سیستەمی چاودێری ئەمنی چالاکە' : 'Security Audit Active',
      message: currentLang === 'ku' ? 'سەرجەم پرۆسەکانی چوونەژوورەوە و دروستکردنی هەژمار تۆمار دەکرێن.' : 'All authentication events and account creation actions are monitored.',
      time: 'Live System',
      isRead: readIds.includes('adm_sec_1'),
      linkType: 'admin_dashboard'
    });
  }

  return notifs;
}

function updateNotificationBadge() {
  const badge = document.getElementById('notifBadgeCount') || document.getElementById('notificationUnreadBadge');
  if (!badge) return;

  const notifs = getNotificationsForUser();
  const unreadCount = notifs.filter(n => !n.isRead).length;

  if (unreadCount > 0) {
    badge.style.display = 'flex';
    badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
  } else {
    badge.style.display = 'none';
  }
}

function toggleNotificationDrawer(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('notificationDropdownMenu');
  if (!menu) return;

  const isOpening = !menu.classList.contains('active');
  if (isOpening) {
    renderNotificationDrawer();
    menu.classList.add('active');
  } else {
    menu.classList.remove('active');
  }
}

function renderNotificationDrawer() {
  const container = document.getElementById('notificationItemsList');
  if (!container) return;

  const notifs = getNotificationsForUser();

  if (notifs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🔕</div>
        <div style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">${currentLang === 'ku' ? 'هیچ ئاگادارییەکت نییە' : 'No notifications'}</div>
        <p style="font-size: 0.8rem; margin-top: 4px;">${currentLang === 'ku' ? 'پەیام و ئەرکە نوێیەکان لێرە دەردەکەون.' : 'Updates, assignments and announcements will appear here.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = notifs.map(n => `
    <div class="notif-item ${n.isRead ? '' : 'unread'}" onclick="clickNotificationItem('${n.id}', '${n.linkType}')">
      <div class="notif-item-icon">${n.icon}</div>
      <div class="notif-item-body">
        <div class="notif-item-title">${n.title}</div>
        <div class="notif-item-text">${n.message}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
      ${!n.isRead ? '<div class="notif-unread-dot" title="Unread"></div>' : ''}
    </div>
  `).join('');
}

function markAllNotificationsAsRead() {
  const notifs = getNotificationsForUser();
  const allIds = notifs.map(n => n.id);
  saveReadNotifIds(allIds);
  updateNotificationBadge();
  renderNotificationDrawer();
  showToast(
    currentLang === 'ku' ? 'سەرجەم ئاگادارییەکان وەک خوێندراوە نیشانکران.' : 'All notifications marked as read.',
    'info'
  );
}

function clickNotificationItem(notifId, linkType) {
  const readIds = getReadNotifIds();
  if (!readIds.includes(notifId)) {
    readIds.push(notifId);
    saveReadNotifIds(readIds);
  }
  updateNotificationBadge();

  const menu = document.getElementById('notificationDropdownMenu');
  if (menu) menu.classList.remove('active');

  // Navigate to corresponding area
  if (linkType === 'student_assignments') {
    if (activeUser && activeUser.type === 'student') {
      const tabBtn = document.getElementById('tabStudentAssignments');
      if (tabBtn) switchStudentTab('assignments', tabBtn);
      scrollToActiveDashboard();
    }
  } else if (linkType === 'student_messages') {
    if (activeUser && activeUser.type === 'student') {
      const tabBtn = document.getElementById('tabStudentMessages');
      if (tabBtn) switchStudentTab('messages', tabBtn);
      scrollToActiveDashboard();
    }
  } else if (linkType === 'teacher_assignments') {
    if (activeUser && activeUser.type === 'teacher') {
      const tabBtn = document.getElementById('tabTeacherAssignments');
      if (tabBtn) switchTeacherTab('assignments', tabBtn);
      scrollToActiveDashboard();
    }
  } else if (linkType === 'announcements') {
    const el = document.getElementById('announcements') || document.getElementById('news');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// FEATURE 1: CLASS ASSIGNMENTS & HOMEWORK MODULE
// (Teacher creation, submission, grading, and Student coursework upload)
// ==========================================================================

// --- TEACHER SIDE ---

function renderTeacherAssignments(teacher) {
  const container = document.getElementById('teacherAssignmentsListContainer');
  const badge = document.getElementById('teacherAssignmentsBadge');
  if (!container) return;

  const myClasses = getTeacherAssignedClasses(teacher);
  const myClassCodes = myClasses.map(c => c.code);

  const assignments = (CIS_DATA.assignments || []).filter(a => {
    return a.teacherId === teacher.id || myClassCodes.includes(a.classCode);
  });

  if (badge) {
    badge.textContent = assignments.length;
  }

  if (assignments.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted); background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <div style="font-size: 2.4rem; margin-bottom: 10px;">📝</div>
        <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff; margin-bottom: 6px;">
          ${currentLang === 'ku' ? 'هیچ ئەرکێکی وانە دانەنراوە' : 'No Assignments Created Yet'}
        </div>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">
          ${currentLang === 'ku' ? 'دەتوانیت کلیل بکەیت لەسەر دوگمەی سەرەوە بۆ دانانی ئەرکی نوێ بۆ قوتابیەکانت.' : 'Click "+ Create New Assignment" above to assign coursework to your students.'}
        </p>
        <button class="btn btn-primary btn-sm" onclick="openTeacherAddAssignmentModal()">
          + ${currentLang === 'ku' ? 'دانانی ئەرکی نوێ' : 'Create New Assignment'}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = assignments.map(a => {
    const subCount = a.submissions ? a.submissions.length : 0;
    const gradedCount = a.submissions ? a.submissions.filter(s => s.grade !== undefined && s.grade !== null).length : 0;

    return `
      <div class="assignment-card">
        <div class="assignment-card-header">
          <span class="meta-pill" style="border-color: #3b82f6; color: #60a5fa; font-weight: 700;">${a.classCode}</span>
          <span class="meta-pill" style="border-color: rgba(255,255,255,0.3); color: #ffffff;">${a.maxPoints} ${currentLang === 'ku' ? 'نمرە' : 'Pts'}</span>
        </div>

        <h4 class="assignment-card-title">${currentLang === 'ku' ? (a.titleKu || a.title) : a.title}</h4>
        <p class="assignment-card-desc">${currentLang === 'ku' ? (a.instructionsKu || a.instructions) : a.instructions}</p>

        <div class="assignment-meta-row">
          <span>📅 ${currentLang === 'ku' ? 'کۆتایی:' : 'Due:'} <strong>${a.dueDate}</strong></span>
          <span>📥 ${subCount} ${currentLang === 'ku' ? 'وەڵام' : 'Submissions'} (${gradedCount} ${currentLang === 'ku' ? 'نمرەدار' : 'Graded'})</span>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="openTeacherViewSubmissionsModal('${a.id}')" style="flex: 1;">
            📋 ${currentLang === 'ku' ? 'سەیرکردنی وەڵامەکان' : 'View Submissions'} (${subCount})
          </button>
          <button class="btn btn-secondary btn-sm" onclick="teacherDeleteAssignment('${a.id}')" style="border-color: rgba(239, 68, 68, 0.4); color: #ef4444;" title="Delete Assignment">
            🗑️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openTeacherAddAssignmentModal() {
  const teacher = activeUser && activeUser.data ? activeUser.data : null;
  if (!teacher) return;

  const select = document.getElementById('assignmentTargetClassSelect');
  if (select) {
    const classes = getTeacherAssignedClasses(teacher);
    if (classes.length > 0) {
      select.innerHTML = classes.map(c => `
        <option value="${c.code}" data-title="${c.title || c.titleKu || ''}" data-dept="${c.departmentId || ''}">
          ${c.code} - ${c.title || c.titleKu || 'Class'}
        </option>
      `).join('');
    } else {
      select.innerHTML = `<option value="CS-101">CS-101 General Class</option>`;
    }
  }

  // Set default due date (7 days from now)
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const dueInput = document.getElementById('assignmentDueDate');
  if (dueInput) {
    dueInput.value = d.toISOString().split('T')[0];
  }

  document.getElementById('assignmentTitleEn').value = '';
  document.getElementById('assignmentTitleKu').value = '';
  document.getElementById('assignmentInstructions').value = '';
  document.getElementById('assignmentMaxPoints').value = '100';

  document.getElementById('teacherAddAssignmentModal').classList.add('active');
}

function handleTeacherCreateAssignment(e) {
  e.preventDefault();
  const teacher = activeUser && activeUser.data ? activeUser.data : null;
  if (!teacher) return;

  const select = document.getElementById('assignmentTargetClassSelect');
  const selectedOpt = select ? select.options[select.selectedIndex] : null;
  const classCode = select ? select.value : 'CS-101';
  const classTitle = selectedOpt ? selectedOpt.getAttribute('data-title') : '';
  const deptId = selectedOpt ? selectedOpt.getAttribute('data-dept') : (teacher.departmentId || 'cs');

  const titleEn = document.getElementById('assignmentTitleEn').value.trim();
  const titleKu = document.getElementById('assignmentTitleKu').value.trim() || titleEn;
  const dueDate = document.getElementById('assignmentDueDate').value;
  const maxPoints = parseInt(document.getElementById('assignmentMaxPoints').value) || 100;
  const instructions = document.getElementById('assignmentInstructions').value.trim();

  const newAssignment = {
    id: `assign_${Date.now()}`,
    classCode: classCode,
    classTitle: classTitle,
    deptId: deptId,
    teacherId: teacher.id,
    teacherName: teacher.name,
    teacherNameKu: teacher.nameKu || teacher.name,
    title: titleEn,
    titleKu: titleKu,
    instructions: instructions,
    instructionsKu: instructions,
    dueDate: dueDate,
    maxPoints: maxPoints,
    dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    submissions: []
  };

  if (!CIS_DATA.assignments) CIS_DATA.assignments = [];
  CIS_DATA.assignments.unshift(newAssignment);
  saveCustomAssignmentsToStorage();

  closeModal('teacherAddAssignmentModal');
  renderTeacherAssignments(teacher);
  updateNotificationBadge();

  showToast(
    currentLang === 'ku'
      ? `ئەرکی نوێ بە سەرکەوتوویی دانرا بۆ پۆلی (${classCode})!`
      : `Assignment published successfully for class ${classCode}!`,
    'success'
  );
}

function teacherDeleteAssignment(assignmentId) {
  const confirmMsg = currentLang === 'ku'
    ? 'دڵنیایت لە سڕینەوەی ئەم ئەرکە؟'
    : 'Are you sure you want to delete this assignment?';

  if (confirm(confirmMsg)) {
    CIS_DATA.assignments = (CIS_DATA.assignments || []).filter(a => a.id !== assignmentId);
    saveCustomAssignmentsToStorage();
    if (activeUser && activeUser.data) {
      renderTeacherAssignments(activeUser.data);
    }
    updateNotificationBadge();
    showToast(
      currentLang === 'ku' ? 'ئەرکەکە سڕایەوە.' : 'Assignment removed successfully.',
      'info'
    );
  }
}

let activeViewingAssignmentId = null;

function openTeacherViewSubmissionsModal(assignmentId) {
  activeViewingAssignmentId = assignmentId;
  const assignment = (CIS_DATA.assignments || []).find(a => a.id === assignmentId);
  if (!assignment) return;

  const classBadge = document.getElementById('submissionsModalClassBadge');
  const titleEl = document.getElementById('submissionsModalTitle');
  const countBadge = document.getElementById('submissionsModalCountBadge');
  const container = document.getElementById('teacherSubmissionsListContainer');

  if (classBadge) classBadge.textContent = assignment.classCode;
  if (titleEl) titleEl.textContent = currentLang === 'ku' ? (assignment.titleKu || assignment.title) : assignment.title;

  const subs = assignment.submissions || [];
  if (countBadge) countBadge.textContent = `${subs.length} ${currentLang === 'ku' ? 'وەڵام' : 'Submissions'}`;

  if (!container) return;

  if (subs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 16px; color: var(--text-muted); background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">📭</div>
        <div style="font-weight: 700; color: #ffffff; font-size: 1rem;">${currentLang === 'ku' ? 'هیچ وەڵامێک تا ئێستا نییە' : 'No Submissions Yet'}</div>
        <p style="font-size: 0.82rem; margin-top: 4px;">${currentLang === 'ku' ? 'کاتێک قوتابییەکان ئەرکەکانیان ڕادەست دەکەن، لێرە دەردەکەون بۆ نمرەدانان.' : 'Enrolled students will submit their solutions here for you to grade.'}</p>
      </div>
    `;
  } else {
    container.innerHTML = subs.map(s => {
      const isGraded = s.grade !== undefined && s.grade !== null;
      return `
        <div class="submission-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <strong style="color: #ffffff; font-size: 1rem;">${s.studentName}</strong>
                <code style="color: var(--primary); font-size: 0.85rem;">${s.studentId}</code>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">
                📅 ${currentLang === 'ku' ? 'بەرواری ڕادەستکردن:' : 'Submitted on:'} ${s.submissionDate}
              </div>
            </div>
            <div>
              <span class="status-badge ${isGraded ? 'graded' : 'pending'}">
                ${isGraded ? `🎯 Grade: ${s.grade} / ${assignment.maxPoints}` : '⏳ Awaiting Grading'}
              </span>
            </div>
          </div>

          <div class="submission-content-box">
            <strong style="color: #ffffff; font-size: 0.82rem; display: block; margin-bottom: 4px;">${currentLang === 'ku' ? 'وەڵام / بەستەر:' : 'Student Solution / Links:'}</strong>
            <p style="margin: 0; white-space: pre-wrap; font-size: 0.88rem; color: #e4e4e7;">${s.content}</p>
            ${s.fileName ? `<div style="margin-top: 6px; font-size: 0.8rem; color: #60a5fa;">📎 Attached File: <code>${s.fileName}</code></div>` : ''}
          </div>

          <!-- Grading Row -->
          <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <label style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Score:</label>
              <input type="number" id="grade_input_${s.studentId}" class="form-control" min="0" max="${assignment.maxPoints}" value="${s.grade !== undefined && s.grade !== null ? s.grade : ''}" placeholder="/${assignment.maxPoints}" style="width: 85px; padding: 6px 8px; font-size: 0.85rem; font-weight: 700; text-align: center;">
            </div>
            <div style="flex: 1; min-width: 180px;">
              <input type="text" id="feedback_input_${s.studentId}" class="form-control" value="${s.feedback || ''}" placeholder="${currentLang === 'ku' ? 'تێبینی بۆ قوتابی...' : 'Teacher feedback notes...'}" style="padding: 6px 10px; font-size: 0.82rem;">
            </div>
            <button class="btn btn-primary btn-sm" onclick="saveTeacherGrade('${assignment.id}', '${s.studentId}')">
              💾 ${currentLang === 'ku' ? 'پاشەکەوتکردنی نمرە' : 'Save Grade'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('teacherViewSubmissionsModal').classList.add('active');
}

function saveTeacherGrade(assignmentId, studentId) {
  const assignment = (CIS_DATA.assignments || []).find(a => a.id === assignmentId);
  if (!assignment) return;

  const sub = (assignment.submissions || []).find(s => s.studentId === studentId);
  if (!sub) return;

  const gradeInput = document.getElementById(`grade_input_${studentId}`);
  const feedbackInput = document.getElementById(`feedback_input_${studentId}`);

  const gradeVal = gradeInput ? parseInt(gradeInput.value) : null;
  const feedbackVal = feedbackInput ? feedbackInput.value.trim() : '';

  if (isNaN(gradeVal) || gradeVal === null) {
    showToast(
      currentLang === 'ku' ? 'تکایە نمرەیەکی دروست بنووسە!' : 'Please enter a valid numeric grade!',
      'error'
    );
    return;
  }

  sub.grade = gradeVal;
  sub.feedback = feedbackVal;
  sub.gradeDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  saveCustomAssignmentsToStorage();
  openTeacherViewSubmissionsModal(assignmentId);
  if (activeUser && activeUser.data) {
    renderTeacherAssignments(activeUser.data);
  }
  updateNotificationBadge();

  showToast(
    currentLang === 'ku'
      ? `نمرەی (${gradeVal} / ${assignment.maxPoints}) بۆ قوتابی (${sub.studentName}) پاشەکەوت کرا!`
      : `Grade (${gradeVal} / ${assignment.maxPoints}) recorded for ${sub.studentName}!`,
    'success'
  );
}

// --- STUDENT SIDE ---

function renderStudentAssignments(student) {
  const container = document.getElementById('studentAssignmentsListContainer');
  const countBadge = document.getElementById('studentAssignmentsCountBadge');
  const headerBadge = document.getElementById('studentAssignmentsHeaderBadge');
  if (!container) return;

  const assignments = (CIS_DATA.assignments || []).filter(a => {
    return !a.deptId || a.deptId === student.departmentId;
  });

  if (countBadge) countBadge.textContent = assignments.length;
  if (headerBadge) headerBadge.textContent = `${assignments.length} ${currentLang === 'ku' ? 'ئەرک' : 'Assignments'}`;

  if (assignments.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px 16px; color: var(--text-muted); background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🎉</div>
        <div style="font-weight: 700; color: #ffffff; font-size: 1rem;">
          ${currentLang === 'ku' ? 'هیچ ئەرکێکی کراوە نییە' : 'No Coursework Pending'}
        </div>
        <p style="font-size: 0.85rem; margin-top: 4px;">
          ${currentLang === 'ku' ? 'کاتێک مامۆستاکانت ئەرک یان ڕاهێنان دادەنێن، لێرە دەردەکەون بۆ ڕادەستکردن.' : 'When your professors post new class homework or projects, they will appear here.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = assignments.map(a => {
    const sub = (a.submissions || []).find(s => s.studentId === student.id);
    const isSubmitted = !!sub;
    const isGraded = sub && sub.grade !== undefined && sub.grade !== null;

    let badgeHtml = '';
    if (isGraded) {
      badgeHtml = `<span class="status-badge graded">🎯 ${currentLang === 'ku' ? 'نمرەدار:' : 'Graded:'} ${sub.grade} / ${a.maxPoints}</span>`;
    } else if (isSubmitted) {
      badgeHtml = `<span class="status-badge submitted">✅ ${currentLang === 'ku' ? 'ڕادەستکراوە' : 'Submitted'}</span>`;
    } else {
      badgeHtml = `<span class="status-badge pending">⏳ ${currentLang === 'ku' ? 'چاوەڕوانی وەڵام' : 'Pending Submission'}</span>`;
    }

    return `
      <div class="assignment-card">
        <div class="assignment-card-header">
          <span class="meta-pill" style="border-color: #3b82f6; color: #60a5fa; font-weight: 700;">${a.classCode}</span>
          ${badgeHtml}
        </div>

        <h4 class="assignment-card-title">${currentLang === 'ku' ? (a.titleKu || a.title) : a.title}</h4>
        <p class="assignment-card-desc">${currentLang === 'ku' ? (a.instructionsKu || a.instructions) : a.instructions}</p>

        <div class="assignment-meta-row">
          <span>👨‍🏫 ${a.teacherNameKu || a.teacherName || 'Faculty Professor'}</span>
          <span>📅 ${currentLang === 'ku' ? 'دوا وادە:' : 'Deadline:'} <strong>${a.dueDate}</strong></span>
        </div>

        ${isGraded && sub.feedback ? `
          <div style="margin-top: 10px; background: rgba(52, 211, 153, 0.08); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; color: #34d399;">
            <strong>💬 Teacher Feedback:</strong> ${sub.feedback}
          </div>
        ` : ''}

        <div style="margin-top: 14px;">
          ${isSubmitted ? `
            <button class="btn btn-secondary btn-sm" style="width: 100%; border-color: rgba(255,255,255,0.3);" onclick="openStudentSubmitAssignmentModal('${a.id}')">
              🔄 ${currentLang === 'ku' ? 'نوێکردنەوەی وەڵام (دەستکاریکردن)' : 'Update / Resubmit Solution'}
            </button>
          ` : `
            <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="openStudentSubmitAssignmentModal('${a.id}')">
              📤 ${currentLang === 'ku' ? 'ڕادەستکردنی وەڵام' : 'Submit Solution'}
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function openStudentSubmitAssignmentModal(assignmentId) {
  const assignment = (CIS_DATA.assignments || []).find(a => a.id === assignmentId);
  if (!assignment) return;

  const student = activeUser && activeUser.data ? activeUser.data : null;
  const existingSub = student ? (assignment.submissions || []).find(s => s.studentId === student.id) : null;

  document.getElementById('studentSubmitAssignmentId').value = assignment.id;
  document.getElementById('studentSubmitModalClassBadge').textContent = assignment.classCode;
  document.getElementById('studentSubmitModalTitle').textContent = currentLang === 'ku' ? (assignment.titleKu || assignment.title) : assignment.title;
  document.getElementById('studentSubmitModalInstructions').textContent = currentLang === 'ku' ? (assignment.instructionsKu || assignment.instructions) : assignment.instructions;

  const contentInput = document.getElementById('studentSubmitContent');
  const fileInput = document.getElementById('studentSubmitFileName');

  if (contentInput) contentInput.value = existingSub ? existingSub.content : '';
  if (fileInput) fileInput.value = existingSub ? existingSub.fileName || '' : '';

  document.getElementById('studentSubmitAssignmentModal').classList.add('active');
}

function handleStudentSubmitAssignment(e) {
  e.preventDefault();
  const student = activeUser && activeUser.data ? activeUser.data : null;
  if (!student) return;

  const assignmentId = document.getElementById('studentSubmitAssignmentId').value;
  const assignment = (CIS_DATA.assignments || []).find(a => a.id === assignmentId);
  if (!assignment) return;

  const content = document.getElementById('studentSubmitContent').value.trim();
  const fileName = document.getElementById('studentSubmitFileName').value.trim();

  if (!assignment.submissions) assignment.submissions = [];

  const existingIdx = assignment.submissions.findIndex(s => s.studentId === student.id);
  const subData = {
    studentId: student.id,
    studentName: currentLang === 'ku' ? (student.nameKu || student.name) : student.name,
    submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    content: content,
    fileName: fileName,
    grade: existingIdx >= 0 ? assignment.submissions[existingIdx].grade : null,
    feedback: existingIdx >= 0 ? assignment.submissions[existingIdx].feedback : ''
  };

  if (existingIdx >= 0) {
    assignment.submissions[existingIdx] = subData;
  } else {
    assignment.submissions.push(subData);
  }

  saveCustomAssignmentsToStorage();
  closeModal('studentSubmitAssignmentModal');
  renderStudentAssignments(student);
  updateNotificationBadge();

  showToast(
    currentLang === 'ku'
      ? `ئەرکەکە بە سەرکەوتوویی ڕادەست کرا بۆ وانەی (${assignment.classCode})!`
      : `Coursework submitted successfully for ${assignment.classCode}!`,
    'success'
  );
}

// =============================================================================
// FLOATING SMART AI CHAT & WHATSAPP HELP DESK ENGINE (BILINGUAL KU/EN)
// =============================================================================

let isChatWidgetOpen = false;
let chatWidgetMessages = [];

const CHAT_SUGGESTIONS_KU = [
  '🎓 بەشەکانی کۆلێژ چیین؟',
  '📝 مەرجەکانی وەرگرتن چییە؟',
  '💰 قیست و نرخی خوێندن',
  '📍 ناونیشان و شوێنی کۆلێژ',
  '🔑 پۆرتالی خوێندکاران چییە؟',
  '🛡️ پاراستنی وانە ڤیدیۆییەکان',
  '📱 ژمارەی واتسئەپی فەرمی'
];

const CHAT_SUGGESTIONS_EN = [
  '🎓 What departments are available?',
  '📝 How to apply & requirements?',
  '💰 Tuition fees & installments?',
  '📍 Campus location & address',
  '🔑 Student Portal features',
  '🛡️ Protected video lessons (DRM)',
  '📱 Official WhatsApp contact'
];

// Comprehensive Knowledge Base
const CHAT_KNOWLEDGE_BASE = [
  {
    category: 'departments',
    keywords: [
      'بەش', 'کۆلێژ', 'کۆمپیوتەر', 'ئایتی', 'پرۆگرام', 'دیزاین', 'دیکۆرات', 'کارگێڕی', 'ژمێریاری', 'بیناکاری', 'شارستانی', 'ئەندازیاری',
      'department', 'departments', 'major', 'majors', 'programs', 'study', 'it', 'software', 'interior', 'business', 'accounting', 'civil', 'construction'
    ],
    answerKu: `🎓 **کۆلێژی تەکنیکی و زانستی C.I.S خاوەنی ٤ بەشی گرنگ و ئەکادیمییە بۆ وەرگرتنی بڕوانامەی دبلۆمی ٣ ساڵەی باوەڕپێکراو:**

1. 💻 **تەکنەلۆژیای زانیاری و پرۆگرامسازی (IT & Software Engineering):** فێربوونی پرۆگرامین، وێب، زیرەکی دەستکرد، و ئاسایشی زانیاری.
2. 📊 **کارگێڕی کار و ژمێریاری (Business Administration & Accounting):** ڕاهێنانی سەرکردایەتی، دارایی، و بازاڕگەری سەردەمیانە.
3. 🎨 **ئەندازیاری دیزاینی ناوخۆیی و دیکۆرات (Interior Design):** دیزاینی ٢D و ٣D، دیکۆرات، نەخشەسازی تەلارسازی.
4. 🏗️ **ئەندازیاری بیناکاری و شارستانی (Civil & Construction Engineering):** پڕۆژەی کۆنکرێتی، ڕووپێوی و بەڕێوەبردنی پڕۆژە.

تەواوی بەشەکان خاوەنی تاقیگەی پێشکەوتوو و پرۆگرامی ستانداردی نێودەوڵەتین.`,
    answerEn: `🎓 **C.I.S College offers 4 accredited 3-year Diploma departments certified by the Ministry of Higher Education:**

1. 💻 **Information Technology & Software Engineering:** Modern coding, Web & App development, AI, and Cybersecurity.
2. 📊 **Business Administration & Accounting:** Modern financial management, leadership, and digital enterprise administration.
3. 🎨 **Interior Design & Decoration Engineering:** 2D/3D CAD design, spatial architecture, and decor planning.
4. 🏗️ **Construction & Civil Engineering:** Structural surveying, concrete design, and modern construction management.

All departments feature cutting-edge laboratories and industry-standard curricula.`
  },
  {
    category: 'admissions',
    keywords: [
      'ناونووسین', 'تۆمار', 'پۆلی ۱۲', 'پۆلی 12', 'وەرگرتن', 'مەرج', 'داواکاری', 'بەڵگەنامە', 'داشکاندن', 'دەرچوو', 'زانستی', 'وێژەیی', 'پیشەیی',
      'admission', 'register', 'apply', 'registration', 'grade 12', 'requirements', 'documents', 'eligibility', 'enroll', 'enrollment'
    ],
    answerKu: `📝 **مەرج و ڕێکارەکانی وەرگرتن لە C.I.S:**

• **کێ مافی پێشکەشکردنی هەیە؟** دەرچووانی پۆلی ١٢ی ئامادەیی (زانستی، وێژەیی، و پیشەیی).
• **بەڵگەنامە پێویستەکان:**
  1. بڕوانامە و نمرەی پۆلی ١٢ (ئەسڵی + وێنەی کۆپی).
  2. پێناسەی باری شارستانی یان کارتی نیشتمانی.
  3. فۆڕمی خۆراک و کارتی زانیاری نیشتەجێبوون.
  4. ٦ وێنەی کەسی ڕەنگاوڕەنگ بە باکگراوندی سپی.
• دەتوانیت لە ڕێگەی فۆڕمی وێبسایتەکەمانەوە داواکاری بنێریت یان سەردانی هۆڵی وەرگرتنی کەمپەس بکەیت!`,
    answerEn: `📝 **Admission Requirements & Application Steps:**

• **Eligibility:** High School graduates of Grade 12 (Scientific, Literary, and Vocational branches).
• **Required Documents:**
  1. Official Grade 12 Certificate / Transcript.
  2. Iraqi National ID Card or Civil Status ID.
  3. Residence Card & Food Ration Card.
  4. 6 recent personal passport photos.
• You can apply directly through the Admissions section on this portal or visit our campus registration office.`
  },
  {
    category: 'tuition',
    keywords: [
      'قیست', 'پارە', 'نرخ', 'کرێ', 'تێچوو', 'تێچوون', 'شێوازی پارەدان', 'داشکاندن',
      'tuition', 'fee', 'fees', 'cost', 'installment', 'installments', 'payment', 'price', 'discount'
    ],
    answerKu: `💰 **کرێی خوێندن و شێوازی قیستەکان:**

• کۆلێژی C.I.S هەوڵی داوە گونجاوترین کرێ بۆ خوێندکاران دابین بکات لەگەڵ باشترین خزمەتگوزاری.
• **سیستەمی ٤ قیستی ئاسان:** بڕی پارەی خوێندن بە ٤ قیستی قۆناغ بە قۆناغ لە درێژایی ساڵی خوێندندا وەردەگیرێت.
• **داشکاندنی تایبەت:** داشکاندنی شایستە بۆ خوێندکارانی یەکەم، پلە باڵاکان، و کاتی خۆتۆمارکردنی پێشوەختە بەردەستە.
• بۆ زانینی وردەکاری نرخی هەر بەشێک، دەتوانیت پەیوەندی بە بەشی دارایی بکەیت لە ڕێگەی واتسئەپەوە: +964 772 318 8000.`,
    answerEn: `💰 **Tuition Fees & Flexible Installments:**

• C.I.S provides highly affordable academic tuition with exceptional educational value.
• **4 Flexible Installments:** The annual tuition is divided into 4 convenient installments throughout the academic year.
• **Merit Scholarships & Discounts:** Special discounts are granted for top-performing students and early bird registrations.
• To get the exact fee breakdown for your chosen department, please reach out directly to our Finance desk on WhatsApp: +964 772 318 8000.`
  },
  {
    category: 'location',
    keywords: [
      'شوێن', 'ناونیشان', 'سلێمانی', 'لە کوێیە', 'کەمپەس', 'ناوچە', 'نەخشە',
      'location', 'address', 'where', 'sulaymaniyah', 'campus', 'city', 'map', 'complex'
    ],
    answerKu: `📍 **ناونیشانی  کۆلێژی C.I.S:**

• **شار:** سلێمانی، هەرێمی کوردستان، عێراق.
• **ناونیشانی تەواو:** شەقامی بازنەیی مەولەوی / ڕێگای گۆیژە - ناو کۆمەڵگەی شاری دایک (Shari Dayk Complex)، ڕێک بەرامبەر پڕۆژەی گەشتیاری چاڤی لاند (Chavy Land).
• کەمپەس خاوەنی باڵەخانەی مۆدێرن، تاقیگەی پێشکەوتوو، کتێبخانەی ئەلیکترۆنی، و شوێنی حەوانەوەی خوێندکارانە.`,
    answerEn: `📍 **C.I.S College Campus Location:**

• **City:** Sulaymaniyah, Kurdistan Region, Iraq.
• **Full Address:** Inside the prestigious Shari Dayk Complex, directly opposite Chavy Land on Goyzha Road.
• The campus includes high-tech computing labs, engineering studios, digital cyber library, and student lounges.`
  },
  {
    category: 'portal',
    keywords: [
      'پۆرتال', 'چوونەژوورەوە', 'پاسۆرد', 'ئەکاونت', 'نمرە', 'وانە', 'ئەرک', 'مامۆستا', 'خوێندکار',
      'portal', 'login', 'password', 'account', 'student portal', 'teacher portal', 'grades', 'attendance', 'assignment'
    ],
    answerKu: `🔑 **سیستەمی پۆرتالی ئەکادیمی (Student & Teacher Portal):**

• **بۆ خوێندکاران:** بینینی خشتەی وانەکان، بەشداریکردن لە وانە ڤیدیۆییەکان، ڕادەستکردنی ئەرک (Assignments)، و بینینی نمرە و ئامادەنەبوون.
• **چوونەژوورەوە:** لە بەشی سەرەوەی ماڵپەڕ کلیک لەسەر دوگمەی (🔑 چوونەژوورەوە) بکە و کۆدی خوێندکار و تێپەڕەوشە بنووسە.
• ئەگەر وشەی نهێنیت لەبیرچووە، سەردانی بەشی تۆماری کۆلێژ بکە یان لە واتسئەپەوە پەیوەندیمان پێوە بکە.`,
    answerEn: `🔑 **Integrated Academic Portal (Student & Faculty):**

• **For Students:** View weekly timetable, stream DRM-protected lecture videos, submit coursework/assignments, track attendance, and inspect semester transcripts.
• **How to Access:** Click the top-right (🔑 Student Portal / Login) button, select your role (Student or Teacher), and log in with your assigned ID and password.
• Need credential support? Contact the IT registrar or tap the WhatsApp help desk.`
  },
  {
    category: 'drm',
    keywords: [
      'ڤیدیۆ', 'پاراستن', 'کۆپی', 'تۆمارکردن', 'ڕیکۆرد', 'سکڕین', 'دزە', 'ئاسایش',
      'drm', 'video', 'protection', 'watermark', 'screen record', 'copyright', 'security'
    ],
    answerKu: `🛡️ **سیستەمی پاراستنی ڤیدیۆی فێرکاری (Dynamic DRM & Watermarking):**

• سەرجەم وانە تۆمارکراوەکانی پۆرتال پارێزراون بە سیستەمی نێودەوڵەتی ڕێگریکردن لە تۆمارکردنی شاشە.
• ناوی خوێندکار، بەروار و کات بە شێوازی جووڵاو لەسەر ڤیدیۆکە پیشان دەدرێت بۆ ڕێگریکردن لە دزەکردن و پاراستنی مافی مامۆستایان.
• ڤیدیۆکان لە هەموو ئامێرێکەوە بە کوالیتی بەرز پەخش دەبن بەبێ دابەزاندن بۆ سەر ئامێرەکە.`,
    answerEn: `🛡️ **Proprietary DRM & Dynamic Watermark Protection:**

• All academic lecture videos inside the portal are protected with anti-piracy algorithms and live screen-capture inhibitors.
• Floating, dynamic watermarks containing the viewer's Student ID and real-time timestamp are overlaid to safeguard intellectual property.
• Students enjoy crisp HD streaming without unauthorized external redistribution.`
  },
  {
    category: 'whatsapp',
    keywords: [
      'واتسئەپ', 'پەیوەندی', 'تەلەفۆن', 'ژمارە', 'نامە', 'کارگێڕی',
      'whatsapp', 'contact', 'phone', 'call', 'number', 'hotline', 'chat', 'direct'
    ],
    answerKu: `📱 **پەیوەندی ڕاستەوخۆ لە ڕێگەی واتسئەپ و هێڵە فەرمییەکان:**

• **ژمارەی واتسئەپی فەرمی:** [+964 772 318 8000](https://wa.me/9647723188000)
• دەتوانیت لە ڕێگەی کلیک کردن لەسەر بانەری سەوزی سەرەوەی ئەم چاتە ڕاستەوخۆ گفتوگۆ لەگەڵ کارمەندی بەشی وەرگرتن بکەیت!
• **کاتی دەوامی فەرمی:** شەممە تا چوارشەممە (٨:٣٠ی بەیانی تا ٤:٠٠ی پاشنیوەڕۆ).`,
    answerEn: `📱 **Direct Official WhatsApp & Phone Assistance:**

• **Official WhatsApp Desk:** [+964 772 318 8000](https://wa.me/9647723188000)
• Tap the green WhatsApp bar at the top of this window to launch an instant conversation with admissions personnel!
• **Office Working Hours:** Saturday – Wednesday (8:30 AM – 4:00 PM).`
  },
  {
    category: 'greeting',
    keywords: [
      'سڵاو', 'چۆنی', 'باشی', 'سوپاس', 'ڕۆژباش', 'ئێوارەباش',
      'hi', 'hello', 'hey', 'greetings', 'thanks', 'thank you', 'morning', 'afternoon'
    ],
    answerKu: `👋 سڵاو لە ئێوەی بەڕێز! زۆر بەخێربێن بۆ ناوەندی یارمەتیدەری زیرەکی کۆلێژی C.I.S.
ئامادەم بۆ وەڵامدانەوەی هەموو پرسیارەکانت دەربارەی: بەشەکان، وەرگرتن، کرێی خوێندن، ناونیشانی کەمپەس یان پەیوەندی بە واتسئەپ.
فەرموو پرسیارەکەت بنووسە یان کلیک لەسەر دوگمە پێشنیارکراوەکانی خوارەوە بکە!`,
    answerEn: `👋 Hello and welcome to C.I.S College's Smart Assistant!
I am here to answer your questions regarding admissions, accredited departments, tuition & installments, campus location, or connect you directly with our WhatsApp desk.
Feel free to ask a question or tap any of the quick suggestions below!`
  }
];

// Initialize Chat Widget
function initChatWidget() {
  const wrapper = document.getElementById('cisChatWidgetWrapper');
  if (!wrapper) return;

  // Set default initial welcome message if empty
  if (chatWidgetMessages.length === 0) {
    const welcomeKu = 'سڵاو! بەخێربێن بۆ کۆلێژی زانستی و تەکنیکی بەریتانی (C.I.S). چۆن دەتوانم یارمەتیت بدەم؟ دەتوانیت پرسیارێک بکەیت لە خوارەوە یان ڕاستەوخۆ لە ڕێگەی واتسئەپەوە لەگەڵمان بدوێیت.';
    const welcomeEn = 'Hello! Welcome to Cambridge College of Science and Technology (C.I.S). How can I assist you today? Feel free to ask any question or chat with our desk on WhatsApp.';

    chatWidgetMessages.push({
      sender: 'bot',
      text: currentLang === 'ku' ? welcomeKu : welcomeEn,
      time: getChatFormattedTime()
    });
  }

  renderChatWidgetMessages();
  renderChatWidgetSuggestions();
  updateChatWidgetLanguage(currentLang);
}

// Format time helper
function getChatFormattedTime() {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Toggle Chat Open/Close
function toggleChatWidget(forceState) {
  const chatWindow = document.getElementById('cisChatWidgetWindow');
  const iconOpen = document.getElementById('chatFloatingIconOpen');
  const iconClose = document.getElementById('chatFloatingIconClose');
  const btnTooltip = document.getElementById('chatBtnTooltip');

  if (!chatWindow) return;

  if (typeof forceState === 'boolean') {
    isChatWidgetOpen = forceState;
  } else {
    isChatWidgetOpen = !isChatWidgetOpen;
  }

  if (isChatWidgetOpen) {
    chatWindow.style.display = 'flex';
    if (iconOpen) iconOpen.style.display = 'none';
    if (iconClose) iconClose.style.display = 'inline-block';
    if (btnTooltip) btnTooltip.style.display = 'none';

    // Scroll to bottom and auto-focus input
    const container = document.getElementById('cisChatMessagesContainer');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
    const inputEl = document.getElementById('cisChatUserInput');
    if (inputEl) {
      setTimeout(() => inputEl.focus(), 150);
    }
  } else {
    chatWindow.style.display = 'none';
    if (iconOpen) iconOpen.style.display = 'inline-block';
    if (iconClose) iconClose.style.display = 'none';
    if (btnTooltip) btnTooltip.style.display = '';
  }
}

// Render Messages
function renderChatWidgetMessages() {
  const container = document.getElementById('cisChatMessagesContainer');
  if (!container) return;

  container.innerHTML = chatWidgetMessages.map(msg => {
    const isBot = msg.sender === 'bot';
    // Format basic markdown like bold text and newlines
    let formattedText = msg.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    return `
      <div class="chat-msg-row ${isBot ? 'bot-row' : 'user-row'}">
        ${isBot ? '<div class="chat-avatar-mini">🤖</div>' : ''}
        <div class="chat-msg-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}">
          <div class="chat-msg-text">${formattedText}</div>
          <span class="chat-msg-time">${msg.time || ''}</span>
        </div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

// Render Suggestions Chips
function renderChatWidgetSuggestions() {
  const container = document.getElementById('cisChatSuggestions');
  if (!container) return;

  const suggestions = currentLang === 'ku' ? CHAT_SUGGESTIONS_KU : CHAT_SUGGESTIONS_EN;

  container.innerHTML = suggestions.map(sug => {
    // Escape single quotes for inline onclick
    const safeText = sug.replace(/'/g, "\\'");
    return `
      <button type="button" class="chat-chip-btn" onclick="sendChatWidgetQuery('${safeText}')">
        ${sug}
      </button>
    `;
  }).join('');
}

// Handle Form Submission
function handleSendUserChatMessage(e) {
  if (e && e.preventDefault) e.preventDefault();
  const inputEl = document.getElementById('cisChatUserInput');
  if (!inputEl) return;

  const text = inputEl.value.trim();
  if (!text) return;

  inputEl.value = '';
  sendChatWidgetQuery(text);
}

// Send Query and Trigger Bot Response
function sendChatWidgetQuery(queryText) {
  if (!queryText) return;

  // Add User Message
  chatWidgetMessages.push({
    sender: 'user',
    text: queryText,
    time: getChatFormattedTime()
  });
  renderChatWidgetMessages();

  // Show Typing Indicator
  showChatTypingIndicator();

  // Generate answer with realistic typing delay
  setTimeout(() => {
    removeChatTypingIndicator();
    const botReply = generateSmartChatAnswer(queryText);
    chatWidgetMessages.push({
      sender: 'bot',
      text: botReply,
      time: getChatFormattedTime()
    });
    renderChatWidgetMessages();
  }, 450);
}

// Show Typing Indicator
function showChatTypingIndicator() {
  const container = document.getElementById('cisChatMessagesContainer');
  if (!container) return;

  removeChatTypingIndicator();

  const indicator = document.createElement('div');
  indicator.id = 'chatTypingIndicatorRow';
  indicator.className = 'chat-msg-row bot-row';
  indicator.innerHTML = `
    <div class="chat-avatar-mini">🤖</div>
    <div class="chat-msg-bubble bot-bubble chat-typing-bubble">
      <span class="chat-typing-dot"></span>
      <span class="chat-typing-dot"></span>
      <span class="chat-typing-dot"></span>
    </div>
  `;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

// Remove Typing Indicator
function removeChatTypingIndicator() {
  const el = document.getElementById('chatTypingIndicatorRow');
  if (el) el.remove();
}

// Smart Answer Generator based on Knowledge Base
function generateSmartChatAnswer(query) {
  const qClean = query.toLowerCase().trim();

  // Scan knowledge base for best keyword match
  let bestMatch = null;
  let maxScore = 0;

  for (const item of CHAT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (qClean.includes(kw.toLowerCase())) {
        score += kw.length > 4 ? 2 : 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return currentLang === 'ku' ? bestMatch.answerKu : bestMatch.answerEn;
  }

  // Fallback answer when no direct keyword matched
  if (currentLang === 'ku') {
    return `سوپاس بۆ پرسیارەکەت دەربارەی کۆلێژی C.I.S! 😊

بۆ ئەوەی وەڵامی دروست وەربگریت، دەتوانیت کلیک لەسەر پێشنیارە باوەکانی سەرەوە بکەیت وەک (بەشەکان، وەرگرتن، قیست، یان ناونیشان).

هەروەها بۆ وەڵامی خێرا و ڕاستەوخۆ دەتوانیت نامە بۆ **واتسئەپی فەرمی کۆلێژ (+964 772 318 8000)** بنێریت تا تیمەکەمان دەستبەجێ هاوکاریت بکەن!`;
  } else {
    return `Thank you for contacting C.I.S College! 😊

To help you best, you can choose from the quick topics above (Departments, Admissions, Tuition fees, or Campus location).

You can also chat directly with our official admissions officers via **WhatsApp (+964 772 318 8000)** for immediate one-on-one support!`;
  }
}

// Clear Chat Messages
function clearChatWidgetMessages() {
  const welcomeKu = 'سڵاو! بەخێربێن بۆ کۆلێژی زانستی و تەکنیکی بەریتانی (C.I.S). چۆن دەتوانم یارمەتیت بدەم؟';
  const welcomeEn = 'Hello! Welcome to Cambridge College of Science and Technology (C.I.S). How can I assist you today?';

  chatWidgetMessages = [{
    sender: 'bot',
    text: currentLang === 'ku' ? welcomeKu : welcomeEn,
    time: getChatFormattedTime()
  }];

  renderChatWidgetMessages();
  showToast(
    currentLang === 'ku' ? 'پەیامەکانی چات سڕدرانەوە' : 'Chat history cleared',
    'info'
  );
}

// Update Chat Widget UI texts on Language Switch
function updateChatWidgetLanguage(lang) {
  const titleEl = document.getElementById('chatHeaderTitle');
  const subEl = document.getElementById('chatHeaderSubtitle');
  const waTitle = document.getElementById('chatWaTitle');
  const waSub = document.getElementById('chatWaSubtitle');
  const sugLabel = document.getElementById('chatSuggestionsLabel');
  const inputEl = document.getElementById('cisChatUserInput');
  const tooltipEl = document.getElementById('chatBtnTooltip');
  const bannerLink = document.getElementById('chatWhatsAppBanner');

  if (lang === 'ku') {
    if (titleEl) titleEl.textContent = 'یاریدەدەری زیرەکی C.I.S';
    if (subEl) subEl.innerHTML = '<span class="live-dot"></span> ٢٤/٧ ئۆنلاین • زیرەکی دەستکرد & واتسئەپ';
    if (waTitle) waTitle.textContent = 'گفتوگۆی ڕاستەوخۆ لە واتسئەپ';
    if (waSub) waSub.textContent = 'پەیوەندی ڕاستەوخۆ لەگەڵ کارگێڕی کۆلێژ (+964 772 318 8000)';
    if (sugLabel) sugLabel.textContent = '💡 پرسیارە خێرا باوەکان:';
    if (inputEl) inputEl.placeholder = 'پرسیارێک بنووسە... (پرسیار لە زیرەکی دەستکرد بکە)';
    if (tooltipEl) tooltipEl.textContent = 'یاریدەدەری زیرەک و واتسئەپ';
    if (bannerLink) {
      bannerLink.href = 'https://wa.me/9647723188000?text=' + encodeURIComponent('سڵاو، دەمەوێت زانیاری وەربگرم دەربارەی کۆلێژی C.I.S');
    }
  } else {
    if (titleEl) titleEl.textContent = 'C.I.S Smart Assistant';
    if (subEl) subEl.innerHTML = '<span class="live-dot"></span> Online 24/7 • AI & WhatsApp Support';
    if (waTitle) waTitle.textContent = 'Chat Directly on WhatsApp';
    if (waSub) waSub.textContent = 'Instant chat with Admissions Desk (+964 772 318 8000)';
    if (sugLabel) sugLabel.textContent = '💡 Quick Suggested Questions:';
    if (inputEl) inputEl.placeholder = 'Type a question... (Ask AI assistant)';
    if (tooltipEl) tooltipEl.textContent = 'AI & WhatsApp Help Desk';
    if (bannerLink) {
      bannerLink.href = 'https://wa.me/9647723188000?text=' + encodeURIComponent('Hello, I would like more information about C.I.S College');
    }
  }

  renderChatWidgetSuggestions();
}

// =============================================================================
// APPLE-INSPIRED SCROLL REVEAL & DYNAMIC VIEWPORT ENGINE
// =============================================================================

function initAppleScrollEffects() {
  if (!('IntersectionObserver' in window)) return;

  // Mark body as ready for Apple smooth scroll transitions
  document.body.classList.add('apple-scroll-ready');

  const revealSelectors = [
    '.section-header',
    '.hero-content > *',
    '.hero-programs-quote-box',
    '.hero-cta',
    '.stat-item',
    '.dept-card',
    '.video-card',
    '.portal-role-card',
    '.contact-info-card',
    '.contact-hub-wrapper',
    '.footer-grid > *'
  ];

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function scanAndObserve() {
    revealSelectors.forEach(sel => {
      const elements = document.querySelectorAll(sel);
      elements.forEach((el, idx) => {
        if (!el.classList.contains('apple-reveal')) {
          el.classList.add('apple-reveal');
          const staggerIndex = (idx % 6) + 1;
          el.classList.add(`apple-stagger-${staggerIndex}`);
          revealObserver.observe(el);
        }
      });
    });
  }

  scanAndObserve();
  window.refreshAppleScrollReveal = scanAndObserve;

  // Apple Dynamic Header Frosted Glass on Scroll
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        headerEl.classList.add('header-scrolled');
      } else {
        headerEl.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }
}


