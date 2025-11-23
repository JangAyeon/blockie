import { BudgetHistoryItem as BudgetHistoryItemType } from "@type/budget";

import BudgetHistoryItem from "./record/history.item";
import EmptyHistoryList from "./empty.list";

interface BudgetHistoryListProps {
  history: BudgetHistoryItemType[] | undefined;
}

const BudgetHistoryList = ({ history }: BudgetHistoryListProps) => {
  if (!history || history.length === 0) {
    return <EmptyHistoryList />;
  }

  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <BudgetHistoryItem
          key={`${item.year}-${item.month}`}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default BudgetHistoryList;
