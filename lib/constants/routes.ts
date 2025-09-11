export const ROUTES = {
  //  Common
  home: "/",

  // Auth
  login: "/sign-in",
  register: "/sign-up",

  // Vacancies
  jobs: "/jobs",
  job: (slug: string) => `/jobs/${slug}`,

  // Onboarding
  onboarding: "/onboarding",

  // Matching
  matching: "/matching",

  // Account
  profile: "/profile",
  cv: "/profile/cv",
};
