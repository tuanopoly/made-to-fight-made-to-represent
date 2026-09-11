export const questions = [
  {
    title: "What kind of fighter would you want to be?",
    answers: [
      "Graceful, poetic, and almost superhuman",
      "Calm, precise, and technically disciplined",
      "Fast, adaptable, and ready to counter any attack",
      "Powerful, physical, and relentless",
      "Strategic, disciplined, and deadly with a blade",
    ],
  },
  {
    title: "What makes a fight scene exciting to you?",
    answers: [
      "Beautiful movement and striking cinematography",
      "Technique, precision, and controlled movement",
      "Fast combinations and dynamic body movement",
      "Raw impact, stunts, and intense physicality",
      "Tactical battles, weapons, and high-stakes confrontation",
    ],
  },
  {
    title: "What do you want to discover behind the fight?",
    answers: [
      "Myth, philosophy, and Chinese cultural symbolism",
      "Discipline, identity, and martial arts tradition",
      "Vietnamese identity, resistance, and cultural heritage",
      "Thai pride, heritage, and cultural strength",
      "Honour, loyalty, and the samurai code",
    ],
  },
];

/** Return the film index. All-different answers are resolved by Question 1. */
export function matchFilm(answers) {
  if (
    !Array.isArray(answers) ||
    answers.length !== 3 ||
    Array.from(answers).some(
      (answer) => !Number.isInteger(answer) || answer < 0 || answer > 4,
    )
  ) {
    throw new TypeError(
      "Choose one of the five answers for each of the three questions.",
    );
  }
  const scores = [0, 0, 0, 0, 0];
  answers.forEach((answer) => scores[answer]++);
  const highest = Math.max(...scores);
  return highest === 1 ? answers[0] : scores.indexOf(highest);
}
