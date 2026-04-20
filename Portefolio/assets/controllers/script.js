/* =================================================
   PORTFOLIO MODERNE · E5
   Interactions : theme, menu, scroll, reveal, typing
   ================================================= */

(() => {
    'use strict';

    /* ---------- FOOTER YEAR ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- THEME TOGGLE (dark/light) ---------- */
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }

    themeToggle?.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    /* ---------- MOBILE MENU ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navLinks?.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('open');
            navLinks?.classList.remove('open');
        });
    });

    /* ---------- NAVBAR SCROLL STATE + ACTIVE LINK ---------- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const backTop = document.getElementById('backTop');
    const sections = document.querySelectorAll('main section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    const onScroll = () => {
        const y = window.scrollY;

        // Navbar styling
        navbar?.classList.toggle('scrolled', y > 40);

        // Back to top
        backTop?.classList.toggle('visible', y > 600);

        // Scroll progress
        if (scrollProgress) {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const pct = Math.min(100, Math.max(0, (y / height) * 100));
            scrollProgress.style.width = pct + '%';
        }

        // Active nav link (based on section in view)
        let currentId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            if (y >= top) currentId = sec.id;
        });
        if (currentId) {
            navLinkEls.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
            });
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- BACK TO TOP BUTTON ---------- */
    backTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- SMOOTH SCROLL (for anchors) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ---------- TYPING EFFECT (hero) ---------- */
    const typed = document.getElementById('typed');
    if (typed) {
        const phrases = [
            'des sites modernes.',
            'des interfaces élégantes.',
            'des expériences fluides.',
            'des applications performantes.',
            'du code propre & maintenable.'
        ];
        let pIndex = 0;
        let cIndex = 0;
        let isDeleting = false;

        const type = () => {
            const phrase = phrases[pIndex];

            if (isDeleting) {
                typed.textContent = phrase.substring(0, cIndex - 1);
                cIndex--;
            } else {
                typed.textContent = phrase.substring(0, cIndex + 1);
                cIndex++;
            }

            let delay = isDeleting ? 40 : 80;

            if (!isDeleting && cIndex === phrase.length) {
                delay = 1800;
                isDeleting = true;
            } else if (isDeleting && cIndex === 0) {
                isDeleting = false;
                pIndex = (pIndex + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(type, delay);
        };

        setTimeout(type, 600);
    }

    /* ---------- REVEAL ON SCROLL ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    /* ---------- COUNTER ANIMATION (hero stats) ---------- */
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = 1600;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window && counters.length) {
        const ioC = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    ioC.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(c => ioC.observe(c));
    }

    /* ---------- PROGRESS BARS ANIMATION (future use) ---------- */
    const progressBars = document.querySelectorAll('.progress-bar');
    if ('IntersectionObserver' in window && progressBars.length) {
        const ioP = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const pct = entry.target.dataset.progress || 0;
                    entry.target.style.width = pct + '%';
                    ioP.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        progressBars.forEach(p => ioP.observe(p));
    }

    /* ---------- CONTACT FORM ---------- */
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name?.value.trim();
        const email = form.email?.value.trim();
        const subject = form.subject?.value.trim();
        const message = form.message?.value.trim();

        if (!name || !email || !subject || !message) {
            alert('Merci de remplir tous les champs.');
            return;
        }

        // Simulation d'envoi (à remplacer par un vrai backend / EmailJS / Formspree)
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Envoi en cours...';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            form.reset();
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            }, 2200);
        }, 1200);
    });

    /* ---------- GAMMA PRESENTATION BUTTONS WARNING ---------- */
    // Les liens #REMPLACER_PAR_LIEN_GAMMA_* sont des placeholders.
    // Lorsque l'utilisateur clique et que le lien n'a pas été remplacé, on affiche un message.
    document.querySelectorAll('[data-gamma]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#REMPLACER')) {
                e.preventDefault();
                const key = link.dataset.gamma;
                alert(`🎯 Lien Gamma manquant pour : ${key.toUpperCase()}\n\nRemplacez "${href}" dans index.html par l'URL de votre présentation Gamma.`);
            }
        });
    });

})();