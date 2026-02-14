import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import SmallNavBar from "../../Component/SmallNavBar";
import PurchaseList from "./Parts/PurchaseList";
import Faverouite from "./Parts/Faverouite";
import UserInfo from "./Parts/UserInfo";
import { SideMenu } from "../../Component/SideMenu";
import { getAuthToken, getCurrentUser } from "../../../src/utils/session";

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
      return Number(localStorage.getItem("CurrentPage")) || 0;
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
      content = null;
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
      />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-0">{content}</div>
    </>
  );
}

export default Purchases;
