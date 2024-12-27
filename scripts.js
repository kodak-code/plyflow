document.addEventListener('DOMContentLoaded', function () {
    const novedadesSection = document.getElementById('novedades');
    const swiperContainer = document.getElementById('swiper-container');
    
    // Cargar el swiper
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
    
});