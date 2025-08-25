import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
  <div className="w-full px-4 800px:px-5">
  {/* Heading */}
  <h1 className="text-center text-[26px] 800px:text-[32px] font-Poppins font-semibold text-gray-900 dark:text-white mb-6">
    Change Password
  </h1>

  {/* Form Container */}
  <form
    onSubmit={passwordChangeHandler}
    className="max-w-[500px] mx-auto p-6 bg-white dark:bg-slate-900 border border-[#00000014] dark:border-[#ffffff1d] rounded-2xl shadow-md space-y-6"
  >
    {/* Old Password */}
    <div>
      <label className="block pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
        Current Password
      </label>
      <input
        type="password"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6abfc1] bg-gray-50 dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600"
        required
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
    </div>

    {/* New Password */}
    <div>
      <label className="block pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
        New Password
      </label>
      <input
        type="password"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6abfc1] bg-gray-50 dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600"
        required
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>

    {/* Confirm Password */}
    <div>
      <label className="block pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
        Confirm New Password
      </label>
      <input
        type="password"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6abfc1] bg-gray-50 dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full h-[45px] bg-[#6abfc1] hover:bg-[#5aadb0] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      Update Password
    </button>
  </form>
</div>

  );
};

export default ChangePassword;
