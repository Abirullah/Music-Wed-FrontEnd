import SearchBar from "./Parts/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import UploadSuccessPopup from "./Parts/UploadSuccessPopup";
import { getOwnerUploads } from "../../../src/storage/ownerUploadsStore";


export default function OwnerUploads() {
  const location = useLocation();
  const navigate = useNavigate();

  const uploads = getOwnerUploads();
  const successType = location.state?.uploadSuccess;
  const closeSuccess = () => navigate(location.pathname, { replace: true });

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none font-sans">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Upload list</h1>
        <div className="relative w-full md:w-1/3">
          <SearchBar placeholder="Search" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead className="bg-gray-100">
            <tr className="text-gray-400">
              <th className="px-4 py-4 mb-5 font-normal text-center">Type</th>
              <th className="px-4 py-4 mb-5 font-normal text-center">
                Song name
              </th>
              <th className="px-4 py-4 mb-5 font-normal text-center">
                Affiliate Link
              </th>
              <th className="hidden md:table-cell px-4 py-4 mb-5 font-normal text-center">
                Artist Name
              </th>
              <th className="hidden md:table-cell px-4 py-4 mb-5 font-normal text-center">
                Copyright Owner
              </th>
            </tr>
          </thead>

          <tbody>
            {uploads.map((row) => (
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
                <td className="px-4 py-3 md:py-1 border-y border-r rounded-r-lg md:border-r-0 md:rounded-r-none text-sm md:text-base max-w-[220px] break-all">
                  {row.affiliateLink}
                </td>

                <td className="hidden md:table-cell px-4 py-1 border-y text-center">
                  {row.artistName}
                </td>

                <td className="hidden md:table-cell px-4 py-1 last:rounded-r-lg border-y border-r text-center">
                  {row.copyrightOwner}
                </td>
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
