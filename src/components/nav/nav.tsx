import { motion } from "framer-motion";
import ChartBarsFilledIcon from "../icons/chartBarsFilled";
import ChartBarsOutlineIcon from "../icons/chartBarsOutline";
import CogFilledIcon from "../icons/cogFilled";
import CogOutlineIcon from "../icons/cogOutline";

type Props = {
  showStats: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav({
  showStats,
  setShowStats,
  showSettings,
  setShowSettings,
}: Props) {
  return (
    <div className="absolute top-4 right-4 flex gap-3">
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
        className="p-2 bg-lime-800 text-white rounded-full"
        onClick={(e) => {
          setShowSettings((prev: boolean) => !prev);
          setShowStats(false);
          e.currentTarget.blur();
        }}
      >
        {showSettings ? <CogFilledIcon /> : <CogOutlineIcon />}
      </motion.button>
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
        className="p-2 bg-lime-800 text-white rounded-full"
        onClick={(e) => {
          setShowStats((prev: boolean) => !prev);
          setShowSettings(false);
          e.currentTarget.blur(); // This line removes focus from the button after clicking
        }}
      >
        {showStats ? <ChartBarsFilledIcon /> : <ChartBarsOutlineIcon />}
      </motion.button>
    </div>
  );
}
