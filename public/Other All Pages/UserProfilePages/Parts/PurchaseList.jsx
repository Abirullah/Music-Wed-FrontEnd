import { useEffect, useMemo, useState } from "react";
import ReusableList from "../../../Component/ReusableList";
import { getCurrentUser } from "../../../../src/utils/session";
import { fetchDownloadLink, fetchPurchases } from "../../../../src/api/userLibrary";

const columns = [
  { label: "Title", key: "title", subKey: "by", label2: "by", align: "left" },
  { label: "Genres", key: "genres" },
  { label: "Mood", key: "mood" },
  { label: "Artists", key: "artists" },
  { label: "Link", key: "link" },
];

export default function PurchaseList() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!currentUser?.id) {
        setRows([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetchPurchases(currentUser.id);
        setRows(
          (response.items || []).map((purchase) => ({
            purchaseId: purchase.purchaseId,
            itemType: purchase.itemType,
            itemId: purchase.itemId,
            title: purchase.item?.title || "Untitled",
            by: purchase.item?.artist || "",
            genres: purchase.item?.genre || "-",
            mood: purchase.item?.mood || "-",
            artists: purchase.item?.artist || "-",
            link: "Download",
          })),
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentUser?.id]);

  const handleDownload = async (itemType, itemId) => {
    if (!currentUser?.id) return;
    try {
      setError("");
      const response = await fetchDownloadLink(currentUser.id, { itemType, itemId });
      if (response.downloadUrl) {
        window.open(response.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      setError(err.message || "Download failed");
    }
  };

  const renderCell = (key, item) => {
    if (key === "link") {
      return (
        <button
          type="button"
          onClick={() => handleDownload(item.itemType, item.itemId)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors md:w-auto md:h-auto md:rounded-none md:hover:bg-transparent"
        >
          <span className="md:hidden text-2xl text-gray-700">›</span>
          <span className="hidden md:inline text-blue-600 hover:text-blue-800 underline cursor-pointer">
            Download
          </span>
        </button>
      );
    }
    return item[key];
  };

  return (
    <ReusableList
      title="List of Purchases"
      data={loading ? [] : rows}
      columns={columns}
      renderCell={renderCell}
      lastColumnType="link"
      emptyMessage={loading ? "Loading purchases..." : error || "No purchases yet"}
      emptyDescription="Browse through our large section of royalty-free music"
      exploreButtonText="Explore More"
      onExploreClick={() => {
        window.location.href = "/Music";
      }}
    />
  );
}
