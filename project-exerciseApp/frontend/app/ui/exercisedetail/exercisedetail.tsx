/* eslint-disable @next/next/no-img-element */
import React from "react";
import './exercisedetail.css'

interface ExerciseDetailProps {
  name: string;
  imgurl: string;
  description: string;
}

// ExerciseDetailUI 컴포넌트의 속성을 정의하는 인터페이스
interface ExerciseDetailUIProps {
  exercisedetaildata: ExerciseDetailProps[] | null;
}


const ExerciseDetailUI: React.FC<ExerciseDetailUIProps> = ({ exercisedetaildata }) => {
  return (
    <div className="exercise-detail-container">
      <h1 className="exercise-detail-title">Exercise Detail Page</h1>
      <div className="exercise-detail-content">
        {exercisedetaildata ? (
          exercisedetaildata.map((exercise, index) => (
            <div className="exercise-item" key={index}>
              <h2 className="exercise-name">{exercise.name}</h2>
              <img
                src={`/exercise/${exercise.imgurl}.png`}
                alt={exercise.name}
                className="exercise-image"
              />
              <p className="exercise-description">{exercise.description}</p>
            </div>
          ))
        ) : (
          <div>Data not available</div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetailUI;