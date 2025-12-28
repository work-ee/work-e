"use server";

import { revalidatePath } from "next/cache";

import { UserProfileSchema } from "@/lib/validations/user";

export type UserState = {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  linkedin_url?: string;
  cv?: string;
  success?: boolean;
  errors?: {
    [key: string]: string;
  };
};

export async function updateUserProfile(userId: string, _prev: UserState, formData: FormData): Promise<UserState> {
  const rawData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    // avatar_url: formData.get("avatar_url") as string,
    // linkedin_url: formData.get("linkedin_url") as string,
    // cv: formData.get("cv") as string,
  };

  const validationResult = UserProfileSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errors: UserState["errors"] = {};

    validationResult.error.issues.forEach((error) => {
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

  console.error(`\x1b[35m Data: ${JSON.stringify(data, null, 2)} \x1b[0m`);

  // try {
  //   const result = await UserService.updateProfile(data, Number(userId));

  //   if (!result.success) {
  //     return {
  //       ...rawData,
  //       errors: {
  //         _general: result.error || "Failed to update user",
  //       },
  //     };
  //   }

  //   revalidatePath("/profile");
  //   return {
  //     errors: {},
  //     ...data,
  //   };
  // } catch (error) {
  //   console.error("Error updating user:", error);
  //   return {
  //     errors: {
  //       _general: error instanceof Error ? error.message : "Failed to update user",
  //     },
  //     ...rawData,
  //   };
  // }

  // Revalidate the profile page to reflect updated user data
  revalidatePath("/");
  return {
    success: true,
    ...data,
  };
}
