import { useState } from "react";
import HerImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { SideMenu } from "./SideMenu";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../src/utils/session";
import { reportPiracyByName } from "../../src/api/catalog";

export default function NavBar({
  classes = "",
  buttonclass = "",
  onProfileClick,
  setCurrentPart,
  bgImg,
}) {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [currentUser] = useState(() => getCurrentUser());
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState({ type: "", message: "" });
  const [reportForm, setReportForm] = useState({
    uploaderName: "",
    itemName: "",
    itemType: "all",
    pincode: "",
    violationTimeframe: "",
    details: "",
  });

  const isAuthenticated = Boolean(currentUser);
  const userProfile = currentUser
    ? {
        name: currentUser.fullName,
        profilePic: currentUser.profilePicture || HerImg,
        Role: currentUser.Role,
      }
    : {
        name: "Lorem, ipsum.",
        profilePic: HerImg,
        Role: "user",
      };
  const currentRole = String(currentUser?.role || currentUser?.Role || "").toLowerCase();
  const canSubmitPiracyComplaint = Boolean(currentUser && !["owner", "admin"].includes(currentRole));

  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onProfileClick) return onProfileClick();

    if (userProfile.Role === "owner") {
      sessionStorage.setItem("desktopMode", "true");
      navigate("/owner/dashboard");
      return;
    }

    setOpenProfileMenu(true);
  };

  const handleLoginClick = () => {
    navigate("/user/login");
  };

  const handleOpenReportModal = () => {
    if (!currentUser) {
      navigate("/user/login");
      return;
    }

    if (!canSubmitPiracyComplaint) {
      setReportStatus({
        type: "error",
        message: "Please use a user account to submit piracy complaints.",
      });
      setReportModalOpen(true);
      return;
    }

    setReportStatus({ type: "", message: "" });
    setReportModalOpen(true);
  };

  const handleReportSubmit = async (event) => {
    event.preventDefault();
    const uploaderName = String(reportForm.uploaderName || "").trim();
    const itemName = String(reportForm.itemName || "").trim();

    if (!uploaderName || !itemName) {
      setReportStatus({
        type: "error",
        message: "Uploader name and song/content name are required.",
      });
      return;
    }

    try {
      setReportLoading(true);
      setReportStatus({ type: "", message: "" });
      await reportPiracyByName({
        uploaderName,
        itemName,
        itemType: reportForm.itemType,
        pincode: reportForm.pincode,
        violationTimeframe: reportForm.violationTimeframe,
        details: reportForm.details,
      });

      setReportStatus({
        type: "success",
        message: "Complaint submitted successfully.",
      });
      setReportForm({
        uploaderName: "",
        itemName: "",
        itemType: "all",
        pincode: "",
        violationTimeframe: "",
        details: "",
      });
    } catch (error) {
      setReportStatus({
        type: "error",
        message: error.message || "Failed to submit complaint.",
      });
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <>
      {reportModalOpen ? (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Report Content Piracy</h2>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                onClick={() => setReportModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Uploader name *"
                  value={reportForm.uploaderName}
                  onChange={(event) =>
                    setReportForm((prev) => ({ ...prev, uploaderName: event.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
                <input
                  type="text"
                  placeholder="Song/Content name *"
                  value={reportForm.itemName}
                  onChange={(event) =>
                    setReportForm((prev) => ({ ...prev, itemName: event.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <select
                  value={reportForm.itemType}
                  onChange={(event) =>
                    setReportForm((prev) => ({ ...prev, itemType: event.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
                >
                  <option value="all">All</option>
                  <option value="song">Music</option>
                  <option value="content">Content</option>
                </select>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={reportForm.pincode}
                  onChange={(event) =>
                    setReportForm((prev) => ({ ...prev, pincode: event.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
                <input
                  type="text"
                  placeholder="Violation timeframe"
                  value={reportForm.violationTimeframe}
                  onChange={(event) =>
                    setReportForm((prev) => ({
                      ...prev,
                      violationTimeframe: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </div>

              <textarea
                placeholder="Describe the issue"
                value={reportForm.details}
                onChange={(event) =>
                  setReportForm((prev) => ({ ...prev, details: event.target.value }))
                }
                className="h-28 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />

              {reportStatus.message ? (
                <p
                  className={`text-sm font-medium ${
                    reportStatus.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {reportStatus.message}
                </p>
              ) : null}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reportLoading || !canSubmitPiracyComplaint}
                  className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  {reportLoading ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {openProfileMenu && (
        <div className="z-[102]">
          <SideMenu
            openProfileMenu={setOpenProfileMenu}
            setCurrentPart={setCurrentPart}
          />
        </div>
      )}

      <nav
        className={`w-full shadow-md backdrop-blur-lg ${classes}`}
        style={
          bgImg
            ? { backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }
            : {}
        }
      >
        <div
          className="
            max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]bold
            mx-auto
            flex justify-between items-center
            py-2 sm:py-3
          "
        >
          {/* ================= LOGO ================= */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1
              className="
                text-xl              
                sm:text-2xl          
                md:text-3xl           
                lg:text-4xl           
                font-extrabold
                text-white
              "
            >
              ECHOTUNE
            </h1>
            <p
              className="
                text-[10px]
                sm:text-xs
                md:text-sm
                lg:text-xl
                text-white/90
              "
            >
              Lorem, ipsum dolor.
            </p>
          </div>

          {/* ================= ACTIONS ================= */}
          <div
            className="
              flex items-center
              gap-2 sm:gap-4 md:gap-6 lg:gap-20
            "
          >
            {/* REPORT BUTTON */}
            <button
              type="button"
              onClick={handleOpenReportModal}
              className={`
                px-2 py-1
                sm:px-3 sm:py-2
                lg:px-4 lg:py-3
                text-[10px] sm:text-xs lg:text-base
                bg-black/10 border-2
                font-bold rounded-lg
                whitespace-nowrap
                ${buttonclass}
              `}
            >
              Report content piracy
            </button>

            {/* PROFILE / LOGIN */}
            {isAuthenticated ? (
              <div
                className="
                  flex items-center
                  gap-2 sm:gap-3
                  cursor-pointer
                "
                onClick={handleProfileClick}
              >
                <img
                  src={userProfile.profilePic}
                  alt=""
                  className="
                    w-6 h-6
                    sm:w-8 sm:h-8
                    md:w-10 md:h-10
                    lg:w-14 lg:h-14
                    rounded-full border
                  "
                />
                <div className="flex flex-col leading-tight text-white">
                  <p
                    className="
                      font-bold
                      text-[10px] sm:text-xs md:text-sm lg:text-xl
                      whitespace-nowrap
                    "
                  >
                    {userProfile.name}
                  </p>
                  <span
                    className="
                      text-[9px] sm:text-[10px] lg:text-sm
                      opacity-80
                    "
                  >
                    {userProfile.Role}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="
                  px-3 py-1
                  sm:px-5 sm:py-2
                  lg:px-8 lg:py-3
                  text-[10px] sm:text-xs lg:text-base
                  bg-black text-white
                  font-bold rounded-lg
                  transition
                "
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
