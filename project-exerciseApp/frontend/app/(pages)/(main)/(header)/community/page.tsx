"use client";

import { useEffect, useState } from "react";

import CommunityHome from "@/app/ui/community/communityHome";

interface PostData {
  content: string;
  date: string;
  imgurl: string;
  userId: string;
  postId: string;
}

const Community = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [postData, setpostData] = useState<PostData[]>([]);

  // * userId가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("토큰이 없습니다.");
        }

        const response = await fetch("http://localhost:3560/userId", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("사용자 정보를 불러오는데 실패했습니다.");
        }

        const userData = await response.json();
        if (userData.length > 0) {
          setUserId(userData[0].userId);
        }
      } catch (error) {
        console.error("유저 정보를 불러오는 동안 에러가 발생했습니다:", error);
      }
    };

    if (!userId) {
      fetchUserId();
    }
  }, [userId]);

  // * Fetch initial Postdata only once
  useEffect(() => {
    const fetchInitialPostData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3560/community/postData"
        );
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("데이터 형식 오류: 배열이 아닙니다.");
        }

        // console.log(data)
        setpostData(data);
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchInitialPostData();
  }, []);

  return (
    <div className="w-screen h-full flex justify-center">
      <CommunityHome postdata={postData} userId={userId} />
    </div>
  );
};

export default Community;
