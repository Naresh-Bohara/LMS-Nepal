import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setactiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const course = courseData?.course;
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: `New Reply Received`,
          message: `You have a new question in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-6 m-auto space-y-6">
      {/* Video Player */}
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      {/* Navigation Buttons */}
      <div className="w-full flex justify-between items-center mt-6">
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-dark text-white transition-all duration-300 hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed`}
          onClick={() => setActiveVideo(activeVideo > 0 ? activeVideo - 1 : 0)}
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft /> Prev Lesson
        </button>

        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-dark text-white transition-all duration-300 hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed`}
          onClick={() =>
            setActiveVideo(
              activeVideo === data.length - 1 ? activeVideo : activeVideo + 1
            )
          }
          disabled={activeVideo === data.length - 1}
        >
          Next Lesson <AiOutlineArrowRight />
        </button>
      </div>

      {/* Video Title */}
      <h1 className="text-2xl font-semibold text-black dark:text-white">
        {data[activeVideo].title}
      </h1>

      {/* Tab Navigation */}
      <div className="w-full flex justify-around bg-slate-200 dark:bg-slate-700 rounded-lg py-3 px-4">
        {["Overview", "Resources", "Q&A", "Reviews"].map((tab, index) => (
          <button
            key={index}
            className={`text-lg font-medium transition-colors duration-300 ${
              activeBar === index
                ? "text-primary border-b-2 border-primary"
                : "text-black dark:text-white"
            }`}
            onClick={() => setactiveBar(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-[18px] text-black dark:text-white">
        {activeBar === 0 && (
          <p className="whitespace-pre-line leading-7">
            {data[activeVideo]?.description}
          </p>
        )}

        {activeBar === 1 && (
          <div className="space-y-4">
            {data[activeVideo]?.links.map((item:any, index:any) => (
              <div key={index}>
                <h4 className="font-semibold">
                  {item.title && item.title + ":"}
                </h4>
                <a
                  className="text-blue-500 hover:underline"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Image
                src={user.avatar?.url || "/default-avatar.png"}
                width={50}
                height={50}
                alt="User Avatar"
                className="rounded-full object-cover"
              />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your question..."
                rows={5}
                className="flex-1 p-3 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg outline-none resize-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={questionCreationLoading ? () => {} : handleQuestion}
                className="px-5 py-2 bg-primary text-white rounded-lg disabled:opacity-60"
                disabled={questionCreationLoading}
              >
                Submit
              </button>
            </div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        )}

        {activeBar === 3 && (
          <div className="space-y-8">
            {!isReviewExists && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Image
                    src={user.avatar?.url || "/default-avatar.png"}
                    width={180}
                    height={180}
                    alt="User Avatar"
                    className="rounded-full object-cover w-10 h-10"
                  />

                  <div className="flex-1 space-y-3">
                    <div>
                      <h5 className="text-lg font-medium">
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="cursor-pointer text-yellow-400"
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="cursor-pointer text-yellow-400"
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                    </div>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Write your comment..."
                      rows={5}
                      className="w-full p-3 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleReviewSubmit}
                    disabled={reviewCreationLoading}
                    className="px-5 py-2 bg-primary text-white rounded-lg disabled:opacity-60"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* Review List */}
            <div className="space-y-6">
              {[...(course?.reviews || [])].reverse().map((item, index) => (
                <div key={index} className="space-y-3">
                 <div className="flex gap-3 items-start">
  <Image
    src={item.user.avatar?.url || "/default-avatar.png"}
    width={140}
    height={140}
    alt="User Avatar"
    className="w-12 h-12 rounded-full object-cover"
  />
  <div>
    <h4 className="font-medium text-sm">{item.user.name}</h4>
    <Ratings rating={item.rating} />
    <p className="text-sm">{item.comment}</p>
    <small className="text-xs text-gray-500">{format(item.createdAt)}</small>
  </div>
</div>


                  {user.role === "admin" &&
                    item.commentReplies.length === 0 && (
                      <button
                        className="text-sm text-blue-500 ml-14 hover:underline"
                        onClick={() => {
                          setIsReviewReply(true);
                          setReviewId(item._id);
                        }}
                      >
                        Add Reply
                      </button>
                    )}

                  {isReviewReply && reviewId === item._id && (
                    <div className="ml-14 mt-2">
                      <input
                        type="text"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Enter your reply..."
                        className="w-full p-2 rounded border dark:border-slate-600 outline-none"
                      />
                      <button
                        onClick={handleReviewReplySubmit}
                        className="mt-2 text-sm text-primary hover:underline"
                      >
                        Submit
                      </button>
                    </div>
                  )}

                {item.commentReplies.map((replyItem:any, replyIdx:any) => (
  <div key={replyIdx} className="ml-16 flex  gap-2 items-start">
    <Image
      src={replyItem.user.avatar?.url || "/default-avatar.png"}
      width={16}
      height={16}
      alt="Reply Avatar"
      className="w-4 h-4 rounded-full object-cover"
    />
    <div>
      <div className="flex items-center gap-1">
        <h5 className="font-semibold text-xs">{replyItem.user.name}</h5>
        <VscVerifiedFilled className="text-blue-500 text-sm" />
      </div>
      <p className="text-xs">{replyItem.comment}</p>
      <small className="text-[10px] text-gray-500">{format(replyItem.createdAt)}</small>
    </div>
  </div>
))}

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setreplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>

        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={item._id}
              >

              <div>
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={32}
                        height={32}
                        alt="User avatar"
                        className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-slate-600"
                      />
             </div>

                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#39c8ca] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)} •
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${
                    answer === "" || answerCreationLoading
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  }`}
                />
                <button
                  type="submit"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                  className={`absolute right-0 bottom-1 mt-2 px-5 py-3  rounded-lg mb-2 text-sm font-medium transition-all duration-300 ${
                    answer === "" || answerCreationLoading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#4ea6a9] hover:bg-[#39c8ca] text-white"
                  }`}
                > 
                  Submit
                </button>
              </div>

              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
