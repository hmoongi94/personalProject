"use client";

import ExerciseDetailUI from "@/app/ui/exercisedetail/exercisedetail";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// interface ExerciseDetailProps {
//   imgurl: string;
//   name: string;
//   description: string;
// }

const ModifyPostpage = () => {
  // const { exerciseIndex } = useParams();
  // const [exercisedata, setexercisedata] = useState<ExerciseDetailProps[] | null>(
  //   null
  // );

  //* exerciseIndex를 사용하여 해당 운동에 대한 데이터를 가져와 렌더링하는 로직을 작성
  // useEffect(() => {
  //   const fetchProductData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3560/exercisedetail/${exerciseIndex}`
  //       );
  //       const data = await response.json();
  //       console.log(data);

  //       setexercisedata(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchProductData();
  // }, [exerciseIndex]);

  return <div>수정페이지</div> 
  // <ExerciseDetailUI exercisedetaildata={exercisedata} />;
};

export default ModifyPostpage;
