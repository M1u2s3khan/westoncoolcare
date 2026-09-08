 
        // =============================================================
        // 1) MOBILE MENU TOGGLE
        // =============================================================
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileClose = document.getElementById('mobileClose');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            mobileOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            mobileOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
        if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

        // Close mobile menu when any mobile link is clicked (smooth scroll)
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let the default anchor scroll happen first, then close menu
                setTimeout(closeMobileMenu, 250);
            });
        });

        // =============================================================
        // 2) SMOOTH SCROLL for all anchor links (with offset for fixed nav)
        // =============================================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset -
                        navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Update URL hash without causing scroll jump
                    history.pushState(null, null, targetId);
                }
            });
        });

        // =============================================================
        // 3) NAVBAR BACKGROUND on scroll
        // =============================================================
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                navbar.classList.add('bg-dark-900', 'shadow-lg');
                navbar.style.background = 'rgba(10,14,30,0.94)';
                navbar.style.backdropFilter = 'blur(16px)';
                navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            } else {
                navbar.classList.remove('bg-dark-900', 'shadow-lg');
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.borderBottom = 'none';
            }
        });

        // =============================================================
        // 4) BACK TO TOP
        // =============================================================
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(16px)';
                backToTop.style.pointerEvents = 'none';
            }
        });
        if (backToTop) {
            backToTop.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // =============================================================
        // 5) TOAST SYSTEM
        // =============================================================
        function showToast(message, type = 'info') {
            const container = document.getElementById('toastContainer');
            if (!container) return;
            const toast = document.createElement('div');
            toast.className = `toast-custom ${type} d-flex align-items-center justify-content-between`;
            toast.innerHTML = `
                <span>${message}</span>
                <button class="toast-close">&times;</button>
            `;
            container.appendChild(toast);
            toast.querySelector('.toast-close').addEventListener('click', function() {
                toast.remove();
            });
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(30px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 400);
            }, 4500);
        }

        // =============================================================
        // 6) CONTACT FORM HANDLING
        // =============================================================
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const name = formData.get('name') || 'Guest';
                showToast(`✅ Thanks ${name}! We'll call you within 30 mins.`, 'success');
                this.reset();
            });
        }

        // =============================================================
        // 7) NEWSLETTER SUBSCRIBE
        // =============================================================
        const subscribeBtn = document.getElementById('subscribeBtn');
        const newsletterInput = document.getElementById('newsletterInput');
        if (subscribeBtn && newsletterInput) {
            subscribeBtn.addEventListener('click', function() {
                const email = newsletterInput.value.trim();
                if (email && email.includes('@')) {
                    showToast('✅ Subscribed successfully!', 'success');
                    newsletterInput.value = '';
                } else {
                    showToast('⚠️ Please enter a valid email address.', 'error');
                }
            });
        }

        // =============================================================
        // 8) CLOSE BOOTSTRAP COLLAPSE ON DESKTOP LINK CLICK (optional)
        // =============================================================
        const navLinks = document.querySelectorAll('#navbarNav .nav-link');
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth < 992 && bsCollapse) {
                        bsCollapse.hide();
                    }
                });
            });
        }

        console.log('✅ Weston Cool Care — All navbar links scroll smoothly!');
  