import MusicIcon from "../../assets/Icons/Vector.png"
import MusicPlayedIcon from "../../assets/Icons/Group.png"

function MusicCard({ image, title, subtitle, classes }) {
  return (
    <div
      className={`relative ${classes} rounded-2xl overflow-hidden  bg-cover group cursor-pointer`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5 text-white">
        {/* Top Icon */}

        <div className="self-start flex gap-2">
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
            <img src={MusicIcon} alt="" />
          </div>
          <p className="font-semibold">15 lorem </p>
        </div>

        {/* Bottom Text */}
        <div className="transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm opacity-90 mt-1">{subtitle}</p>
                  </div>
                  <div>
                      <img src={MusicPlayedIcon} alt="" />
                  </div>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
