/* Juego: Detective Lógico — 20 casos (multiple-choice)
   Basado en la estructura y lógica de gameone.js, adaptado a 4 opciones.
*/

const questionsDB = [
    { text: "Si estudio, apruebo. Aprobé. Entonces estudié.", options: [
        "Falacia formal (afirmación del consecuente)",
        "Falacia informal (apelación a la mayoría)",
        "Silogismo válido",
        "Generalización apresurada"
    ], answer: 0, explanation: "Afirmación del consecuente: concluir el antecedente por haber obtenido el consecuente es inválido." },
    { text: "Dos médicos se equivocaron, entonces todos los médicos son incompetentes.", options: [
        "Falacia formal",
        "Generalización apresurada",
        "Silogismo categórico",
        "Apelación a la autoridad"
    ], answer: 1, explanation: "Generalización apresurada: sacar una conclusión general a partir de pocos casos." },
    { text: "Todo el mundo lo usa, así que es bueno.", options: [
        "Apelación a la mayoría",
        "Falacia formal",
        "Silogismo hipotético",
        "Lenguaje ambiguo"
    ], answer: 0, explanation: "Apelación a la mayoría: usar la popularidad como evidencia de validez." },
    { text: "Si llueve, la calle se moja. No llueve. Entonces la calle no se moja.", options: [
        "Falacia formal (negación del antecedente)",
        "Silogismo válido",
        "Falacia informal",
        "Apelación a la emoción"
    ], answer: 0, explanation: "Negación del antecedente: la ausencia de lluvia no garantiza que la calle esté seca." },
    { text: "Todos los gatos son animales. Todos los perros son animales. Por lo tanto, todos los perros son gatos.", options: [
        "Silogismo inválido",
        "Silogismo categórico válido",
        "Falacia informal",
        "Apelación a la tradición"
    ], answer: 0, explanation: "Conclusión inválida: compartir una característica no implica identidad entre categorías." },
    { text: "Si no entregas el trabajo hoy, nunca serás profesional.", options: [
        "Falacia de falsa causa",
        "Apelación al miedo",
        "Silogismo disyuntivo",
        "Generalización apresurada"
    ], answer: 1, explanation: "Apelación al miedo: amenazar consecuencias exageradas para forzar una acción." },
    { text: "Todos los hombres son mortales. Ninguna mujer es un hombre. Por lo tanto, ninguna mujer es mortal.", options: [
        "Falacia formal",
        "Silogismo válido",
        "Apelación a la ignorancia",
        "Lenguaje ambiguo"
    ], answer: 0, explanation: "Error formal en la estructura que lleva a una conclusión falsa." },
    { text: "Si no compras este producto, tu vida será un fracaso.", options: [
        "Apelación a la emoción (miedo)",
        "Silogismo hipotético válido",
        "Generalización apresurada",
        "Falacia formal"
    ], answer: 0, explanation: "Apelación a la emoción: usar miedo como argumento de venta." },
    { text: "Ana aprobó. Entonces Ana estudió.", options: [
        "Falacia formal (afirmación del consecuente)",
        "Silogismo válido",
        "Apelación a la mayoría",
        "Falacia informal"
    ], answer: 0, explanation: "Afirmación del consecuente: conclusión inválida sobre la causa." },
    { text: "Dos estudiantes copiaron, todos son deshonestos.", options: [
        "Generalización apresurada",
        "Falacia formal",
        "Silogismo categórico válido",
        "Apelación a la tradición"
    ], answer: 0, explanation: "Generalización a partir de ejemplos insuficientes." },
    { text: "Si estudio, apruebo. Estudio. Entonces apruebo.", options: [
        "Silogismo hipotético válido",
        "Falacia informal",
        "Apelación a la mayoría",
        "Silogismo inválido"
    ], answer: 0, explanation: "Estructura válida: modus ponens (si P→Q y P, entonces Q)." },
    { text: "O estudias o repruebas. No estudias. Entonces repruebas.", options: [
        "Silogismo disyuntivo válido",
        "Falacia formal",
        "Apelación a la emoción",
        "Generalización apresurada"
    ], answer: 0, explanation: "Silogismo disyuntivo válido si la disyunción es exclusiva y completa." },
    { text: "Todos los estudiantes son responsables. Ana es estudiante. Por lo tanto, Ana es responsable.", options: [
        "Silogismo categórico válido",
        "Falacia informal",
        "Generalización apresurada",
        "Falacia formal"
    ], answer: 0, explanation: "Ejemplo clásico de silogismo categórico válido (sílabo directo)." },
    { text: "Si apruebas este curso, serás un genio.", options: [
        "Falacia de falsa causa",
        "Apelación a la emoción",
        "Silogismo válido",
        "Generalización apresurada"
    ], answer: 0, explanation: "Falsa causa: atribuir una relación causal inexistente entre aprobar y ser genio." },
    { text: "No hay pruebas de que los extraterrestres no existan, por lo tanto existen.", options: [
        "Apelación a la ignorancia",
        "Silogismo categórico válido",
        "Falacia formal",
        "Generalización apresurada"
    ], answer: 0, explanation: "Apelación a la ignorancia: usar la falta de evidencia como prueba positiva." },
    { text: "Si una persona es profesor, entonces sabe enseñar. Juan sabe enseñar….", options: [
        "Entonces Juan es profesor.",
        "Entonces Juan no es profesor.",
        "Entonces todos los que enseñan son profesores.",
        "Entonces Juan es estudiante."
    ], answer: 0, explanation: "Afirmación del consecuente: inferir el antecedente desde el consecuente es inválido." },
    { text: "Los políticos son como niños: siempre necesitan que alguien los vigile.", options: [
        "Falacia de falsa analogía",
        "Silogismo categórico válido",
        "Apelación a la mayoría",
        "Generalización apresurada"
    ], answer: 0, explanation: "Falsa analogía: comparar dos cosas que no son similares en aspectos relevantes." },
    { text: "Si no apoyas este proyecto, significa que….", options: [
        "Odias el progreso.",
        "No tienes tiempo.",
        "Estás indeciso.",
        "Prefieres otro proyecto."
    ], answer: 0, explanation: "Ejemplo de falso dilema / ataque ad hominem implícito: reducir opciones y atribuir intención negativa." },
    { text: "Nadie ha demostrado que los unicornios no existen, por lo tanto deben existir.", options: [
        "Apelación a la ignorancia",
        "Silogismo hipotético válido",
        "Falacia formal",
        "Generalización apresurada"
    ], answer: 0, explanation: "Apelación a la ignorancia: ausencia de evidencia no es evidencia de presencia." },
    { text: "Si una persona es atleta, entonces hace ejercicio. Pedro no es atleta….", options: [
        "Entonces Pedro no hace ejercicio.",
        "Entonces Pedro hace ejercicio.",
        "Entonces Pedro es saludable.",
        "Entonces Pedro es profesor."
    ], answer: 0, explanation: "Negación del antecedente: no ser atleta no implica no hacer ejercicio." }
];

// Estado
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let isPaused = false;
const totalTimePerQuestion = 10;

// DOM
const ui = {
    questionText: document.getElementById('question-text'),
    counter: document.getElementById('question-counter'),
    score: document.getElementById('score-display'),
    timerFill: document.getElementById('timer-fill'),
    timerText: document.getElementById('time-text'),
    overlay: document.getElementById('feedback-overlay'),
    fbTitle: document.getElementById('feedback-title'),
    fbExplanation: document.getElementById('feedback-explanation') || document.getElementById('feedback-explanation'),
    fbIconBox: document.getElementById('feedback-icon-box'),
    resultsScreen: document.getElementById('results-screen'),
    finalScore: document.getElementById('final-score'),
    finalMsg: document.getElementById('final-message')
};

function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    questionsDB.sort(() => Math.random() - 0.5);
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questionsDB.length) { endGame(); return; }
    isPaused = false;
    ui.overlay.classList.remove('visible');
    clearInterval(timerInterval);
    timeLeft = totalTimePerQuestion; updateTimerUI(); startTimer();

    const q = questionsDB[currentQuestionIndex];
    ui.questionText.innerText = q.text;
    ui.counter.innerText = `${String(currentQuestionIndex + 1).padStart(2,'0')} / ${questionsDB.length}`;

    // Rellenar opciones en los botones (texto completo)
    const buttons = document.querySelectorAll('.actions-grid .btn-option');
    buttons.forEach((btn, i) => {
        btn.innerText = q.options[i];
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft -= 0.1; if (timeLeft < 0) timeLeft = 0; updateTimerUI();
            if (timeLeft <= 0) handleTimeOut();
        }
    }, 100);
}

function updateTimerUI() {
    ui.timerText.innerText = `${Math.ceil(timeLeft)}s`;
    const percentage = (timeLeft / totalTimePerQuestion) * 100;
    ui.timerFill.style.width = `${percentage}%`;
    ui.timerFill.style.background = (timeLeft <= 3) ? '#ff0000' : 'linear-gradient(90deg, #E50914, #ff4b55)';
}

function selectAnswer(choiceIndex) {
    if (isPaused) return; isPaused = true; clearInterval(timerInterval);
    const q = questionsDB[currentQuestionIndex];
    const correct = (choiceIndex === q.answer);
    if (correct) {
        const timeBonus = Math.floor(timeLeft * 10);
        score += 100 + timeBonus;
        ui.score.innerText = score;
        showFeedback(true, `Respuesta correcta: ${q.options[q.answer]}. ${q.explanation}`);
    } else {
        showFeedback(false, `Respuesta correcta: ${q.options[q.answer]}. ${q.explanation}`);
    }
}

function handleTimeOut() { isPaused = true; clearInterval(timerInterval); const q = questionsDB[currentQuestionIndex]; showFeedback(false, `¡Tiempo agotado! Respuesta correcta: ${q.options[q.answer]}. ${q.explanation}`); }

function showFeedback(success, explanationText) {
    ui.overlay.className = success ? 'is-correct' : 'is-wrong';
    ui.overlay.classList.add('visible');
    ui.fbTitle.innerText = success ? '¡CORRECTO!' : 'INCORRECTO';
    ui.fbExplanation.innerText = explanationText;
    ui.fbIconBox.innerHTML = success ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line></svg>`;
}

function nextQuestion() { currentQuestionIndex++; loadQuestion(); }
window.nextQuestion = nextQuestion; window.selectAnswer = selectAnswer;

function endGame() {
    ui.resultsScreen.classList.add('visible'); ui.finalScore.innerText = score;
    const maxScore = questionsDB.length * 200; const percentage = score / maxScore;
    if (percentage > 0.8) ui.finalMsg.innerText = '¡ERES UN GENIO LÓGICO! 🧠';
    else if (percentage > 0.5) ui.finalMsg.innerText = 'BUEN TRABAJO, PERO PUEDES MEJORAR.';
    else ui.finalMsg.innerText = 'NECESITAS REPASAR LOS FUNDAMENTOS.';
}

document.addEventListener('DOMContentLoaded', initGame);
