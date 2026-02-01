// === INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO ===
document.addEventListener('DOMContentLoaded', () => {
    // === OBTENER CANVAS Y CONTEXTO ===
    // Obtener el elemento canvas para dibujar partículas
    const canvas = document.getElementById('depth-canvas');
    if (!canvas) {
        console.error('✗ Error: Canvas "depth-canvas" no encontrado en el HTML (falacias)');
        return;
    }
    
    // Obtener contexto 2D para dibujar en el canvas
    const ctx = canvas.getContext('2d');
    
    // Establecer dimensiones del canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // === ARRAY DE PARTÍCULAS ===
    // Almacenar todas las partículas de fondo
    let particlesArray = [];

    // === CLASE PARTICLE === 
    // Define el comportamiento de cada partícula individual
    class Particle {
        constructor() {
            // Posición aleatoria en el canvas
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Tamaño pequeño de la partícula
            this.size = Math.random() * 2;
            // Velocidad lenta en ambas direcciones
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            // Transparencia variable para efecto más natural
            this.opacity = Math.random() * 0.5;
        }
        
        // Actualizar posición de la partícula
        update() {
            // Mover partícula según su velocidad
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Hacer que las partículas se envuelvan en los bordes del canvas
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        // Dibujar la partícula en el canvas
        draw() {
            // Establecer color blanco con transparencia variable
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            // Dibujar círculo (arco de 360 grados)
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // === INICIALIZACIÓN DE PARTÍCULAS ===
    // Crear todas las partículas al inicio
    function initParticles() {
        particlesArray = [];
        const numberOfParticles = 80;
        // Crear 80 partículas nuevas
        for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
        console.log(`✓ ${numberOfParticles} partículas inicializadas (falacias)`);
    }
    initParticles();

    // === OBTENER ELEMENTOS DEL DOM ===
    // Obtener referencias a elementos visuales que se animarán
    const statue = document.querySelector('.hero-statue');
    const planet = document.querySelector('.red-planet');
    const orb = document.querySelector('.small-orb');
    
    // Verificar que los elementos necesarios existan
    const elementsReady = statue && planet;
    if (!elementsReady) console.error('✗ Error: Falta .hero-statue o .red-planet en el HTML (falacias)');

    // === VARIABLES DE MOVIMIENTO DEL MOUSE ===
    // Almacenar posición del mouse y posición suavizada actual
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    // Factor de suavizado para transiciones fluidas (0-1, menor = más suave)
    const smoothFactor = 0.05;

    // === EVENT LISTENER DEL MOUSE ===
    // Detectar movimiento del mouse para parallax
    window.addEventListener('mousemove', (e) => {
        // Calcular distancia del mouse desde el centro de la pantalla
        mouseX = (window.innerWidth / 2 - e.clientX) / 25;
        mouseY = (window.innerHeight / 2 - e.clientY) / 25;
    });

    // === FUNCIÓN DE ANIMACIÓN PRINCIPAL ===
    // Ejecutar continuamente para animar partículas y elementos
    function animate() {
        // Limpiar canvas para el siguiente frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar cada partícula
        for (let i = 0; i < particlesArray.length; i++) { 
            particlesArray[i].update(); 
            particlesArray[i].draw(); 
        }

        // === SUAVIZADO DE MOVIMIENTO ===
        // Interpolar suavemente hacia la posición del mouse
        currentX += (mouseX - currentX) * smoothFactor;
        currentY += (mouseY - currentY) * smoothFactor;

        // === PARALLAX EN DESKTOP ===
        // Aplicar efecto parallax solo en pantallas > 768px
        if (window.innerWidth > 768 && elementsReady) {
            // La estatua se mueve con el mouse (factor 1x)
            if (statue) statue.style.transform = `translateY(-45%) translate(${currentX * 1}px, ${currentY * 1}px)`;
            // El planeta se mueve más rápido (factor 2x para profundidad)
            if (planet) planet.style.transform = `translateY(-50%) translate(${currentX * 2}px, ${currentY * 2}px)`;
            // La esfera se mueve en dirección opuesta (factor -1.5x)
            if (orb) orb.style.transform = `translate(${currentX * -1.5}px, ${currentY * -1.5}px)`;
        }

        // Solicitar siguiente frame de animación
        requestAnimationFrame(animate);
    }

    // Iniciar la animación
    animate();
    console.log('✓ Animación iniciada (falacias)');

    // === EVENT LISTENER DE REDIMENSIONAMIENTO ===
    // Actualizar canvas y partículas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
        initParticles(); 
    });
});
