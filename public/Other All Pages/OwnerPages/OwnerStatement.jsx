import { useEffect, useMemo, useState } from "react";
import SearchBar from "./Parts/SearchBar";
import { fetchOwnerStatements } from "../../../src/api/owner";
import { getCurrentUser } from "../../../src/utils/session";

const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);
};

const OwnerStatement = () => {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState([
    { label: "Overall total", value: formatCurrency(0), active: true },
    { label: "Music", value: formatCurrency(0), active: false },
    { label: "Content", value: formatCurrency(0), active: false },
  ]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStatements = async () => {
      if (!currentUser?.id) {
        setError("Please login as owner.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetchOwnerStatements(currentUser.id, { search });
        const totals = response.totals || {};

        setStats([
          {
            label: "Overall total",
            value: formatCurrency(totals.overallTotal || 0),
            active: true,
          },
          {
            label: "Music",
            value: formatCurrency(totals.musicTotal || 0),
            active: false,
          },
          {
            label: "Content",
            value: formatCurrency(totals.contentTotal || 0),
            active: false,
          },
        ]);

        setTransactions(
          (response.rows || []).map((row) => ({
            ...row,
            total: formatCurrency(row.total || 0),
          })),
        );
      } catch (err) {
        setError(err.message || "Failed to load statements");
      } finally {
        setLoading(false);
      }
    };

    loadStatements();
  }, [currentUser?.id, search]);

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none font-sans">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Statement</h1>
        <div className="relative w-full md:w-1/3">
          <SearchBar
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onSubmit={(value) => setSearch(value)}
          />
        </div>
      </div>

      {loading ? <p className="mb-3 text-sm text-gray-500">Loading statements...</p> : null}
      {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`px-3 sm:px-4 lg:px-6 py-3  rounded-xl border-2 transition-all ${
              stat.active
                ? "bg-blue-50 border-blue-400"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <p className="text-gray-600 font-medium mb-1 text-xs sm:text-sm">{stat.label}</p>
            <p className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
        <table className="w-full min-w-[960px] text-left">
          <thead>
            <tr className="border-b border-black/10 bg-gradient-to-r from-black to-gray-800 text-xs uppercase tracking-wide text-white">
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Music name</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Time</th>
              <th className="px-4 py-4">Licence code</th>
              <th className="px-4 py-4 text-center">Valid date</th>
              <th className="px-4 py-4 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-black/5 text-sm ${index % 2 === 0 ? "bg-white" : "bg-yellow-50/40"}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.date}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{row.music}</td>
                <td className="px-4 py-3 text-gray-700">{row.customer}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.time}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">{row.code}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  {row.status === "expired" ? (
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                      Expired
                    </span>
                  ) : (
                    <span className="text-gray-700">{row.valid}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-bold text-gray-900">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerStatement;
