import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

const EditCategories: React.FC = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout] = useEditLayoutMutation();
  const [categories, setCategories] = useState<{ _id: string; title: string }[]>(
    []
  );

  // Sync local categories with fetched data
  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  // Handle input change
  const handleCategoriesChange = (id: string, value: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat._id === id ? { ...cat, title: value } : cat))
    );
  };

  // Delete a category
  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  };

  // Add a new blank category with a temporary id
  const newCategoriesHandler = () => {
    if (categories.length && categories[categories.length - 1].title.trim() === "") {
      toast.error("Please fill the existing empty category before adding a new one.");
      return;
    }
    setCategories((prev) => [
      ...prev,
      { _id: Date.now().toString(), title: "" },
    ]);
  };

  // Check if categories are unchanged compared to fetched data
  const areCategoriesUnchanged = () =>
    JSON.stringify(data?.layout?.categories || []) === JSON.stringify(categories);

  // Check if any category title is empty
  const isAnyCategoryTitleEmpty = () =>
    categories.some((cat) => cat.title.trim() === "");

  // Save edited categories with proper success/error handling
  const editCategoriesHandler = async () => {
    if (areCategoriesUnchanged() || isAnyCategoryTitleEmpty()) {
      // No changes or invalid inputs; prevent submission
      return;
    }
    try {
      await editLayout({ type: "Categories", categories }).unwrap();
      toast.success("Categories updated successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update categories");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mt-[100px] max-w-3xl mx-auto px-4 text-center">
      <h1 className={`${styles.title} mb-8`}>All Categories</h1>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat._id} className="flex items-center justify-center gap-4">
            <input
              type="text"
              value={cat.title}
              onChange={(e) => handleCategoriesChange(cat._id, e.target.value)}
              placeholder="Enter category title..."
              className="flex-grow px-4 py-2 text-lg rounded-lg border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500
                transition duration-300"
            />
            <AiOutlineDelete
              className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
              size={24}
              onClick={() => handleDeleteCategory(cat._id)}
              title="Delete Category"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <IoMdAddCircleOutline
          className="text-3xl text-teal-400 dark:text-teal-500 cursor-pointer hover:scale-110 transition-transform"
          onClick={newCategoriesHandler}
          title="Add New Category"
        />
      </div>

      <button
        disabled={areCategoriesUnchanged() || isAnyCategoryTitleEmpty()}
        onClick={editCategoriesHandler}
        className={`mt-10 px-6 py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-teal-400 to-teal-500
          shadow-lg hover:shadow-xl transition duration-300
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Save
      </button>
    </div>
  );
};

export default EditCategories;
