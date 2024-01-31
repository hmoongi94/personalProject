import React, { useState } from 'react';

const ExerciseDiary = () => {
  // 달력의 날짜와 해당 날짜에 기록된 내용을 state로 관리
  const [calendar, setCalendar] = useState([
    { date: '2024-02-01', note: 'Meeting with team' },
    { date: '2024-02-15', note: 'Project deadline' },
    // 기타 초기 데이터
  ]);

  // 기록을 추가할 때 사용할 state
  const [newNote, setNewNote] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // 날짜를 클릭하면 해당 날짜의 기록을 표시하는 함수
  const handleDateClick = (date: React.SetStateAction<string>) => {
    setSelectedDate(date);
    const noteForDate = calendar.find((item) => item.date === date)?.note || '';
    setNewNote(noteForDate);
  };

  // 기록을 저장하는 함수
  const saveNote = () => {
    // 선택된 날짜에 대한 기록이 이미 존재하는지 확인
    const existingNoteIndex = calendar.findIndex((item) => item.date === selectedDate);

    // 기존에 날짜에 대한 기록이 있으면 업데이트, 없으면 추가
    if (existingNoteIndex !== -1) {
      const updatedCalendar = [...calendar];
      updatedCalendar[existingNoteIndex].note = newNote;
      setCalendar(updatedCalendar);
    } else {
      setCalendar([...calendar, { date: selectedDate, note: newNote }]);
    }

    // 입력 필드 초기화
    setNewNote('');
  };

  return (
    <div>
      <h1>Calendar</h1>
      <div>
        {/* 여기에 실제 달력 표시 로직이 들어갈 수 있습니다. */}
        {/* 각 날짜를 클릭하면 handleDateClick 함수를 호출하도록 구현 */}
        {/* 날짜에 따른 기록도 표시 가능 */}
      </div>
      <div>
        {/* 선택된 날짜에 대한 기록을 입력할 수 있는 입력 필드 */}
        <input
          type="text"
          placeholder="Add note for selected date"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        {/* 선택된 날짜에 대한 기록을 저장하는 버튼 */}
        <button onClick={saveNote}>Save Note</button>
      </div>
    </div>
  );
};

export default ExerciseDiary;