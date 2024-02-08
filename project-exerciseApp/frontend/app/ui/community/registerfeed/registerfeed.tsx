import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            } else {
              alert("There was an error getting image URLs.");
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
    <div>
      <label htmlFor="fileInput">Select images:</label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      {previewUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Preview ${index}`} style={{ maxWidth: "100%", maxHeight: "200px" }} />
          <button onClick={() => handleRemoveImage(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default ImageUpload;