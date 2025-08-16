import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import Providers from "@provider/query/query.client.provider";
import { setRequestLocale } from "next-intl/server";
import "./globals.css";
import { RuntimeLogger } from "@utils/logger/runtimeLogger";
import { LocaleLayoutProps, LocaleParams } from "@type/layout";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // locale 검증
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // 정적 렌더링 활성화
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider>
          <Providers>
            {children}
            <RuntimeLogger />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
