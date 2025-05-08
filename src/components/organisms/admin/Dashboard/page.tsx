"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CardDataStats from "./CardData";
import LineChart from "./LineChart";
import axios from "axios";
import { API_URL } from "@/hooks/ApiConfig";
import Toast from "@/components/atoms/ToastAlert";
import { IdCardIcon, FileBox, FileCode2 } from "lucide-react";

const DashboardAdmin = () => {
  const DoughnutChart = dynamic(() => import("./DoughnutChart"), {
    ssr: false,
  });

  const [loading, setLoading] = useState(false);
  const [totdalData, setTotalData] = useState({});
  const [chartData, setChartData] = useState({
    categories: [] as string[],
    series: [] as ApexAxisChartSeries,
  });

  const [toast, setToast] = useState(null);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/total-summary`);
      const dataChart = response.data.data.yearly;
      const dataTotal = response.data.total_aktif;

      const categories = dataChart.map((item: any) => item.month);
        const series = [
          {
            name: "KTA",
            data: dataChart.map((item: any) => item.kta),
          },
          {
            name: "SBU Konstruksi",
            data: dataChart.map((item: any) => item.sbus),
          },
          {
            name: "SBU Non-Konstruksi",
            data: dataChart.map((item: any) => item.sbun),
          },
        ];

        setChartData({ categories, series });
        setTotalData(dataTotal);
        
    } catch (err: any) {
      console.log(err);
      setToast({
        message: "Gagal mengambil data.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {toast && (
        <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 gap-y-6 gap-x-6 w-full">
        <CardDataStats title="KTA" total={totdalData.kta}>
          <IdCardIcon className="w-8 h-8"/>
        </CardDataStats>
        <CardDataStats title="SBU KONSTRUKSI" total={totdalData.sbus}>
          <FileBox className="w-8 h-8"/>
        </CardDataStats>
        <CardDataStats title="SBU NON KONSTRUKSI" total={totdalData.sbun}>
          <FileCode2 className="w-8 h-8"/>
        </CardDataStats>
      </div>
      <div className="mt-4 grid grid-cols-1">
        <div className="h-full">
          {/* <LineChart /> */}
          <LineChart series={chartData.series} categories={chartData.categories} />
        </div>
        {/* <div className="h-full">
          <DoughnutChart />
        </div> */}
      </div>
    </>
  );
};

export default DashboardAdmin;
