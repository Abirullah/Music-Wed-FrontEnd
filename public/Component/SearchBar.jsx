import { useState } from "react";

export default function SearchBar({
  classess,
  placeholder,
  ButtonInfo,
  value,
  onChange,
  onSubmit,
}) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (event) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const submitSearch = () => {
    if (!onSubmit) return;
    onSubmit(currentValue);
  };

  return (
    <div
      className={`flex items-center gap-3 border-b border-gray-400/60 ${classess} px-3`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submitSearch();
          }
        }}
        className="w-full h-full text-lg bg-transparent outline-none placeholder-gray-400 text-gray-700"
      />

      <button
        type="button"
        onClick={submitSearch}
        className={`flex items-center justify-center  ${ButtonInfo ? ButtonInfo : "w-16 h-15"} rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 shadow-md`}
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
          />
        </svg>
      </button>
    </div>
  );
}
