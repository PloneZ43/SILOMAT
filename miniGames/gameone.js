// --- BASE DE DATOS DE PREGUNTAS (NIVEL 1) ---
const questionsDB = [
    {
        text: "¿El objeto de estudio de la lógica es el contenido del pensamiento?",
        isTrue: false,
        explanation: "La lógica estudia la estructura o forma, no el contenido."
    },
    {
        text: "¿La lógica busca distinguir entre argumentos válidos e inválidos?",
        isTrue: true,
        explanation: "Su función principal es validar razonamientos."
    },
    {
        text: "¿Un razonamiento es válido solo si sus premisas son verdaderas en la realidad?",
        isTrue: false,
        explanation: "La validez depende de la estructura lógica, no de la verdad material."
    },
    {
        text: "¿El juicio es la afirmación o negación de algo sobre un concepto?",
        isTrue: true,
        explanation: "Es una de las formas fundamentales del pensamiento."
    },
    {
        text: "¿Identificar falacias ayuda a evaluar críticamente los argumentos?",
        isTrue: true,
        explanation: "Las falacias son errores lógicos que debemos detectar."
    }
];

// --- VARIABLES DE ESTADO ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
const totalTimePerQuestion = 10;

// --- REFERENCIAS AL DOM (CON VALIDACIÓN) ---
const questionText = document.getElementById('question-text');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const timerFill = document.getElementById('timer-fill');
const timeText = document.getElementById('time-text');
const feedbackOverlay = document.getElementById('feedback-overlay');
const resultsScreen = document.getElementById('results-screen');

// Validar elementos críticos
const domElementsExist = !!(questionText && questionCounter && scoreDisplay && timerFill && timeText);
if (!domElementsExist) {
    console.error('✗ Error: Faltan elementos HTML necesarios para el juego');
}

// --- INICIO DEL JUEGO ---
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// --- CARGAR PREGUNTA ---
function loadQuestion() {
    if (currentQuestionIndex >= questionsDB.length) {
        endGame();
        return;
    }

    clearInterval(timerInterval);
    timeLeft = totalTimePerQuestion;
    updateTimerUI();
    startTimer();

    const currentQ = questionsDB[currentQuestionIndex];
    if (questionText) questionText.innerText = currentQ.text;
    if (questionCounter) questionCounter.innerText = `${currentQuestionIndex + 1} / ${questionsDB.length}`;
    
    if (feedbackOverlay) {
        feedbackOverlay.classList.remove('visible', 'feedback-correct', 'feedback-wrong');
    }
}

// --- TEMPORIZADOR ---
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    timeText.innerText = `${timeLeft}s`;
    const percentage = (timeLeft / totalTimePerQuestion) * 100;
    timerFill.style.width = `${percentage}%`;
    
    // Cambiar color si queda poco tiempo
    if (timeLeft <= 3) {
        timerFill.style.background = '#ff0000';
    } else {
        timerFill.style.background = '#E50914';
    }
}

// --- MANEJO DE RESPUESTAS ---
function selectAnswer(userChoice) {
    clearInterval(timerInterval); // Pausar tiempo

    const currentQ = questionsDB[currentQuestionIndex];
    const isCorrect = (userChoice === currentQ.isTrue);

    if (isCorrect) {
        score += 100 + (timeLeft * 10); // Bonificación por tiempo
        showFeedback(true, "¡CORRECTO!");
    } else {
        showFeedback(false, "INCORRECTO");
    }

    scoreDisplay.innerText = score;
}

function handleTimeOut() {
    showFeedback(false, "TIEMPO AGOTADO");
}

function showFeedback(isSuccess, message) {
    if (!feedbackOverlay) return;

    const icon = document.getElementById('feedback-icon');
    const text = document.getElementById('feedback-text');
    
    if (icon && text) {
        icon.innerText = isSuccess ? '✅' : '❌';
        text.innerText = message;
    }
    
    feedbackOverlay.className = isSuccess ? 'feedback-correct' : 'feedback-wrong';
    feedbackOverlay.classList.add('visible');

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

// --- FIN DEL JUEGO ---
function endGame() {
    if (resultsScreen) resultsScreen.classList.add('visible');
    
    const finalScore = document.getElementById('final-score');
    if (finalScore) finalScore.innerText = score;
    
    const msg = document.getElementById('final-message');
    if (msg) {
        if (score >= 500) msg.innerText = "¡ERES UN GENIO LÓGICO!";
        else if (score >= 300) msg.innerText = "BUEN TRABAJO";
        else msg.innerText = "NECESITAS REPASAR";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (domElementsExist) {
        console.log('✓ Juego inicializado correctamente');
        initGame();
    } else {
        console.error('✗ No se pudo iniciar el juego por falta de elementos HTML');
    }
});