"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiX } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assests/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Successfully");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mb-[120px] relative">
          {/* Main Header */}
          <div
            className={`fixed top-0 left-0 w-full h-[80px] z-[80] border-b transition-colors duration-500
      ${
        active
          ? "shadow-xl bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:bg-opacity-50 dark:border-[#ffffff1c]"
          : "bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:bg-opacity-50 border-b dark:border-[#ffffff1c] dark:shadow"
      }
    `}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">
                {/* Logo */}
                <div className="pr-2 800px:pr-0">
                  <Link
                    href={"/"}
                    className="text-[25px] font-Poppins font-[600] text-primary dark:text-primary-light"
                  >
                    LMS-Nepal
                  </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                  <NavItems activeItem={activeItem} isMobile={false} />     

                  {/* Theme Switcher */}
                  <ThemeSwitcher />

                  {/* Profile Icon (Visible on all screens) */}
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                        alt=""
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{
                          border:
                            activeItem === 5
                              ? "2px solid #4ea6a9"
                              : "2px solid transparent",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer text-primary dark:text-primary-light"
                      onClick={() => setOpen(true)}
                    />
                  )}

                  {/* Mobile menu button */}
                  <div className="800px:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer text-primary dark:text-primary-light"
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sidebar */}
            {openSidebar && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] backdrop-blur-sm bg-black/30"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[80%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 flex flex-col">
                  {/* Top Row: Logo + Close Icon */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <Link
                      href={"/"}
                      className="text-[22px] font-Poppins font-[600] text-primary dark:text-primary-light"
                    >
                      LMS-Nepal
                    </Link>
                    <HiX
                      size={28}
                      className="cursor-pointer text-primary dark:text-primary-light hover:rotate-90 transition-transform"
                      onClick={() => setOpenSidebar(false)}
                    />
                  </div>

                  {/* Navigation Items */}
                  <NavItems activeItem={activeItem} isMobile={true} />

                  {/* User avatar / login icon inside sidebar */}
                  {userData?.user ? (
                    <Link href={"/profile"}>
                      <Image
                        src={
                          userData?.user.avatar ? userData.user.avatar.url : avatar
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                        style={{
                          border:
                            activeItem === 5
                              ? "2px solid #4ea6a9"
                              : "2px solid transparent",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={30}
                      className="cursor-pointer ms-6 text-primary dark:text-primary-light ml-[20px]"
                      onClick={() => setOpen(true)}
                    />
                  )}

                  <br />
                  <p className="text-[16px] px-2 pl-5 text-primary dark:text-primary-light mt-auto mb-6">
                    Copyright © {new Date().getFullYear()} LMS-Nepal
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modals */}
          {route === "Login" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}

          {route === "Sign-Up" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}

          {route === "Verification" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;
