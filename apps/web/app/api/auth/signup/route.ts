import { NextRequest, NextResponse } from "next/server";
import { fetchSignUp } from "@utils/apis/services/sb.auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetchSignUp(body);
  const token = res.access_token;

  if (!token) {
    return NextResponse.json({ message: "토큰 없음" }, { status: 401 });
  }

  // access_token 쿠키 저장
  const response = NextResponse.json({ success: true });
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60, // 1시간
  });

  return response;
}
