"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import {signIn} from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch:any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen,refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
<div className="w-full max-w-[450px] mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
  {/* Title */}
  <h1 className={`${styles.title} mb-6`}>
    Login with LMS-Nepal
  </h1>

  <form onSubmit={handleSubmit} noValidate>
    {/* Email */}
    <label htmlFor="email" className={`${styles.label} block mb-1`}>
      Enter your Email
    </label>
    <input
      type="email"
      id="email"
      value={values.email}
      onChange={handleChange}
      placeholder="loginmail@gmail.com"
      className={`${styles.input} ${errors.email && touched.email ? 'border-red-500' : ''}`}
      aria-invalid={errors.email && touched.email ? "true" : "false"}
      aria-describedby={errors.email && touched.email ? "email-error" : undefined}
      autoComplete="email"
    />
    {errors.email && touched.email && (
      <span id="email-error" className="text-red-500 text-sm mt-1 block">
        {errors.email}
      </span>
    )}

    {/* Password */}
    <div className="relative mt-6">
      <label htmlFor="password" className={`${styles.label} block mb-1`}>
        Enter your Password
      </label>
      <input
        type={!show ? "password" : "text"}
        id="password"
        value={values.password}
        onChange={handleChange}
        placeholder="password!@%"
        className={`${styles.input} ${errors.password && touched.password ? 'border-red-500' : ''}`}
        aria-invalid={errors.password && touched.password ? "true" : "false"}
        aria-describedby={errors.password && touched.password ? "password-error" : undefined}
        autoComplete="current-password"
      />
      {!show ? (
        <AiOutlineEyeInvisible
          className="absolute bottom-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#4ea6a9] transition-colors"
          size={22}
          onClick={() => setShow(true)}
          aria-label="Show password"
          role="button"
          tabIndex={0}
        />
      ) : (
        <AiOutlineEye
          className="absolute bottom-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#4ea6a9] transition-colors"
          size={22}
          onClick={() => setShow(false)}
          aria-label="Hide password"
          role="button"
          tabIndex={0}
        />
      )}
      {errors.password && touched.password && (
        <span id="password-error" className="text-red-500 text-sm mt-1 block">
          {errors.password}
        </span>
      )}
    </div>

    {/* Submit Button */}
    <div className="mt-8">
      <input
        type="submit"
        value="Login"
        className={styles.button}
        aria-label="Login"
      />
    </div>
  </form>

  {/* Divider */}
  <h5 className="text-center pt-6 font-Poppins text-[14px] text-gray-800 dark:text-gray-200">
    Or join with
  </h5>

  {/* Social Buttons */}
  <div className="flex items-center justify-center my-4 space-x-4">
    <FcGoogle
      size={30}
      className="cursor-pointer hover:scale-110 transition-transform"
      onClick={() => signIn("google")}
      aria-label="Sign in with Google"
      role="button"
      tabIndex={0}
    />
    <AiFillGithub
      size={30}
      className="cursor-pointer text-gray-800 dark:text-white hover:scale-110 transition-transform"
      onClick={() => signIn("github")}
      aria-label="Sign in with GitHub"
      role="button"
      tabIndex={0}
    />
  </div>

  {/* Signup Link */}
  <h5 className="text-center font-Poppins text-[14px] text-gray-700 dark:text-gray-300">
     Don't have an account?{""}
    <span
      className="text-[#4ea6a9] font-medium pl-1 cursor-pointer hover:underline"
      onClick={() => setRoute && setRoute("Sign-Up")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") setRoute && setRoute("Sign-Up"); }}
    >
      Sign up
    </span>
  </h5>
</div>

  );
};

export default Login;
