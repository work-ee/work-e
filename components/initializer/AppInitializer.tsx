"use client";

import { useAutoProfile } from "@/hooks/useAutoProfile";

export default function AppInitializer() {
  useAutoProfile();

  return null;
}
