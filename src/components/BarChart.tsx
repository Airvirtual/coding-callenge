import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const Chart = ({ chartData }: { chartData: any }) => {
  const demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";
  return (
    <ResponsiveContainer width="95%" height={220}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />

        <Bar dataKey="daytvl" fill="#82ca9d" />
        <Bar dataKey="tvl" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
