import { motion, AnimatePresence } from "framer-motion";
import { useWordleStore } from "../../state/wordle";

export default function Stats({ showStats }: { showStats: boolean }) {
  const { gamesPlayed, gamesWon, guessesMade, uniqueGuesses, firstGuessList } =
    useWordleStore();

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

  return (
    <AnimatePresence>
      {showStats && (
        <motion.div
          className="absolute z-50 inset-0 p-4 bg-lime-800 text-white rounded-lg flex flex-col gap-8 "
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
          <table className="border-collapse table-auto w-full text-sm bg-lime-950 text-white rounded">
            <thead>
              <tr>
                <td className="py-2 pl-4 font-bold">Statistic</td>
                <td className="py-2 font-bold">Value</td>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-lime-900">
                <td className="py-2 pl-4">Games Played:</td>
                <td className="py-2">{gamesPlayed}</td>
              </tr>
              <tr className="odd:bg-lime-900">
                <td className="py-2 pl-4">Games Won:</td>
                <td className="py-2">{gamesWon}</td>
              </tr>
              <tr className="odd:bg-lime-900">
                <td className="py-2 pl-4">Total Guesses:</td>
                <td className="py-2">{guessesMade}</td>
              </tr>
              <tr className="odd:bg-lime-900">
                <td className="py-2 pl-4">Unique Guesses:</td>
                <td className="py-2">{uniqueGuesses.length}</td>
              </tr>
              <tr className="odd:bg-lime-900">
                <td className="py-2 pl-4">Favorite First Guess:</td>
                <td className="py-2">
                  {mostFrequent} ({maxCount})
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
