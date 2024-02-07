import React from "react";

const feed = () => {
  {
    /* 피드 아이템 */
  }
  return (
    <div className="feed-item">
      <div className="user-info">
        <img
          src="profile-image.jpg"
          alt="프로필 이미지"
          className="profile-image"
        />
        <span className="username">사용자 이름</span>
      </div>
      <img src="post-image.jpg" alt="게시물 이미지" className="post-image" />
      <div className="actions">
        <span className="icon">
          <i className="far fa-heart"></i>
        </span>
        <span className="icon">
          <i className="far fa-comment"></i>
        </span>
        <span className="icon">
          <i className="far fa-paper-plane"></i>
        </span>
      </div>
      <div className="likes">좋아요 100개</div>
      <div className="comments">
        <div className="comment">
          <span className="username">댓글 작성자</span> 댓글 내용
        </div>
        {/* 댓글 더보기 버튼 */}
        <button className="view-more-comments">댓글 더 보기</button>
      </div>
      <div className="add-comment">
        <input type="text" placeholder="댓글 달기..." />
        <button className="submit-comment">게시</button>
      </div>
    </div>
  );
};

export default feed