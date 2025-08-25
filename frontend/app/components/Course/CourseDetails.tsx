import { styles } from "@/app/styles/style";
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
  const { data: userData,refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

return (
  <div className="bg-gray-50 dark:bg-[#121212] min-h-screen pb-10 mt-[-38px] mb-[-70px]">
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 lg:pr-8">
          <h1 className="text-3xl sm:text-4xl font-Poppins font-semibold text-black dark:text-gray-100">
            {data.name}
          </h1>

          <div className="flex justify-between items-center mt-3 text-gray-700 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Ratings rating={data.ratings} />
              <span className="font-medium">{data.reviews?.length} Reviews</span>
            </div>
            <span className="font-medium">{data.purchased} Students</span>
          </div>

          {/* Benefits */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-4">
              What you will learn from this course?
            </h2>
            <ul className="space-y-3">
              {data.benefits?.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-800 dark:text-gray-300"
                >
                  <IoCheckmarkDoneOutline
                    size={22}
                    className="text-crimson dark:text-crimson"
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prerequisites */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-4">
              Prerequisites
            </h2>
            <ul className="space-y-3">
              {data.prerequisites?.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-800 dark:text-gray-300"
                >
                  <IoCheckmarkDoneOutline
                    size={22}
                    className="text-crimson dark:text-crimson"
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Course Overview */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-4">
              Course Overview
            </h2>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </section>

          {/* Course Details */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-4">
              Course Details
            </h2>
            <p className="text-lg leading-relaxed whitespace-pre-line text-gray-900 dark:text-gray-300">
              {data.description}
            </p>
          </section>

          {/* Reviews */}
          <section className="mt-14">
            <div className="flex items-center gap-4">
              <Ratings rating={data?.ratings} />
              <h3 className="text-2xl font-semibold text-black dark:text-gray-100">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}{" "}
                Course Rating &bull; {data?.reviews?.length} Reviews
              </h3>
            </div>

            <div className="mt-6 space-y-8">
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <article
                    key={index}
                    className="bg-white dark:bg-[#1f1f1f] p-5 rounded-xl shadow-md"
                    aria-label={`Review by ${item.user.name}`}
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={50}
                        height={50}
                        alt={`${item.user.name}'s avatar`}
                        className="rounded-full object-cover w-[50px] h-[50px]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {item.user.name}
                            </h4>
                            <Ratings rating={item.rating} />
                          </div>
                          <time
                            className="text-sm text-gray-500 dark:text-gray-400"
                            dateTime={item.createdAt}
                          >
                            {format(item.createdAt)}
                          </time>
                        </div>
                        <p className="mt-2 text-gray-800 dark:text-gray-300">
                          {item.comment}
                        </p>

                        {/* Replies */}
                        {item.commentReplies.length > 0 && (
                          <div className="mt-4 pl-12 space-y-4">
                            {item.commentReplies.map((reply: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 bg-gray-100 dark:bg-[#2a2a2a] p-3 rounded-lg"
                                aria-label={`Reply by ${reply.user.name}`}
                              >
                                <Image
                                  src={
                                    reply.user.avatar
                                      ? reply.user.avatar.url
                                      : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                  }
                                  width={40}
                                  height={40}
                                  alt={`${reply.user.name}'s avatar`}
                                  className="rounded-full object-cover w-[40px] h-[40px]"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                      {reply.user.name}
                                    </h5>
                                    <VscVerifiedFilled
                                      className="text-[#0095F6]"
                                      title="Verified"
                                      aria-label="Verified user"
                                    />
                                  </div>
                                  <p className="text-gray-800 dark:text-gray-300">
                                    {reply.comment}
                                  </p>
                                  <time
                                    className="text-xs text-gray-500 dark:text-gray-400"
                                    dateTime={reply.createdAt}
                                  >
                                    {format(reply.createdAt)}
                                  </time>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        </div>

        {/* Right Section */}
        <aside className="w-full lg:w-1/3 sticky top-24 self-start">
          <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

         <div className="mt-6 flex items-center gap-4">
  <h2 className="text-3xl font-semibold text-black dark:text-gray-100">
    {data.price === 0 ? 'Free' : `Rs. ${data.price}`}
  </h2>

  {data.price !== 0 && (
    <>
      <span className="line-through text-lg text-gray-500 dark:text-gray-500">
        Rs. {data.estimatedPrice}
      </span>
      <span className="text-lg font-semibold text-primary">
        {discountPercentengePrice}% Off
      </span>
    </>
  )}
</div>

<div className="mt-6">
  {isPurchased ? (
    <Link
      href={`/course-access/${data._id}`}
      className="block bg-primary text-white text-center font-semibold py-3 rounded-md hover:opacity-90 transition"
      aria-label="Enter to course"
    >
      Enter to Course
    </Link>
  ) : (
    <button
      onClick={handleOrder}
      className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
      aria-label="Buy Now"
    >
      {data.price === 0 ? 'Enroll for Free' : `Buy Now - Rs. ${data.price}`}
    </button>
  )}
</div>


          <ul className="mt-8 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Source code included</li>
            <li>• Full lifetime access</li>
            <li>• Certificate of completion</li>
            <li>• Premium Support</li>
          </ul>
        </aside>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-[#222] rounded-xl shadow-lg p-5 max-w-md w-full relative">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close modal"
              className="absolute top-3 right-3 text-gray-800 dark:text-gray-200 hover:text-crimson transition"
            >
              <IoCloseOutline size={30} />
            </button>

            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm setOpen={setOpen} data={data} user={user} refetch={refetch} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default CourseDetails;
