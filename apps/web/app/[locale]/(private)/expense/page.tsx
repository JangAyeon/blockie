"use client";
import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

import { EXPENSE_TAB_MENU } from "@constant/expense";

import useExpenseTab from "@hook/business/expense/useExpenseTab";

import ExpenseTabMenu from "@component/features/expense/tabMenu";
import Overview from "@component/features/expense/overview";
import ExpenseItemList from "@component/features/expense/itemlist";
import Statistics from "@component/features/expense/statistics";
import Footer from "@component/features/expense/footer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@i18n/navigation";

import { pageUrl } from "@constant/page.route";
import { toYMDWithString } from "@utils/date/YMD";
import FullLoader from "@component/features/expense/loading/FullLoader";
import {
  useAddExpenseItem,
  useDeleteExpenseItem,
  useEditExpenseItem,
} from "@hook/api/expense/useExpense";
import { ExpenseItem } from "@type/expense";
import { useTranslations } from "next-intl";
import AddExpenseModal from "@component/features/expense/modal/add.expense.modal";
import EditExpenseModal from "@component/features/expense/modal/edit.expense.modal";

export interface ExpenseProps {
  amount: string;
  category: string;
  expenseDate: string | undefined;
}

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  BarElement
);

function ExpenseManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");

  const hasDate = year && month && day;
  const { activeTab, changeTab, direction } = useExpenseTab();
  const t = useTranslations("expense");
  const deleteExpenseMutation = useDeleteExpenseItem({
    showToast: true,
    onSuccess: () => {
      console.log("삭제 완료!");
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });

  const addExpenseMutation = useAddExpenseItem({
    showToast: true,
    onSuccess: () => {
      console.log("추가 완료!");
    },
    onError: (error) => {
      console.error("추가 실패:", error);
    },
  });

  const updateExpenseMutation = useEditExpenseItem({
    showToast: true,
    onSuccess: () => {
      console.log("변경 완료!");
    },
    onError: (error) => {
      console.error("변경 실패:", error);
    },
  });
  // const [expenses, setExpenses] = useState(initialExpenses);
  // const [budget, setBudget] = useState(initialBudget);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(
    null
  );

  const [newExpense, setNewExpense] = useState<ExpenseProps>({
    amount: "",
    category: "",
    expenseDate: new Date().toISOString().split("T")[0],
  });

  // 날짜 포맷팅 함수
  useEffect(() => {
    // url에 날짜가 없으면 오늘 날짜로 리다이렉트
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(
        `${pageUrl.expense}?year=${year}&month=${month}&day=${day}`
      );
    }
  }, [router, hasDate]);

  // 필터링된 지출 목록

  // 지출 추가 핸들러
  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category) return;

    const data = {
      amount: parseInt(newExpense.amount),
      category: newExpense.category,
      expenseDate: new Date(
        newExpense.expenseDate + "T" + new Date().toTimeString().split(" ")[0]
      ).toISOString(),
    };

    // console.log("handle Add Expense", data);
    addExpenseMutation.mutateAsync(data);
    setNewExpense({
      amount: "",
      category: "",
      expenseDate: new Date().toISOString().split("T")[0],
    });
    setShowAddForm(false);
  };

  // 지출 삭제 핸들러
  const handleDeleteExpense = (expenseId: string) => {
    deleteExpenseMutation.mutate({ id: expenseId });
  };

  const handleUpdateExpense = () => {
    if (!selectedExpense) return;
    // console.log("handleUpdateExpense", selectedExpense);
    const { id, createdAt, userId, ...rest } = selectedExpense;
    updateExpenseMutation.mutateAsync({
      id,
      data: {
        ...rest,
        expenseDate: new Date(
          rest.expenseDate + "T" + new Date().toTimeString().split(" ")[0]
        ).toISOString(),
      },
    });

    setSelectedExpense(null);
  };
  // const firstExpense = expenses[0];

  // 차트 데이터 준비

  if (!hasDate) {
    <FullLoader />;
  } else {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-center">
            {/* "지출 관리" */}
            {t("management")}
          </h1>
          <p className="text-center text-neutral-dark-gray mt-2">
            {/* "스마트한 지출 관리로 건강한 소비 습관을 만들어 보세요" */}
            {t("description")}
          </p>
        </motion.div>

        {/* 탭 메뉴 */}
        <ExpenseTabMenu activeTab={activeTab} changeTab={changeTab} />

        <AnimatePresence mode="wait" custom={direction}>
          {/* 지출 현황 탭 */}
          {activeTab === EXPENSE_TAB_MENU.OVERVIEW && (
            <Overview
              direction={direction}
              setShowAddForm={setShowAddForm}
              year={year}
              month={month}
              day={day}
            />
          )}

          {/* 지출 내역 탭 */}
          {activeTab === EXPENSE_TAB_MENU.LIST && (
            <ExpenseItemList
              direction={direction}
              setShowAddForm={setShowAddForm}
              year={year}
              month={month}
              day={day}
              handleDeleteExpense={handleDeleteExpense}
              setSelectedExpense={setSelectedExpense}
            />
          )}

          {/* 통계 분석 탭 */}
          {activeTab === EXPENSE_TAB_MENU.STATISTICS && (
            <Statistics
              direction={direction}
              year={year}
              month={month}
              day={day}
            />
          )}
        </AnimatePresence>

        {/* 지출 추가 모달 */}
        <AddExpenseModal
          modalConfig={{ showAddForm, setShowAddForm }}
          expenseConfig={{ newExpense, setNewExpense, handleAddExpense }}
        />

        {/* 지출 수정 모달 */}
        <EditExpenseModal
          selectedExpenseConfig={{
            selectedExpense,
            setSelectedExpense,
            handleUpdateExpense,
          }}
        />

        <Footer />
      </div>
    );
  }
}

export default ExpenseManagementPage;
