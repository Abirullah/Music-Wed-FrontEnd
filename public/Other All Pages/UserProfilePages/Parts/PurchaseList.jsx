import ReusableList from "../../../Component/ReusableList";
import { Link } from "react-router-dom";

const data = Array(10).fill({
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
  { label: "Link", key: "link" },
];

export default function PurchaseList() {
  const renderCell = (key, item, index) => {
    if (key === "link") {
      return (
        <Link
          to={`/song/${index}`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors md:w-auto md:h-auto md:rounded-none md:hover:bg-transparent"
        >
          <span className="md:hidden text-2xl text-gray-700">›</span>
          <span className="hidden md:inline text-blue-600 hover:text-blue-800 underline cursor-pointer">
            loream
          </span>
        </Link>
      );
    }
    return item[key];
  };

  return (
    <ReusableList
      title="List of Purchases"
      data={data}
      columns={columns}
      renderCell={renderCell}
      lastColumnType="link"
      emptyMessage="No purchases yet"
      emptyDescription="Browse through our large section of royalty-free music"
      exploreButtonText="Explore More"
      onExploreClick={() => console.log("Explore More")}
    />
  );
}
