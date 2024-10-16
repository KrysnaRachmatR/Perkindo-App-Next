import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-md border-2 border-[#1C2434] bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Icon container */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      {/* Content section */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-500 dark:text-white">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
