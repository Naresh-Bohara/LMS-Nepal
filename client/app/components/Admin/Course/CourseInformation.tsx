import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] mx-auto mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1b1e3c] border border-gray-200 dark:border-[#2a2f55] rounded-xl shadow-md p-6 space-y-6 transition-colors"
      >
        {/* Course Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Course Name
          </label>
          <input
            type="text"
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="e.g., MERN Stack LMS Platform with Next.js 13"
            className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Course Description
          </label>
          <textarea
            cols={30}
            rows={6}
            placeholder="Describe what learners will gain from this course..."
            className={`${styles.input} !h-auto focus:ring-2 focus:ring-[#6abfc1]`}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* Price & Estimated Price */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Course Price
            </label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="e.g., 49"
              className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                })
              }
              placeholder="e.g., 79"
              className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
            />
          </div>
        </div>

        {/* Tags & Category */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Course Tags
            </label>
            <input
              type="text"
              required
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="e.g., MERN, Next.js, Tailwind, LMS"
              className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Course Category
            </label>
            <select
              value={courseInfo.categories}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
              className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
            >
              <option value="">Select Category</option>
              {categories &&
                categories.map((item: any) => (
                  <option
                    key={item._id}
                    value={item.title}
                    className="dark:bg-[#000] dark:text-white"
                  >
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Level & Demo URL */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Course Level
            </label>
            <input
              type="text"
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="e.g., Beginner / Intermediate / Expert"
              className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Demo URL
            </label>
            <input
              type="text"
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="Paste demo video link"
              className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[150px] border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition ${
              dragging
                ? "border-[#6abfc1] bg-[#6abfc120]"
                : "border-gray-300 dark:border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt="Thumbnail"
                width={150}
                height={150}
                className="max-h-40 rounded-md object-cover"
              />
            ) : (
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Drag & drop thumbnail here or <span className="text-[#6abfc1] font-medium">click to upload</span>
              </span>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full md:w-[160px] py-2 bg-[#6abfc1] hover:bg-[#58a8aa] text-white rounded-full font-medium transition"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
