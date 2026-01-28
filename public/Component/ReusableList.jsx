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
}) {
  return (
    <div className="w-full bg-white rounded-xl shadow mt-5 pb-6 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <SearchBar
          classess={
            "w-110 rounded-full border-1 border-gray-500 shadow-sm bg-white/80  h-12"
          }
          ButtonInfo="w-[12%] h-full"
        />
      </div>

      {data.length > 0 ? (
        <>
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
                  if (colIdx === columns.length - 1) {
                    if (lastColumnType === "custom" && lastColumnContent) {
                      return (
                        <div key={colIdx}>
                          {typeof lastColumnContent === "function"
                            ? lastColumnContent(item, index)
                            : lastColumnContent}
                        </div>
                      );
                    }
                    return (
                      <div key={colIdx}>
                        {renderCell(column.key, item, index, lastColumnType)}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={colIdx}
                      className={
                        colIdx === 0 && "flex items-center gap-3 text-left"
                      }
                    >
                      {colIdx === 0 && (
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
                      )}
                      {colIdx !== 0 && item[column.key]}
                    </div>
                  );
                })}
              </div>
            ))}
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
