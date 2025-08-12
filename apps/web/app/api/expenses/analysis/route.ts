import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  // URL에서 쿼리스트링 추출
  const { searchParams } = new URL(request.url);

  // 쿼리스트링을 문자열로 변환
  const queryString = searchParams.size ? `?${searchParams.toString()}` : "";

  // API URL 구성 (쿼리스트링이 있으면 붙이기)
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses/analysis${queryString}`;
  const res = await fetch(`${apiUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ message: "인증 실패" }, { status: res.status });
  }

  const user = await res.json();
  return NextResponse.json(user);
}
