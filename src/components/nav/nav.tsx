import { motion } from "framer-motion";
import ChartBarsFilledIcon from "../icons/chartBarsFilled";
import ChartBarsOutlineIcon from "../icons/chartBarsOutline";

export default function Nav({
  showStats,
  setShowStats,
}: {
  showStats: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.button
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="absolute top-4 right-4 p-2 bg-lime-800 text-white rounded-full"
      onClick={(e) => {
        setShowStats((prev: boolean) => !prev);
        e.currentTarget.blur(); // This line removes focus from the button after clicking
      }}
    >
      {showStats ? <ChartBarsFilledIcon /> : <ChartBarsOutlineIcon />}
    </motion.button>
  );
}
