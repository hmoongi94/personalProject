import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const WorkoutHistory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    // Fetch workout data for the selected date from the server
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];

        const response = await fetch(
          `http://localhost:3560/workoutHistory?date=${formattedDate}`
        );

        if (response.ok) {
          const data = await response.json();
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Workout History</h1>
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