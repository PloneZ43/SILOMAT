/* ===========================================================
   GAME 2: EL CONSTRUCTOR (LÓGICA DE SILOGISMOS)
   Tema: Ingeniería / Azul
   =========================================================== */

// --- BASE DE DATOS DE NIVELES ---
const levelsDB = [
    {
        // NIVEL 1: Falta Conclusión
        parts: [
            { text: "Todas las aves tienen plumas", type: "premise" },
            { text: "El pingüino es un ave", type: "premise" },
            null 
        ],
        correctAnswer: "El pingüino tiene plumas",
        explanation: "Silogismo Deductivo válido. Al aplicar la regla general (todas las aves) al caso particular (pingüino), la conclusión es necesaria.",
        options: [
            "El pingüino tiene plumas", 
            "El pingüino vuela", 
            "Todas las plumas son aves"
        ]
    },
    {
        // NIVEL 2: Falta Premisa Menor
        parts: [
            { text: "Ningún reptil tiene pelo", type: "premise" },
            null, 
            { text: "La cobra no tiene pelo", type: "conclusion" }
        ],
        correctAnswer: "La cobra es un reptil",
        explanation: "Para concluir que la cobra no tiene pelo basándonos en la clase 'Reptil', la premisa faltante debe afirmar que la cobra pertenece a esa clase.",
        options: [
            "La cobra es un reptil",
            "La cobra tiene escamas",
            "Algunos reptiles son cobras"
        ]
    },
    {
        // NIVEL 3: Falta Premisa Mayor
        parts: [
            null, 
            { text: "El hierro es un metal", type: "premise" },
            { text: "El hierro conduce electricidad", type: "conclusion" }
        ],
        correctAnswer: "Todo metal conduce electricidad",
        explanation: "Necesitamos una premisa universal que establezca la propiedad de conducir electricidad para todos los metales.",
        options: [
            "Todo metal conduce electricidad",
            "El hierro es duro",
            "La electricidad es metal"
        ]
    },
    {
        // NIVEL 4: Modus Ponens
        parts: [
            { text: "Si llueve, la calle se moja", type: "premise" },
            { text: "Hoy está lloviendo", type: "premise" },
            null
        ],
        correctAnswer: "La calle se moja",
        explanation: "Modus Ponens: Si se cumple la condición (antecedente: llueve), ocurre la consecuencia (consecuente: se moja).",
        options: [
            "La calle se moja",
            "La calle está seca",
            "Tal vez se moje"
        ]
    },
    {
        // NIVEL 5: Falacia (Trampa)
        parts: [
            { text: "Si estudio, apruebo el examen", type: "premise" },
            { text: "Aprobé el examen", type: "premise" },
            null
        ],
        correctAnswer: "No se puede concluir nada con certeza",
        explanation: "Falacia de Afirmación del Consecuente. Aprobar el examen no implica necesariamente haber estudiado (pudo ser suerte).",
        options: [
            "No se puede concluir nada con certeza",
            "Entonces estudié mucho",
            "El examen era fácil"
        ]
    }
];

// --- VARIABLES DE ESTADO ---
let currentLevelIndex = 0;
let score = 0;
let timeLeft = 20; 
let timerInterval;
let isPaused = false;
const totalTimePerLevel = 20;

// --- REFERENCIAS AL DOM ---
const syllogismStack = document.getElementById('syllogism-stack');
const optionsContainer = document.getElementById('options-container');
const levelCounter = document.getElementById('level-counter');
const scoreDisplay = document.getElementById('score-display');
const timerFill = document.getElementById('timer-fill');
const timeText = document.getElementById('time-text');
const feedbackOverlay = document.getElementById('feedback-overlay');
const resultsScreen = document.getElementById('results-screen');

// ==========================================
// MOTOR DEL JUEGO
// ==========================================

function initGame() {
    currentLevelIndex = 0;
    score = 0;
    loadLevel();
}

function loadLevel() {
    if (currentLevelIndex >= levelsDB.length) {
        endGame();
        return;
    }

    isPaused = false;
    feedbackOverlay.classList.remove('visible');

    // Reset Timer
    clearInterval(timerInterval);
    timeLeft = totalTimePerLevel;
    updateTimerUI();
    startTimer();

    // Actualizar HUD
    levelCounter.innerText = `${String(currentLevelIndex + 1).padStart(2, '0')} / ${levelsDB.length}`;
    
    // Renderizar
    renderSyllogism(levelsDB[currentLevelIndex]);
    renderOptions(levelsDB[currentLevelIndex]);
}

// --- RENDERIZADO DEL SILOGISMO (STACK) ---
function renderSyllogism(levelData) {
    syllogismStack.innerHTML = ''; 

    levelData.parts.forEach((part, index) => {
        const div = document.createElement('div');
        div.classList.add('logic-block');

        if (part === null) {
            // Hueco vacío
            div.classList.add('empty-slot');
            div.innerText = "[ SELECCIONA COMPONENTE ]";
            div.id = "target-slot";
        } else {
            // Parte fija
            div.innerText = part.text;
            if (part.type === 'conclusion') {
                div.classList.add('conclusion');
            }
        }
        syllogismStack.appendChild(div);
    });
}

// --- RENDERIZADO DE OPCIONES (CON ICONO) ---
function renderOptions(levelData) {
    optionsContainer.innerHTML = '';
    
    let options = [...levelData.options];
    options = options.sort(() => Math.random() - 0.5);

    options.forEach(optText => {
        const btn = document.createElement('div');
        btn.classList.add('option-card');
        
        // HTML con Icono SVG pequeño y texto
        btn.innerHTML = `
            <span class="part-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            </span>
            <span>${optText}</span>
        `;
        
        btn.onclick = () => checkAnswer(optText, levelData);
        optionsContainer.appendChild(btn);
    });
}

// ==========================================
// LÓGICA DE RESPUESTA
// ==========================================

function checkAnswer(selectedText, levelData) {
    if (isPaused) return;
    isPaused = true;
    clearInterval(timerInterval);

    const slot = document.getElementById('target-slot');
    const isCorrect = (selectedText === levelData.correctAnswer);

    // Animación visual en el slot
    slot.innerText = selectedText;
    slot.classList.remove('empty-slot');
    
    if (isCorrect) {
        slot.style.borderLeft = "4px solid var(--accent-green)";
        slot.style.color = "var(--accent-green)";
        
        score += 100 + (Math.floor(timeLeft) * 5);
        scoreDisplay.innerText = score;
        
        showFeedback(true, levelData.explanation);
    } else {
        slot.style.borderLeft = "4px solid var(--accent-red)";
        slot.style.color = "var(--accent-red)";
        
        showFeedback(false, levelData.explanation);
    }
}

// --- SISTEMA DE FEEDBACK (ICONOS DE INGENIERÍA) ---
function showFeedback(success, explanation) {
    const overlay = document.getElementById('feedback-overlay');
    const iconBox = document.getElementById('feedback-icon-box');
    const title = document.getElementById('feedback-title');
    const expl = document.getElementById('feedback-explanation');
    
    overlay.className = success ? 'is-correct' : 'is-wrong'; 
    overlay.classList.add('visible');

    title.innerText = success ? "ESTRUCTURA ESTABLE" : "FALLA ESTRUCTURAL";
    expl.innerText = explanation;

    // INYECTAR SVG
    if (success) {
        // Cubo Isométrico (Sólidez)
        iconBox.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>`;
    } else {
        // Triángulo de Alerta (Error)
        iconBox.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`;
    }
}

// Función global para el botón HTML "SIGUIENTE FASE"
window.nextLevel = function() {
    currentLevelIndex++;
    loadLevel();
};

// ==========================================
// TIMER Y FINALIZACIÓN
// ==========================================

function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft -= 0.1;
            if (timeLeft < 0) timeLeft = 0;
            updateTimerUI();
            if (timeLeft <= 0) handleTimeOut();
        }
    }, 100);
}

function updateTimerUI() {
    timeText.innerText = `${Math.ceil(timeLeft)}s`;
    const percentage = (timeLeft / totalTimePerLevel) * 100;
    timerFill.style.width = `${percentage}%`;
    
    if (timeLeft <= 5) timerFill.style.background = '#ff0000';
    else timerFill.style.background = ''; // Usa el gradiente del CSS
}

function handleTimeOut() {
    isPaused = true;
    clearInterval(timerInterval);
    const levelData = levelsDB[currentLevelIndex];
    showFeedback(false, `Tiempo agotado. ${levelData.explanation}`);
}

function endGame() {
    resultsScreen.classList.add('visible');
    document.getElementById('final-score').innerText = score;
    
    const msg = document.getElementById('final-message');
    if (score >= 400) msg.innerText = "¡INGENIERO DE LA LÓGICA! 👷‍♂️";
    else if (score >= 200) msg.innerText = "BUENA ESTRUCTURA";
    else msg.innerText = "CIMIENTOS DÉBILES";
}

// INICIAR
document.addEventListener('DOMContentLoaded', initGame);