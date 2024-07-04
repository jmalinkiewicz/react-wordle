import { AnimatePresence, motion } from "framer-motion";
import { useWordleStore } from "../../state/wordle";

type Props = {
  showSettings: boolean;
  resetGameState: (lang?: "en" | "pl") => void;
};

export default function Settings({
  showSettings,

  resetGameState,
}: Props) {
  const { setLanguageMode, languageMode } = useWordleStore();

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          className="absolute z-50 inset-0 p-4 bg-lime-800 text-white rounded-lg flex flex-col gap-8"
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
          <h2 className="text-center text-2xl font-bold">Settings</h2>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Language Mode:</h3>
            <div className="flex w-full gap-1">
              <motion.button
                onClick={() => {
                  setLanguageMode("pl");
                  resetGameState("pl");
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`w-1/2 p-2 rounded transition-colors ${
                  languageMode === "pl"
                    ? "bg-lime-600"
                    : "bg-lime-700 hover:bg-lime-600/60"
                }`}
              >
                Polish
              </motion.button>
              <motion.button
                onClick={() => {
                  setLanguageMode("en");
                  resetGameState("en");
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`w-1/2 p-2 rounded transition-colors ${
                  languageMode === "en"
                    ? "bg-lime-600"
                    : "bg-lime-700 hover:bg-lime-600/60"
                }`}
              >
                English
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
