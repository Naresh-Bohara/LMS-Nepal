import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  // Prepare data
  const analyticsData: any = [];
  data?.courses?.last12Months.forEach((item: any) => {
    analyticsData.push({ name: item.month, uv: item.count });
  });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-[80vh] flex flex-col">
          {/* Heading */}
          <div className="mt-8 mb-4 px-6">
            <h1
              className={`${styles.title} !text-start text-transparent bg-clip-text bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9]`}
            >
              Course Analytics
            </h1>
            <p
              className={`${styles.label} mt-2 text-gray-600 dark:text-gray-400`}
            >
              Analytics data from the last 12 months
            </p>
          </div>

          {/* Chart Container */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-[65vh] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                  {/* Grid for readability */}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    className="dark:stroke-gray-700"
                  />

                  {/* X Axis */}
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6abfc1", fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: "#5aa8a9" }}
                    tickLine={false}
                  />

                  {/* Y Axis */}
                  <YAxis
                    domain={[minValue, "auto"]}
                    tick={{ fill: "#6abfc1", fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: "#5aa8a9" }}
                    tickLine={false}
                  />

                  {/* Tooltip */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      color: "#333",
                      fontSize: "14px",
                      padding: "8px",
                    }}
                    cursor={{ fill: "rgba(106,191,193,0.1)" }}
                  />

                  {/* Bar */}
                  <Bar
                    dataKey="uv"
                    radius={[8, 8, 0, 0]}
                    fill="url(#colorUv)"
                    animationDuration={1200}
                  >
                    <LabelList dataKey="uv" position="top" fill="#333" />
                  </Bar>

                  {/* Gradient Fill */}
                  <defs>
                    <linearGradient
                      id="colorUv"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6abfc1" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#5aa8a9" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
