// "use client";

// import React from "react";

// import { ExpenseItem } from "./_expenseItem";
// import { ExpensePeriodProps, useExpensesStatus } from "@hook/useExpense";

// export function ExpenseList({
//   selectedDate,
//   filterType,
// }: {
//   selectedDate: string;
//   filterType: ExpensePeriodProps;
// }) {
//   const { data, isLoading, isError } = useExpensesStatus(
//     filterType,
//     selectedDate.slice(0, 4),
//     selectedDate.slice(5, 7),
//     selectedDate.slice(8, 10)
//   );

//   console.log("ExpenseList data:", data);

//   if (isLoading) return <div>로딩 중...</div>;
//   if (isError) return <div>지출 정보를 불러오지 못했습니다.</div>;

//   return (
//     <div className="my-4">
//       <h3 className="border-t-2 text-lg font-semibold mb-2">
//         지출 내역 ({filterType})
//       </h3>
//       {data?.expenses?.length === 0 ? (
//         <p className="text-gray-500">지출 내역이 없습니다.</p>
//       ) : (
//         <ul className="space-y-2">
//           <div>{data?.total} 원</div>
//           {data?.expenses?.map((exp: any) => (
//             <ExpenseItem key={exp.id} expense={exp} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
