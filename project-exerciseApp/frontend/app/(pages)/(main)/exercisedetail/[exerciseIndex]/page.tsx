"use client";

import ExerciseDetailUI from "@/app/ui/mainpage/exercisedetail/exercisedetail";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface ExerciseDetailProps {
  imgurl: string;
  name: string;
  description: string;
}

const ExerciseDetailpage = () => {
  const { exerciseIndex } = useParams();
  const [exercisedata, setexercisedata] = useState<ExerciseDetailProps[] | null>(
    null
  );

  // exerciseIndex를 사용하여 해당 운동에 대한 데이터를 가져와 렌더링하는 로직을 작성
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3560/exercisedetail/${exerciseIndex}`
        );
        const data = await response.json();
        console.log(data);

        setexercisedata(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [exerciseIndex]);

  return <ExerciseDetailUI exercisedetaildata={exercisedata} />;
  // return <div>테스트</div>
};

export default ExerciseDetailpage;
