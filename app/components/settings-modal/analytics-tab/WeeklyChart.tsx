import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { WeeklyChartWrapper } from "./Analytics.styled";

interface WeeklyData {
  name: string;
  streak: number;
  totalTime: number;
}
const data: WeeklyData[] = [
  {
    name: "Monday",
    streak: 10,
    totalTime: 400,
  },
  {
    name: "Tuesday",
    streak: 3,
    totalTime: 400,
  },
  {
    name: "Wednesday",
    streak: 10,
    totalTime: 400,
  },
  {
    name: "Thursday",
    streak: 9,
    totalTime: 400,
  },
  {
    name: "Friday",
    streak: 7,
    totalTime: 400,
  },
  {
    name: "Saturday",
    streak: 3,
    totalTime: 400,
  },
  {
    name: "Sunday",
    streak: 10,
    totalTime: 400,
  },
];
export const WeeklyChart = () => {
  return (
    <WeeklyChartWrapper>
      <ResponsiveContainer width="100%" height="100%" minHeight={350}>
        <BarChart width={100} height={200} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="streak" />
        </BarChart>
      </ResponsiveContainer>
    </WeeklyChartWrapper>
  );
};
