"use client";

import Exercisedetail from "@/app/ui/mainpage/exercisedetail/exercisedetail";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

const ExerciseDetailpage = () => {
  const { exerciseIndex } = useParams();
  const [exercisedata, setexercisedata] = useState([]);

  // exerciseIndex를 사용하여 해당 운동에 대한 데이터를 가져와 렌더링하는 로직을 작성
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3560/exercisedetail/${exerciseIndex}`,
        );
        const data = await response.json();
        
        setexercisedata(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [exerciseIndex]);

  // return <Exercisedetail />;
  return <div>테스트</div>;
};

export default ExerciseDetailpage;
