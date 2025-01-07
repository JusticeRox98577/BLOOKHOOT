// scripts.js (client-side, functional game)

// Sample quiz data (replace with your actual quiz data)
const quizMarkdown = `
# Quiz 1: General Knowledge

**Q1:** What is the capital of France?
  * A) Berlin
  * B) Paris
  * C) Rome
  * D) Madrid
**Answer:** B

**Q2:** Who painted the Mona Lisa? 
  * A) Michelangelo
  * B) Leonardo da Vinci
  * C) Raphael
  * D) Donatello
**Answer:** B
`;

// Function to parse quiz data from Markdown (simplified)
function parseQuiz(markdown) {
  const questions = [];
  const lines = markdown.split('\n');
  let currentQuestion = {};

  for (const line of lines) {
    if (line.startsWith('**Q')) {
      // New question
      if (currentQuestion.question) {
        questions.push(currentQuestion);
      }
      currentQuestion = { question: line.replace('**', '').trim(), options: [], answer: '' };
    } else if (line.trim().startsWith('*')) {
      // Option
      currentQuestion.options.push(line.replace('*', '').trim());
    } else if (line.startsWith('**Answer:**')) {
      // Answer
      currentQuestion.answer = line.replace('**Answer:**', '').trim();
    }
  }
  if (currentQuestion.question) {
    questions.push(currentQuestion);
  }

  return questions;
}

// Game class
class Game {
  constructor(quizData, gameMode) {
    this.quizData = parseQuiz(quizData);
    this.gameMode = gameMode;
    this.players = []; // We'll manage players locally
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  start() {
    this.displayQuestion();
  }

  handleAnswer(answer) {
    const correctAnswer = this.quizData[this.currentQuestionIndex].answer;
    if (answer === correctAnswer) {
      this.score++;
      this.displayFeedback("Correct!");
    } else {
      this.displayFeedback(`Incorrect. The correct answer was ${correctAnswer}`);
    }
    this.nextQuestion();
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.quizData.length) {
      this.displayQuestion();
    } else {
      this.endGame();
    }
  }

  displayQuestion() {
    const questionData = this.quizData[this.currentQuestionIndex];
    document.getElementById('question-area').innerText = questionData.question;

    const optionsArea = document.getElementById('options-area');
    optionsArea.innerHTML = ''; // Clear previous options

    questionData.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.addEventListener('click', () => this.handleAnswer(String.fromCharCode(65 + index))); // Convert index to A, B, C...
      optionsArea.appendChild(button);
    });
  }

  displayFeedback(message) {
    document.getElementById('feedback').innerText = message;
  }

  endGame() {
    document.getElementById('question-area').innerText = "Game Over!";
    document.getElementById('options-area').innerHTML = '';
    this.displayFeedback(`Your final score: ${this.score}`);
  }
}

// Game initialization
const game = new Game(quizMarkdown, 'classic');
game.start();
