document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CONFIGURACIÓN DEL CANVAS (PARTÍCULAS)
    // ==========================================
    const canvas = document.getElementById('depth-canvas');
    
    // VALIDACIÓN CRÍTICA
    if (!canvas) {
        console.error('✗ Error: Canvas "depth-canvas" no encontrado en el HTML');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    // Clase Partícula (Polvo atmosférico)
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2; 
            // Velocidad muy lenta para ambiente relajado
            this.speedX = Math.random() * 0.2 - 0.1; 
            this.speedY = Math.random() * 0.2 - 0.1; 
            this.opacity = Math.random() * 0.5; 
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Efecto infinito (reaparecer al salir)
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = 80;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
        console.log(`✓ ${numberOfParticles} partículas inicializadas`);
    }
    initParticles();

    // ==========================================
    // 2. CONFIGURACIÓN DEL MOVIMIENTO SUAVE (LERP)
    // ==========================================
    const statue = document.querySelector('.hero-statue');
    const planet = document.querySelector('.red-planet');
    const orb = document.querySelector('.small-orb');

    // VALIDACIÓN DE ELEMENTOS
    const elementsReady = statue && planet;
    if (!elementsReady) {
        console.error('✗ Error: Falta .hero-statue o .red-planet en el HTML');
    }

    // Variables para la posición del mouse (Objetivo)
    let mouseX = 0;
    let mouseY = 0;

    // Variables para la posición actual de los elementos (Suavizada)
    let currentX = 0;
    let currentY = 0;

    // Factor de suavidad (Entre 0.01 y 0.1). 
    // 0.05 es muy elegante (lento y pesado). 0.1 es más rápido.
    const smoothFactor = 0.05; 

    // Escuchamos el mouse solo para actualizar el "Objetivo"
    window.addEventListener('mousemove', (e) => {
        // Calculamos la distancia desde el centro
        mouseX = (window.innerWidth / 2 - e.clientX) / 25; 
        mouseY = (window.innerHeight / 2 - e.clientY) / 25;
    });

    // ==========================================
    // 3. BUCLE DE ANIMACIÓN PRINCIPAL (GAMELOOP)
    // ==========================================
    function animate() {
        // A. Limpiar y dibujar partículas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        // B. Lógica de Suavizado (Lerp) para el Parallax
        // Fórmula: PosiciónActual += (Objetivo - PosiciónActual) * Factor
        currentX += (mouseX - currentX) * smoothFactor;
        currentY += (mouseY - currentY) * smoothFactor;

        // C. Aplicar el movimiento a los elementos si existen
        if (window.innerWidth > 768 && elementsReady) {
            if (statue) {
                // La estatua se mueve poco (capa cercana)
                statue.style.transform = `translateY(-45%) translate(${currentX * 1}px, ${currentY * 1}px)`;
            }
            if (planet) {
                // El planeta se mueve más (capa lejana) - Efecto profundidad
                // Consistente con CSS: translateY(-50%)
                planet.style.transform = `translateY(-50%) translate(${currentX * 2}px, ${currentY * 2}px)`; 
            }
            if (orb) {
                // El orbe flota mucho más
                orb.style.transform = `translate(${currentX * -1.5}px, ${currentY * -1.5}px)`;
            }
        }

        requestAnimationFrame(animate);
    }

    // Iniciar todo
    animate();
    console.log('✓ Animación iniciada');

    // Redimensionar canvas si cambia la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});