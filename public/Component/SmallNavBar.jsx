import { useState, useRef, useEffect } from "react";

function SmallNavBar({
  tabs = ["Lorem", "Lorem", "Lorem", "Lorem"],
  classes = "",
  setCurrentPaert,
  CurrentPart,
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const [style, setStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const currentTab = tabRefs.current[active];
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setStyle({
        width: offsetWidth + 16,
        left: offsetLeft - 8,
      });
    }
  }, [active, tabs.length]);

  useEffect(() => {
    if (!CurrentPart) {
      const savedPage = Number(localStorage.getItem("CurrentPage")) || 0;
      setActive(savedPage);
    }
  }, []);

  return (
    <div className={`w-full ${classes}`}>
      <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
        <div
          className="
            relative flex justify-around font-bold
            h-9 sm:h-10 md:h-12
            border-b border-gray-200
            text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
          "
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => {
                setActive(index);
                if (setCurrentPaert) setCurrentPaert(index);
              }}
              className={`
                cursor-pointer px-2 sm:px-3 md:px-4
                flex items-center gap-2
                transition-colors duration-300
                ${
                  active === index
                    ? "text-black"
                    : "text-gray-400 hover:text-black"
                }
              `}
            >
              {tab.icon && (
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              )}
              {tab.label}
            </div>
          ))}

          {/* Active underline */}
          <div
            className="
              absolute bottom-0
              h-[2px] sm:h-[3px]
              bg-black transition-all duration-300
            "
            style={style}
          />
        </div>
      </div>
    </div>
  );
}

export default SmallNavBar;
