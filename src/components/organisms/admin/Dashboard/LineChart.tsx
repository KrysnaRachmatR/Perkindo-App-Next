import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  series: ApexAxisChartSeries;
  categories: string[];
}

const LineChart: React.FC<ChartProps> = ({ series, categories }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: { text: "Jumlah" },
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray p-4">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
