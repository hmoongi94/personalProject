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
  const [executionCount, setExecutionCount] = useState(-2);

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
      setExecutionCount((prevCount) => prevCount + 1);
    }
  }, [countdown]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

const handleReset = () => {
  setExecutionCount((prevCount) => {
    if (countdown === 0) {
      // If countdown is already 0, reset execution count to 0
      return 0;
    } else {
      // Otherwise, reset countdown to 0 and keep execution count the same
      setCountdown(0);
      setInitialCountdown(0);
      setIsActive(false);
      return prevCount;
    }
  });
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInitialCountdown(Math.max(newValue, 0)); // Ensure the input value is not below 0
    setCountdown(Math.max(newValue, 0));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">
        BreakTime: {countdown} seconds
      </h1>
      <p className="mb-2">Execution Count: {executionCount}</p>
      <label className="flex items-center mb-4">
        Set Countdown:
        <input
          className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
          type="number"
          value={initialCountdown}
          onChange={handleInputChange}
        />
      </label>
      <div className="flex space-x-4">
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
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;