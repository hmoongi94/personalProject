import React from "react";

interface Post {
  userId: string;
  commentContents: string | null;
  commentDates: string | null;
  commentuserId: string | null;
  commentIndexes: string | null;
  postId: string;
}

const Comment: React.FC<{ post: Post, onDeleteComment: (postId: string, commentId: number) => void }> = ({ post, onDeleteComment }) => {
  if (post.commentContents && post.commentDates && post.commentuserId&& post.commentIndexes) {
    const comments: string[] = post.commentContents.split(",");
    const dates: string[] = post.commentDates.split(",");
    const commentUserId: string[] = post.commentuserId.split(",");
    const commentIndexes: number[] = post.commentIndexes.split(",").map(Number)

    const cleanedDates = dates.map((date) => {
      const parts = date.split(":");
      if (parts.length > 2) {
        return parts.slice(0, parts.length - 1).join(":");
      } else {
        return date;
      }
    });

    const handleDelete = (postId: string, commentIndex: number) => {
      // 여기서 commentIndex는 댓글의 인덱스입니다.
      // Comment 컴포넌트 내부에서 각 댓글은 배열의 인덱스를 가지고 있으므로 이를 활용하여 삭제할 수 있습니다.
      onDeleteComment(postId, commentIndex);
    };

    return (
      <div>
        {comments.map((comment, i) => (
          <div key={i}>
            <p>
              {commentUserId[i]}: {comment} {cleanedDates[i]}
              <button className="border text-white rounded" onClick={() => handleDelete(post.postId, commentIndexes[i])}>삭제</button>
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default Comment;