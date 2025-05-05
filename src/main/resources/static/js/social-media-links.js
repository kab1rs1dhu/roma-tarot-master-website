/**
 * Social Media Links Handler
 * This script manages all social media links and redirects on the website
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize social media links
    setupSocialMediaLinks();
});

/**
 * Set up social media links throughout the website
 */
function setupSocialMediaLinks() {
    // Instagram link setup
    setupInstagramLinks();
    
    // You can add more social media platforms here in the future
}

/**
 * Configure all Instagram links on the page
 */
function setupInstagramLinks() {
    // Target all Instagram links/buttons
    const instagramLinks = document.querySelectorAll('.social-icons a[href*="instagram"], .fab.fa-instagram, .instagram-link');
    
    // Instagram username - replace with your actual username
    const instagramUsername = 'romatarotmaster';
    
    // Instagram URL
    const instagramUrl = `https://www.instagram.com/${instagramUsername}/`;
    
    // Add click handler to all Instagram links
    instagramLinks.forEach(link => {
        // If it's just an icon without a parent anchor, wrap it or find the closest anchor
        if (link.classList.contains('fa-instagram') && link.tagName !== 'A') {
            const parentLink = link.closest('a');
            if (parentLink) {
                // If the icon is inside an anchor, update the anchor
                updateLink(parentLink);
            } else {
                // If icon isn't inside an anchor, handle the click on the icon
                link.style.cursor = 'pointer';
                link.addEventListener('click', function(e) {
                    openInstagram(e);
                });
            }
        } else {
            // It's an anchor, update it directly
            updateLink(link);
        }
    });
    
    /**
     * Update a link element to point to Instagram
     */
    function updateLink(linkElement) {
        linkElement.href = instagramUrl;
        linkElement.setAttribute('target', '_blank');
        linkElement.setAttribute('rel', 'noopener noreferrer');
        linkElement.setAttribute('aria-label', 'Visit our Instagram page');
        
        // Add click event listener
        linkElement.addEventListener('click', function(e) {
            openInstagram(e);
        });
    }
    
    /**
     * Open Instagram in a new tab
     */
    function openInstagram(event) {
        event.preventDefault();
        window.open(instagramUrl, '_blank', 'noopener,noreferrer');
        
        // Optional: Track Instagram click for analytics
        if (typeof trackSocialClick === 'function') {
            trackSocialClick('instagram');
        }
    }
}

/**
 * Track social media clicks (optional - for analytics integration)
 */
function trackSocialClick(platform) {
    // This is a placeholder function for analytics
    // You can integrate with Google Analytics or other tracking tools here
    console.log(`Social media click: ${platform}`);
    
    // If using Google Analytics
    /*
    if (typeof gtag === 'function') {
        gtag('event', 'social_click', {
            'platform': platform
        });
    }
    */
}