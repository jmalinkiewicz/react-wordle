import "./App.css";
import { useState, useEffect } from "react";
import { accepctedWords, dictionary } from "./words";
import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorage } from "@uidotdev/usehooks";
import { evaluateGuess } from "./helpers";
import ChartBarsFilledIcon from "./components/icons/chartBarsFilled";
import ChartBarsOutlineIcon from "./components/icons/chartBarsOutline";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gamesPlayed, saveGamesPlayed] = useLocalStorage("gamesPlayed", 0);
  const [gamesWon, saveGamesWon] = useLocalStorage("gamesWon", 0);
  const [guessesMade, saveGuessesMade] = useLocalStorage("guessesMade", 0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setSolution(dictionary[Math.floor(Math.random() * dictionary.length)]);
    saveGamesPlayed(gamesPlayed + 1);
  }, []);

  useEffect(() => {
    console.log(currentGuess);

    function handleType(event: KeyboardEvent) {
      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key === "Enter") {
        if (
          currentGuess.length !== 5 ||
          !accepctedWords.includes(currentGuess)
        ) {
          console.log("Invalid guess");
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        saveGuessesMade(guessesMade + 1);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          saveGamesWon(gamesWon + 1);
          setIsGameOver(true);
        }
      }

      const isLetter = event.key.length === 1 && event.key.match(/[a-z]/i);
      if (currentGuess.length === 5 || isGameOver || !isLetter) {
        return;
      }
      setCurrentGuess((prev) => {
        return prev + event.key.toLowerCase();
      });
    }
    if (isGameOver || guesses.every((val) => val != null)) {
      setIsGameOver(true);
      return;
    }

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, guesses]);

  return (
    <>
      <button
        className="absolute top-4 right-4 p-2 bg-lime-800 text-white rounded-full"
        onClick={() => {
          setShowStats((prev) => !prev);
        }}
      >
        {showStats ? <ChartBarsFilledIcon /> : <ChartBarsOutlineIcon />}
      </button>
      <main className="max-w-screen-xl m-auto mt-24">
        <h1 className="font-serif text-center text-4xl font-bold text-lime-800">
          Wordle
        </h1>
        {/* board */}
        <div className="mt-16 flex flex-col gap-1 relative">
          <AnimatePresence>
            {showStats && (
              <motion.div
                className="absolute inset-0 p-4 bg-lime-800 text-white rounded-lg flex flex-col "
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
              >
                <h2 className="text-center text-2xl font-bold">Stats</h2>
                <table className="mt-6 table-auto w-full bg-green-100 text-black">
                  <tbody>
                    <tr className="odd:bg-green-200">
                      <td>Games Played:</td>
                      <td>{gamesPlayed}</td>
                    </tr>
                    <tr className="odd:bg-green-200">
                      <td>Games Won</td>
                      <td>{gamesWon}</td>
                    </tr>
                    <tr className="odd:bg-green-200">
                      <td>Total Guesses</td>
                      <td>{guessesMade}</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
          {guesses.map((guess, index) => {
            const isCurrentGuess =
              index === guesses.findIndex((val) => val == null);
            return (
              <Line
                key={index}
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
                isFinal={!isCurrentGuess && guess != null}
                solution={solution}
              />
            );
          })}
        </div>
        {isGameOver && (
          <motion.div
            className="flex flex-col items-center gap-4 mt-12"
            animate={{
              scale: [0, 1],
            }}
          >
            <h2 className="text-center text-2xl">
              The word was{" "}
              <span className="text-lime-800 font-bold">{solution}</span>
            </h2>
            <motion.button
              whileHover={{
                textDecoration: "underline",
              }}
              onClick={() => {
                setSolution(
                  dictionary[Math.floor(Math.random() * dictionary.length)]
                );
                setGuesses(Array(6).fill(null));
                setCurrentGuess("");
                setIsGameOver(false);
                saveGamesPlayed(gamesPlayed + 1);
              }}
              className="font-bold text-lime-800"
            >
              play again
            </motion.button>
          </motion.div>
        )}
      </main>
    </>
  );
}

function Line({
  guess,
  isFinal,
  solution,
}: {
  guess: string;
  isFinal: boolean;
  solution: string;
}) {
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

export default App;
