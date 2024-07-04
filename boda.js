document.addEventListener('DOMContentLoaded', () => {
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

document.getElementById('submit-all').addEventListener('click', function() {
    const rsvpForm = document.getElementById('rsvp-form');
    const busSurveyForm = document.getElementById('bus-survey-form');
    
    const rsvpData = new FormData(rsvpForm);
    const busSurveyData = new FormData(busSurveyForm);
    
    const combinedData = {};
    
    rsvpData.forEach((value, key) => {
        combinedData[key] = value;
    });
    
    busSurveyData.forEach((value, key) => {
        combinedData[key] = value;
    });
    
    fetch('https://script.google.com/macros/s/AKfycbwaLy-BTEH9uQIYk0Tj_q1_-W22coJqgU79zqGqVcCivAvBLPwwifHaoyGM_jQhPKtv/exec', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedData)
    }).then(response => response.text())
      .then(data => alert('Formulario enviado exitosamente!'))
      .catch(error => alert('Hubo un error al enviar el formulario.'));
});
