import { useRouter } from 'next/router';

const ExerciseDetailPage = () => {
  const router = useRouter();
  const { exerciseIndex } = router.query;

  // exerciseIndex를 사용하여 해당 운동에 대한 데이터를 가져와 렌더링하는 로직을 작성

  return (
    <div>
      <h1>Exercise Detail Page</h1>
      <p>Exercise Index: {exerciseIndex}</p>
      {/* 나머지 데이터 렌더링 */}
    </div>
  );
};

export default ExerciseDetailPage;