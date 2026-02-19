import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Component/Button";
import ReusableList from "../../../Component/ReusableList";
import { Heart } from "../../../../assets/Icons/IconExporter";
import { ShoppingCart } from "lucide-react";
import { fetchFavorites, removeFavorite } from "../../../../src/api/userLibrary";
import { getCurrentUser } from "../../../../src/utils/session";

const columns = [
  { label: "Title", key: "title", subKey: "by", label2: "by", align: "left", width: "2.2fr" },
  { label: "Genres", key: "genres", width: "1fr" },
  { label: "Mood", key: "mood", width: "1fr" },
  { label: "Artists", key: "artists", width: "1fr" },
  { label: "", key: "actions", width: "1.3fr" },
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
            audioSrc: item.previewUrl || "",
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-black"
              aria-label="Favourite"
              onClick={() => removeFromFavorites(item.itemType, item.id)}
            >
              <Heart active />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-700 hover:text-black hover:bg-slate-100 transition-colors"
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-black hover:bg-slate-100 transition-colors"
              onClick={() => removeFromFavorites(item.itemType, item.id)}
            >
              <Heart active />
            </button>
            <Button
              text="Purchase"
              bg="bg-amber-50 px-6 py-2 border border-amber-300"
              textColor="text-amber-700"
              textSize="text-sm font-semibold"
              rounded="rounded-full"
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
      variant="profile"
      lastColumnType="custom"
      emptyMessage={loading ? "Loading favourites..." : error || "No Favourite yet"}
      emptyDescription="Browse through our large section of royalty-free music"
      exploreButtonText="Explore More"
      onExploreClick={() => navigate("/Music")}
    />
  );
}
