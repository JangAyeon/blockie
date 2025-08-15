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
import { useRouter, useSearchParams } from "next/navigation";

import { pageUrl } from "@constant/page.route";
import { toYMDWithString } from "@utils/date/YMD";
import FullLoader from "@component/features/expense/loading/FullLoader";
import {
  useAddExpenseItem,
  useDeleteExpenseItem,
  useEditExpenseItem,
} from "@hook/api/expense/useExpense";
import { ExpenseItem } from "@type/expense";

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

  const [newExpense, setNewExpense] = useState({
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
    // const originalExpen = expenses.find((e) => e.id === editingExpense.id);
    // const updatedExpenses = expenses.map((expense) =>
    //   expense.id === editingExpense.id
    //     ? {
    //         ...expense,
    //         amount: parseInt(editingExpense.amount.toString()),
    //         category: editingExpense.category,
    //         expenseDate: new Date(
    //           editingExpense.expenseDate +
    //             "T" +
    //             new Date().toTimeString().split(" ")[0]
    //         ).toISOString(),
    //       }
    //     : expense
    // );

    // setExpenses(updatedExpenses);

    // // 예산 업데이트
    // const amountDiff =
    //   parseInt(`${editingExpense.amount}`) - (originalExpense?.amount || 0);
    // setBudget((prev) => ({
    //   ...prev,
    //   spent: prev.spent + amountDiff,
    //   remaining: prev.budget - (prev.spent + amountDiff),
    // }));

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
          <h1 className="text-3xl font-bold text-center">지출 관리</h1>
          <p className="text-center text-neutral-dark-gray mt-2">
            스마트한 지출 관리로 건강한 소비 습관을 만들어 보세요
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
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-title-2 font-semibold mb-4">
                  새 지출 추가
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-body-2 font-medium text-neutral-black mb-2">
                      금액
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) =>
                          setNewExpense({
                            ...newExpense,
                            amount: e.target.value,
                          })
                        }
                        className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                        placeholder="예: 15000"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-neutral-dark-gray">원</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-body-2 font-medium text-neutral-black mb-2">
                      카테고리
                    </label>
                    <select
                      value={newExpense.category}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                    >
                      <option value="">카테고리 선택</option>
                      <option value="식비">식비</option>
                      <option value="교통비">교통비</option>
                      <option value="의료비">의료비</option>
                      <option value="쇼핑">쇼핑</option>
                      <option value="카페">카페</option>
                      <option value="생활용품">생활용품</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-2 font-medium text-neutral-black mb-2">
                      지출 날짜
                    </label>
                    <input
                      type="date"
                      value={newExpense.expenseDate}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          expenseDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-neutral-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleAddExpense}
                    disabled={!newExpense.amount || !newExpense.category}
                    className="flex-1 px-4 py-3 bg-blockie-yellow text-neutral-black rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    추가
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 지출 수정 모달 */}
        <AnimatePresence>
          {selectedExpense && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedExpense(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-title-2 font-semibold mb-4">지출 수정</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-body-2 font-medium text-neutral-black mb-2">
                      금액
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={selectedExpense.amount}
                        onChange={(e) =>
                          setSelectedExpense({
                            ...selectedExpense,
                            amount: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                        placeholder="예: 15000"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-neutral-dark-gray">원</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-body-2 font-medium text-neutral-black mb-2">
                      카테고리
                    </label>
                    <select
                      value={selectedExpense.category}
                      onChange={(e) =>
                        setSelectedExpense({
                          ...selectedExpense,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                    >
                      <option value="">카테고리 선택</option>
                      <option value="식비">식비</option>
                      <option value="교통비">교통비</option>
                      <option value="의료비">의료비</option>
                      <option value="쇼핑">쇼핑</option>
                      <option value="카페">카페</option>
                      <option value="생활용품">생활용품</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-2 font-medium text-neutral-black mb-2">
                      지출 날짜
                    </label>
                    <input
                      type="date"
                      value={selectedExpense.expenseDate}
                      onChange={(e) =>
                        setSelectedExpense({
                          ...selectedExpense,
                          expenseDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-blue focus:border-blockie-blue"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setSelectedExpense(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-neutral-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdateExpense}
                    disabled={
                      !selectedExpense.amount || !selectedExpense.category
                    }
                    className="flex-1 px-4 py-3 bg-blockie-blue text-white rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    수정
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    );
  }
}

export default ExpenseManagementPage;
