import { useState } from "react";

import FilterMenu from "../../../Component/FilterMenu";
import MusicCard from "../../../Component/MusicCard";
import HeroImg from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import SearchBar from "../../../Component/SearchBar";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import Button from "../../../Component/Button";
import { ShoppingCart } from "lucide-react";
import { mockArtists, mockTracks } from "../../../../src/mock/catalog";
import { useAudioPlayer } from "../../../../src/audio/AudioPlayerContext";

const tracksData = mockTracks.map((track) => ({
  ...track,
  by: track.artist,
  artists: track.artist,
}));

const columns = [
  { label: "Title", key: "title", subKey: "by", label2: "by", align: "left" },
  { label: "Genres", key: "genres" },
  { label: "Mood", key: "mood" },
  { label: "Artists", key: "artists" },
  { label: "", key: "actions" },
];

function Arstist() {
  const [openDetailsPage, setopenDetailsPage] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(() => mockArtists[0] ?? null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { currentTrack, isPlaying, toggle } = useAudioPlayer();

  const tableData = (() => {
    if (!selectedArtist?.name) return tracksData;
    const filtered = tracksData.filter((t) => t.artist === selectedArtist.name);
    return filtered.length ? filtered : tracksData;
  })();

  const handleOpenPreview = (item) => {
    setSelectedItem(item);
    setOpenPreview(true);
  };

  const renderCell = (key, item) => {
    if (key === "actions") {
      return (
        <>
          {/* Mobile actions */}
          <div
            className="flex items-center gap-3 md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Favourite"
              className="text-black hover:scale-105 transition-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart active />
            </button>
            <button
              type="button"
              aria-label="Add to cart"
              className="text-gray-700 hover:text-black hover:scale-105 transition-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop actions */}
          <div
            className="hidden md:flex gap-2 items-center justify-around"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart active />

            <Button
              text="Purchase"
              bg="bg-white px-6 py-1.5"
              textColor="text-yellow-600"
              textSize="text-lg font-bold"
              rounded="rounded-full border-1 border-yellow-500"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Purchase clicked");
              }}
            />
          </div>
        </>
      );
    }

    return item[key];
  };

  return (
    <>
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 h-[70vh] bg-white rounded-t-3xl shadow-2xl overflow-hidden md:hidden">
            <div className="relative flex items-center justify-center px-5 py-4 border-b border-black/10">
              <span className="text-base font-semibold text-gray-900">
                Filters
              </span>
              <button
                type="button"
                aria-label="Close filters"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-black/5 transition-colors"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <FilterMenu variant="sheet" showTitle={false} />
          </div>
        </>
      )}

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="hidden md:block md:w-[22%]">
          <FilterMenu />
        </div>

        <div className="w-full md:w-[78%]">
          {openDetailsPage ? (
            <div>
              {openPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                  <div
                    className="absolute inset-0"
                    onClick={() => setOpenPreview(false)}
                  />

                  <div className="relative z-10 w-[700px] max-w-[90%] bg-black rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenPreview(false)}
                      className="absolute top-3 right-3 text-white text-xl"
                    >
                      ✕
                    </button>

                    <div className="relative">
	                      <img
	                        src={selectedItem?.cover || HeroImg}
	                        alt="Video Preview"
	                        className="w-full object-cover"
	                      />
	
	                      <button
	                        type="button"
	                        className="absolute inset-0 flex items-center justify-center"
	                        onClick={() => {
	                          if (selectedItem?.audioSrc) toggle(selectedItem);
	                        }}
	                      >
	                        <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
	                          {selectedItem?.audioSrc &&
	                          currentTrack?.audioSrc === selectedItem.audioSrc &&
	                          isPlaying
	                            ? "❚❚"
	                            : "▶"}
	                        </div>
	                      </button>
	                    </div>

                    <div className="p-4 text-white">
                      <div className="flex justify-between text-sm mb-2">
                        <span>0:12</span>
                        <span>3:45</span>
                      </div>

                      <div className="w-full h-1 bg-gray-600 rounded">
                        <div className="w-1/3 h-1 bg-yellow-500 rounded" />
                      </div>

                      {selectedItem && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold">
                            {selectedItem.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            by {selectedItem.by}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                  )}
              <div className="w-full relative shadow-sm shadow-black overflow-hidden px-5 py-5">
                <button
                  className="flex absolute cursor-pointer z-3 top-9 items-center cursor gap-5 left-1 text-xl  hover:opacity-80"
                  onClick={() => setopenDetailsPage(false)}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="black"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

		                <ReusableList
		                  title={selectedArtist?.name || "Tracks"}
		                  data={tableData}
		                  columns={columns}
		                  renderCell={renderCell}
		                  lastColumnType="custom"
		                  emptyMessage="No tracks yet"
		                  emptyDescription="Browse through our curated music library"
		                  exploreButtonText="Explore More"
		                  onRowClick={handleOpenPreview}
		                  onMenuClick={() => setMobileFiltersOpen(true)}
		                />
	              </div>
	            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-left">
                  Explore
                </h2>

                <div className="hidden md:block">
                  <SearchBar
                    classess="w-[28rem] lg:w-[32rem] rounded-full border border-gray-300 shadow-sm bg-white/80 h-12"
                    placeholder="Search"
                    ButtonInfo="w-14 h-full"
                  />
                </div>

                <div className="md:hidden flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Open filters"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    aria-label={
                      mobileSearchOpen ? "Close search" : "Open search"
                    }
                    onClick={() => setMobileSearchOpen((v) => !v)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors"
                  >
                    {mobileSearchOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {mobileSearchOpen && (
                <div className="md:hidden mb-4">
                  <SearchBar
                    classess="w-full rounded-full border border-gray-300 shadow-sm bg-white/80 h-11"
                    placeholder="Search"
                    ButtonInfo="w-12 h-full"
                  />
                </div>
              )}

	              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 mx-auto w-full md:w-[90%]">
	                {Array.from({ length: 12 }).map((_, i) => {
	                  const artist = mockArtists[i % mockArtists.length];
	                  return (
	                  <div
	                    key={`${artist.id}-${i}`}
	                    onClick={() => {
	                      setSelectedArtist(artist);
	                      setopenDetailsPage(true);
	                    }}
	                  >
	                    <MusicCard
	                      image={artist.avatar}
	                      title={artist.name}
	                      subtitle={`${artist.followers.toLocaleString()} followers`}
	                      classes="h-32 sm:h-40 md:h-48 lg:h-52 w-full rounded-xl"
	                    />
	                  </div>
	                );
	                })}
	              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Arstist;
