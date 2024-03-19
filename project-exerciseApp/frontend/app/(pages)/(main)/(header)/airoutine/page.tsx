"use client";

import { useState } from "react";

const AiRoutinePage = () => {
  const [question, setQuestion] = useState("");
  const [generatedQuestion, setGeneratedQuestion] = useState("");

  const generateQuestion = async () => {
    if (!question) {
      alert("Please enter a question!");
      return;
    }

    try {
      // const formData = new FormData();
      // formData.append("question", question);

      const gptApiResponse = await fetch("/api/gptapitest", {
        method: "POST",
        body: JSON.stringify({ question })
      });

      const data = await gptApiResponse.json();
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
    </div>
  );
};

export default AiRoutinePage;
