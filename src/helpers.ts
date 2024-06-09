export function evaluateGuess(
  solution: string,
  guess: string
): ("correct" | "wrong" | "missing")[] {
  let result: ("correct" | "wrong" | "missing")[] = [];
  let solutionCopy = solution.split("");

  guess.split("").forEach((char, i) => {
    if (char === solution[i]) {
      result.push("correct");
      solutionCopy[i] = "*"; // Mark as used
    } else if (solutionCopy.includes(char)) {
      result.push("wrong");
      solutionCopy[solutionCopy.indexOf(char)] = "*"; // Mark as used
    } else {
      result.push("missing");
    }
  });

  return result;
}
