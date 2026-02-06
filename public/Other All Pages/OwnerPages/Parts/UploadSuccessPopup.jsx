import { useEffect } from "react";
import {
  CheckCircleIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

export default function UploadSuccessPopup({ open, type = "music", onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isMusic = type === "music";
  const title = isMusic
    ? "Music uploaded successfully"
    : "Content uploaded successfully";
  const Icon = isMusic ? MusicalNoteIcon : VideoCameraIcon;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/40"
        onClick={() => onClose?.()}
      />

      {/* Mobile bottom sheet */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white px-6 py-8 pb-[calc(32px+env(safe-area-inset-bottom))] shadow-2xl">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="relative mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-[#eef2ff]">
            <Icon className="h-12 w-12 text-[#6674f7]" aria-hidden />
            <CheckCircleIcon
              className="absolute -right-1 -top-1 h-7 w-7 text-green-600"
              aria-hidden
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#FFD43B] to-[#E6AF2E] py-3 text-base font-semibold text-black shadow-sm hover:opacity-95"
          >
            Upload list
          </button>
        </div>
      </div>

      {/* Desktop centered modal */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center p-8">
        <div className="w-full max-w-3xl rounded-3xl bg-white px-14 py-16 shadow-2xl">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="relative mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-[#eef2ff]">
              <Icon className="h-16 w-16 text-[#6674f7]" aria-hidden />
              <CheckCircleIcon
                className="absolute -right-2 -top-2 h-10 w-10 text-green-600"
                aria-hidden
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

            <button
              type="button"
              onClick={() => onClose?.()}
              className="mt-8 w-72 rounded-xl bg-gradient-to-r from-[#FFD43B] to-[#E6AF2E] py-3 text-base font-semibold text-black shadow-sm hover:opacity-95"
            >
              Upload list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

