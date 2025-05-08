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
    <div className="rounded-xl border-2 border-gray bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full flex items-center justify-between">
        {/* Icon container */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-end text-black dark:text-white">
              {total}
            </h4>
            <span className="text-sm font-medium text-end text-gray-500 dark:text-white">
              {title}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardDataStats;
