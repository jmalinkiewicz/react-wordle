import "./App.css";
import { useState, useEffect } from "react";
import { accepctedWords, dictionary } from "./words";
import { motion } from "framer-motion";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setSolution(dictionary[Math.floor(Math.random() * dictionary.length)]);
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
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
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
      <main className="max-w-screen-xl m-auto mt-24">
        <h1 className="font-serif text-center text-4xl font-bold text-lime-800">
          Wordle
        </h1>
        {/* board */}
        <div className="mt-16 flex flex-col gap-1">
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

  for (let i = 0; i < 5; i++) {
    let styling = "tile ";
    const char = guess[i];

    if (isFinal) {
      if (char === solution[i]) {
        styling += "correct";
      } else if (solution.includes(char)) {
        styling += "wrong";
      } else {
        styling += "missing";
      }
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
