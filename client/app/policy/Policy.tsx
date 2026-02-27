import React from "react";
import Link from "next/link";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="w-full bg-white dark:bg-gray-950 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#e0f2fe] text-[#0EA5E9] text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Legal
          </div>
          <h1 className="text-[32px] 800px:text-[42px] font-bold text-gray-900 dark:text-white leading-tight mb-3">
            Privacy Policy & Terms
          </h1>
          <p className="text-gray-400 text-sm">Last updated: January 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              1. Who we are
            </h2>
            <p>
              Upskill is an online learning platform that provides courses taught by expert instructors. We are committed to protecting your privacy and being transparent about how we handle your data. By using Upskill, you agree to the terms outlined in this policy.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              2. Information we collect
            </h2>
            <p>
              When you create an account, we collect your name, email address, and password. When you purchase a course, we collect payment information through our secure payment provider, Stripe. We do not store your full card details on our servers. We may also collect usage data such as which courses you've viewed or completed.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              3. How we use your information
            </h2>
            <p>
              We use your information to provide and improve our services, process payments, send you course updates and relevant communications, and provide customer support. We will never sell your personal data to third parties. We only share data with service providers that help us run the platform, such as Stripe for payments and Cloudinary for media storage.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              4. Cookies
            </h2>
            <p>
              We use cookies to keep you logged in, remember your preferences, and understand how you use our platform. You can disable cookies in your browser settings, but some parts of the platform may not work correctly without them.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              5. Course access and refunds
            </h2>
            <p>
              Once you purchase a course, you have lifetime access to all course materials. We offer a 30-day money-back guarantee on all purchases. If you are not satisfied with a course, contact us at hello@upskill.com within 30 days of purchase and we will issue a full refund.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              6. Your rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can update your profile details from your account settings page. To request deletion of your account and all associated data, email us at hello@upskill.com and we will process your request within 7 business days.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              7. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. When we do, we will update the date at the top of this page. We encourage you to review this page periodically. Continued use of Upskill after any changes means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-3">
              8. Contact us
            </h2>
            <p>
              If you have any questions about this policy or how we handle your data, please reach out to us at{" "}
              <a href="mailto:hello@upskill.com" className="text-[#0EA5E9] hover:underline">
                hello@upskill.com
              </a>
              . We're happy to help.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">
            Have questions about our policy?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            We're transparent about everything. Just ask.
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
};

export default Policy;