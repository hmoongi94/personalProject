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
      <h1 className="w-full flex justify-center">Exercise Guide</h1>
      <div className="w-10/12 flex justify-center">
        {/* exerciseData를 이용한 내용 추가 */}
        {exerciseData.map((exercise) => (
          <div key={exercise.index} className="w-1/2 border">
            <p>{exercise.name}</p>
            <Image
              src={`/${exercise.imgurl}.png`}
              alt="homepageCardImage"
              width={250}
              height={250}
            />
            <p>Description: {exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGuide;
