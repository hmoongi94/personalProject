"use client";

import ExerciseDetailUI from "@/app/ui/exercisedetail/exercisedetail";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { ExerciseDetailProps } from "@/app/lib/interface";

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
          `http://43.200.231.255:3560/exercisedetail/${exerciseIndex}`
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
};

export default ExerciseDetailpage;
