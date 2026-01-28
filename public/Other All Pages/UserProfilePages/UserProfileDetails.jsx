import { useState , useEffect} from "react";
import NavBar from "../../Component/NavBar";
import SmallNavBar from "../../Component/SmallNavBar";
import PurchaseList from "./Parts/PurchaseList";
import Faverouite from "./Parts/Faverouite";
import UserInfo from "./Parts/UserInfo";
import { SideMenu } from "../../Component/SideMenu";



function Purchases() {

  const [CurrentPart, setCurrentPart] = useState(0);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

 useEffect(() => {
   const savedPage = Number(localStorage.getItem("CurrentPage")) || 0;
   setCurrentPart(savedPage);
 }, []);



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
        NavbarFirstChild = "py-1"
        setCurrentPaert={setCurrentPart}
      />

      <div className="w-[80%] mx-auto">{content}</div>
    </>
  );
}

export default Purchases;
