"use client";
// import { AUTH_DATA } from "@constant/_auth.text";
import { AuthTypeProps } from "@type/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const AuthSwitchLink: React.FC<AuthTypeProps> = ({ type }) => {
  const t = useTranslations("Auth");
  const { title, togoPageName, togoUrl } = {
    title: t(`${type}.title`),
    togoPageName: t(`${type}.togoPageName`),
    togoUrl: t(`${type}.togoUrl`),
  };
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="text-neutral-dark-gray text-body-2">
        {title}{" "}
        <button
          onClick={() => router.push(togoUrl)}
          className="text-neutral-black cursor-pointer font-medium hover:text-neutral-dark-gray transition-colors"
        >
          {togoPageName}
        </button>
      </div>
    </div>
  );
};

export default AuthSwitchLink;
