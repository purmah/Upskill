'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") return;
    router.push(`/courses?title=${search}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 pt-10 pb-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#f0f9ff] text-[#0EA5E9] text-[13px] font-medium px-3 py-1 rounded-full border border-[#bae6fd]">
          <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse inline-block" />
          New courses added every week
        </div>

        {/* Headline */}
        <h1 className="text-[38px] 1000px:text-[56px] font-extrabold text-gray-900 dark:text-white leading-[1.15] tracking-tight">
          {data?.layout?.banner?.title || (
            <>
              The smarter way to{" "}
              <span className="text-[#0EA5E9]">level up</span>{" "}
              your skills
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 dark:text-gray-400 text-[16px] max-w-lg leading-relaxed">
          {data?.layout?.banner?.subTitle ||
            "From beginner to expert — find courses that fit your goals, learn at your own pace, and actually get results."}
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden mt-2">
          <input
            type="search"
            placeholder="e.g. Python, Web Design, React..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-3 text-[14px] outline-none bg-transparent text-gray-700 dark:text-white placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="bg-[#0EA5E9] hover:bg-[#0284c7] transition px-5 py-3 text-white m-1 rounded-lg text-sm font-medium"
          >
            Search
          </button>
        </div>

        {/* Popular searches */}
        <p className="text-gray-400 text-[13px]">
          Popular:{" "}
          {["React", "Python", "UI/UX", "Node.js"].map((tag) => (
            <Link
              key={tag}
              href={`/courses?title=${tag}`}
              className="text-gray-600 dark:text-gray-300 hover:text-[#0EA5E9] mx-1 underline underline-offset-2"
            >
              {tag}
            </Link>
          ))}
        </p>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 dark:border-gray-800 my-2" />

        {/* Stats + Avatars in one row */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex">
              <Image
                src={require("../../../public/assests/client-1.jpg")}
                alt="student"
                width={30}
                height={30}
                className="rounded-full border-2 border-white"
              />
              <Image
                src={require("../../../public/assests/client-2.jpg")}
                alt="student"
                width={30}
                height={30}
                className="rounded-full border-2 border-white ml-[-8px]"
              />
              <Image
                src={require("../../../public/assests/client-3.jpg")}
                alt="student"
                width={30}
                height={30}
                className="rounded-full border-2 border-white ml-[-8px]"
              />
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-white">50,000+</span> learners
            </p>
          </div>

          <span className="text-gray-300 dark:text-gray-700">|</span>

          <p className="text-[13px] text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-white">200+</span> expert courses
          </p>

          <span className="text-gray-300 dark:text-gray-700">|</span>

          <p className="text-[13px] text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-white">4.8★</span> average rating
          </p>

          <span className="text-gray-300 dark:text-gray-700">|</span>

          <Link
            href="/courses"
            className="text-[13px] text-[#0EA5E9] font-medium hover:underline"
          >
            Browse all courses →
          </Link>
        </div>

        {/* Hero Image */}
        {data?.layout?.banner?.image?.url && (
          <div className="mt-4">
            <Image
              src={data.layout.banner.image.url}
              width={480}
              height={480}
              alt="hero"
              className="object-contain w-full max-w-[380px]"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Hero;