document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('star-container');
    const starCount = 150; // Cantidad de estrellas

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posición aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamaño aleatorio (pequeñas para dar sensación de lejanía)
        const size = Math.random() * 2 + 1; // Entre 1px y 3px
        
        // Duración de parpadeo aleatoria
        const duration = Math.random() * 3 + 2; // Entre 2s y 5s

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);

        starContainer.appendChild(star);
    }
});