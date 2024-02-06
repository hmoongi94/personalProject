import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface WorkoutEntry {
  id: number;
  name: string;
  totalReps: number;
  totalSets: number;
  caloryPerReps: number;
}

interface CaloriesChartProps {
  data: WorkoutEntry[];
}

const CaloriesChart: React.FC<CaloriesChartProps> = ({ data }) => {
  const COLORS = ["#FF7300", "#FFC837", "#FFAB00", "#FFD55F", "#FFC300"];

  return (
    <ResponsiveContainer width="50%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="caloryPerRepsTotal"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CaloriesChart;
