import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [solution] = useState("stars");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    function handleType(event: KeyboardEvent) {
      setCurrentGuess((prev) => {
        return prev + event.key;
      });
    }

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  });

  return (
    <>
      <main className="max-w-screen-xl m-auto mt-24">
        <h1 className="font-serif text-center text-4xl font-bold text-lime-800">
          Wordle
        </h1>
        {currentGuess}
        {/* board */}
        <div className="mt-16 flex flex-col gap-1">
          {guesses.map((guess, index) => {
            const isCurrentGuess =
              index === guesses.findIndex((val) => val == null);
            return (
              <Line
                key={index}
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

function Line({ guess }: { guess: string }) {
  let tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    tiles.push(
      <div className="h-14 w-14 border-[2px] border-gray-400 uppercase text-2xl flex items-center justify-center font-bold">
        {char}
      </div>
    );
  }

  return <div className="flex justify-center gap-1">{tiles}</div>;
}

export default App;
