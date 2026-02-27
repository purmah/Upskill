import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">

      {/* Top — Avatar + Name + Rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={props.item.avatar}
            alt={props.item.name}
            width={44}
            height={44}
            className="w-[44px] h-[44px] rounded-full object-cover"
          />
          <div>
            <h5 className="text-gray-900 dark:text-white font-semibold text-[15px] leading-tight">
              {props.item.name}
            </h5>
            <p className="text-gray-400 dark:text-gray-500 text-[12px] mt-0.5">
              {props.item.profession}
            </p>
          </div>
        </div>
        <Ratings rating={5} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-gray-700" />

      {/* Comment */}
      <p className="text-gray-600 dark:text-gray-300 text-[14px] leading-relaxed">
        "{props.item.comment}"
      </p>

    </div>
  );
};

export default ReviewCard;