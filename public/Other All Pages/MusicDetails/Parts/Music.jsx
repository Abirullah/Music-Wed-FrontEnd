import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterMenu from "../../../Component/FilterMenu";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import Button from "../../../Component/Button";
import HeroImg from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { ShoppingCart } from "lucide-react";
import { useAudioPlayer } from "../../../../src/audio/AudioPlayerContext";
import { useCatalog } from "../../../../src/hooks/useCatalog";
import { useUserLibrary } from "../../../../src/hooks/useUserLibrary";

const columns = [
  { label: "Title", key: "title", subKey: "by", label2: "by", align: "left" },
  { label: "Genres", key: "genres" },
  { label: "Mood", key: "mood" },
  { label: "Artists", key: "artists" },
  { label: "", key: "actions" },
];

const buildFilterSections = (options = {}) => [
  { name: "Genre", key: "genre", options: options.genre || [] },
  { name: "Mood", key: "mood", options: options.mood || [] },
  { name: "Artists", key: "artist", options: options.artist || [] },
  { name: "Language", key: "language", options: options.language || [] },
];

function Music() {
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { currentTrack, isPlaying, toggle } = useAudioPlayer();

  const { items, filterOptions, selectedFilters, toggleFilter, search, setSearch, loading, error } =
    useCatalog({ type: "song" });

  const { isFavorite, toggleFavorite, isPurchased, currentUser } = useUserLibrary();

  const data = useMemo(
    () =>
      items.map((track) => ({
        ...track,
        by: track.artist,
        artists: track.artist,
        genres: track.genre,
        audioSrc: track.previewUrl,
      })),
    [items],
  );

  const filters = useMemo(() => buildFilterSections(filterOptions), [filterOptions]);

  const handleOpenPreview = (item) => {
    setSelectedItem(item);
    setOpenPreview(true);
  };

  const handleToggleFavorite = async (item) => {
    if (!currentUser?.id) {
      navigate("/user/login");
      return;
    }

    await toggleFavorite("song", item.id);
  };

  const renderCell = (key, item) => {
    if (key === "actions") {
      const favoriteActive = isFavorite("song", item.id);
      const purchased = isPurchased("song", item.id);

      return (
        <>
          <div
            className="flex items-center gap-3 md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Favourite"
              className="text-black hover:scale-105 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(item).catch(() => {});
              }}
            >
              <Heart active={favoriteActive} />
            </button>
            <button
              type="button"
              aria-label="Add to cart"
              className="text-gray-700 hover:text-black hover:scale-105 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/purchase/song/${item.id}`);
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          <div
            className="hidden md:flex gap-2 items-center justify-around"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={() => handleToggleFavorite(item).catch(() => {})}>
              <Heart active={favoriteActive} />
            </button>

            <Button
              text={purchased ? "Purchased" : "Purchase"}
              bg="bg-white px-6 py-1.5"
              textColor="text-yellow-600"
              textSize="text-lg font-bold"
              rounded="rounded-full border-1 border-yellow-500"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/purchase/song/${item.id}`);
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
              <span className="text-base font-semibold text-gray-900">Filters</span>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterMenu
              variant="sheet"
              showTitle={false}
              filters={filters}
              selectedFilters={selectedFilters}
              onToggleFilter={toggleFilter}
            />
          </div>
        </>
      )}

      {openPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="absolute inset-0" onClick={() => setOpenPreview(false)} />

          <div className="relative z-10 w-[700px] max-w-[90%] bg-black rounded-lg overflow-hidden">
            <button onClick={() => setOpenPreview(false)} className="absolute top-3 right-3 text-white text-xl">
              ✕
            </button>

            <div className="relative">
              <img
                src={selectedItem?.cover || HeroImg}
                alt="Preview"
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
              {selectedItem && (
                <div>
                  <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-gray-300">by {selectedItem.by}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="hidden md:block md:w-[22%] shadow-sm shadow-black">
          <FilterMenu
            filters={filters}
            selectedFilters={selectedFilters}
            onToggleFilter={toggleFilter}
          />
        </div>
        <div className="w-full md:w-[78%] shadow-sm shadow-black overflow-hidden md:pr-5">
          {loading ? <p className="p-4 text-sm text-gray-500">Loading music...</p> : null}
          {error ? <p className="p-4 text-sm text-red-500">{error}</p> : null}
          <ReusableList
            title="Music library"
            data={data}
            columns={columns}
            renderCell={renderCell}
            lastColumnType="custom"
            emptyMessage="No tracks yet"
            emptyDescription="Browse through our large section of royalty-free music"
            exploreButtonText="Explore More"
            onRowClick={handleOpenPreview}
            onMenuClick={() => setMobileFiltersOpen(true)}
            searchValue={search}
            onSearchChange={(event) => setSearch(event.target.value)}
            onSearchSubmit={(value) => setSearch(value)}
          />
        </div>
      </div>
    </>
  );
}

export default Music;
