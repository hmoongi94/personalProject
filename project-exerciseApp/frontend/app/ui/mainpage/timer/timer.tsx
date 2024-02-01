import { count } from "console";
import React, { useState, useEffect } from "react";

interface ExerciseData {
  index: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

interface TimerProps {
  initialExerciseData: ExerciseData[];
}

const Timer: React.FC<TimerProps> = ({ initialExerciseData }) => {
  // console.log(initialExerciseData);

  const [countdown, setCountdown] = useState(0);
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [executionCount, setExecutionCount] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Extract names from initialExerciseData
  const exerciseNames = initialExerciseData.map((exercise) => exercise.name);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setIsActive(false);
      setCountdown(initialCountdown);
    }
  }, [countdown, initialCountdown]);

  const handleStartStop = () => {
    if (isActive === false && countdown === initialCountdown) {
      setExecutionCount((prevCount) => prevCount + 1);
    }
    setIsActive((prevIsActive) => !prevIsActive);
    // setInitialCountdown(countdown)
  };

  const handleBreaktimeReset = () => {
    setCountdown(0); // Reset countdown to 0
    setInitialCountdown(0);
    setIsActive(false);
  };

  const handleExecutionReset = () => {
    setExecutionCount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInitialCountdown(Math.max(newValue, 0)); // Ensure the input value is not below 0
    setCountdown(Math.max(newValue, 0));
  };

  const handleExerciseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(e.target.value);
  };

  const handleRecord = () => {
    // Send the data to the server (replace the URL with your actual server endpoint)
    fetch("http://localhost:3560/recordData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        executionCount,
        selectedExercise,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recorded successfully:", data);
      })
      .catch((error) => {
        console.error("Error recording data:", error);
      });
  };

  return (
    <div className="w-full h-full flex justify-evenly items-center">
      <div>
        <label className="flex items-center mb-4">
          Select Exercise:
          <select
            className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
            value={selectedExercise || ""}
            onChange={handleExerciseSelect}
          >
            <option value="" disabled>
              Select an exercise
            </option>
            {exerciseNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <p className="mb-2">Set Execution Count: {executionCount}</p>
        <div className="flex space-x-4 ml-20">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleRecord}
          >
            Record
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleExecutionReset}
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">
          BreakTime: {countdown} seconds
        </h1>
        <label className="flex items-center mb-4">
          Countdown:
          <input
            className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
            type="number"
            value={initialCountdown}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex space-x-4 ml-20">
          <button
            className={`${
              isActive ? "bg-blue-500" : "bg-green-500"
            } text-white px-4 py-2 rounded`}
            onClick={handleStartStop}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleBreaktimeReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
