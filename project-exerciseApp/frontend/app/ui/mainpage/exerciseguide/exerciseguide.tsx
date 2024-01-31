import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const filterExercisesByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-screen h-4/5">
      <h1 className="w-full flex justify-center">Exercise Guide</h1>

      {/* Primary Category Navigation */}
      <div className="flex justify-center my-4">
        {primaryCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterExercisesByCategory(category)}
            className={`mx-2 px-4 py-2 rounded ${
              selectedCategory === category ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => filterExercisesByCategory(null)}
          className={`mx-2 px-4 py-2 rounded ${
            selectedCategory === null ? "bg-gray-300" : "bg-gray-100"
          }`}
        >
          All
        </button>
      </div>

      {/* Exercise Cards */}
      <div className="w-full h-full flex justify-center items-center flex-wrap">
        {exerciseData
          .filter(
            (exercise) =>
              selectedCategory === null ||
              exercise.category.includes(selectedCategory)
          )
          .map((exercise, index) => (
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