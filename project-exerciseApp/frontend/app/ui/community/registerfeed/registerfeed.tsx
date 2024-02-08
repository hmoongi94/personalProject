/* eslint-disable @next/next/no-img-element */
import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const MAX_IMAGES = 5;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      if (fileList.length + images.length > MAX_IMAGES) {
        alert(`You can upload up to ${MAX_IMAGES} images.`);
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

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Images uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="w-2/3 flex items-start justify-center">
      <div>
        <label htmlFor="fileInput">Select images:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Images
        </button>
        <div className="flex">
          {previewUrls.map((url, index) => (
            <div
              key={index}
            >
              <button onClick={() => handleRemoveImage(index)}>delete</button>
              <img
                src={url}
                alt={`Preview ${index}`}
                style={{
                  width: "14vw",
                  height: "12vw",
                  // objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
