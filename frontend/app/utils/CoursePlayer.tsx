import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineReload } from "react-icons/ai";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOTP = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`,
        { videoId: videoUrl }
      );
      setVideoData(res.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoUrl) fetchOTP();
  }, [videoUrl]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-md dark:shadow-none border dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Title above video */}
      {title && (
        <div className="px-4 py-2 bg-[#6abfc1] text-white font-medium text-lg">
          {title}
        </div>
      )}

      {/* Video container */}
      <div className="relative pt-[56.25%]">
        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="animate-pulse w-16 h-16 bg-[#6abfc1] rounded-full"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Failed to load video. Please try again.
            </p>
            <button
              onClick={fetchOTP}
              className="flex items-center gap-2 px-4 py-2 bg-[#6abfc1] text-white rounded-lg hover:bg-[#5aa7aa] transition"
            >
              <AiOutlineReload /> Retry
            </button>
          </div>
        )}

        {/* Video iframe */}
        {!loading && !error && videoData.otp && videoData.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=dliPmk7bKxZd1Eve`}
            allowFullScreen
            allow="encrypted-media"
            className="absolute top-0 left-0 w-full h-full border-0 rounded-b-xl"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
