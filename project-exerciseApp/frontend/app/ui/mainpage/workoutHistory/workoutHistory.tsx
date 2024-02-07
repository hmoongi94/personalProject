import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./calendar/calendar.css";
import SearchPeriod from "./calendar/searchPeriod";
import WorkoutChart from "./chart/workoutChart";
import CaloriesChart from "./chart/carloriesChart";

interface WorkoutEntry {
  id: number;
  name: string;
  totalReps: number;
  totalSets: number;
}

interface CaloryEntry {
  name: string;
  caloryPerRepsTotal: number;
}

interface CaloryData {
  result: CaloryEntry[];
  totalCaloryPerRepsTotal: number;
}

const WorkoutHistory: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [workoutData, setWorkoutData] = useState<WorkoutEntry[]>([]);
  const [caloriesData, setCaloriesData] = useState<CaloryData>({
    result: [],
    totalCaloryPerRepsTotal: 0,
  });

  // * 날짜를 정했을 때 데이터요청 함수 실행
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toLocaleDateString();
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3560/workoutHistory/daydata?date=${formattedDate}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: WorkoutEntry[] = await response.json();
          setWorkoutData(data);

          const caloriesResponse = await fetch(
            `http://localhost:3560/workoutHistory/datdata/calories?date=${formattedDate}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (caloriesResponse.ok) {
            const caloriesData: CaloryData = await caloriesResponse.json();
            // console.log(caloriesData)
            setCaloriesData(caloriesData);
          } else {
            console.error(
              "Error fetching calories data:",
              caloriesResponse.statusText
            );
          }
        } else {
          console.error("Error fetching workout data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  //* SearchPeriod에서 선택한 날짜를 업데이트하는 함수
  const handleDateSelect = (startDate: Date, endDate: Date) => {
    // const formattedStartDate = startDate.toLocaleDateString()
    // const formattedEndDate = endDate.toLocaleDateString()
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  // * 기간을 정했을 때 데이터를 요청하는 함수 실행
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedStartDate = selectedStartDate.toLocaleDateString();
        const formattedEndDate = selectedEndDate.toLocaleDateString();
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3560/workoutHistory/perioddata?date=${formattedStartDate}${formattedEndDate}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: WorkoutEntry[] = await response.json();
          setWorkoutData(data);

          const caloriesResponse = await fetch(
            `http://localhost:3560/workoutHistory/calories?date=${formattedStartDate}${formattedEndDate}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (caloriesResponse.ok) {
            const caloriesData: CaloryData = await caloriesResponse.json();
            // console.log(caloriesData)
            setCaloriesData(caloriesData);
          } else {
            console.error(
              "Error fetching calories data:",
              caloriesResponse.statusText
            );
          }
        } else {
          console.error("Error fetching workout data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <h1 className="text-3xl mb-10">Workout History</h1>
      <div className="flex justify-center items-center">
        <div>
          <button onClick={() => setShowCalendar(true)}>
            Show day record/
          </button>
          <button onClick={() => setShowCalendar(false)}>
            Data inqury by period
          </button>
          {showCalendar ? (
            <div className=" mt-5">
              <h2>Selected Date: {selectedDate.toLocaleDateString()}</h2>
              <Calendar
                onChange={(date) => setSelectedDate(date as Date)}
                value={selectedDate}
              />
            </div>
          ) : (
            <div className="mt-5">
              <h2>
                Selected Start Date:{selectedStartDate.toLocaleDateString()}{" "}
              </h2>
              <h2>Selected End Date:{selectedEndDate.toLocaleDateString()}</h2>
              <SearchPeriod onSelectDates={handleDateSelect} />
              {/* handleDateSelect는 onSelectDates함수가 실행될 때 실행되는 콜백함수? */}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center ml-24">
          <CaloriesChart data={caloriesData.result} />
          <div>
            total consume calories: {caloriesData.totalCaloryPerRepsTotal}
          </div>
        </div>
      </div>
      <div className="w-full">
        <WorkoutChart data={workoutData} />
      </div>
    </div>
  );
};

export default WorkoutHistory;
