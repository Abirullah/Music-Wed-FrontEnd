import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OwnerDishBoard from "./OwnerDishBoard";
import Sidebar from "./Parts/SideBar";
import OwnerUploads from "./OwnerUploads";
import OwnerStatement from "./OwnerStatement";
import OwnerPrivacyAndContent from "./OwnerPrivacyAndContent";
import UploadASong from "./SubPages/UploadASong"
import UploadAContant from "./SubPages/UploadAContant"

function Owner() {
  const [currentPart, setCurrentPart] = useState(0);
  const location = useLocation();

  // Map paths to parts
  const pathToPart = {
    "/owner/dashboard": 0,
    "/owner/statement": 1,
    "/owner/upload": 2,
    "/owner/piracy": 3,
    //subParts
    "/owner/dashBoard/uploadSongs" :4,
    "/owner/dashBoard/uploadContant" : 5,
    
  };

  // Update currentPart when route changes
  useEffect(() => {
    const part = pathToPart[location.pathname];
    if (part !== undefined) {
      setCurrentPart(part);
    }
  }, [location.pathname]);

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
    default:
      content = <OwnerDishBoard />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />

        <main className="ml-72 w-full min-h-screen bg-gray-100 p-8">
          {content}
        </main>
      </div>
    </>
  );
}

export default Owner;
