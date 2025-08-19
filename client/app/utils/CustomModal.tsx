import React, { FC } from "react";
import { Modal, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem?: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      sx={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.3)" }} // Optional subtle backdrop blur
    >
      <Box
        className="
          relative
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[95%] 800px:w-[450px]
          bg-white dark:bg-gray-400
          rounded-2xl shadow-xl p-5 outline-none
          border border-[#4ea6a933] dark:border-[#6ccfce44]
          transition-transform duration-300 ease-out
          animate-scaleIn
        "
        sx={{
          boxShadow: `0 4px 20px rgba(78, 166, 169, 0.25)`,
        }}
      >
        {/* Close Button: Positioned top-right, just outside the box with circle bg */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close Modal"
          className="
    absolute
    -top-5 -right-5      /* top right corner, slightly outside */
    w-10 h-10
    bg-[#4ea6a9]
    rounded-full
    flex items-center justify-center
    text-white
    shadow-lg
    transition-all duration-300
    hover:bg-[#6ccfce]
    hover:rotate-90
    focus:outline-none focus:ring-2 focus:ring-[#4ea6a9] focus:ring-offset-2
    cursor-pointer
  "
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
