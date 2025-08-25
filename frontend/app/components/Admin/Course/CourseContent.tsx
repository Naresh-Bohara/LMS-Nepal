import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("section can't be empty!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  return (
  <div className="w-[80%] max-w-5xl mx-auto mt-16 mb-10">
    <form onSubmit={handleSubmit}>
      {courseContentData?.map((item: any, index: number) => {
        const showSectionInput =
          index === 0 ||
          item.videoSection !== courseContentData[index - 1].videoSection;

        return (
          <div
            key={index}
            className={`rounded-xl shadow-md dark:shadow-none dark:border dark:border-gray-700 bg-white dark:bg-gray-800 mb-8 overflow-hidden transition-all`}
          >
            {/* Section Header */}
            {showSectionInput && (
              <div className="bg-gradient-to-r from-[#6abfc1] to-[#4ea7a9] px-5 py-3 flex items-center justify-between">
                <input
                  type="text"
                  value={item.videoSection}
                  className="text-lg font-semibold bg-transparent outline-none text-white placeholder-white w-full"
                  onChange={(e) => {
                    const updatedData = [...courseContentData];
                    updatedData[index].videoSection = e.target.value;
                    setCourseContentData(updatedData);
                  }}
                />
                <BsPencil className="text-white ml-2 cursor-pointer" />
              </div>
            )}

            {/* Collapsible Content */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                {isCollapsed[index] ? (
                  item.title && (
                    <p className="text-base font-medium dark:text-gray-200 text-gray-700">
                      {index + 1}. {item.title}
                    </p>
                  )
                ) : (
                  <span></span>
                )}

                {/* Collapse & Delete Buttons */}
                <div className="flex items-center gap-2">
                  <AiOutlineDelete
                    className={`text-xl ${
                      index > 0
                        ? "cursor-pointer text-red-500 hover:text-red-600"
                        : "cursor-not-allowed text-gray-400"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className={`text-xl transition-transform ${
                      isCollapsed[index] ? "rotate-180" : "rotate-0"
                    } dark:text-gray-200 text-gray-600 cursor-pointer`}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {/* Expanded Inputs */}
              {!isCollapsed[index] && (
                <>
                  {/* Video Title */}
                  <div className="mb-4">
                    <label className={`${styles.label} mb-1`}>Video Title</label>
                    <input
                      type="text"
                      placeholder="Project Plan..."
                      value={item.title}
                      className={`${styles.input}`}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* Video URL */}
                  <div className="mb-4">
                    <label className={`${styles.label} mb-1`}>Video URL</label>
                    <input
                      type="text"
                      placeholder="Enter video URL"
                      value={item.videoUrl}
                      className={`${styles.input}`}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* Video Length */}
                  <div className="mb-4">
                    <label className={`${styles.label} mb-1`}>
                      Video Length (in minutes)
                    </label>
                    <input
                      type="number"
                      placeholder="20"
                      value={item.videoLength}
                      className={`${styles.input}`}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoLength = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* Video Description */}
                  <div className="mb-4">
                    <label className={`${styles.label} mb-1`}>
                      Video Description
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Enter video description"
                      value={item.description}
                      className={`${styles.input} !h-auto`}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* Links */}
                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-4" key={linkIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <label className={`${styles.label}`}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`text-xl ${
                            linkIndex === 0
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer text-red-500 hover:text-red-600"
                          }`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Source Code... (Link title)"
                        value={link.title}
                        className={`${styles.input}`}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        placeholder="Source Code URL... (Link URL)"
                        value={link.url}
                        className={`${styles.input} mt-3`}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}

                  {/* Add Link Button */}
                  <button
                    type="button"
                    onClick={() => handleAddLink(index)}
                    className="flex items-center text-sm text-[#6abfc1] hover:underline mt-2"
                  >
                    <BsLink45Deg className="mr-1" /> Add Link
                  </button>
                </>
              )}

              {/* Add New Content Button */}
              {index === courseContentData.length - 1 && (
                <button
                  type="button"
                  onClick={() => newContentHandler(item)}
                  className="flex items-center text-sm text-[#6abfc1] hover:underline mt-4"
                >
                  <AiOutlinePlusCircle className="mr-1" /> Add New Content
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Add New Section Button */}
      <button
        type="button"
        onClick={() => addNewSection()}
        className="flex items-center text-lg text-[#6abfc1] hover:underline mb-8"
      >
        <AiOutlinePlusCircle className="mr-2" /> Add New Section
      </button>
    </form>

    {/* Navigation Buttons */}
    <div className="flex items-center justify-between mt-10">
      <button
        type="button"
        onClick={() => prevButton()}
        className="w-full md:w-[160px] py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-full font-medium transition"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => handleOptions()}
        className="w-full md:w-[160px] py-2 bg-[#6abfc1] hover:bg-[#58a8aa] text-white rounded-full font-medium transition"
      >
        Next
      </button>
    </div>
  </div>
);

};

export default CourseContent;
