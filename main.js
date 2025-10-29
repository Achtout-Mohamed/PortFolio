// ==================== GLOBAL VARIABLES ====================
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');

// ==================== NAVIGATION ====================
// Handle navigation link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get target section
        const targetId = link.getAttribute('data-section');
        
        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
                
                // Animate skill bars if skills section
                if (targetId === 'skills') {
                    animateSkillBars();
                }
            }
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('active');
        }
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ==================== MOBILE MENU ====================
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate toggle button
    const spans = menuToggle.querySelectorAll('span');
    if (sidebar.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ==================== SCROLL TO TOP BUTTON ====================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SKILL BARS ANIMATION ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, index * 100);
    });
}

// Animate on initial load if skills section is active
if (document.getElementById('skills').classList.contains('active')) {
    animateSkillBars();
}

// ==================== CONTACT FORM HANDLING ====================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Create mailto link
    const mailtoLink = `mailto:achtoutmohamed08@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `Nom: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Votre client email va s\'ouvrir. Merci pour votre message! 📧', 'success');
    
    // Reset form
    contactForm.reset();
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'linear-gradient(135deg, #27c93f, #1ea832)' : 'linear-gradient(135deg, #ff5f56, #ff3b30)',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        animation: 'slideInDown 0.5s ease-out',
        fontWeight: '600',
        fontSize: '0.95rem'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ==================== TYPING EFFECT FOR CODE ====================
const codeContent = document.querySelector('.window-content code');
if (codeContent) {
    const originalText = codeContent.innerHTML;
    let index = 0;
    
    function typeCode() {
        if (index < originalText.length) {
            codeContent.innerHTML = originalText.substring(0, index);
            index++;
            setTimeout(typeCode, 20);
        } else {
            codeContent.innerHTML = originalText;
        }
    }
    
    // Start typing effect when home section is active
    const homeSection = document.getElementById('home');
    if (homeSection.classList.contains('active')) {
        setTimeout(typeCode, 500);
    }
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
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

// Observe all cards
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ==================== PARALLAX EFFECT FOR FLOATING CIRCLES ====================
window.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.floating-circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==================== SMOOTH REVEAL FOR SECTIONS ====================
function revealSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section && section.classList.contains('active')) {
        const elements = section.querySelectorAll('.hero-content, .hero-illustration, .about-card, .skill-category, .project-card, .timeline-item, .contact-container > *');
        
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Initial reveal
revealSection('home');

// ==================== DYNAMIC GREETING BASED ON TIME ====================
function updateGreeting() {
    const greetingBadge = document.querySelector('.greeting-badge');
    if (greetingBadge) {
        const hour = new Date().getHours();
        let greeting = 'Bienvenue';
        let emoji = '👋';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Bonjour';
            emoji = '☀️';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Bon après-midi';
            emoji = '🌤️';
        } else if (hour >= 18 && hour < 22) {
            greeting = 'Bonsoir';
            emoji = '🌙';
        } else {
            greeting = 'Bonne nuit';
            emoji = '⭐';
        }
        
        greetingBadge.textContent = `${greeting} ${emoji}`;
    }
}

updateGreeting();

// ==================== FORM INPUT ANIMATIONS ====================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
    
    // Add validation feedback
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#27c93f';
        } else {
            this.style.borderColor = 'var(--bg-secondary)';
        }
    });
});

// ==================== PROJECT CARD TILT EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // Get current active section index
    const activeSectionIndex = Array.from(sections).findIndex(s => s.classList.contains('active'));
    
    // Navigate with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (activeSectionIndex + 1) % sections.length;
        navLinks[nextIndex].click();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (activeSectionIndex - 1 + sections.length) % sections.length;
        navLinks[prevIndex].click();
    }
    
    // Home key to go to first section
    if (e.key === 'Home') {
        e.preventDefault();
        navLinks[0].click();
    }
    
    // End key to go to last section
    if (e.key === 'End') {
        e.preventDefault();
        navLinks[navLinks.length - 1].click();
    }
});

// ==================== COPY EMAIL ON CLICK ====================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent.trim();
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copié dans le presse-papiers! 📋', 'success');
            }).catch(() => {
                // Fallback: just open email client
            });
        }
    });
});

// ==================== ADD CSS ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== RESPONSIVE NAVIGATION ====================
function handleResize() {
    if (window.innerWidth > 992) {
        sidebar.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

window.addEventListener('resize', handleResize);

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    showNotification('🎉 Code secret activé! Mode développeur activé! 🚀', 'success');
    
    // Add rainbow animation to nav links
    navLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = 'pulse 1s ease-in-out infinite';
        }, index * 100);
    });
    
    setTimeout(() => {
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }, 5000);
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c👋 Bonjour!', 'font-size: 24px; font-weight: bold; color: #c77d55;');
console.log('%cMerci de visiter mon portfolio!', 'font-size: 16px; color: #6b5f52;');
console.log('%cSi vous êtes curieux du code, n\'hésitez pas à me contacter! 😊', 'font-size: 14px; color: #8b7e71;');
console.log('%cEmail: achtoutmohamed08@gmail.com', 'font-size: 12px; color: #c77d55; font-weight: bold;');

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to resize handler
window.addEventListener('resize', debounce(handleResize, 250));

// ==================== ACCESSIBILITY ====================
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Aller au contenu principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ==================== AUTO SAVE FORM DATA ====================
const formFields = ['name', 'email', 'subject', 'message'];

// Load saved data
formFields.forEach(field => {
    const savedValue = localStorage.getItem(`contact_${field}`);
    if (savedValue) {
        document.getElementById(field).value = savedValue;
    }
});

// Save data on input
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem(`contact_${input.name}`, input.value);
    });
});

// Clear saved data on submit
contactForm.addEventListener('submit', () => {
    formFields.forEach(field => {
        localStorage.removeItem(`contact_${field}`);
    });
});

console.log('✅ Portfolio chargé avec succès!');