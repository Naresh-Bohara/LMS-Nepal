import { styles } from "@/app/styles/style";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];
  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.name, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard ? "h-[22vh]" : "h-[70vh]"
          } transition-all duration-300`}
        >
          {/* Title */}
          <div
            className={`${isDashboard ? "pl-6 mt-1 mb-1" : "px-5 mt-[30px]"}`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard ? "!text-[16px]" : "!text-[22px]"
              } !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} text-sm`}>
                Last 12 months order trends
              </p>
            )}
          </div>

          {/* Chart */}
          <div
            className={`w-full ${
              isDashboard ? "h-full" : "h-[80%]"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "60%"}
            >
              <LineChart
                data={analyticsData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                {/* Subtle grid */}
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

                {/* Axes */}
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  tick={{ fill: "#888", fontSize: 10 }}
                  tickMargin={4}
                />
                <YAxis
                  stroke="#888"
                  tick={{ fill: "#888", fontSize: 10 }}
                  allowDecimals={false}
                  width={30}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  labelStyle={{
                    color: "#6abfc1",
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                  cursor={{ stroke: "#6abfc1", strokeWidth: 1 }}
                />

                {/* Gradient line */}
                <defs>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6abfc1" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6abfc1" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="url(#ordersGradient)"
                  strokeWidth={2}
                  dot={{
                    r: 3,
                    strokeWidth: 1.5,
                    stroke: "#6abfc1",
                    fill: "#1e293b",
                  }}
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#6abfc1",
                    fill: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
