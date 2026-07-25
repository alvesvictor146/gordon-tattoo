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
        const prevBtn = document.getElementById('gallery-prev');
        const nextBtn = document.getElementById('gallery-next');
        
        if (prevBtn && nextBtn) {
            const getScrollAmount = () => {
                const item = track.querySelector('.carousel-item');
                if (!item) return 300;
                const gap = parseFloat(getComputedStyle(track).gap) || 24;
                return item.offsetWidth + gap;
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
    }
});
