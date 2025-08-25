"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

const CreateCourse = () => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  // Handle formatting data
  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((b) => ({ title: b.title }));
    const formattedPrerequisites = prerequisites.map((p) => ({ title: p.title }));
    const formattedCourseContentData = courseContentData.map((c) => ({
      videoUrl: c.videoUrl,
      title: c.title,
      description: c.description,
      videoLength: c.videoLength,
      videoSection: c.videoSection,
      links: c.links.map((link) => ({ title: link.title, url: link.url })),
      suggestion: c.suggestion,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    if (!isLoading) {
      await createCourse(courseData);
    }
  };

  // Toast feedback + redirect
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/courses");
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex w-full min-h-screen">
      {/* Main Content (80%) */}
      <div className="w-[79%] px-4 md:px-8 mt-[80px]">
        <div className="rounded-xl shadow-md bg-white dark:bg-[#1b1e3c] border border-gray-200 dark:border-[#2a2f55] p-6 transition-colors">
          {/* Steps */}
          {active === 0 && (
            <CourseInformation
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
            />
          )}
        </div>
      </div>

      {/* Sidebar (20%) */}
      <div className="w-[19%] mt-[100px] fixed right-0 top-20 px-3">
        <div className="rounded-xl bg-white dark:bg-[#111C43] shadow-md border border-gray-200 dark:border-[#2a2f55] p-4">
          <CourseOptions active={active} setActive={setActive} />

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{((active + 1) / 4) * 100}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#2a2f55] rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((active + 1) / 4) * 100}%`,
                  backgroundColor: "#6abfc1",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
