import { useEffect, useMemo, useState } from "react";
import SearchBar from "./Parts/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import UploadSuccessPopup from "./Parts/UploadSuccessPopup";
import { fetchOwnerUploads } from "../../../src/api/owner";
import { getCurrentUser } from "../../../src/utils/session";

const truncateLink = (value = "", maxLength = 44) => {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3)}...`;
};

const formatAffiliateLinkLabel = (url = "") => {
  const raw = String(url || "").trim();
  if (!raw) return "";

  try {
    const parsed = new URL(raw);
    const cleanedPath = parsed.pathname === "/" ? "" : parsed.pathname;
    return truncateLink(`${parsed.hostname}${cleanedPath}`);
  } catch {
    return truncateLink(raw);
  }
};

export default function OwnerUploads() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [search, setSearch] = useState("");
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const successType = location.state?.uploadSuccess;
  const closeSuccess = () => navigate(location.pathname, { replace: true });

  useEffect(() => {
    const loadUploads = async () => {
      if (!currentUser?.id) {
        setError("Please login as owner.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetchOwnerUploads(currentUser.id, { search });
        setUploads(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load uploads");
      } finally {
        setLoading(false);
      }
    };

    loadUploads();
  }, [currentUser?.id, search]);

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none font-sans">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Upload list</h1>
        <div className="relative w-full md:w-1/3">
          <SearchBar
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onSubmit={(value) => setSearch(value)}
          />
        </div>
      </div>
      {loading ? <p className="text-sm text-gray-500 mb-3">Loading uploads...</p> : null}
      {error ? <p className="text-sm text-red-500 mb-3">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-black/10 bg-gradient-to-r from-black to-gray-800 text-xs uppercase tracking-wide text-white">
              <th className="px-4 py-4 text-center">Type</th>
              <th className="px-4 py-4 text-center">Song name</th>
              <th className="px-4 py-4 text-center">Affiliate Link</th>
              <th className="px-4 py-4 text-center">Artist Name</th>
              <th className="px-4 py-4 text-center">Copyright Owner</th>
            </tr>
          </thead>

          <tbody>
            {uploads.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-black/5 text-sm ${index % 2 === 0 ? "bg-white" : "bg-yellow-50/40"}`}
              >
                <td className="px-4 py-3 text-center font-semibold text-gray-800">{row.type}</td>
                <td className="px-4 py-3 text-center font-medium text-gray-900">{row.song}</td>
                <td className="px-4 py-3 text-center">
                  {row.affiliateLink ? (
                    <a
                      href={row.affiliateLink}
                      target="_blank"
                      rel="noreferrer"
                      title={row.affiliateLink}
                      className="mx-auto inline-flex max-w-[280px] items-center gap-2 rounded-full border border-black/20 bg-yellow-100 px-3 py-1 text-xs font-medium text-black hover:bg-yellow-200"
                    >
                      <span className="truncate">{formatAffiliateLinkLabel(row.affiliateLink)}</span>
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">No link</span>
                  )}
                </td>

                <td className="px-4 py-3 text-center text-gray-700">{row.artistName}</td>

                <td className="px-4 py-3 text-center text-gray-700">{row.copyrightOwner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UploadSuccessPopup
        open={Boolean(successType)}
        type={successType}
        onClose={closeSuccess}
      />
    </div>
  );
}
