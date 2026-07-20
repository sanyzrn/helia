/* =============================================================================
   Helia Namazi — Portfolio JavaScript (v5)
   Interaction only: theme & language, navigation, reveal animations, counters,
   parallax, timeline progress, expand toggles. Content lives in data.js / render.js.
   ============================================================================= */
(function () {
    'use strict';

    function resolveInitialLang() {
        try {
            const params = new URLSearchParams(window.location.search);
            const q = params.get('lang');
            if (q === 'en' || q === 'fa') return q;
            return localStorage.getItem('language') || 'fa';
        } catch (e) {
            return 'fa';
        }
    }

    let currentLang = resolveInitialLang();
    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    function debounce(fn, ms = 100) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), ms);
        };
    }

    function onContentReady(cb) {
        if (window.__contentRendered) { cb(); return; }
        document.addEventListener('content:rendered', cb, { once: true });
    }

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupTheme();
        setupExpandToggles();
        setupMobileMenu();
        setupSmoothScroll();
        setupScrollReveal();
        setupHeaderScroll();
        setupBackToTop();
        setupScrollProgress();
        setupActiveNavObserver();
        setupStatCounters();
        setupLanguage();
        setupKeyboardShortcuts();
        setupParallax();
        setupCursorGlow();
        setupHeroImageFallback();
        setupScrollIndicator();
        onContentReady(() => {
            setupTimelineActive();
            setupScrollReveal();
            setupActiveNavObserver();
        });
    }

    /* Theme toggle (light/dark) */
    function setupTheme() {
        const btn  = $('#themeToggle');
        const root = document.documentElement;
        const meta = $('#themeColorMeta');
        const updateChrome = () => {
            const dark = root.getAttribute('data-theme') === 'dark';
            btn && btn.setAttribute('aria-pressed', String(dark));
            if (meta) meta.setAttribute('content', dark ? '#12151a' : '#5a6570');
        };
        updateChrome();
        if (!btn) return;
        btn.addEventListener('click', () => {
            const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateChrome();
        });
    }

    /* Expand/collapse content sections (courses, publications) */
    function setupExpandToggles() {
        $$('.btn-toggle').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.getAttribute('data-target');
                const content = document.getElementById(id);
                if (!content) return;
                const overlay = content.parentElement.querySelector('.expand-overlay');
                const span = this.querySelector('span');
                const expanded = content.classList.toggle('expanded');
                this.classList.toggle('active', expanded);
                this.setAttribute('aria-expanded', String(expanded));

                if (expanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    if (overlay) overlay.style.opacity = '0';
                    if (span) {
                        span.setAttribute('data-fa', 'مشاهده کمتر');
                        span.setAttribute('data-en', 'Show Less');
                        span.textContent = currentLang === 'fa' ? 'مشاهده کمتر' : 'Show Less';
                    }
                } else {
                    content.style.maxHeight = '480px';
                    if (overlay) overlay.style.opacity = '1';
                    if (span) {
                        span.setAttribute('data-fa', 'مشاهده بیشتر');
                        span.setAttribute('data-en', 'Show More');
                        span.textContent = currentLang === 'fa' ? 'مشاهده بیشتر' : 'Show More';
                    }
                    setTimeout(() => {
                        content.closest('section').scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start'
                        });
                    }, 120);
                }
            });
        });
    }

    /* Compact mobile menu */
    let menuFocusTrap = null;
    function setupMobileMenu() {
        const toggle   = $('#menuToggle');
        const menu     = $('#mobileNav');
        const backdrop = $('#mobileNavBackdrop');
        if (!toggle || !menu || !backdrop) return;

        const openMenu = () => {
            toggle.classList.add('active');
            menu.classList.add('is-open');
            backdrop.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            backdrop.setAttribute('aria-hidden', 'false');
            const first = menu.querySelector('a');
            if (first) setTimeout(() => first.focus(), 50);
            menuFocusTrap = createFocusTrap(menu);
            document.addEventListener('keydown', menuFocusTrap);
        };
        const closeMenu = ({ restoreFocus = true } = {}) => {
            toggle.classList.remove('active');
            menu.classList.remove('is-open');
            backdrop.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            backdrop.setAttribute('aria-hidden', 'true');
            if (menuFocusTrap) {
                document.removeEventListener('keydown', menuFocusTrap);
                menuFocusTrap = null;
            }
            if (restoreFocus) toggle.focus();
        };
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.contains('is-open') ? closeMenu() : openMenu();
        });
        backdrop.addEventListener('click', () => closeMenu({ restoreFocus: false }));
        document.addEventListener('click', (e) => {
            if (!menu.classList.contains('is-open')) return;
            if (menu.contains(e.target) || toggle.contains(e.target)) return;
            closeMenu({ restoreFocus: false });
        });
        $$('a', menu).forEach(a => a.addEventListener('click', () => closeMenu({ restoreFocus: false })));
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 992 && menu.classList.contains('is-open')) {
                closeMenu({ restoreFocus: false });
            }
        }, 120));
        setupMobileMenu.close = () => closeMenu({ restoreFocus: true });
        setupMobileMenu.isOpen = () => menu.classList.contains('is-open');
    }

    function createFocusTrap(container) {
        const focusables = $$('a[href], button, [tabindex]:not([tabindex="-1"])', container)
            .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
        if (!focusables.length) return () => {};
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];
        return function (e) {
            if (e.key !== 'Tab') return;
            if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
            else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
        };
    }

    /* Smooth scroll for in-page anchor links */
    function setupSmoothScroll() {
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const headerH = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height')) || 80;
                const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
                window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        });
    }

    /* Scroll reveal animation (idempotent — safe to call again after render) */
    let revealObserver = null;
    function setupScrollReveal() {
        if (prefersReducedMotion) {
            $$('.reveal').forEach(el => el.classList.add('active'));
            return;
        }
        if (!revealObserver) {
            revealObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        }
        $$('.reveal:not(.active)').forEach(el => revealObserver.observe(el));
    }

    /* Header shadow on scroll */
    function setupHeaderScroll() {
        const header = $('#header');
        const anchor = $('#top-anchor');
        if (!header || !anchor) return;
        const observer = new IntersectionObserver(
            ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
            { threshold: 0.9 }
        );
        observer.observe(anchor);
    }

    /* Back-to-top button */
    function setupBackToTop() {
        const btn = $('#backToTop');
        if (!btn) return;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                btn.classList.toggle('show', window.scrollY > 400);
                ticking = false;
            });
        }, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* Scroll progress bar */
    function setupScrollProgress() {
        const bar = $('.scroll-progress-bar');
        if (!bar) return;
        let ticking = false;
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    /* Active section highlight in nav */
    let navObserver = null;
    function setupActiveNavObserver() {
        const sections = $$('section[id], footer[id]');
        const links = $$('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');
        if (!sections.length || !links.length) return;
        const linkMap = new Map();
        links.forEach(a => {
            const id = a.getAttribute('href').slice(1);
            if (!linkMap.has(id)) linkMap.set(id, []);
            linkMap.get(id).push(a);
        });
        const setActive = (id) => {
            links.forEach(a => a.classList.remove('is-active'));
            (linkMap.get(id) || []).forEach(a => a.classList.add('is-active'));
        };
        if (navObserver) navObserver.disconnect();
        navObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) setActive(visible[0].target.id);
        }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75] });
        sections.forEach(s => navObserver.observe(s));
    }

    /* Animated stat counters in hero */
    function setupStatCounters() {
        const nums = $$('.stat-num');
        if (!nums.length) return;
        const animate = (el) => {
            const target = parseFloat(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            if (prefersReducedMotion) {
                el.textContent = formatNum(target, currentLang) + suffix;
                return;
            }
            el.closest('li') && el.closest('li').classList.add('is-counting');
            const duration = 1900;
            const startTime = performance.now();
            const tick = (now) => {
                const t = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                const val = target * eased;
                el.textContent = formatNum(val, currentLang) + suffix;
                if (t < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = formatNum(target, currentLang) + suffix;
                    const li = el.closest('li');
                    if (li) {
                        li.classList.remove('is-counting');
                        li.classList.add('count-done');
                        setTimeout(() => li.classList.remove('count-done'), 700);
                    }
                }
            };
            requestAnimationFrame(tick);
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Small stagger between the three stats so they don't all
                    // pop at once — reads as a deliberate sequence.
                    const delay = Array.prototype.indexOf.call(nums, entry.target) * 150;
                    setTimeout(() => animate(entry.target), delay);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        nums.forEach(n => observer.observe(n));
    }

    function formatNum(n, lang) {
        const rounded = Math.round(n);
        return lang === 'fa' ? rounded.toLocaleString('fa-IR') : rounded.toLocaleString('en-US');
    }

    /* Subtle parallax — hero glow orbs (via non-animated wrapper layers so
       they never fight the orbs' own floatGlow keyframe) + hero image drift
       on mousemove. Perf-friendly: rAF-throttled, transform-only. */
    function setupParallax() {
        if (prefersReducedMotion) return;
        const layers = $$('.glow-parallax');
        const heroImage = $('.hero-image');
        if (!layers.length && !heroImage) return;
        let mx = 0, my = 0, rafId = null;
        const hero = $('.hero');

        function onMove(e) {
            const w = window.innerWidth, h = window.innerHeight;
            mx = (e.clientX / w - 0.5) * 2;
            my = (e.clientY / h - 0.5) * 2;
            if (!rafId) rafId = requestAnimationFrame(apply);
        }
        function apply() {
            rafId = null;
            layers.forEach((layer) => {
                const depth = parseFloat(layer.dataset.depth || '1') * 10;
                layer.style.setProperty('--px', (mx * depth) + 'px');
                layer.style.setProperty('--py', (my * depth) + 'px');
            });
            if (heroImage) heroImage.style.transform = `translate3d(${mx * -4}px, ${my * -4}px, 0)`;
        }
        if (hero) hero.addEventListener('mousemove', onMove, { passive: true });
    }

    /* Cursor-follow spotlight in the hero — a soft glow that tracks the
       pointer, giving the section an immediately-visible "alive" feel.
       Pure CSS custom-property update, one element, no layout thrash. */
    function setupCursorGlow() {
        if (prefersReducedMotion) return;
        const hero = $('.hero');
        if (!hero) return;
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        hero.appendChild(glow);
        let rafId = null, x = 0.5, y = 0.35;
        function apply() {
            rafId = null;
            glow.style.setProperty('--gx', (x * 100) + '%');
            glow.style.setProperty('--gy', (y * 100) + '%');
        }
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            x = (e.clientX - rect.left) / rect.width;
            y = (e.clientY - rect.top) / rect.height;
            if (!rafId) rafId = requestAnimationFrame(apply);
        }, { passive: true });
        hero.addEventListener('mouseenter', () => glow.classList.add('is-visible'));
        hero.addEventListener('mouseleave', () => glow.classList.remove('is-visible'));
    }

    /* If the profile photo fails to load (or hasn't been uploaded yet),
       show a polished gradient + monogram placeholder instead of a broken
       image / empty box, so the hero always looks intentional. */
    function setupHeroImageFallback() {
        const img = $('#profileImg');
        const wrap = $('.hero-image');
        if (!img || !wrap) return;
        const showFallback = () => wrap.classList.add('img-fallback');
        if (img.complete && img.naturalWidth === 0) showFallback();
        img.addEventListener('error', showFallback, { once: true });
    }

    function setupScrollIndicator() {
        const indicator = $('.scroll-indicator');
        if (!indicator) return;
        indicator.addEventListener('click', () => {
            const next = document.getElementById('education');
            if (!next) return;
            const headerH = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--header-height')) || 80;
            const top = next.getBoundingClientRect().top + window.scrollY - headerH - 8;
            window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
        let hidden = false;
        window.addEventListener('scroll', () => {
            const shouldHide = window.scrollY > 120;
            if (shouldHide !== hidden) {
                hidden = shouldHide;
                indicator.classList.toggle('is-hidden', hidden);
            }
        }, { passive: true });
    }

    /* Interactive timeline — highlight item nearest viewport centre + progress line */
    function setupTimelineActive() {
        const items = $$('.timeline-item');
        const track = $('.timeline');
        if (!items.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => entry.target.classList.toggle('is-active', entry.isIntersecting));
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
        items.forEach(i => observer.observe(i));

        if (!track) return;
        let ticking = false;
        const update = () => {
            const rect = track.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = rect.height + vh * 0.5;
            const passed = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
            const pct = total > 0 ? (passed / total) * 100 : 0;
            track.style.setProperty('--timeline-progress', pct + '%');
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    /* Bilingual system (Persian / English) */
    function setupLanguage() {
        const langToggle = $('#langToggle');
        const langText   = $('#langText');
        const profileImg = $('#profileImg');

        function apply(lang) {
            currentLang = lang;
            localStorage.setItem('language', lang);

            if (lang === 'fa') {
                if (langText) langText.textContent = 'EN';
                document.body.classList.remove('lang-en');
                document.body.classList.add('lang-fa');
                document.documentElement.classList.remove('lang-en-pending');
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'fa');
            } else {
                if (langText) langText.textContent = 'FA';
                document.body.classList.add('lang-en');
                document.body.classList.remove('lang-fa');
                document.documentElement.classList.remove('lang-en-pending');
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', 'en');
            }

            const docTitle = document.querySelector('title[data-fa]');
            if (docTitle) {
                docTitle.textContent = lang === 'fa' ? docTitle.getAttribute('data-fa') : docTitle.getAttribute('data-en');
            }

            document.querySelectorAll('[data-fa][data-en]').forEach(el => {
                const text = lang === 'fa' ? el.getAttribute('data-fa') : el.getAttribute('data-en');
                if (text === null) return;
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.placeholder = text; return; }
                if (el.tagName === 'A' && el.querySelector('span')) {
                    const span = el.querySelector('span');
                    if (span) span.textContent = text;
                    return;
                }
                if (el.children.length > 0) {
                    let textNodeFound = false;
                    for (const child of el.childNodes) {
                        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                            child.textContent = text;
                            textNodeFound = true;
                            break;
                        }
                    }
                    if (!textNodeFound) {
                        const span = el.querySelector('span');
                        if (span) span.textContent = text;
                        else if (el.children.length === 0) el.textContent = text;
                    }
                } else {
                    el.textContent = text;
                }
            });

            const downloadBtn = document.querySelector('.btn-primary[href*="resume"]');
            if (downloadBtn) {
                downloadBtn.setAttribute('href', lang === 'fa' ? 'resume_fa.pdf' : 'resume_en.pdf');
            }

            $$('.btn-toggle').forEach(btn => {
                const content = document.getElementById(btn.getAttribute('data-target'));
                const span = btn.querySelector('span');
                if (!content || !span) return;
                span.textContent = content.classList.contains('expanded')
                    ? (lang === 'fa' ? 'مشاهده کمتر' : 'Show Less')
                    : (lang === 'fa' ? 'مشاهده بیشتر' : 'Show More');
            });

            if (profileImg) {
                const alt = lang === 'fa' ? profileImg.getAttribute('data-fa-alt') : profileImg.getAttribute('data-en-alt');
                if (alt) profileImg.setAttribute('alt', alt);
            }

            $$('.stat-num').forEach(el => {
                const target = parseFloat(el.getAttribute('data-target') || '0');
                const suffix = el.getAttribute('data-suffix') || '';
                if (el.textContent.trim() !== '0' && el.textContent.trim() !== '۰') {
                    el.textContent = formatNum(target, lang) + suffix;
                }
            });

            const menuToggle = $('#menuToggle');
            if (menuToggle) {
                menuToggle.setAttribute('aria-label', lang === 'fa' ? 'باز و بسته کردن منو' : 'Toggle menu');
            }
        }

        apply(currentLang);
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const next = currentLang === 'fa' ? 'en' : 'fa';
                apply(next);
                try {
                    const url = new URL(window.location.href);
                    if (next === 'en') url.searchParams.set('lang', 'en');
                    else url.searchParams.delete('lang');
                    history.replaceState(null, '', url.pathname + url.search + url.hash);
                } catch (e) { /* ignore */ }
            });
        }
        document.addEventListener('content:rendered', () => apply(currentLang));
    }

    /* Keyboard shortcuts (ESC closes mobile menu) */
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && setupMobileMenu.isOpen && setupMobileMenu.isOpen()) {
                setupMobileMenu.close();
            }
        });
    }

})();
