import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PROFILE as DEFAULT_PROFILE,
  SOCIALS as DEFAULT_SOCIALS,
  TIMELINE as DEFAULT_TIMELINE,
  HERO_ACHIEVEMENT as DEFAULT_HERO_ACHIEVEMENT,
  ACHIEVEMENT_STATS as DEFAULT_ACHIEVEMENT_STATS,
  SECONDARY_ACHIEVEMENTS as DEFAULT_SECONDARY_ACHIEVEMENTS,
  MEDIA_RECOGNITION as DEFAULT_MEDIA_RECOGNITION,
  ACHIEVEMENT_FLOW_TIMELINE as DEFAULT_ACHIEVEMENT_FLOW,
  FEATURED_PROJECT as DEFAULT_FEATURED_PROJECT,
  EXTRA_PROJECTS as DEFAULT_EXTRA_PROJECTS,
  BUSINESSES as DEFAULT_BUSINESSES,
  EXPERIENCE as DEFAULT_EXPERIENCE,
  EDUCATION as DEFAULT_EDUCATION,
  SKILLS as DEFAULT_SKILLS,
  RECOGNITIONS as DEFAULT_RECOGNITIONS,
  CURRENTLY_EXPLORING as DEFAULT_CURRENTLY_EXPLORING,
} from '../data/portfolioData';
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
} from '../types';
import { fetchPublishedPortfolioData, isSupabaseConfigured } from '../services/supabase';

export interface WebsiteSettings {
  siteTitle: string;
  metaDescription: string;
  heroTagline: string;
  footerText: string;
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  siteTitle: 'Muhammed Ansab — Building Ideas Into Reality',
  metaDescription: 'Official Personal Portfolio of Muhammed Ansab Thalappil — AI & Data Science Student, Programmer, Developer, Entrepreneur & Innovator.',
  heroTagline: 'BUILDING IDEAS INTO REALITY.',
  footerText: '© 2026 Muhammed Ansab Thalappil. Built with high precision.',
};

interface PortfolioContextType {
  profile: Profile;
  socials: Socials;
  timeline: TimelineItem[];
  heroAchievement: HeroAchievement;
  achievementStats: AchievementStat[];
  secondaryAchievements: SecondaryAchievement[];
  mediaRecognition: MediaRecognition;
  achievementFlowSteps: AchievementFlowStep[];
  featuredProject: Project;
  extraProjects: Project[];
  allProjects: Project[];
  businesses: Business[];
  experience: Experience;
  education: Education[];
  skills: Skills;
  recognitions: Recognition[];
  currentlyExploring: string[];
  websiteSettings: WebsiteSettings;
  isLoading: boolean;
  isLiveConnected: boolean;
  refreshData: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => void;
  updateSocials: (socials: Partial<Socials>) => void;
  updateProjects: (projects: Project[]) => void;
  updateBusinesses: (businesses: Business[]) => void;
  updateAchievements: (hero: HeroAchievement, secondaries: SecondaryAchievement[]) => void;
  updateExperience: (exp: Experience) => void;
  updateEducation: (edu: Education[]) => void;
  updateSkills: (skills: Skills) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [socials, setSocials] = useState<Socials>(DEFAULT_SOCIALS);
  const [timeline, setTimeline] = useState<TimelineItem[]>(DEFAULT_TIMELINE);
  const [heroAchievement, setHeroAchievement] = useState<HeroAchievement>(DEFAULT_HERO_ACHIEVEMENT);
  const [achievementStats, setAchievementStats] = useState<AchievementStat[]>(DEFAULT_ACHIEVEMENT_STATS);
  const [secondaryAchievements, setSecondaryAchievements] = useState<SecondaryAchievement[]>(DEFAULT_SECONDARY_ACHIEVEMENTS);
  const [mediaRecognition, setMediaRecognition] = useState<MediaRecognition>(DEFAULT_MEDIA_RECOGNITION);
  const [achievementFlowSteps, setAchievementFlowSteps] = useState<AchievementFlowStep[]>(DEFAULT_ACHIEVEMENT_FLOW);
  const [allProjects, setAllProjects] = useState<Project[]>([DEFAULT_FEATURED_PROJECT, ...DEFAULT_EXTRA_PROJECTS]);
  const [businesses, setBusinesses] = useState<Business[]>(DEFAULT_BUSINESSES);
  const [experience, setExperience] = useState<Experience>(DEFAULT_EXPERIENCE);
  const [education, setEducation] = useState<Education[]>(DEFAULT_EDUCATION);
  const [skills, setSkills] = useState<Skills>(DEFAULT_SKILLS);
  const [recognitions, setRecognitions] = useState<Recognition[]>(DEFAULT_RECOGNITIONS);
  const [currentlyExploring, setCurrentlyExploring] = useState<string[]>(DEFAULT_CURRENTLY_EXPLORING);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(DEFAULT_SETTINGS);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(isSupabaseConfigured);

  const featuredProject = allProjects.find(p => p.isFeatured) || allProjects[0] || DEFAULT_FEATURED_PROJECT;
  const extraProjects = allProjects.filter(p => p.id !== featuredProject.id);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPublishedPortfolioData();
      if (data) {
        setIsLiveConnected(true);
        if (data.profile) {
          setProfile(prev => ({
            ...prev,
            fullName: data.profile.full_name || prev.fullName,
            location: data.profile.location || prev.location,
            professionalIdentity: data.profile.professional_identity || prev.professionalIdentity,
            brandLine: data.profile.brand_line || prev.brandLine,
            coreBrand: data.profile.core_brand || prev.coreBrand,
            heroStatement: data.profile.hero_statement || prev.heroStatement,
            philosophy: data.profile.philosophy || prev.philosophy,
            mission: data.profile.mission || prev.mission,
            aboutStory: data.profile.about_story || prev.aboutStory,
            identityCards: data.profile.identity_cards || prev.identityCards,
          }));
        }
        if (data.socials) {
          setSocials(prev => ({
            ...prev,
            linkedin: data.socials.linkedin || prev.linkedin,
            github: data.socials.github || prev.github,
            email: data.socials.email || prev.email,
            location: data.socials.location || prev.location,
          }));
        }
        if (data.timeline && data.timeline.length > 0) {
          setTimeline(data.timeline.map((t: any) => ({
            step: t.step,
            title: t.title,
            subtitle: t.subtitle,
            description: t.description,
            badge: t.badge,
          })));
        }
        if (data.heroAchievement) {
          setHeroAchievement(prev => ({
            ...prev,
            title: data.heroAchievement.title || prev.title,
            subtitle: data.heroAchievement.subtitle || prev.subtitle,
            badge: data.heroAchievement.badge || prev.badge,
            prize: data.heroAchievement.prize || prev.prize,
            journeyText: data.heroAchievement.journey_text || prev.journeyText,
            wording: data.heroAchievement.wording || prev.wording,
            teamMembers: data.heroAchievement.team_members || prev.teamMembers,
            image: data.heroAchievement.image || prev.image,
            storyTeaser: data.heroAchievement.story_teaser || prev.storyTeaser,
            storyFull: data.heroAchievement.story_full || prev.storyFull,
          }));
        }
        if (data.achievementStats && data.achievementStats.length > 0) {
          setAchievementStats(data.achievementStats);
        }
        if (data.secondaryAchievements && data.secondaryAchievements.length > 0) {
          setSecondaryAchievements(data.secondaryAchievements.map((s: any) => ({
            id: s.slug || s.id,
            title: s.title,
            issuer: s.issuer,
            subtitle: s.subtitle,
            description: s.description,
            tags: s.tags || [],
          })));
        }
        if (data.mediaRecognition) {
          setMediaRecognition(prev => ({
            ...prev,
            title: data.mediaRecognition.title || prev.title,
            newspaper: data.mediaRecognition.newspaper || prev.newspaper,
            date: data.mediaRecognition.date || prev.date,
            page: data.mediaRecognition.page || prev.page,
            caption: data.mediaRecognition.caption || prev.caption,
            description: data.mediaRecognition.description || prev.description,
            image: data.mediaRecognition.image || prev.image,
          }));
        }
        if (data.projects && data.projects.length > 0) {
          setAllProjects(data.projects.map((p: any) => ({
            id: p.slug || p.id,
            number: p.number,
            name: p.name,
            category: p.category,
            description: p.description,
            highlights: p.highlights || [],
            technologies: p.technologies || [],
            image: p.image,
            viewUrl: p.view_url,
            githubUrl: p.github_url,
            isFeatured: Boolean(p.is_featured),
          })));
        }
        if (data.businesses && data.businesses.length > 0) {
          setBusinesses(data.businesses.map((b: any) => ({
            id: b.slug || b.id,
            number: b.number,
            name: b.name,
            role: b.role,
            category: b.category,
            shortDesc: b.short_desc,
            description: b.description,
            image: b.image,
            tags: b.tags || [],
            website: b.website,
            instagram: b.instagram,
          })));
        }
        if (data.experience) {
          setExperience({
            company: data.experience.company,
            position: data.experience.position,
            duration: data.experience.duration,
            length: data.experience.length,
            location: data.experience.location,
            paragraphs: data.experience.paragraphs || [],
            mentorship: data.experience.mentorship || '',
            skillsHighlighted: data.experience.skills_highlighted || [],
          });
        }
        if (data.education && data.education.length > 0) {
          setEducation(data.education);
        }
        if (data.skills && data.skills.length > 0) {
          const categorizedSkills: Skills = {
            programming: [],
            development: [],
            dataAi: [],
            database: [],
            hardware: [],
            professional: [],
          };
          for (const s of data.skills) {
            const cat = s.category as keyof Skills;
            if (categorizedSkills[cat]) {
              categorizedSkills[cat].push(s.name);
            }
          }
          setSkills(categorizedSkills);
        }
        if (data.websiteSettings) {
          setWebsiteSettings({
            siteTitle: data.websiteSettings.site_title || DEFAULT_SETTINGS.siteTitle,
            metaDescription: data.websiteSettings.meta_description || DEFAULT_SETTINGS.metaDescription,
            heroTagline: data.websiteSettings.hero_tagline || DEFAULT_SETTINGS.heroTagline,
            footerText: data.websiteSettings.footer_text || DEFAULT_SETTINGS.footerText,
          });
        }
      }
    } catch (err) {
      console.warn('Could not sync with Supabase, staying on verified current data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateProfile = (updated: Partial<Profile>) => setProfile(prev => ({ ...prev, ...updated }));
  const updateSocials = (updated: Partial<Socials>) => setSocials(prev => ({ ...prev, ...updated }));
  const updateProjects = (projects: Project[]) => setAllProjects(projects);
  const updateBusinesses = (biz: Business[]) => setBusinesses(biz);
  const updateAchievements = (hero: HeroAchievement, secondaries: SecondaryAchievement[]) => {
    setHeroAchievement(hero);
    setSecondaryAchievements(secondaries);
  };
  const updateExperience = (exp: Experience) => setExperience(exp);
  const updateEducation = (edu: Education[]) => setEducation(edu);
  const updateSkills = (sk: Skills) => setSkills(sk);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        socials,
        timeline,
        heroAchievement,
        achievementStats,
        secondaryAchievements,
        mediaRecognition,
        achievementFlowSteps,
        featuredProject,
        extraProjects,
        allProjects,
        businesses,
        experience,
        education,
        skills,
        recognitions,
        currentlyExploring,
        websiteSettings,
        isLoading,
        isLiveConnected,
        refreshData,
        updateProfile,
        updateSocials,
        updateProjects,
        updateBusinesses,
        updateAchievements,
        updateExperience,
        updateEducation,
        updateSkills,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
