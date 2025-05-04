document.addEventListener('DOMContentLoaded', function() {
    // Check if the welcome experience has been shown before
    if (!sessionStorage.getItem('welcomeExperienceShown')) {
        initWelcomeExperience();
    }
});

function initWelcomeExperience() {
    const welcomeExperience = document.getElementById('welcome-experience');
    
    // If welcome experience element doesn't exist, add it to the page
    if (!welcomeExperience) {
        // Add backdrop image preload
        const backdropPreload = document.createElement('link');
        backdropPreload.rel = 'preload';
        backdropPreload.href = '/images/mystical-background.jpg';
        backdropPreload.as = 'image';
        document.head.appendChild(backdropPreload);
        
        // Fetch the welcome experience HTML and inject it
        fetch('/html/welcome-experience.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                setupWelcomeEvents();
            })
            .catch(error => {
                console.error('Error loading welcome experience:', error);
            });
    } else {
        setupWelcomeEvents();
    }
}

function setupWelcomeEvents() {
    // Get all necessary elements
    const welcomeExperience = document.getElementById('welcome-experience');
    const concernButtons = document.querySelectorAll('.concern-btn');
    const selectedConcernElement = document.getElementById('selected-concern');
    const exploreServicesBtn = document.getElementById('explore-services');
    const bookNowBtn = document.getElementById('book-now-btn');
    const skipWelcomeBtn = document.getElementById('skip-welcome');
    const steps = document.querySelectorAll('.welcome-step');
    
    // Store selected concern
    let selectedConcern = '';
    
    // Add event listeners to all concern buttons
    concernButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get selected concern
            selectedConcern = this.getAttribute('data-concern');
            
            // Set the text in the next step
            if (selectedConcernElement) {
                selectedConcernElement.textContent = selectedConcern.toLowerCase();
            }
            
            // Go to next step
            goToStep(2);
        });
    });
    
    // Skip welcome experience
    if (skipWelcomeBtn) {
        skipWelcomeBtn.addEventListener('click', closeWelcomeExperience);
    }
    
    // Explore services button
    if (exploreServicesBtn) {
        exploreServicesBtn.addEventListener('click', function() {
            closeWelcomeExperience();
            // Scroll to services section if it exists
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Book now button
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            closeWelcomeExperience();
            
            // If booking modal exists, open it
            if (typeof openBookingModal === 'function') {
                setTimeout(() => {
                    openBookingModal();
                }, 500);
            } else {
                // Otherwise, scroll to booking section
                const bookingSection = document.querySelector('[id^="booking"]');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
    
    // Function to navigate to specific step
    function goToStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        const targetStep = document.querySelector(`.welcome-step[data-step="${stepNumber}"]`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }
    
    // Track the interaction
    function trackUserInteraction(action) {
        // This function can be expanded later for analytics
        console.log('User interaction:', action, 'Concern:', selectedConcern);
    }
    
    // Function to close welcome experience
    function closeWelcomeExperience() {
        if (welcomeExperience) {
            welcomeExperience.style.opacity = '0';
            setTimeout(() => {
                welcomeExperience.remove();
            }, 500);
            
            // Set session storage to not show welcome again in this session
            sessionStorage.setItem('welcomeExperienceShown', 'true');
            
            // Track closing action
            trackUserInteraction('closed_welcome');
        }
    }
    
    // Handle escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWelcomeExperience();
        }
    });
}