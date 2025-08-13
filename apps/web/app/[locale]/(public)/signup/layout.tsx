import React from "react";

export default async function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const cookieStore = await cookies();
  //   const access_token = cookieStore.get("access_token")?.value ?? null;
  //   console.log(cookieStore.getAll());
  //   if (!access_token) {
  //     return <div>No access token</div>;
  //   }

  return <>{children}</>;
}
