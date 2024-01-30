import React, { useState, useEffect } from 'react';

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
    // 카운트다운이 0이 되면
    if (countdown === 0) {
      // isActive를 false로 설정하여 pause 버튼이 start로 바뀌게 함
      setIsActive(false);
      // 초기 세팅 값으로 리셋
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
    setIsActive(false); // set 버튼 클릭 시 pause로 변경
    setCountdown(initialCountdown);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">BreakTime: {countdown} seconds</h1>
      <label className="flex items-center mb-4">
        Set Countdown:
        <input
          className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
          type="number"
          defaultValue={countdown}
          onChange={(e) => setInitialCountdown(Number(e.target.value))}
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
            isActive ? 'bg-blue-500' : 'bg-gray-500'
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