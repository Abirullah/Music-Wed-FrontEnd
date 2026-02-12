import { useEffect, useMemo, useState } from "react";
import { fetchCatalog } from "../api/catalog";

const normalizeFilters = (filters = {}) => ({
  genre: Array.isArray(filters.genre) ? filters.genre : [],
  mood: Array.isArray(filters.mood) ? filters.mood : [],
  artist: Array.isArray(filters.artist) ? filters.artist : [],
  language: Array.isArray(filters.language) ? filters.language : [],
});

export const useCatalog = ({ type = "all", sort = "latest" } = {}) => {
  const [items, setItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    genre: [],
    mood: [],
    artist: [],
    language: [],
  });
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(normalizeFilters());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(
    () => ({
      type,
      sort,
      search,
      genre: selectedFilters.genre.join(","),
      mood: selectedFilters.mood.join(","),
      artist: selectedFilters.artist.join(","),
      language: selectedFilters.language.join(","),
      limit: 100,
    }),
    [type, sort, search, selectedFilters],
  );

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchCatalog(query);
        if (!active) return;

        setItems(response.items || []);
        setFilterOptions(response.filters || {
          genre: [],
          mood: [],
          artist: [],
          language: [],
        });
      } catch (err) {
        if (!active) return;
        setError(err.message || "Failed to load catalog");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [query]);

  const toggleFilter = (key, value) => {
    setSelectedFilters((prev) => {
      const existing = prev[key] || [];
      const exists = existing.includes(value);
      return {
        ...prev,
        [key]: exists ? existing.filter((item) => item !== value) : [...existing, value],
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters(normalizeFilters());
  };

  return {
    items,
    filterOptions,
    selectedFilters,
    toggleFilter,
    clearFilters,
    search,
    setSearch,
    loading,
    error,
  };
};
