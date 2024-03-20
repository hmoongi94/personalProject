"use client";
import React, { useState } from "react";

interface Answer {
  question1?: string;
  question2?: string[];
  question3?: string;
  question4?: string;
}

interface GeneratedRoutine {
  [key: string]: string;
}

const AiRoutinePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [generatedRoutine, setGeneratedRoutine] = useState<GeneratedRoutine>(
    {}
  );

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
    // 현재 질문에 대한 답변 확인
    const currentAnswer = answers[`question${currentQuestion}` as keyof Answer];

    // 선택된 답변이 없는 경우
    if (
      !currentAnswer ||
      (Array.isArray(currentAnswer) && currentAnswer.length === 0)
    ) {
      alert("답변을 선택해주세요!"); // 경고창 띄우기
      return; // 함수 종료
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  // 이전 질문으로 돌아가기
  const previousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  //* 질문에 대한 답변 저장
  const handleAnswer = (question: string, answer: string) => {
    if (question === "question2") {
      // 복수 선택이 가능한 경우
      const currentAnswers = answers[question] || [];
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((ans) => ans !== answer) // 이미 선택된 항목이면 제거
        : [...currentAnswers, answer]; // 선택되지 않은 항목이면 추가

      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question]: updatedAnswers,
      }));
    } else {
      // 복수 선택이 불가능한 경우
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question]: answer,
      }));
    }
  };

  //* 모달 제출 함수
  const handleSubmit = async () => {
    closeModal(); // 모달 닫기

    // 여기에 모달 제출 로직 추가
    // console.log(answers); // 제출할 답변 확인
    const requestAnswer = `헬스장가서 운동을 할거야. 헬스장에서 할 수 있는 운동으로 다음에 설명하는 내 조건들에 맞게 루틴을 짤건데, 운동의 목적은 ${answers.question1}이고, 일주일에 ${answers.question4}만 운동할거야. 평균 운동시간은 ${answers.question3}이고 운동부위는 골고루 운동할 수 있게 루틴을 짜되 집중적으로 운동하고 싶은 부위는 ${answers.question2}이야. 실제 json데이터만 응답, 운동일정은 내가 일주일에 운동할 수 있는 일수를 고려해서 응답할 것, 배열 속 객체들은 운동종류:세트수x횟수로 응답할 것. 내 운동시간에 맞게 적절하게 운동개수를 루틴에 포함시킬 것. ex) {day1: [{벤치프레스: "3x10"},{스쿼트:"3x10"},{데드리프트:"3x10"}], day2:[{풀업:"3x10"}]}`
    // console.log(requestAnswer)

    try {
      const formData = new FormData();
      formData.append("question", requestAnswer);

      const response = await fetch("/api/gptapi", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data)

     // 받은 데이터를 JSON 형식으로 파싱하여 상태에 저장
     console.log(JSON.parse(data.result))
      setGeneratedRoutine(JSON.parse(data.result));
    } catch (error) {
      console.error("Error:", error);
    }

    // 상태 초기화
    setCurrentQuestion(1);
    setAnswers({});
  };

  // 질문과 답변 선택지
  const questions = [
    {
      id: 1,
      question: "운동의 목적을 정해주세요.",
      options: ["근육량 증가", "체지방 감소", "건강한 몸"],
    },
    {
      id: 2,
      question: "특별히 집중하고 싶은 운동 부위를 골라주세요.(복수선택 가능)",
      options: ["등", "팔", "가슴", "복근", "하체"],
    },
    {
      id: 3,
      question: "운동시간을 정해주세요.",
      options: ["30분", "60분", "90분", "120분"],
    },
    {
      id: 4,
      question: "일주일에 운동할 수 있는 일 수를 정해주세요.",
      options: ["1일", "2일", "3일", "4일", "5일", "6일", "7일"],
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="bg-pink-500 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl text-black font-bold mb-4">
          나만의 운동 루틴 만들기
        </h1>
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
              <p className="text-black mb-4">
                {questions[currentQuestion - 1].question}
              </p>
              <div className="flex flex-wrap gap-2">
                {questions[currentQuestion - 1].options.map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg shadow-md ${
                      answers[
                        `question${currentQuestion}` as keyof Answer
                      ]?.includes(option)
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white"
                    } hover:bg-blue-600`}
                    onClick={() =>
                      handleAnswer(
                        `question${currentQuestion}` as keyof Answer,
                        option
                      )
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
              {currentQuestion > 1 && (
                <button
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
                  onClick={previousQuestion}
                >
                  이전
                </button>
              )}
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

        {/* 생성된 운동 루틴 표시 */}
        {Object.keys(generatedRoutine).length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl text-black font-bold mb-2">생성된 운동 루틴</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <pre className="text-black">{JSON.stringify(generatedRoutine, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiRoutinePage;
