import { useState } from "react";

import FilterMenu from "../../../Component/FilterMenu";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import Button from "../../../Component/Button";
import HeroImg from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg"
import { ShoppingCart } from "lucide-react";

const data = Array(18).fill({
  title: "Lorem ipsum dolor sit",
  by: "Lorem",
  genres: "Lorem ipsum do",
  mood: "Lorem ipsum do",
  artists: "Lorem ipsum do",
});

const columns = [
  { label: "Title", key: "title", subKey: "by", label2: "by", align: "left" },
  { label: "Genres", key: "genres" },
  { label: "Mood", key: "mood" },
  { label: "Artists", key: "artists" },
  { label: "", key: "actions" },
];

function Music() {
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
                src={HeroImg}
                alt="Video Preview"
                className="w-full object-cover"
              />

              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
                  ▶
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
                  <p className="text-sm text-gray-300">by {selectedItem.by}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="hidden md:block md:w-[22%] shadow-sm shadow-black">
          <FilterMenu />
        </div>
        <div className="w-full md:w-[78%] shadow-sm shadow-black overflow-hidden md:pr-5">
          <ReusableList
            title="List of Favourite"
            data={data}
            columns={columns}
            renderCell={renderCell}
            lastColumnType="custom"
            emptyMessage="No Favourite yet"
            emptyDescription="Browse through our large section of royalty-free music"
            exploreButtonText="Explore More"
            onRowClick={handleOpenPreview}
            onMenuClick={() => setMobileFiltersOpen(true)}
          />
        </div>
      </div>
    </>
  );
}

export default Music;
