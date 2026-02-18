import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { useCatalog } from "../../src/hooks/useCatalog";
import { useCatalogSuggestions } from "../../src/hooks/useCatalogSuggestions";
import { fetchArtistsCollection } from "../../src/api/catalog";

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
  const navigate = useNavigate();
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroSearch, setHeroSearch] = useState("");
  const [footerSearch, setFooterSearch] = useState("");
  const [homeTab, setHomeTab] = useState(0);
  const [artistItems, setArtistItems] = useState([]);
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

  useEffect(() => {
    let active = true;

    const loadArtists = async () => {
      try {
        const response = await fetchArtistsCollection();
        if (!active) return;
        setArtistItems(response.artists || []);
      } catch {
        if (!active) return;
        setArtistItems([]);
      }
    };

    loadArtists();

    return () => {
      active = false;
    };
  }, []);

  const activeHero = isMdUp ? HERO_SLIDES[0] : HERO_SLIDES[heroSlide];
  const { items: songItems } = useCatalog({ type: "song" });
  const { items: contentItems } = useCatalog({ type: "content" });
  const { suggestions: heroSuggestions, loading: heroSuggestionsLoading } =
    useCatalogSuggestions({
      query: heroSearch,
      limit: 7,
    });
  const { suggestions: footerSuggestions, loading: footerSuggestionsLoading } =
    useCatalogSuggestions({
      query: footerSearch,
      limit: 7,
    });

  const featuredTracks = useMemo(() => {
    if (homeTab === 1) {
      return contentItems.slice(0, 6).map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.artist,
        cover: item.cover,
        previewUrl: item.previewUrl,
        itemType: item.itemType,
      }));
    }

    if (homeTab === 2) {
      return artistItems.slice(0, 6).map((item) => ({
        id: item.name,
        title: item.name,
        subtitle: `${item.totalUploads || 0} uploads`,
        cover: HeroImg,
        previewUrl: "",
        itemType: "artist",
      }));
    }

    return songItems.slice(0, 6).map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.artist,
      cover: item.cover,
      previewUrl: item.previewUrl,
      itemType: item.itemType,
    }));
  }, [homeTab, songItems, contentItems, artistItems]);

  const goToMusicPage = (targetTab) => {
    localStorage.setItem("MusicPageTab", String(targetTab));
    navigate("/Music", { state: { targetTab } });
  };

  const navigateToLibraryPreview = (item) => {
    const rawType = String(item?.itemType || "").toLowerCase();
    const itemType = rawType === "content" ? "content" : "song";
    const targetTab = itemType === "song" ? 1 : 2;
    const previewItem = item?.id ? { id: String(item.id), itemType } : null;

    localStorage.setItem("MusicPageTab", String(targetTab));
    navigate("/Music", {
      state: previewItem ? { targetTab, previewItem } : { targetTab },
    });
  };
  const heroNavTrail = useMemo(
    () => [
      { left: "28%", delay: 0.0, duration: 6.2, size: 24, drift: -22, rise: 60, opacity: 0.82 },
      { left: "36%", delay: 1.1, duration: 6.8, size: 20, drift: 16, rise: 66, opacity: 0.74 },
      { left: "44%", delay: 0.6, duration: 6.5, size: 22, drift: -12, rise: 63, opacity: 0.78 },
      { left: "52%", delay: 1.9, duration: 7.1, size: 26, drift: 20, rise: 68, opacity: 0.72 },
      { left: "60%", delay: 1.4, duration: 6.6, size: 23, drift: -18, rise: 64, opacity: 0.76 },
      { left: "68%", delay: 2.2, duration: 7.3, size: 21, drift: 12, rise: 70, opacity: 0.68 },
    ],
    [],
  );

  return (
    <>
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
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[72vh] md:h-[88vh] overflow-hidden"
        >
          {heroNavTrail.map((note, index) => (
            <span
              key={`hero-note-${index}`}
              className="hero-nav-note"
              style={{
                left: note.left,
                fontSize: `${note.size}px`,
                animationDelay: `${note.delay}s`,
                animationDuration: `${note.duration}s`,
                "--hero-note-drift": `${note.drift}px`,
                "--hero-note-rise": `${note.rise}vh`,
                "--hero-note-opacity": String(note.opacity),
              }}
            >
              <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="currentColor">
                <path d="M15 3.5a1 1 0 0 0-1 1V13.6a3.75 3.75 0 1 0 1.5 3v-7.2l4.1-1.06A1 1 0 0 0 20.4 7V3.8a1 1 0 0 0-1.26-.97L15 3.92V3.5Zm-8.6 12.1a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Zm10.1-1.6V5.17l2.4-.61v2.12L16.5 7.3V14Z" />
              </svg>
            </span>
          ))}
        </div>

        <div
          className="md:min-h-[90vh] min-h-[60vh] bg-cover bg-center flex flex-col justify-center items-center px-4"
          style={{ backgroundImage: `url(${HeroImg})` }}
        >
          <div className="relative z-30 flex flex-col mt-15 md:mt-0 gap-2 mx-auto mb-20">
            <h1 className="text-white font-bold text-center text-3xl sm:text-3xl md:text-5xl">
              {activeHero.title}
            </h1>

            <p className="text-white/90 text-center mt-4 text-md sm:text-base md:text-lg lg:text-xl max-w-5xl">
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

            <div className="w-full max-w-3xl mt-6 self-center">
              <SearchBar
                classess="w-full h-19 rounded-full bg-white px-4"
                placeholder="Search"
                ButtonInfo="w-17 h-15 rounded-full"
                value={heroSearch}
                onChange={(event) => setHeroSearch(event.target.value)}
                onSubmit={() => goToMusicPage(0)}
                suggestions={heroSuggestions}
                suggestionsLoading={heroSuggestionsLoading}
                onSuggestionSelect={(item) => {
                  navigateToLibraryPreview(item);
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-16 px-4">
          <div className="grid grid-cols-2  gap-4 max-w-3xl mx-auto">
            <div className="relative bg-white rounded-xl shadow-lg p-5 md:flex gap-4 items-center">
              <img src={creatorIcon} className="w-10" alt="" />
              <div className="flex-1 pr-10 sm:pr-12 md:pr-14">
                <h3 className="font-semibold text-md">Music/Content Creator</h3>
                <p className=" hidden md:block text-lg text-gray-500 my-2">
                  Sell licenses of your music/content
                </p>
              </div>
              <span
                aria-hidden="true"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              >
                ›
              </span>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-5 md:flex gap-4 items-center">
              <img src={userIcon} className="w-10" alt="" />
              <div className="flex-1 pr-10 sm:pr-12 md:pr-14">
                <h3 className="font-semibold text-md">Music/Content User</h3>
                <p className=" hidden md:block text-gray-500 my-2">
                  Buy the music/content of your choice
                </p>
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

      <section className="mt-16 px-4">
        <SmallNavBar
          tabs={[
            { label: "Music", icon: MusicIcon },
            { label: "Content", icon: icon },
            { label: "Artist", icon: Artist },
          ]}
          CurrentPart={homeTab}
          setCurrentPaert={setHomeTab}
          storageKey="HomePageTab"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 max-w-6xl mx-auto">
          {featuredTracks.map((track, i) => (
            <div key={track.id} className={i >= 4 ? "hidden md:block" : ""}>
              <MusicCard
                image={track.cover}
                title={track.title}
                subtitle={track.subtitle}
                track={
                  track.previewUrl
                    ? {
                        id: track.id,
                        title: track.title,
                        artist: track.subtitle,
                        cover: track.cover,
                        audioSrc: track.previewUrl,
                      }
                    : undefined
                }
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
              onClick={() => goToMusicPage(homeTab === 0 ? 1 : homeTab === 1 ? 2 : 3)}
            />
          </Link>
        </div>
      </section>

      <CompanyAndOurContant />
      <PeopleSaysAboutUs />

      <Footer
        searchValue={footerSearch}
        onSearchChange={(event) => setFooterSearch(event.target.value)}
        onSearchSubmit={() => goToMusicPage(0)}
        searchSuggestions={footerSuggestions}
        searchSuggestionsLoading={footerSuggestionsLoading}
        onSearchSuggestionSelect={(item) => {
          navigateToLibraryPreview(item);
        }}
      />
    </>
  );
}
