import { useEffect } from "react";

import { useProfileStore } from "@/stores/profileStore";

export const useAutoProfile = () => {
  const { setProfile, updatePersonalInfo, setIp, setUserAgent } = useProfileStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch("/api/auto-profile");
        const data = await res.json();

        updatePersonalInfo({
          country: data.country,
          city: data.city,
        });

        setIp(data.ip);
      } catch (err) {
        console.error("Автоматичне заповнення не вдалося", err);
      }
    };

    fetchProfileData();
  }, [setProfile, updatePersonalInfo, setIp, setUserAgent]);
};
