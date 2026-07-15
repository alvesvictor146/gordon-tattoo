// ============================================================
// GORDON TATTOO — CAROUSEL JS
// Horizontal scroll tied to vertical scroll
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if horizontal carousel exists
    const track = document.getElementById('horizontal-carousel');
    const container = document.querySelector('.carousel-track-container');
    const section = document.getElementById('gallery');

    if (track && container && section) {
        // Calculate the amount to scroll horizontally
        // It's the total width of the track minus the container width
        
        function getScrollAmount() {
            let trackWidth = track.scrollWidth;
            let containerWidth = container.offsetWidth;
            return -(trackWidth - containerWidth + 40); // Add a small buffer
        }

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: section,
            start: "top 10%",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true
        });

        // Individual item parallax within the carousel
        const items = document.querySelectorAll('.carousel-item img');
        
        items.forEach(item => {
            gsap.to(item, {
                x: "15%", // Slight counter-movement
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 10%",
                    end: () => `+=${getScrollAmount() * -1}`,
                    scrub: 1
                }
            });
        });
    }
});
