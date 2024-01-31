"use client";

import Exercisedetail from "@/app/ui/mainpage/exercisedetail/exercisedetail";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

const ExerciseDetailpage = () => {

  const { exerciseIndex } = useParams();
  console.log(exerciseIndex);

  // exerciseIndex를 사용하여 해당 운동에 대한 데이터를 가져와 렌더링하는 로직을 작성

  // return <Exercisedetail />;
  return <div>테스트</div>;
};

export default ExerciseDetailpage;
