import type { BackendUser, IUserFormData } from "@/types/next-auth";

import { apiClient } from "./api-client";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    timestamp: string;
    requestId?: string;
  };
};

export interface AuthResponse {
  token: string;
  user: BackendUser;
}

export class UserService {
  static async getCurrentUser(): Promise<ApiResponse<BackendUser | null>> {
    try {
      const data = await apiClient.get<BackendUser | null>("/api/users/current/");
      return { success: true, data };
    } catch (error) {
      console.error("Error getting current user:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get current user",
      };
    }
  }

  static async updateProfile(userData: IUserFormData, userId: number): Promise<ApiResponse<BackendUser>> {
    try {
      const data = await apiClient.patch<BackendUser>(`/api/users/${userId}/`, userData);
      return { success: true, data };
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update profile",
      };
    }
  }

  static async updateSettings(settings: {
    autoSendCV: boolean;
    autoCompareJobs: boolean;
    emailNotifications: boolean;
  }): Promise<ApiResponse<typeof settings>> {
    try {
      const data = await apiClient.put<typeof settings>("/api/users/settings/", settings);
      return { success: true, data };
    } catch (error) {
      console.error("Error updating settings:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update settings",
      };
    }
  }

  static async deleteAccount(userId: number): Promise<ApiResponse<null>> {
    try {
      await apiClient.post<null>(`/api/users/${userId}/delete/`, {});
      return { success: true };
    } catch (error) {
      console.error("Error deleting account:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete account",
      };
    }
  }
}

export class AuthService {
  static async authenticateWithGoogle(accessToken: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await apiClient.postAuth<AuthResponse>("/api/users/google/login/", {
        access_token: accessToken,
        remember_me: true,
      });
      return { success: true, data };
    } catch (error) {
      console.error("Error authenticating with Google:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to authenticate with Google",
      };
    }
  }

  static async authenticateWithLinkedIn(accessToken: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await apiClient.postAuth<AuthResponse>("/api/users/linkedin/login/", {
        access_token: accessToken,
        remember_me: true,
      });
      return { success: true, data };
    } catch (error) {
      console.error("Error authenticating with LinkedIn:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to authenticate with LinkedIn",
      };
    }
  }
}
