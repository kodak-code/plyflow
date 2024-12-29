document.addEventListener('DOMContentLoaded', function () {
    // Seccion Novedades y Swiper
    const novedadesSection = document.getElementById('novedades');
    const swiperContainer = document.getElementById('swiper-container');

    function cargarSwiper() {
        new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                novedadesSection.classList.add('visible');
                cargarSwiper();
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(novedadesSection);

    // Seccion Libros y Animaciones
    const sectionLibros = document.querySelector("#libros-descripcion");
    const libros = document.querySelectorAll(".libro");
    const textos = document.querySelectorAll(".titulo-descripcion, .texto-descripcion, .texto-secundario");
    const btn = document.querySelector(".btn");

    const opciones = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const animarLibrosYTexto = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                libros.forEach(libro => {
                    const animationClass = libro.classList.contains("libro-azul") ? "acomodarLibros" : "acomodarLibrosVerde";
                    libro.style.animation = `${animationClass} 2s ease-out forwards`;
                });

                textos.forEach(texto => texto.classList.add("visible"));
                btn.style.animation = "aparecerBoton 2s ease-out forwards";
                observador.unobserve(sectionLibros);
            }
        });
    };

    const observer2 = new IntersectionObserver(animarLibrosYTexto, opciones);
    observer2.observe(sectionLibros);

    // Testimonios
    const h2Testimonios = document.querySelector('.testimonios h2');
    const testimonios = document.querySelectorAll('.testimonio-card');
    let testimonioIndex = 0;

    const showTestimonio = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        testimonios.forEach((testimonio, index) => {
            const rect = testimonio.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;

            if (elementTop < scrollTop + windowHeight - 100 && !testimonio.classList.contains('show-testimonio')) {
                if (index === testimonioIndex) {
                    setTimeout(() => {
                        testimonio.classList.add('show-testimonio');
                    }, index * 500);
                    testimonioIndex++;
                }
            }
        });

        const rectH2 = h2Testimonios.getBoundingClientRect();
        if (rectH2.top < windowHeight - 100) {
            h2Testimonios.classList.add('animate-text');
        }
    };

    window.addEventListener('scroll', showTestimonio);
    showTestimonio(); // Llama a la funcion inmediatamente

    // Sobre Nosotros
    const sobreNosotros = document.querySelector('.sobre-nosotros');

    const showSobreNosotros = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const rect = sobreNosotros.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;

        if (elementTop < scrollTop + windowHeight - 250 && !sobreNosotros.classList.contains('show-nosotros')) {
            sobreNosotros.classList.add('show-nosotros');
        }
    };

    window.addEventListener('scroll', showSobreNosotros);
    showSobreNosotros(); // Llama a la funcion inmediatamente

    // Contacto
    const contacto = document.querySelector('.contacto');

    const focusContacto = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const rect = contacto.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;

        if (elementTop < scrollTop + windowHeight - 100 && !contacto.classList.contains('focus-contacto')) {
            contacto.classList.add('focus-contacto');
        }
    };

    window.addEventListener('scroll', focusContacto);
    focusContacto(); // Llama a la funcion inmediatamente
});
//Colores
document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', () => {
        const colorSection = button.nextElementSibling;
        colorSection.classList.toggle('d-none');
    });
});

// Manejar el color con los clicks
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        const tarjeta = option.closest('.tarjeta-libro');
        const imagen = tarjeta.querySelector('.imagen-libro');
        const color = option.getAttribute('data-color');
        imagen.src = `img/${color}.jpg`;
        imagen.alt = color;
    });
});