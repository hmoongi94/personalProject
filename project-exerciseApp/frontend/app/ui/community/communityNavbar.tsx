// ExerciseCommunityNavbar.tsx

import React from "react";
import Search from "@/app/lib/utils/search";

interface ExerciseCommunityNavbarProps {
  handleRegisterFeed: () => void;
}

const ExerciseCommunityNavbar: React.FC<ExerciseCommunityNavbarProps> = ({
  handleRegisterFeed,
}) => {
  return (
    <nav className="navbar w-11/12">
      <div className="container">
        <div className="logo mr-5">Exercise Community</div>
        {/* <Search placeholder="검색" /> */}
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleRegisterFeed}
        >
          피드 등록
        </button>
      </div>
    </nav>
  );
};

export default ExerciseCommunityNavbar;