import { useEffect } from "react";

import { useProfileStore } from "@/stores/profileStore";

export const useAutoProfile = () => {
  const { setProfile, updatePersonalInfo, setIp, setUserAgent } = useProfileStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch("/api/auto-profile");
        const data = await res.json();
        console.log(data);

        updatePersonalInfo({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.userData.email,
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
