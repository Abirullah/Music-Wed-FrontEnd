import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Parts/SearchBar";
import Img from "../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { fetchOwnerDashboard } from "../../../src/api/owner";
import { getCurrentUser } from "../../../src/utils/session";




export default function DashboardHome() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      if (!currentUser?.id) {
        setError("Please login as owner.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchOwnerDashboard(currentUser.id);
        setDashboard(response);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [currentUser?.id]);

  const ownerName = dashboard?.owner?.name || currentUser?.fullName || "Owner";
  const ownerAvatar = dashboard?.owner?.profilePicture || currentUser?.profilePicture || Img;

  const musicUploaded = dashboard?.stats?.musicUploaded || 0;
  const contentUploaded = dashboard?.stats?.contentUploaded || 0;
  const recentUploads = dashboard?.recentUploads || [];
  const latestUpload = recentUploads[0];

  return (
	    <div className="mx-auto w-full max-w-md lg:max-w-none flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8 lg:items-start">
      <div className="space-y-6 lg:space-y-8 w-full lg:w-[65%]">
        <div className="hidden lg:block">
          <p className="text-4xl font-bold my-5">Dashboard</p>
        </div>

        {/* Search */}
        <div className="hidden lg:block">
          <SearchBar placeholder="Search uploads" />
        </div>
        {loading ? <p className="text-sm text-gray-500">Loading dashboard...</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        {/* Mobile quick card */}
	        <button
	          type="button"
	          onClick={() => navigate("/owner/upload")}
	          className="lg:hidden w-full rounded-2xl bg-white px-4 py-3 shadow-sm flex items-center justify-between"
	        >
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff]">
              <svg
                className="w-5 h-5 text-[#9ea6f3]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>

	            <div>
	              <p className="text-sm font-semibold text-black">
	                {latestUpload?.title || "Upload list"}
	              </p>
	              <p className="text-xs text-gray-400">
	                Tap to view all your uploads
	              </p>
	            </div>
	          </div>
	          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
	        </button>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl px-4 py-4 lg:px-6 lg:py-3 shadow-sm flex flex-col lg:flex-row lg:justify-between gap-4">
	          <div className="flex gap-4 lg:gap-6 items-center">
	            <img
	              src={ownerAvatar}
	              className="h-10 w-10  lg:h-16 lg:w-16 rounded-full object-cover"
	              alt=""
	            />

            <div>
	              <p className="text-gray-500 font-semibold text-sm lg:text-xl">
	                Welcome to Copyva
	              </p>
	              <h2 className="text-lg lg:text-2xl font-bold">{ownerName}</h2>
	            </div>
	          </div>
	
	          <div className="grid grid-cols-2 gap-4 lg:flex lg:gap-10 lg:items-center">
	            <Stat
	              label="Music Uploaded"
	              value={String(musicUploaded)}
	              color="text-blue-500"
	            />
	            <div className="hidden lg:block h-10 w-px bg-gray-300" />
	            <Stat
	              label="Content Uploaded"
	              value={String(contentUploaded)}
	              color="text-orange-400"
	            />
	          </div>
	        </div>

        {/* Upload Cards */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <UploadCard
            title="Upload your music"
            desc="Lorem ipsum dolor sit amet consectetur"
            bg="bg-blue-100/80"
            borderColor="border-blue-200"
            svgIcon={
              <svg
                className="w-10 h-10 md:h-12 md:w-12 text-[rgb(102,116,247)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            }
            iconBg="bg-[rgb(167,173,230)]/20"
            onUpload={() => navigate("/owner/dashboard/uploadSongs")}
          />
          <UploadCard
            title="Upload your content"
            desc="Lorem ipsum dolor sit amet consectetur"
            bg="bg-orange-100/80"
            borderColor="border-orange-200"
            svgIcon={
              <svg
                className="w-10 h-10 md:h-12 md:w-12 text-[#f97316]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            }
            iconBg="bg-[#fbbf24]/20"
            onUpload={() => navigate("/owner/dashboard/uploadContant")}
          />
        </div>

        {/* Statements */}
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h3 className="text-lg font-bold">Statements</h3>

           
              <select className="border rounded-xl px-3 py-2 text-sm bg-white">
                <option>All</option>
              </select>

              <select className="border rounded-xl px-3 py-2 text-sm bg-white">
                <option>2024</option>   
              </select>

              <button className="font-semibold text-blue-500 text-sm">
                Explore
              </button>
          </div>

	          <div className="flex gap-4 lg:gap-5 items-start">
            {/* Chart */}
            <div className="w-[70%] lg:w-[80%]">
	              <LineChart
	                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
	                series={[8, 6, 10, 9, 13, 12]}
	                highlightLabel="Music & content"
	                highlightValue={String(musicUploaded + contentUploaded)}
	                highlightIndex={2}
	              />
            </div>

            {/* Summary Cards */}
	            <div className="grid grid-cols-1 gap-3 w-[30%] lg:w-[18%]">
	              <Summary
	                label="Music & Content"
	                value={String(musicUploaded + contentUploaded)}
	              />
	              <Summary
	                label="Music"
	                value={String(musicUploaded)}
	                color="text-blue-500"
	              />
	              <Summary
	                label="Content"
	                value={String(contentUploaded)}
	                color="text-orange-400"
	              />
	            </div>
	          </div>
	        </div>
	      </div>

      <div className="hidden lg:block w-[30%] self-start mt-20 bg-white rounded-2xl h-auto border border-gray-100 p-8 shadow-sm font-sans">
        <h3 className="text-xl font-bold text-black mb-10">Recent Uploads</h3>

	        <div className="space-y-6">
	          {recentUploads.map((item) => (
	            <div key={item.id} className="flex items-center gap-4">
              {/* Icon Container */}
              <div
                className={`p-3 rounded-full flex items-center justify-center ${
                  item.type === "music" ? "bg-[#eef2ff]" : "bg-[#fff5f2]"
                }`}
              >
                {item.type === "music" ? (
                  // Music Icon
                  <svg
                    className="w-6 h-6 text-[#9ea6f3]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                ) : (
                  // Video Icon
                  <svg
                    className="w-6 h-6 text-[#f97316]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>

              {/* Text Content */}
	              <div className="flex flex-col">
	                <span className="text-[17px] font-semibold text-black leading-tight">
	                  {item.title}
	                </span>
	                <span className="text-[13px] text-gray-400 leading-tight">
	                  {item.subtitle}
	                </span>
	              </div>
	            </div>
	          ))}
	        </div>

        <div className="mt-8">
          <button className="text-black font-bold text-sm underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity">
            View all
          </button>
        </div>
      </div>
    </div>
  );
}

function UploadCard({ title, desc, bg, borderColor, svgIcon, iconBg, onUpload }) {
  return (
    <div
      className={`${bg} border ${borderColor} rounded-2xl p-4 lg:p-8 gap-5 flex flex-col justify-between shadow-sm hover:shadow-md transition`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <div
            className={`flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl shadow-sm ${iconBg}`}
          >
            {svgIcon}
          </div>
        </div>
        <div>
          <h4 className="md:text-lg text-md font-bold mb-2">{title}</h4>
          <p className="text-gray-800">{desc}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="bg-gray-900 hover:bg-black text-white h-12 rounded-xl text-base lg:text-xl font-semibold w-full lg:w-[80%] self-center"
      >
        Upload
      </button>
    </div>
  );
}

/* ====== Small Components ====== */

function Stat({ label, value, color }) {
  return (
    <div className="text-center">
      <p className=" text-black  font-semibold ">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}



function Summary({ label, value, color = "text-black" }) {
  return (
    <div className="border border-gray-200 rounded-xl p-2 text-center hover:bg-gray-50 transition">
      <p className="text-xs lg:text-sm text-black">{label}</p>
      <p className={`text-xl lg:text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function LineChart({
  labels = [],
  series = [],
  highlightIndex = 0,
  highlightLabel = "",
  highlightValue = "",
}) {
  const width = 320;
  const height = 150;
  const paddingX = 18;
  const paddingY = 16;

  const max = Math.max(...series, 1);
  const min = Math.min(...series, 0);
  const range = max - min || 1;

  const stepX = labels.length > 1 ? (width - paddingX * 2) / (labels.length - 1) : 0;

  const points = series
    .map((value, i) => {
      const x = paddingX + i * stepX;
      const y =
        paddingY + (height - paddingY * 2) * (1 - (value - min) / range);
      return `${x},${y}`;
    })
    .join(" ");

  const area = `${paddingX},${height - paddingY} ${points} ${
    paddingX + (labels.length - 1) * stepX
  },${height - paddingY}`;

  const highlightLeft =
    labels.length > 1 ? (highlightIndex / (labels.length - 1)) * 100 : 0;

  return (
    <div className="relative w-full">
      <div className="relative rounded-xl border border-gray-200 bg-white px-3 py-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-40 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="echotuneLineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#111827" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0" />
            </linearGradient>
          </defs>

          <polyline
            points={area}
            fill="url(#echotuneLineFill)"
            stroke="none"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {highlightLabel && (
          <div
            className="absolute top-10 -translate-x-1/2 rounded-xl bg-[#111827] px-4 py-3 text-white shadow-lg"
            style={{ left: `${highlightLeft}%` }}
          >
            <p className="text-xs opacity-90">{highlightLabel}</p>
            <p className="text-lg font-bold leading-tight">{highlightValue}</p>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between px-1 text-xs text-gray-500">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
