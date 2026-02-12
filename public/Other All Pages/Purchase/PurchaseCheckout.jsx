import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchCatalogItem } from "../../../src/api/catalog";
import { confirmCheckout, createCheckoutSession } from "../../../src/api/payments";
import { getCurrentUser } from "../../../src/utils/session";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function PurchaseCheckout() {
  const { itemType, itemId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentUser = useMemo(() => getCurrentUser(), []);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadItem = async () => {
      if (!itemType || !itemId) {
        setError("Invalid purchase request");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchCatalogItem(itemType, itemId);
        setItem(response.item || null);
      } catch (err) {
        setError(err.message || "Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [itemType, itemId]);

  useEffect(() => {
    const purchaseId = searchParams.get("purchaseId");
    const sessionId = searchParams.get("session_id");
    if (!purchaseId) return;

    const confirm = async () => {
      try {
        setProcessing(true);
        const response = await confirmCheckout({
          purchaseId,
          sessionId,
          mockSuccess: !sessionId,
        });
        setSuccessMessage(
          `Purchase successful. License code: ${response.purchase?.licenseCode || ""}`,
        );
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete("purchaseId");
          next.delete("session_id");
          return next;
        });
      } catch (err) {
        setError(err.message || "Unable to confirm payment");
      } finally {
        setProcessing(false);
      }
    };

    confirm();
  }, [searchParams, setSearchParams]);

  const handleCheckout = async () => {
    if (!currentUser?.id) {
      navigate("/user/login");
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const successUrl = `${window.location.origin}/purchase/${itemType}/${itemId}`;
      const cancelUrl = `${window.location.origin}/purchase/${itemType}/${itemId}`;

      const response = await createCheckoutSession({
        userId: currentUser.id,
        itemType,
        itemId,
        successUrl,
        cancelUrl,
      });

      if (response.alreadyPurchased) {
        setSuccessMessage("This item is already purchased. You can download it from Purchases.");
        return;
      }

      if (response.mock) {
        const confirmed = await confirmCheckout({
          purchaseId: response.purchaseId,
          mockSuccess: true,
        });
        setSuccessMessage(
          `Purchase successful. License code: ${confirmed.purchase?.licenseCode || ""}`,
        );
        return;
      }

      if (response.checkoutUrl) {
        window.location.assign(response.checkoutUrl);
      }
    } catch (err) {
      setError(err.message || "Failed to initiate checkout");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Purchase</h1>

        {loading ? <p className="text-sm text-gray-500">Loading item...</p> : null}
        {error ? <p className="text-sm text-red-500 mb-3">{error}</p> : null}
        {successMessage ? <p className="text-sm text-green-600 mb-3">{successMessage}</p> : null}

        {item ? (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <img
                src={item.cover}
                alt={item.title}
                className="h-20 w-20 rounded-lg object-cover border border-gray-200"
              />
              <div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">by {item.artist}</p>
                <p className="text-sm text-gray-500">{item.itemType}</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold">{formatCurrency(item.price || 0)}</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full rounded-xl bg-gray-100 py-3 font-semibold text-gray-900 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={processing || loading || !item}
                className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {processing ? "Processing..." : "Pay with Stripe"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
