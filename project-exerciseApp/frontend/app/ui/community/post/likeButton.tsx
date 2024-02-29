import React, { useState, useEffect } from "react";

interface PostData {
  content: string;
  date: string;
  imgurl: string;
  userId: string;
  postId: string;
  userIndex: number;
  likeCount: string;
  commentContents: string | null;
  commentDates: string | null;
  commentuserId: string | null;
  commentIndexes: string | null;
}

interface LikeData {
  userId: string;
  postId: string;
}

interface LikeButtonProps {
  postId: string;
  userId: string | null;
  likedata: LikeData[];
  postdata: PostData[];
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  userId,
  likedata,
  postdata,
}) => {

  const [likeStatus, setLikeStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const isLikedByCurrentUser = (postId: string, currentUser: string) => {
      const likedUserIds = likedata
        .filter((like) => like.postId === postId)
        .map((like) => like.userId);
      return likedUserIds.includes(currentUser);
    };

    setLikeStatus((prevLikeStatus) => ({
      ...prevLikeStatus,
      [postId]: isLikedByCurrentUser(postId, userId || ""),
    }));
  }, [likedata, postId, userId]);

  const handleLikeButtonClicked = async () => {
    if (userId) {
      const alreadyLiked = likeStatus[postId];
      if (alreadyLiked) {
        try {
          // 좋아요 취소 요청
          const response = await fetch(
            `http://localhost:3560/community/deleteLikeData/${postId}/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(
              "데이터베이스에서 좋아요 정보 삭제에 실패했습니다."
            );
          }
          console.log("데이터베이스에서 좋아요 정보를 삭제했습니다.");

          // 로컬 상태 업데이트
          const updatedPostData = postdata.map((post) => {
            if (post.postId === postId) {
              post.likeCount = String(Number(post.likeCount) - 1);
            }
            return post;
          });

          setLikeStatus({ ...likeStatus, [postId]: false }); // 전역 좋아요 상태 업데이트
        } catch (error) {
          console.error(
            "데이터베이스에서 좋아요 정보 삭제 중 오류가 발생했습니다:",
            error
          );
        }
      } else {
        try {
          // 좋아요 추가 요청
          const response = await fetch(
            `http://localhost:3560/community/addLikeData/${postId}/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("데이터베이스에 좋아요 정보 추가에 실패했습니다.");
          }
          console.log("데이터베이스에 좋아요 정보를 추가했습니다.");

          // 로컬 상태 업데이트
          const updatedPostData = postdata.map((post) => {
            if (post.postId === postId) {
              post.likeCount = String(Number(post.likeCount) + 1);
            }
            return post;
          });

          setLikeStatus({ ...likeStatus, [postId]: true }); // 전역 좋아요 상태 업데이트
        } catch (error) {
          console.error(
            "데이터베이스에 좋아요 정보 추가 중 오류가 발생했습니다:",
            error
          );
        }
      }
    } else {
      // 로그인 되어 있지 않은 경우 로그인 페이지로 이동 여부 확인
      const confirmLogin = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (confirmLogin) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <button className="w-1/2 border" onClick={handleLikeButtonClicked}>
      {likeStatus[postId] ? "좋아해요!" : "좋아요!"}
    </button>
  );
};

export default LikeButton;
