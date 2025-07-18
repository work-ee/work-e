/**
 * Utility for working with Django API tokens
 */

interface RefreshTokenResponse {
  access: string;
  refresh?: string;
}

/**
 * Renew access token via Django API
 */
export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      console.error("Failed to refresh token:", response.status);
      return null;
    }

    const data: RefreshTokenResponse = await response.json();
    return data.access;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
};

/**
 * Does a fetch request with automatic token refresh if needed
 */
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  accessToken?: string,
  refreshToken?: string
): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // -> If the access token is expired and there is a refresh token, try to refresh it
  if (response.status === 401 && refreshToken) {
    // console.log("Access token expired, attempting to refresh...");

    const newAccessToken = await refreshAccessToken(refreshToken);

    if (newAccessToken) {
      // -> Repeat the request with the new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });
    }
  }

  return response;
};

/**
 * Logout from Django API
 */
export const logoutFromDjango = async (accessToken?: string, refreshToken?: string): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`,
      { method: "POST" },
      accessToken,
      refreshToken
    );

    // console.log("Django logout response:", response.status);
    return response.ok;
  } catch (error) {
    console.error("Django logout error:", error);
    return false;
  }
};
