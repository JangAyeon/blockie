// "use client";

// import {
//   useCreateExpense,
//   useUpdateExpense,
//   UpsertExpenseInput,
// } from "@hook/useExpense";
// import { isTodayOrPastYMD } from "@utils/date/IsTodayorPast";
// import React, { ChangeEvent, useState } from "react";

// export function ExpenseForm({ selectedDate }: { selectedDate: string }) {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [year, setYear] = useState(selectedDate.slice(0, 4));
//   const [month, setMonth] = useState(selectedDate.slice(5, 7));
//   const [day, setDay] = useState(selectedDate.slice(8, 10));
//   // const [expenseDate, setExpenseDate] = useState(selectedDate);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [errorMsg, setErrorMsg] = useState("");

//   const { mutate: create } = useCreateExpense();
//   const { mutate: update } = useUpdateExpense();

//   const isValidForm = (data: UpsertExpenseInput) => {
//     const { amount, year, month, day } = data;
//     const expenseDate = `${year}-${month}-${day}`;
//     if (amount <= 0) {
//       setErrorMsg("amount가 0 이하입니다.");
//       return false;
//     }
//     if (!isTodayOrPastYMD(expenseDate)) {
//       setErrorMsg("미래의 날짜 입니다.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = () => {
//     const data = {
//       amount: Number(amount),
//       category,
//       year: selectedDate.slice(0, 4),
//       month: selectedDate.slice(5, 7),
//       day: selectedDate.slice(8, 10),
//     };
//     console.log(data);
//     if (!isValidForm(data)) {
//       return;
//     }
//     if (editingId) {
//       update({ id: editingId, data });
//       setEditingId(null);
//     } else {
//       create(data);
//     }
//     setAmount("");
//     setCategory("");
//   };

//   const changeExpenseAmount = (event: ChangeEvent<HTMLInputElement>) => {
//     const input = event.target as HTMLInputElement;
//     const value = input.value.replace(/[^0-9]/g, "");

//     input.value = value;
//     setAmount(value);
//   };

//   // TODO: 리스트 아이템과 연결해서 수정하기 연결
//   return (
//     <>
//       <div className="mb-4 space-y-2 ">
//         <div>지출 입력 폼</div>
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => {
//             changeExpenseAmount(e);
//           }}
//           placeholder="금액"
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="카테고리"
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="year"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           placeholder="년도"
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="text"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           placeholder="달"
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="text"
//           value={day}
//           onChange={(e) => setDay(e.target.value)}
//           placeholder="일"
//           className="w-full border rounded px-3 py-2"
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {editingId ? "수정하기" : "추가하기"}
//         </button>
//       </div>
//       <div>{errorMsg}</div>
//     </>
//   );
// }
