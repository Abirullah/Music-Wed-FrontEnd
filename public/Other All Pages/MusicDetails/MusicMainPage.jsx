import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AllMusic from "./Parts/AllMusic";
import Music from "./Parts/Music";
import Contant from "./Parts/Contant";
import Arstist from "./Parts/Arstist";
import NavBar from "../../Component/NavBar";
import SmallNavBar from "../../Component/SmallNavBar";
import { SideMenu } from "../../Component/SideMenu";

function MusicMainPage() {
  const location = useLocation();
  const [CurrentPart, setCurrentPart] = useState(() => {
    const saved = Number(localStorage.getItem("MusicPageTab"));
    return Number.isFinite(saved) ? saved : 0;
  });
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [pendingPreview, setPendingPreview] = useState(null);

  useEffect(() => {
    const targetTab = Number(location.state?.targetTab);
    if (Number.isFinite(targetTab)) {
      setCurrentPart(targetTab);
      localStorage.setItem("MusicPageTab", String(targetTab));
    }

    const preview = location.state?.previewItem;
    const previewType = String(preview?.itemType || "").toLowerCase();
    if (preview?.id && (previewType === "song" || previewType === "content")) {
      const nextPreview = { id: String(preview.id), itemType: previewType };
      setPendingPreview(nextPreview);

      const previewTab = previewType === "song" ? 1 : 2;
      setCurrentPart(previewTab);
      localStorage.setItem("MusicPageTab", String(previewTab));
    }
  }, [location.key, location.state]);

  let content;

  switch (CurrentPart) {
    case 0:
      content = <AllMusic />;
      break;
    case 1:
      content = (
        <Music
          autoPreviewTarget={pendingPreview}
          onAutoPreviewConsumed={() => setPendingPreview(null)}
        />
      );
      break;
    case 2:
      content = (
        <Contant
          autoPreviewTarget={pendingPreview}
          onAutoPreviewConsumed={() => setPendingPreview(null)}
        />
      );
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
        CurrentPart={CurrentPart}
        storageKey="MusicPageTab"
      />

      <div className="w-[90%] mx-auto mt-8">{content}</div>
    </>
  );
}

export default MusicMainPage;
