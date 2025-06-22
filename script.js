document.addEventListener('DOMContentLoaded', function () {
    const headerMain = document.getElementById('site-header-main');
    const headerScrolled = document.getElementById('site-header-scrolled');
    const heroVideo = document.querySelector('.hero-video-bg');
    const heroSection = document.querySelector('.hero-section');
    const heroHeadline = document.querySelector('.hero-headline'); // Added

    const headerScrollTriggerHeight = 50; // Pixels to scroll before changing header style
    const headlineFadeTriggerHeight = 70; // Pixels to scroll before fading headline

    // Basic error checking
    if (!headerMain) {
        console.error('Main header element (#site-header-main) not found!');
    }
    if (!headerScrolled) {
        console.error('Scrolled header element (#site-header-scrolled) not found!');
    }
    if (!heroVideo) {
        console.error('Hero video element (.hero-video-bg) not found!');
    }
    if (!heroSection) {
        console.error('Hero section element (.hero-section) not found!');
    }
    if (!heroHeadline) { // Added
        console.error('Hero headline element (.hero-headline) not found!');
    }

    // Ensure initial states are correct based on CSS (scrolled header should be hidden by default)
    // CSS should handle initial hidden state for headerScrolled.
    // headerMain starts visible by default.

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Header scroll effect
        if (headerMain && headerScrolled) {
            if (scrollY > headerScrollTriggerHeight) {
                headerMain.classList.add('header-is-hidden');
                headerMain.classList.remove('header-is-visible'); // Explicitly remove if set

                headerScrolled.classList.add('header-is-visible');
                headerScrolled.classList.remove('header-is-hidden');
            } else {
                headerMain.classList.remove('header-is-hidden');
                headerMain.classList.add('header-is-visible'); // Explicitly add if needed

                headerScrolled.classList.remove('header-is-visible');
                headerScrolled.classList.add('header-is-hidden');
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

        // Hero headline fade effect
        if (heroHeadline) {
            if (scrollY > headlineFadeTriggerHeight) {
                heroHeadline.classList.add('fade-out');
            } else {
                heroHeadline.classList.remove('fade-out');
            }
        }
    });
});
