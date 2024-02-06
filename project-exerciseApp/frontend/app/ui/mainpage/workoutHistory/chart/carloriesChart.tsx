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

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={200} height={200}>
        <Pie
          dataKey="caloryPerRepsTotal"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CaloriesChart;
