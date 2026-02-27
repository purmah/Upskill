import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import Link from 'next/link';

type Props = {}

const defaultFAQs = [
  {
    _id: "1",
    question: "What is Upskill?",
    answer: "Upskill is an online learning platform built to help you gain real, job-ready skills. Whether you're just starting out or leveling up, we have courses designed to get you results.",
  },
  {
    _id: "2",
    question: "Who are the courses for?",
    answer: "Our courses are for everyone — complete beginners, career switchers, and experienced developers looking to sharpen specific skills. Every course clearly states its level so you can find the right fit.",
  },
  {
    _id: "3",
    question: "Do I get lifetime access to a course?",
    answer: "Yes. Once you purchase a course, it's yours forever. Learn at your own pace, revisit content anytime, and access all future updates to the course at no extra cost.",
  },
  {
    _id: "4",
    question: "Is there a certificate of completion?",
    answer: "Every completed course comes with a certificate you can share on LinkedIn or add to your resume. It's a great way to show employers what you've been working on.",
  },
  {
    _id: "5",
    question: "What if I want a refund?",
    answer: "We offer a 30-day money-back guarantee on all courses. If you're not satisfied for any reason, just reach out to us and we'll sort it out — no questions asked.",
  },
  {
    _id: "6",
    question: "How do I contact support?",
    answer: "Email us at hello@upskill.com and we'll get back to you within 24 hours. We're a small team and we actually read every message.",
  },
];

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>(defaultFAQs);

  useEffect(() => {
    if (data && data.layout?.faq?.length > 0) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#e0f2fe] text-[#0EA5E9] text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Got questions?
          </div>
          <h1 className="text-[32px] 800px:text-[42px] font-bold text-gray-900 dark:text-white leading-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[16px]">
            Can't find what you're looking for? Reach out to us at{" "}
            <a href="mailto:hello@upskill.com" className="text-[#0EA5E9] hover:underline">
              hello@upskill.com
            </a>
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q._id}
              className={`bg-white dark:bg-gray-800 border rounded-xl overflow-hidden transition-all duration-200 ${
                activeQuestion === q._id
                  ? "border-[#0EA5E9] shadow-sm"
                  : "border-gray-100 dark:border-gray-700"
              }`}
            >
              <button
                className="flex items-center justify-between w-full text-left px-6 py-4 focus:outline-none"
                onClick={() => toggleQuestion(q._id)}
              >
                <span className={`font-medium text-[15px] ${
                  activeQuestion === q._id
                    ? "text-[#0EA5E9]"
                    : "text-gray-900 dark:text-white"
                }`}>
                  {q.question}
                </span>
                <span className="ml-4 shrink-0">
                  {activeQuestion === q._id ? (
                    <HiMinus className="h-5 w-5 text-[#0EA5E9]" />
                  ) : (
                    <HiPlus className="h-5 w-5 text-gray-400" />
                  )}
                </span>
              </button>

              {activeQuestion === q._id && (
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">
                      {q.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-[18px] font-bold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            We're happy to help. Send us a message and we'll get back to you within 24 hours.
          </p>
          <Link
            href="mailto:hello@upskill.com"
            className="inline-block bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold px-6 py-2 rounded-full text-sm transition"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}

export default FAQ;