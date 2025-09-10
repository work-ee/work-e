import { useEffect } from "react";

import { useProfileStore } from "@/stores/profileStore";

export const useAutoProfile = () => {
  const { setProfile, updatePersonalInfo, setIp, setUserAgent, fetchCurrentUser } = useProfileStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch("/api/auto-profile");
        const data = await res.json();
        if (data && data.userData) {
          updatePersonalInfo({
            id: data.userData.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.userData.email,
            country: data.country,
            city: data.city,
          });
        }
        setIp(data.ip);
      } catch (err) {
        console.error("Автоматичне заповнення не вдалося", err);
      } finally {
        useProfileStore.setState({ isProfileLoading: false });
        fetchCurrentUser();
      }
    };

    fetchProfileData();
  }, [setProfile, updatePersonalInfo, setIp, setUserAgent, fetchCurrentUser]);
};
