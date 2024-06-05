import "./App.css";
import { useState, useEffect } from "react";
import { dictionary } from "./words";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setSolution(dictionary[Math.floor(Math.random() * dictionary.length)]);
  }, []);

  useEffect(() => {
    function handleType(event: KeyboardEvent) {
      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key === "Enter") {
        if (currentGuess.length !== 5 || !dictionary.includes(currentGuess)) {
          console.log("Invalid guess");
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution.toLowerCase() === currentGuess.toLowerCase();
        if (isCorrect) {
          setIsGameOver(true);
        }
      }

      const isLetter = event.key.length === 1 && event.key.match(/[a-z]/i);
      if (currentGuess.length === 5 || isGameOver || !isLetter) {
        return;
      }
      setCurrentGuess((prev) => {
        return prev + event.key;
      });
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
      if (char.toLowerCase() === solution[i].toLowerCase()) {
        styling += "correct";
      } else if (solution.toLowerCase().includes(char.toLowerCase())) {
        styling += "wrong";
      } else {
        styling += "missing";
      }
    } else if (char) {
      styling += "border-black";
    }
    tiles.push(<div className={styling}>{char}</div>);
  }

  return <div className="flex justify-center gap-1">{tiles}</div>;
}

export default App;
