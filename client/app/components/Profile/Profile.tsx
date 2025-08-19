"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Link from "next/link";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  // Scroll Listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  // Filter purchased courses
  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[90%] flex mx-auto gap-6">
      {/* Sidebar */}
      <div
        className={`w-[70px] 800px:w-[300px] h-[460px] 
        dark:bg-slate-900 bg-white 
        border border-[#00000014] dark:border-[#ffffff1d] 
        rounded-2xl shadow-md 
        transition-all duration-300 ease-in-out 
        mt-[80px] mb-[80px] sticky 
        ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]
        hover:shadow-xl`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {/* Profile Info Section */}
      {active === 1 && (
        <div className="flex-1 bg-transparent mt-[80px]">
          <div className="rounded-2xl p-6 bg-white dark:bg-slate-800 border border-[#00000014] dark:border-[#ffffff1d] shadow-sm">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        </div>
      )}

      {/* Change Password Section */}
      {active === 2 && (
        <div className="flex-1 bg-transparent mt-[80px]">
          <div className="rounded-2xl p-6 bg-white dark:bg-slate-800 border border-[#00000014] dark:border-[#ffffff1d] shadow-sm">
            <ChangePassword />
          </div>
        </div>
      )}

      {/* Courses Section */}
      {active === 3 && (
        <div className="flex-1 pl-4 pr-2 800px:px-10 mt-[80px]">
          {/* Courses Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 mb-12">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-2xl border border-[#00000014] dark:border-[#ffffff1d] shadow-sm">
              {/* Placeholder Illustration */}
              <div className="w-20 h-20 mb-6 rounded-full bg-[#6abfc133] dark:bg-[#6abfc120] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#6abfc1]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              {/* Message */}
              <h1 className="text-xl font-Poppins font-semibold text-gray-800 dark:text-gray-200">
                No Purchased Courses Yet
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
                It looks like you haven’t enrolled in any courses yet. Explore our
                courses and start your learning journey today!
              </p>

              {/* CTA Button */}
              <Link
                href="/courses"
                className="inline-block mt-6 px-6 py-2.5 rounded-lg font-medium text-white bg-[#6abfc1] hover:bg-[#5aadb0] transition-colors shadow-sm hover:shadow-md"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
