const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const barsAnimation = document.querySelector('.bars-animation');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// Menu toggle functionality
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// Function to activate a specific page/section
const activatePage = (pageId) => {
    // Remove active class from all nav links with timeout
    setTimeout(() => {
        navLinks.forEach(link => link.classList.remove('active'));
    }, 100);
    
    // Remove active class from all sections with timeout
    setTimeout(() => {
        sections.forEach(section => section.classList.remove('active'));
    }, 100);
    
    // Add active class to the clicked nav link with timeout
    setTimeout(() => {
        const activeLink = document.querySelector(`header nav a[href="#${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }, 300);
    
    // Trigger bars animation with timeouts
    if (barsAnimation) {
        setTimeout(() => {
            barsAnimation.classList.remove('active');
        }, 100);
        
        setTimeout(() => {
            barsAnimation.classList.add('active');
            
            // Activate the corresponding section after animation with timeout
            setTimeout(() => {
                const targetSection = document.getElementById(pageId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }, 200);
        }, 500);
    }
    
    // Close mobile menu when a page is activated
    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

// Add click event to nav links with timeout
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            const pageId = link.getAttribute('href').substring(1);
            activatePage(pageId);
        }, 200);
    });
});

// Add click event to logo with timeout
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            activatePage('home');
        }, 200);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Activate home section by default with timeout
    setTimeout(() => {
        activatePage('home');
    }, 300);
    
    // Initialize bars animation with timeout
    if (barsAnimation) {
        setTimeout(() => {
            barsAnimation.classList.add('active');
        }, 500);
    }
});


// Resume Section Tabs
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');

        // Remove active class from all details
        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Add active class to corresponding detail
        if (resumeDetails[idx]) {
            resumeDetails[idx].classList.add('active');
        }
    });
});

// Portfolio Carousel
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');

let index = 0;
const totalSlides = portfolioDetails.length;

// Function to update navigation buttons
const updateNavigation = () => {
    if (index === 0) {
        arrowLeft.classList.add('disabled');
    } else {
        arrowLeft.classList.remove('disabled');
    }
    
    if (index === totalSlides - 1) {
        arrowRight.classList.add('disabled');
    } else {
        arrowRight.classList.remove('disabled');
    }
};

const activePortfolio = () => {
    // Calculate transform value
    const translateValue = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    
    // Apply transform to slide
    if (imgSlide) {
        imgSlide.style.transform = translateValue;
    }

    // Update portfolio details
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    if (portfolioDetails[index]) {
        portfolioDetails[index].classList.add('active');
    }
    
    // Update navigation buttons
    updateNavigation();
};

// Initialize the carousel
if (imgSlide && portfolioDetails.length > 0) {
    activePortfolio();
}

// Event listeners for navigation
if (arrowRight) {
    arrowRight.addEventListener('click', () => {
        if (index < totalSlides - 1) {
            index++;
            activePortfolio();
        }
    });
}

if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {
        if (index > 0) {
            index--;
            activePortfolio();
        }
    });
}

// Optional: Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && index < totalSlides - 1) {
        index++;
        activePortfolio();
    } else if (e.key === 'ArrowLeft' && index > 0) {
        index--;
        activePortfolio();
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

if (imgSlide) {
    imgSlide.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    imgSlide.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

const handleSwipe = () => {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold && index < totalSlides - 1) {
        index++;
        activePortfolio();
    } else if (touchEndX > touchStartX + swipeThreshold && index > 0) {
        index--;
        activePortfolio();
    }
};

// Initialize bars animation on page load
document.addEventListener('DOMContentLoaded', () => {
    if (barsAnimation) {
        barsAnimation.classList.add('active');
    }
});