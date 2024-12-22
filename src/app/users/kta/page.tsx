"use client";

import { useState, useEffect } from "react";
import KtaLayout from "@/components/organisms/users/KTA/page";
import DefaultLayoutUsers from "@/components/templates/DefaultUsersTemplate";
import axios from "axios";

const Kta = () => {
  const [userData, setUserData] = useState({
    hasKTA: false,
    status_diterima: null,
    komentar: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data KTA dari backend
    const fetchKTAData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage atau tempat penyimpanan lainnya
        const response = await axios.get("http://localhost:8000/api/getKta", {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan Bearer Token di header
          },
        });
        const { hasKTA, status_diterima, komentar } = response.data;
        setUserData({ hasKTA, status_diterima, komentar });
      } catch (error) {
        console.error("Error fetching KTA data:", error);
        setUserData({ hasKTA: false, status_diterima: null, komentar: null });
      } finally {
        setLoading(false);
      }
    };

    fetchKTAData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayoutUsers hasKTA={userData.hasKTA}>
      <KtaLayout
        hasKTA={userData.hasKTA}
        status_diterima={userData.status_diterima}
        komentar={userData.komentar}
      />
    </DefaultLayoutUsers>
  );
};

export default Kta;
