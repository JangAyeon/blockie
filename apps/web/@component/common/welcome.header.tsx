import { AUTH_DATA } from "@constant/auth.text";
import { BlockieFace } from "@repo/ui";

interface WelcomeHeaderProps {
  type: "signin" | "signup";
}

// const TEXT_DATA: Record<
//   WelcomeHeaderProps["type"],
//   { title: string; subTitle: string }
// > = {
//   signin: {
//     title: "다시 만나서 반가워요!",
//     subTitle: "로그인하고 블록을 쌓아볼까요?",
//   },
//   signup: {
//     title: "블로키와 함께 시작해요!",
//     subTitle: "재미있는 소비 관리의 첫 걸음",
//   },
// };

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ type }) => {
  const {
    welcome: { title, subTitle },
  } = AUTH_DATA[type];
  return (
    <div className="text-center flex flex-col gap-8 justify-center place-items-center">
      <BlockieFace size={80} />
      <div>
        <h2 className="text-title-1 text-neutral-black mb-2">{title}</h2>
        <p className="text-body-1 text-neutral-dark-gray"> {subTitle}</p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
