"use client";
import { useEffect, useState } from "react";
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
  Title,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";

import useBudgetTab from "@hook/business/budget/useBudgetTab";

import { useRouter, useSearchParams } from "next/navigation";
import { toYMDWithString } from "@utils/date/YMD";

import { pageUrl } from "@constant/page.route";

import { useUpdateBudget } from "@hook/api/budget/useBudget";
import { BUDGET_TAB_MENU } from "@constant/budget";
import CurrentBudget from "@component/features/budget/current/currentBudget";
import Footer from "@component/features/budget/footer";
import HistorySection from "@component/features/budget/history/historySection";
import Insight from "@component/features/budget/insight/insight";
import FullLoader from "@component/features/budget/loading/FullLoader";
import BudgetSetModal from "@component/features/budget/modal/budgetSetModal";
import TabMenu from "@component/features/budget/tabMenu";

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  BarElement,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title
);

export default function BudgetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");
  const hasDate = year && month && day;
  const [loading, setLoading] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const { activeTab, changeTab, direction } = useBudgetTab();
  // const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const mutateBudget = useUpdateBudget({
    year: Number(year),
    month: Number(month),
  });

  const [newBudget, setNewBudget] = useState("");
  const [budgetAdvisor, setBudgetAdvisor] = useState(false);

  useEffect(() => {
    // url에 날짜가 없으면 오늘 날짜로 리다이렉트
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(
        `${pageUrl.budget}?year=${year}&month=${month}&day=${day}`
      );
    } else {
      setLoading(false);
    }
  }, [router, hasDate]);

  // 예산 저장
  const handleBudgetSave = async (amount: number) => {
    // 로딩 상태 시뮬레이션
    if (!hasDate) return;
    setLoading(true);
    try {
      // mutateAsync - 저장 완료된 후 모달이 닫혀야 하기 때문에 mutateAsync 사용해야 함
      await mutateBudget.mutateAsync({
        year: Number(year),
        month: Number(month),
        amount,
      });
    } catch (error) {
      console.error("예산 저장 실패:", error);
    } finally {
      setLoading(false);
      setShowBudgetModal(false);
    }
  };

  if (loading || !hasDate) {
    <FullLoader />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-center">예산 관리</h1>
        <p className="text-center text-gray-500 mt-2">
          스마트한 예산 관리로 현명한 소비 습관을 만들어 보세요
        </p>
      </motion.div>

      {/* 탭 메뉴 */}
      <TabMenu changeTab={changeTab} activeTab={activeTab} />

      <AnimatePresence mode="wait" custom={direction}>
        {/* 현재 예산 탭 */}

        {activeTab === BUDGET_TAB_MENU.CURRENT && hasDate && (
          <CurrentBudget
            direction={direction}
            setShowBudgetModal={setShowBudgetModal}
            setBudgetAdvisor={setBudgetAdvisor}
            year={year}
            month={month}
          />
        )}
        {/* 예산 내역 탭 */}
        {activeTab === BUDGET_TAB_MENU.HISTORY && <HistorySection />}
        {/* 지출 분석 탭 */}
        {activeTab === BUDGET_TAB_MENU.INSIGHTS && hasDate && (
          <Insight
            direction={direction}
            setNewBudget={setNewBudget}
            setShowBudgetModal={setShowBudgetModal}
            year={year}
            month={month}
          />
        )}
      </AnimatePresence>

      {/* 예산 설정 모달 */}
      <AnimatePresence>
        {showBudgetModal && (
          <BudgetSetModal
            year={Number(year)}
            month={Number(month)}
            onSave={handleBudgetSave}
            onClose={() => setShowBudgetModal(false)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
