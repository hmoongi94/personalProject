import React, { useState } from "react";

interface Comment {
  id: string; // 'id' 속성 추가
  content: string;
  userId: string;
}

interface CommentFormProps {
  postId: string;
  addComment: (postId: string, content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, addComment }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === "") return;
    addComment(postId, content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
      />
      <button type="submit">댓글 달기</button>
    </form>
  );
};

export default CommentForm;