// ============================================================
// GORDON TATTOO — MAIN JS
// Setup for GSAP, ScrollTrigger, Lenis and Core Interactions
// ============================================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Lenis Smooth Scroll Setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 2. Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loader-progress');
    
    // Simulate loading progress
    progressBar.style.width = '100%';
    
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Trigger initial hero animations by adding a class to body
        document.body.classList.add('loaded');
        
        // Refresh ScrollTrigger after loader is hidden
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }, 1800);
});

// 3. Navbar Interaction
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add background on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 4. Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');
const mobileLinks = navMobile.querySelectorAll('a');

navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    navToggle.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// 5. Scroll Revelations (Fade/Scale/Blur)
document.addEventListener('DOMContentLoaded', () => {
    // Standard reveals
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Reveal from Left
    const revealLeftElements = document.querySelectorAll('.reveal-left');
    revealLeftElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Reveal with Scale
    const revealScaleElements = document.querySelectorAll('.reveal-scale');
    revealScaleElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true
            },
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Reveal with Blur
    const revealBlurElements = document.querySelectorAll('.reveal-blur');
    revealBlurElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true
            },
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Background Words Parallax
    const bgWords = document.querySelectorAll('.bg-word');
    bgWords.forEach(word => {
        const speed = parseFloat(word.getAttribute('data-speed')) || 0.5;
        gsap.to(word, {
            scrollTrigger: {
                trigger: word.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1,
            ease: "none"
        });
    });

    // 6. Process Timeline Animation
    const processSteps = document.querySelectorAll('.process-step');
    const timelineLine = document.getElementById('timeline-line');

    if (processSteps.length > 0) {
        // Animate the line
        gsap.to(timelineLine, {
            scrollTrigger: {
                trigger: "#timeline-container",
                start: "top 50%",
                end: "bottom 60%",
                scrub: 1
            },
            height: "100%",
            ease: "none"
        });

        // Highlight steps
        processSteps.forEach((step, i) => {
            gsap.to(step, {
                scrollTrigger: {
                    trigger: step,
                    start: "top 60%",
                    toggleClass: "active"
                }
            });

            // Reveal step content
            gsap.to(step, {
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    once: true
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
});
