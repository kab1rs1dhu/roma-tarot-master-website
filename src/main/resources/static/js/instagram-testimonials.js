document.addEventListener('DOMContentLoaded', function() {
    // Initialize all testimonial carousels on the page
    initTestimonialCarousels();
});

function initTestimonialCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const nextButton = carousel.querySelector('.carousel-next');
        const prevButton = carousel.querySelector('.carousel-prev');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentIndex = 0;
        let slideWidth = carousel.clientWidth;
        let autoplayInterval;
        
        // Set initial positions
        updateCarousel();
        
        // Start autoplay
        startAutoplay();
        
        // Event listeners
        window.addEventListener('resize', () => {
            slideWidth = carousel.clientWidth;
            updateCarousel();
        });
        
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        });
        
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
        });
        
        // Add swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        // Functions
        function updateCarousel() {
            // Update track transform
            track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        function goToSlide(index) {
            // Handle wrapping
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            updateCarousel();
        }
        
        function startAutoplay() {
            // Clear any existing interval
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
            
            // Start new interval - advance slide every 10 seconds
            autoplayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 10000);
        }
        
        function resetAutoplay() {
            // Reset the autoplay timer when user interacts
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX - touchStartX > swipeThreshold) {
                // Swiped right - go to previous slide
                goToSlide(currentIndex - 1);
                resetAutoplay();
            } else if (touchStartX - touchEndX > swipeThreshold) {
                // Swiped left - go to next slide
                goToSlide(currentIndex + 1);
                resetAutoplay();
            }
        }
        
        // Pause autoplay when tab/window is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoplayInterval);
            } else {
                startAutoplay();
            }
        });
    });
}