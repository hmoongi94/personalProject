import React from "react";
import Image from "next/image";

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
  return (
    <div>
      <h1>Exercise Guide</h1>
      {/* exerciseData를 이용한 내용 추가 */}
      {exerciseData.map((exercise) => (
        <div key={exercise.index}>
          <p>Name: {exercise.name}</p>
          <p>Category: {exercise.category}</p>
          <p>Description: {exercise.description}</p>
          <Image
            src={`/images/${exercise.imgurl}.png`}
            alt="homepageCardImage"
            width={250}
            height={250}
            className=" outline-1 outline cursor-pointer h-2/3 w-2/3"
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default ExerciseGuide;
