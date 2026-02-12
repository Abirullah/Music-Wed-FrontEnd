import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MobileBottomSheet from "./MobileBottomSheet";
import Img from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6 - Copy.jpg";
import { clearSession, getCurrentUser } from "../../../../src/utils/session";

export default function OwnerSettingsSheet({ open = false, onClose = () => {} }) {
  const navigate = useNavigate();

  const profile = useMemo(() => {
    const currentUser = getCurrentUser();
    const fullName = currentUser?.fullName || "Owner";
    const email = currentUser?.email || "";
    const profilePic = currentUser?.profilePicture || null;

    return { fullName, email, profilePic };
  }, []);

  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <MobileBottomSheet open={open} title="Account" onClose={onClose}>
      <div className="flex items-center gap-4">
        <img
          src={profile.profilePic || Img}
          alt="Profile"
          className="h-14 w-14 rounded-full border border-gray-200 object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {profile.fullName}
          </p>
          {profile.email && (
            <p className="truncate text-xs text-gray-500">{profile.email}</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/owner/settings");
          }}
          className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
        >
          Account settings
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl bg-gradient-to-r from-[#FFD43B] to-[#E6AF2E] px-4 py-3 text-sm font-semibold text-black shadow-sm hover:opacity-95"
        >
          Log out
        </button>
      </div>
    </MobileBottomSheet>
  );
}
