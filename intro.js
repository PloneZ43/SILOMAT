document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias
    const bootScreen = document.getElementById('boot-screen');
    const bsodScreen = document.getElementById('bsod-screen');
    const progressBar = document.querySelector('.progress');
    const body = document.body;

    // 1. INICIAR BARRA DE PROGRESO (Simula 10 segundos)
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);

    // 2. ACTIVAR PANTALLA AZUL (A los 10 segundos)
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        bsodScreen.classList.remove('hidden');
        
        // Sonido de error de Windows (Opcional, los navegadores a veces lo bloquean)
        // const audio = new Audio('error.mp3'); audio.play(); 
    }, 10000); // 10000 ms = 10 segundos

    // 3. ACTIVAR GLITCH (A los 13 segundos - 3s después del pantallazo)
    setTimeout(() => {
        body.classList.add('glitch-mode');
    }, 13000);

    // 4. REDIRIGIR A LA PÁGINA REAL (A los 14.5 segundos)
    setTimeout(() => {
        window.location.href = 'index.html'; // AQUÍ REDIRIGE A TU LANDING PAGE
    }, 14500);

});