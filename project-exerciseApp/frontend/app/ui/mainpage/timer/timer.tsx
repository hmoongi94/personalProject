import React, { useState, useEffect } from "react";

import { ExerciseData } from "@/app/lib/interface";

interface TimerProps {
  initialExerciseData: ExerciseData[];
}

const Timer: React.FC<TimerProps> = ({ initialExerciseData }) => {
  // console.log(initialExerciseData);
  //* Extract names from initialExerciseData
  const exerciseNames = initialExerciseData.map((exercise) => exercise.name);

  // * 상태들
  const [countdown, setCountdown] = useState<number | null>(null);
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [executionCount, setExecutionCount] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [repsValue, setRepsValue] = useState<number>(0);
  const [weightsValue, setWeightsValue] = useState<number>(0);

  // * 새로고침
  const handleRefresh = () => {
    setCountdown(null);
    setInitialCountdown(0);
    setIsActive(false);
    setExecutionCount(0);
    setSelectedExercise(null);
    setRepsValue(0);
    setWeightsValue(0);
    setTags([]);
    setTotalReps(0);
    setTotalWeights(0);
  };

  // * 타이머 동작
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && countdown !== null && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown !== null && prevCountdown > 0) {
            return prevCountdown - 1;
          }
          return prevCountdown;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, countdown]);

  // * 타이머가 0이 되었을때
  useEffect(() => {
    if (countdown === 0) {
      setIsActive(false);
      setCountdown(initialCountdown);
      // Countdown이 0이 되었을 때 메시지 띄우기
      window.alert("휴식 끝! 운동을 다시 시작하세요~");
    }
  }, [countdown, initialCountdown]);

  //* 태그를 관리하기 위한 state 추가
  const [tags, setTags] = useState<React.ReactElement[]>([]);
  const [totalReps, setTotalReps] = useState(0);
  const [totalWeights, setTotalWeights] = useState(0);

  const createPTagForSet = (
    setCount: number,
    repsValue: number,
    weightsValue: number
  ): React.ReactElement => {
    const tagContent = `${setCount}세트: ${repsValue} reps, ${weightsValue} kg`;
    return (
      <p key={`set-${setCount}`} className="mb-2">
        {tagContent}
      </p>
    );
  };

  const handleStartStop = () => {
    if (
      isActive === false &&
      countdown === initialCountdown &&
      initialCountdown !== 0 &&
      (!selectedExercise || repsValue === 0)
    ) {
      alert("진행할 운동을 선택하시고 Reps를 정해주세요.");
      return; // 중단하고 함수 종료
    }

    if (
      isActive === false &&
      countdown === initialCountdown &&
      initialCountdown !== 0
    ) {
      setExecutionCount((prevCount) => prevCount + 1);

      const tag = createPTagForSet(executionCount + 1, repsValue, weightsValue);
      setTags((prevTags) => [...prevTags, tag]);

      // Total Reps 갱신
      setTotalReps((prevTotalReps) => prevTotalReps + repsValue);
      setTotalWeights((prevTotalWeights) => prevTotalWeights + weightsValue);
    }

    if (isActive === false && initialCountdown === 0) {
      setIsActive((prevIsActive) => !prevIsActive);
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
    setRepsValue(0);
    setWeightsValue(0);
    setExecutionCount(0);
    setTotalReps(0);
    setTotalWeights(0);
    setSelectedExercise(null);
    setTags([]);
  };

  const handleBreaktimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInitialCountdown(Math.max(newValue, 0)); // Ensure the input value is not below 0
    setCountdown(Math.max(newValue, 0));
  };

  const handleExerciseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(e.target.value);
  };

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRepsValue(Math.max(newValue, 0)); // Ensure the reps value is not below 0
  };

  const handleWeightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setWeightsValue(Math.max(newValue, 0)); // Ensure the Weights value is not below 0
  };

  // * 기록할 데이터 서버로 보내주기
  const handleRecord = () => {
    const token = localStorage.getItem("token"); // 사용자 토큰 가져오기
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString()

    // 아직 보낼 데이터가 없을 때 조건 걸기.
    if (totalReps === 0) {
      alert("아직 진행한 세트가 없습니다.");
      return;
    }

    // 토큰이 없을 경우 alert 창 띄우기
    if (!token) {
      const userConfirmed = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (userConfirmed) {
        window.location.href = "/login";
      }
      return;
    }

    // Send the data to the server (replace the URL with your actual server endpoint)
    fetch("http://43.200.231.255:3560/recordData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        totalWeights,
        totalReps,
        selectedExercise,
        executionCount,
        formattedDate
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          // 서버 응답이 성공인 경우
          const data = await response.json();
          console.log("Recorded successfully:", data);

          // 여기서 값 초기화 로직 추가
          setRepsValue(0);
          setWeightsValue(0);
          setExecutionCount(0);
          setSelectedExercise(null);
          setTags([]);
          setTotalReps(0);
          setTotalWeights(0);
        } else {
          // 서버 응답이 실패인 경우
          const error = await response.json();
          console.error("Error recording data:", error);
          // 실패했을 때 추가적으로 수행할 작업이 있다면 여기에 추가
        }
      })
      .catch((error) => {
        // 네트워크 오류 등으로 인한 실패
        console.error("Error recording data:", error);
        // 실패했을 때 추가적으로 수행할 작업이 있다면 여기에 추가
      });
  };

  // Format the countdown into hh:mm:ss
  const formatTime = (timeInSeconds: number | null): string => {
    if (timeInSeconds === null) {
      return "00:00:00";
    }
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-[80vh] flex justify-evenly items-center">
      <div className="h-full flex justify-center items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
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
        <label className="flex items-center mb-4">
          Enter Reps:
          <input
            className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
            type="number"
            value={repsValue}
            onChange={handleRepsChange}
          />
        </label>
        <label className="flex items-center mb-4">
          Enter Weights:
          <input
            className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
            type="number"
            value={weightsValue}
            onChange={handleWeightsChange}
          />
        </label>

        {tags.map((tag, index) => (
          <React.Fragment key={index}>{tag}</React.Fragment>
        ))}
        <p>Total Reps: {totalReps}</p>
        <p>Total Weights: {totalWeights} kg</p>
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
          BreakTime: {formatTime(countdown)}
        </h1>
        <label className="flex items-center mb-4">
          Countdown:
          <input
            className="ml-2 p-2 border border-gray-300 rounded text-slate-950"
            type="number"
            value={initialCountdown}
            onChange={handleBreaktimeChange}
          />
        </label>
        <div className="flex space-x-4">
          <button
            className={`${
              isActive ? "bg-blue-500" : "bg-green-500"
            } text-white px-4 py-2 rounded`}
            onClick={handleStartStop}
          >
            {isActive
              ? "Pause"
              : initialCountdown === countdown
              ? "SetDone-BreaktimeStart"
              : "Resume"}
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
