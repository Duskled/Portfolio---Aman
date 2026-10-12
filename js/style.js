const cells = document.querySelectorAll('.bento-cell');

cells.forEach(cell => {
    // Inject a glare layer for the liquid reflection
    const glare = document.createElement('div');
    glare.classList.add('glass-glare');
    cell.appendChild(glare);

    // Grab the avatar so we can give it independent depth (parallax)
    const avatar = cell.querySelector('.avatar-img, .cell-icon');

    cell.addEventListener('mousemove', (e) => {
        const rect = cell.getBoundingClientRect();
        // Cursor position inside the cell
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Math for the elastic stretch and tilt
        const tiltX = ((y - centerY) / centerY) * -12; // Tilts away from cursor
        const tiltY = ((x - centerX) / centerX) * 12;
        
        // Magnetic pull (the stretchy feel)
        const moveX = ((x - centerX) / centerX) * 6; 
        const moveY = ((y - centerY) / centerY) * 6;

        // Apply the physical distortion
        cell.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02) translate(${moveX}px, ${moveY}px)`;
        
        // Move the liquid highlight exactly under the cursor
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`;

        // Shift the avatar in the opposite direction for a deep water parallax effect
        if (avatar) {
            avatar.style.transform = `translateZ(40px) translate(${moveX * -1.5}px, ${moveY * -1.5}px)`;
        }
    });

    cell.addEventListener('mouseleave', () => {
        // Snap back to the original rigid state like a rubber band
        cell.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translate(0px, 0px)`;
        glare.style.background = `transparent`;
        
        if (avatar) {
            avatar.style.transform = `translateZ(0px) translate(0px, 0px)`;
        }
    });
});