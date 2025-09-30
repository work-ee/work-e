export const clearAuthCookies = () => {
  if (typeof window === "undefined") return;

  const cookiesToClear = [
    "authjs.pkce.code_verifier",
    "__Secure-authjs.pkce.code_verifier",
    "__Host-authjs.pkce.code_verifier",
    "authjs.csrf-token",
    "__Secure-authjs.csrf-token",
    "__Host-authjs.csrf-token",
  ];

  cookiesToClear.forEach((cookieName) => {
    // Clear cookie by setting its expiration date to the past
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;

    // For Netlify subdomains
    const parts = window.location.hostname.split(".");
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join(".");
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
    }
  });
};
