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
        let followerX = 0;
        let followerY = 0;
        let cursorScale = 1;
        let rafId = null;
        
        // Animate follower with delay only while moving
        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.12;
            followerY += dy * 0.12;
            
            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
            
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                rafId = requestAnimationFrame(animateFollower);
            } else {
                rafId = null;
            }
        };
        
        // Track mouse movement passively
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
            
            if (!rafId) {
                rafId = requestAnimationFrame(animateFollower);
            }
        }, { passive: true });
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .carousel-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorScale = 1.5;
                cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
                cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
                cursorFollower.style.borderColor = 'transparent';
                cursorFollower.style.background = 'rgba(201, 168, 76, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorScale = 1;
                cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
                cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
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
    
    if (!isTouchDevice && typeof gsap !== 'undefined') {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
                
                const content = el.querySelector('span, i');
                if (content) {
                    gsap.to(content, {
                        x: x * 0.15,
                        y: y * 0.15,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            }, { passive: true });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)',
                    overwrite: 'auto'
                });
                
                const content = el.querySelector('span, i');
                if (content) {
                    gsap.to(content, {
                        x: 0,
                        y: 0,
                        duration: 0.7,
                        ease: 'elastic.out(1, 0.3)',
                        overwrite: 'auto'
                    });
                }
            });
        });
    }

});
