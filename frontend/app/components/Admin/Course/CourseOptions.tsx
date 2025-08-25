import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="flex flex-col space-y-6">
      {options.map((option: any, index: number) => {
        const isCompleted = active > index;
        const isActive = active === index;

        return (
          <div key={index} className="flex items-start relative">
            {/* Step Indicator */}
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 
                ${isCompleted ? "bg-[#6abfc1]" : isActive ? "bg-[#6abfc1]/90" : "bg-gray-300 dark:bg-gray-600"}
                ${isActive ? "scale-110 shadow-lg" : ""}`}
              >
                {isCompleted ? (
                  <IoMdCheckmark className="text-white text-xl" />
                ) : (
                  <span className="text-white font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Connector line */}
              {index !== options.length - 1 && (
                <div
                  className={`flex-1 w-1 mt-1 mb-1 transition-all duration-300 
                  ${isCompleted ? "bg-[#6abfc1]" : "bg-gray-300 dark:bg-gray-600"}`}
                  style={{ minHeight: "40px" }}
                ></div>
              )}
            </div>

            {/* Step Title */}
            <div className="flex-1">
              <h5
                className={`text-lg font-medium transition-colors duration-300
                ${isActive ? "text-[#6abfc1]" : "text-gray-700 dark:text-gray-300"}`}
              >
                {option}
              </h5>
              {isActive && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {index === 0
                    ? "Fill in the basic course details"
                    : index === 1
                    ? "Add prerequisites and benefits"
                    : index === 2
                    ? "Organize your course content"
                    : "Preview and publish your course"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseOptions;
