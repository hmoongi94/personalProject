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
    <div>
      <h1>Exercise Detail Page</h1>
      {/* 배열의 각 객체에 대한 JSX를 생성 또는 데이터 없음을 나타내는 JSX를 생성 */}
      {exercisedetaildata ? (
        exercisedetaildata.map((exercise, index) => (
          <div key={index}>
            <h2>{exercise.name}</h2>
            {/* <img src={exercise.imgurl} alt={exercise.name} /> */}
            <p>{exercise.description}</p>
          </div>
        ))
      ) : (
        <div>Data not available</div>
      )}
    </div>
  );
};

export default ExerciseDetailUI;