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
    // Set은 반복되는  'iterable' 객체에서 중복을 제거한 값을 가지는 새로운 Set 객체를 만듬.
    // 등,가슴 이렇게 묶여있는 카테고리를 없애주기 위해서 사용함.
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
        <button
          onClick={() => filterExercisesByCategory(null)}
          className={`mx-2 px-4 py-2 rounded ${
            selectedCategory === null ? "bg-pink-500" : "bg-pink-300"
          }`}
        >
          All
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

      {/* Exercise Cards */}
      <div className="w-full h-full flex justify-center items-center flex-wrap">
        {exerciseData
          .filter(
            (exercise) =>
              selectedCategory === null ||
              exercise.category.includes(selectedCategory)
              // includes 메서드를 사용해서 등,하체 이런식으로 두개 합쳐져 있는 카테고리들도 다 뽑아낼 수 있다.
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
