import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage =
    data?.estimatedPrice && data?.estimatedPrice > data?.price
      ? (((data.estimatedPrice - data.price) / data.estimatedPrice) * 100).toFixed(0)
      : null;

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="w-full flex flex-col-reverse 800px:flex-row gap-10">

          {/* Left Column */}
          <div className="w-full 800px:w-[65%]">

            {/* Title */}
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white leading-tight mb-1">
              {data.name}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-between mb-6 mt-2">
              <div className="flex items-center gap-2">
                <Ratings rating={data.ratings} />
                <span className="text-gray-400 text-sm">{data.reviews?.length} reviews</span>
              </div>
              <span className="text-gray-400 text-sm">{data.purchased} students enrolled</span>
            </div>

            {/* What you'll learn */}
            <div className="bg-[#f0f9ff] dark:bg-gray-800 border border-[#bae6fd] dark:border-gray-700 rounded-xl p-6 mb-8">
              <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-4">
                Skills you'll walk away with
              </h2>
              <div className="grid grid-cols-1 800px:grid-cols-2 gap-3">
                {data.benefits?.map((item: any, index: number) => (
                  <div className="flex items-start gap-2" key={index}>
                    <IoCheckmarkDoneOutline
                      size={17}
                      className="text-[#0EA5E9] mt-0.5 shrink-0"
                    />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="mb-8">
              <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-3">
                Before you start
              </h2>
              {data.prerequisites?.length > 0 ? (
                data.prerequisites.map((item: any, index: number) => (
                  <div className="flex items-start gap-2 mb-2" key={index}>
                    <IoCheckmarkDoneOutline
                      size={17}
                      className="text-[#0EA5E9] mt-0.5 shrink-0"
                    />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.title}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No prerequisites — this course is open to everyone.</p>
              )}
            </div>

            {/* Course Overview */}
            <div className="mb-8">
              <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-3">
                What's inside
              </h2>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-3">
                About this course
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed whitespace-pre-line">
                {data.description || "No description provided."}
              </p>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">
                What students are saying
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <Ratings rating={data?.ratings} />
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}
                </span>
                <span className="text-gray-400 text-sm">
                  • {data?.reviews?.length} reviews
                </span>
              </div>

              {data?.reviews?.length === 0 && (
                <p className="text-gray-400 text-sm">No reviews yet — be the first to leave one!</p>
              )}

              {[...(data?.reviews || [])].reverse().map((item: any, index: number) => (
                <div className="w-full pb-6 border-b border-gray-100 dark:border-gray-800 mb-6 last:border-0" key={index}>
                  <div className="flex items-start gap-3">
                    <Image
                      src={
                        item.user.avatar
                          ? item.user.avatar.url
                          : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={40}
                      height={40}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-900 dark:text-white text-[14px]">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {item.comment}
                      </p>
                      <small className="text-gray-400 text-xs mt-1 block">
                        {format(item.createdAt)}
                      </small>

                      {/* Replies */}
                      {item.commentReplies?.map((i: any, index: number) => (
                        <div className="flex items-start gap-3 mt-4 ml-4 pl-4 border-l-2 border-[#0EA5E9]" key={index}>
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={34}
                            height={34}
                            alt=""
                            className="w-[34px] h-[34px] rounded-full object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <h5 className="font-semibold text-gray-900 dark:text-white text-[13px]">
                                {i.user.name}
                              </h5>
                              <VscVerifiedFilled className="text-[#0EA5E9] text-[13px]" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {i.comment}
                            </p>
                            <small className="text-gray-400 text-xs">
                              {format(i.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Sticky Card */}
          <div className="w-full 800px:w-[35%]">
            <div className="sticky top-[90px] w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">

              {/* Video Preview */}
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

              <div className="p-5">

                {/* Price */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[30px] font-bold text-gray-900 dark:text-white">
                    {data.price === 0 ? "Free" : `$${data.price}`}
                  </span>
                  {data.estimatedPrice && data.estimatedPrice > data.price && (
                    <>
                      <span className="text-gray-400 text-[16px] line-through">
                        ${data.estimatedPrice}
                      </span>
                      {discountPercentage && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {discountPercentage}% off
                        </span>
                      )}
                    </>
                  )}
                </div>

                {data.estimatedPrice && data.estimatedPrice > data.price && (
                  <p className="text-red-500 text-xs mb-4 font-medium">
                    ⏰ Limited time offer — don't miss out!
                  </p>
                )}

                {/* CTA Button */}
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className="block w-full text-center bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold py-3 rounded-lg transition text-[15px] mb-3"
                  >
                    Continue Learning →
                  </Link>
                ) : (
                  <button
                    onClick={handleOrder}
                    className="block w-full text-center bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold py-3 rounded-lg transition text-[15px] mb-3"
                  >
                    {data.price === 0 ? "Enroll for Free" : `Get Started — $${data.price}`}
                  </button>
                )}

                <p className="text-center text-gray-400 text-xs">
                  30-day money-back guarantee
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="w-full h-screen bg-[#00000050] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="w-full flex justify-end mb-2">
              <IoCloseOutline
                size={28}
                className="text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => setOpen(false)}
              />
            </div>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm setOpen={setOpen} data={data} user={user} refetch={refetch} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;