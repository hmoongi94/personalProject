/* eslint-disable @next/next/no-img-element */
import React from "react";
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
}

const CommunityHome: React.FC<CommunityHomeProps> = ({ postdata }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="instagram-main flex flex-col items-center w-3/5 mt-5 mb-5">
      {/* 네비게이션 바 */}
      <nav className="navbar w-11/12">
        <div className="container">
          <div className="logo mr-5">Exercise Community</div>
          <Search placeholder="검색" />
          <Link href="/community/registerfeed">
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
              피드 등록
            </button>
          </Link>
        </div>
      </nav>

      {/* 피드 */}
      <div className="feed w-full">
        {postdata
          .slice(0)
          .reverse()
          .map((post, index) => (
            <div className="w-1/2 border" key={index}>
              <div className="flex">
                <img
                  src="profile/기본프로필사진.webp"
                  alt="프로필사진"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="text-sm mt-2">{post.userId}</div>
                  <div className="text-sm">{post.date}</div>
                  {/* <div className="text-sm">{post.date.toLocaleDateString()}</div>  */}
                </div>
              </div>
              <div className="mt-2">{post.content}</div>
              <div className="border w-full">
                {post.imgurl && (
                  <Slider {...settings}>
                    {post.imgurl.split(",").map((url, idx) => (
                      <div key={idx}>
                        <img
                          src={`/community/${url}`}
                          alt="exerciseCardImage"
                          className="w-full h-72 object-cover"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </Slider>
                )}
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
