export interface PersonalInfo {
  id?: number;
  desiredPosition?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
}

export interface Experience {
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  specialization?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Course {
  specialization?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Language {
  name?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native";
}

export interface UserProfile {
  personalInfo?: PersonalInfo;
  overview?: string;
  experience?: Experience[];
  education?: Education[];
  courses?: Course[];
  programmingLanguages?: string[];
  skills?: string[];
  foreignLanguages?: Language[];
  hobbies?: string;
  motivationLetter?: string;
  linkedin?: string;
  github?: string;

  ip?: string;
}

interface ProfileState {
  isProfileLoading: boolean;
  profile: UserProfile;

  setProfile: (profile: Partial<UserProfile>) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  addExperience: (exp: Experience) => void;
  updateExperience: (index: number, exp: Partial<Experience>) => void;
  removeExperience: (index: number) => void;

  addEducation: (edu: Education) => void;
  updateEducation: (index: number, edu: Partial<Education>) => void;
  removeEducation: (index: number) => void;

  addCourse: (course: Course) => void;
  updateCourse: (index: number, course: Partial<Course>) => void;
  removeCourse: (index: number) => void;

  setProgrammingLanguages: (langs: string[]) => void;
  setSkills: (skills: string[]) => void;

  addForeignLanguage: (lang: Language) => void;
  updateForeignLanguage: (index: number, lang: Partial<Language>) => void;
  removeForeignLanguage: (index: number) => void;

  setHobbies: (hobbies: string) => void;
  setMotivationLetter: (text: string) => void;

  setLinkedin: (url: string) => void;
  setGithub: (url: string) => void;

  setIp: (ip: string) => void;
  setUserAgent: (ua: string) => void;

  fetchCurrentUser: () => Promise<void>;
}
