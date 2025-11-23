import { BlockieFace } from "@repo/ui";
import { useTranslations } from "next-intl";

interface WelcomeHeaderProps {
  type: "signin" | "signup";
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ type }) => {
  const t = useTranslations("Auth");

  // 구조분해 할당으로 한번에 가져오기
  const { welcomeTitle, welcomeSubTitle } = {
    welcomeTitle: t(`${type}.welcomeTitle`),
    welcomeSubTitle: t(`${type}.welcomeSubTitle`),
  };

  return (
    <div className="text-center flex flex-col gap-8 justify-center place-items-center">
      <BlockieFace size={80} />
      <div>
        <h2 className="text-title-1 text-neutral-black mb-2">{welcomeTitle}</h2>
        <p className="text-body-1 text-neutral-dark-gray"> {welcomeSubTitle}</p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
