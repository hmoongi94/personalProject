import React from "react";
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

import { WorkoutEntry } from "@/app/lib/interface";

interface ChartProps {
  data: WorkoutEntry[]; // 데이터 타입은 WorkoutEntry[]로 설정할 수 있습니다.
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
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
  );
};

export default ChartComponent;
