document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvp-form');
    const songInput = document.getElementById('song-input');
    const addSongButton = document.getElementById('add-song-button');
    const songList = document.getElementById('song-list');
    const countdownElement = document.getElementById('countdown');
    const introSection = document.getElementById('intro');
    const invitationSection = document.getElementById('invitation');
    const weddingMusic = document.getElementById('wedding-music');

    // Intentar reproducir música al cargar la página
    const playMusic = () => {
        weddingMusic.play().catch((error) => {
            console.log('El navegador bloqueó la reproducción automática. Reproduzca manualmente.');
        });
    };

    // Llamar a playMusic al cargar la página
    playMusic();

    

    // Enviar RSVP
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        alert(`Gracias por confirmar, ${name}! Has indicado ${guests} acompañantes.`);
        // Aquí puedes enviar los datos al servidor si lo necesitas
    });

    // Añadir canción a la lista
    addSongButton.addEventListener('click', () => {
        const songUrl = songInput.value;
        if (songUrl) {
            const listItem = document.createElement('li');
            listItem.textContent = songUrl;
            songList.appendChild(listItem);
            songInput.value = '';
        } else {
            alert('Por favor, introduce una URL de YouTube.');
        }
    });

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
