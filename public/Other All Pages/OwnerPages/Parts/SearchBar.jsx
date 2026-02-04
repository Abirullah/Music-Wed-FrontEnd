import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({
  placeholder = "Search...",
  className = "",
  value,
  onChange,
}) {
  return (
    <div
      className={`flex items-center w-full bg-white rounded-xl px-4 py-3 h-14 shadow-sm ${className}`}
    >
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
