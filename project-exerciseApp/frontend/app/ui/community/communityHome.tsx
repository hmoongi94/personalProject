/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import "./community.css";
import Comment from "./comment/comment";
import CommunityNavbar from "./communityNavbar";

import PostHeader from "./post/postHeader";
import PostContent from "./post/postContent";
import LikeButton from "./post/likeButton";

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

interface CommunityHomeProps {
  postdata: PostData[];
  userId: string | null;
  likedata: LikeData[];
  handleRegisterFeed: () => void;
}

const CommunityHome: React.FC<CommunityHomeProps> = ({
  postdata,
  userId,
  likedata,
  handleRegisterFeed,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // console.log(postdata);

  //* 게시물 작성자와 현재 사용자의 아이디를 비교하여 수정 링크 여부 결정
  const isAuthor = (postUserId: string) => {
    return userId === postUserId;
  };

  //* 좋아요 상태를 관리하는 상태 변수
  const [likeStatus, setLikeStatus] = useState<{ [key: string]: boolean }>({});

  // * 댓글관리
  // 댓글 입력과 관련된 상태 변수 및 함수
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>(
    {}
  );
  const [commentDates, setCommentDates] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [commentUserId, setCommentUserId] = useState<{
    [key: string]: string[];
  }>({});

  const [showCommentInput, setShowCommentInput] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCommentInputChange = (postId: string, value: string) => {
    setCommentInput({ ...commentInput, [postId]: value });
  };

  const handleCommentButtonClick = (postId: string) => {
    setShowCommentInput({
      ...showCommentInput,
      [postId]: !showCommentInput[postId],
    });
    if (!showCommentInput[postId]) {
      setCommentInput({ ...commentInput, [postId]: "" });
    }
  };

  // * 댓글 등록
  const handleCommentSubmit = async (postId: string) => {
    try {
      // 댓글이 비어있으면 추가하지 않고 함수 종료
      if (!commentInput[postId]) {
        alert("댓글을 입력하세요!");
        return;
      }

      if (!userId) {
        const confirmLogin = window.confirm(
          "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
        );
        if (confirmLogin) {
          // 로그인 페이지로 이동
          window.location.href = "/login";
        }
        return;
      }

      const response = await fetch(
        `http://localhost:3560/community/addComment/${postId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentcontent: commentInput[postId],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글을 추가하는데 실패했습니다.");
      }

      const data = await response.json();
      // console.log(data)

      const updatedPostData = postdata.map((post) => {
        if (post.postId === postId) {
          const updatedCommentContent = post.commentContents
            ? `${post.commentContents},${commentInput[postId]}`
            : commentInput[postId];
          post.commentContents = updatedCommentContent;

          // 추가된 부분
          const updatedCommentuserId = post.commentuserId
            ? `${post.commentuserId},${userId}`
            : userId;
          post.commentuserId = updatedCommentuserId;

          const currentDate = new Date();
          const formattedDate = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDate()} ${currentDate.getHours()}:${
            currentDate.getMinutes() < 10
              ? "0" + currentDate.getMinutes()
              : currentDate.getMinutes()
          }`;

          const updatedCommentdate = post.commentDates
            ? `${post.commentDates},${formattedDate}`
            : formattedDate;
          post.commentDates = updatedCommentdate;

          // 추가된 부분: data.commentIndex를 post의 commentIndexes에 추가
          const updatedCommentIndexes = post.commentIndexes
            ? `${post.commentIndexes},${data.commentIndex}`
            : `${data.commentIndex}`;
          post.commentIndexes = updatedCommentIndexes;
        }
        return post;
      });

      setCommentInput({ ...commentInput, [postId]: "" });
      // setShowCommentInput({ ...showCommentInput, [postId]: false });
    } catch (error) {
      console.error("댓글 추가 중 오류가 발생했습니다:", error);
    }
  };

  // * 댓글 삭제
  const handleDeleteComment = async (postId: string, commentIndex: number) => {
    try {
      const response = await fetch(
        `http://localhost:3560/community/deleteComment/${postId}/${commentIndex}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("댓글 삭제에 실패했습니다.");
      }
      alert("댓글을 삭제했습니다.");
      window.location.reload();

      // Update locally by removing the deleted comment
      const updatedPostData = postdata.map((post) => {
        if (post.postId === postId) {
          const comments: string[] = post.commentContents?.split(",") || [];
          const dates: string[] = post.commentDates?.split(",") || [];
          const commentUserId: string[] = post.commentuserId?.split(",") || [];

          comments.splice(commentIndex, 1);
          dates.splice(commentIndex, 1);
          commentUserId.splice(commentIndex, 1);

          post.commentContents = comments.join(",");
          post.commentDates = dates.join(",");
          post.commentuserId = commentUserId.join(",");
        }
        return post;
      });

      // Update state
      // setPostData(updatedPostData);
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="instagram-main flex flex-col items-center w-3/5 mt-5 mb-5">
      {/* 네비게이션 바 */}
      <CommunityNavbar handleRegisterFeed={handleRegisterFeed} />

      {/* 피드 */}
      <div className="feed w-full">
        {postdata
          .slice(0)
          .reverse()
          .map((post, index) => (
            <div className="w-1/2 border" key={index}>
              <div className="border">
                <PostHeader
                  postId={post.postId}
                  postUserId={post.userId}
                  postDate={post.date}
                  isAuthor={() => isAuthor(post.userId)} // isAuthor 함수를 전달하면서 post의 userId를 함께 전달
                />
              </div>

              {/* 컨텐츠 */}
              <PostContent content={post.content} imgurl={post.imgurl} />

              {/* 좋아요 */}
              <div>{post.likeCount}명이 좋아해요!</div>
              <div className="w-full">
                <LikeButton
                  postId={post.postId}
                  userId={userId}
                  likedata={likedata}
                  postdata={postdata}
                  likeStatus={likeStatus}
                  setLikeStatus={setLikeStatus}
                />

                {/* 댓글 */}
                <button
                  className="w-1/2 border"
                  onClick={() => handleCommentButtonClick(post.postId)}
                >
                  {showCommentInput[post.postId] ? "댓글접기" : "댓글열기"}
                </button>
                {showCommentInput[post.postId] && (
                  <div>
                    <div>
                      {post.commentContents && (
                        <Comment
                          onDeleteComment={handleDeleteComment}
                          post={post}
                          currentuser={userId}
                        />
                      )}
                    </div>
                    <div className="flex border-2">
                      <input
                        className="w-1/2 text-black"
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={commentInput[post.postId] || ""}
                        onChange={(e) =>
                          handleCommentInputChange(post.postId, e.target.value)
                        }
                      />
                      <div className="w-1/2 flex justify-center">
                        <button
                          className=""
                          onClick={() => handleCommentSubmit(post.postId)}
                        >
                          댓글달기
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommunityHome;
