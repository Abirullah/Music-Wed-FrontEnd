import SearchBar from "./Parts/SearchBar";

const Uploads = [
 {
    id: 1,
    type: "Royalty-Free",
    song: "Demo Music",
    complaint:"Aug 12 2024, 4:00 PM",
    pincode:"Demo name",
    timeofframe: "Aug 12 2024, 4:00 PM",
  },
  {
    id: 2,
    type: "Royalty-Free",
    song: "Demo Music",
    complaint:"Aug 12 2024, 4:00 PM",
    pincode:"Demo name",
    timeofframe: "Aug 12 2024, 4:00 PM",
  },
 {
    id: 3,
    type: "Royalty-Free",
    song: "Demo Music",
    complaint:"Aug 12 2024, 4:00 PM",
    pincode:"Demo name",
    timeofframe: "Aug 12 2024, 4:00 PM",
  },
];
export default function OwnerPrivacyAndContent() {
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none font-sans">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Piracy complaints</h1>
            <div className="relative w-full md:w-1/3">
              <SearchBar placeholder="Search" />
            </div>
          </div>
    
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead className="bg-gray-100">
                <tr className="text-gray-400">
                  <th className="px-4 py-4 mb-5 font-semibold text-center">Type</th>
                  <th className="px-4 py-4 mb-5 font-semibold text-center">Song name</th>
                  <th className="px-4 py-4 mb-5 font-semibold text-center">
                    Date &amp; time
                  </th>
                  <th className="hidden md:table-cell px-4 py-4 mb-5 font-semibold text-center">
                    Pincode
                  </th>
                  <th className="hidden md:table-cell px-4 py-4 mb-5 font-semibold max-w-[150px] break-all text-center">
                    Time frame of copyright violation
                  </th>
                </tr>
              </thead>
    
              <tbody>
                {Uploads.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <td className="px-4 first:rounded-l-lg border-y border-l text-center">
                      {row.type}
                    </td>
                    <td className="px-4 py-1 border-y text-center">
                      {row.song}
                    </td>
                    <td className="px-4 py-3 md:py-1 border-y border-r rounded-r-lg md:border-r-0 md:rounded-r-none text-sm md:text-base text-center whitespace-nowrap">
                      {row.complaint}
                    </td>
    
                    <td className="hidden md:table-cell px-4 py-1 border-y text-center">
                      {row.pincode}
                    </td>
    
                    <td className="hidden md:table-cell px-4 py-1 last:rounded-r-lg border-y border-r text-center">
                      {row.timeofframe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  );
}
