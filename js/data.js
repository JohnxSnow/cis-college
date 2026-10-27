/**
 * C.I.S Cedars International College - Central Data Store
 * Contains official 3-year programs: Computer Science, Accounting, Design, Management, English Language, Construction.
 * Distinct roles: Public, Student, Teacher, Admin.
 */

const CIS_DATA = {
  college: {
    name: "C.I.S Cedars International College",
    nameKu: "کۆلێژی نێودەوڵەتی C.I.S (Cedars College)",
    acronym: "C.I.S",
    established: "1991",
    // User requested hero text:
    heroQuote: "We empower students with 3-year programs in IT, Accounting, Management, and Construction. We combine practical skills with top-quality education.",
    heroQuoteKu: "ئێمە خوێندکاران بەهێز دەکەین بە پڕۆگرامی ٣-ساڵە لە بواری تەکنەلۆژیای زانیاری (IT)، ژمێریاری، کارگێڕی، و بیناکاری. ئێمە کارامەیی کرداری لەگەڵ پەروەردەی کوالێتی بەرز ئاوێتە دەکەین.",
    dean: "Prof. Dr. Alan K. Rostam",
    stats: [
      { label: "Graduation Employment Rate", labelKu: "ڕێژەی دامەزراندن", value: "98%", icon: "briefcase" },
      { label: "Active Enrolled Students", labelKu: "قوتابی چالاک", value: "500+", icon: "users" },
      { label: "Industry Hiring Partners", labelKu: "کۆمپانیای هاوبەش", value: "60+", icon: "building" },
      { label: "Program Duration", labelKu: "ماوەی خوێندنی بەشەکان", value: "3 Years", icon: "award" }
    ]
  },

  // Official Departments requested by user
  departments: [
    {
      id: "cs",
      name: "Computer Science (IT)",
      nameKu: "زانستی کۆمپیوتەر (IT)",
      code: "CS-IT",
      duration: "3-Year Program",
      durationKu: "پڕۆگرامی ٣ ساڵە",
      badge: "High Tech & Software",
      badgeKu: "تەکنەلۆژیا و سۆفتوێر",
      description: "Comprehensive 3-year diploma in modern software development, web engineering, cloud networks, cybersecurity, and artificial intelligence fundamentals.",
      descriptionKu: "پڕۆگرامی ٣ ساڵەی کرداری لە بواری گەشەپێدانی سۆفتوێر، وێب، تۆڕی هەوری، ئاسایشی سایبەر و زیرەکی دەستکرد بە شێوازی بازاڕی کار.",
      head: "Prof. Dr. Alan K. Rostam",
      studentsCount: 380,
      classes: [
        {
          code: "CS-101",
          title: "Full-Stack Web Engineering & JavaScript",
          titleKu: "ئەندازیاری وێبی هاوچەرخ و جاڤاسکریپت",
          year: "Year 1",
          credits: 4,
          lecturer: "Prof. Dr. Alan K. Rostam",
          schedule: "Sun & Tue 09:30 AM",
          room: "Tech Lab 101",
          videos: [
            { id: "vid-cs-1", title: "Introduction to Modern Frontend Architecture", date: "Oct 05, 2026", duration: "42 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { id: "vid-cs-2", title: "RESTful APIs and Database Integration", date: "Oct 08, 2026", duration: "55 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        },
        {
          code: "CS-202",
          title: "Database Architecture & SQL Systems",
          titleKu: "بیناسازی داتابەیس و سیستمەکانی SQL",
          year: "Year 2",
          credits: 4,
          lecturer: "Prof. Dr. Alan K. Rostam",
          schedule: "Mon & Wed 11:00 AM",
          room: "Database Center",
          videos: [
            { id: "vid-cs-3", title: "PostgreSQL Schema Design and Indexing", date: "Oct 07, 2026", duration: "48 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        }
      ]
    },
    {
      id: "accounting",
      name: "Accounting & Finance",
      nameKu: "ژمێریاری",
      code: "ACC",
      duration: "3-Year Program",
      durationKu: "پڕۆگرامی ٣ ساڵە",
      badge: "Financial Expertise",
      badgeKu: "شارەزایی دارایی و بانکی",
      description: "Practical accounting curriculum training students in international financial standards, digital ERP auditing, tax law, and financial reporting.",
      descriptionKu: "خوێندنی ژمێریاری بە پراکتیکی بە بەکارهێنانی نەرمەکاڵا داراییە پێشکەوتووەکان، وردبینی حسابی، باج و ڕاپۆرتی دارایی نێودەوڵەتی.",
      head: "Mr. Karwan Namiq, CPA",
      studentsCount: 320,
      classes: [
        {
          code: "ACC-101",
          title: "Financial Accounting & Ledger Principles",
          titleKu: "بنەماکانی ژمێریاری دارایی و دەفتەری ڕۆژنامە",
          year: "Year 1",
          credits: 4,
          lecturer: "Mr. Karwan Namiq",
          schedule: "Sun & Wed 08:30 AM",
          room: "Finance Hall 202",
          videos: [
            { id: "vid-acc-1", title: "Balance Sheet & Income Statement Preparation", date: "Oct 04, 2026", duration: "50 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        },
        {
          code: "ACC-203",
          title: "Corporate Tax Auditing & QuickBooks ERP",
          titleKu: "وردبینی باجی کۆمپانیاکان و سیستەمی کویک بووکس",
          year: "Year 2",
          credits: 3,
          lecturer: "Mr. Karwan Namiq",
          schedule: "Tue & Thu 10:00 AM",
          room: "ERP Lab 3",
          videos: [
            { id: "vid-acc-2", title: "Automated QuickBooks Inventory and Payroll", date: "Oct 09, 2026", duration: "44 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        }
      ]
    },
    {
      id: "design",
      name: "Design & Digital Arts",
      nameKu: "دیزاین",
      code: "DSGN",
      duration: "3-Year Program",
      durationKu: "پڕۆگرامی ٣ ساڵە",
      badge: "Creative Industries",
      badgeKu: "داهێنانی بینراو و دیزاین",
      description: "Covers user interface & product design (UI/UX), 3D visualization, brand identity systems, motion graphics, and spatial architectural design.",
      descriptionKu: "تایبەتە بە دیزاینی ڕووکاری ئەپڵیکەیشن و وێب (UI/UX)، مۆشن گرافیک، براندینگ و بەرنامە پێشکەوتووەکانی بینراو.",
      head: "Ms. Lana Shwan, M.Arch",
      studentsCount: 260,
      classes: [
        {
          code: "DSG-102",
          title: "UI/UX Design Systems & Figma Prototyping",
          titleKu: "سیستەمی دیزاینی UI/UX و پڕۆتۆتایپ بە فیگما",
          year: "Year 1",
          credits: 4,
          lecturer: "Ms. Lana Shwan",
          schedule: "Mon & Thu 09:00 AM",
          room: "Creative Studio A",
          videos: [
            { id: "vid-dsg-1", title: "Design Tokens & Responsive Layouts in Figma", date: "Oct 06, 2026", duration: "38 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        }
      ]
    },
    {
      id: "management",
      name: "Management & Business Administration",
      nameKu: "کارگێڕی",
      code: "MGMT",
      duration: "3-Year Program",
      durationKu: "پڕۆگرامی ٣ ساڵە",
      badge: "Leadership & Enterprise",
      badgeKu: "سەرکردایەتی و بازرگانی",
      description: "Develops future business leaders with competencies in organizational leadership, project management, digital marketing, and startup incubation.",
      descriptionKu: "پێگەیاندنی سەرکردەکانی کارگێڕی لە بەڕێوەبردنی پڕۆژە، بازاڕگەری دیجیتاڵی، سەرچاوە مرۆییەکان و ئابووری بازرگانی.",
      head: "Dr. Baban Jamal, MBA",
      studentsCount: 340,
      classes: [
        {
          code: "MGT-101",
          title: "Strategic Management & Agile Operations",
          titleKu: "کارگێڕی ستراتیژی و بەڕێوەبردنی پڕۆژەکان",
          year: "Year 1",
          credits: 4,
          lecturer: "Dr. Baban Jamal",
          schedule: "Sun & Tue 11:30 AM",
          room: "Hall Executive",
          videos: [
            { id: "vid-mgt-1", title: "Agile Scrum Methodology in Modern Enterprises", date: "Oct 08, 2026", duration: "46 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        }
      ]
    },
    {
      id: "english",
      name: "English Language & Applied Communication",
      nameKu: "زمانی ئینگلیزی",
      code: "ENG",
      duration: "3-Year Program",
      durationKu: "پڕۆگرامی ٣ ساڵە",
      badge: "Global Communication",
      badgeKu: "پەیوەندی نێودەوڵەتی و زمان",
      description: "Intensive 3-year curriculum in professional English communication, translation, public speaking, business correspondence, and technical writing.",
      descriptionKu: "فێربوونی پیشەیی زمانی ئینگلیزی بۆ کار، وەرگێڕان، نوسینی نێودەوڵەتی و وتاردانی بازرگانی بۆ کەرتی تایبەت و ڕێکخراوەکان.",
      head: "Ms. Darya Salih, MA Applied Linguistics",
      studentsCount: 290,
      classes: [
        {
          code: "ENG-105",
          title: "Professional Business English & Public Speaking",
          titleKu: "ئینگلیزی کارگێڕی پیشەیی و وتاردان",
          year: "Year 1",
          credits: 3,
          lecturer: "Ms. Darya Salih",
          schedule: "Mon & Wed 01:00 PM",
          room: "Language Lab 102",
          videos: [
            { id: "vid-eng-1", title: "Mastering Executive Presentations & Email Protocols", date: "Oct 09, 2026", duration: "40 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        }
      ]
    },
    {
      id: "construction",
      name: "Construction & Civil Technology",
      nameKu: "بیناکاری",
      code: "CONST",
      duration: "3-Year Program",
      durationKu: "پڕۆگرامی ٣ ساڵە",
      badge: "Engineering & Infrastructure",
      badgeKu: "ئەندازیاری و ژێرخان",
      description: "Hands-on construction and surveying program covering AutoCAD drafting, structural materials, site inspection, and building information modeling (BIM).",
      descriptionKu: "تایبەتە بە ئەندازیاری بیناکاری، کێشانی نەخشە بە ئۆتۆکاد، سەردانی مەیدانی، پێوانەکردن و تەکنەلۆژیای بیناسازی مۆدێرن.",
      head: "Eng. Zana Faruq, Structural Lead",
      studentsCount: 210,
      classes: [
        {
          code: "CST-101",
          title: "AutoCAD 3D & Structural Drafting",
          titleKu: "نەخشەکێشانی بینا بە ئۆتۆکادی سێ ڕەهەندی",
          year: "Year 1",
          credits: 4,
          lecturer: "Eng. Zana Faruq",
          schedule: "Tue & Thu 08:30 AM",
          room: "Civil Drafting Studio",
          videos: [
            { id: "vid-cst-1", title: "Site Foundation Layout and Reinforcement Detailing", date: "Oct 03, 2026", duration: "52 min", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
          ]
        }
      ]
    }
  ],

  // Public Campus Videos & Official Admin Announcements (Managed ONLY by Admin)
  publicVideos: [],

  // Prospective Student Enrollment Applications (Submitted publicly, reviewed by Admin)
  enrollmentApplications: [],

  // Registered Students Database (Admin creates accounts and issues IDs)
  students: [],

  // Registered Faculty & Teachers Database (Admin creates accounts and issues IDs)
  teachers: [],

  // Registered Administrators Database
  admins: [
    {
      id: "CIS-ADM-01",
      name: "Zhiyar (Central Admin)",
      nameKu: "ژیار (ئەدمینی گشتی)",
      avatar: "ZA",
      role: "System Administrator",
      roleKu: "سەرپەرشتیاری گشتی سیستەم",
      department: "College Administration",
      departmentId: "admin",
      email: "xxx505058@gmail.com",
      dateCreated: "Oct 11, 2026"
    }
  ],

  // Admin Account (Superuser session reference)
  admin: {
    id: "CIS-ADM-01",
    name: "Zhiyar (Central Admin)",
    nameKu: "ژیار (ئەدمینی گشتی)",
    avatar: "ZA",
    role: "System Administrator",
    roleKu: "سەرپەرشتیاری گشتی سیستەم",
    email: "xxx505058@gmail.com"
  },

  // Job Opportunities & Career Board (Managed by Admin & Teachers)
  jobs: [],

  // Central Communication & Direct Messaging Repository (Contact & Messaging Hub)
  messages: [],

  // Course Lecture Notes, PDFs & Learning Materials (Managed by Teachers & Admin)
  materials: [],

  // Course Homework & Assignments (Managed by Teachers & Submitted by Students)
  assignments: []
};
