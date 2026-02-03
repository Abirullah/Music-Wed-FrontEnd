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

import {
  creatorIcon,
  userIcon,
  icon,
  MusicIcon,
  Artist,
} from "../../assets/Icons/IconExporter";

export default function HomePage() {
  const [heroScrolled, setHeroScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeroScrolled(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeStatus = () => {
    localStorage.setItem("CurrentPage", 0);
  };

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
              max-w-4xl
            "
          >
            Lorem ipsum dolor sit amet consectetur
          </h1>



          <p
            className="
              text-white/90 text-center mt-4
              text-md sm:text-base
              max-w-xl
            "
          >
            Integer auctor cum urna malesuada. Venenatis magna sed tempor
            feugiat varius. Et tempus posuere consequat nulla convallis
          </p>

          <div className="flex gap-2 mt-4 justify-center items-center">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="w-2 h-2 bg-white/40 rounded-full" />
            <span className="w-2 h-2 bg-white/40 rounded-full" />
          </div>

          {/* search */}
          <div className="w-full max-w-md mt-6">
            <SearchBar
              classess="w-full h-15 rounded-full bg-white px-4"
              placeholder="Search"
              ButtonInfo="w-14 h-12"

            />
          </div>

          </div>
         
          
        </div>

        {/* ================= CREATOR / USER ================= */}
        <div className="relative z-10 -mt-16 px-4">
          <div className="grid grid-cols-2  gap-4 max-w-3xl mx-auto">
            {/* Creator */}
            <div className="bg-white rounded-xl shadow-lg p-5 md:flex gap-4 items-center">
              <img src={creatorIcon} className="w-10" alt="" />
              <div className="flex-1">
                <h3 className="font-semibold text-md">
                  Music/Content Creator
                  <span className="ml-3 text-lg">›</span>
                </h3>
              </div>
              
            </div>

            {/* User */}
            <div className="bg-white rounded-xl shadow-lg p-5 md:flex gap-4 items-center">
              <img src={userIcon} className="w-10" alt="" />
              <div className="flex-1">
                <h3 className="font-semibold text-md">
                  Music/Content User
                  <span className="ml-3 text-xl">›</span>
                </h3>
                
              </div>
              
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
  {Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className={i >= 4 ? "hidden md:block" : ""}
    >
      <MusicCard
        image={HeroImg}
        title="Lorem Ipsum Dolor"
        subtitle="Top Album"
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
