import { CategoryDoughnutChartDataProps } from "@type/expense";
import { motion } from "framer-motion";
import { FC } from "react";
import { Doughnut } from "react-chartjs-2";

interface CategoryDoughnutChartProps {
  data: CategoryDoughnutChartDataProps;
}

const DOUGHNUT_OPTIONS = {
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 2000,
  },
};

const CategoryDoughnutChart: FC<CategoryDoughnutChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="h-60 mb-6 relative"
    >
      <Doughnut data={data} options={DOUGHNUT_OPTIONS} />
    </motion.div>
  );
};

export default CategoryDoughnutChart;
