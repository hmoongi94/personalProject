"use client";

import { useEffect, useState } from "react";

import CommunityHome from "@/app/ui/community/communityHome";
// import { useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

import { PostData, LikeData } from "@/app/lib/interface";

const Community = () => {
  const [postData, setpostData] = useState<PostData[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [likeData, setlikeData] = useState<LikeData[]>([]);

  const [refreshData, setRefreshData] = useState(false);
  // const searchParams = useSearchParams();
  // const searchParams = useSearchParams();

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

  // * PostData 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // const queryParam = searchParams.get("query");
        // const queryParam = searchParams.get("query");

        let url = "http://43.200.231.255:3560/community/postData";

        // if (queryParam) {
          // url += `?query=${queryParam}`;
        // }

        const response = await fetch(url);
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("데이터 형식 오류: 배열이 아닙니다.");
        }

        // console.log(data);
        setpostData(data);
      } catch (error) {
        console.error("데이터를 불러오는 동안 에러발생:", error);
      }
    };

    fetchPostData();
  }, [refreshData]);
  }, [refreshData]);

  const handleRefreshData = () => {
    // 버튼 클릭 시 refreshData를 토글하여 useEffect를 다시 실행
    setRefreshData((prev) => !prev);
  };

  // * userId 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("토큰이 없습니다.");
        }

        const response = await fetch("http://43.200.231.255:3560/userId", {
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
          "http://43.200.231.255:3560/community/likeData"
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
      />
    </div>
  );
};

export default Community;
