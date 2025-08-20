// import { MIN_BUDGET_BLOCK } from "@constant/budget";
// import { ExpenseCategoryItem } from "@type/expense";
// import { RecentExpense } from "@type/user";
// import { getCategoryColor } from "@utils/common/getCategoryConfig";
// import { memo, useMemo } from "react";

// export interface ExpenseBlock {
//   id: string;
//   color: string;
//   categoryId: string;
//   fill: number; // 0 < fill <= 1
// }

// interface BlockMonthlyExpenseProps {
//   expensesInfo: RecentExpense[];
//   categoryInfo: ExpenseCategoryItem[];
//   totalBlocks: number;
//   maxBlocks: number;
// }

// const getResidualBlocksByCategory = (
//   expensesInfo: RecentExpense[]
// ): ExpenseBlock[] => {
//   const categoryResiduals = new Map<string, number>(); // 카테고리별 누적 잔여
//   const partialBlocks: ExpenseBlock[] = [];

//   for (const expense of expensesInfo) {
//     const remaining = expense.amount % MIN_BUDGET_BLOCK;

//     if (remaining > 0) {
//       const category = expense.category;
//       const currentSum = categoryResiduals.get(category) || 0;
//       const newSum = currentSum + remaining;

//       // 1만원 이상 누적되면 해당 카테고리 블록 생성
//       const newBlocks = Math.floor(newSum / MIN_BUDGET_BLOCK);
//       for (let i = 0; i < newBlocks; i++) {
//         const categoryBlockCount = partialBlocks.filter(
//           (block) => block.categoryId === category && block.fill === 1
//         ).length;

//         partialBlocks.push({
//           id: `residual-${category}-${categoryBlockCount}`,
//           color: getCategoryColor(category),
//           categoryId: category,
//           fill: 1,
//         });
//       }

//       // 남은 잔여 업데이트
//       const remainingAfterBlocks = newSum % MIN_BUDGET_BLOCK;
//       categoryResiduals.set(category, remainingAfterBlocks);
//     }
//   }

//   // 각 카테고리별 최종 부분 블록 생성
//   categoryResiduals.forEach((finalResidual: number, category: string) => {
//     if (finalResidual > 0) {
//       partialBlocks.push({
//         id: `residual-${category}-final`,
//         color: getCategoryColor(category),
//         categoryId: category,
//         fill: finalResidual / MIN_BUDGET_BLOCK,
//       });
//     }
//   });

//   return partialBlocks;
// };

// const getFullBlockByCategory = (
//   expensesInfo: RecentExpense[]
// ): ExpenseBlock[] => {
//   return expensesInfo.flatMap((expense) => {
//     const fullCount = Math.floor(expense.amount / MIN_BUDGET_BLOCK);
//     return Array.from({ length: fullCount }, (_, i) => ({
//       id: `${expense.id}-${i}`,
//       color: getCategoryColor(expense.category),
//       categoryId: expense.category,
//       fill: 1, // 100%
//     }));
//   });
// };

// // 블록 컬렉션 컴포넌트
// const BlockMonthlyExpense = memo<BlockMonthlyExpenseProps>(
//   ({ totalBlocks, maxBlocks, categoryInfo, expensesInfo }) => {
//     const fullBlocks = useMemo(() => {
//       return getFullBlockByCategory(expensesInfo);
//     }, [expensesInfo]);

//     const residualBlocks = useMemo(() => {
//       return getResidualBlocksByCategory(expensesInfo);
//     }, [expensesInfo]);

//     console.log("fullBlocks", fullBlocks);
//     console.log("residualBlocks", residualBlocks);

//     return (
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
//         {/* <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" /> */}

//         <div className=" z-10">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold text-lg text-gray-800">
//               이번 달 블록 컬렉션
//             </h2>
//             <div className="flex flex-row gap-2">
//               {/* 남은 공간 표시 */}
//               <div className="text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
//                 남은 공간: {maxBlocks - totalBlocks}칸
//               </div>
//               <div className="text-sm px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
//                 {totalBlocks}/{maxBlocks} 블록
//               </div>
//             </div>
//           </div>

//           <div className="  mb-4 bg-gray-50/50 rounded-xl  border-2 border-dashed border-gray-200">
//             {/* 그리드 배경 */}
//             <div
//               className=" opacity-20"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
//                 backgroundSize: "20px 20px",
//               }}
//             />

//             {/* 블록들 */}
//             <div className="flex flex-wrap content-start gap-1 overflow-visible">
//               {[...fullBlocks, ...residualBlocks].map((block, index) => (
//                 <div
//                   key={block.id}
//                   className="text-black w-8 h-8 rounded-sm shadow-sm relative overflow-hidden transform transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer hover:z-10"
//                   data-id={index + 1}
//                 >
//                   <div
//                     className=" h-full"
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

//           {/* 범례 */}
//           <div className="flex justify-center flex-wrap gap-4">
//             {categoryInfo.map(({ category, count }) => (
//               <div
//                 key={category}
//                 className="flex items-center group cursor-pointer"
//               >
//                 <div
//                   className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
//                   style={{
//                     backgroundColor: getCategoryColor(category),
//                   }}
//                 />
//                 <span className="text-xs text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
//                   {category} ({count}건)
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// BlockMonthlyExpense.displayName = "BlockExpense";

// export default BlockMonthlyExpense;
