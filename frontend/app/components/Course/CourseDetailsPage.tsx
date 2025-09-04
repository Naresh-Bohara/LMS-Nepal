"use client";

import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: userData } = useLoadUserQuery(undefined);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  if (isLoading) return <Loader />;

  const course = data?.course;

  if (!course)
    return (
      <div className="text-center py-10 text-gray-500">
        Course not found.
      </div>
    );

  // Check if user already purchased the course
  const isPurchased =
    user &&
    user.courses?.some((c: any) =>
      typeof c === "string" ? c === course._id : c._id === course._id
    );

  return (
    <div>
      {/* SEO */}
      <Heading
        title={`${course.name} - LMS-Nepal`}
        description="LMS-Nepal is a programming community developed by Shahriar Sajeeb for helping programmers."
        keywords={course.tags?.join(", ")}
      />

      {/* Header */}
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />

      {/* Course Details */}
      <CourseDetails
        data={{
          ...course,
          isPurchased,
        }}
        setRoute={setRoute}
        openAuthModal={setOpen}
      />

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;
