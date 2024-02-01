"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ExerciseDiary = dynamic(
  () => import("@/app/ui/mainpage//exercisediary/exercisediary")
);
const ExerciseGuide = dynamic(
  () => import("@/app/ui/mainpage//exerciseguide/exerciseguide")
);
const Timer = dynamic(() => import("@/app/ui/mainpage/timer/timer"));
const Search = dynamic(() => import("@/app/ui/mainpage/exerciseguide/search"));

interface ExerciseData {
  index: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

const MainPage = () => {
  const [activeMenu, setActiveMenu] = useState("exerciseGuide");
  const [extractexerciseData, setExtractexerciseData] = useState<
    ExerciseData[]
  >([]);
  const searchParams = useSearchParams();

  // // * 종류별 운동 데이터 불러오기.
  // useEffect(() => {
  //   const fetchInitialExerciseData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3560/exercisedata");
  //       const data = await response.json();

  //       if (!Array.isArray(data)) {
  //         throw new Error("데이터 형식 오류: 배열이 아닙니다.");
  //       }

  //       setExtractexerciseData(data);
  //     } catch (error) {
  //       console.error("데이터를 불러오는 동안 에러발생:", error);
  //     }
  //   };

  //   fetchInitialExerciseData();
  // }, []);

  // * 검색으로 운동 데이터 불러오기.
  useEffect(() => {
    const fetchSearchedExerciseData = async () => {
      try {
        const queryParam = searchParams.get("query");

        if (!queryParam) {
        //* If the query is empty, fetch initial data
          const response = await fetch("http://localhost:3560/exercisedata");
          const data = await response.json();

          if (!Array.isArray(data)) {
            throw new Error("데이터 형식 오류: 배열이 아닙니다.");
          }

          setExtractexerciseData(data);
        } else {
          //* If the query is not empty, fetch searched data
          const response = await fetch(
            `http://localhost:3560/searchexercisedata?query=${queryParam}`
          );
          const data = await response.json();

          if (!Array.isArray(data)) {
            throw new Error("데이터 형식 오류: 배열이 아닙니다.");
          }

          setExtractexerciseData(data);
        }
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchSearchedExerciseData();
  }, [searchParams]);

  // * 동적 렌더링(운동가이드, 타이머, 운동일지) -> 메인페이지 구성
  const renderComponent = () => {
    switch (activeMenu) {
      case "exerciseGuide":
        return (
          <div>
            <div className="flex justify-center">Exercise Guide</div>
            <Search placeholder="Search..." />
            <ExerciseGuide exerciseData={extractexerciseData} />
          </div>
        );
      case "timer":
        return <Timer />;
      case "exerciseDiary":
        return <ExerciseDiary />;
      default:
        return null;
    }
  };

  // *메뉴만 Ui를 만들고 동적렌더링으로 메인페이지를 구상
  return (
    <div className="w-screen h-screen">
      <nav className="w-full border-b-2 border-wine p-4">
        <ul className="w-full flex flex-row justify-around">
          <li onClick={() => setActiveMenu("exerciseGuide")}>Exercise Guide</li>
          <li onClick={() => setActiveMenu("timer")}>Breaktime Timer</li>
          <li onClick={() => setActiveMenu("exerciseDiary")}>Exercise Diary</li>
        </ul>
      </nav>
      {renderComponent()}
    </div>
  );
};

export default MainPage;
