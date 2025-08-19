import { styles } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
  <h1 className={`${styles.title}`}>Verify Your Account</h1>
  <br />
  <div className="w-full flex items-center justify-center mt-2">
    <div className="w-[80px] h-[80px] rounded-full bg-[#4ea6a9] dark:bg-[#6ccfce] flex items-center justify-center transition-colors">
      <VscWorkspaceTrusted size={40} className="text-white" />
    </div>
  </div>
  <br />
  <br />
  <div className="m-auto flex items-center justify-between max-w-[280px] sm:max-w-[320px]">
    {Object.keys(verifyNumber).map((key, index) => (
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        key={key}
        ref={inputRefs[index]}
        maxLength={1}
        className={`
          w-[65px] h-[65px]
          bg-transparent
          border-2
          rounded-lg
          text-center
          text-[22px]
          font-semibold
          font-Poppins
          outline-none
          transition
          duration-200
          ${
            invalidError
              ? "animate-shake border-red-500"
              : "border-gray-300 dark:border-gray-400 focus:border-[#4ea6a9] dark:focus:border-[#6ccfce]"
          }
          text-black dark:text-white
          caret-[#4ea6a9]
          shadow-sm
          hover:border-[#4ea6a9] dark:hover:border-[#6ccfce]
          placeholder:text-gray-400 dark:placeholder:text-gray-500
        `}
        placeholder="-"
        value={verifyNumber[key as keyof VerifyNumber]}
        onChange={(e) => handleInputChange(index, e.target.value.replace(/[^0-9]/g, ""))}
      />
    ))}
  </div>
  <br />
  <br />
  <div className="w-full flex justify-center">
    <button
      className={`${styles.button} px-10 min-w-[140px]`}
      onClick={verificationHandler}
      aria-label="Verify OTP"
    >
      Verify OTP
    </button>
  </div>
  <br />
  <h5 className="text-center pt-4 font-Poppins text-[14px] text-gray-800 dark:text-gray-300">
    Go back to sign in?{" "}
    <span
      className="text-[#4ea6a9] dark:text-[#6ccfce] font-medium pl-1 cursor-pointer hover:underline"
      onClick={() => setRoute("Login")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") setRoute("Login");
      }}
    >
      Sign in
    </span>
  </h5>

  <style jsx>{`
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-6px);
      }
      50% {
        transform: translateX(6px);
      }
      75% {
        transform: translateX(-6px);
      }
    }
    .animate-shake {
      animation: shake 0.3s ease-in-out;
    }
  `}</style>
</div>

  );
};

export default Verification;
