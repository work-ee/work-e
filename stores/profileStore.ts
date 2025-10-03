import { create } from "zustand";

import { getCurrentUser } from "@/actions/server/user";
import { ProfileState } from "@/types/profile";

export const useProfileStore = create<ProfileState>((set) => ({
  isProfileLoading: true,
  profile: {},

  setProfile: (profile) =>
    set((state) => ({
      profile: { ...state.profile, ...profile },
    })),

  updatePersonalInfo: (info) =>
    set((state) => ({
      profile: {
        ...state.profile,
        personalInfo: { ...state.profile.personalInfo, ...info },
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      profile: {
        ...state.profile,
        experience: [...(state.profile.experience || []), exp],
      },
    })),

  updateExperience: (index, exp) =>
    set((state) => {
      const experience = state.profile.experience ? [...state.profile.experience] : [];
      experience[index] = { ...experience[index], ...exp };
      return {
        profile: { ...state.profile, experience },
      };
    }),

  removeExperience: (index) =>
    set((state) => ({
      profile: {
        ...state.profile,
        experience: (state.profile.experience || []).filter((_, i) => i !== index),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      profile: {
        ...state.profile,
        education: [...(state.profile.education || []), edu],
      },
    })),

  updateEducation: (index, edu) =>
    set((state) => {
      const education = state.profile.education ? [...state.profile.education] : [];
      education[index] = { ...education[index], ...edu };
      return {
        profile: { ...state.profile, education },
      };
    }),

  removeEducation: (index) =>
    set((state) => ({
      profile: {
        ...state.profile,
        education: (state.profile.education || []).filter((_, i) => i !== index),
      },
    })),

  addCourse: (course) =>
    set((state) => ({
      profile: {
        ...state.profile,
        courses: [...(state.profile.courses || []), course],
      },
    })),

  updateCourse: (index, course) =>
    set((state) => {
      const courses = state.profile.courses ? [...state.profile.courses] : [];
      courses[index] = { ...courses[index], ...course };
      return {
        profile: { ...state.profile, courses },
      };
    }),

  removeCourse: (index) =>
    set((state) => ({
      profile: {
        ...state.profile,
        courses: (state.profile.courses || []).filter((_, i) => i !== index),
      },
    })),

  setProgrammingLanguages: (langs) =>
    set((state) => ({
      profile: {
        ...state.profile,
        programmingLanguages: langs,
      },
    })),

  setSkills: (skills) =>
    set((state) => ({
      profile: {
        ...state.profile,
        skills,
      },
    })),

  addForeignLanguage: (lang) =>
    set((state) => ({
      profile: {
        ...state.profile,
        foreignLanguages: [...(state.profile.foreignLanguages || []), lang],
      },
    })),

  updateForeignLanguage: (index, lang) =>
    set((state) => {
      const langs = state.profile.foreignLanguages ? [...state.profile.foreignLanguages] : [];
      langs[index] = { ...langs[index], ...lang };
      return {
        profile: { ...state.profile, foreignLanguages: langs },
      };
    }),

  removeForeignLanguage: (index) =>
    set((state) => ({
      profile: {
        ...state.profile,
        foreignLanguages: (state.profile.foreignLanguages || []).filter((_, i) => i !== index),
      },
    })),

  setHobbies: (hobbies) =>
    set((state) => ({
      profile: {
        ...state.profile,
        hobbies,
      },
    })),

  setMotivationLetter: (text) =>
    set((state) => ({
      profile: {
        ...state.profile,
        motivationLetter: text,
      },
    })),

  setLinkedin: (url) =>
    set((state) => ({
      profile: {
        ...state.profile,
        linkedin: url,
      },
    })),

  setGithub: (url) =>
    set((state) => ({
      profile: {
        ...state.profile,
        github: url,
      },
    })),

  setIp: (ip) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ip,
      },
    })),

  setUserAgent: (ua) =>
    set((state) => ({
      profile: {
        ...state.profile,
        userAgent: ua,
      },
    })),

  fetchCurrentUser: async () => {
    set({ isProfileLoading: true });
    try {
      const user = await getCurrentUser();
      if (user) {
        const profileData = {
          personalInfo: {
            id: user.data?.id || 0,
            firstName: user.data?.first_name || "",
            lastName: user.data?.last_name || "",
            email: user.data?.email || "",
            avatarUrl: user.data?.avatar_url || "",
            linkedinUrl: user.data?.linkedin || "",
            desiredPosition: user.data?.desired_position || "",
            phone: user.data?.phone || "",
            country: user.data?.country || "",
            city: user.data?.city || "",
          },
          overview: user.data?.overview,
          experience: user.data?.experience ? JSON.parse(user.data.experience) : [],
          education: user.data?.education ? JSON.parse(user.data.education) : [],
          courses: user.data?.courses ? JSON.parse(user.data.courses) : [],
          programmingLanguages: user.data?.programming_languages?.split(", ") || [],
          skills: user.data?.skills?.split(", ") || [],
          foreignLanguages: user.data?.foreign_languages ? JSON.parse(user.data.foreign_languages) : [],
          hobbies: user.data?.hobbies,
          motivationLetter: user.data?.motivation_letter,
          linkedin: user.data?.linkedin,
          github: user.data?.github,
          ip: user.data?.ip,
          userAgent: user.data?.userAgent,
        };

        set({
          profile: profileData,
          isProfileLoading: false,
        });
      } else {
        set({ isProfileLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      set({ isProfileLoading: false });
    }
  },
}));
