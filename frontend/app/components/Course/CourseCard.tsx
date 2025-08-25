import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
      className="group"
    >
      <div
        className="
          relative
          w-full h-[420px]
          flex flex-col justify-between
          bg-white dark:bg-[#1e293b]/90
          border border-gray-200 dark:border-[#ffffff1a]
          rounded-xl overflow-hidden
          shadow-sm hover:shadow-xl
          transition-all duration-300
          hover:-translate-y-[4px]
        "
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-700">
          {item?.thumbnail?.url ? (
            <Image
              src={item.thumbnail.url}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-300 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 justify-between">
          {/* Title */}
          <h2
            className="
              font-Poppins font-semibold text-base sm:text-lg
              text-gray-900 dark:text-white
              line-clamp-2 leading-snug mb-2
              h-[48px]
            "
          >
            {item.name}
          </h2>

          {/* Ratings & Students */}
          <div className="flex justify-between items-center mb-3">
            <Ratings rating={item.ratings} />
            {!isProfile && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {item.purchased} students
              </p>
            )}
          </div>

          {/* Price & Lectures */}
          <div className="flex justify-between items-end">
            {/* Price */}
            <div className="flex items-center gap-2">
              {item.price === 0 ? (
                <span className="text-lg font-bold text-[#45CBA0]">Free</span>
              ) : (
                <>
                  <span className="text-lg font-bold text-[#45CBA0]">
                    Rs. {item.price}
                  </span>
                  {item.estimatedPrice && (
                    <span className="text-sm line-through text-gray-400">
                      Rs. {item.estimatedPrice}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Lectures */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <AiOutlineUnorderedList
                className="mr-1 text-[#6abfc1] dark:text-[#45CBA0]"
                size={18}
              />
              {item.courseData?.length || 0} Lectures
            </div>
          </div>
        </div>

        {/* Border effect on hover */}
        <div
          className="
            absolute inset-0 rounded-xl
            border-2 border-transparent
            group-hover:border-[#6abfc1]
            transition-colors duration-300 pointer-events-none
          "
        />
      </div>
    </Link>
  );
};

export default CourseCard;
