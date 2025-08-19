import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error && "data" in error) {
      toast.error((error as any)?.data?.message);
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  // Check for unsaved changes
  const hasChanges =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.image?.url !== image;

  return (
    <div className="relative w-full flex flex-col md:flex-row items-center gap-10 mt-16 px-6 md:px-12">
      {/* Glow Accent */}
      <div className="absolute -top-20 -left-20 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] blur-3xl opacity-30"></div>

      {/* Image Section */}
      <div className="relative md:w-[40%] w-full flex justify-center md:justify-end z-10">
        <div className="relative w-[80%] max-w-[400px]">
          <Image
            src={image}
            alt="Hero"
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-contain"
          />
          {/* Upload Button */}
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label
            htmlFor="banner"
            className="absolute bottom-3 right-3 bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
          >
            <AiOutlineCamera className="text-white text-[20px]" />
          </label>
        </div>
      </div>

      {/* Editable Text Section */}
      <div className="md:w-[60%] w-full flex flex-col gap-6 text-center md:text-left">
        {/* Title */}
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Hero Title..."
          rows={2}
          className="text-[2rem] md:text-[3rem] font-Josefin font-bold leading-snug resize-none 
                     text-gray-900 dark:text-white bg-transparent outline-none p-2 rounded-lg
                     border border-transparent focus:border-[#6abfc1] transition w-full"
        />

        {/* Subtitle */}
        <textarea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Enter Hero Subtitle..."
          rows={3}
          className="text-[1rem] md:text-[1.2rem] font-medium font-Josefin resize-none 
                     text-gray-600 dark:text-gray-300 bg-transparent outline-none p-2 rounded-lg
                     border border-transparent focus:border-[#6abfc1] transition w-full"
        />

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            disabled={!hasChanges}
            onClick={hasChanges ? handleEdit : undefined}
            className={`px-6 py-2 rounded-md font-semibold transition 
              ${
                hasChanges
                  ? "bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] text-white hover:opacity-90"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
