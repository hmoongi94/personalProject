/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PostContentProps {
  content: string;
  imgurl: string;
}

const PostContent: React.FC<PostContentProps> = ({ content, imgurl }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="border">
      <div className="">{content}</div>
      <div className="w-full">
        {imgurl &&
          (imgurl.split(",").length > 1 ? (
            <Slider {...settings}>
              {imgurl.split(",").map((url, idx) => (
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
              src={`/community/${imgurl}`}
              alt="exerciseCardImage"
              className="w-full h-96 object-cover"
              loading="eager"
            />
          ))}
      </div>
    </div>
  );
};

export default PostContent;