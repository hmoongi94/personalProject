import React from "react";
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
  filteredExerciseData: ExerciseData[];
}

const ExerciseGuide: React.FC<ExerciseGuideProps> = ({ filteredExerciseData }) => {
  return (
    <div className="w-screen h-4/5">
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