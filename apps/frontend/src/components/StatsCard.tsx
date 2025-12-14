import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  value,
  label,
  change,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-lg transition-shadow">
      <div className="items-center justify-between mb-4 flex">
        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg items-center justify-center flex">
          {icon}
        </div>
        {change && (
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-neutral-900 mb-1 dark:text-neutral-100">
        {value}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{label}</p>
    </div>
  );
};

export default StatsCard;
