import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const { type } = await params;
  console.log("## GET", req.url, type, date);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses/stats/${type}?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ message: "인증 실패" }, { status: res.status });
  }

  const user = await res.json();
  return NextResponse.json(user);
}
