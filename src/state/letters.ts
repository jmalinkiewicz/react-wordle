import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LettersState {
  grayLetters: string[];
  yellowLetters: string[];
  greenLetters: string[];
}

interface LettersActions {
  setGrayLetters: (grayLetters: string[]) => void;
  setYellowLetters: (yellowLetters: string[]) => void;
  setGreenLetters: (greenLetters: string[]) => void;
}

export const useLettersStore = create<LettersState & LettersActions>()(
  persist(
    (set) => ({
      grayLetters: [],
      yellowLetters: [],
      greenLetters: [],
      setGrayLetters: (grayLetters) => set({ grayLetters }),
      setYellowLetters: (yellowLetters) => set({ yellowLetters }),
      setGreenLetters: (greenLetters) => set({ greenLetters }),
    }),
    {
      name: "letters",
    }
  )
);
