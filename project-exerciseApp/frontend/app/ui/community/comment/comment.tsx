import React from 'react';

interface Post {
  userId: string;
  commentContents: string|null;
  commentDates: string|null;
}

const Comment: React.FC<{ post: Post }> = ({ post }) => {
  if (post.commentContents && post.commentDates) {
    const comments: string[] = post.commentContents.split(",");
    const dates: string[] = post.commentDates.split(",");

    return (
      <div>
        {comments.map((comment, i) => (
          <div key={i}>
            <p>{post.userId}: {comment} {dates[i]}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return null; // 댓글이 없는 경우에는 아무것도 렌더링하지 않습니다.
  }
};

export default Comment;