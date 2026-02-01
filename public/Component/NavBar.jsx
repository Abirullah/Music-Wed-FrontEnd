import { useState , useEffect } from "react";
import HerImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { SideMenu } from "./SideMenu";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  classes,
  buttonclass,
  onProfileClick,
  setCurrentPart,
  bgImg
}) {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Lorem, ipsum.",
    profilePic: HerImg,
    Role : "user",
  });

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
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
    localStorage.removeItem("currentUser");
  }
}, []);


  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      setOpenProfileMenu(true);
    }
  };

  const handleLoginClick = () => {
    navigate("/user/login");
  };

  return (
    <>
      {openProfileMenu && (
        <div className="z-102">
          <SideMenu
            openProfileMenu={setOpenProfileMenu}
            setCurrentPart={setCurrentPart}
          />
        </div>
      )}
      <nav
  className={`w-full shadow-md ${classes} backdrop-blur-lg`}
  style={bgImg ? { backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' } : {}}
>
        <div
          className={`max-w-[80%] mx-auto  flex  justify-between items-center py-3`}
        >
          {/* Logo */}
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-4xl font-extrabold">ECHOTUNE</h1>
            <p className="text-xl">Lorem, ipsum dolor.</p>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-20 justify-center items-center">
            <button
              className={`w-[100%]  h-auto py-3 px-3 bg-black/10 border-2  font-bold rounded-lg ${buttonclass}`}
            >
              Report content piracy
            </button>

            {isAuthenticated ? (
              <div
                className="flex gap-3 flex-nowrap cursor-pointer"
                onClick={handleProfileClick}
              >
                <img
                  className="w-15 h-15 border rounded-[50%] "
                  src={userProfile.profilePic}
                />
                <div className=" flex flex-col">
                  <p className="text-2xl font-bold w-full text-nowrap ">
                    {userProfile.name}
                  </p>
                  <a href="">{userProfile.Role}</a>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="px-8 py-3 bg-black hover:scale-101 font-bold rounded-lg transition duration-200"
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
