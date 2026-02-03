import Button from "../../../Component/Button";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

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

export default function Faverouite() {
  const [favouriteActive, setFavouriteActive] = useState(() =>
    Array(data.length).fill(true),
  );

  const toggleFavourite = (index) => {
    setFavouriteActive((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const renderCell = (key, item, index) => {
    if (key === "actions") {
      const isActive = favouriteActive[index];
      return (
        <>
          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              className={`hover:scale-105 transition-transform ${
                isActive ? "text-black" : "text-gray-400"
              }`}
              aria-label="Favourite"
              onClick={() => toggleFavourite(index)}
            >
              <Heart active={isActive} />
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-black hover:scale-105 transition-transform"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex gap-2 items-center justify-around">
            <button
              type="button"
              aria-label="Favourite"
              className={`hover:scale-105 transition-transform ${
                isActive ? "text-black" : "text-gray-400"
              }`}
              onClick={() => toggleFavourite(index)}
            >
              <Heart active={isActive} />
            </button>
            <Button
              text="Purchase"
              bg="bg-white px-6 py-1.5"
              textColor="text-yellow-600"
              textSize="text-lg font-bold"
              rounded="rounded-full border-1 border-yellow-500"
            />
          </div>
        </>
      );
    }
    return item[key];
  };

  return (
    <ReusableList
      title="List of Favourite"
      data={data}
      columns={columns}
      renderCell={renderCell}
      lastColumnType="custom"
      emptyMessage="No Favourite yet"
      emptyDescription="Browse through our large section of royalty-free music"
      exploreButtonText="Explore More"
      onExploreClick={() => console.log("Explore More")}
    />
  );
}
    
