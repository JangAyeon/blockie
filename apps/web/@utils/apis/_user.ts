import { AuthUser } from "@repo/types";

// export async function fetchUserProfile(
//   access_token: string
// ): Promise<AuthUser> {
//   const baseUrl = access_token
//     ? process.env.NEXT_API_BASE_URL || "http://localhost:3030"
//     : "/api";
//   const res = await fetch(`${baseUrl}/users/me`, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   if (!res.ok) throw new Error("Failed to fetch user profile");
//   return res.json();
// }

// export async function updateUserProfile(
//   data: Pick<AuthUser, "name" | "email" | "phone">
// ): Promise<AuthUser> {
//   const res = await fetch(`/api/users/me`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include", // access_token 쿠키로 전달
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error("Failed to fetch user profile");
//   return res.json();
// }
