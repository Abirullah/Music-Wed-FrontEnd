import { useState } from "react";
import { useLocation } from "react-router-dom";
import OwnerDishBoard from "./OwnerDishBoard";
import Sidebar from "./Parts/SideBar";
import OwnerUploads from "./OwnerUploads";
import OwnerStatement from "./OwnerStatement";
import OwnerPrivacyAndContent from "./OwnerPrivacyAndContent";
import UploadASong from "./SubPages/UploadASong"
import UploadAContant from "./SubPages/UploadAContant"
import MobileTopBar from "./Parts/MobileTopBar";
import BottomNav from "./Parts/BottomNav";
import OwnerAccountSettings from "./OwnerAccountSettings";
import OwnerSettingsSheet from "./Parts/OwnerSettingsSheet";

function Owner() {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Map paths to parts
  const pathToPart = {
    "/owner/dashboard": 0,
    "/owner/statement": 1,
    "/owner/upload": 2,
    "/owner/piracy": 3,
    "/owner/settings": 6,
    //subParts
    "/owner/dashboard/uploadSongs": 4,
    "/owner/dashboard/uploadContant": 5,
    
  };

  const currentPart = pathToPart[location.pathname] ?? 0;

  let content;

  switch (currentPart) {
    case 0:
      content = <OwnerDishBoard />;
      break;
    case 1:
      content = <OwnerStatement />;
      break;
    case 2:
      content = <OwnerUploads />;
      break;
    case 3:
      content = <OwnerPrivacyAndContent />;
      break;
          case 4:
      content = <UploadASong />;
      break;
	        case 5:
	      content = <UploadAContant />;
	      break;
	    case 6:
	      content = <OwnerAccountSettings />;
	      break;
	    default:
	      content = <OwnerDishBoard />;
	  }

	  const isSubPage = currentPart === 4 || currentPart === 5 || currentPart === 6;

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

	        <div className="lg:ml-72">
	          {!isSubPage && (
	            <MobileTopBar onSettingsClick={() => setSettingsOpen(true)} />
	          )}

	          <main
	            className={`w-full min-h-screen bg-gray-100 p-4 lg:p-8 ${
	              !isSubPage ? "pb-24 lg:pb-8" : ""
	            }`}
	          >
	            {content}
	          </main>

	          {!isSubPage && <BottomNav />}
	          {!isSubPage && (
	            <OwnerSettingsSheet
	              open={settingsOpen}
	              onClose={() => setSettingsOpen(false)}
	            />
	          )}
	        </div>
	      </div>
	    </>
	  );
}

export default Owner;
