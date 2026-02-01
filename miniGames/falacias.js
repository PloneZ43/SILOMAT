document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('depth-canvas');
    if (!canvas) {
        console.error('✗ Error: Canvas "depth-canvas" no encontrado en el HTML (falacias)');
        return;
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
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
        for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
        console.log(`✓ ${numberOfParticles} partículas inicializadas (falacias)`);
    }
    initParticles();

    const statue = document.querySelector('.hero-statue');
    const planet = document.querySelector('.red-planet');
    const orb = document.querySelector('.small-orb');
    const elementsReady = statue && planet;
    if (!elementsReady) console.error('✗ Error: Falta .hero-statue o .red-planet en el HTML (falacias)');

    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    const smoothFactor = 0.05;

    window.addEventListener('mousemove', (e) => {
        mouseX = (window.innerWidth / 2 - e.clientX) / 25;
        mouseY = (window.innerHeight / 2 - e.clientY) / 25;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); particlesArray[i].draw(); }

        currentX += (mouseX - currentX) * smoothFactor;
        currentY += (mouseY - currentY) * smoothFactor;

        if (window.innerWidth > 768 && elementsReady) {
            if (statue) statue.style.transform = `translateY(-45%) translate(${currentX * 1}px, ${currentY * 1}px)`;
            if (planet) planet.style.transform = `translateY(-50%) translate(${currentX * 2}px, ${currentY * 2}px)`;
            if (orb) orb.style.transform = `translate(${currentX * -1.5}px, ${currentY * -1.5}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
    console.log('✓ Animación iniciada (falacias)');

    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); });
});
