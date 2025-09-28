import { motion, AnimatePresence } from "framer-motion";
import { ExpenseItem } from "@type/expense";

interface EditModalProps {
  selectedExpenseConfig: {
    selectedExpense: ExpenseItem | null;
    setSelectedExpense: React.Dispatch<
      React.SetStateAction<ExpenseItem | null>
    >;
    handleUpdateExpense: () => void;
  };
}

const EditExpenseModal: React.FC<EditModalProps> = ({
  selectedExpenseConfig,
}) => {
  const { selectedExpense, setSelectedExpense, handleUpdateExpense } =
    selectedExpenseConfig;

  console.log(selectedExpense);
  return (
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
                  value={selectedExpense.expenseDate.split("T")[0]}
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
                disabled={!selectedExpense.amount || !selectedExpense.category}
                className="flex-1 px-4 py-3 bg-blockie-blue text-white rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                수정
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditExpenseModal;
