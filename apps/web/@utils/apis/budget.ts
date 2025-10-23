// lib/api/budget.ts
export interface BudgetData {
  year: number;
  month: number;
  budget: number;
  hasBudget: boolean;
  remaining: number;
  spent: number;
}

export async function fetchBudgetStatus(
  year: number,
  month: number,
  access_token: string
): Promise<BudgetData | null> {
  const baseUrl = access_token
    ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
    : "/api";
  const res = await fetch(
    `${baseUrl}/budget/status?year=${year}&month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function upsertBudget(data: {
  year: BudgetData["year"];
  month: BudgetData["month"];
  amount: BudgetData["budget"];
}) {
  const res = await fetch(`/api/budget`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save budget");
  return res.json();
}
