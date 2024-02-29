import React from "react";

interface CommentInputProps {
  postId: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="flex border-2">
      <input
        className="w-1/2 text-black"
        type="text"
        placeholder="댓글을 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="w-1/2 flex justify-center">
        <button className="" onClick={onSubmit}>
          댓글달기
        </button>
      </div>
    </div>
  );
};

export default CommentInput;