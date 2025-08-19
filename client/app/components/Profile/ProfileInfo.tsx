import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assests/avatar.png";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-hot-toast";
import { styles } from "../../../app/styles/style";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); // for API
  const [previewAvatar, setPreviewAvatar] = useState<string>(
    user?.avatar?.url || avatar || avatarIcon.src
  );

  // Mutations
  const [updateAvatar, { isLoading: avatarLoading, isSuccess: avatarSuccess, error: avatarError }] =
    useUpdateAvatarMutation();
  const [editProfile, { isLoading: profileLoading, isSuccess: profileSuccess, error: profileError }] =
    useEditProfileMutation();

  // Refetch user data
  const { refetch } = useLoadUserQuery();

  // Combined loading state
  const isLoading = avatarLoading || profileLoading;

  /** Handle avatar file selection (only local preview) */
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatarBase64 = fileReader.result as string;
        setPreviewAvatar(avatarBase64); // Show preview
        setSelectedAvatar(avatarBase64); // Save for later submission
      }
    };
    fileReader.readAsDataURL(file);
  };

  /** Handle form submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Run updates in parallel
      const promises: Promise<any>[] = [];

      if (name.trim() !== "" && name !== user?.name) {
        promises.push(editProfile({ name }).unwrap());
      }

      if (selectedAvatar) {
        promises.push(updateAvatar(selectedAvatar).unwrap());
      }

      if (promises.length === 0) {
        toast.error("No changes to update");
        return;
      }

      await Promise.all(promises);

      // Refetch after success
      await refetch();
      toast.success("Profile updated successfully!");
      setSelectedAvatar(null);
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Avatar Section */}
      <div className="relative group">
        {/* Gradient wrapper */}
        <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#37a39a] via-[#2f807d] to-[#37a39a]">
          <Image
            src={previewAvatar}
            alt="User Avatar"
            width={120}
            height={120}
            className="w-[120px] h-[120px] rounded-full cursor-pointer border-4 border-white dark:border-gray-800 shadow-md object-cover"
          />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />

        {/* Camera icon */}
        <label htmlFor="avatar">
          <div className="absolute bottom-2 right-2 w-[35px] h-[35px] bg-[#1f2937] group-hover:bg-[#37a39a] transition-colors duration-300 rounded-full flex items-center justify-center cursor-pointer shadow-md">
            <AiOutlineCamera size={18} className="text-white" />
          </div>
        </label>
      </div>

      {/* Form Section */}
      <div className="w-full mt-8 px-6 800px:px-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            {/* Full Name */}
            <div className="w-full mb-6">
              <label className="block pb-2 text-gray-700 dark:text-gray-200 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-full rounded-md border border-gray-300 dark:border-gray-700 focus:border-[#37a39a] focus:ring-2 focus:ring-[#37a39a] transition duration-200`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="w-full mb-6">
              <label className="block pb-2 text-gray-700 dark:text-gray-200 text-sm font-medium">
                Email Address
              </label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-not-allowed`}
                required
                value={user?.email}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full 800px:w-[250px] h-[45px] mt-4 text-white font-medium rounded-md bg-gradient-to-r from-[#37a39a] to-[#2f807d] hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
