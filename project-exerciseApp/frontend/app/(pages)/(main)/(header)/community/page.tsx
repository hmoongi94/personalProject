"use client";

import { useEffect, useState } from "react";

import CommunityHome from "@/app/ui/community/communityHome";

interface PostData {
  content: string;
  date: Date;
  imgurl: string;
  userId: string;
}

interface LikeData {

}

const Community = () => {
  const [postData, setpostData] = useState<PostData[]>([]);
  const [likeData, setlikeData] = useState<LikeData[]>([]);

  // * Fetch initial Postdata only once
  useEffect(() => {
    const fetchInitialPostData = async () => {
      try {
        const response = await fetch("http://localhost:3560/community/postData");
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("데이터 형식 오류: 배열이 아닙니다.");
        }

        // console.log(data)
        setpostData(data)
       
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchInitialPostData();
  }, []);

  

  return (
    <div className="w-screen h-screen flex justify-center">
      <CommunityHome postdata={postData}/>
      test
    </div>
  );
};

export default Community;
