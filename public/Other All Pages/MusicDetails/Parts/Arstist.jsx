import { useState } from "react";

import FilterMenu from "../../../Component/FilterMenu";
import MusicCard from "../../../Component/MusicCard";
import HeroImg from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import SearchBar from "../../../Component/SearchBar";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import Button from "../../../Component/Button";

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

function Arstist() {
  const [openDetailsPage, setopenDetailsPage] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenPreview = (item) => {
    setSelectedItem(item);
    setOpenPreview(true);
  };

  const renderCell = (key, item) => {
    if (key === "actions") {
      return (
        <div
          className="flex gap-2 items-center justify-around"
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
      );
    }

    return item[key];
  };

  return (
    <>
      <div className="flex gap-15">
        <div className="w-[22%]">
          <FilterMenu />
        </div>

        <div className="w-[78%]">
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
                  title="Loram"
                  data={data}
                  columns={columns}
                  renderCell={renderCell}
                  lastColumnType="custom"
                  emptyMessage="No Contant yet"
                  emptyDescription="Browse through our large section of royalty-free music"
                  exploreButtonText="Explore More"
                  onRowClick={handleOpenPreview}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Explore</h2>
                <SearchBar
                  classess={
                    "w-110 rounded-full border-1 border-gray-500 shadow-sm bg-white/80  h-12"
                  }
                  ButtonInfo="w-[12%] h-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-10 mx-auto w-[90%]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div onClick={() => setopenDetailsPage(true)}>
                    <MusicCard
                      key={i}
                      image={HeroImg}
                      title="Lorem Ipsum Dolor"
                      subtitle="Top Album"
                      classes="h-45 w-[90%] rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Arstist;
