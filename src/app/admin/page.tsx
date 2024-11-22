"use client";

import DashboardAdmin from "@/components/organisms/admin/Dashboard/page";
import DefaultLayout from "@/components/templates/DefaultAdminTemplate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="text-xl font-semibold text-gray-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <DefaultLayout>
        <DashboardAdmin />
      </DefaultLayout>
    </>
  );
}
