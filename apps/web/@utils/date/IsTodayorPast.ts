export function isTodayOrPastYMD(dateStr: string): boolean {
  const inputDate = new Date(dateStr);
  const today = new Date();

  // 시간 정보를 제거하여 날짜만 비교
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate <= today;
}
