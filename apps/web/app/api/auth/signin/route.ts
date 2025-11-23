// apps/web/app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { fetchSignIn } from "@utils/apis/services/sb.auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetchSignIn(body);

    const token = res.access_token;
    if (!token) {
      return NextResponse.json({ message: "토큰 없음" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    const cookieStore = await cookies();
    // 🔐 HttpOnly 쿠키로 저장
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60, // 1시간
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: `로그인 실패 ${err}` },
      { status: 500 }
    );
  }
}
