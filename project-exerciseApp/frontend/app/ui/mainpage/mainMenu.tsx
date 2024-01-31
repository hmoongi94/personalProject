import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ExerciseDiary = dynamic(() => import("./exercisediary/exercisediary"));
const ExerciseGuide = dynamic(() => import("./exerciseguide/exerciseguide"));
const Timer = dynamic(() => import("./timer/timer"));
const Logo = dynamic(() => import("./logo/logo"));

interface ExerciseData {
  index: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState("mainLogo");
  const [extractexerciseData, setExtractexerciseData] = useState<
    ExerciseData[]
  >([]);

  // * 종류별 운동 데이터 불러오기.
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await fetch("http://localhost:3560/exercisedata");
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("데이터 형식 오류: 배열이 아닙니다.");
        }

        setExtractexerciseData(data);
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchExerciseData();
  }, []);

  // * 동적 렌더링(운동가이드, 타이머, 운동일지)
  const renderComponent = () => {
    switch (activeMenu) {
      case "mainLogo":
        return <Logo />
      case "exerciseGuide":
        return <ExerciseGuide exerciseData={extractexerciseData} />;
      case "timer":
        return <Timer />;
      case "exerciseDiary":
        return <ExerciseDiary />;
      default:
        return null;
    }
  };

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

export default MainMenu;
