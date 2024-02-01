import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryNavigation from "./categoryNavigation";

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
  // Extract all unique categories
  const allCategories = Array.from(
    new Set(exerciseData.flatMap((exercise) => exercise.category.split(",")))
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredExerciseData, setFilteredExerciseData] =
    useState<ExerciseData[]>(exerciseData);

  useEffect(() => {
    setFilteredExerciseData(
      exerciseData.filter(
        (exercise) =>
          selectedCategory === null ||
          exercise.category.includes(selectedCategory)
      )
    );
  }, [exerciseData, selectedCategory]);

  const filterExercisesByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-screen h-4/5">
      {/* CategoryNavigation component */}
      <CategoryNavigation
        categories={allCategories}
        selectedCategory={selectedCategory}
        filterExercisesByCategory={filterExercisesByCategory}
      />

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