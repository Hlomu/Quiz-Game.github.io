// properties
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(choice) {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion.isCorrect(choice)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  isQuizEnd() {
    return this.currentQuestionIndex === this.questions.length;
  }

  getScore() {
    return this.score;
  }
}

class Question {
  constructor(text, choices, correctAnswer) {
    this.text = text;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }

  isCorrect(choice) {
    return choice === this.correctAnswer;
  }
}

// array quetions
const quizQuestions = [
  new Question(
    "What does the acronym (DOM) stand for in JavaScript?",
    [
      "a) Document Object Model",
      "b) Data Object Model",
      "c) Document Oriented Middleware",
      "d) Data Object Middleware",
    ],
    "a) Document Object Model,"
  ),

  new Question(
    "Which keyword is used to declare a constant variable in JavaScript?",
    ["a) var", "b) let", "c) const", "d) final"],
    "c) const"
  ),

  new Question(
    "What does the NaN value represent in JavaScript?",
    [
      "a) Not a Number",
      "b) No Assignment",
      "c) Null and Negligible",
      "d) No Argument",
    ],
    "a) Not a number"
  ),

  new Question(
    "How do you select an element with the id 'myElement' using JavaScript?",
    [
      "a) document.getElementByClassName('myElement')",
      "b) document.querySelector('#myElement')",
      "c) document.getElementById('myElement')",
      "d) document.getElementByTagName('myElement')",
    ],
    "c) document.getElementById('myElement')"
  ),

  new Question(
    "What is the purpose of the typeof operator in JavaScript?",
    [
      "a) To check if a variable is defined",
      "b) To determine the type of a variable",
      "c) To compare two variables",
      "d) To create a new variable",
    ],
    "b) To determine the type of a variable"
  ),

  new Question(
    "What is the purpose of the parseInt function in JavaScript?",
    [
      "a) To convert a string to an integer",
      "b) To parse JSON data",
      "c) To find the square root of a number",
      "d) To create a new variable",
    ],
    "a) To convert a string to an integer"
  ),

  new Question(
    "What is the role of the else statement in an if-else construct?",
    [
      "a) It defines the condition to be checked",
      "b) It executes the block of code if the condition is true",
      "c) It provides an alternative block of code to be executed if the condition is false",
      "d) It ends the if statement",
    ],
    "c) It provides an alternative block of code to be executed if the condition is false"
  ),

  new Question(
    "The CSS box model consists of which of the following components?",
    [
      "a) margin, padding, border, content",
      "b) margin, padding, border, height",
      "c) padding, border, height, width",
      "d) padding, border, width, content",
    ],
    "a) margin, padding, border, content"
  ),

  new Question(
    "Which of the following is not a primitive data type in JavaScript?",
    ["a) String", "b) Number", "c) Object", "d) Boolean"],
    "c) Object"
  ),

  new Question(
    "What is the purpose of the addEventListener method in JavaScript?",
    [
      "a) To create a new HTML element.",

      "b) To remove an event listener.",

      "c) To attach an event handler to an element.",

      "d) To define a new function",
    ],
    "c) To attach an event handler to an element."
  ),
];

const quiz = new Quiz(quizQuestions);

// document object model
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const retryButton = document.getElementById("retry-btn");

// Function to render the current question and choices
function renderQuestion() {
  if (quiz.isQuizEnd()) {
    displayScore();
  } else {
    const currentQuestion = quiz.getCurrentQuestion();

    questionContainer.textContent = currentQuestion.text;
    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choice";
      radio.value = choice;

      label.appendChild(radio);
      label.append(choice);

      choicesContainer.appendChild(label);
    });
  }
}

// Event listener for submit button
submitButton.addEventListener("click", () => {
  const selectedChoice = document.querySelector('input[name="choice"]:checked');
  if (selectedChoice) {
    const choice = selectedChoice.value;
    quiz.selectAnswer(choice);
    renderQuestion();
  }
});

// Event listener for retry button
retryButton.addEventListener("click", () => {
  quiz.currentQuestionIndex = 0;
  quiz.score = 0;
  renderQuestion();
  scoreContainer.style.display = "none";
  retryButton.style.display = "none";
});

// final score function
function displayScore() {
  questionContainer.textContent = "Quiz completed!";
  choicesContainer.style.display = "none";
  submitButton.style.display = "none";
  scoreContainer.textContent = `Your score: ${quiz.getScore()}/${
    quiz.questions.length
  }`;
  scoreContainer.style.display = "block";
  retryButton.style.display = "block";

  // condition for score
  if (quiz.geyScore() < 5) {
    scoreContainer.textContent += " You can retry";
  }

  scoreContainer.style.display = "block";
  retryButton.style.display = "block";
}

// render first question
renderQuestion();
