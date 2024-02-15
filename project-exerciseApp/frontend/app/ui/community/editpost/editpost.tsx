/* eslint-disable @next/next/no-img-element */
import React from "react";

interface EditPostProps {
  initialContent: string;
  initialImages: string; // 이미지 URL 문자열
}

const EditPost: React.FC<EditPostProps> = ({ initialContent, initialImages }) => {
  const [content, setContent] = React.useState<string>(initialContent);
  const [images, setImages] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>(initialImages.split(","));

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
    // 수정된 내용을 서버로 보내어 업데이트하는 로직 작성
    console.log("Updated content:", content);
    console.log("Updated images:", images);
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
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRemoveImage(index)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPost;