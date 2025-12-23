import { auth } from "@/lib/auth";

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.API_URL || "";

    if (!this.baseURL) {
      console.warn("⚠️ API_URL not configured, using relative URLs");
    }
  }

  private handleError(method: string, endpoint: string, status: number, errorText: string): Error {
    return new Error(`${method} ${endpoint}: ${status} ${errorText}`);
  }

  private async getAuthHeaders() {
    const session = await auth();
    const token = session?.backendToken || session?.user;

    if (!token) {
      throw new Error("No authentication token found");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
  }

  private async executeWithRetry<T>(operation: () => Promise<T>, maxRetries = 3, isAuthRequest = false): Promise<T> {
    let lastError: Error;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // For auth requests, check for "Token used too early" error
        if (isAuthRequest && error instanceof Error && error.message.includes("Token used too early")) {
          console.warn(`🕒 Token too early (attempt ${i + 1}), retrying...`);
          if (i < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Fixed delay for auth
            continue;
          }
        }

        if (i === maxRetries) break;

        // Exponential backoff for other errors
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }

    throw lastError!;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.executeWithRetry(async () => {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw this.handleError("GET", endpoint, response.status, errorText);
      }

      return response.json();
    });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.executeWithRetry(async () => {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw this.handleError("POST", endpoint, response.status, errorText);
      }

      return response.json();
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.executeWithRetry(async () => {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw this.handleError("PATCH", endpoint, response.status, errorText);
      }

      return response.json();
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.executeWithRetry(async () => {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw this.handleError("PUT", endpoint, response.status, errorText);
      }

      return response.json();
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.executeWithRetry(async () => {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw this.handleError("DELETE", endpoint, response.status, errorText);
      }

      return response.json();
    });
  }

  async postAuth<T>(endpoint: string, settings: unknown): Promise<T> {
    return this.executeWithRetry(
      async () => {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw this.handleError("POST", endpoint, response.status, errorText);
        }

        return response.json();
      },
      4,
      true
    );
  }
}

export const apiClient = new ApiClient();
