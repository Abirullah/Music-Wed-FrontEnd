import { useState, useRef, useEffect } from "react";

function SmallNavBar({
  tabs = ["Lorem", "Lorem", "Lorem", "Lorem"],
  classes,
  setCurrentPaert,
  CurrentPart
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
    <div className={`  ${classes}`}>
      <div className="mx-auto w-[70%]">
        <div className="relative flex text-xl justify-around font-bold h-10 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => {
                setActive(index);
                if (setCurrentPaert) setCurrentPaert(index);
              }}
              className={`cursor-pointer px-2 flex justify-center items-center transition-colors duration-300 gap-2
              ${
                active === index
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab.icon && (
                <img src={tab.icon} alt={tab.label} className="w-5 h-5" />
              )}
              {tab.label}
            </div>
          ))}

          <div
            className="absolute bottom-0 h-[3px] bg-black transition-all duration-300"
            style={style}
          />
        </div>
      </div>
    </div>
  );
}

export default SmallNavBar;
