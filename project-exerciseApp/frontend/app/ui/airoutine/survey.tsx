import React, { useState } from 'react';

interface ExerciseSurveyProps {}

const ExerciseSurvey: React.FC<ExerciseSurveyProps> = () => {
  const [purpose, setPurpose] = useState<string>('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [exerciseTime, setExerciseTime] = useState<string>('');
  const [exerciseFrequency, setExerciseFrequency] = useState<string>('');

  const purposes: string[] = ['체지방 감량', '근육량 증가', '적당한 몸'];

  const focusOptions: { id: string; label: string }[] = [
    { id: 'wholeBody', label: '전체적' },
    { id: 'back', label: '등' },
    { id: 'arms', label: '팔' },
    { id: 'chest', label: '가슴' },
    { id: 'abs', label: '복근' },
    { id: 'legs', label: '하체' }
  ];

  const exerciseTimes: string[] = ['30분', '1시간', '1시간 30분', '2시간'];

  const exerciseFrequencies: string[] = ['주 1회', '주 2회', '주 3회', '주 4회', '주 5회', '주 6회', '매일'];

  const handlePurposeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPurpose(event.target.value);
  };

  const handleFocusAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFocusAreas = [...focusAreas];
    const index = selectedFocusAreas.indexOf(event.target.value);
    if (index === -1) {
      selectedFocusAreas.push(event.target.value);
    } else {
      selectedFocusAreas.splice(index, 1);
    }
    setFocusAreas(selectedFocusAreas);
  };

  const handleExerciseTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExerciseTime(event.target.value);
  };

  const handleExerciseFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExerciseFrequency(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Selected Purpose:', purpose);
    console.log('Selected Focus Areas:', focusAreas);
    console.log('Selected Exercise Time:', exerciseTime);
    console.log('Selected Exercise Frequency:', exerciseFrequency);

    // Here you can perform additional actions, such as API calls
  };

  return (
    <div>
      <h1>Exercise Survey</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="purpose">목적:</label>
          <select id="purpose" value={purpose} onChange={handlePurposeChange}>
            <option value="">목적을 선택하세요</option>
            {purposes.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label>어느 부분을 집중할 것인지:</label>
          {focusOptions.map((option) => (
            <div key={option.id}>
              <input
                type="checkbox"
                id={option.id}
                value={option.id}
                checked={focusAreas.includes(option.id)}
                onChange={handleFocusAreaChange}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="exerciseTime">운동 시간:</label>
          <select id="exerciseTime" value={exerciseTime} onChange={handleExerciseTimeChange}>
            <option value="">운동 시간을 선택하세요</option>
            {exerciseTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="exerciseFrequency">일주일에 몇번 운동할지:</label>
          <select id="exerciseFrequency" value={exerciseFrequency} onChange={handleExerciseFrequencyChange}>
            <option value="">운동 횟수를 선택하세요</option>
            {exerciseFrequencies.map((frequency) => (
              <option key={frequency} value={frequency}>{frequency}</option>
            ))}
          </select>
        </div>

        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default ExerciseSurvey;