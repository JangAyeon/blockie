import { BlockieFace } from "@repo/ui";

const WelcomeHeader = () => {
  return (
    <div className="text-center flex flex-col gap-8 justify-center place-items-center">
      <BlockieFace size={80} />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          다시 만나서 반가워요!
        </h2>
        <p className="text-gray-600">로그인하고 블록을 쌓아볼까요?</p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
