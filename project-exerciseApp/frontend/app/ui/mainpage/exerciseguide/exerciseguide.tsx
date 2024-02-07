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
    <div className="w-[100vw] h-[65vh] flex flex-col flex-wrap justify-center items-center">
      {/* 운동 카드들 */}
      <div className="flex w-2/3 h-1/2 justify-center">
        {currentItems.map((exercise, index) => (
          <Link
            href={`/exercisedetail/${exercise.exerciseIndex}`}
            key={index}
            className="w-1/4"
          >
            <div className="border w-full h-full">
              <p className="flex justify-center">{exercise.name}</p>
              <Image
                src={`/${exercise.imgurl}.png`}
                alt="exerciseCardImage"
                width={200}
                height={200}
                priority
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
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
