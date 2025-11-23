import { useBudgetStatus } from "@hook/api/budget/useBudget";

import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
import BudgetModalHeader from "./header";
import BudgetInputSection from "./input";
import BudgetRecommendSection from "./recommand";
import BudgetModalActions from "./actions";

interface BudgetSetModalProps {
  year: number;
  month: number;
  onSave: (amount: number) => Promise<void>;
  onClose: () => void;
  showBudgetAdvisor: boolean;
  setShowBudgetAdvisor: Dispatch<SetStateAction<boolean>>;
}

const BudgetSetModal: FC<BudgetSetModalProps> = ({
  year,
  month,
  onSave,
  onClose,
  showBudgetAdvisor,
  setShowBudgetAdvisor,
}) => {
  const [budgetAmount, setBudgetAmount] = useState("");
  // const [showAdvisor, setShowAdvisor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: budgetStatus } = useBudgetStatus({
    year: year.toString(),
    month: month.toString().padStart(2, "0"),
  });

  // 추천 예산 계산
  // const getRecommendedBudget = useCallback(
  //   (multiplier: number) => {
  //     if (!budgetStatus?.spent) return 0;
  //     return Math.ceil((budgetStatus.spent * multiplier) / 10000) * 10000;
  //   },
  //   [budgetStatus?.spent]
  // );

  // const recommendedBudgets = {
  //   base: getRecommendedBudget(BUDGET_MULTIPLIERS.RECOMMENDED),
  //   conservative: getRecommendedBudget(BUDGET_MULTIPLIERS.CONSERVATIVE),
  //   aggressive: getRecommendedBudget(BUDGET_MULTIPLIERS.AGGRESSIVE),
  // };

  // 예산 저장 핸들러
  const handleSave = async () => {
    const amount = Number(budgetAmount);
    if (!amount || amount <= 0) return;

    setIsSubmitting(true);
    try {
      await onSave(amount);
    } catch (error) {
      console.error("예산 저장 중 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 추천 예산 선택 핸들러
  // const handleSelectRecommended = (amount: number) => {
  //   setBudgetAmount(amount.toString());
  // };

  // 입력값 검증
  const isValidAmount = Boolean(budgetAmount && Number(budgetAmount) > 0);
  const hasSpentAmount = Boolean(budgetStatus?.spent && budgetStatus.spent > 0);
  console.log(budgetStatus?.spent, showBudgetAdvisor);
  if (!budgetStatus) return <></>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md flex flex-col gap-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <BudgetModalHeader year={year} month={month} />
        {/* 예산 입력 */}
        <BudgetInputSection
          budgetStatus={budgetStatus}
          budgetAmount={budgetAmount}
          setBudgetAmount={setBudgetAmount}
          isSubmitting={isSubmitting}
          hasSpentAmount={hasSpentAmount}
          showAdvisor={showBudgetAdvisor}
          onToggleAdvisor={() => setShowBudgetAdvisor(!showBudgetAdvisor)}
        />
        {/* 예산 추천 */}

        {showBudgetAdvisor && hasSpentAmount && (
          <BudgetRecommendSection
            budgetStatus={budgetStatus}
            onSelectAmount={(amount) => setBudgetAmount(amount.toString())}
          />
        )}

        {/* 액션 버튼 */}

        <BudgetModalActions
          isValidAmount={isValidAmount}
          isSubmitting={isSubmitting}
          onSave={handleSave}
          onClose={onClose}
        />
      </motion.div>
    </motion.div>
  );
};

export default BudgetSetModal;
