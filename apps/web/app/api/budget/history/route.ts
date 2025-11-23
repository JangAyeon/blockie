import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  // Query parameters 추출
  const months = searchParams.get("months");
  const startYear = searchParams.get("startYear");
  const startMonth = searchParams.get("startMonth");
  const endYear = searchParams.get("endYear");
  const endMonth = searchParams.get("endMonth");

  // Query string 생성 (undefined 값은 제외)
  const queryParams = new URLSearchParams();

  if (months) queryParams.append("months", months);
  if (startYear) queryParams.append("startYear", startYear);
  if (startMonth) queryParams.append("startMonth", startMonth);
  if (endYear) queryParams.append("endYear", endYear);
  if (endMonth) queryParams.append("endMonth", endMonth);

  // 백엔드 API 호출
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/budget/history${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // 백엔드에서 오는 에러 응답을 그대로 전달
      const errorData = await res
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return NextResponse.json(
        {
          message: errorData.message || "Failed to fetch budget history",
          ...errorData,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Budget history API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
