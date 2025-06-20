document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    const heroVideo = document.querySelector('.hero-video-bg');
    const heroSection = document.querySelector('.hero-section');

    const headerScrollTriggerHeight = 50; // Pixels to scroll before changing header style

    // Basic error checking
    if (!header) {
        console.error('Header element (.site-header) not found!');
    }
    if (!heroVideo) {
        console.error('Hero video element (.hero-video-bg) not found!');
    }
    if (!heroSection) {
        console.error('Hero section element (.hero-section) not found!');
    }

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Header scroll effect
        if (header) {
            if (scrollY > headerScrollTriggerHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Video scroll effect
        if (heroVideo && heroSection) {
            const heroSectionHeight = heroSection.offsetHeight;
            // Trigger video change sooner (e.g., after 10% scroll of hero height)
            const videoScrollTriggerHeight = heroSectionHeight * 0.10;

            if (scrollY > videoScrollTriggerHeight) {
                heroVideo.classList.add('scrolled-past');
            } else {
                heroVideo.classList.remove('scrolled-past');
            }
        }
    });
});
