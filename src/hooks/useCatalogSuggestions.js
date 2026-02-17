import { useEffect, useState } from "react";
import { fetchCatalog } from "../api/catalog";

export const useCatalogSuggestions = ({ query = "", limit = 6 } = {}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = String(query || "").trim();
    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    let active = true;
    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetchCatalog({
          search: trimmedQuery,
          limit,
          page: 1,
          sort: "latest",
        });

        if (!active) return;
        const items = Array.isArray(response?.items) ? response.items : [];
        const dedupe = new Set();
        const mapped = [];

        for (const item of items) {
          const key = `${item?.itemType || "item"}:${item?.id || ""}`;
          if (dedupe.has(key)) continue;
          dedupe.add(key);

          mapped.push({
            id: item?.id,
            itemType: item?.itemType,
            title: item?.title || "Untitled",
            artist: item?.artist || "",
            label: item?.title || "Untitled",
            subLabel: item?.artist || item?.itemType || "",
          });

          if (mapped.length >= limit) break;
        }

        setSuggestions(mapped);
      } catch {
        if (!active) return;
        setSuggestions([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [query, limit]);

  return { suggestions, loading };
};

export default useCatalogSuggestions;
