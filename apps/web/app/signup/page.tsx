"use client";

import { useState } from "react";
import { useSignUp } from "../../@hook/useAuth";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate: signUp, isPending } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10"
    >
      <input
        name="email"
        placeholder="이메일"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={isPending}>
        {isPending ? "회원가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
