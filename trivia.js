const readline = require('readline');

const questions = [
  {
    question: "What is the capital of France?",
    options: ["A) London", "B) Berlin", "C) Paris", "D) Madrid"],
    correct: "C"
  },
  {
    question: "What is 2 + 2?",
    options: ["A) 3", "B) 4", "C) 5", "D) 6"],
    correct: "B"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["A) Earth", "B) Mars", "C) Jupiter", "D) Saturn"],
    correct: "C"
  }
];

let score = 0;
let currentQuestionIndex = 0;
let gameActive = false;
let gameTimer = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayWelcome() {
  console.log("\n=== TRIVIA GAME ===\n");
  console.log("Answer questions by typing A, B, C, or D\n");
}

function startGame() {
  gameActive = true;
  score = 0;
  currentQuestionIndex = 0;
  console.log("Game started!\n");
  startTimer();
  askQuestion();
}

function startTimer() {
  let timeRemaining = 60;
  gameTimer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      endGame(true);
    }
  }, 1000);
}

function askQuestion() {
  if (!gameActive || currentQuestionIndex >= questions.length) {
    endGame(false);
    return;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  console.log(`\nQuestion ${currentQuestionIndex + 1}:`);
  console.log(currentQuestion.question);
  currentQuestion.options.forEach(option => console.log(option));
  
  rl.question("\nYour answer: ", (answer) => {
    validateAnswer(answer.toUpperCase().trim());
  });
}

function validateAnswer(userAnswer) {
  if (!gameActive) return;
  
  const currentQuestion = questions[currentQuestionIndex];
  
  if (userAnswer === currentQuestion.correct) {
    score++;
    console.log("✓ Correct!");
  } else {
    console.log(`✗ Wrong. Answer was ${currentQuestion.correct}`);
  }
  
  currentQuestionIndex++;
  askQuestion();
}

function endGame(timedOut) {
  gameActive = false;
  clearInterval(gameTimer);
  
  console.log("\n=== GAME OVER ===");
  if (timedOut) console.log("Time's up!");
  console.log(`Score: ${score}/${questions.length}`);
  
  const percentage = (score / questions.length) * 100;
  if (percentage >= 80) console.log("Excellent!");
  else if (percentage >= 60) console.log("Good job!");
  else console.log("Keep practicing!");
  
  displayStats();
  rl.close();
}

function displayStats() {
  console.log("\nStats:");
  const answeredQuestions = questions.filter((q, i) => i < currentQuestionIndex);
  console.log(`Questions answered: ${answeredQuestions.length}`);
  const totalPossible = questions.reduce((total) => total + 1, 0);
  console.log(`Total possible: ${totalPossible}\n`);
}

function main() {
  displayWelcome();
  rl.question("Press Enter to start...", () => {
    startGame();
  });
}

main();