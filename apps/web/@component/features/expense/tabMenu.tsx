import { EXPENSE_TAB_MENU } from "@constant/expense";
import { ExpenseTab } from "@hook/business/expense/useExpenseTab";
import { useTranslations } from "next-intl";
import React from "react";

interface ExpenseTabMenuProps {
  activeTab: string;
  changeTab: (tab: ExpenseTab) => void;
}

const ExpenseTabMenu: React.FC<ExpenseTabMenuProps> = ({
  activeTab,
  changeTab,
}) => {
  const t = useTranslations("expense");
  return (
    <div className="flex justify-center mb-8">
      <nav className="bg-white shadow-md rounded-full px-1 py-1 inline-flex">
        <button
          className={`px-6 py-2 rounded-full text-body-2 font-medium transition-colors ${
            activeTab === EXPENSE_TAB_MENU.OVERVIEW
              ? "bg-blockie-yellow text-neutral-black"
              : "text-neutral-dark-gray hover:bg-gray-100"
          }`}
          onClick={() => changeTab(EXPENSE_TAB_MENU.OVERVIEW)}
        >
          {/* "지출 현황" */}
          {t("status")}
        </button>
        <button
          className={`px-6 py-2 rounded-full text-body-2 font-medium transition-colors ${
            activeTab === EXPENSE_TAB_MENU.LIST
              ? "bg-blockie-yellow text-neutral-black"
              : "text-neutral-dark-gray hover:bg-gray-100"
          }`}
          onClick={() => changeTab(EXPENSE_TAB_MENU.LIST)}
        >
          {/* "지출 내역" */}
          {t("history")}
        </button>
        <button
          className={`px-6 py-2 rounded-full text-body-2 font-medium transition-colors ${
            activeTab === EXPENSE_TAB_MENU.STATISTICS
              ? "bg-blockie-yellow text-neutral-black"
              : "text-neutral-dark-gray hover:bg-gray-100"
          }`}
          onClick={() => changeTab(EXPENSE_TAB_MENU.STATISTICS)}
        >
          {/* "통계 분석" */}
          {t("statisticsTitle")}
        </button>
      </nav>
    </div>
  );
};

export default ExpenseTabMenu;
