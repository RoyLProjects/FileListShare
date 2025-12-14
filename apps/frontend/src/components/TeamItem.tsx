import React from "react";
import { useNavigate } from "react-router-dom";

interface TeamItemProps {
  teamId: string;
  initial: string;
  name: string;
  members: number;
}

const TeamItem: React.FC<TeamItemProps> = ({
  teamId,
  initial,
  name,
  members,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/team/${teamId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-3 hover:shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all cursor-pointer"
    >
      <div className="items-center flex space-x-3">
        <div className="w-10 h-10 bg-neutral-300 dark:bg-neutral-700 rounded-lg items-center justify-center flex">
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
            {initial}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {members} members
          </p>
        </div>
      </div>
      <div className="w-2 h-2 bg-neutral-800 dark:bg-neutral-200 rounded-full"></div>
    </button>
  );
};

export default TeamItem;
