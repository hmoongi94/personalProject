"use client";

import { useEffect, useState } from "react";

import CommunityHome from "@/app/ui/community/communityHome";

interface PostData {
  content: string;
  date: string;
  imgurl: string;
  userId: string;
  postId: string;
  userIndex: string;
  likeCount: string;
}

interface LikeData {
  userId: string;
  postId: string;
}

const Community = () => {
  const [postData, setpostData] = useState<PostData[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [likeData, setlikeData] = useState<LikeData[]>([]);

  const handleRegisterFeed = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // 토큰이 있을 때 피드 등록 페이지로 이동
      window.location.href = "/community/registerfeed";
    } else {
      // 토큰이 없을 때 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  };

  // 게시물의 likeCount를 업데이트 하는 함수
  const updateLikeCount = (postId: string, change: number) => {
    setpostData((prevPostData) => {
      const updatedPostData = prevPostData.map((post) => {
        if (post.postId === postId) {
          // change에 따라 likeCount 증가 또는 감소
          const newLikeCount = parseInt(post.likeCount) + change;
          return {
            ...post,
            likeCount: String(newLikeCount),
          };
        }
        return post;
      });
      return updatedPostData;
    });
  };

  // * Fetch initial Postdata only once
  useEffect(() => {
    const fetchInitialPostData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3560/community/postData"
        );
        const postData = await response.json();

        if (!Array.isArray(postData)) {
          throw new Error("데이터 형식 오류: 배열이 아닙니다.");
        }

        // console.log(postData)
        setpostData(postData);
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchInitialPostData();
  }, []);

  // * userId 가져오기
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
    // console.log(userId)
  }, [userId]);

  // * likedata 가져오기
  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3560/community/likeData"
        );

        const likeData = await response.json();

        if (!Array.isArray(likeData)) {
          throw new Error("데이터 형식 오류: 배열이 아닙니다.");
        }

        // console.log(likeData)
        setlikeData(likeData);
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchLikeData();
  }, []);

  return (
    <div className="w-screen h-[86vh] flex justify-center">
      <CommunityHome
        postdata={postData}
        userId={userId}
        likedata={likeData}
        handleRegisterFeed={handleRegisterFeed}
        updateLikeCount={updateLikeCount}
      />
    </div>
  );
};

export default Community;
