"use client";

import { useState } from "react";

import {
  useLogout,
  useUpdateUserProfile,
  useUserProfile,
} from "../@hook/useAuth";

export type userFormData = {
  name: string;
  email: string;
  phone: string;
};

export default function UserProfile() {
  const { mutate: handleLogout } = useLogout();
  const { data, isLoading, isError } = useUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();

  const [formData, setFormData] = useState<userFormData>({
    name: data?.name ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>에러 발생</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">내 프로필</h1>
      <div className="flex flex-col gap-2">
        <div>
          <label>이름</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>전화번호</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isPending ? "저장 중..." : "저장"}
        </button>
      </div>

      <button onClick={() => handleLogout()}>로그아웃</button>
    </div>
  );
}
