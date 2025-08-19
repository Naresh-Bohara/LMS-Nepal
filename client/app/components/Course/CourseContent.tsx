import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeVideo, setActiveVideo] = useState(0);

  const data = contentData?.content || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <Header
        activeItem={1}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      {/* SEO Meta */}
      <Heading
        title={data[activeVideo]?.title || "Course Content"}
        description={data[activeVideo]?.description || "Learn with LMS Nepal"}
        keywords={data[activeVideo]?.tags?.join(", ") || "lms, online, course"}
      />

      {/* Main Content */}
      <section className="w-full min-h-screen px-4 md:px-8 py-6  bg-gradient-to-b from-white to-gray-50 dark:from-[#0f172a] dark:to-[#1e293b]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6">

          {/* Video / Media Section */}
          <div className="col-span-1 lg:col-span-7">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 dark:border-[#2c2c2c]">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
          </div>

          {/* Sidebar: Course Chapters */}
          <aside className="hidden lg:block col-span-3">
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2c2c2c] rounded-2xl shadow-md p-5 max-h-[85vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Course Chapters
              </h2>
              <CourseContentList
                data={data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CourseContent;
