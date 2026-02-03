import MusicIcon from "../../assets/Icons/Vector.png";
import MusicPlayedIcon from "../../assets/Icons/Group.png";

function MusicCard({ image, title, subtitle, classes = "" }) {
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

          {/* Play Icon (hidden on sm & below) */}
          <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              src={MusicPlayedIcon}
              alt="play"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
