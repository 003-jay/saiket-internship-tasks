// Quiz Questions Data
const quizData = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
        correct: 0
    },
    {
        question: "Which method is used to select an HTML element by its ID?",
        options: ["getElementByID()", "getElementById()", "selectElement()", "findElementByID()"],
        correct: 1
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Module", "Document Output Model", "Data Oriented Method"],
        correct: 0
    },
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["String", "Integer", "Float", "Double"],
        correct: 0
    },
    {
        question: "How do you add a comment in JavaScript?",
        options: ["<!-- comment -->", "// comment", "# comment", "-- comment"],
        correct: 1
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// DOM Elements
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const errorMessage = document.getElementById('error-message');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const maxScore = document.getElementById('max-score');
const percentage = document.getElementById('percentage');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
function initializeQuiz() {
    totalQuestionsSpan.textContent = quizData.length;
    maxScore.textContent = quizData.length;
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    errorMessage.textContent = '';
    nextBtn.disabled = true;

    // Create option elements
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" id="option${index}" name="answer" value="${index}">
            <label for="option${index}">${option}</label>
        `;

        optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });

    // Update progress bar
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    currentQuestionSpan.textContent = currentQuestion + 1;
}

// Select Option
function selectOption(index, optionDiv) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Select current option
    selectedAnswer = index;
    optionDiv.classList.add('selected');
    document.getElementById(`option${index}`).checked = true;
    errorMessage.textContent = '';
    
    // Enable next button
    nextBtn.disabled = false;
}

// Next Question
function nextQuestion() {
    // Validate that an answer is selected
    if (selectedAnswer === null) {
        errorMessage.textContent = 'Please select an answer before proceeding.';
        return;
    }

    // Check if answer is correct
    const question = quizData[currentQuestion];
    if (selectedAnswer === question.correct) {
        score++;
    }

    // Move to next question or finish
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    finalScore.textContent = score;
    const percentageValue = Math.round((score / quizData.length) * 100);
    percentage.textContent = percentageValue;
}

// Restart Quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    resultsSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    
    loadQuestion();
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeQuiz);
