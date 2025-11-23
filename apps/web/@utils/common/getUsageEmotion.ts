const getUsageEmotion = ({
  spent,
  budget,
}: {
  spent: number;
  budget: number;
}) => {
  const usageRate = (spent / budget) * 100;
  const usageEmotion: "happy" | "neutral" | "sad" =
    usageRate > 90 ? "sad" : usageRate > 70 ? "neutral" : "happy";

  return usageEmotion;
};

export default getUsageEmotion;
