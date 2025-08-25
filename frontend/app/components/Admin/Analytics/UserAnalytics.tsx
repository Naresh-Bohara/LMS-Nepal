import { styles } from "@/app/styles/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  // Prepare chart data
  const analyticsData: any = [];
  data?.users.last12Months.forEach((item: any) => {
    analyticsData.push({ name: item.month, count: item.count });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`
            ${!isDashboard ? "mt-10" : "mt-6"}
            ${isDashboard ? "dark:bg-[#111C43] bg-white shadow-md rounded-lg" : ""}
            pb-4 transition-all duration-300
          `}
        >
          {/* Header */}
          <div className={`${isDashboard ? "ml-6 mb-4" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard ? "!text-lg" : "!text-2xl"
              } px-4 !text-start`}
            >
              User Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-4 text-sm`}>
                User growth in the last 12 months
              </p>
            )}
          </div>

          {/* Chart */}
          <div
            className={`w-full ${
              isDashboard ? "h-[22vh]" : "h-[55vh]"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "95%" : "90%"}
              height={!isDashboard ? "70%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                {/* Background Grid */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.15}
                  vertical={false}
                />

                {/* X Axis */}
                <XAxis
                  dataKey="name"
                  stroke="#aaa"
                  tick={{ fill: "#aaa", fontSize: 11 }}
                  interval={1}
                />

                {/* Y Axis */}
                <YAxis
                  stroke="#aaa"
                  tick={{ fill: "#aaa", fontSize: 11 }}
                  allowDecimals={false}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "6px",
                    border: "none",
                    color: "#fff",
                    fontSize: "13px",
                    padding: "6px 10px",
                  }}
                  labelStyle={{
                    color: "#6abfc1",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                  cursor={{ stroke: "#6abfc1", strokeWidth: 1 }}
                />

                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6abfc1" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="#6abfc1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Data Line */}
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6abfc1"
                  strokeWidth={2.5}
                  fill="url(#userGradient)"
                  activeDot={{ r: 5, fill: "#5aa8a9", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
