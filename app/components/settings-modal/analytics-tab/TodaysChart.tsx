import {
  ScatterChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  Tooltip,
} from "recharts";
import { TodaysChartWrapper } from "./Analytics.styled";

interface TodaysData {
  hour: number;
  count: number;
}
const data: TodaysData[] = [
  { hour: 9, count: 1 },
  { hour: 10, count: 2 },
  { hour: 11, count: 3 },
  { hour: 14, count: 4 },
  { hour: 15, count: 5 },
];
export const TodaysChart = () => {
  return (
    <TodaysChartWrapper>
      <ResponsiveContainer width="100%" height="100%" minHeight={350}>
        <ScatterChart width={100} height={200}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="count"
            name="Streak"
            allowDecimals={false}
          />
          <YAxis
            type="number"
            dataKey="hour"
            domain={[8, 18]}
            tickFormatter={(h) => `${h}:00`}
            name="Time"
          />
          <Tooltip />
          <Scatter name="Streak" data={data} />
        </ScatterChart>
      </ResponsiveContainer>
    </TodaysChartWrapper>
  );
};
