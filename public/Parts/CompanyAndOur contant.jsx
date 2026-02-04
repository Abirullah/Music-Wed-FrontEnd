import React from "react";
import SidePic from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";

import  {amazonMusic,  FeaturesIcon, appleIcon,  spotifyIcon, youtubeIcon ,jioSaavnIcon ,wynkmMusicIcon} from "../../assets/Icons/IconExporter"

function CompanyAndOurContant() {
  const features = [
    {
      title: "Feature 1",
      desc: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores mollitia distinctio cupiditate voluptates.",
    },
    {
      title: "Feature 1",
      desc: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores mollitia distinctio cupiditate voluptates.",
    },
    {
      title: "Feature 1",
      desc: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores mollitia distinctio cupiditate voluptates.",
    },
    {
      title: "Feature 1",
      desc: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores mollitia distinctio cupiditate voluptates.",
    },
    {
      title: "Feature 1",
      desc: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores mollitia distinctio cupiditate voluptates.",
    },
    ];
    
    const Icons = [
      amazonMusic,
      appleIcon,
      spotifyIcon,
      youtubeIcon,
      jioSaavnIcon,
      wynkmMusicIcon,
    ];

  return (
    <>
      {/* companies */}
      <div className="w-full min-h-[20vh] top-20 py-20 flex justify-center item-center">
        <div className="md:w-[80%] w-[90%]  flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex items-center">
            <h2 className="text-2xl text-center text-bold w-full md:text-3xl lg:text-4xl font-extrabold leading-tight">
              Trusted by world best companies and creative professional
            </h2>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-1">
            {Icons.map((item) => (
              <div
                key={item}
                className="w-full h-20 md:h-24 lg:h-25  overflow-hidden bg-gray-200"
              >
                <img
                  src={item}
                  alt="product"
                  className="w-full h-full object-cover p-2  scale-95 hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mb-15 flex justify-center items-center px-4 sm:px-6">
  <div className="w-full max-w-[1500px] bg-black text-white rounded-2xl lg:rounded-3xl px-6 sm:px-8 md:px-12 py-8 md:py-10 flex flex-col gap-10">

    {/* TOP SECTION */}
    <div className="flex flex-col items-center text-center gap-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl">
        Manage All Your Music & Content At One Place
      </h2>
      <p className="text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores
        mollitia distinctio cupiditate voluptates.
      </p>
    </div>

    {/* BOTTOM SECTION */}
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

      {/* LEFT SIDE (FEATURES) */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              group cursor-pointer
              border-l-2 border-transparent
              pl-4
              hover:border-yellow-400
              transition-all duration-300
            "
          >
            {/* Heading */}
            <div className="flex gap-2 items-center">
              <img src={FeaturesIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                {item.title}
              </h3>
            </div>

            {/* Description (hidden on sm, hover only) */}
            <div
              className="
                text-sm text-gray-400 max-w-[90%]
                overflow-hidden
                max-h-0
                group-hover:max-h-40
                transition-all duration-300
                mt-2
              "
            >
              <p>{item.desc}</p>

              <a
                href="#"
                className="inline-block text-yellow-400 mt-3"
              >
                Get Start
              </a>
            </div>

            {/* IMAGE FOR SM ONLY (shows on hover) */}
            <div
              className="
                mt-4
                overflow-hidden
                max-h-0
                group-hover:max-h-[300px]
                transition-all duration-300
                lg:hidden
              "
            >
              <img
                src={SidePic}
                alt="feature"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE IMAGE (md & lg only) */}
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <img
          src={SidePic}
          alt="feature"
          className="w-full max-w-md object-cover rounded-2xl shadow-lg"
        />
      </div>

    </div>
  </div>
</div>

    </>
  );
}

export default CompanyAndOurContant;
