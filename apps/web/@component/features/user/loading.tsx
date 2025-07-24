import { BlockieFace, BlockieBottom } from "@repo/ui";

// 로딩 컴포넌트
const Loading = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse">
        <BlockieFace size={120} emotion="neutral" />
        <BlockieBottom size={120} />
      </div>
      <p className="mt-4 text-gray-600">블록키가 정보를 가져오고 있어요...</p>
    </div>
  </div>
);

export default Loading;
