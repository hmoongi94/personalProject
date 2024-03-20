"use client";

import { useState } from "react";

import Survey from "@/app/ui/airoutine/survey";

const AiRoutinePage = () => {
  const [question, setQuestion] = useState("");
  const [generatedQuestion, setGeneratedQuestion] = useState("");

  const generateQuestion = async () => {
    if (!question) {
      alert("Please enter a question!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("question", question);

      const response = await fetch("/api/gptapi", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setGeneratedQuestion(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>OpenAI Question Generator</h1>
      <label htmlFor="question">Enter your question:</label>
      <input
        className="text-black"
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
      />
      <button onClick={generateQuestion}>Generate Question</button>
      {generatedQuestion && (
        <div id="output">
          <h3>Generated Question:</h3>
          <p>{generatedQuestion}</p>
        </div>
      )}
      <Survey />
    </div>
  );
};

export default AiRoutinePage;

//  //* 모달 제출 함수
//  const handleSubmit = () => {
//   // 여기에 모달 제출 로직 추가
//   console.log(answers); // 제출할 답변 확인
//   const requestAnswer = `헬스장가서 운동을 할건데, 헬스장에서 할 수 있는 운동으로 루틴을 짜줘. 운동의 목적은 ${answers.question1}이고, 일주일에 ${answers.question4} 운동할거야, 운동시간은 ${answers.question3}이고, 운동부위는 골고루 운동할 수 있게 루틴을 짜되 집중적으로 운동하고 싶은 부위는 ${answers.question2}이야. 일별로 키값을 가지고 루틴을 만들어서 json객체로 응답해.`

//   try {
//     const formData = new FormData();
//     formData.append("question", requestAnswer);

//     const response = await fetch("/api/gptapi", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
    
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
  
//   alert("답변을 제출합니다!");
//   closeModal(); // 모달 닫기
//   // 상태 초기화
//   setCurrentQuestion(1);
//   setAnswers({});
// };
