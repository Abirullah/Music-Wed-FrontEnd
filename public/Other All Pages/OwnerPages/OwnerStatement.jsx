import SearchBar from "./Parts/SearchBar";

const OwnerStatement = () => {
  const stats = [
    { label: 'Overall total', value: '$270', active: true },
    { label: 'Music', value: '$200', active: false },
    { label: 'Content', value: '$70', active: false },
  ];

  const transactions = [
    { id: 1, date: 'Aug 12 2022', time: '12:00 PM', customer: 'Michael Jordan', code: '232342155442', music: 'EchoTune Promo', valid: 'Sep 23 2024', total: '₹1,200', status: 'valid' },
    { id: 2, date: 'Aug 12 2022', time: '12:00 PM', customer: 'Michael Jordan', code: '232342454632', music: 'EchoTune Promo', valid: 'Expired', total: '₹1,200', status: 'expired' },
    { id: 3, date: 'Aug 12 2022', time: '12:00 PM', customer: 'Michael Jordan', code: '232342421615', music: 'EchoTune Promo', valid: 'Sep 23 2024', total: '₹1,200', status: 'valid' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Statement</h1>
        <div className="relative w-1/3">
          <SearchBar placeholder="Search" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`px-6 py-3 rounded-xl border-2 transition-all ${
              stat.active
                ? "bg-blue-50 border-blue-400"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead className="bg-gray-100">
            <tr className="text-gray-400">
              <th className="px-4 py-4 mb-5 font-normal">Date</th>
              <th className="px-4 py-4 mb-5 font-normal">Time</th>
              <th className="px-4 py-4 mb-5 font-normal">Customer name</th>
              <th className="px-4 py-4 mb-5 font-normal">Licence code</th>
              <th className="px-4 py-4 mb-5 font-normal">Music name</th>
              <th className="px-4 py-4 mb-5 text-center font-normal">
                Valid date
              </th>
              <th className="px-4 py-4 mb-5 text-right font-normal">Total</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((row) => (
              <tr
                key={row.id}
                className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <td className="px-4 first:rounded-l-lg border-y border-l">
                  {row.date}
                </td>
                <td className="px-4 py-1 border-y">{row.time}</td>
                <td className="px-4 py-1 border-y">{row.customer}</td>
                <td className="px-4 py-1 border-y ">{row.code}</td>
                <td className="px-4 py-1 border-y">
                  <div className="text-sm font-medium">{row.music}</div>
                  <div className="text-sm font-medium">{row.music}</div>
                </td>
                <td className="px-4 py-1 border-y text-center">
                  {row.status === "expired" ? (
                    <span className="bg-red-50 text-red-500 px-3 py-1 rounded-md text-sm font-bold">
                      Expired
                    </span>
                  ) : (
                    <span className="text-gray-700">{row.valid}</span>
                  )}
                </td>
                <td className="px-4 py-1 last:rounded-r-lg border-y border-r text-right font-bold text-gray-800">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerStatement;