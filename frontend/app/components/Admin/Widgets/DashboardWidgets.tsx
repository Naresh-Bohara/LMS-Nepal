import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
};

const CircularProgressWithLabel: FC<{ value?: number; open?: boolean }> = ({
  value,
  open,
}) => (
  <Box sx={{ position: "relative", display: "inline-flex" }}>
    <CircularProgress
      variant="determinate"
      value={value}
      size={50}
      color={value && value > 99 ? "info" : "error"}
      thickness={4}
      style={{ zIndex: open ? -1 : 1 }}
    />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#6abfc1",
      }}
    ></Box>
  </Box>
);

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) return;

    if (data && ordersData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          usersPreviousMonth !== 0
            ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
              100
            : 100;

        const ordersPercentChange =
          ordersPreviousMonth !== 0
            ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
              100
            : 100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });

        setOrdersComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-8 px-4 md:px-6 min-h-screen space-y-8">
      {/* Top Section - User Analytics + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[75%,25%] gap-6">
        {/* User Analytics Chart */}
        <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow border border-gray-100 dark:border-gray-700">
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Stats Cards */}
        <div className="flex flex-col space-y-6">
          {/* Orders Stat */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#6abfc1]/10 to-[#5aa8a9]/20 dark:from-[#111C43] dark:to-[#1a2a5a] shadow border border-gray-100 dark:border-gray-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <BiBorderLeft className="text-[#6abfc1] text-3xl mb-2" />
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ordersComparePercentage?.currentMonth ?? 0}
                </h5>
                <p className="text-sm font-medium text-gray-600 dark:text-[#45CBA0]">
                  Sales Obtained
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel
                  value={
                    ordersComparePercentage?.percentChange > 0 ? 100 : 0
                  }
                  open={open}
                />
                <span
                  className={`pt-2 text-sm font-medium ${
                    ordersComparePercentage?.percentChange > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {ordersComparePercentage?.percentChange > 0
                    ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                    : ordersComparePercentage?.percentChange
                    ? ordersComparePercentage?.percentChange.toFixed(2)
                    : "0"}{" "}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Users Stat */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#6abfc1]/10 to-[#5aa8a9]/20 dark:from-[#111C43] dark:to-[#1a2a5a] shadow border border-gray-100 dark:border-gray-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <PiUsersFourLight className="text-[#6abfc1] text-3xl mb-2" />
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userComparePercentage?.currentMonth ?? 0}
                </h5>
                <p className="text-sm font-medium text-gray-600 dark:text-[#45CBA0]">
                  New Users
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <span
                  className={`pt-2 text-sm font-medium ${
                    userComparePercentage?.percentChange > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : userComparePercentage?.percentChange
                    ? userComparePercentage?.percentChange.toFixed(2)
                    : "0"}{" "}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Orders Analytics + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%,35%] gap-6">
        {/* Orders Analytics Chart */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          <OrdersAnalytics isDashboard={true} />
        </div>

        {/* Recent Transactions */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
