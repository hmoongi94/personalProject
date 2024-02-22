import React, { useState } from "react";

interface Comment {
  id: string;
  content: string;
  userId: string;
}

interface CommentProps {
  comments: Comment[];
}

const Comments: React.FC<CommentProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>{comment.userId}: </strong>
          {comment.content}
        </div>
      ))}
    </div>
  );
};

export default Comments;