"use client";

import React, { useState, ChangeEvent } from "react";

export default function RevenueView() {
  // * 상태들
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
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
      </div>
    </div>
  );
}
