"use client";

import React, { useState } from "react";

interface Answer {
  question1?: string;
  question2?: string;
  question3?: string;
  question4?: string;
}

const AiRoutinePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Answer>({});

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
    setCurrentQuestion(1); // 첫 번째 질문으로 초기화
    setAnswers({}); // 답변 초기화
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 다음 질문으로 넘어가기
  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  // 질문에 대한 답변 저장
  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  // 모달 제출 함수
  const handleSubmit = () => {
    // 여기에 모달 제출 로직 추가
    // 예를 들어, openapi에 answers 보내기
    alert("답변을 제출합니다!");
    console.log(answers); // 제출할 답변 확인
    closeModal(); // 모달 닫기
    // 상태 초기화
    setCurrentQuestion(1);
    setAnswers({});
  };

  // 질문과 답변 선택지
  const questions = [
    {
      id: 1,
      question: "첫 번째 질문: ...",
      options: ["선택지 1", "선택지 2", "선택지 3"],
    },
    {
      id: 2,
      question: "두 번째 질문: ...",
      options: ["선택지 A", "선택지 B", "선택지 C"],
    },
    {
      id: 3,
      question: "세 번째 질문: ...",
      options: ["선택지 X", "선택지 Y", "선택지 Z"],
    },
    {
      id: 4,
      question: "네 번째 질문: ...",
      options: ["선택지 A1", "선택지 B2", "선택지 C3"],
    },
  ];

  return (
    <div className="flex items-center justify-center">
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
          <div className="fixed top-[10vh] left-[10vw] w-[80vw] h-[80vh] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <span
                className="text-gray-500 text-2xl font-bold absolute top-2 right-2 cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <h2 className="text-black text-xl font-bold mb-4">
                질문 {currentQuestion}
              </h2>
              <p className="text-black mb-4">{questions[currentQuestion - 1].question}</p>
              <div className="flex justify-between">
                {questions[currentQuestion - 1].options.map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg shadow-md ${
                      answers[`question${currentQuestion}` as keyof Answer] === option
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white"
                    } hover:bg-blue-600 mr-2`}
                    onClick={() => handleAnswer(`question${currentQuestion}` as keyof Answer, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {currentQuestion < questions.length ? (
                <button
                  className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-pink-700"
                  onClick={nextQuestion}
                >
                  다음
                </button>
              ) : (
                <button
                  className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-pink-700"
                  onClick={handleSubmit}
                >
                  제출
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AiRoutinePage;