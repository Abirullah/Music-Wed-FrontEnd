import MusicIcon from "../../assets/Icons/Vector.png";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useAudioPlayer } from "../../src/audio/AudioPlayerContext";

function MusicCard({ image, title, subtitle, classes = "", track, audioSrc }) {
  const { currentTrack, isPlaying, toggle } = useAudioPlayer();
  const playableTrack =
    track?.audioSrc || audioSrc
      ? {
          id: track?.id || title,
          title: track?.title || title,
          artist: track?.artist || subtitle,
          cover: track?.cover || image,
          audioSrc: track?.audioSrc || audioSrc,
        }
      : null;

  const isCurrent =
    playableTrack?.audioSrc &&
    currentTrack?.audioSrc === playableTrack.audioSrc;
  const showPause = Boolean(isCurrent && isPlaying);

  return (
    <div
      className={`relative ${classes} rounded-xl sm:rounded-2xl overflow-hidden bg-cover bg-center group cursor-pointer`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 md:p-5 text-white">
        
        {/* Top Info */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full">
            <img
              src={MusicIcon}
              alt="music"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
            />
          </div>
          <p className="text-xs sm:text-sm md:text-base font-medium sm:font-semibold">
            15 lorem
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <div>
            <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold sm:font-bold">
              {title}
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm opacity-90 mt-0.5 sm:mt-1">
              {subtitle}
            </p>
          </div>

          {/* Play button */}
          {playableTrack ? (
            <button
              type="button"
              aria-label={showPause ? "Pause" : "Play"}
              onClick={(e) => {
                e.stopPropagation();
                toggle(playableTrack);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-opacity duration-300 md:h-11 md:w-11 md:opacity-0 md:group-hover:opacity-100"
            >
              {showPause ? (
                <PauseIcon className="h-5 w-5" aria-hidden />
              ) : (
                <PlayIcon className="h-5 w-5 pl-[1px]" aria-hidden />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
