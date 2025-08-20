import Card from "@component/common/card";
import {
  EXPENSE_TAB_MENU,
  categoryConfig,
  EXPENSE_PAGE_VARIANTS,
} from "@constant/expense";
import {
  useExpensesCategory,
  useMonthlyExpenses,
} from "@hook/api/expense/useExpense";
import { BlockieFace, BlockieBottom, Button } from "@repo/ui";
import { formatWithCurrencySymbol, formatDate } from "@utils/common/formatter";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import FullLoader from "../loading/FullLoader";
import Image from "next/image";
import { ExpenseItem } from "@type/expense";
import { useRouter } from "@i18n/navigation";
import { pageUrl } from "@constant/page.route";
import { handleDateChangeBtn } from "@utils/expense";
interface ExpenseItemListProps {
  direction: number;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  year: string;
  month: string;
  day: string;
  handleDeleteExpense: (expenseId: string) => void;
  setSelectedExpense: React.Dispatch<React.SetStateAction<ExpenseItem | null>>;
}

const ExpenseItemList: React.FC<ExpenseItemListProps> = ({
  direction,
  setShowAddForm,
  year,
  month,
  day,
  handleDeleteExpense,
  setSelectedExpense,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: monthlyExpense } = useMonthlyExpenses({
    year,
    month,
    day,
  });
  const { data: expenseCategory } = useExpensesCategory({
    year,
    month,
  });
  const router = useRouter();
  const filteredExpenses = useMemo(() => {
    if (!monthlyExpense?.expenses) return [];

    return monthlyExpense.expenses.filter((expense) => {
      const categoryMatch =
        selectedCategory === "all" || expense.category === selectedCategory;

      if (selectedPeriod === "all") return categoryMatch;

      const expenseDate = new Date(expense.expenseDate);
      const now = new Date();

      switch (selectedPeriod) {
        case "today":
          return (
            categoryMatch && expenseDate.toDateString() === now.toDateString()
          );
        case "week": {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return categoryMatch && expenseDate >= weekAgo;
        }
        case "month":
          return (
            categoryMatch &&
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
          );
        default:
          return categoryMatch;
      }
    });
  }, [monthlyExpense?.expenses, selectedCategory, selectedPeriod]);
  if (!monthlyExpense || !expenseCategory) return <FullLoader />;
  return (
    <motion.div
      key={EXPENSE_TAB_MENU.LIST}
      custom={direction}
      variants={EXPENSE_PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="text-title-1 font-semibold flex flex-row gap-2">
              {" "}
              <button
                onClick={() =>
                  handleDateChangeBtn(
                    pageUrl.expense,
                    "prev",
                    year,
                    month,
                    router
                  )
                }
              >
                {" "}
                ◁
              </button>
              <div>
                📅 {year}년 {month}월{" "}
              </div>
              <button
                onClick={() =>
                  handleDateChangeBtn(
                    pageUrl.expense,
                    "next",
                    year,
                    month,
                    router
                  )
                }
              >
                {" "}
                ▷
              </button>
            </div>

            <div className="flex flex-row gap-2">
              <div className="py-1.5 px-3 text-body-2  text-emerald-600 font-medium bg-emerald-100/60 rounded-full">
                총 {filteredExpenses.length}건의 지출
              </div>
              <Button
                variant="outline"
                size="sm"
                color="warning"
                onClick={() => setShowAddForm(true)}
                className=" text-body-2 font-medium  rounded-full "
              >
                <div className="flex flex-row gap-1">
                  <Image
                    src="/expense/plus.svg" // public/icons/plus.svg
                    alt="플러스 아이콘"
                    width={20}
                    height={20}
                  />
                  지출 추가
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* <div>
            <label className="block text-body-2 font-medium text-neutral-black mb-2">
              기간
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
            >
              <option value="all">전체</option>
              <option value="today">오늘</option>
              <option value="week">최근 7일</option>
              <option value="month">이번 달</option>
            </select>
          </div> */}

          <div>
            <label className="block text-body-2 font-medium text-neutral-black mb-2">
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
            >
              <option value="all">전체</option>
              {(expenseCategory?.categories).map((item) => (
                <option key={item.category} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 지출 목록 */}
        <div className="space-y-4">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center mb-4">
                <BlockieFace size={80} emotion="neutral" />
                <BlockieBottom size={80} />
              </div>
              <h4 className="text-title-3 font-medium text-neutral-black mb-2">
                지출 내역이 없습니다
              </h4>
              <p className="text-neutral-dark-gray">
                새로운 지출을 추가해보세요
              </p>
            </div>
          ) : (
            filteredExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          categoryConfig[expense.category]?.bg || "bg-gray-50"
                        } ${
                          categoryConfig[expense.category]?.text ||
                          "text-neutral-black"
                        } ${
                          categoryConfig[expense.category]?.border ||
                          "border-gray-200"
                        }`}
                      >
                        {expense.category}
                      </span>
                      <span className="text-title-2 font-bold text-neutral-black">
                        {formatWithCurrencySymbol(expense.amount)}
                      </span>
                    </div>
                    <p className="text-body-2 text-neutral-dark-gray">
                      {formatDate(expense.expenseDate)}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedExpense(expense)}
                      className="p-2 text-neutral-medium-gray hover:text-blockie-blue hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Image
                        src="/expense/edit.svg"
                        alt="edit icon"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-2 text-neutral-medium-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Image
                        src="/expense/trash.svg"
                        alt="trash icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ExpenseItemList;
