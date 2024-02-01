import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [countdown, setCountdown] = useState(0);
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [executionCount, setExecutionCount] = useState(-2); // New state variable

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
      setExecutionCount((prevCount) => prevCount + 1); // Increment execution count
    }
  }, [countdown, initialCountdown]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setCountdown(initialCountdown);
    setIsActive(false);
    setExecutionCount(0); // Reset execution count to its initial value
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">BreakTime: {countdown} seconds</h1>
      <p className="mb-2">Execution Count: {executionCount}</p>
      <label className="flex items-center mb-4">
        Set Countdown:
        <input
          className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
          type="number"
          value={initialCountdown}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setInitialCountdown(newValue);
            setCountdown(newValue);
          }}
        />
      </label>
      <div className="flex space-x-4">
        <button
          className={`${
            isActive ? 'bg-blue-500' : 'bg-green-500'
          } text-white px-4 py-2 rounded`}
          onClick={handleStartStop}
        >
          {isActive ? 'Pause' : 'Start'}
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