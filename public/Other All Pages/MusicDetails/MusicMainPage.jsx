import { useState } from "react";
import AllMusic from "./Parts/AllMusic";
import Music from "./Parts/Music";
import Contant from "./Parts/Contant";
import Arstist from "./Parts/Arstist";
import NavBar from "../../Component/NavBar";
import SmallNavBar from "../../Component/SmallNavBar";
import { SideMenu } from "../../Component/SideMenu";

function MusicMainPage() {
  const [CurrentPart, setCurrentPart] = useState(0);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  let content;

  switch (CurrentPart) {
    case 0:
      content = <AllMusic />;
      break;
    case 1:
      content = <Music />;
      break;
    case 2:
      content = <Contant />;
      break;
    case 3:
      content = <Arstist />;
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
          CurrentPart={CurrentPart}
        />
      )}
      <NavBar
        classes={"bg-black/90 self-start text-white"}
        buttonclass={"border-white"}
        onProfileClick={() => setOpenProfileMenu(true)}
      />

      <SmallNavBar
        classes="py-5 sticky top-0 z-30 bg-white shadow-sm shadow-black/50"
        tabs={[
          { label: "All" },
          { label: "Music" },
          { label: "Contant" },
          { label: "Artist" },
        ]}
        setCurrentPaert={setCurrentPart}
      />

      <div className="w-[90%] mx-auto mt-8">{content}</div>
    </>
  );
}

export default MusicMainPage;
