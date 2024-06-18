import { motion } from "framer-motion";
import { evaluateGuess } from "../../helpers";

type Props = {
  guess: string;
  isFinal: boolean;
  solution: string;
};

export default function Line({ guess, isFinal, solution }: Props) {
  let tiles = [];

  const evaluation = isFinal ? evaluateGuess(solution, guess) : [];

  for (let i = 0; i < 5; i++) {
    let styling = "tile ";
    const char = guess[i];

    if (isFinal) {
      // Use the evaluation result to set the styling
      styling += evaluation[i];
    } else if (char) {
      styling += "border-black";
    }
    tiles.push(
      <motion.div
        animate={{
          scale: char ? [1.1, 1] : 1,
        }}
        className={styling}
      >
        {char}
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{
        scale: isFinal ? [0.5, 1] : 1,
      }}
      className="flex justify-center gap-1"
    >
      {tiles}
    </motion.div>
  );
}
