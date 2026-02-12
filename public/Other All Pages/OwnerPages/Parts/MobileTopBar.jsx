import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Img from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6 - Copy.jpg";
import { getCurrentUser } from "../../../../src/utils/session";

export default function MobileTopBar({ onSettingsClick = () => {} }) {
  const navigate = useNavigate();
  const avatarSrc = useMemo(() => {
    const currentUser = getCurrentUser();
    return currentUser?.profilePicture || Img;
  }, []);

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-gradient-to-r from-[#2b2b2b] to-black">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <h1
          className="text-lg font-extrabold tracking-wide text-white"
          onClick={() => navigate("/")}
        >
          ECHOTUNE
        </h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15"
            aria-label="Settings"
            onClick={onSettingsClick}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </button>

          <img
            src={avatarSrc}
            alt="Profile"
            className="h-9 w-9 rounded-full border border-white/20 object-cover"
          />
        </div>
      </div>
    </header>
  );
}
