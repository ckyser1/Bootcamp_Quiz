var timeLeft = 60;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var currQuestions, currentQuestionIndex;

var questions = [
  { 
      question: "What does HTML Stand for?", 
      answers: [
          { text: "Huge Test Makeup Language", correct: false },
          { text: "Hyper Text Markup Language" , correct: true },
          { text: "How To Make Lamps", correct: false },
          { text: "Heavy Trade Mix Language", correct: false }
      ]
  },
  { 
      question: "Which function combines two arrays?", 
      answers: [
          { text: "concat()", correct: true },
          { text: "filter()", correct: false },
          { text: "add()", correct: false },
          { text: "span()", correct: false }
      ]
  },
  { 
      question: "Which of the following is the tag extension for JavaScript?", 
      answers: [
          { text: ".js", correct: true },
          { text: ".html", correct: false },
          { text: ".css", correct: false },
          { text: ".git", correct: false }
      ]
  },
  { 
      question: "What is CSS used for?", 
      answers: [
          { text: "used as a mathematics software", correct: false },
          { text: "used as a machine language for robotics", correct: false },
          { text: "used to format the layout of webpages", correct: true },
          { text: "used to define functions", correct: false }
      ]
  },
  { 
      question: "Who is the best starter Pokemon?",
      answers: [
          { text: "Bulbasaur", correct: true },
          { text: "Squirtle", correct: false },
          { text: "Charmander", correct: false },
          { text: "Pikachu", correct: false }
      ]
  },
];


// Start quiz button on main page, starts quiz
startButton.addEventListener("click", startGame);
answerButtonsEl.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});


// timer functionality
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
        score();
    }
}


// Start starts timer
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
   
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");

    timeTick();
    setNextQuestion();
};


// next question
function setNextQuestion() {
  resetP();
  showQuestion(questions[currentQuestionIndex]);

};


// Display questions
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};


// Resets page with new questions
function resetP() {
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};


// Select answer function
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    if (!correct) {
            timeLeft -= 10;
        }
    

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (questions.length > currentQuestionIndex + 1) {
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        score();
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
};


// Remove classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};


// Save scores
function score() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};


var loadScores = function () {
    // loads saved scores from local storage

    if (!savedScores) {
        return false;
    }

    // turn them into strings
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};


// Display high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    //console.log(scores)
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};


//high scores link
viewHighScores.addEventListener("click", showHighScores);


submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});


// Restart or reload the page
restartButton.addEventListener("click", function () {
    window.location.reload();
});


// Clear localStorage items 
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});