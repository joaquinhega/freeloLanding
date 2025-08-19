document.addEventListener('DOMContentLoaded', () => {
    // Manejo del menú hamburguesa para dispositivos móviles
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace (para experiencia móvil)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Animación de fade-in de secciones al hacer scroll
    const sections = document.querySelectorAll('.section.animate-fade-in-up');

    const observerOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.1 // Cuando el 10% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que la animación se activa
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Validación y manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el envío por defecto del formulario

            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();

            if (name === '' || email === '' || message === '') {
                formMessage.textContent = 'Por favor, rellena todos los campos.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            if (!isValidEmail(email)) {
                formMessage.textContent = 'Por favor, introduce un correo electrónico válido.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            // Aquí es donde enviarías los datos del formulario (ej. a un servidor)
            // Por ahora, simularemos un envío exitoso
            console.log('Formulario enviado:', { name, email, message });

            formMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset(); // Limpia el formulario
        });
    }

    // Función para validar formato de email básico
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
