import "./App.css";
import { useState, useEffect } from "react";
import { accepctedWords, dictionary, polishDictionary } from "./words";
import { motion } from "framer-motion";
import { useLocalStorage } from "@uidotdev/usehooks";
import Line from "./components/line/line";
import Nav from "./components/nav/nav";
import Stats from "./components/panels/stats";
import Settings from "./components/panels/settings";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gamesPlayed, saveGamesPlayed] = useLocalStorage("gamesPlayed", 0);
  const [gamesWon, saveGamesWon] = useLocalStorage("gamesWon", 0);
  const [guessesMade, saveGuessesMade] = useLocalStorage("guessesMade", 0);
  const [uniqueGuesses, saveUniqueGuesses] = useLocalStorage<string[]>(
    "uniqueGueses",
    []
  );
  const [firstGuessList, saveFirstGuessList] = useLocalStorage<string[]>(
    "firstGuessList",
    []
  );
  const [languageMode, saveLanguageMode] = useLocalStorage<"en" | "pl">(
    "languageMode",
    "en"
  );
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (languageMode === "en") {
      setSolution(dictionary[Math.floor(Math.random() * dictionary.length)]);
    } else {
      setSolution(
        polishDictionary[Math.floor(Math.random() * polishDictionary.length)]
      );
    }
  }, []);

  useEffect(() => {
    console.log(currentGuess);

    function handleType(event: KeyboardEvent) {
      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key === "Enter") {
        if (languageMode === "en") {
          if (
            currentGuess.length !== 5 ||
            !accepctedWords.includes(currentGuess)
          ) {
            console.log("Invalid guess");
            return;
          }
        } else if (languageMode === "pl") {
          if (
            currentGuess.length !== 5 ||
            !polishDictionary.includes(currentGuess)
          ) {
            console.log("Invalid guess");
            return;
          }
        }
        if (0 === guesses.findIndex((val) => val == null)) {
          saveFirstGuessList([...firstGuessList, currentGuess]);
          saveGamesPlayed(gamesPlayed + 1);
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        saveGuessesMade(guessesMade + 1);
        if (!uniqueGuesses.includes(currentGuess)) {
          saveUniqueGuesses([...uniqueGuesses, currentGuess]);
        }
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          saveGamesWon(gamesWon + 1);
          setIsGameOver(true);
        }
      }

      let isLetter;
      if (languageMode === "en") {
        isLetter = event.key.length === 1 && event.key.match(/[a-z]/i);
      } else {
        isLetter = event.key.length === 1 && event.key.match(/[a-zżźćńółęąś]/i);
      }
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

  const countMap: { [key: string]: number } = {};

  firstGuessList.forEach((guess) => {
    if (countMap[guess]) {
      countMap[guess]++;
    } else {
      countMap[guess] = 1;
    }
  });

  let mostFrequent = firstGuessList[0];
  let maxCount = 0;

  for (const item in countMap) {
    if (countMap[item] > maxCount) {
      mostFrequent = item;
      maxCount = countMap[item];
    }
  }

  function resetGameState(lang?: "en" | "pl") {
    if (lang === "en") {
      setSolution(dictionary[Math.floor(Math.random() * dictionary.length)]);
    } else if (lang === "pl") {
      setSolution(
        polishDictionary[Math.floor(Math.random() * polishDictionary.length)]
      );
    }
    setGuesses(Array(6).fill(null));
    setCurrentGuess("");
    setIsGameOver(false);
  }

  return (
    <>
      <Nav
        showStats={showStats}
        setShowStats={setShowStats}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <main className="max-w-screen-xl m-auto mt-24">
        <h1 className="font-serif text-center text-4xl font-bold text-lime-800">
          Wordle
        </h1>
        {/* board */}
        <div className="mt-16 flex flex-col gap-1 relative">
          <Stats
            gamesPlayed={gamesPlayed}
            gamesWon={gamesWon}
            guessesMade={guessesMade}
            uniqueGuesses={uniqueGuesses}
            mostFrequent={mostFrequent}
            maxCount={maxCount}
            showStats={showStats}
          />
          <Settings
            showSettings={showSettings}
            languageMode={languageMode}
            saveLanguageMode={saveLanguageMode}
            resetGameState={resetGameState}
          />
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
                resetGameState(languageMode);
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

export default App;
