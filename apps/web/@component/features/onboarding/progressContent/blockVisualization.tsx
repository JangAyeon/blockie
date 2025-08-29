interface BlockVisualizationProps {
  blockData: {
    actualBlocks: number;
    restBlocks: number;
    isOverflow: boolean;
    totalBlocks: number;
  };
}

const BlockVisualization: React.FC<BlockVisualizationProps> = ({
  blockData,
}) => {
  const { totalBlocks, actualBlocks, restBlocks, isOverflow } = blockData;

  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-xl   bg-neutral-off-white"
      // style={{ backgroundColor: colors.offWhite }}
    >
      <div
        className="text-sm font-medium text-neutral-black"
        // style={{ color: colors.black }}
      >
        {totalBlocks || 0}개의 블록이 쌓입니다!
      </div>

      {totalBlocks > 0 && (
        <div className="flex flex-wrap items-start justify-start space-x-1 max-h-96 overflow-y-scroll bg-neutral-off-white">
          {Array.from({
            length: actualBlocks,
          }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-sm mb-1 bg-blockie-pink"
              // style={{ backgroundColor: colors.yellow }}
            >
              {/* {i} */}
            </div>
          ))}
        </div>
      )}
      {isOverflow && (
        <div
          className="text-sm ml-2 text-neutral-dark-gray"
          // style={{ color: colors.darkGray }}
        >
          +{restBlocks}
          개의 블록이 더 있어요
        </div>
      )}
    </div>
  );
};

export default BlockVisualization;
