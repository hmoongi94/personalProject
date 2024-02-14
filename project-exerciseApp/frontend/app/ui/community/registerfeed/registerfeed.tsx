/* eslint-disable @next/next/no-img-element */
import React, { useState, ChangeEvent } from "react";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      if (fileList.length + images.length > 5) {
        // Check if total images exceed the limit
        alert("You can upload up to 5 images.");
        return;
      }

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

  const handleUpload = async () => {
    try {
      if (!images.length) {
        alert("No images selected.");
        return;
      }

      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("text", inputValue);

      // console.log(formData.get("images"));
      // console.log(formData.get("text"));
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

      const response = await fetch(
        "http://localhost:3560/community/registerFeed",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images.");
      }

      alert("피드글이 작성되었습니다.")
      console.log("Images uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="w-2/3 flex flex-col items-center justify-center text-black">
      <textarea
        className="w-10/12"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Feed
        </button>
      </div>
      <div className="flex w-10/12">
        {previewUrls.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`Preview ${index}`}
              style={{ width: "14vw", height: "12vw" }}
            />
            <button onClick={() => handleRemoveImage(index)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
