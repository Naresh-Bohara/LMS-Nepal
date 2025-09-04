import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogout = (logOutHandler: () => Promise<void>) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const toastId = toast.loading(
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          <span>Securely logging you out...</span>
        </div>,
        {
          position: "top-center",
          style: {
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
            color: "#1a1a1a",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }
      );

      await logOutHandler();

      toast.success(
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Logged out successfully!</span>
        </div>,
        {
          id: toastId,
          duration: 2000,
          style: {
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
            color: "#1a1a1a",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }
      );

      setTimeout(() => {
        router.replace("/");
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { isLoggingOut, handleLogout };
};
