import { EXPENSE_TAB_MENU } from "@constant/expense";
import { useState } from "react";

export type ExpenseTab =
  (typeof EXPENSE_TAB_MENU)[keyof typeof EXPENSE_TAB_MENU];

// 커스텀 훅: 탭 변경 애니메이션
function useExpenseTab() {
  const [activeTab, setActiveTab] = useState<string>(EXPENSE_TAB_MENU.OVERVIEW);
  const [direction, setDirection] = useState(0);

  const changeTab = (tab: string) => {
    const tabOrder: Record<ExpenseTab, number> = {
      OVERVIEW: 0,
      LIST: 1,
      STATISTICS: 2,
    };
    setDirection(
      tabOrder[tab as keyof typeof tabOrder] -
        tabOrder[activeTab as keyof typeof tabOrder]
    );

    setActiveTab(tab);
  };

  return { activeTab, changeTab, direction };
}

export default useExpenseTab;
