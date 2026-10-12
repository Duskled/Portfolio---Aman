const cells = document.querySelectorAll('.project-cell');

cells.forEach(cell => {
    cell.addEventListener('mousemove', (e) => {
        const rect = cell.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = ((y - centerY) / centerY) * -8; 
        const tiltY = ((x - centerX) / centerX) * 8;
        
        const moveX = ((x - centerX) / centerX) * 4; 
        const moveY = ((y - centerY) / centerY) * 4;

        cell.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02) translate(${moveX}px, ${moveY}px)`;
    });

    cell.addEventListener('mouseleave', () => {
        cell.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translate(0px, 0px)`;
    });
});