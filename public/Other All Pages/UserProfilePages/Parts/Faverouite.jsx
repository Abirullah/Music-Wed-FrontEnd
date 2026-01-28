import Button from "../../../Component/Button";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";

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
  const renderCell = (key, item) => {
    if (key === "actions") {
      return (
        <div className="flex gap-2 items-center justify-around">
          <Heart active={true} />
          <Button
            text="Purchase"
            bg="bg-white px-6 py-1.5"
            textColor="text-yellow-600"
            textSize="text-lg font-bold"
            rounded="rounded-full border-1 border-yellow-500"
          />
        </div>
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
    
