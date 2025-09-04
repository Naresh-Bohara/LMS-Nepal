"use client";

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";

// ===== Socket Setup =====
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

// ===== Fonts =====
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

// ===== Root Layout =====
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Only render ThemeProvider on client
  useEffect(() => setMounted(true), []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${poppins.variable} ${josefin.variable}
          font-sans antialiased
          min-h-screen
          bg-gradient-to-b from-[#f8ffff] to-[#e8f7f7] 
          dark:from-[#111827] dark:to-[#111827]
          text-gray-800 dark:text-gray-100
          transition-colors duration-500
        `}
      >
        <Providers>
          <SessionProvider>
            {mounted ? (
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <AppWrapper>{children}</AppWrapper>
                <Toaster
                  position="top-center"
                  toastOptions={{
                    style: {
                      background: "linear-gradient(to right, #6abfc1, #5aa8a9)",
                      color: "#fff",
                      fontWeight: 500,
                      borderRadius: "10px",
                      padding: "12px 18px",
                      boxShadow:
                        "0 4px 15px rgba(0,0,0,0.2), 0 2px 8px rgba(106,191,193,0.3)",
                    },
                  }}
                />
              </ThemeProvider>
            ) : null}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

// ===== Custom Wrapper with Loader & Socket =====
const AppWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    if (!ENDPOINT) return console.warn("Socket server URI not set.");
    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("Socket disconnected"));
    return () => socket.disconnect();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] dark:from-[#0f2b2b] dark:to-[#0a1e1e]">
      <Loader />
    </div>
  ) : (
    <main className="transition-opacity duration-500 ease-out">{children}</main>
  );
};
