import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface CaloryEntry {
  name: string;
  caloryPerRepsTotal: number;
}

interface CaloriesChartProps {
  data: CaloryEntry[];
}

const CaloriesChart: React.FC<CaloriesChartProps> = ({ data }) => {
  const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#C70039", "#581845"];
  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart width={200} height={200}>
        <Pie
          dataKey="caloryPerRepsTotal"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="pink"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CaloriesChart;
