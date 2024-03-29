"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditPost from "@/app/ui/community/editpost/editpost";

interface PostData {
  content: string;
  imgurl: string;
}

const EditPostPage = () => {
  const { postId } = useParams(); // postId 가져오기
  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `http://43.200.231.255:3560/community/editpost/${postId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("게시물 데이터를 불러오는데 실패했습니다.");
        }
        // console.log(data.imgurl)
        // console.log(data.content)

        setPostData(data);
      } catch (error) {
        console.error(
          "게시물 데이터를 불러오는 동안 에러가 발생했습니다:",
          error
        );
      }
    };

    fetchPostData();
  }, [postId]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <EditPost
      initialContent={postData.content}
      initialImages={postData.imgurl}
    />
  );

  // 수정 폼을 이용하여 postData를 사용하여 게시물을 수정하는 UI를 구현합니다.
};

export default EditPostPage;
