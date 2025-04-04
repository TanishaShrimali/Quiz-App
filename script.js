const questions = [
    {
        question: "What does the acronym `JSON` stand for?",
        answers: [
            { text: "JavaScript Object Notation", correct: true },
            { text: "Java System Oriented Network", correct: false },
            { text: "Java Serialized Object Notation", correct: false },
            { text: "JavaScript Oriented Network", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a JavaScript framework/library?",
        answers: [
            { text: "React", correct: false },
            { text: "Django", correct: true },
            { text: "Vue.js", correct: false },
            { text: "Angular", correct: false }
        ]
    },
    {
        question: "In databases, what does ACID stand for?",
        answers: [
            { text: "Atomicity, Consistency, Isolation, Durability", correct: true },
            { text: "Automated, Consistent, Integrated, Distributed", correct: false },
            { text: "Association, Configuration, Implementation, Deployment", correct: false },
            { text: "Application, Computation, Integration, Distribution", correct: false }
        ]
    },
    {
        question: "What is the primary purpose of WebRTC in web development?",
        answers: [
            { text: "Storing user data in cookies", correct: false },
            { text: "Rendering 3D graphics on the web", correct: false },
            { text: "Encrypting user passwords", correct: false },
            { text: "Enabling real-time communication between browsers", correct: true }
        ]
    },
    {
        question: "Which command is used to check the status of files in Git?",
        answers: [
            { text: "git log", correct: false },
            { text: "git commit", correct: false },
            { text: "git status", correct: true },
            { text: "git push", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState(); // Clear previous buttons
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.style.backgroundColor = "green";
        score++;
    } else {
        selectedButton.style.backgroundColor = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
