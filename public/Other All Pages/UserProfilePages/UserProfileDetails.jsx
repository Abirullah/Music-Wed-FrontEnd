import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import SmallNavBar from "../../Component/SmallNavBar";
import PurchaseList from "./Parts/PurchaseList";
import Faverouite from "./Parts/Faverouite";
import UserInfo from "./Parts/UserInfo";
import { SideMenu } from "../../Component/SideMenu";
import { getAuthToken, getCurrentUser } from "../../../src/utils/session";

const PROFILE_TAB_KEY = "UserProfileTab";
const getValidProfileTab = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= 2 ? parsed : 0;
};

function Purchases() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const token = useMemo(() => getAuthToken(), []);

  useEffect(() => {
    const role = String(currentUser?.role || currentUser?.Role || "user").toLowerCase();
    if (!token || role === "owner" || role === "admin") {
      navigate("/user/login", { replace: true });
    }
  }, [currentUser?.Role, currentUser?.role, navigate, token]);

  const [CurrentPart, setCurrentPart] = useState(() => {
    try {
      return getValidProfileTab(localStorage.getItem(PROFILE_TAB_KEY));
    } catch {
      return 0;
    }
  });
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  let content;

  switch (CurrentPart) {
    case 0:
      content = <PurchaseList />;
      break;
    case 1:
      content = <Faverouite />;
      break;
    case 2:
      content = <UserInfo />;
      break;
    default:
      content = <PurchaseList />;
  }

  return (
    <>
      {openProfileMenu && (
        <SideMenu
          openProfileMenu={setOpenProfileMenu}
          setCurrentPart={setCurrentPart}
        />
      )}
      <NavBar
        classes={"bg-black/90 self-start text-white "}
        buttonclass={"border-white"}
        onProfileClick={() => setOpenProfileMenu(true)}
      />

      <SmallNavBar
        classes="py-2 sticky top-0 z-30 bg-white shadow-sm shadow-black/20"
        tabs={[
          { label: "Purchases" },
          { label: "Favourites" },
          { label: "User Info" },
        ]}
        NavbarFirstChild="py-1"
        setCurrentPaert={setCurrentPart}
        CurrentPart={CurrentPart}
        storageKey={PROFILE_TAB_KEY}
      />

      <div className="w-full max-w-5xl lg:max-w-7xl mx-auto px-4 md:px-2 lg:px-4">
        {content}
      </div>
    </>
  );
}

export default Purchases;
