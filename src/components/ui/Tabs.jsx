import React, { useState } from "react";
import classNames from "classnames";

const Tabs = ({ tabs = [], defaultIndex = 0, onTabChange }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index) => {
    setActiveIndex(index);
    onTabChange?.(index);
  };

  return (
    <div>
      <div className="flex space-x-2 border-b border-gray-200 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={classNames(
              "px-4 py-2 text-sm font-medium transition-all duration-200",
              activeIndex === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="transition-all duration-300">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
