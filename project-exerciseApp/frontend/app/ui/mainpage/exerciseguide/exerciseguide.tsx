import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ExerciseData {
  exerciseIndex: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

interface ExerciseGuideProps {
  filteredExerciseData: ExerciseData[];
}

const ExerciseGuide: React.FC<ExerciseGuideProps> = ({
  filteredExerciseData,
}) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExerciseData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-screen h-11/12 flex flex-col justify-center items-center">
      {/* 운동 카드들 */}
      <div className="w-2/3 h-full flex flex-wrap justify-center items-center">
        {currentItems.map((exercise, index) => (
          <Link
            href={`/exercisedetail/${exercise.exerciseIndex}`}
            key={index}
            className="mr-20 ml-20 h-1/3"
          >
            <div key={exercise.exerciseIndex} className="border">
              <p className="flex justify-center">{exercise.name}</p>
              <Image
                className="flex justify-center"
                src={`/${exercise.imgurl}.png`}
                alt="exerciseCardImage"
                width={250}
                height={250}
                priority
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredExerciseData.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className="mx-2"
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ExerciseGuide;
