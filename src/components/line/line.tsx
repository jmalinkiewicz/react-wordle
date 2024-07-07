import { motion } from "framer-motion";
import { useLettersStore } from "../../state/letters";

type Props = {
  guess: string;
  isFinal: boolean;
  solution: string;
};

export default function Line({ guess, isFinal, solution }: Props) {
  const {
    greenLetters,
    setGreenLetters,
    setGrayLetters,
    grayLetters,
    setYellowLetters,
    yellowLetters,
  } = useLettersStore();

  function evaluateGuess(
    solution: string,
    guess: string
  ): ("correct" | "wrong" | "missing")[] {
    let result: ("correct" | "wrong" | "missing")[] = new Array(
      guess.length
    ).fill("missing");
    let solutionCopy = solution.split("");
    let guessCopy = guess.split("");

    // First pass: Mark correct matches and update greenLetters
    guessCopy.forEach((char, i) => {
      if (char === solution[i]) {
        result[i] = "correct";
        solutionCopy[i] = "*"; // Mark as used in solution
        guessCopy[i] = "!"; // Mark as used in guess

        // Add to greenLetters if not already present
        if (!greenLetters.includes(char)) {
          setGreenLetters([...greenLetters, char]);
        }
      }
    });

    // Second pass: Mark wrong and missing
    guessCopy.forEach((char, i) => {
      if (char !== "!") {
        if (solutionCopy.includes(char)) {
          // Check if not already used
          result[i] = "wrong";
          solutionCopy[solutionCopy.indexOf(char)] = "*"; // Mark as used in solution

          // Add to yellowLetters if not already present
          if (!yellowLetters.includes(char)) {
            setYellowLetters([...yellowLetters, char]);
          }
        } else {
          // If the letter is not in the solution at all
          if (
            !greenLetters.includes(char) &&
            !yellowLetters.includes(char) &&
            !grayLetters.includes(char)
          ) {
            setGrayLetters([...grayLetters, char]);
          }
        }
      }
    });

    return result;
  }

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
