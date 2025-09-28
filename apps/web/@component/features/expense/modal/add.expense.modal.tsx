"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExpenseProps } from "app/[locale]/(private)/expense/page";

interface AddModalProps {
  modalConfig: {
    showAddForm: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  };
  expenseConfig: {
    newExpense: ExpenseProps;
    setNewExpense: React.Dispatch<React.SetStateAction<ExpenseProps>>;
    handleAddExpense: () => void;
  };
}
const AddExpenseModal: React.FC<AddModalProps> = ({
  modalConfig,
  expenseConfig,
}) => {
  const { showAddForm, setShowAddForm } = modalConfig;
  const { newExpense, setNewExpense, handleAddExpense } = expenseConfig;
  return (
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
            <h3 className="text-title-2 font-semibold mb-4">새 지출 추가</h3>

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
                  <option value="월별 고정 지출">고정 지출</option>
                  <option value="월별 변동 지출">월별 변동 지출</option>
                  <option value="비정기 지출">비정기 지출</option>
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
  );
};

export default AddExpenseModal;
