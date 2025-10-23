"use client";

import { useState } from "react";
import { useSignIn } from "../../@hook/useAuth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError, error } = useSignIn();

  const handleLogin = () => {
    mutate({ email, password });
  };

  return (
    <div className="flex text-black items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-custom-blue">
          로그인
        </h2>
        <div>test1@example.com // testDEV1234!</div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>

          {isError && (
            <p className="text-red-500 text-sm mt-2">
              로그인에 실패했습니다. 다시 시도해주세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
