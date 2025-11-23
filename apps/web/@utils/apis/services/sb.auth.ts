import {
  SupabaseSignInRequest,
  SupabaseSignUpRequest,
  SupabaseSignInResponse,
  SupabaseSignUpResponse,
} from "@repo/types";
import { ApiRoute } from "@constant/api.route";

export const fetchSignIn = async (
  data: SupabaseSignInRequest
): Promise<SupabaseSignInResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiRoute.auth.SIGN_IN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("로그인 실패");
  return res.json();
};

export const fetchSignUp = async (
  data: SupabaseSignUpRequest
): Promise<SupabaseSignUpResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiRoute.auth.SIGN_UP}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("회원가입 실패");
  return res.json();
};
