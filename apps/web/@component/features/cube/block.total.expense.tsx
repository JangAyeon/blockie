// import { MIN_BUDGET_BLOCK } from "@constant/budget";
// import { ExpenseCategoryItem } from "@type/expense";
// import { RecentExpense } from "@type/user";
// import { memo, useMemo } from "react";

// export interface ExpenseBlock {
//   id: string;
//   color: string;
//   fill: number; // 0 < fill <= 1
// }

// interface BlockMonthlyExpenseProps {
//   expensesInfo: RecentExpense[];
//   categoryInfo: ExpenseCategoryItem[];
//   totalBlocks: number;
//   maxBlocks: number;
// }

// // 단일 색상 (예: 파란색 계열)
// const UNIFIED_COLOR = "#3B82F6"; // blue-500

// const getUnifiedBlocks = (expensesInfo: RecentExpense[]): ExpenseBlock[] => {
//   // 전체 지출 합계 계산
//   const totalAmount = expensesInfo.reduce(
//     (sum, expense) => sum + expense.amount,
//     0
//   );

//   // 전체 블록 수와 나머지 계산
//   const fullBlockCount = Math.floor(totalAmount / MIN_BUDGET_BLOCK);
//   const remainder = totalAmount % MIN_BUDGET_BLOCK;

//   const blocks: ExpenseBlock[] = [];

//   // 풀 블록들 생성
//   for (let i = 0; i < fullBlockCount; i++) {
//     blocks.push({
//       id: `unified-full-${i}`,
//       color: UNIFIED_COLOR,
//       fill: 1,
//     });
//   }

//   // 부분 블록 생성 (나머지가 있는 경우)
//   if (remainder > 0) {
//     blocks.push({
//       id: `unified-partial`,
//       color: UNIFIED_COLOR,
//       fill: remainder / MIN_BUDGET_BLOCK,
//     });
//   }

//   return blocks;
// };

// // 블록 컬렉션 컴포넌트
// const BlockTotalExpense = memo<BlockMonthlyExpenseProps>(
//   ({ totalBlocks, maxBlocks, categoryInfo, expensesInfo }) => {
//     const unifiedBlocks = useMemo(() => {
//       return getUnifiedBlocks(expensesInfo);
//     }, [expensesInfo]);

//     // 총 지출 금액 계산
//     const totalExpense = useMemo(() => {
//       return expensesInfo.reduce((sum, expense) => sum + expense.amount, 0);
//     }, [expensesInfo]);

//     console.log("unifiedBlocks", unifiedBlocks);

//     return (
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
//         <div className="z-10">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold text-lg text-gray-800">
//               이번 달 블록 컬렉션
//             </h2>
//             <div className="flex flex-row gap-2">
//               {/* 남은 공간 표시 */}
//               <div className="text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
//                 남은 공간: {maxBlocks - totalBlocks}칸
//               </div>
//               <div className="text-sm px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 font-medium">
//                 {totalBlocks}/{maxBlocks} 블록
//               </div>
//             </div>
//           </div>

//           <div className="mb-4 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
//             {/* 그리드 배경 */}
//             <div
//               className="opacity-20"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
//                 backgroundSize: "20px 20px",
//               }}
//             />

//             {/* 블록들 */}
//             <div className="flex flex-wrap content-start gap-1 overflow-visible p-4">
//               {unifiedBlocks.map((block, index) => (
//                 <div
//                   key={block.id}
//                   className="text-black w-8 h-8 rounded-sm shadow-sm relative overflow-hidden transform transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer hover:z-10"
//                   data-id={index + 1}
//                 >
//                   <div
//                     className="h-full"
//                     style={{
//                       width: `${block.fill * 100}%`,
//                       backgroundColor: block.color,
//                       transition: "width 0.3s ease",
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 통합된 정보 표시 */}
//           <div className="flex justify-center items-center gap-4">
//             <div className="flex items-center group cursor-pointer">
//               <div
//                 className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
//                 style={{
//                   backgroundColor: UNIFIED_COLOR,
//                 }}
//               />
//               <span className="text-xs text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
//                 전체 지출: {totalExpense.toLocaleString()}원
//               </span>
//             </div>
//             <div className="text-xs text-gray-500">
//               총 {categoryInfo.reduce((sum, cat) => sum + cat.count, 0)}건
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// BlockTotalExpense.displayName = "BlockTotalExpense";

// export default BlockTotalExpense;
