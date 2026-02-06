import { useLocation } from "react-router-dom";
import { PauseIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAudioPlayer } from "./AudioPlayerContext";

const formatTime = (sec) => {
  const value = Number(sec);
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export default function GlobalAudioPlayer() {
  const location = useLocation();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    stop,
  } = useAudioPlayer();

  const hiddenOnOwner = location.pathname.startsWith("/owner");
  if (hiddenOnOwner) return null;
  if (!currentTrack) return null;

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safeCurrentTime =
    Number.isFinite(currentTime) && currentTime > 0 ? currentTime : 0;

  const progress = safeDuration
    ? Math.min(100, Math.max(0, (safeCurrentTime / safeDuration) * 100))
    : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-6xl px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="rounded-2xl border border-black/10 bg-white/95 backdrop-blur shadow-lg">
          <div className="flex items-center gap-3 px-3 py-3 sm:px-4">
            {/* Cover */}
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              {currentTrack.cover ? (
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            {/* Title */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-gray-500">
                {currentTrack.artist || "Unknown artist"}
              </p>
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={() => toggle(currentTrack)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-black"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5" aria-hidden />
              ) : (
                <PlayIcon className="h-5 w-5 pl-[1px]" aria-hidden />
              )}
            </button>

            <button
              type="button"
              onClick={stop}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close player"
            >
              <XMarkIcon className="h-5 w-5 text-gray-700" aria-hidden />
            </button>
          </div>

          {/* Progress */}
          <div className="px-3 pb-3 sm:px-4">
            <div className="flex items-center gap-3">
              <span className="w-10 text-[11px] tabular-nums text-gray-500">
                {formatTime(safeCurrentTime)}
              </span>

              <div className="relative flex-1">
                <div className="h-1.5 w-full rounded-full bg-gray-200" />
                <div
                  className="absolute left-0 top-0 h-1.5 rounded-full bg-gradient-to-r from-[#FFD43B] to-[#E6AF2E]"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={safeDuration || 0}
                  step="0.1"
                  value={safeCurrentTime}
                  onChange={(e) => seek(e.target.value)}
                  className="absolute inset-0 h-6 w-full cursor-pointer opacity-0"
                  aria-label="Seek"
                />
              </div>

              <span className="w-10 text-right text-[11px] tabular-nums text-gray-500">
                {formatTime(safeDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
