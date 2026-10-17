let carouselRot = 0;

// Calculates which of the 6 images is currently facing forward
function updateFrontCell(rot) {
    const cells = document.querySelectorAll('.carousel-cell');
    if (!cells.length) return;
    
    // Each image is 60 degrees apart (360 / 6)
    let index = Math.round(-rot / 60);
    let activeIndex = ((index % 6) + 6) % 6; 
    
    cells.forEach((cell, i) => {
        if (i === activeIndex) {
            cell.classList.add('front-cell');
        } else {
            cell.classList.remove('front-cell');
        }
    });
}

// Run it once on load to set the first image as active
updateFrontCell(0);

window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero-scene');
    const scrollY = window.scrollY;
    
    if(hero) {
        const opacity = Math.max(1 - (scrollY / 400), 0); 
        const translateY = scrollY * 0.4; 
        const scale = Math.max(1 - (scrollY / 2000), 0.9);

        hero.style.opacity = opacity;
        hero.style.transform = `translateY(${translateY}px) scale(${scale})`;
        
        if (opacity === 0) {
            hero.style.pointerEvents = 'none';
        } else {
            hero.style.pointerEvents = 'auto';
        }
    }

    const carousel = document.getElementById('wro-carousel');
    if(carousel && (window.innerHeight + scrollY) < document.body.scrollHeight - 10) {
        carouselRot = scrollY * -0.15;
        carousel.style.transform = `rotateY(${carouselRot}deg)`;
        updateFrontCell(carouselRot);
    }
});

window.addEventListener('wheel', (e) => {
    const carousel = document.getElementById('wro-carousel');
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 10;
    
    if (carousel && isAtBottom) {
        carouselRot += e.deltaY * -0.15;
        carousel.style.transform = `rotateY(${carouselRot}deg)`;
        updateFrontCell(carouselRot);
    }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((el) => revealObserver.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.wro-img');

if(galleryImages && lightbox) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });
}