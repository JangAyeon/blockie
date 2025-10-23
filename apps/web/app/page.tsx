// 스플래시 화면

import { BlockieFace, BlockieBottom } from "@repo/ui";

// 스플래시 화면
function SplashPage() {
  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center bg-white py-8">
      <div className="flex flex-col items-center">
        <BlockieFace size={140} emotion="happy" />
        <BlockieBottom size={140} />

        <h1 className="text-3xl font-bold mt-8 mb-2 text-[#1F2937]">Blockie</h1>
        <p className="text-[#4B5563] mb-2">오늘도 한 블럭, 지갑 방어 완료!</p>

        <div className="mt-12 w-full max-w-xs">
          <button className="w-full h-14 bg-blockie-yellow hover:bg-warning rounded-xl font-medium text-lg transition-all">
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
