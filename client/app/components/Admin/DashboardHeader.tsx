"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-4 fixed top-0 right-0 z-[200] pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <ThemeSwitcher />
        <div
          className="relative cursor-pointer p-2"
          onClick={() => setOpen && setOpen(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-1 -right-1 bg-[#0EA5E9] rounded-full w-[18px] h-[18px] text-[11px] flex items-center justify-center text-white font-medium">
            {notifications && notifications.length}
          </span>
        </div>
      </div>

      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 bg-white shadow-xl absolute top-14 right-4 z-[300] rounded-xl pointer-events-auto">
          <h5 className="text-center text-[16px] font-semibold text-gray-900 dark:text-white p-3 border-b border-gray-100 dark:border-gray-700">
            Notifications
          </h5>
          {notifications && notifications.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No new notifications</p>
          )}
          {notifications && notifications.map((item: any, index: number) => (
            <div
              className="bg-gray-50 dark:bg-gray-700 rounded-lg m-2 p-3"
              key={index}
            >
              <div className="w-full flex items-center justify-between mb-1">
                <p className="text-gray-900 dark:text-white font-medium text-sm">{item.title}</p>
                <button
                  className="text-[#0EA5E9] text-xs hover:underline"
                  onClick={() => handleNotificationStatusChange(item._id)}
                >
                  Mark read
                </button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.message}</p>
              <p className="text-gray-400 text-xs mt-1">{format(item.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;