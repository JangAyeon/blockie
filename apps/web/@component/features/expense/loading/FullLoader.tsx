import { BlockieFace, BlockieBottom } from "@repo/ui";

const FullLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <BlockieFace size={60} emotion="neutral" />
        <BlockieBottom size={60} />
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">
        지출 정보를 불러오는 중...
      </p>
    </div>
  );
};

export default FullLoader;
