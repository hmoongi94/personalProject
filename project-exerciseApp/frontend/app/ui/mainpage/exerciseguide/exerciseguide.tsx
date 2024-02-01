import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./search";

interface ExerciseData {
  index: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

interface ExerciseGuideProps {
  exerciseData: ExerciseData[];
}

const ExerciseGuide: React.FC<ExerciseGuideProps> = ({ exerciseData }) => {
  const primaryCategories = Array.from(
    new Set(exerciseData.map((exercise) => exercise.category.split(",")[0]))
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredExerciseData, setFilteredExerciseData] = useState<ExerciseData[]>(exerciseData);

  useEffect(() => {
    // exerciseData가 변경될 때 filteredExerciseData를 업데이트합니다.
    setFilteredExerciseData(exerciseData.filter(
      (exercise) =>
        selectedCategory === null ||
        exercise.category.includes(selectedCategory)
    ));
  }, [exerciseData, selectedCategory]);

  const filterExercisesByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-screen h-4/5">
      {/* 주요 카테고리 내비게이션 */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => filterExercisesByCategory(null)}
          className={`mx-2 px-4 py-2 rounded ${
            selectedCategory === null ? "bg-pink-500" : "bg-pink-300"
          }`}
        >
          전체
        </button>
        {primaryCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterExercisesByCategory(category)}
            className={`mx-2 px-4 py-2 rounded ${
              selectedCategory === category ? "bg-pink-500" : "bg-pink-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 운동 카드들 */}
      <div className="w-full h-full flex justify-center items-center flex-wrap">
        {filteredExerciseData.map((exercise, index) => (
          <Link href={`/exercisedetail/${exercise.index}`} key={index}>
            <div key={exercise.index} className="border w-4/5 my-4">
              <p className="flex justify-center">{exercise.name}</p>
              <Image
                src={`/${exercise.imgurl}.png`}
                alt="homepageCardImage"
                width={250}
                height={250}
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGuide;