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
        <Bar dataKey="totalSets" fill="#ffc952" /> {/* 새로운 색상: 노란색 */}
        <Bar dataKey="totalReps" fill="#ff6f61" /> {/* 새로운 색상: 빨간색 */}
        <Bar dataKey="totalWeights" fill="#67b7dc" /> {/* 새로운 색상: 파란색 */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
