import Image from "next/image";
import React, { FC, useState } from "react";
import avatarDefault from "../../../public/assests/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => Promise<void>;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    
    try {
      // Show loading toast
      const toastId = toast.loading(
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          <span>Securely logging you out...</span>
        </div>,
        {
          position: "top-center",
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            color: "#1a1a1a",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }
      );

      // Perform logout
      await logOutHandler();

      // Update toast to success
      toast.success(
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Logged out successfully!</span>
        </div>,
        {
          id: toastId,
          duration: 2000,
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            color: "#1a1a1a",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }
      );

      // Navigate after showing success message
      setTimeout(() => {
        router.replace("/");
      }, 500);
      
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Logout failed. Please try again.</span>
        </div>,
        {
          position: "top-center",
          duration: 3000,
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            color: "#1a1a1a",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Blur overlay during logout */}
      {isLoggingOut && (
        <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm z-10 rounded-lg" />
      )}

      {/* My Account */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer transition-colors ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } ${isLoggingOut ? "pointer-events-none opacity-80" : ""}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user?.avatar?.url || avatar || avatarDefault}
          alt="User avatar"
          width={30}
          height={30}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] rounded-full object-cover"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer transition-colors ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } ${isLoggingOut ? "pointer-events-none opacity-80" : ""}`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer transition-colors ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } ${isLoggingOut ? "pointer-events-none opacity-80" : ""}`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>

      {/* Admin Dashboard */}
      {user?.role === "admin" && (
        <Link
          href="/admin"
          className={`w-full flex items-center px-3 py-4 cursor-pointer transition-colors ${
            active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          } ${isLoggingOut ? "pointer-events-none opacity-80" : ""}`}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/* Logout */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer transition-colors ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } ${
          isLoggingOut 
            ? "cursor-wait opacity-90 dark:bg-slate-800/80 bg-white/80" 
            : "hover:bg-gray-100 dark:hover:bg-slate-700"
        } relative`}
        onClick={handleLogout}
      >
        {isLoggingOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
        <AiOutlineLogout
          size={20}
          className={`${
            isLoggingOut ? "opacity-0" : "dark:text-white text-black"
          }`}
        />
        <h5
          className={`pl-2 800px:block hidden font-Poppins ${
            isLoggingOut ? "opacity-0" : "dark:text-white text-black"
          }`}
        >
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;