import { categoryConfig } from "@constant/expense";

export const getCategoryColor = (category: string): string => {
  return categoryConfig[category]?.color || "#9CA3AF";
};

export const getCategoryIcon = (category: string): string => {
  return categoryConfig[category]?.icon || "🔖";
};
