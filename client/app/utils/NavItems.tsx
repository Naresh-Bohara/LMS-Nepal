import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={index} passHref>
            <span
              className={`cursor-pointer text-[18px] px-6 font-Poppins font-[400]
                ${
                  activeItem === index
                    ? "text-primary dark:text-primary-light font-semibold"
                    : "text-black dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                }
              `}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Nav */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          {/* <div className="w-full text-center py-6">
            <Link href="/" passHref>
              <span className="text-[25px] font-Poppins font-[600] text-primary dark:text-primary-light">
                LMS-Nepal
              </span>
            </Link>
          </div> */}
          {navItemsData.map((item, index) => (
            <Link href={item.url} passHref key={index}>
              <span
                className={`block py-5 text-[18px] px-6 font-Poppins font-[400] cursor-pointer
                  ${
                    activeItem === index
                      ? "text-primary dark:text-primary-light font-semibold"
                      : "text-black dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                  }
                `}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
