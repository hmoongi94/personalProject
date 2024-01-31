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
}

const ExerciseGuide: React.FC<ExerciseGuideProps> = ({ exerciseData }) => {
  return (
    <div className="w-screen h-4/5">
      <h1 className="w-full flex justify-center">Exercise Guide</h1>
      <div className="w-full h-full flex justify-center items-center">
        {/* exerciseData를 이용한 내용 추가 */}
        {exerciseData.map((exercise, index) => (
          <Link href={`/exercisedetail/${exercise.index}`} key={index}>
            <div key={exercise.index} className="border w-4/5">
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
