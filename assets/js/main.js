
        // ---- FALLBACK: ensure animated elements visible after 2.5s ----
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale')
                    .forEach(function(el) {
                        el.classList.add('visible');
                    });
            }, 2500);
        });

        // ---- SCROLL OBSERVER for animations ----
        const animObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale')
            .forEach(function(el) {
                animObserver.observe(el);
            });

        // ---- NAVBAR SCROLL EFFECT ----
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });

        // ---- MOBILE MENU (custom slide) ----
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileClose = document.getElementById('mobileClose');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            mobileOverlay.classList.remove('d-none');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            mobileOverlay.classList.add('d-none');
            document.body.style.overflow = '';
        }

        mobileToggle.addEventListener('click', openMobileMenu);
        mobileClose.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);
        mobileLinks.forEach(function(link) { link.addEventListener('click', closeMobileMenu); });

        // ---- COUNTER ANIMATION ----
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var target = parseInt(entry.target.getAttribute('data-count'));
                    if (target) {
                        var current = 0;
                        var increment = target / 60;
                        var timer = setInterval(function() {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            entry.target.textContent = Math.floor(current).toLocaleString() + (target >= 1000 ?
                                '+' : '+');
                        }, 30);
                    }
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-count]').forEach(function(el) {
            counterObserver.observe(el);
        });

        // ---- BACK TO TOP ----
        var backToTop = document.getElementById('backToTop');
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
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ---- TOAST ----
        function showToast(message, type) {
            type = type || 'success';
            var container = document.getElementById('toastContainer');
            var toast = document.createElement('div');
            var bgColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#6366f1';
            var icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' :
                'fa-info-circle';
            toast.className = 'toast-notification text-white px-4 py-3 rounded-4 shadow-lg d-flex align-items-center gap-3';
            toast.style.backgroundColor = bgColor;
            toast.innerHTML = '<i class="fas ' + icon + '"></i><span class="small fw-medium">' + message + '</span>';
            container.appendChild(toast);
            setTimeout(function() {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100px)';
                toast.style.transition = 'all 0.4s ease';
                setTimeout(function() { toast.remove(); }, 400);
            }, 4000);
        }

        // ---- CONTACT FORM ----
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            var name = formData.get('name') || 'Customer';
            showToast('Thank you ' + name + '! We\'ll call you within 30 minutes.', 'success');
            this.reset();
            var dateInput = this.querySelector('input[type="date"]');
            if (dateInput) {
                var today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
            }
        });

        // ---- SUBSCRIBE ----
        document.getElementById('subscribeBtn').addEventListener('click', function() {
            var input = document.getElementById('newsletterInput');
            if (input.value && input.value.includes('@')) {
                showToast('Subscribed successfully! Check your email for confirmation.', 'success');
                input.value = '';
            } else {
                showToast('Please enter a valid email address.', 'error');
            }
        });

        // ---- SMOOTH ANCHOR SCROLL ----
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    var offset = 80;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        // ---- SET TODAY'S DATE ----
        var dateInput = document.querySelector('input[type="date"]');
        if (dateInput) {
            var today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            dateInput.value = today;
        }

        // ---- EXTRA FALLBACK ----
        setTimeout(function() {
            document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale')
                .forEach(function(el) {
                    el.classList.add('visible');
                });
            document.body.classList.add('js-fallback-visible');
        }, 4000);

        // contact form start
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            if (!form) return;

            // WhatsApp Number (Change this to your actual number with country code, no '+')
            const whatsappNumber = '919711284230'; // Example: 919711284230

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    carBrand: formData.get('carBrand'),
                    carModel: formData.get('carModel'),
                    service: formData.get('service'),
                    date: formData.get('date'),
                    location: formData.get('location'),
                    message: formData.get('message')
                };

                // Log data to console
                console.log('======= Car AC Service Enquiry =======');
                console.log('Full Name:', data.name);
                console.log('Phone Number:', data.phone);
                console.log('Car Brand:', data.carBrand);
                console.log('Car Model:', data.carModel);
                console.log('Service Required:', data.service);
                console.log('Preferred Date:', data.date);
                console.log('Location:', data.location);
                console.log('Issue Description:', data.message);
                console.log('=======================================');

                // Prepare WhatsApp message
                let messageText = '*New Car AC Service Enquiry*%0A';
                messageText += `%0A*Name*: ${data.name || 'N/A'}`;
                messageText += `%0A*Phone*: ${data.phone || 'N/A'}`;
                messageText += `%0A*Car Brand*: ${data.carBrand || 'N/A'}`;
                messageText += `%0A*Car Model*: ${data.carModel || 'N/A'}`;
                messageText += `%0A*Service Required*: ${data.service || 'N/A'}`;
                messageText += `%0A*Preferred Date*: ${data.date || 'N/A'}`;
                messageText += `%0A*Location*: ${data.location || 'N/A'}`;
                messageText += `%0A*Issue*: ${data.message || 'N/A'}`;

                // Encode and open WhatsApp
                const whatsappUrl =
                    `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${messageText}`;
                window.open(whatsappUrl, '_blank');
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');

            // ✅ अपना WhatsApp नंबर यहाँ डालें (देश कोड के साथ, बिना '+' के)
            const whatsappNumber = '919711284230'; // Example: 919711284230

            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault(); // Page reload नहीं होगा

                    // 1️⃣ Form Data इकट्ठा करें
                    const formData = new FormData(form);
                    const data = {
                        name: formData.get('name')?.trim() || '',
                        phone: formData.get('phone')?.trim() || '',
                        carBrand: formData.get('carBrand')?.trim() || '',
                        carModel: formData.get('carModel')?.trim() || '',
                        service: formData.get('service')?.trim() || '',
                        date: formData.get('date')?.trim() || '',
                        location: formData.get('location')?.trim() || '',
                        message: formData.get('message')?.trim() || ''
                    };

                    // 2️⃣ Console में Data Log करें
                    console.log('======= 🚗 New Car AC Enquiry =======');
                    console.log('👤 Full Name     :', data.name);
                    console.log('📞 Phone        :', data.phone);
                    console.log('🚘 Car Brand    :', data.carBrand);
                    console.log('📋 Car Model    :', data.carModel);
                    console.log('🔧 Service      :', data.service);
                    console.log('📅 Preferred Date:', data.date);
                    console.log('📍 Location     :', data.location);
                    console.log('💬 Issue        :', data.message);
                    console.log('======================================');

                    // 3️⃣ WhatsApp Message तैयार करें
                    let msg = '*New Car AC Service Enquiry*%0A';
                    msg += `%0A*Name*: ${data.name || 'N/A'}`;
                    msg += `%0A*Phone*: ${data.phone || 'N/A'}`;
                    msg += `%0A*Car Brand*: ${data.carBrand || 'N/A'}`;
                    msg += `%0A*Car Model*: ${data.carModel || 'N/A'}`;
                    msg += `%0A*Service Required*: ${data.service || 'N/A'}`;
                    msg += `%0A*Preferred Date*: ${data.date || 'N/A'}`;
                    msg += `%0A*Location*: ${data.location || 'N/A'}`;
                    msg += `%0A*Issue*: ${data.message || 'N/A'}`;

                    // 4️⃣ WhatsApp URL बनाएं और नई Tab में खोलें
                    const whatsappUrl =
                        `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${msg}`;
                    window.open(whatsappUrl, '_blank');

                    // (Optional) Form Reset करें
                    // form.reset();
                });
            } else {
                console.warn('⚠️ Form with id "contactForm" not found.');
            }
        });
   