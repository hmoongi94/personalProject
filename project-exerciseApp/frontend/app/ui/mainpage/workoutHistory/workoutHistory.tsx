import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./calender.css";
import CaloriesChart from "./carloriesChart";

interface WorkoutEntry {
  id: number;
  name: string;
  totalReps: number;
  totalSets: number;
  caloryPerReps: number;
}

const WorkoutHistory: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workoutData, setWorkoutData] = useState<WorkoutEntry[]>([]);
  const [caloriesData, setCaloriesData] = useState<WorkoutEntry[]>([]);

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
          // console.log(data)
          setWorkoutData(data);

          // Fetch additional data with caloryPerReps * totalReps
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
            const caloriesData: WorkoutEntry[] = await caloriesResponse.json();
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
        console.error("Error fetching workout data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <h1 className="text-3xl mb-10">Workout History</h1>
      <div className="flex justify-center items-center">
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
        />
        <CaloriesChart data={caloriesData} />
      </div>
      <div className="w-full">
        <h2>Selected Date: {selectedDate.toLocaleDateString()}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={workoutData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalReps" fill="#8884d8" />
            <Bar dataKey="totalSets" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutHistory;
