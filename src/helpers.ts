export function evaluateGuess(
  solution: string,
  guess: string
): ("correct" | "wrong" | "missing")[] {
  let result: ("correct" | "wrong" | "missing")[] = new Array(
    guess.length
  ).fill("missing");
  let solutionCopy = solution.split("");
  let guessCopy = guess.split("");

  // First pass: Mark correct matches
  guessCopy.forEach((char, i) => {
    if (char === solution[i]) {
      result[i] = "correct";
      solutionCopy[i] = "*"; // Mark as used in solution
      guessCopy[i] = "!"; // Mark as used in guess
    }
  });

  // Second pass: Mark wrong and missing
  guessCopy.forEach((char, i) => {
    if (char !== "!" && solutionCopy.includes(char)) {
      // Check if not already used
      result[i] = "wrong";
      solutionCopy[solutionCopy.indexOf(char)] = "*"; // Mark as used in solution
    }
    // Missing letters are already marked by default
  });

  return result;
}
