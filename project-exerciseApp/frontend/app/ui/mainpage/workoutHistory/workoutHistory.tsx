import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./calendar/calendar.css";
import Calendartest from "./calendar/calendar"
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workoutData, setWorkoutData] = useState<WorkoutEntry[]>([]);
  const [caloriesData, setCaloriesData] = useState<CaloryData>({
    result: [],
    totalCaloryPerRepsTotal: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toLocaleDateString();
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3560/workoutHistory?date=${formattedDate}`,
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
            `http://localhost:3560/workoutHistory/calories?date=${formattedDate}`,
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

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <h1 className="text-3xl mb-10">Workout History</h1>
      <div className="flex justify-center items-center">
        {/* <Calendartest /> */}
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
        />
        <div className="flex flex-col items-center ml-24">
          <CaloriesChart data={caloriesData.result} />
          <div>total consume calories: {caloriesData.totalCaloryPerRepsTotal}</div>
        </div>
      </div>
      <div className="w-full">
        <h2>Selected Date: {selectedDate.toLocaleDateString()}</h2>
        <WorkoutChart data={workoutData} />
      </div>
    </div>
  );
};

export default WorkoutHistory;