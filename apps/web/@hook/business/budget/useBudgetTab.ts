import { BUDGET_TAB_MENU } from "@constant/budget";
import { useState } from "react";

export type BudgetTab = (typeof BUDGET_TAB_MENU)[keyof typeof BUDGET_TAB_MENU];

const useBudgetTab = () => {
  const [activeTab, setActiveTab] = useState<BudgetTab>(
    BUDGET_TAB_MENU.CURRENT
  );
  const [direction, setDirection] = useState(0);

  const changeTab = (tab: BudgetTab) => {
    const tabOrder: Record<BudgetTab, number> = {
      CURRENT: 0,
      HISTORY: 1,
      INSIGHTS: 2,
    };
    setDirection(
      tabOrder[tab as keyof typeof tabOrder] -
        tabOrder[activeTab as keyof typeof tabOrder]
    );
    setActiveTab(tab);
  };

  return { activeTab, changeTab, direction };
};

export default useBudgetTab;
