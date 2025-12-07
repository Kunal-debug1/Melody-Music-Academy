/* ============================================
   MELODY MUSIC ACADEMY - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ========== Preloader - FIXED ==========
    const preloader = document.getElementById('preloader');
    
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }
    
    // Hide on window load
    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 1500);
    });
    
    // Fallback: Hide after 3 seconds anyway (THIS FIXES THE STUCK LOADING)
    setTimeout(hidePreloader, 3000);

    // ========== Navbar Scroll Effect ==========
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== Mobile Menu Toggle ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ========== Active Navigation Link on Scroll ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========== Scroll Progress Bar ==========
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', function() {
        if (progressBar) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
    });

    // ========== Back to Top Button ==========
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== FAQ Accordion ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Contact Form Handling ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const course = document.getElementById('course').value;
            const timing = document.getElementById('timing').value;
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (!name || !phone || !course || !timing) {
                showNotification('Please fill in all required fields!', 'error');
                return;
            }

            // Phone validation (Indian format - 10 digits)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showNotification('Please enter a valid 10-digit phone number!', 'error');
                return;
            }

            // Create WhatsApp message
            let whatsappMessage = '*New Inquiry - Melody Music Academy*\n\n';
            whatsappMessage += '👤 *Name:* ' + name + '\n';
            whatsappMessage += '📞 *Phone:* ' + phone + '\n';
            whatsappMessage += '🎵 *Course:* ' + course + '\n';
            whatsappMessage += '⏰ *Timing:* ' + timing + '\n';
            
            if (message) {
                whatsappMessage += '💬 *Message:* ' + message + '\n';
            }

            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp URL
            const whatsappURL = 'https://wa.me/919403064538?text=' + encodedMessage;
            
            // Show success message
            showNotification('Opening WhatsApp...', 'success');
            
            // Open WhatsApp after short delay
            setTimeout(function() {
                window.open(whatsappURL, '_blank');
            }, 1000);

            // Reset form
            contactForm.reset();
        });
    }

    // ========== Notification System ==========
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const bgColor = type === 'success' ? '#28a745' : '#dc3545';
        
        notification.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';

        // Add styles
        notification.style.cssText = 
            'position: fixed;' +
            'top: 100px;' +
            'right: 30px;' +
            'padding: 15px 25px;' +
            'background: ' + bgColor + ';' +
            'color: white;' +
            'border-radius: 10px;' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 10px;' +
            'z-index: 10001;' +
            'box-shadow: 0 5px 20px rgba(0,0,0,0.3);' +
            'animation: slideInRight 0.3s ease;';

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            notification.style.transition = 'all 0.3s ease';
            
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification animation styles
    const style = document.createElement('style');
    style.textContent = '@keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
    document.head.appendChild(style);

    // ========== Keyboard Navigation ==========
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });

    // ========== Console Welcome Message ==========
    console.log('%c🎵 Melody Music Academy', 'color: #d4af37; font-size: 24px; font-weight: bold;');
    console.log('%cSoulful Music Life', 'color: #888; font-size: 14px;');
    console.log('%cContact: 9403064538', 'color: #28a745; font-size: 12px;');

});