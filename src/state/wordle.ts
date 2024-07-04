import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WordleState {
  solution: string;
  guesses: string[];
  currentGuess: string;
  isGameOver: boolean;
  gamesPlayed: number;
  gamesWon: number;
  guessesMade: number;
  uniqueGuesses: string[];
  firstGuessList: string[];
  languageMode: "en" | "pl";
}

interface WordleActions {
  setSolution: (solution: string) => void;
  setGuesses: (guesses: string[]) => void;
  setCurrentGuess: (currentGuess: string) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setGamesPlayed: (gamesPlayed: number) => void;
  setGamesWon: (gamesWon: number) => void;
  setGuessesMade: (guessesMade: number) => void;
  setUniqueGuesses: (uniqueGuesses: string[]) => void;
  setFirstGuessList: (firstGuessList: string[]) => void;
  setLanguageMode: (languageMode: "en" | "pl") => void;
}

export const useWordleStore = create<WordleState & WordleActions>()(
  persist(
    (set) => ({
      // state
      solution: "",
      guesses: Array(6).fill(null),
      currentGuess: "",
      isGameOver: false,
      gamesPlayed: 0,
      gamesWon: 0,
      guessesMade: 0,
      uniqueGuesses: [],
      firstGuessList: [],
      languageMode: "en",
      // actions
      setSolution: (solution) => set({ solution }),
      setGuesses: (guesses) => set({ guesses }),
      setCurrentGuess: (currentGuess) => set({ currentGuess }),
      setIsGameOver: (isGameOver) => set({ isGameOver }),
      setGamesPlayed: (gamesPlayed) => set({ gamesPlayed }),
      setGamesWon: (gamesWon) => set({ gamesWon }),
      setGuessesMade: (guessesMade) => set({ guessesMade }),
      setUniqueGuesses: (uniqueGuesses) => set({ uniqueGuesses }),
      setFirstGuessList: (firstGuessList) => set({ firstGuessList }),
      setLanguageMode: (languageMode) => set({ languageMode }),
    }),
    {
      name: "wordle-storage",
    }
  )
);
