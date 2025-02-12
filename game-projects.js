document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-content');
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.project-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let autoPlayInterval;
    let isHovering = false;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.remove('fade');
        });
        
        // Add active and fade classes to current slide
        slides[currentIndex].classList.add('active');
        slides[currentIndex].classList.add('fade');
        
        updateDots();
    }
    
    function nextSlide() {
        if (!isHovering) {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 7000); // Changed to 7 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // Hover events
    carouselContainer.addEventListener('mouseenter', () => {
        isHovering = true;
        stopAutoPlay();
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        isHovering = false;
        startAutoPlay();
    });
    
    // Start auto-play initially
    startAutoPlay();
}); 