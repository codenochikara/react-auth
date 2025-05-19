import { useRef, useState } from "react";
import '../../assets/css/Tabs.css';

const Tabs = ({ tabs = [], className }) => {
  // const [activeTab, setActiveTab] = useState(tabs[0]?.id || null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const handleTabKeyDown = (e) => {
    const lastIndex = tabs.length - 1;
    let newIndex = activeIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
        break;
      case 'ArrowLeft':
        newIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = lastIndex;
        break;
      default:
        return;
    }

    e.preventDefault();
    setActiveIndex(newIndex);
    tabsRef.current[newIndex]?.focus();
  };

  return (
    <section className={`page-section tabs flex-column-justify-center gap-1rem ${className ? className : ''}`} aria-label="Tabs">
      {/* Tab List */}
      <div role="tablist" className="tab-list flex-align-center gap-8px" aria-label="Tab list">
        {/* Tabs */}
        {tabs.length > 0 && tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={tab.id}
            role="tab"
            ref={(el) => (tabsRef.current[index] = el)}
            aria-selected={activeIndex === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => handleTabClick(index)}
            onKeyDown={handleTabKeyDown}
            className={`tab flex-center gap-10px ${activeIndex === index
              ? 'selected'
              : ''
              }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <div
          key={`tabpanel-${tab.id}-${index}`}
          id={`tabpanel-${tab.id}-${index}`}
          role="tabpanel"
          // tabIndex={0}
          aria-labelledby={tab.id}
          hidden={activeIndex !== index}
          className='tab-panel'
        >
          {typeof tab.tabPanel === 'function' ? tab.tabPanel() : tab.tabPanel}
        </div>
      ))}
    </section>
  );
}

export default Tabs;
