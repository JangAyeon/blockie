import { useState } from "react";

const useBudgetTab = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [direction, setDirection] = useState(0);

  const changeTab = (tab: string) => {
    const tabOrder = { current: 0, history: 1, insights: 2 };
    setDirection(
      tabOrder[tab as keyof typeof tabOrder] -
        tabOrder[activeTab as keyof typeof tabOrder]
    );
    setActiveTab(tab);
  };

  return { activeTab, changeTab, direction };
};

export default useBudgetTab;
