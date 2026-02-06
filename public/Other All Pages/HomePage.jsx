import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeroImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import NavImg from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6 - Copy.jpg";

import NavBar from "../Component/NavBar";
import SearchBar from "../Component/SearchBar";
import MusicCard from "../Component/MusicCard";
import Button from "../Component/Button";
import SmallNavBar from "../Component/SmallNavBar";
import CompanyAndOurContant from "../Parts/CompanyAndOur contant";
import PeopleSaysAboutUs from "../Parts/PeopleSaysAboutUs";
import Footer from "../Component/Footer";
import { mockTracks } from "../../src/mock/catalog";

import {
  creatorIcon,
  userIcon,
  icon,
  MusicIcon,
  Artist,
} from "../../assets/Icons/IconExporter";

const HERO_SLIDES = [
  {
    title: "Lorem ipsum dolor sit amet consectetur",
    description:
      "Integer auctor cum urna malesuada. Venenatis magna sed tempor feugiat varius. Et tempus posuere consequat nulla convallis",
  },
  {
    title: "Venenatis magna sed tempor feugiat",
    description:
      "Feugiat varius. Et tempus posuere consequat nulla convallis. Integer auctor cum urna malesuada",
  },
  {
    title: "Et tempus posuere consequat nulla",
    description:
      "Convallis integer auctor cum urna malesuada. Venenatis magna sed tempor feugiat varius",
  },
];

export default function HomePage() {
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [isMdUp, setIsMdUp] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const onScroll = () => setHeroScrolled(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setIsMdUp(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMdUp) return;

    const intervalId = window.setInterval(() => {
      setHeroSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isMdUp]);

  const changeStatus = () => {
    localStorage.setItem("CurrentPage", 0);
  };

  const activeHero = isMdUp ? HERO_SLIDES[0] : HERO_SLIDES[heroSlide];

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="relative">
        <NavBar
          classes={`fixed top-0 z-50 w-full transition-all duration-500
            ${
              heroScrolled
                ? "bg-gradient-to-r from-[#FFD43B] via-[#FFA94D] via-[#FF6B6B] to-[#C2255C]"
                : "bg-transparent"
            }`}
          bgImg={heroScrolled ? NavImg : null}
          buttonclass="text-white bg-black/30 hover:bg-black/50"
        />

        <div
          className="md:min-h-[90vh] min-h-[60vh] bg-cover bg-center flex flex-col justify-center items-center px-4"
          style={{ backgroundImage: `url(${HeroImg})` }}
        >
          <div className="flex flex-col gap-2 mx-auto mb-20">
             <h1
            className="
              text-white font-bold text-center
              text-3xl sm:text-3xl md:text-5xl
              
            "
	          >
	            {activeHero.title}
	          </h1>



          <p
            className="
              text-white/90 text-center mt-4
              text-md sm:text-base
              md:text-lg lg:text-xl
              max-w-5xl
            "
	          >
	            {activeHero.description}
	          </p>

	          <div className="flex gap-2 mt-4 justify-center items-center md:hidden">
	            {HERO_SLIDES.map((_, i) => (
	              <button
	                key={i}
	                type="button"
	                aria-label={`Hero slide ${i + 1}`}
	                onClick={() => setHeroSlide(i)}
	                className={`h-2 rounded-full transition-all duration-300 ${
	                  i === heroSlide
	                    ? "bg-yellow-400 w-4 sm:w-5"
	                    : "bg-white/40 w-2"
	                }`}
	              />
	            ))}
	          </div>

          {/* search */}
          <div className="w-full max-w-3xl mt-6 self-center">
            <SearchBar
              classess="w-full h-19 rounded-full bg-white px-4"
              placeholder="Search"
              ButtonInfo="w-17 h-15 rounded-full"

            />
          </div>

          </div>
         
          
        </div>

        {/* ================= CREATOR / USER ================= */}
        <div className="relative z-10 -mt-16 px-4">
          <div className="grid grid-cols-2  gap-4 max-w-3xl mx-auto">
            {/* Creator */}
            <div className="relative bg-white rounded-xl shadow-lg p-5 md:flex gap-4 items-center">
              <img src={creatorIcon} className="w-10" alt="" />
              <div className="flex-1 pr-10 sm:pr-12 md:pr-14">
                <h3 className="font-semibold text-md">
                  Music/Content Creator
                </h3>
                <p className=" hidden md:block text-lg text-gray-500 my-2">Sell licenses of your music/content</p>
              </div>
              <span
                aria-hidden="true"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              >
                ›
              </span>
              
            </div>

            {/* User */}
            <div className="relative bg-white rounded-xl shadow-lg p-5 md:flex gap-4 items-center">
              <img src={userIcon} className="w-10" alt="" />
              <div className="flex-1 pr-10 sm:pr-12 md:pr-14">
                <h3 className="font-semibold text-md">
                  Music/Content User
                </h3>
                <p className=" hidden md:block text-gray-500 my-2">Buy the music/content of your choice</p>
                
              </div>
              <span
                aria-hidden="true"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              >
                ›
              </span>
              
            </div>
          </div>
        </div>
      </div>

      {/* ================= MUSIC SECTION ================= */}
      <section className="mt-16 px-4">
        <SmallNavBar
          tabs={[
            { label: "Music", icon: MusicIcon },
            { label: "Content", icon: icon },
            { label: "Artist", icon: Artist },
          ]}
        />

       <div
  className="
    grid grid-cols-2 md:grid-cols-3
    gap-4 mt-10
    max-w-6xl mx-auto
  "
	>
	  {mockTracks.slice(0, 6).map((track, i) => (
	    <div
	      key={track.id}
	      className={i >= 4 ? "hidden md:block" : ""}
	    >
	      <MusicCard
	        image={track.cover}
	        title={track.title}
	        subtitle={track.artist}
	        track={track}
	        classes="h-44 sm:h-52 rounded-xl"
	      />
	    </div>
	  ))}
	</div>


        <div className="flex justify-center mt-6">
          <Link to="/Music">
            <Button
              text="View All"
              bg="bg-yellow-500/80 px-25 py-5 rounded-full"
              textColor="text-black"
              textSize="font-semibold"
              onClick={changeStatus}
            />
          </Link>
        </div>
      </section>

      {/* ================= COMPANY ================= */}
      <CompanyAndOurContant />

     

      {/* ================= REVIEWS ================= */}
      <PeopleSaysAboutUs />

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}
