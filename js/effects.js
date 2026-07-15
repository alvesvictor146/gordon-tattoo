// ============================================================
// GORDON TATTOO — EFFECTS JS
// Custom cursor, magnetic buttons, and mouse tracking effects
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Check if device supports hover
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (!isTouchDevice && cursor && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move cursor immediately
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });
        
        // Animate follower with delay
        const animateFollower = () => {
            // Easing for smooth follow effect
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateFollower);
        };
        
        animateFollower();
        
        // Hover effects on interactive elements
        const iteractiveElements = document.querySelectorAll('a, button, .carousel-item');
        
        iteractiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1.5)`;
                cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(1.5)`;
                cursorFollower.style.borderColor = 'transparent';
                cursorFollower.style.background = 'rgba(201, 168, 76, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
                cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(1)`;
                cursorFollower.style.borderColor = 'rgba(201, 168, 76, 0.4)';
                cursorFollower.style.background = 'transparent';
            });
        });
    } else {
        // Hide cursors on touch devices
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }
    
    // 2. Magnetic Buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        if (!isTouchDevice) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Move button slightly towards cursor
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                // Move text inside button even more
                const content = el.querySelector('span, i');
                if (content) {
                    gsap.to(content, {
                        x: x * 0.15,
                        y: y * 0.15,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)'
                });
                
                const content = el.querySelector('span, i');
                if (content) {
                    gsap.to(content, {
                        x: 0,
                        y: 0,
                        duration: 0.7,
                        ease: 'elastic.out(1, 0.3)'
                    });
                }
            });
        }
    });

});
