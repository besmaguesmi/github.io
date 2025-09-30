// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .publication-item, .award-card, .competency-category, .activity-item, .recommendation-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Current year for footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});

// Expand/Collapse Experience
document.addEventListener('DOMContentLoaded', () => {
    const expandButton = document.getElementById('expand-experience');
    const pastItems = document.querySelectorAll('.timeline-item.past');
    const expandText = document.querySelector('.expand-text');
    const collapseText = document.querySelector('.collapse-text');

    if (expandButton) {
        expandButton.addEventListener('click', () => {
            const isExpanded = pastItems[0].style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                pastItems.forEach(item => {
                    item.style.display = 'none';
                });
                expandText.style.display = 'inline';
                collapseText.style.display = 'none';
                expandButton.setAttribute('aria-expanded', 'false');
            } else {
                // Expand
                pastItems.forEach(item => {
                    item.style.display = 'flex';
                });
                expandText.style.display = 'none';
                collapseText.style.display = 'inline';
                expandButton.setAttribute('aria-expanded', 'true');
            }
        });
    }
});

// Expand/Collapse Activities
document.addEventListener('DOMContentLoaded', () => {
    const expandActivitiesButton = document.getElementById('expand-activities');
    const hiddenActivities = document.querySelectorAll('.activity-item.hidden');
    const expandActivitiesText = expandActivitiesButton?.querySelector('.expand-text');
    const collapseActivitiesText = expandActivitiesButton?.querySelector('.collapse-text');

    if (expandActivitiesButton) {
        expandActivitiesButton.addEventListener('click', () => {
            const isExpanded = hiddenActivities[0].style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                hiddenActivities.forEach(item => {
                    item.style.display = 'none';
                });
                expandActivitiesText.style.display = 'inline';
                collapseActivitiesText.style.display = 'none';
                expandActivitiesButton.setAttribute('aria-expanded', 'false');
            } else {
                // Expand
                hiddenActivities.forEach(item => {
                    item.style.display = 'block';
                });
                expandActivitiesText.style.display = 'none';
                collapseActivitiesText.style.display = 'inline';
                expandActivitiesButton.setAttribute('aria-expanded', 'true');
            }
        });
    }
});

// Recommendations Slider
document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.recommendation-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto slide every 8 seconds
    let slideInterval = setInterval(nextSlide, 8000);
    
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        
        // Reset auto-slide timer
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 8000);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause auto-slide on hover
    const slider = document.querySelector('.recommendations-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 8000);
        });
    }
    
    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            prevSlide();
        }
    }
});

// Copy email to clipboard
function copyEmail() {
    const email = 'bessmagsm@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show temporary success message
        const tooltip = document.querySelector('.copy-tooltip');
        const originalText = tooltip.textContent;
        tooltip.textContent = 'Copied! bessmagsm@gmail.com';
        tooltip.style.color = 'var(--success-color)';

        setTimeout(() => {
            tooltip.textContent = originalText;
            tooltip.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const tooltip = document.querySelector('.copy-tooltip');
        tooltip.textContent = 'Copied! bessmagsm@gmail.com';
        tooltip.style.color = 'var(--success-color)';
        setTimeout(() => {
            tooltip.textContent = 'Click to copy bessmagsm@gmail.com';
            tooltip.style.color = '';
        }, 2000);
    });
}
