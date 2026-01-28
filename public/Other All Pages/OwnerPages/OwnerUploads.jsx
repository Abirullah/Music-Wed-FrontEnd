  import SearchBar from "./Parts/SearchBar";
  
const Uploads = [
  {
    id: 1,
    type: "License",
    song: "Demo Music",
    affiliateLink: "https://affiliate.example.com/echotune",
    artistName: "Michael Jordan",
    copyrightOwner: "EchoTune Records",
  },
  {
    id: 2,
    type: "Royalty-Free",
    song: "Demo Music",
    affiliateLink: "https://affiliate.example.com/nightvibes",
    artistName: "Sarah Beats",
    copyrightOwner: "Vibe Studios",
  },
  {
    id: 3,
    type: "Exclusive",
    song: "Demo Music",
    affiliateLink: "https://affiliate.example.com/dreamflow",
    artistName: "Alex Wave",
    copyrightOwner: "WaveSound Ltd",
  },
];


export default function OwnerUploads() {

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Statement</h1>
        <div className="relative w-1/3">
          <SearchBar placeholder="Search" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead className="bg-gray-100">
            <tr className="text-gray-400">
              <th className="px-4 py-4 mb-5 font-normal text-center">Type</th>
              <th className="px-4 py-4 mb-5 font-normal text-center">Song</th>
              <th className="px-4 py-4 mb-5 font-normal text-center">
                Affiliate Link
              </th>
              <th className="px-4 py-4 mb-5 font-normal text-center">
                Artist Name
              </th>
              <th className="px-4 py-4 mb-5 font-normal text-center">
                Copyright Owner
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
                  {row.artistName}
                </td>
                <td className="px-4  border-y text-lg max-w-[220px] break-all 
                ">
                  {row.affiliateLink}
                </td>

                <td className="px-4 py-1 border-y text-center">
                  {row.artistName}
                </td>

                <td className="px-4 py-1 last:rounded-r-lg border-y border-r  text-center">
                  {row.copyrightOwner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
