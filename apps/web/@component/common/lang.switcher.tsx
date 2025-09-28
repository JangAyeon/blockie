"use client";
import { useRouter, usePathname } from "@i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const switchLanguage = (newLocale: string) => {
    // 현재 쿼리 파라미터를 유지하면서 언어 변경
    const params = new URLSearchParams(searchParams).toString();
    const pathWithParams = params ? `${pathname}?${params}` : pathname;

    router.push(pathWithParams, { locale: newLocale });
    setShowLanguageOptions(false);
  };

  const handleLanguageButtonClick = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <div className="fixed bottom-6 left-0 z-50">
      <div className="flex flex-col justify-center gap-3 px-6">
        {/* 언어 옵션들 */}
        {showLanguageOptions && (
          <div className="flex flex-col gap-2 animate-slide-up">
            {languages
              .filter((lang) => lang.code !== locale) // 현재 언어 제외
              .map((lang) => (
                <button
                  key={lang.code}
                  className="btn-base w-12 h-12 bg-white hover:bg-gray-100 border border-gray-200 rounded-full shadow-lg hover-lift animate-button-press flex items-center justify-center text-sm"
                  aria-label={`Switch to ${lang.name}`}
                  onClick={() => switchLanguage(lang.code)}
                >
                  <span className="text-lg">{lang.flag}</span>
                </button>
              ))}
          </div>
        )}

        {/* 언어 선택 메인 버튼 */}
        <button
          className={`btn-base w-12 h-12 bg-white hover:bg-gray-100 border border-gray-200 rounded-full shadow-lg hover-lift animate-button-press transition-transform duration-200 ${
            showLanguageOptions ? "rotate-180" : ""
          } flex items-center justify-center`}
          aria-label="언어 선택"
          onClick={handleLanguageButtonClick}
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
        </button>
      </div>
    </div>
  );
}
