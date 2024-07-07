import { color } from "framer-motion";
import { useLettersStore } from "../../state/letters";
import { useWordleStore } from "../../state/wordle";
import Key from "./key";
import { useEffect } from "react";
import BackspaceIcon from "../icons/backspace";
import { accepctedWords, polishDictionary } from "../../words";

export default function Keyboard() {
  const language = useWordleStore((state) => state.languageMode);
  const { grayLetters, yellowLetters, greenLetters } = useLettersStore();
  const {
    currentGuess,
    setCurrentGuess,
    guesses,
    setFirstGuessList,
    firstGuessList,
    setGamesPlayed,
    gamesPlayed,
    setGuesses,
    setGuessesMade,
    guessesMade,
    uniqueGuesses,
    setUniqueGuesses,
    solution,
    gamesWon,
    setGamesWon,
    setIsGameOver,
  } = useWordleStore();

  useEffect(() => {}, [grayLetters, yellowLetters, greenLetters]);

  const row0 = "ĄĆĘŁÓŚŃŻŹ".split("");
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  const getLetterColor = (letter: string) => {
    if (greenLetters.includes(letter)) return "green";
    if (yellowLetters.includes(letter)) return "yellow";
    if (grayLetters.includes(letter)) return "gray";
    return "default"; // No color
  };

  function handleEnter() {
    if (language === "pl") {
      if (
        currentGuess.length !== 5 ||
        !polishDictionary.includes(currentGuess)
      ) {
        return;
      }
    } else if (
      currentGuess.length !== 5 ||
      !accepctedWords.includes(currentGuess)
    ) {
      return;
    }

    if (0 === guesses.findIndex((val) => val == null)) {
      setFirstGuessList([...firstGuessList, currentGuess]);
      setGamesPlayed(gamesPlayed + 1);
    }

    const newGuesses = [...guesses];
    newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
    setGuesses(newGuesses);
    setGuessesMade(guessesMade + 1);
    if (!uniqueGuesses.includes(currentGuess)) {
      setUniqueGuesses([...uniqueGuesses, currentGuess]);
    }
    setCurrentGuess("");

    const isCorrect = solution === currentGuess;
    if (isCorrect) {
      setGamesWon(gamesWon + 1);
      setIsGameOver(true);
    }
  }

  function handleBackspace() {
    const newCurrentGuess = currentGuess.slice(0, -1);
    setCurrentGuess(newCurrentGuess);
  }

  return (
    <div className="flex flex-col pb-8">
      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="flex gap-1">
          {language === "pl" &&
            row0.map((letter) => {
              const formattedLetter = letter.toLowerCase();
              const color = getLetterColor(formattedLetter);

              return <Key color={color}>{letter}</Key>;
            })}
        </div>
        <div className="flex gap-1">
          {row1.map((letter) => {
            const formattedLetter = letter.toLowerCase();
            const color = getLetterColor(formattedLetter);

            return <Key color={color}>{letter}</Key>;
          })}
        </div>
        <div className="flex gap-1">
          {row2.map((letter) => {
            const formattedLetter = letter.toLowerCase();
            const color = getLetterColor(formattedLetter);

            return <Key color={color}>{letter}</Key>;
          })}
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleEnter}
            className="p-4 text-xs bg-slate-200 uppercase font-bold rounded"
          >
            ENTER
          </button>
          {row3.map((letter) => {
            const formattedLetter = letter.toLowerCase();
            const color = getLetterColor(formattedLetter);

            return <Key color={color}>{letter}</Key>;
          })}
          <button
            onClick={handleBackspace}
            className="p-4 text-xs w-16 flex justify-center bg-slate-200 uppercase font-bold rounded"
          >
            <BackspaceIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
