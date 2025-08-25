import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <section
      className="
        w-full py-16 sm:py-20 lg:py-24
        bg-gradient-to-b from-white via-[#f7f9fb] to-[#eef3f6]
        dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e293b]
        transition-colors duration-500
      "
      aria-labelledby="courses-heading"
    >
      <div className="w-[90%] 800px:w-[80%] mx-auto">
        {/* ====== Heading Section ====== */}
        <div className="text-center mb-12">
          <h1
            id="courses-heading"
            className="
              font-Poppins font-extrabold
              text-[26px] sm:text-3xl md:text-4xl lg:text-5xl
              leading-snug sm:leading-tight lg:leading-[60px]
              tracking-tight text-black dark:text-white
              animate-fade-in
            "
          >
            Expand Your Career{" "}
            <span
              className="
                bg-gradient-to-r from-[#6abfc1] to-[#45CBA0]
                bg-clip-text text-transparent
                animate-gradient-x
              "
            >
              Opportunities
            </span>
            <br className="hidden sm:block" /> With Our Premium Courses
          </h1>

          <p
            className="
              text-gray-600 dark:text-gray-300
              max-w-2xl mx-auto
              mt-4 text-sm sm:text-base md:text-lg
            "
          >
            Gain industry‑ready skills with courses designed for Nepalese learners and aligned with global standards. Learn anytime, anywhere — at your own pace.
          </p>
        </div>

        {/* ====== Courses Grid ====== */}
        <div
          className="
            grid
            grid-cols-1 gap-6
            sm:grid-cols-2 sm:gap-8
            lg:grid-cols-3 lg:gap-10
            2xl:grid-cols-4 2xl:gap-12
            relative
          "
        >
          {/* Loading Skeleton */}
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="
                  animate-pulse rounded-xl
                  bg-gray-200 dark:bg-gray-700
                  h-64 w-full
                  shadow-md
                "
              ></div>
            ))
          ) : courses && courses.length > 0 ? (
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No courses available"
                className="w-20 h-20 mx-auto mb-4 opacity-80"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No courses available at the moment.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="
                  mt-3 px-5 py-2 rounded-lg
                  bg-gradient-to-r from-[#6abfc1] to-[#45CBA0]
                  text-white font-semibold
                  hover:scale-105 transition-transform
                  shadow-md
                "
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
