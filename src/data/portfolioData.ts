import {
  Profile,
  Socials,
  TimelineItem,
  HeroAchievement,
  AchievementStat,
  SecondaryAchievement,
  MediaRecognition,
  AchievementFlowStep,
  Project,
  Business,
  Experience,
  Education,
  Skills,
  Recognition,
  BusinessTechFlowStep
} from '../types';

export const PROFILE: Profile = {
  fullName: "Muhammed Ansab Thalappil",
  location: "Malappuram, Kerala, India",
  professionalIdentity: [
    "AI & Data Science Student",
    "Programmer",
    "Developer",
    "Entrepreneur",
    "Aspiring AI Engineer & Innovator"
  ],
  brandLine: "Let's turn ideas into reality!!",
  coreBrand: "BUILDING IDEAS INTO REALITY.",
  heroStatement: "I don't just learn technology. I build with it.",
  philosophy: "Skills create opportunities.",
  mission: "I want to grow into an AI engineer and innovator, creating solutions that make life easier and proving that consistency and skills matter more than labels.",
  aboutStory: [
    "From building projects to building businesses, my journey is driven by one belief: skills create opportunities.",
    "I am Muhammed Ansab Thalappil, an AI & Data Science student, programmer, and entrepreneur passionate about turning ideas into impact.",
    "My journey is driven by curiosity, experimentation and a desire to solve real-world problems through technology.",
    "I’m particularly interested in Artificial Intelligence, Machine Learning, Data Science and software development.",
    "Beyond academics and technology projects, I am also involved in building businesses, giving me an opportunity to understand both technology and practical markets.",
    "My long-term mission is to become an AI engineer and innovator who creates useful technology and meaningful solutions."
  ],
  identityCards: [
    {
      number: "01",
      title: "AI & DATA SCIENCE",
      tags: ["Artificial Intelligence", "Machine Learning", "Data Science"],
      description: "Exploring algorithms, predictive models, machine vision, and intelligent decision-making systems."
    },
    {
      number: "02",
      title: "SOFTWARE DEVELOPMENT",
      tags: ["Programming", "Flutter", "Web Development"],
      description: "Crafting scalable web applications, modern mobile user experiences, and clean modular codebases."
    },
    {
      number: "03",
      title: "ENTREPRENEURSHIP",
      tags: ["Business", "Product Development", "Innovation"],
      description: "Translating technical skills into practical commercial products, brand building, and international trade."
    }
  ]
};

export const SOCIALS: Socials = {
  linkedin: "https://www.linkedin.com/in/muhammed-ansab-thalappil-953820278/",
  github: "https://github.com/",
  email: "mailto:ansabthalappil@gmail.com",
  location: "Malappuram, Kerala, India"
};

export const TIMELINE: TimelineItem[] = [
  {
    step: "01",
    title: "EDUCATION",
    subtitle: "Technical Higher Secondary School",
    description: "Built strong foundation in science, computer fundamentals, and analytical reasoning at Model Technical Higher Secondary School — IHRD.",
    badge: "Foundation"
  },
  {
    step: "02",
    title: "TECHNOLOGY PROJECTS",
    subtitle: "First Code & Hardware Experiments",
    description: "Explored Python programming, Raspberry Pi embedded systems, web technologies, and practical hardware-software integration.",
    badge: "Exploration"
  },
  {
    step: "03",
    title: "INSPIRE AWARD — MANAK",
    subtitle: "Government of India Recognition",
    description: "Awarded by the Government of India for conceptualizing and developing a Machine Learning-Based Smart Attendance System.",
    badge: "National Award"
  },
  {
    step: "04",
    title: "SOFTWARE INTERNSHIP",
    subtitle: "Cyra Learnings — Flutter Trainee",
    description: "Completed a 7-month Software Trainee internship working on production mobile applications, teamwork, and client deliverables.",
    badge: "Industry Experience"
  },
  {
    step: "05",
    title: "B.TECH AI & DATA SCIENCE",
    subtitle: "KMCT Engineering College",
    description: "Pursuing Bachelor of Technology in Artificial Intelligence & Data Science to master modern ML architectures and data engineering.",
    badge: "Current Degree"
  },
  {
    step: "06",
    title: "ENTREPRENEURSHIP",
    subtitle: "Building Motherbits, King Day & Zoltiq",
    description: "Co-founded Motherbits Technologies LLP, established King Day kids e-commerce, and launched Zoltiq international trade brand.",
    badge: "Venture Building"
  },
  {
    step: "07",
    title: "AI ENGINEERING",
    subtitle: "Future Horizon & Innovation",
    description: "Advancing toward creating intelligent products, high-impact AI systems, and scaling technology enterprises globally.",
    badge: "Long-term Goal"
  }
];

export const HERO_ACHIEVEMENT: HeroAchievement = {
  id: "converge-2026",
  title: "CONVERGE 2026",
  subtitle: "FUTURE TECH SUMMIT · REVERSE PITCH COMPETITION",
  badge: "🥇 1ST PRIZE",
  prize: "₹25,000",
  journeyText: "43 TEAMS → TOP 6 → 1ST PRIZE",
  wording: "Our team secured 1st Prize and ₹25,000 at the CONVERGE 2026 Reverse Pitch Competition.",
  teamMembers: [
    "Abraham Jolly",
    "Muhammed Ansab Thalappil",
    "Muhammad Finan",
    "Parvathi Sreejith"
  ],
  image: "/assets/converge.jpg",
  storyTeaser: "Two weeks. Countless practice sessions. One unforgettable moment.",
  storyFull: "There were days when college ended at 1:45 PM, but our journey didn’t. We stayed back until evening, refining our idea, practicing every word, and believing that the effort would be worth it.\n\nFrom 43 teams to the Top 6, and finally 1st Prize at the CONVERGE 2026 Reverse Pitch Competition.\n\nEvery late evening, every discussion and every improvement brought the team one step closer to this moment.\n\nSometimes, success isn’t about being the smartest team. It’s about being the team that refuses to stop improving."
};

export const ACHIEVEMENT_STATS: AchievementStat[] = [
  { value: "43", label: "TEAMS COMPETED" },
  { value: "TOP 6", label: "FINALISTS SELECTED" },
  { value: "🥇 1ST", label: "PRIZE WINNERS" },
  { value: "₹25K", label: "CASH AWARD" }
];

export const SECONDARY_ACHIEVEMENTS: SecondaryAchievement[] = [
  {
    id: "inspire-award",
    title: "INSPIRE AWARD — MANAK",
    issuer: "Government of India",
    subtitle: "Machine Learning-Based Smart Attendance System",
    description: "Recognition for developing a machine learning-based smart attendance system and exploring the practical application of technology to real-world problems.",
    tags: ["Government of India", "Machine Learning", "Smart Attendance"]
  },
  {
    id: "nit-calicut",
    title: "NIT CALICUT",
    issuer: "National Institute of Technology Calicut",
    subtitle: "INNOVATION & ENTREPRENEURSHIP PROGRAM",
    description: "Participated in an Innovation and Entrepreneurship training program at NIT Calicut, gaining exposure to innovation, entrepreneurship and idea development.",
    tags: ["NIT Calicut", "Innovation", "Entrepreneurship"]
  }
];

export const MEDIA_RECOGNITION: MediaRecognition = {
  title: "MEDIA RECOGNITION",
  newspaper: "Mangalam Kozhikode Edition",
  date: "April 27, 2026",
  page: "Page No. 7",
  caption: "KOZHIKODE EDITION · APR 27, 2026",
  description: "Media recognition for innovation and entrepreneurship achievement.",
  image: "/assets/recognition/newspaper.jpg"
};

export const ACHIEVEMENT_FLOW_TIMELINE: AchievementFlowStep[] = [
  {
    step: "01",
    title: "INSPIRE AWARD — MANAK",
    category: "AI / MACHINE LEARNING",
    badge: "Govt of India"
  },
  {
    step: "02",
    title: "NIT CALICUT",
    category: "INNOVATION & ENTREPRENEURSHIP",
    badge: "NIT Program"
  },
  {
    step: "03",
    title: "CONVERGE 2026",
    category: "REVERSE PITCH COMPETITION",
    badge: "Reverse Pitch"
  },
  {
    step: "04",
    title: "🥇 1ST PRIZE",
    category: "₹25,000 TEAM WIN",
    badge: "Champion"
  }
];

export const FEATURED_PROJECT: Project = {
  id: "smart-attendance",
  number: "PROJECT 01",
  name: "AI-POWERED SMART ATTENDANCE SYSTEM",
  category: "Machine Learning • Computer Vision • Python",
  description: "An AI-powered smart attendance system developed under the INSPIRE Award – MANAK (Government of India). The project uses Machine Learning and Computer Vision to automate attendance management, eliminating manual check-ins through intelligent pattern recognition.",
  highlights: [
    "🏆 INSPIRE Award – MANAK",
    "₹10,000 Innovation Grant",
    "Machine Learning",
    "Computer Vision"
  ],
  technologies: ["Python", "Machine Learning", "Computer Vision", "OpenCV"],
  image: "/assets/projects/smart-attendance.jpg",
  viewUrl: "#achievement",
  githubUrl: "https://github.com/",
  isFeatured: true
};

export const EXTRA_PROJECTS: Project[] = [
  {
    id: "flutter-mobile-app",
    number: "PROJECT 02",
    name: "FLUTTER & E-COMMERCE SOLUTIONS",
    category: "Mobile Application Development",
    description: "Built multiple Flutter applications and e-commerce solutions during my internship at Cyra Learnings, including responsive UI, API integration, authentication and modern mobile experiences.",
    technologies: ["Flutter", "Dart", "REST API", "Firebase"],
    viewUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "embedded-raspi-iot",
    number: "PROJECT 03",
    name: "RASPBERRY PI SMART MONITORING SYSTEM",
    category: "Embedded Systems & Hardware",
    description: "Designed a Raspberry Pi-based monitoring system using sensors and Python for real-time monitoring and automation.",
    technologies: ["Raspberry Pi", "Python", "Sensors", "Linux"],
    viewUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "data-analytics-dashboard",
    number: "PROJECT 04",
    name: "AI & DATA SCIENCE EXPLORER",
    category: "Data Science & Visualization",
    description: "Interactive platform for dataset visualization, SQL analysis and machine learning insights.",
    technologies: ["Python", "SQL", "HTML", "CSS", "JavaScript"],
    viewUrl: "#",
    githubUrl: "https://github.com/"
  }
];

export const BUSINESSES: Business[] = [
  {
    id: "motherbits",
    number: "BUSINESS 01",
    name: "MOTHERBITS TECHNOLOGIES LLP",
    role: "CO-FOUNDER",
    category: "TECH INNOVATION · PRODUCT R&D",
    shortDesc: "Tech innovation platform exploring digital products, R&D, and kids' electric ride-on systems.",
    description: "MOTHERBITS TECHNOLOGIES LLP is the business platform through which I explore the intersection of technology, products and entrepreneurship. Focused on tech innovation, digital products, and kids' electric ride-on systems.",
    image: "/assets/business/motherbits.jpg",
    tags: ["Tech Platform", "Product R&D", "Co-Founder"]
  },
  {
    id: "kingday",
    number: "BUSINESS 02",
    name: "KING DAY",
    role: "FOUNDER",
    category: "KIDS RIDE-ONS · E-COMMERCE",
    shortDesc: "Premium kids' recreation brand specializing in electric ride-ons, toys, cycles, and e-commerce.",
    description: "King Day is a kids' products brand focused on electric ride-ons, toys, cycles and related products. Delivering high-quality premium recreation products for modern families.",
    image: "/assets/business/kingday.jpg",
    tags: ["Electric Ride-ons", "Toys & Cycles", "E-Commerce"],
    website: "https://kingday.in",
    instagram: "https://instagram.com/"
  },
  {
    id: "zoltiq",
    number: "BUSINESS 03",
    name: "ZOLTIQ",
    role: "FOUNDER",
    category: "GLOBAL TRADE · IMPORT / EXPORT",
    shortDesc: "International trade brand focused on product sourcing, global commerce, and regional supply chain.",
    description: "ZOLTIQ is an import-export brand focused on product sourcing, international trade and market opportunities. Bridging global manufacturers with growing regional distribution channels.",
    image: "/assets/business/zoltiq.jpg",
    tags: ["Global Sourcing", "International Trade", "Logistics"]
  }
];

export const EXPERIENCE: Experience = {
  company: "CYRA LEARNINGS",
  position: "SOFTWARE TRAINEE / FLUTTER INTERN",
  duration: "June 2024 — December 2024",
  length: "7 MONTHS",
  location: "India",
  paragraphs: [
    "During my Software Trainee internship in Flutter at Cyra Learnings, I had the opportunity to work on real projects, collaborate with a talented team, and strengthen my skills in mobile application development.",
    "The experience taught me the importance of hard work, professionalism, teamwork and delivering results. Every challenge helped me grow as a developer, problem-solver and learner."
  ],
  mentorship: "Special appreciation to my mentor, Umer Multhar, for guiding me throughout the internship and helping me sharpen my skills.",
  skillsHighlighted: [
    "Flutter",
    "Mobile App Development",
    "Team Collaboration",
    "Problem Solving",
    "Professionalism"
  ]
};

export const EDUCATION: Education[] = [
  {
    degree: "BACHELOR OF TECHNOLOGY",
    field: "ARTIFICIAL INTELLIGENCE & DATA SCIENCE",
    institution: "KMCT Engineering College, Manassery",
    status: "Currently Pursuing",
    badge: "Current Undergraduate Degree"
  },
  {
    degree: "HIGHER SECONDARY EDUCATION",
    field: "SCIENCE & COMPUTER TECHNOLOGY",
    institution: "MODEL TECHNICAL HIGHER SECONDARY SCHOOL — IHRD",
    status: "Completed",
    badge: "Technical High School Foundation"
  }
];

export const SKILLS: Skills = {
  programming: ["C", "C++", "Python"],
  development: ["Flutter", "HTML", "CSS", "React"],
  dataAi: ["Artificial Intelligence", "Machine Learning", "Data Science"],
  database: ["SQL"],
  hardware: ["Raspberry Pi"],
  professional: ["Entrepreneurship", "Problem Solving", "Teamwork", "Innovation"]
};

export const RECOGNITIONS: Recognition[] = [
  {
    title: "INSPIRE AWARD — MANAK",
    issuer: "Government of India",
    type: "National Innovation Award",
    description: "Awarded for Machine Learning-Based Smart Attendance System innovation."
  },
  {
    title: "ADVANCED AIRCRAFT DESIGN WORKSHOP",
    issuer: "Technical Aeronautics Workshop",
    type: "Engineering Workshop Certification",
    description: "Hands-on technical workshop on aircraft aerodynamic principles, structural design, and aviation mechanics."
  }
];

export const BUSINESS_TECH_FLOW: BusinessTechFlowStep[] = [
  { step: "01", name: "AI & DATA SCIENCE", icon: "Brain" },
  { step: "02", name: "TECHNOLOGY", icon: "Cpu" },
  { step: "03", name: "PROJECTS", icon: "Code" },
  { step: "04", name: "PRODUCTS", icon: "Package" },
  { step: "05", name: "BUSINESS", icon: "TrendingUp" }
];

export const CURRENTLY_EXPLORING: string[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Software Development",
  "Entrepreneurship",
  "Real-World Product Building"
];
