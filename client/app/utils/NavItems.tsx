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
      {/* Desktop */}
      <div className="hidden 800px:flex">
        {navItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "text-white font-semibold"
                  : "text-white opacity-80 hover:opacity-100"
              } text-[15px] px-4 font-Poppins transition`}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          {navItemsData.map((i, index) => (
            <Link href={i.url} passHref key={index}>
              <span
                className={`${
                  activeItem === index
                    ? "text-[#0EA5E9] font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                } block py-3 text-[16px] px-6 font-Poppins transition`}
              >
                {i.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;