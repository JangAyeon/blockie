import { BlockieBottom, BlockieFace } from "@repo/ui";

// 에러 컴포넌트
const Error = ({ errors }: { errors: any }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
      <BlockieFace size={80} emotion="sad" />
      <BlockieBottom size={80} />
      <h2 className="text-xl font-bold text-red-600 mt-4">
        오류가 발생했습니다
      </h2>
      <p className="text-gray-600 mt-2">페이지를 새로고침해 주세요.</p>
      {process.env.NODE_ENV === "development" && (
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-red-500">에러 상세</summary>
          <pre className="text-xs mt-2 bg-gray-100 p-2 rounded">
            {JSON.stringify(errors, null, 2)}
          </pre>
        </details>
      )}
    </div>
  </div>
);

export default Error;
