import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

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

        const usersPercentChange = usersPreviousMonth !== 0
          ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100
          : 100;

        const ordersPercentChange = ordersPreviousMonth !== 0
          ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100
          : 100;

        setuserComparePercentage({
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
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Sales Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#e0f2fe] rounded-lg flex items-center justify-center">
              <BiBorderLeft className="text-[#0EA5E9] text-[20px]" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              ordersComparePercentage?.percentChange > 0
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}>
              {ordersComparePercentage?.percentChange > 0
                ? <AiOutlineArrowUp size={12} />
                : <AiOutlineArrowDown size={12} />}
              {ordersComparePercentage?.percentChange
                ? Math.abs(ordersComparePercentage.percentChange).toFixed(1) + "%"
                : "0%"}
            </span>
          </div>
          <h3 className="text-[28px] font-bold text-gray-900 dark:text-white">
            {ordersComparePercentage?.currentMonth ?? 0}
          </h3>
          <p className="text-gray-400 text-sm mt-1">Sales this month</p>
          <p className="text-gray-300 dark:text-gray-600 text-xs mt-2">
            vs {ordersComparePercentage?.previousMonth ?? 0} last month
          </p>
        </div>

        {/* Users Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#e0f2fe] rounded-lg flex items-center justify-center">
              <PiUsersFourLight className="text-[#0EA5E9] text-[20px]" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              userComparePercentage?.percentChange > 0
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}>
              {userComparePercentage?.percentChange > 0
                ? <AiOutlineArrowUp size={12} />
                : <AiOutlineArrowDown size={12} />}
              {userComparePercentage?.percentChange
                ? Math.abs(userComparePercentage.percentChange).toFixed(1) + "%"
                : "0%"}
            </span>
          </div>
          <h3 className="text-[28px] font-bold text-gray-900 dark:text-white">
            {userComparePercentage?.currentMonth ?? 0}
          </h3>
          <p className="text-gray-400 text-sm mt-1">New users this month</p>
          <p className="text-gray-300 dark:text-gray-600 text-xs mt-2">
            vs {userComparePercentage?.previousMonth ?? 0} last month
          </p>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

        {/* User Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-4">
            User Growth
          </h3>
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Orders Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-4">
            Orders Overview
          </h3>
          <OrdersAnalytics isDashboard={true} />
        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h3>
        <AllInvoices isDashboard={true} />
      </div>

    </div>
  );
};

export default DashboardWidgets;