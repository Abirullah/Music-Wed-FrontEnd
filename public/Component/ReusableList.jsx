import { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";

export default function ReusableList({
  title,
  data,
  columns,
  renderCell,
  emptyMessage,
  emptyDescription,
  exploreButtonText,
  onExploreClick,
  lastColumnType = "link",
  lastColumnContent,
  onRowClick,
  searchPlaceholder = "Search",
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const renderLastCell = (item, index) => {
    const lastColumnKey = columns[columns.length - 1]?.key;
    if (!lastColumnKey) return null;

    if (lastColumnType === "custom" && lastColumnContent) {
      return typeof lastColumnContent === "function"
        ? lastColumnContent(item, index)
        : lastColumnContent;
    }

    return renderCell(lastColumnKey, item, index, lastColumnType);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow mt-5 pb-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex-1 text-left">
          {title}
        </h2>

        <div className="hidden md:block">
          <SearchBar
            classess="w-[28rem] lg:w-[32rem] rounded-full border border-gray-300 shadow-sm bg-white/80 h-12"
            placeholder={searchPlaceholder}
            ButtonInfo="w-14 h-full"
          />
        </div>

        <button
          type="button"
          aria-label={mobileSearchOpen ? "Close search" : "Open search"}
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors"
        >
          {mobileSearchOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-gray-700"
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
          )}
        </button>
      </div>

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div className="md:hidden mb-4">
          <SearchBar
            classess="w-full rounded-full border border-gray-300 shadow-sm bg-white/80 h-11"
            placeholder={searchPlaceholder}
            ButtonInfo="w-12 h-full"
          />
        </div>
      )}

      {data.length > 0 ? (
        <>
          {/* Mobile List */}
          <div className="md:hidden divide-y divide-black/10">
            {data.map((item, index) => {
              const firstColumn = columns[0];
              const titleText = firstColumn ? item[firstColumn.key] : "";

              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 py-4 cursor-pointer"
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-black flex-shrink-0"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polygon points="10,8 16,12 10,16" fill="currentColor" />
                    </svg>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {titleText}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        Lorem ipsum dolor sit amet consect amet
                      </p>
                    </div>
                  </div>

                  <div
                    className="shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderLastCell(item, index)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            {/* Table Head */}
            <div
              className="grid gap-0 bg-black text-white px-4 py-3 rounded-lg text-sm font-medium text-center"
              style={{
                gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              }}
            >
              {columns.map((column, idx) => (
                <div
                  key={idx}
                  className={column.align === "left" ? "text-left" : ""}
                >
                  {column.label}
                </div>
              ))}
            </div>

            <div>
              {data.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-0 items-center px-4 py-4 text-sm text-center hover:scale-101 transition-all duration-300 cursor-pointer"
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                  }}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column, colIdx) => {
                    const isLastColumn = colIdx === columns.length - 1;

                    if (isLastColumn) {
                      return (
                        <div
                          key={colIdx}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {renderLastCell(item, index)}
                        </div>
                      );
                    }

                    const isFirstColumn = colIdx === 0;
                    return (
                      <div
                        key={colIdx}
                        className={isFirstColumn ? "flex items-center gap-3 text-left" : ""}
                      >
                        {isFirstColumn ? (
                          <>
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-black flex-shrink-0"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <polygon
                                points="10,8 16,12 10,16"
                                fill="currentColor"
                              />
                            </svg>
                            <div className="flex flex-col">
                              <p className="font-medium">{item[column.key]}</p>
                              {column.subKey && (
                                <p className="text-gray-500 text-xs">
                                  {column.label2} {item[column.subKey]}
                                </p>
                              )}
                            </div>
                          </>
                        ) : (
                          item[column.key]
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="h-[50vh] flex flex-col justify-center items-center">
          <p className="text-center text-xl font-bold p-6">{emptyMessage}</p>
          <p className="text-center text-md text-gray-500">
            {emptyDescription}
          </p>
          <div>
            <Button
              text={exploreButtonText}
              bg="bg-yellow-500 px-15 py-3 mt-5"
              textColor="text-black"
              textSize="text-lg font-bold"
              onClick={onExploreClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
