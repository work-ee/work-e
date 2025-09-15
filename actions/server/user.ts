"use server";

import { revalidatePath } from "next/cache";

import { UserProfileSchema } from "@/lib/validations/user";

import { UserService } from "@/actions/client/user-service";

export type UserState = {
  first_name?: string;
  last_name?: string;
  email?: string;
  linkedin_url?: string;
  cv?: string;
  avatar_url?: string;
  date_joined?: string;
  errors?: {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    linkedin_url?: string;
    cv?: string;
    avatar_url?: string;
    date_joined?: string;
    _general?: string;
  };
};

export async function getCurrentUser() {
  try {
    const result = await UserService.getCurrentUser();
    return result;
  } catch (error) {
    console.error("Error getting current user:", error);
    return { success: false, error: "Failed to get current user" };
  }
}

export async function updateUserProfile(userId: string, _prev: UserState, formData: FormData): Promise<UserState> {
  const rawData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    linkedin_url: formData.get("linkedin_url") as string,
    cv: formData.get("cv") as string,
  };

  const validationResult = UserProfileSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errors: UserState["errors"] = {};

    validationResult.error.errors.forEach((error) => {
      const field = error.path[0] as keyof NonNullable<UserState["errors"]>;
      if (field && !errors![field]) {
        errors![field] = error.message;
      }
    });

    return {
      errors,
      ...rawData,
    };
  }

  const { data } = validationResult;

  try {
    const result = await UserService.updateProfile(data, Number(userId));

    if (!result.success) {
      return {
        ...rawData,
        errors: {
          _general: result.error || "Failed to update user",
        },
      };
    }

    revalidatePath("/profile");
    return {
      errors: {},
      ...data,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      errors: {
        _general: error instanceof Error ? error.message : "Failed to update user",
      },
      ...rawData,
    };
  }
}

export async function updateUserSettings(settings: {
  autoSendCV: boolean;
  autoCompareJobs: boolean;
  emailNotifications: boolean;
}) {
  try {
    const result = await UserService.updateSettings(settings);

    if (result.success) {
      revalidatePath("/profile");
    }

    return result;
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
