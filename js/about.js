const poseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-step');
        } else {
            entry.target.classList.remove('active-step');
        }
    });
}, {
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0
});

const poses = document.querySelectorAll('.pose-step');
poses.forEach((el) => poseObserver.observe(el));