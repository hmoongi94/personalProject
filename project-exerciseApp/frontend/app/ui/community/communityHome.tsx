/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "@/app/lib/utils/search";

import "./community.css";

const CommunityHome = () => {
  const communityData = [
    { communityIndex: 1, communityimgurl: "커뮤니티사진1" },
    { communityIndex: 2, communityimgurl: "커뮤니티사진2" },
    { communityIndex: 3, communityimgurl: "커뮤니티사진3" },
    { communityIndex: 4, communityimgurl: "커뮤니티사진4" },
  ];

  return (
    <div className="instagram-main flex flex-col items-center w-3/5 mt-5 mb-5">
      {/* 네비게이션 바 */}
      <nav className="navbar w-11/12">
        <div className="container">
          <div className="logo mr-5">Exercise Community</div>
          <Search placeholder="검색" />
        </div>
      </nav>

      {/* 피드 */}
      <div className="feed w-full">
        {communityData.map((community, index) => (
          <div className="w-1/2 border" key={index}>
            <div>프로필사진/사용자이름/작성일</div>
            <div>내용 어쩌고저쩌고 오늘 운동 잘됐네 뭐했네</div>
            <div className="border w-full">
              <Link
                href={`/exercisedetail/${community.communityIndex}`}
                className="w-full"
              >
                <img
                  src={`/community/${community.communityimgurl}.png`}
                  alt="exerciseCardImage"
                  className="w-full h-72 object-cover"
                  loading="eager"
                />
              </Link>
            </div>
            <div>21명이 좋아요!</div>
            <div className="w-full"><button className="w-1/2 border">좋아요!</button><button className="w-1/2 border">댓글열기</button></div>
            
          </div>
        ))}
        {/* 피드 아이템 */}
        {/* <div className="feed-item">
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
        </div> */}
        {/* 피드 아이템 끝 */}
        {/* 추가 피드 아이템들 */}
        {/* 여기에 추가 피드 아이템들을 반복해서 렌더링하는 코드를 넣으세요 */}
       
      </div>
    </div>
  );
};

export default CommunityHome;
