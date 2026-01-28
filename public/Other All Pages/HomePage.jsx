import { useEffect, useState } from "react";


import HeroImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import NavImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6 - Copy.jpg";
import SearchBar from "../Component/SearchBar";
import NavBar from "../Component/NavBar";
import MusicCard from "../Component/MusicCard";
import Button from "../Component/Button";
import CompanyAndOurContant from "../Parts/CompanyAndOur contant";
import PeopleSaysAboutUs from "../Parts/PeopleSaysAboutUs"
import Footer from "../Component/Footer";
import SmallNavBar from "../Component/SmallNavBar";
import { Link } from "react-router-dom";
import {
  creatorIcon,
  userIcon,
  icon,
  MusicIcon,
  Artist,
} from "../../assets/Icons/IconExporter";

function HomePage() {
   const [HeroScrolled, setHeroScrolled] = useState(false);

  function changeStatus() {
    localStorage.setItem("CurrentPage", 0);
  }

  useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 700) {
      setHeroScrolled(true);
    } else {
      setHeroScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []); 




  return (
    <>
      {/* herosection */}
      <div className="relative flex  flex-col justify-center items-center">
        <NavBar
  classes={`fixed top-0 z-50 transition-all duration-500 text-white w-full
    ${HeroScrolled
      ? "bg-gradient-to-r from-[#FFD43B] via-[#FFA94D] via-[#FF6B6B] to-[#C2255C]"
      : "bg-transparent"
    }
  `}
  bgImg={HeroScrolled ? NavImg : null}
  buttonclass="text-white bg-black/30 hover:bg-black/50"
/>

        <div
          className="w-full h-200 bg-cover bg-center flex flex-col justify-center items-center"
          style={{ backgroundImage: `url(${HeroImg})` }}
        >
          <div className="flex flex-col w-full h-[30%] bg-black/10 justify-center items-center">
            <h1 className="text-5xl text-white font-bold w-[70%] mb-3 text-center">
              Enjoy Your Creative Freedom With Echo Tune
            </h1>
            <p className="text-lg text-center font-semibold w-[60%] p-6 text-white max-w-[60%] mb-5 px-10">
              Unlock your creativity without the fear of copyright infringement.
              Buy licences for music and content, or monetise your original
              creations by selling their licences with us.
            </p>
          </div>
          <div className="w-60%">
            <SearchBar
              classess={"w-200 rounded-full bg-white/90 px-5  h-18"}
              placeholder="Search by code"
            />
          </div>
        </div>
        <div className="absolute top-[92%] h-auto w-[50%] flex justify-center items-center gap-10">
          <div className="w-[45%] hover:scale-101 shadow-lg shadow-black/50 h-35 bg-white rounded-xl text-black  flex justify-center items-center gap-7 p-5 ">
            <img src={creatorIcon} alt="" />
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-xl font-bold "> Creator - Music/ Content</h2>
              <p className="text-gray-600">
                Sell the licence of your music/ content
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="w-[45%] hover:scale-101 shadow-lg shadow-black/50 h-35 bg-white rounded-xl text-black  flex justify-center items-center gap-7 p-5  ">
            <img src={userIcon} alt="" />

            <div className="w-[80%] flex flex-col gap-3">
              <h2 className="text-xl font-bold "> User - Music/ Content</h2>
              <p className="text-gray-600">
                Sell the licence of your music/ content
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* music section */}
      <div className="h-screen  w-full flex flex-col justify-center gap-y-15 ">
        <div className="w-[70%] mx-auto">
          <SmallNavBar
            tabs={[
              { label: "Music", icon: MusicIcon },
              { label: "Contant", icon: icon },
              { label: "Artist", icon: Artist },
            ]}
          />
        </div>
        {/* Music divs */}
        <div className="grid grid-cols-3  self-center w-[70%] gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <MusicCard
              key={i}
              image={HeroImg}
              title="Lorem Ipsum Dolor"
              subtitle="Top Album"
              classes="h-55 w-[95%] rounded-xl"
            />
          ))}
        </div>
        <div className="relative">
          <Link to="/Music">
            <Button
              text="View All"
              bg="bg-yellow-600 px-20 py-4 absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2"
              textColor="text-black"
              textSize="text-lg font-bold"
              onClick={changeStatus()}
            />
          </Link>
        </div>
      </div>

      {/* Company & our contant */}
      <CompanyAndOurContant />

      {/* People rewiews Cards */}
      <PeopleSaysAboutUs />

      {/* Footer  */}

      <Footer />
    </>
  );
}

export default HomePage;
