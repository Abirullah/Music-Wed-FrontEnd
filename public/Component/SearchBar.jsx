import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchBar({
  classess,
  placeholder,
  ButtonInfo,
  value,
  onChange,
  onSubmit,
  suggestions = [],
  onSuggestionSelect,
  suggestionsLoading = false,
}) {
  const [internalValue, setInternalValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];
  const hasSuggestions = safeSuggestions.length > 0;

  const handleChange = (event) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
    setShowSuggestions(true);
  };

  const submitSearch = () => {
    if (!onSubmit) return;
    onSubmit(currentValue);
    setShowSuggestions(false);
  };

  const suggestionItems = useMemo(
    () =>
      safeSuggestions.map((item, index) => ({
        id: String(item?.id || `${item?.itemType || "item"}-${index}`),
        label: String(item?.label || item?.title || ""),
        subLabel: String(item?.subLabel || item?.artist || ""),
        item,
      })),
    [safeSuggestions],
  );

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-3 border-b border-gray-400/60 ${classess} px-3`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onFocus={() => {
          if (hasSuggestions || suggestionsLoading) setShowSuggestions(true);
        }}
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

      {showSuggestions && (hasSuggestions || suggestionsLoading) ? (
        <div className="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
          {suggestionsLoading ? (
            <p className="px-4 py-3 text-sm text-gray-500">Searching...</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto py-2">
              {suggestionItems.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-yellow-50"
                    onClick={() => {
                      onSuggestionSelect?.(suggestion.item);
                      setShowSuggestions(false);
                    }}
                  >
                    <span className="truncate text-sm font-medium text-gray-900">
                      {suggestion.label || "Untitled"}
                    </span>
                    {suggestion.subLabel ? (
                      <span className="shrink-0 text-xs text-gray-500">
                        {suggestion.subLabel}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
