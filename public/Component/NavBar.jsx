import { useState, useEffect } from "react";
import HerImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { SideMenu } from "./SideMenu";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  classes = "",
  buttonclass = "",
  onProfileClick,
  setCurrentPart,
  bgImg,
}) {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "Lorem, ipsum.",
    profilePic: HerImg,
    Role: "user",
  });

  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setIsAuthenticated(true);
        setUserProfile({
          name: currentUser.fullName,
          profilePic: HerImg,
          Role: currentUser.Role,
        });
      }
    } catch (err) {
      localStorage.removeItem("currentUser");
    }
  }, []);

  const handleProfileClick = () => {
    if (onProfileClick) return onProfileClick();

    if (userProfile.Role === "owner") {
      localStorage.setItem("desktopMode", "true");
      navigate("/owner/dashboard");
      return;
    }

    setOpenProfileMenu(true);
  };

  const handleLoginClick = () => {
    navigate("/user/login");
  };

  return (
    <>
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
