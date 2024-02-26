/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import PostEditButton from "./postEditButton";
import Link from "next/link";
import Search from "@/app/lib/utils/search";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./community.css";
import Comment from "./comment/comment";

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
  commentuserId: string |null;
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

  useEffect(() => {
    const isLikedByCurrentUser = (postId: string, currentUser: string) => {
      // 현재 사용자가 좋아요를 누른 게시물인지 확인하는 함수
      const likedUserIds = likedata
        .filter((like) => like.postId === postId)
        .map((like) => like.userId);
      return likedUserIds.includes(currentUser);
    };
    // 게시물 별로 좋아요 상태 초기화
    const initialLikeStatus: { [key: string]: boolean } = {};
    postdata.forEach((post) => {
      initialLikeStatus[post.postId] = isLikedByCurrentUser(
        post.postId,
        userId || ""
      );
    });
    setLikeStatus(initialLikeStatus);
  }, [likedata, postdata, userId]);

  //* 좋아요 버튼 클릭 시 동작하는 함수
  const handleLikeButtonClicked = async (postId: string) => {
    // 사용자가 로그인한 상태인지 확인
    if (userId) {
      // 좋아요를 이미 눌렀는지 확인
      const alreadyLiked = likeStatus[postId];
      if (alreadyLiked) {
        // 이미 좋아요를 눌렀으면 데이터베이스에서 해당 정보 삭제
        try {
          const response = await fetch(
            `http://localhost:3560/community/deleteLikeData/${postId}/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(
              "데이터베이스에서 좋아요 정보 삭제에 실패했습니다."
            );
          }
          console.log("데이터베이스에서 좋아요 정보를 삭제했습니다.");

          // Update like count locally by decrementing it
          const updatedPostData = postdata.map((post) => {
            if (post.postId === postId) {
              post.likeCount = String(Number(post.likeCount) - 1);
            }
            return post;
          });
          setLikeStatus({ ...likeStatus, [postId]: false }); // 좋아요 상태 업데이트
        } catch (error) {
          console.error(
            "데이터베이스에서 좋아요 정보 삭제 중 오류가 발생했습니다:",
            error
          );
        }
      } else {
        // 좋아요를 누르지 않았으면 데이터베이스에 좋아요 정보 추가
        try {
          const response = await fetch(
            `http://localhost:3560/community/addLikeData/${postId}/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("데이터베이스에 좋아요 정보 추가에 실패했습니다.");
          }
          console.log("데이터베이스에 좋아요 정보를 추가했습니다.");

          // Update like count locally by incrementing it
          const updatedPostData = postdata.map((post) => {
            if (post.postId === postId) {
              post.likeCount = String(Number(post.likeCount) + 1);
            }
            return post;
          });
          setLikeStatus({ ...likeStatus, [postId]: true }); // 좋아요 상태 업데이트
        } catch (error) {
          console.error(
            "데이터베이스에 좋아요 정보 추가 중 오류가 발생했습니다:",
            error
          );
        }
      }
    } else {
      // 사용자가 로그인하지 않은 상태라면 로그인 페이지로 이동 여부 확인
      const confirmLogin = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (confirmLogin) {
        // 로그인 페이지로 이동
        window.location.href = "/login";
      }
    }
  };

  // * 게시물 삭제
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

  // * 댓글관리
  // 댓글 입력과 관련된 상태 변수 및 함수
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>(
    {}
  );
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

      const updatedPostData = postdata.map((post) => {
        if (post.postId === postId) {
          const updatedCommentContent = post.commentContents
            ? `${post.commentContents},${commentInput[postId]}`
            : commentInput[postId];
          post.commentContents = updatedCommentContent;
        }
        return post;
      });

      const data = await response.json();
      setCommentInput({ ...commentInput, [postId]: "" });
      // setShowCommentInput({ ...showCommentInput, [postId]: false });
    } catch (error) {
      console.error("댓글 추가 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="instagram-main flex flex-col items-center w-3/5 mt-5 mb-5">
      {/* 네비게이션 바 */}
      <nav className="navbar w-11/12">
        <div className="container">
          <div className="logo mr-5">Exercise Community</div>
          <Search placeholder="검색" />
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleRegisterFeed}
          >
            피드 등록
          </button>
        </div>
      </nav>

      {/* 피드 */}
      <div className="feed w-full">
        {postdata
          .slice(0)
          .reverse()
          .map((post, index) => (
            <div className="w-1/2 border" key={index}>
              <div className="flex justify-between">
                <img
                  src="profile/기본프로필사진.webp"
                  alt="프로필사진"
                  className="w-12 h-12 rounded-full"
                />
                <div className="w-3/4 mr-24">
                  <div className="text-sm mt-2">{post.userId}</div>
                  <div className="text-sm">{post.date}</div>
                </div>
                <PostEditButton
                  postId={post.postId}
                  isAuthor={isAuthor(post.userId)}
                  handleDeletePost={handleDeletePost}
                />
              </div>
              <div className="mt-2">{post.content}</div>
              <div className="border w-full">
                {post.imgurl &&
                  (post.imgurl.split(",").length > 1 ? (
                    <Slider {...settings}>
                      {post.imgurl.split(",").map((url, idx) => (
                        <div key={idx} className="w-full h-full">
                          <img
                            src={`/community/${url}`}
                            alt="exerciseCardImage"
                            className="w-full h-96 object-cover"
                            loading="eager"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <img
                      src={`/community/${post.imgurl}`}
                      alt="exerciseCardImage"
                      className="w-full h-96 object-cover"
                      loading="eager"
                    />
                  ))}
              </div>
              <div>{post.likeCount}명이 좋아해요!</div>
              <div className="w-full">
                <button
                  className="w-1/2 border"
                  onClick={() => handleLikeButtonClicked(post.postId)}
                >
                  {likeStatus[post.postId] ? "좋아해요!" : "좋아요!"}
                </button>
                <button
                  className="w-1/2 border"
                  onClick={() => handleCommentButtonClick(post.postId)}
                >
                  {showCommentInput[post.postId] ? "댓글접기" : "댓글열기"}
                </button>
                {showCommentInput[post.postId] && (
                  <div>
                    <div>{post.commentContents && <Comment post={post} />}</div>
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
