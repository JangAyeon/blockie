import { BudgetTab } from "@hook/business/budget/useBudgetTab";
import { useTranslations } from "next-intl";

interface TabMenuProps {
  changeTab: (tab: BudgetTab) => void;
  activeTab: BudgetTab;
}

const TabMenu: React.FC<TabMenuProps> = ({ changeTab, activeTab }) => {
  const t = useTranslations();
  return (
    <div className="flex justify-center mb-8 relative">
      <nav className="bg-white shadow-md rounded-full px-1 py-1 inline-flex">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "CURRENT" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
          onClick={() => changeTab("CURRENT")}
          aria-label={t("budget.currentTab")}
        >
          {t("budget.currentTab")}
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "HISTORY" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
          onClick={() => changeTab("HISTORY")}
          aria-label={t("budget.historyTab")}
        >
          {t("budget.historyTab")}
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "INSIGHTS" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
          onClick={() => changeTab("INSIGHTS")}
          aria-label={t("budget.insightsTab")}
        >
          {t("budget.insightsTab")}
        </button>
      </nav>
    </div>
  );
};

export default TabMenu;
