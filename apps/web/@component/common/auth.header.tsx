// import { AUTH_DATA } from "@constant/auth.text";
import { AuthTypeProps } from "@type/auth";
import { useTranslations } from "next-intl";

const AuthHeader: React.FC<AuthTypeProps> = ({ type }) => {
  const t = useTranslations("Auth");
  const headerTitle = t(`${type}.headerTitle`);

  return (
    <header className="px-4 md:px-6 py-4 flex items-center">
      <div className="flex-1 text-center">
        <h1 className="text-title-2 text-neutral-black">{headerTitle}</h1>
      </div>
    </header>
  );
};
export default AuthHeader;
