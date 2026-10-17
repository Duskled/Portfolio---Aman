window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero-scene');
    if(hero) {
        const scrollY = window.scrollY;
        
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
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((el) => revealObserver.observe(el));