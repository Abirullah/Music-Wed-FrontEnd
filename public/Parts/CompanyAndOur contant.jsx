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
        <div className="w-[80%] max-w-8xl flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex items-center">
            <h2 className="text-2xl text-bold w-full md:text-3xl lg:text-4xl font-bold leading-tight">
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

      <div className="w-full h-[75vh] flex justify-center items-center">
        <div className="w-[80%] max-w-8xl h-full bg-black text-white rounded-3xl px-12 py-10 flex flex-col gap-10">
          {/* TOP SECTION */}
          <div className="h-[20%] flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-[90%]">
              Manage All Your Music & Content At One Place
            </h2>
            <p className="text-gray-400 max-w-[80%] text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
              dolores mollitia distinctio cupiditate voluptates. Eligendi
              aspernatur reiciendis earum nam provident!
            </p>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex-1 flex flex-col lg:flex-row gap-16 items-center">
            {/* LEFT SIDE */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer border-l-2 border-transparent pl-4 hover:border-yellow-400 transition-all duration-300"
                >
                  <div className="flex gap-2">
                    <img src={FeaturesIcon} alt="" />
                    <h3 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className="
                            text-sm text-gray-400 max-w-[80%]
                            max-h-0 overflow-hidden
                            group-hover:max-h-20
                            transition-all duration-300
                            mt-1
                            flex flex-col justify-center
                            "
                  >
                    {item.desc}
                    <br />
                    <a href="" className="text-yellow-400 mx-auto mt-3">
                      Get Start{" "}
                    </a>
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:w-1/2 flex justify-center">
              <img
                src={SidePic}
                alt="feature"
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyAndOurContant;
