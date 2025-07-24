export const BudgetPageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    // transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
    opacity: 0,
    // transition: { duration: 0.2 },
  }),
};

export const DoughnutOptionsAnimation = {
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  },
  cutout: "70%",
  maintainAspectRatio: false,
};

export const BarOptionsAnimation = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "최근 4개월 예산 비교",
    },
  },
  responsive: true,
  // scales: {
  //   x: {
  //     grid: {
  //       display: false,
  //     },
  //   },
  //   y: {
  //     grid: {
  //       display: true,
  //       color: "rgba(0, 0, 0, 0.05)",
  //     },
  //     ticks: {
  //       callback: function (value: number) {
  //         return value.toLocaleString() + "원";
  //       },
  //     },
  //   },
  // },
  maintainAspectRatio: false,
};
