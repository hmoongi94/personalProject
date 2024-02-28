/* eslint-disable @next/next/no-img-element */
import React from "react";
import PostEditButton from "./postEditButton";

interface PostHeaderProps {
  postId: string;
  userId: string;
  date: string;
  isAuthor: (postUserId: string) => boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  postId,
  userId,
  date,
  isAuthor,
}) => {
  const handleDeletePost = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3560/community/deletepost/${postId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("게시물을 삭제하는데 실패했습니다.");
      }

      // 삭제 성공 시 화면 갱신
      window.location.reload();
    } catch (error) {
      console.error("게시물 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="flex justify-between">
      <img
        src="profile/기본프로필사진.webp"
        alt="프로필사진"
        className="w-12 h-12 rounded-full"
      />
      <div className="w-3/4 mr-24">
        <div className="text-sm mt-2">{userId}</div>
        <div className="text-sm">{date}</div>
      </div>
      {/* isAuthor 함수를 직접 전달 */}
      <PostEditButton
        postId={postId}
        isAuthor={isAuthor(userId)}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default PostHeader;