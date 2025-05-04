document.addEventListener('DOMContentLoaded', function() {
    // Set up booking buttons
    setupBookingButtons();
});

function setupBookingButtons() {
    // Create modal HTML and append to body
    createBookingModal();
    
    // Add click event to all booking buttons
    const bookingButtons = document.querySelectorAll('.booking-btn, [href="#booking"]');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openBookingModal();
        });
    });
    
    // Set up close functionality
    const modalOverlay = document.getElementById('booking-modal-overlay');
    const closeButton = document.getElementById('modal-close-btn');
    
    closeButton.addEventListener('click', function() {
        closeBookingModal();
    });
    
    // Close modal when clicking outside of it
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeBookingModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });
    
    // Set up WhatsApp contact button
    const whatsappButton = document.getElementById('whatsapp-booking-btn');
    whatsappButton.addEventListener('click', function() {
        sendWhatsAppBookingMessage();
    });
}

function createBookingModal() {
    // Check if modal already exists
    if (document.getElementById('booking-modal-overlay')) {
        return;
    }
    
    const modalHTML = `
        <div id="booking-modal-overlay" class="modal-overlay">
            <div class="modal-container">
                <button id="modal-close-btn" class="modal-close">&times;</button>
                <div class="modal-content">
                    <img src="/images/ratecard.png" alt="Service Rate Card" class="rate-card-image">
                    <div class="service-selection">
                        <h3>Please select a service:</h3>
                        <div class="service-options">
                            <div class="service-option">
                                <input type="radio" id="audio-20" name="service" value="Audio Call (20 minutes)" checked>
                                <label for="audio-20">Audio Call (20 minutes)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="audio-30" name="service" value="Audio Call (30 minutes)">
                                <label for="audio-30">Audio Call (30 minutes)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="audio-45" name="service" value="Audio Call (45 minutes)">
                                <label for="audio-45">Audio Call (45 minutes)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="audio-60" name="service" value="Audio Call (1 hour)">
                                <label for="audio-60">Audio Call (1 hour)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="video-20" name="service" value="Video Call (20 minutes)">
                                <label for="video-20">Video Call (20 minutes)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="video-30" name="service" value="Video Call (30 minutes)">
                                <label for="video-30">Video Call (30 minutes)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="video-45" name="service" value="Video Call (45 minutes)">
                                <label for="video-45">Video Call (45 minutes)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="video-60" name="service" value="Video Call (1 hour)">
                                <label for="video-60">Video Call (1 hour)</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="audio-20" name="service" value="Custom video/audio chat">
                                <label for="audio-20">Custom video/audio chat</label>
                            </div>
                            <div class="service-option">
                                <input type="radio" id="other" name="service" value="Other Services">
                                <label for="other">Other Services (Reiki, Chord Cutting, Spells, etc.)</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="whatsapp-booking-btn" class="whatsapp-booking-btn">
                        <i class="fab fa-whatsapp"></i> Book via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openBookingModal() {
    const modalOverlay = document.getElementById('booking-modal-overlay');
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
    modalOverlay.style.display = 'flex';
}

function closeBookingModal() {
    const modalOverlay = document.getElementById('booking-modal-overlay');
    document.body.style.overflow = '';
    modalOverlay.style.display = 'none';
}

function sendWhatsAppBookingMessage() {
    // Get selected service
    const selectedService = document.querySelector('input[name="service"]:checked').value;
    
    // Get current page URL
    const currentPageUrl = window.location.href;
    
    // Create message
    const message = `Hi! I would like to book a ${selectedService}. (From: ${currentPageUrl})`;
    
    // Replace with your phone number here (include country code without the + sign)
    const phoneNumber = "916284407370"; // Replace with your actual WhatsApp number
    
    // Create WhatsApp URL with message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the modal
    closeBookingModal();
}