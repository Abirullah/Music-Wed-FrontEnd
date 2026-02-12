import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Component/Button";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import { ShoppingCart } from "lucide-react";
import { fetchFavorites, removeFavorite } from "../../../../src/api/userLibrary";
import { getCurrentUser } from "../../../../src/utils/session";

const columns = [
  { label: "Title", key: "title", subKey: "by", label2: "by", align: "left" },
  { label: "Genres", key: "genres" },
  { label: "Mood", key: "mood" },
  { label: "Artists", key: "artists" },
  { label: "", key: "actions" },
];

export default function Faverouite() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      if (!currentUser?.id) {
        setRows([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetchFavorites(currentUser.id);
        setRows(
          (response.items || []).map((item) => ({
            id: item.id,
            itemType: item.itemType,
            title: item.title,
            by: item.artist,
            genres: item.genre,
            mood: item.mood,
            artists: item.artist,
          })),
        );
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [currentUser?.id]);

  const removeFromFavorites = async (itemType, itemId) => {
    if (!currentUser?.id) {
      navigate("/user/login");
      return;
    }

    try {
      setError("");
      await removeFavorite(currentUser.id, { itemType, itemId });
      setRows((prev) =>
        prev.filter((item) => !(item.id === itemId && item.itemType === itemType)),
      );
    } catch (err) {
      setError(err.message || "Failed to update favourites");
    }
  };

  const renderCell = (key, item) => {
    if (key === "actions") {
      return (
        <>
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              className="hover:scale-105 transition-transform text-black"
              aria-label="Favourite"
              onClick={() => removeFromFavorites(item.itemType, item.id)}
            >
              <Heart active />
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-black hover:scale-105 transition-transform"
              aria-label="Add to cart"
              onClick={() => navigate(`/purchase/${item.itemType}/${item.id}`)}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:flex gap-2 items-center justify-around">
            <button
              type="button"
              aria-label="Favourite"
              className="hover:scale-105 transition-transform text-black"
              onClick={() => removeFromFavorites(item.itemType, item.id)}
            >
              <Heart active />
            </button>
            <Button
              text="Purchase"
              bg="bg-white px-6 py-1.5"
              textColor="text-yellow-600"
              textSize="text-lg font-bold"
              rounded="rounded-full border-1 border-yellow-500"
              onClick={() => navigate(`/purchase/${item.itemType}/${item.id}`)}
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
      data={loading ? [] : rows}
      columns={columns}
      renderCell={renderCell}
      lastColumnType="custom"
      emptyMessage={loading ? "Loading favourites..." : error || "No Favourite yet"}
      emptyDescription="Browse through our large section of royalty-free music"
      exploreButtonText="Explore More"
      onExploreClick={() => navigate("/Music")}
    />
  );
}
