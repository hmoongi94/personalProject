import React from "react";

interface Post {
  userId: string;
  commentContents: string | null;
  commentDates: string | null;
  commentuserId: string | null;
}

const Comment: React.FC<{ post: Post }> = ({ post }) => {
  if (post.commentContents && post.commentDates && post.commentuserId) {
    const comments: string[] = post.commentContents.split(",");
    const dates: string[] = post.commentDates.split(",");
    const commentUserId: string[] = post.commentuserId.split(",");

    const cleanedDates = dates.map((date) => {
      const parts = date.split(":"); // ":" 문자를 기준으로 분리
      if (parts.length > 2) {
        // 초를 포함하는 경우, 초를 제외한 부분만 가져옴
        return parts.slice(0, parts.length - 1).join(":");
      } else {
        return date; // 초가 없는 경우 그대로 반환
      }
    });
    return (
      <div>
        {comments.map((comment, i) => (
          <div key={i}>
            <p>
              {commentUserId[i]}: {comment} {cleanedDates[i]}
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    return null; // 댓글이 없는 경우에는 아무것도 렌더링하지 않습니다.
  }
};

export default Comment;
