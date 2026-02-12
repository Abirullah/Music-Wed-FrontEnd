import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addFavorite,
  fetchFavorites,
  fetchPurchases,
  removeFavorite,
} from "../api/userLibrary";
import { getCurrentUser } from "../utils/session";

const buildKey = (itemType, itemId) => `${itemType}:${itemId}`;

export const useUserLibrary = () => {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [favoriteSet, setFavoriteSet] = useState(new Set());
  const [purchasedSet, setPurchasedSet] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!currentUser?.id) return;

    setLoading(true);
    try {
      const [favoritesRes, purchasesRes] = await Promise.all([
        fetchFavorites(currentUser.id),
        fetchPurchases(currentUser.id),
      ]);

      const nextFavorites = new Set(
        (favoritesRes.items || []).map((item) => buildKey(item.itemType, item.id)),
      );
      const nextPurchases = new Set(
        (purchasesRes.items || []).map((purchase) =>
          buildKey(purchase.itemType, purchase.itemId),
        ),
      );

      setFavoriteSet(nextFavorites);
      setPurchasedSet(nextPurchases);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  const isFavorite = useCallback(
    (itemType, itemId) => favoriteSet.has(buildKey(itemType, itemId)),
    [favoriteSet],
  );

  const isPurchased = useCallback(
    (itemType, itemId) => purchasedSet.has(buildKey(itemType, itemId)),
    [purchasedSet],
  );

  const toggleFavorite = useCallback(
    async (itemType, itemId) => {
      if (!currentUser?.id) {
        throw new Error("Please login first");
      }

      const key = buildKey(itemType, itemId);
      const alreadyFavorite = favoriteSet.has(key);

      if (alreadyFavorite) {
        await removeFavorite(currentUser.id, { itemType, itemId });
        setFavoriteSet((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      } else {
        await addFavorite(currentUser.id, { itemType, itemId });
        setFavoriteSet((prev) => new Set(prev).add(key));
      }
    },
    [currentUser?.id, favoriteSet],
  );

  return {
    currentUser,
    loading,
    refresh,
    isFavorite,
    isPurchased,
    toggleFavorite,
  };
};
