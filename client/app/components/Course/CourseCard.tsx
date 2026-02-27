import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">

        {/* Thumbnail */}
        <div className="relative w-full h-[180px] overflow-hidden">
          <Image
            src={item.thumbnail?.url || "https://via.placeholder.com/500x300"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            alt={item.name}
          />
          {/* Free badge */}
          {item.price === 0 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Free
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Title */}
          <h2 className="text-gray-900 dark:text-white font-semibold text-[15px] leading-snug mb-2 line-clamp-2">
            {item.name}
          </h2>

          {/* Ratings + Students */}
          <div className="flex items-center justify-between mb-3">
            <Ratings rating={item.ratings} />
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <AiOutlineUser size={14} />
              <span>{item.purchased} students</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-700 my-3" />

          {/* Price + Lectures */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 dark:text-white font-bold text-[16px]">
                {item.price === 0 ? "Free" : `$${item.price}`}
              </span>
              {item.estimatedPrice && item.estimatedPrice > item.price && (
                <span className="text-gray-400 text-[13px] line-through">
                  ${item.estimatedPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <AiOutlineUnorderedList size={14} />
              <span>{item.courseData?.length} lectures</span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default CourseCard;