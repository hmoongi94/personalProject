import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setImages(fileList);
      const promises: Promise<string>[] = [];
      const urls: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const reader = new FileReader();
        const promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            if (reader.readyState === 2) {
              resolve(reader.result as string);
            } else {
              reject("Error getting image URL.");
            }
          };
        });
        promises.push(promise);
        reader.readAsDataURL(fileList[i]);
      }
      Promise.all(promises)
        .then((results) => {
          setPreviewUrls(results);
        })
        .catch(() => {
          alert("There was an error getting image URLs.");
        });
    }
  };

  const handleImageDelete = (index: number) => {
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);

    const files = images as FileList;
    const filteredFiles = Array.from(files).filter((_, i) => i !== index);
    setImages(new FileList(filteredFiles));
  };

  const handleUpload = async () => {
    try {
      if (!images) {
        alert("No images selected.");
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

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
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <img
            src={url}
            alt={`Preview ${index}`}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              marginRight: "10px",
            }}
          />
          <button onClick={() => handleImageDelete(index)}>Delete</button>
        </div>
      ))}
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default ImageUpload;
