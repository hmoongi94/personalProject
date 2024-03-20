"use client";

import { useState } from "react";

import Survey from "@/app/ui/airoutine/survey";
import {Button} from '@nextui-org/button'; 

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
      <Button>Click me</Button>
    </div>
  );
};

export default AiRoutinePage;
