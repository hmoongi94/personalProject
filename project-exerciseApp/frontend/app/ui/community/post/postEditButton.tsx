import React from "react";
import Link from "next/link";

interface PostEditButtonProps {
  postId: string;
  isAuthor: boolean;
  handleDeletePost: (postId: string) => void;
}

const PostEditButton: React.FC<PostEditButtonProps> = ({
  postId,
  isAuthor,
  handleDeletePost,
}) => {
  return (
    <div className="w-1/5 h-1/2">
      {isAuthor && (
        <>
          <Link href={`/community/editpost/${postId}`} key={postId}>
            <button className="w-full h-full justify-center items-center flex text-xs bg-blue-500 text-white px-2 py-2 rounded">
              수정
            </button>
          </Link>
          <button
            className="w-full h-full justify-center items-center flex text-xs bg-pink-500 text-white px-2 py-2 rounded"
            onClick={() => handleDeletePost(postId)}
          >
            삭제
          </button>
        </>
      )}
      {!isAuthor && (
        <span className="text-xs text-red-500">작성자가 아닙니다</span>
      )}
    </div>
  );
};

export default PostEditButton;