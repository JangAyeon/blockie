export type YMDWithString = {
  year: string;
  month: string;
  day: string;
  formatted: string; // "YYYY-MM-DD"
};

export const toYMDWithString = (date: Date): YMDWithString => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return {
    year,
    month,
    day,
    formatted: `${year}-${month}-${day}`,
  };
};

export const YYYYMMDDtoISO = (
  year: string,
  month: string,
  day: string
): string => {
  const isoString = new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
  return isoString;
};
