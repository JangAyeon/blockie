import { LayoutProps } from "@type/layout";
import React from "react";

export default function PublicLayout({ children }: LayoutProps) {
  // 공개 페이지는 인증 체크 없음

  return (
    <div className="sm:bg-amber-200 md:bg-blue-700 lg:bg-emerald-700 xl:bg-fuchsia-700">
      {" "}
      {children}
    </div>
  );
}
