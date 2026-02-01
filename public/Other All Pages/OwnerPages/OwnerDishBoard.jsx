import { useNavigate } from "react-router-dom";
import SearchBar from "./Parts/SearchBar";
import Img from "../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";




export default function DashboardHome() {

  const navigate = useNavigate()

    const uploads = [
      { id: 1, type: "music", title: "Lorem ipsum" },
      { id: 2, type: "video", title: "Lorem ipsum" },
      { id: 3, type: "music", title: "Lorem ipsum" },
      { id: 4, type: "video", title: "Lorem ipsum" },
      { id: 5, type: "music", title: "Lorem ipsum" },
      { id: 6, type: "video", title: "Lorem ipsum" },
      { id: 7, type: "music", title: "Lorem ipsum" },
      { id: 8, type: "video", title: "Lorem ipsum" },
    ];


    function UploadCard({ title, desc, bg, borderColor, svgIcon, iconBg , Path}) {
  return (
    <div
      className={`${bg} border ${borderColor} rounded-xl p-8 gap-5 flex flex-col justify-between shadow-sm hover:shadow-md transition`}
     
    >
      <div className="flex gap-6">
        <div>
          <div className={`w-15 h-15 flex items-center justify-center rounded-lg shadow-md ${iconBg}`}>
            {svgIcon}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2">{title}</h4>
          <p className="text-gray-800 ">{desc}</p>
        </div>
      </div>



      <button
       onClick={() => navigate(Path)}
        text="Upload"
        className="bg-gray-900 hover:bg-black text-white h-13 rounded-lg  text-xl font-semibold w-[80%] self-center"
      >Upload</button>
      

    </div>
    
  );
}




  return (
    <div className="flex justify-between gap-8 items-center">
      <div className="space-y-8 w-[65%]">
        <p className="text-4xl font-bold my-5">Dashboard</p>

        {/* Search */}
        <SearchBar />

        {/* Welcome Card */}
        <div className="bg-white rounded-xl px-6 py-3 shadow flex justify-between">
          <div className=" flex gap-6 items-center">
            <img
              src={Img}
              className=" w-18 h-18 rounded-full overflow-hidden"
              alt=""
            />

            <div>
              <p className="text-gray-500 font-semibold text-xl">
                Welcome to Copyva
              </p>
              <h2 className="text-2xl font-bold">Thomas varghese</h2>
            </div>
          </div>

          <div className="flex gap-10">
            <Stat label="Music Uploaded" value="10" color="text-blue-500" />
            <div className="h-10 w-px bg-gray-300" />
            <Stat label="Content Uploaded" value="24" color="text-orange-400" />
          </div>
        </div>

        {/* Upload Cards */}
        <div className="grid grid-cols-2 gap-6 ">
          <UploadCard
            title="Upload your music"
            desc="Lorem ipsum dolor sit amet consectetur"
            bg="bg-blue-100/80"
            borderColor="border-blue-200"
            svgIcon={
              <svg
                className="w-12 h-12 text-[rgb(102,116,247)]"
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
            Path="/owner/dashBoard/uploadSongs"
          />
          <UploadCard
            title="Upload your content"
            desc="Lorem ipsum dolor sit amet consectetur"
            bg="bg-orange-100/80"
            borderColor="border-orange-200"
            svgIcon={
              <svg
                className="w-12 h-12 text-[#f97316]"
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
            Path="/owner/dashBoard/uploadContant"
          />
        </div>

        {/* Statements */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Students</h3>

           
              <select className="border rounded-lg px-3 w-[15%] py-1 text-sm">
                <option>All</option>
              </select>

              <select className="border rounded-lg px-3 w-[15%] py-1 text-sm">
                <option>2024</option>   
              </select>

              <button className="font-semibold text-blue-500 text-sm">
                Explore
              </button>
          </div>

          <div className="flex gap-5">
            {/* Chart */}
            <div className="h-64 flex w-[80%] items-end justify-between px-4 border-b">
              {["Jun", "Feb", "Mar", "Apr", "May", "Jun"].map(
                (month, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-10 bg-blue-500 rounded-t"
                      style={{ height: `${40 + Math.random() * 60}%` }}
                    ></div>
                    <span className="text-sm text-gray-600 mt-2">{month}</span>
                  </div>
                ),
              )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 mt-6 w-[18%]">
              <Summary label="Music & Content" value="24" />
              <Summary label="Music" value="14" color="text-blue-500" />
              <Summary label="Content" value="10" color="text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[30%] self-start mt-20 bg-white rounded-2xl h-auto border border-gray-100 p-8 shadow-sm font-sans">
        <h3 className="text-xl font-bold text-black mb-10">Recent Uploads</h3>

        <div className="space-y-6">
          {uploads.map((item) => (
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
                  Lorem ipsum dolor sit amet consect amet
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
      <p className="text-sm text-black">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
