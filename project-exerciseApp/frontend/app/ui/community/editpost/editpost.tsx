/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useParams } from "next/navigation";

interface EditPostProps {
  initialContent: string;
  initialImages: string; // 이미지 URL 문자열
}

const EditPost: React.FC<EditPostProps> = ({
  initialContent,
  initialImages,
}) => {
  const [content, setContent] = React.useState<string>(initialContent);
  const [images, setImages] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>(
    initialImages.split(",")
  );
  const { postId } = useParams(); // postId 가져오기
  // console.log(postId)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const newImages: File[] = Array.from(fileList);
      setImages((prevImages) => [...prevImages, ...newImages]);

      const urls: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            urls.push(reader.result as string);
            if (urls.length === fileList.length) {
              setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
            }
          }
        };
        reader.readAsDataURL(fileList[i]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setPreviewUrls((prevUrls) => {
      const updatedUrls = [...prevUrls];
      updatedUrls.splice(index, 1);
      return updatedUrls;
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // 사용자 토큰 가져오기

      // 토큰이 없을 경우 alert 창 띄우기
      if (!token) {
        const userConfirmed = window.confirm(
          "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
        );
        if (userConfirmed) {
          window.location.href = "/login";
        }
        return;
      }

      const requestBody = {
        content: content,
      };

      const response = await fetch(
        `http://43.200.231.255:3560/community/editFeed/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update.");
      }

      console.log("Post updated successfully:", response);
      alert("게시물이 업데이트되었습니다.");
      window.location.href = "/community";
      // 업데이트 후 필요한 작업 수행, 예: 페이지 리로드 등
    } catch (error) {
      console.error("Error updating post:");
      alert("게시물 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="w-2/3 flex flex-col items-center justify-center text-black">
      <textarea
        className="w-10/12"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your text..."
        rows={10}
      />
      <div className="w-10/12 flex justify-between">
        <div>
          <label htmlFor="fileInput" className="text-white">
            Select images:
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Post
        </button>
      </div>
      <div className="flex w-10/12">
        {previewUrls.map((url, index) => (
          <div key={index}>
            <img
              src={`/community/${url}`}
              alt={`Preview ${index}`}
              style={{ width: "14vw", height: "12vw" }}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleRemoveImage(index)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPost;
