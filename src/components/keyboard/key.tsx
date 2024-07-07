import React from "react";
import { motion } from "framer-motion";
import { useWordleStore } from "../../state/wordle";

export default function Key({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "yellow" | "gray" | "default";
}) {
  const styling = {
    green: "bg-[#6aaa64] text-white",
    yellow: "bg-yellow-500 text-white",
    gray: "bg-gray-400 text-white",
    default: "bg-slate-200",
  }[color];

  const { currentGuess, isGameOver, setCurrentGuess } = useWordleStore();

  function handleClick() {
    const formattedLetter = children?.toString().toLowerCase();

    if (currentGuess.length === 5 || isGameOver) {
      return;
    }

    const newGuess = currentGuess + formattedLetter;
    setCurrentGuess(newGuess);
  }

  return (
    <motion.button
      whileTap={{
        scale: 0.9,
      }}
      onClick={handleClick}
      className={`p-4 w-12 uppercase font-bold rounded ${styling}`}
    >
      {children}
    </motion.button>
  );
}
