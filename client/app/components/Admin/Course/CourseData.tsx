import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill in all fields before proceeding!");
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] mx-auto mt-20">
      <div className="bg-white dark:bg-[#1b1e3c] border border-gray-200 dark:border-[#2a2f55] rounded-xl shadow-md p-6 space-y-8 transition-colors">

        {/* Benefits Section */}
        <div>
          <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            What are the benefits for students in this course?
          </label>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <input
                key={index}
                type="text"
                placeholder="e.g., Build a full-stack LMS platform from scratch..."
                required
                className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
            ))}
            <button
              type="button"
              onClick={handleAddBenefit}
              className="flex items-center text-[#6abfc1] hover:text-[#58a8aa] transition text-sm gap-1"
            >
              <AiOutlinePlusCircle size={20} /> Add another benefit
            </button>
          </div>
        </div>

        {/* Prerequisites Section */}
        <div>
          <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            What are the prerequisites for starting this course?
          </label>
          <div className="space-y-3">
            {prerequisites.map((item, index) => (
              <input
                key={index}
                type="text"
                placeholder="e.g., Basic understanding of MERN stack"
                required
                className={`${styles.input} focus:ring-2 focus:ring-[#6abfc1]`}
                value={item.title}
                onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
              />
            ))}
            <button
              type="button"
              onClick={handleAddPrerequisites}
              className="flex items-center text-[#6abfc1] hover:text-[#58a8aa] transition text-sm gap-1"
            >
              <AiOutlinePlusCircle size={20} /> Add another prerequisite
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={prevButton}
            className="w-full md:w-[160px] py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-full font-medium transition"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handleOptions}
            className="w-full md:w-[160px] py-2 bg-[#6abfc1] hover:bg-[#58a8aa] text-white rounded-full font-medium transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
