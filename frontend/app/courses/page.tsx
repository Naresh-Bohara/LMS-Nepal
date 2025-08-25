"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setcourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
  if (!data?.courses) return;

  let filteredCourses = data.courses;

  if (category !== "All") {
    filteredCourses = filteredCourses.filter((item: any) =>
      item.categories?.includes(category)
    );
  }

  if (search) {
    filteredCourses = filteredCourses.filter((item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  setcourses(filteredCourses);
}, [data, category, search]);


  const categories = categoriesData?.layout?.categories;

  return (
  <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <Header
          route={route}
          setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={1}
        />

        <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
          {/* SEO Heading */}
          <Heading
            title="All courses - LMS-Nepal"
            description="LMS-Nepal is a premium learning platform for programmers."
            keywords="Nepal LMS, programming courses, coding skills, web dev, MERN"
          />

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Browse All Courses
          </h1>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* All Button */}
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 shadow-sm 
                ${
                  category === "All"
                    ? "bg-[#6abfc1] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-[#6abfc1] hover:text-white"
                }`}
              onClick={() => setCategory("All")}
            >
              All
            </button>

            {/* Dynamic Categories */}
            {categories &&
              categories.map((item: any, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 shadow-sm
                    ${
                      category === item.title
                        ? "bg-[#6abfc1] text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-[#6abfc1] hover:text-white"
                    }`}
                  onClick={() => setCategory(item.title)}
                >
                  {item.title}
                </button>
              ))}
          </div>

          {/* No Courses Found */}
          {courses && courses.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              <Image
                src="/images/empty-state.svg"
                height={200}
                width={200}
                alt="No Courses"
                className="w-48 mb-4 opacity-80"
              />
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {search
                  ? "No courses match your search query."
                  : "No courses found in this category. Please try another one!"}
              </p>
            </div>
          )}

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 gap-6 mt-8">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
          </div>
        </div>

        <Footer />
      </>
    )}
  </div>
);

};

export default Page;
