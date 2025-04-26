const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: 2
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    },
    {
      question: "What is the color of the sky?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctAnswer: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((button, index) => {
      button.textContent = question.options[index];
    });
  }
  
  function nextQuestion(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    const scoreBox = document.getElementById("score-box");
    scoreBox.classList.remove("hidden");
    document.getElementById("score").textContent = score;
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("score-box").classList.add("hidden");
  }
  
  // Initialize quiz
  loadQuestion();
  