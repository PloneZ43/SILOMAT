document.addEventListener('DOMContentLoaded', () => {
    // Generador de estrellas de fondo
    const starContainer = document.getElementById('star-container');
    const starCount = 80; // Cantidad equilibrada

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posiciones aleatorias
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Variación de tamaño y duración
        const size = Math.random() * 2; 
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);

        starContainer.appendChild(star);
    }
});