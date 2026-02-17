import { useEffect, useMemo, useState } from "react";
import SearchBar from "./Parts/SearchBar";
import { fetchOwnerComplaints } from "../../../src/api/owner";
import { getCurrentUser } from "../../../src/utils/session";

export default function OwnerPrivacyAndContent() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComplaints = async () => {
      if (!currentUser?.id) {
        setError("Please login as owner.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetchOwnerComplaints(currentUser.id, { search });
        setRows(response.rows || []);
      } catch (err) {
        setError(err.message || "Failed to load piracy complaints");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, [currentUser?.id, search]);

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none font-sans">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Piracy complaints</h1>
        <div className="relative w-full md:w-1/3">
          <SearchBar
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onSubmit={(value) => setSearch(value)}
          />
        </div>
      </div>

      {loading ? <p className="mb-3 text-sm text-gray-500">Loading complaints...</p> : null}
      {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
        <table className="w-full min-w-[920px] text-left">
          <thead>
            <tr className="border-b border-black/10 bg-gradient-to-r from-black to-gray-800 text-xs uppercase tracking-wide text-white">
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">Song/Content</th>
              <th className="px-4 py-4">Uploader</th>
              <th className="px-4 py-4">Reported by</th>
              <th className="px-4 py-4">Date &amp; time</th>
              <th className="px-4 py-4">Pincode</th>
              <th className="px-4 py-4">Violation window</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-black/5 text-sm ${index % 2 === 0 ? "bg-white" : "bg-yellow-50/40"}`}
              >
                <td className="px-4 py-3 font-semibold text-black">{row.type}</td>
                <td className="px-4 py-3 text-gray-700">{row.song}</td>
                <td className="px-4 py-3 text-gray-700">{row.uploaderName || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{row.reporterName || "-"}</span>
                    <span className="text-xs text-gray-500">{row.reporterEmail || "-"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.complaint}</td>
                <td className="px-4 py-3 text-gray-700">{row.pincode}</td>
                <td className="px-4 py-3 text-gray-700">{row.timeofframe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
