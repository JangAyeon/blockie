export const handleDateChangeBtn = (
  origin: string,
  type: "prev" | "next",
  year: string,
  month: string,
  router: any
) => {
  // 현재 년도와 월을 기준으로 Date 객체 생성
  // month - 1: JavaScript Date 객체는 월을 0부터 시작 (0=1월, 11=12월)
  // 1: 해당 월의 1일로 설정
  const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);

  if (type === "prev") {
    // 이전 월로 이동 (년도 경계 자동 처리)
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else if (type === "next") {
    // 다음 월로 이동 (년도 경계 자동 처리)
    currentDate.setMonth(currentDate.getMonth() + 1);
  } else {
    // 잘못된 타입이 전달된 경우 에러 처리
    alert("유효하지 않은 타입");
    return;
  }

  // 변경된 Date 객체에서 새로운 년도 추출
  const newYear = currentDate.getFullYear();
  // 변경된 Date 객체에서 새로운 월 추출
  // getMonth() + 1: JavaScript는 0부터 시작하므로 실제 월 번호로 변환 (1~12)
  const newMonth = currentDate.getMonth() + 1;

  // 현재 날짜 정보 (오늘)
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  let day;

  if (newYear < todayYear || (newYear === todayYear && newMonth < todayMonth)) {
    // 과거 월인 경우: 해당 월의 마지막 날
    day = new Date(newYear, newMonth, 0).getDate().toString().padStart(2, "0"); // 0을 넣으면 이전 달의 마지막 날
  } else if (newYear === todayYear && newMonth === todayMonth) {
    // 현재 월인 경우: 오늘 날짜
    day = todayDay.toString().padStart(2, "0");
  } else {
    // 미래 월인 경우: 해당 월의 첫 번째 날
    day = `1`.padStart(2, "0");
  }
  const MM = newMonth.toString().padStart(2, "0");
  // 새로운 년도, 월, 일로 페이지 이동
  console.log(`${origin}?year=${newYear}&month=${MM}&day=${day}`);
  router.push(`${origin}?year=${newYear}&month=${MM}&day=${day}`);
};
