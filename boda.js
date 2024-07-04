document.addEventListener('DOMContentLoaded', () => {
    const songInput = document.getElementById('song-input');
    const countdownElement = document.getElementById('countdown');
    const weddingMusic = document.getElementById('wedding-music');

    // Intentar reproducir música al cargar la página
    const playMusic = () => {
        weddingMusic.play().catch((error) => {
            console.log('El navegador bloqueó la reproducción automática. Reproduzca manualmente.');
        });
    };

    // Llamar a playMusic al cargar la página
    playMusic();

    // Efecto de aparición al deslizar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.invitation > div');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Función de cuenta regresiva
    function updateCountdown() {
        const eventDate = new Date('October 05, 2024 18:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "¡El evento ha comenzado!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display countdown immediately
});
