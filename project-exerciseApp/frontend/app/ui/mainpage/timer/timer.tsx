import React, { useState, useEffect } from "react";

const Timer = () => {
  const [countdown, setCountdown] = useState(0);
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setCountdown(initialCountdown);
    setIsActive(false);
  };

  const handleSetCountdown = () => {
    setIsActive(false);
    setCountdown(initialCountdown);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">
        BreakTime: {countdown} seconds
      </h1>
      <label className="flex items-center mb-4">
        Set Countdown:
        <input
          className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
          type="number"
          value={initialCountdown} // Use value instead of defaultValue
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setInitialCountdown(newValue);
            setCountdown(newValue); // Update countdown when input changes
          }}
        />
      </label>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSetCountdown}
        >
          Set
        </button>
        <button
          className={`${
            isActive ? "bg-blue-500" : "bg-gray-500"
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
