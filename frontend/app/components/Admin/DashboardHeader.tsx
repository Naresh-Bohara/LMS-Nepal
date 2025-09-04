"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState, useCallback, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; // Close icon
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open = false, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [audio] = useState(
    typeof window !== "undefined"
      ? new Audio(
          "https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3"
        )
      : null
  );
  const [hasPlayedSound, setHasPlayedSound] = useState(false);

  // Ref for the dropdown wrapper (to detect outside clicks)
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Ref for the bell icon button
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Play notification sound once
  const playNotificationSound = useCallback(() => {
    if (!hasPlayedSound && audio) {
      audio.play();
      setHasPlayedSound(true);
    }
  }, [audio, hasPlayedSound]);

  // Reset sound play flag when dropdown closes
  useEffect(() => {
    if (!open) setHasPlayedSound(false);
  }, [open]);

  // Update notifications list & reset sound play flag when new data arrives
  useEffect(() => {
    if (data) {
      const unread = data.notifications.filter(
        (item: any) => item.status === "unread"
      );
      setNotifications(unread);
    }
  }, [data]);

  // Listen for real-time notifications
  useEffect(() => {
    socket.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });

    return () => {
      socket.off("newNotification");
    };
  }, [refetch, playNotificationSound]);

  // Mark notification as read
  const handleNotificationStatusChange = async (id: string) => {
    try {
      await updateNotificationStatus(id).unwrap();
      refetch();
    } catch {
      // optionally handle errors here
    }
  };

  // Close dropdown if clicked outside dropdown or bell icon
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen && setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <div
      className="
        fixed top-5 right-5 z-[9999999]
        flex items-center space-x-4
        backdrop-blur-sm bg-white/70 dark:bg-[#111C43]/80
        rounded-full p-2 shadow-lg
        border border-gray-200 dark:border-[#5aa8a9]
        transition-transform duration-200
        hover:scale-105
        select-none
      "
      aria-label="Dashboard header with notifications and theme switcher"
    >
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Notification Icon */}
      <button
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Notifications (${notifications.length} unread)`}
        onClick={() => setOpen && setOpen(!open)}
        className="relative focus:outline-none"
        ref={buttonRef}
      >
        <IoMdNotificationsOutline className="text-2xl text-gray-900 dark:text-white" />
        {notifications.length > 0 && (
          <span
            className="
              absolute -top-2 -right-2
              bg-gradient-to-br from-[#6abfc1] to-[#5aa8a9]
              animate-pulse
              rounded-full w-5 h-5
              flex items-center justify-center
              text-xs font-semibold text-white
              shadow-md
              select-none
            "
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="
            absolute top-14 right-0
            w-80 max-h-[60vh]
            overflow-y-auto
            rounded-xl
            shadow-2xl
            border border-gray-200 dark:border-[#5aa8a9]
            bg-white dark:bg-[#111C43]
            backdrop-blur-md
            animate-fadeIn
            text-sm
            z-50
            flex flex-col
          "
          role="dialog"
          aria-modal="true"
          aria-label="Notifications list"
        >
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-[#5aa8a9]">
            <h5 className="text-center font-semibold text-lg text-gray-900 dark:text-white">
              Notifications
            </h5>
            {/* Close Button */}
            <button
              aria-label="Close notifications"
              onClick={() => setOpen && setOpen(false)}
              className="
                text-gray-600 dark:text-gray-300
                hover:text-gray-900 dark:hover:text-white
                transition-colors duration-200
                focus:outline-none
                p-1 rounded-full
              "
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Empty state */}
          {notifications.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 p-6">
              No new notifications
            </p>
          )}

          {/* Notification items */}
          {notifications.map((item) => (
            <div
              key={item._id}
              className="
                p-4
                border-b border-gray-100 dark:border-[#2a3952]
                hover:bg-gray-100 dark:hover:bg-[#1f2a4a]
                cursor-pointer
                transition-colors duration-200
                rounded-b-none
              "
              tabIndex={0}
              role="button"
              onClick={() => handleNotificationStatusChange(item._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleNotificationStatusChange(item._id);
                }
              }}
            >
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {item.title}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                {item.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {format(item.createdAt)}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationStatusChange(item._id);
                }}
                className="
                  mt-2 text-xs text-[#6abfc1] hover:text-[#58a9ab]
                  font-semibold
                  focus:outline-none
                "
                aria-label={`Mark notification "${item.title}" as read`}
              >
                Mark as read
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
