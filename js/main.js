// ============================================================
// GORDON TATTOO — MAIN JS
// Setup for GSAP, ScrollTrigger, Lenis, Lazy Media and Core Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fast Loading Screen Release (no longer blocked by heavy media downloads)
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loader-progress');

    if (progressBar) {
        progressBar.style.width = '100%';
    }

    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
        }
        document.body.classList.add('loaded');

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 350);

    // 2. Hero Video Loop & Background Audio Toggle
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        const sources = [
            "Man_tattooing_woman's_back_1080p_202607151209.mp4",
            "Man_tattooing_woman's_back_202607151207.mp4"
        ];
        let currentVideo = 0;

        heroVideo.addEventListener('ended', () => {
            currentVideo = (currentVideo + 1) % sources.length;
            heroVideo.src = sources[currentVideo];
            heroVideo.play().catch(() => {});
        });
    }

    const audio = document.getElementById('bg-audio');
    const soundBtn = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    if (soundBtn && audio && soundIcon) {
        audio.volume = 0.5;
        let isMuted = false;

        soundBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    isMuted = false;
                    audio.muted = false;
                    soundIcon.className = 'fas fa-volume-up';
                }).catch(() => {});
            } else {
                isMuted = !isMuted;
                audio.muted = isMuted;
                soundIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        });
    }

    // 3. Smart Lazy Loading & Auto Play/Pause for Videos via IntersectionObserver
    const lazyVideos = document.querySelectorAll('video.lazy-video');

    if ('IntersectionObserver' in window) {
        // Load video source slightly before entering viewport
        const loadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src && !video.getAttribute('src')) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: '350px 0px' });

        // Play only when visible in viewport, pause when offscreen to save GPU/CPU
        const playObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (video.dataset.src && !video.getAttribute('src')) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    video.play().catch(() => {});
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.15 });

        lazyVideos.forEach(video => {
            loadObserver.observe(video);
            playObserver.observe(video);
        });

        if (heroVideo) {
            playObserver.observe(heroVideo);
        }
    } else {
        // Fallback for older browsers
        lazyVideos.forEach(video => {
            if (video.dataset.src) {
                video.src = video.dataset.src;
                video.play().catch(() => {});
            }
        });
    }

    // 4. Navbar Interaction (passive scroll listener)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 5. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.getElementById('nav-mobile');

    if (navToggle && navMobile) {
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
    }

    // 6. GSAP, ScrollTrigger & Lenis Smooth Scroll
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (typeof Lenis !== 'undefined') {
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

            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }

        // Standard reveals
        document.querySelectorAll('.reveal').forEach(el => {
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
        document.querySelectorAll('.reveal-left').forEach(el => {
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
        document.querySelectorAll('.reveal-scale').forEach(el => {
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
        document.querySelectorAll('.reveal-blur').forEach(el => {
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
        document.querySelectorAll('.bg-word').forEach(word => {
            const speed = parseFloat(word.getAttribute('data-speed')) || 0.5;
            gsap.to(word, {
                scrollTrigger: {
                    trigger: word.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: () => -ScrollTrigger.maxScroll(window) * speed * 0.1,
                ease: "none"
            });
        });

        // Process Timeline Animation
        const processSteps = document.querySelectorAll('.process-step');
        const timelineLine = document.getElementById('timeline-line');

        if (processSteps.length > 0 && timelineLine) {
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

            processSteps.forEach((step) => {
                gsap.to(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: "top 60%",
                        toggleClass: "active"
                    }
                });

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
    }
});
