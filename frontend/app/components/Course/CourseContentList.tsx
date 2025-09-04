import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !props.isDemo &&
        "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter videos by section
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div
            className={`${
              !props.isDemo &&
              "border-b border-[#0000001c] dark:border-[#ffffff4d] pb-2"
            }`}
            key={section}
          >
            <div className="w-full flex justify-between items-center">
              <h2 className="text-[20px] font-semibold text-black dark:text-white">
                {section}
              </h2>
              <button
                className="mr-4 cursor-pointer text-black dark:text-white"
                onClick={() => toggleSection(section)}
              >
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>

            <h5 className="text-sm text-gray-600 dark:text-gray-300">
              {sectionVideoCount} Lessons ·{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>

            {isSectionVisible && (
              <div className="w-full mt-2 space-y-1">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  const isActive = videoIndex === props.activeVideo;

                  return (
                    <div
                      key={item._id}
                      onClick={() =>
                        props.isDemo ? null : props?.setActiveVideo(videoIndex)
                      }
                      className={`flex flex-col rounded-lg p-3 cursor-pointer transition-all
                        ${
                          isActive
                            ? "bg-[#6abfc1] text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                    >
                      <div className="flex items-center">
                        <MdOutlineOndemandVideo
                          size={22}
                          className="mr-2 flex-shrink-0"
                          color={isActive ? "#fff" : "#1cdada"}
                        />
                        <h1
                          className={`text-[16px] font-medium break-words ${
                            isActive ? "text-white" : "text-black dark:text-white"
                          }`}
                        >
                          {item.title}
                        </h1>
                      </div>
                      <h5
                        className={`pl-8 text-sm ${
                          isActive
                            ? "text-gray-200"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
