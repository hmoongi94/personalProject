import React, { useState, useEffect, ChangeEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./calender.css"; 

interface WorkoutEntry {
  id: number;
  exerciseName: string;
  reps: number;
  sets: number;
}

const WorkoutHistory: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workoutData, setWorkoutData] = useState<WorkoutEntry[]>([]);

  useEffect(() => {
    // Fetch workout data for the selected date from the server
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        console.log(formattedDate)

        const response = await fetch(
          `http://localhost:3560/workoutHistory?date=${formattedDate}`
        );

        if (response.ok) {
          const data: WorkoutEntry[] = await response.json();
          setWorkoutData(data);
        } else {
          console.error("Error fetching workout data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      // Handle date as an array if needed
      return;
    }
    setSelectedDate(date);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <h1 className="text-3xl mb-10">Workout History</h1>
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div>
        <h2>Selected Date: {selectedDate.toISOString().split("T")[0]}</h2>
        <ul>
          {workoutData.map((entry) => (
            <li key={entry.id}>
              Exercise: {entry.exerciseName}, Reps: {entry.reps}, Sets:{" "}
              {entry.sets}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutHistory;
