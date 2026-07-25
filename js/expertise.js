// ============================================================
// GORDON TATTOO — EXPERTISE CAROUSEL JS
// Handles the left/right buttons for the expertise video carousel
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('expertise-carousel');
    const prevBtn = document.getElementById('expertise-prev');
    const nextBtn = document.getElementById('expertise-next');

    if (track && prevBtn && nextBtn) {
        // Scroll amount based on one card width + gap
        const getScrollAmount = () => {
            const card = track.querySelector('.style-card');
            if (!card) return 300; // fallback
            // Add gap (assuming gap is 1.5rem ~ 24px)
            const gap = parseFloat(getComputedStyle(track).gap) || 24;
            return card.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }
});
