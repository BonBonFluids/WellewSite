document.addEventListener('DOMContentLoaded', function () {
    const headerMain = document.getElementById('site-header-main');
    const headerScrolled = document.getElementById('site-header-scrolled');
    const heroVideo = document.querySelector('.hero-video-bg');
    const heroSection = document.querySelector('.hero-section');
    const heroHeadline = document.querySelector('.hero-headline');
    const featureItems = document.querySelectorAll('.feature-item'); // Added for animations

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

    function handleScrollEffects() {
        const scrollY = window.scrollY;

        // Header scroll effect
        if (headerMain && headerScrolled) {
            if (scrollY > headerScrollTriggerHeight) {
                headerMain.classList.add('header-is-hidden');
                headerMain.classList.remove('header-is-visible');
                headerScrolled.classList.add('header-is-visible');
                headerScrolled.classList.remove('header-is-hidden');
            } else {
                headerMain.classList.remove('header-is-hidden');
                headerMain.classList.add('header-is-visible');
                headerScrolled.classList.remove('header-is-visible');
                headerScrolled.classList.add('header-is-hidden');
            }
        }

        // Video scroll effect
        if (heroVideo && heroSection) {
            const heroSectionHeight = heroSection.offsetHeight;
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
    }

    window.addEventListener('scroll', handleScrollEffects);

    // Intersection Observer for Feature Item Animations
    if (featureItems.length > 0) {
        const observerOptions = {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.1 // trigger when 10% of the item is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        };

        const featureObserver = new IntersectionObserver(observerCallback, observerOptions);
        featureItems.forEach(item => {
            featureObserver.observe(item);
        });
    }

    // RSVP Form Handling
    const rsvpForm = document.getElementById('rsvp-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (rsvpForm && thankYouMessage) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');

            // Basic validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                alert('Please fill in both name and email fields.');
                return;
            }

            // Validate email format (simple regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                return;
            }

            // If validation passes:
            rsvpForm.style.display = 'none'; // Hide the form
            thankYouMessage.style.display = 'block'; // Show the thank you message

            // Here you would typically send the data to a backend or a service like Formspree.
            // For this static example, we're just showing a message.
            console.log('RSVP Submitted:');
            console.log('Name:', nameInput.value.trim());
            console.log('Email:', emailInput.value.trim());
        });
    } else {
        // Check if we are on the rsvp page to avoid unnecessary console errors on other pages
        if (document.querySelector('.rsvp-section')) { // A class specific to rsvp.html body or main section
            console.warn('RSVP form or thank you message element not found. Form submission will not work.');
        }
    }
});
