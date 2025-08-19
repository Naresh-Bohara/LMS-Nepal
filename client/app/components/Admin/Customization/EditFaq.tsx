import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

const EditFaq = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);
  const [initialQuestions, setInitialQuestions] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq || []);
      setInitialQuestions(data.layout?.faq || []);
    }
  }, [data]);

  // Handle API success/error
  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully!");
      refetch();
    }
    if (error && "data" in error) {
      toast.error((error as any).data?.message || "Failed to update FAQ");
    }
  }, [layoutSuccess, error, refetch]);

  // Toggle active state
  const toggleQuestion = (id: any) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  // Handle input change
  const handleChange = (id: any, field: "question" | "answer", value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, [field]: value } : q))
    );
  };

  // Add new FAQ
  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      { _id: Date.now().toString(), question: "", answer: "", active: true },
    ]);
  };

  // Validation
  const areQuestionsUnchanged =
    JSON.stringify(initialQuestions) === JSON.stringify(questions);
  const isAnyEmpty = questions.some(
    (q) => q.question.trim() === "" || q.answer.trim() === ""
  );

  // Save
  const handleEdit = async () => {
    if (!areQuestionsUnchanged && !isAnyEmpty) {
      await editLayout({ type: "FAQ", faq: questions });
    }
  };

  // Premium input style for both themes
  const inputClassNames =
    "w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6abfc1] dark:focus:ring-[#5aa8a9] focus:border-transparent transition";

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[100px]">
      {/* FAQ List */}
      <div className="mt-12">
        <dl className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={q._id}
              className={`${
                index !== 0 && "border-t"
              } border-gray-300 dark:border-gray-600 pt-6`}
            >
              {/* Question Row */}
              <dt className="text-lg">
                <div className="flex items-center justify-between w-full gap-3">
                  <input
                    className={`${inputClassNames} flex-1`}
                    value={q.question}
                    onChange={(e) =>
                      handleChange(q._id, "question", e.target.value)
                    }
                    placeholder="Enter question..."
                  />

                  {/* Actions: Toggle + Delete */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Toggle Button */}
                    <button
                      aria-label={q.active ? "Collapse answer" : "Expand answer"}
                      className="p-2 rounded-full bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] text-white hover:scale-110 transition-transform shadow-md"
                      onClick={() => toggleQuestion(q._id)}
                      type="button"
                    >
                      {q.active ? (
                        <HiMinus className="h-5 w-5" />
                      ) : (
                        <HiPlus className="h-5 w-5" />
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      aria-label="Delete FAQ"
                      className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white hover:scale-110 transition-transform shadow-md"
                      onClick={() =>
                        setQuestions((prev) =>
                          prev.filter((item) => item._id !== q._id)
                        )
                      }
                      type="button"
                    >
                      <AiOutlineDelete className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </dt>

              {/* Answer Field */}
              {q.active && (
                <dd className="mt-4 transition-all duration-300">
                  <input
                    className={inputClassNames}
                    value={q.answer}
                    onChange={(e) =>
                      handleChange(q._id, "answer", e.target.value)
                    }
                    placeholder="Enter answer..."
                  />
                </dd>
              )}
            </div>
          ))}
        </dl>

        {/* Add New FAQ Button */}
        <div className="mt-10 flex justify-center">
          <IoMdAddCircleOutline
            className="text-[#6abfc1] dark:text-[#5aa8a9] text-[36px] cursor-pointer hover:scale-110 transition-transform"
            onClick={newFaqHandler}
            aria-label="Add new FAQ"
          />
        </div>
      </div>

      {/* Save Button */}
      <div
        className={`fixed bottom-10 right-10 ${
          areQuestionsUnchanged || isAnyEmpty
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-105"
        }`}
      >
        <button
          onClick={handleEdit}
          disabled={areQuestionsUnchanged || isAnyEmpty}
          className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] transition-all duration-300 shadow-lg hover:shadow-xl"
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFaq;
