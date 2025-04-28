const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text"),
  startBtn = document.querySelector(".start"),
  timePerQuestion = document.querySelector("#time"),
  questionType = document.querySelector("#question-type"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen"),
  questionText = document.querySelector(".question"),
  answersWrapper = document.querySelector(".answer-wrapper"),
  questionNumber = document.querySelector(".number"),
  submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next"),
  endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  restartBtn = document.querySelector(".restart");

let questions = [],
  time = 30,
  score = 0,
  currentQuestion = 0,
  timer,
  selectedType = "identification";

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

startBtn.addEventListener("click", () => {
  loadingAnimation();
  selectedType = questionType.value;
  
  // Load the correct set of questions
  if (selectedType === "identification") {
    questions = [...localQuestions];
  } else if (selectedType === "truefalse") {
    questions = [...trueFalseQuestions];
  }

  setTimeout(() => {
    startScreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 0;
    score = 0;
    showQuestion();
  }, 500);
});

const showQuestion = () => {
  const current = questions[currentQuestion];
  questionText.innerHTML = current.question;
  questionNumber.innerHTML = `Question <span class="current">${currentQuestion + 1}</span> <span class="total">/${questions.length}</span>`;
  answersWrapper.innerHTML = "";

  if (selectedType === "identification") {
    answersWrapper.innerHTML = `
      <input type="text" id="identification-answer" placeholder="Type your answer..." class="answer-input" />
    `;
  } else if (selectedType === "truefalse") {
    answersWrapper.innerHTML = `
      <div class="answer" data-answer="True">
        <span class="text">True</span>
      </div>    
      <div class="answer" data-answer="False">
        <span class="text">False</span>
      </div>
    `;

    const answerDivs = document.querySelectorAll(".answer");
    answerDivs.forEach((div) => {
      div.addEventListener("click", () => {
        answerDivs.forEach((el) => el.classList.remove("selected"));
        div.classList.add("selected");
        submitBtn.disabled = false;
      });
    });
  }

  // Reset button visibility
  submitBtn.style.display = "block";
  submitBtn.innerText = "Check Answer";
  submitBtn.disabled = selectedType === "identification";
  nextBtn.style.display = "none";

  if (selectedType === "identification") {
    const inputField = document.querySelector("#identification-answer");
    inputField.addEventListener("input", () => {
      submitBtn.disabled = inputField.value.trim() === "";
    });
  }

  time = parseInt(timePerQuestion.value);
  startTimer(time);
};

const startTimer = (timeLeft) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft >= 0) {
      progress(timeLeft);
      timeLeft--;
    } else {
      clearInterval(timer);
      disableAnswer();
    }
  }, 1000);
};

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showScore();
  }
});

const checkAnswer = () => {
  const correctAnswer = questions[currentQuestion].answer.trim().toLowerCase();
  let userAnswer = "";

  if (selectedType === "identification") {
    userAnswer = document.querySelector("#identification-answer").value.trim().toLowerCase();
    const inputField = document.querySelector("#identification-answer");

    if (userAnswer === correctAnswer) {
      score++;
      inputField.classList.add("correct");
    } else {
      inputField.classList.add("wrong");
      showCorrectAnswer(questions[currentQuestion].answer);
    }
  } else if (selectedType === "truefalse") {
    const selected = document.querySelector(".answer.selected");
    if (selected) {
      userAnswer = selected.dataset.answer.toLowerCase();
      const correctTrueFalse = correctAnswer; // "true" or "false"

      if (userAnswer === correctTrueFalse.toLowerCase()) {
        score++;
        selected.classList.add("correct");
      } else {
        selected.classList.add("wrong");
        document.querySelectorAll(".answer").forEach((answer) => {
          if (answer.dataset.answer.toLowerCase() === correctTrueFalse) {
            answer.classList.add("correct");
          }
        });
      }
    }
  }

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const showCorrectAnswer = (correctAnswer) => {
  const correctDisplay = document.createElement("div");
  correctDisplay.classList.add("correct-answer-display");
  correctDisplay.innerText = `Correct Answer: ${correctAnswer}`;
  answersWrapper.appendChild(correctDisplay);
};

const disableAnswer = () => {
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";

  if (selectedType === "truefalse") {
    const correctAnswer = questions[currentQuestion].answer.trim().toLowerCase();
    document.querySelectorAll(".answer").forEach((answer) => {
      if (answer.dataset.answer.toLowerCase() === correctAnswer) {
        answer.classList.add("correct");
      }
    });
  }
};

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;

  // Confetti if score > 0
  if (score > 0) {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  }
};

restartBtn.addEventListener("click", () => {
  window.location.reload();
});

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length >= 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
  setTimeout(() => {
    clearInterval(loadingInterval);
    startBtn.innerHTML = "Start Quiz";
  }, 1500);
};