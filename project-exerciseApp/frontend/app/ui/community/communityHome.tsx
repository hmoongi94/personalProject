/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Search from "@/app/lib/utils/search";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./community.css";

interface PostData {
  content: string;
  date: string;
  imgurl: string;
  userId: string;
  postId: string;
}

interface CommunityHomeProps {
  postdata: PostData[];
  userId: string | null;
}

const CommunityHome: React.FC<CommunityHomeProps> = ({ postdata, userId }) => {
  const token = localStorage.getItem("token");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 게시물 작성자와 현재 사용자의 아이디를 비교하여 수정 링크 여부 결정
  const isAuthor = (postUserId: string) => {
    return userId === postUserId;
  };

  // 피드 등록 버튼 클릭 시 로그인 여부 확인
  const handleRegisterFeed = () => {
    if (token) {
      // 토큰이 있을 때 피드 등록 페이지로 이동
      window.location.href = "/community/registerfeed";
    } else {
      // 토큰이 없을 때 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3560/community/deletepost/${postId}`,
        {
          method: "GET"
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

  return (
    <div className="instagram-main flex flex-col items-center w-3/5 mt-5 mb-5">
      {/* 네비게이션 바 */}
      <nav className="navbar w-11/12">
        <div className="container">
          <div className="logo mr-5">Exercise Community</div>
          <Search placeholder="검색" />
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleRegisterFeed} // 피드 등록 버튼 클릭 시 핸들러 호출
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
                <div className="w-1/5 h-1/2">
                  {/* 수정 버튼 추가 */}
                  {isAuthor(post.userId) && (
                    <>
                      <Link
                        href={`/community/editpost/${post.postId}`}
                        key={index}
                        className="w-1/2"
                      >
                        <button className="w-full h-full justify-center items-center flex text-xs bg-blue-500 text-white px-2 py-2 rounded">
                          수정
                        </button>
                      </Link>
                      {/* 삭제 버튼 추가 */}
                      <button
                        className="w-full h-full justify-center items-center flex text-xs bg-pink-500 text-white px-2 py-2 rounded"
                        onClick={() => handleDeletePost(post.postId)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                  {!isAuthor(post.userId) && (
                    <span className="text-xs text-red-500">
                      작성자가 아닙니다
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2">{post.content}</div>
              <div className="border w-full">
                {post.imgurl && // 이미지 URL이 존재할 때에만 img 태그 생성
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
              <div>21명이 좋아요!</div>
              <div className="w-full">
                <button className="w-1/2 border">좋아요!</button>
                <button className="w-1/2 border">댓글열기</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommunityHome;
{
  /* 피드 아이템 */
}
{
  /* <div className="feed-item">
  <div className="user-info">
    <img
      src="profile-image.jpg"
      alt="프로필 이미지"
      className="profile-image"
    />
    <span className="username">사용자 이름</span>
  </div>
  <img
    src="post-image.jpg"
    alt="게시물 이미지"
    className="post-image"
  />
  <div className="likes">좋아요 100개</div>
</div> */
}
{
  /* 피드 아이템 끝 */
}
{
  /* 추가 피드 아이템들 */
}
{
  /* 여기에 추가 피드 아이템들을 반복해서 렌더링하는 코드를 넣으세요 */
}
