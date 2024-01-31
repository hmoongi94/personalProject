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
    <div className="w-screen">
      <h1 className="w-full flex justify-center">Exercise Guide</h1>
      <div className="w-full h-full flex justify-center">
        {/* exerciseData를 이용한 내용 추가 */}
        {exerciseData.map((exercise) => (
          <div key={exercise.index} className="border w-1/3">
            <p>{exercise.name}</p>
            <Image
              src={`/${exercise.imgurl}.png`}
              alt="homepageCardImage"
              width={250}
              height={250}
              priority
            />
            <p>Description: {exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGuide;
