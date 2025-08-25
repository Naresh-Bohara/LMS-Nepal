import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => setActive(active - 1);
  const createCourse = () => handleCourseCreate();

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto py-8 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Video + Purchase */}
        <div className="lg:col-span-1 space-y-6">
          {/* Video Player */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-[#2a2f55] bg-white dark:bg-[#1b1e3c]">
            <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />
          </div>

          {/* Pricing Card */}
          <div className="p-5 rounded-xl shadow-md border border-gray-200 dark:border-[#2a2f55] bg-white dark:bg-[#1b1e3c]">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                NRS {courseData?.price === 0 ? "Free" : courseData?.price}
              </h1>
              {courseData?.estimatedPrice && (
                <h5 className="text-lg line-through text-gray-400">
                  NRS {courseData?.estimatedPrice}
                </h5>
              )}
              {discountPercentagePrice !== "NaN" && (
                <span className="ml-auto bg-[#6abfc1] text-white px-3 py-1 text-sm rounded-full font-medium">
                  {discountPercentagePrice}% OFF
                </span>
              )}
            </div>

            {/* Buy Button */}
            <button
              disabled
              className="w-full bg-gray-300 dark:bg-gray-600 mt-4 py-2 rounded-lg font-medium text-gray-800 dark:text-white cursor-not-allowed"
            >
              Buy Now (NRS {courseData?.price})
            </button>

            {/* Discount Code Input */}
            <div className="flex mt-4 gap-2">
              <input
                type="text"
                placeholder="Discount code..."
                className={`${styles.input} flex-1 !mt-0`}
              />
              <button
                className="px-4 py-2 bg-[#6abfc1] hover:bg-[#58a8aa] text-white rounded-lg transition"
              >
                Apply
              </button>
            </div>

            {/* Features */}
            <div className="mt-5 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <p>• Source code included</p>
              <p>• Full lifetime access</p>
              <p>• Certificate of completion</p>
              <p>• Premium support</p>
            </div>
          </div>
        </div>

        {/* Right Column - Course Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Ratings */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {courseData?.name}
            </h1>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Ratings rating={0} />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  0 Reviews
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                0 Students
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              What you will learn
            </h2>
            <div className="mt-3 space-y-2">
              {courseData?.benefits?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <IoCheckmarkDoneOutline className="text-[#6abfc1] mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Prerequisites
            </h2>
            <div className="mt-3 space-y-2">
              {courseData?.prerequisites?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <IoCheckmarkDoneOutline className="text-[#6abfc1] mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Course Details
            </h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {courseData?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={prevButton}
          className="w-full md:w-[160px] py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-full font-medium transition"
        >
          Prev
        </button>
        <button
          onClick={createCourse}
          className="w-full md:w-[160px] py-2 bg-[#6abfc1] hover:bg-[#58a8aa] text-white rounded-full font-medium transition"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
