export interface Profile {
  fullName: string;
  location: string;
  professionalIdentity: string[];
  brandLine: string;
  coreBrand: string;
  heroStatement: string;
  philosophy: string;
  mission: string;
  aboutStory: string[];
  identityCards: {
    number: string;
    title: string;
    tags: string[];
    description: string;
  }[];
}

export interface Socials {
  linkedin: string;
  github: string;
  email: string;
  location: string;
}

export interface TimelineItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export interface HeroAchievement {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  prize: string;
  journeyText: string;
  wording: string;
  teamMembers: string[];
  image: string;
  storyTeaser: string;
  storyFull: string;
}

export interface AchievementStat {
  value: string;
  label: string;
}

export interface SecondaryAchievement {
  id: string;
  title: string;
  issuer: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface MediaRecognition {
  title: string;
  newspaper: string;
  date: string;
  page: string;
  caption: string;
  description: string;
  image: string;
}

export interface AchievementFlowStep {
  step: string;
  title: string;
  category: string;
  badge: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  image?: string;
  viewUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
}

export interface Business {
  id: string;
  number: string;
  name: string;
  role: string;
  category: string;
  shortDesc: string;
  description: string;
  image: string;
  tags: string[];
  website?: string;
  instagram?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  length: string;
  location: string;
  paragraphs: string[];
  mentorship: string;
  skillsHighlighted: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  status: string;
  badge: string;
}

export interface Skills {
  programming: string[];
  development: string[];
  dataAi: string[];
  database: string[];
  hardware: string[];
  professional: string[];
}

export interface Recognition {
  title: string;
  issuer: string;
  type: string;
  description: string;
}

export interface BusinessTechFlowStep {
  step: string;
  name: string;
  icon: string;
}
