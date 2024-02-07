import React, { useState, ChangeEvent } from "react";

interface SearchPeriodProps {
  onSelectDates: (startDate: Date, endDate: Date) => void;
}

const SearchPeriod: React.FC<SearchPeriodProps> = ({ onSelectDates }) => {
  // 상태들
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // 날짜 선택 핸들러
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  // 데이터 요청 핸들러
  const fetchData = () => {
    // startDate와 endDate가 유효한 경우에만 데이터 요청
    if (startDate && endDate) {
      // 선택된 날짜를 Date 객체로 변환하여 부모 컴포넌트에 전달
      const start = new Date(startDate);
      const end = new Date(endDate);
      onSelectDates(start, end);
    }
  };

  return (
    <div className='container mx-auto p-4 h-full overflow-y-auto'>
      <div className='shadow-md rounded px-8 pt-6 pb-8 mb-4 '>
        {/* 날짜 선택 */}
        <h1 className='text-xl font-semibold mb-6'>기간 조회</h1>
        <div className="daySelectors flex justify-start items-center gap-12">
          <div className='mb-4'>
            <label
              htmlFor='startDate'
              className='block text-sm font-bold mb-2'
            >
              시작 날짜:
            </label>
            <input
              type='date'
              id='startDate'
              name='startDate'
              value={startDate}
              onChange={handleDateChange}
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='endDate'
              className='block  text-sm font-bold mb-2'
            >
              끝 날짜:
            </label>
            <input
              type='date'
              id='endDate'
              name='endDate'
              value={endDate}
              onChange={handleDateChange}
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
        </div>
        <button onClick={fetchData} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          데이터 조회
        </button>
      </div>
    </div>
  );
};

export default SearchPeriod;