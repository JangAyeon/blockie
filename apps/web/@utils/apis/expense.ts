import { ExpensePeriodProps, UpsertExpenseInput } from "../../@hook/useExpense";
import { YYYYMMDDtoISO } from "../date/YMD";

export interface ExpenseData {
  year: number;
  month: number;
  budget: number;
}

export type ExpenseRecord = {
  id: string;
  amount: number;
  category: string;
  expenseDate: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
};

export type ExpensesStatsResponse = {
  total: number;
  expenses: ExpenseRecord[];
};

export async function fetchExpenseStatus(
  year: string,
  month: string,
  day: string,
  type: ExpensePeriodProps,
  access_token: string
): Promise<ExpensesStatsResponse | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";
  const date = `${year}-${month}-${day.toString().padStart(2, "0")}`;

  console.log(
    "fetchExpenseStatus",
    `${baseUrl}/expenses/stats/${type}?date=${date}`
  );
  const res = await fetch(`${baseUrl}/expenses/stats/${type}?date=${date}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();
  if (!data) return null;
  return data;
}

export async function getExpense({
  access_token,
}: {
  access_token: string;
}): Promise<ExpenseRecord[] | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";

  const res = await fetch(`${baseUrl}/expenses`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();
  if (!data) {
    console.error("Failed to fetch expenses:", data);
    return null;
  }

  return data;
}

export async function createExpense({
  year,
  month,
  day,
  category,
  amount,
  access_token,
}: UpsertExpenseInput & {
  access_token: string;
}): Promise<ExpensesStatsResponse | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";

  const data = {
    amount,
    category,
    expenseDate: YYYYMMDDtoISO(year, month, day),
  };

  const res = await fetch(`${baseUrl}/expenses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function updateExpense({
  id,
  year,
  month,
  day,
  category,
  amount,
  access_token,
}: UpsertExpenseInput & {
  id: string;
  access_token: string;
}): Promise<ExpensesStatsResponse | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";

  const data = {
    amount,
    category,
    expenseDate: YYYYMMDDtoISO(year, month, day),
  };
  console.log("updateExpense", `${baseUrl}/expenses`);
  const res = await fetch(`${baseUrl}/expenses/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return res.json();
}
export async function deleteExpense({
  id,

  access_token,
}: {
  id: string;
  access_token: string;
}): Promise<ExpensesStatsResponse | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";

  console.log("updateExpense", `${baseUrl}/expenses`);
  const res = await fetch(`${baseUrl}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}
