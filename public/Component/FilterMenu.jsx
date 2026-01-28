import { useState } from "react";

const filters = [
  {
    name: "Genre",
    options: ["Action", "Adventure", "Aerobics", "Comedy"],
  },
  {
    name: "Mood",
    options: ["Happy", "Sad", "Energetic", "Chill"],
  },
  {
    name: "Artists",
    options: ["Artist 1", "Artist 2", "Artist 3"],
  },
  {
    name: "Language",
    options: ["English", "Spanish", "French"],
  },
];

export default function FilterMenu() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (name) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className="sticky top-24 h-[calc(100vh-6rem)] w-full shadow-lg mt-3 rounded-lg bg-white p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>

      {filters.map((section) => (
        <div key={section.name} className="border-b border-gray-400 py-3">
          <button
            type="button"
            onClick={() => toggleSection(section.name)}
            className="flex w-full items-center justify-between font-medium text-gray-800"
          >
            {section.name}
            <span className="text-lg">
              {openSections[section.name] ? "−" : "+"}
            </span>
          </button>

          {openSections[section.name] && (
            <div className="mt-3 space-y-2">
              {section.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <input type="checkbox" />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
