import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileBottomSheet({
  open = false,
  title = "Note",
  onClose = () => {},
  children,
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-4 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="mt-3 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}

