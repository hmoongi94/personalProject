"use client";

import { useState } from "react";

const AiRoutinePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 제출 함수
  const handleSubmit = () => {
    // 여기에 모달 제출 로직 추가
    // 예를 들어, 운동 루틴을 만드는 기능
    alert('운동 루틴을 만들었습니다!');
    closeModal(); // 모달 닫기
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-pink-500 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl text-black font-bold mb-4">나만의 운동 루틴 만들기</h1>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          onClick={openModal}
        >
          운동 루틴 만들러가기
        </button>

        {/* 모달 */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <span
                className="text-gray-500 text-2xl font-bold absolute top-2 right-2 cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <h2 className="text-black text-xl font-bold mb-4">운동 루틴 만들기</h2>
              <p className="text-black mb-4">몇 가지 질문에 답해주세요:</p>
              {/* 여기에 모달 내용 추가 */}
              <button
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                onClick={handleSubmit}
              >
                제출
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AiRoutinePage;