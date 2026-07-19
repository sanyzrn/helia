/* =============================================================================
   Dr. Helia Namazi — Content Renderer
   -----------------------------------------------------------------------------
   Reads SITE_DATA (data.js) and builds the DOM for every content-driven
   section. Runs once, synchronously, before script.js's language/animation
   setup — so translation, counters and scroll-reveal all work exactly as
   they did when the content was hard-coded in HTML.
   ============================================================================= */
(function () {
    'use strict';

    const NS = 'http://www.w3.org/2000/svg';

    /** Create a leaf element carrying both languages; textContent starts in Farsi. */
    function bi(tag, obj, extraAttrs) {
        const el = document.createElement(tag);
        el.setAttribute('data-fa', obj.fa);
        el.setAttribute('data-en', obj.en);
        el.textContent = obj.fa;
        if (extraAttrs) {
            Object.keys(extraAttrs).forEach(k => el.setAttribute(k, extraAttrs[k]));
        }
        return el;
    }

    function icon(pathD, size) {
        const svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        if (size) { svg.setAttribute('width', size); svg.setAttribute('height', size); }
        pathD.split(/(?=M)/).forEach(d => {
            if (!d.trim()) return;
            const p = document.createElementNS(NS, 'path');
            p.setAttribute('d', d.trim());
            svg.appendChild(p);
        });
        return svg;
    }

    function reveal(el, delay) {
        el.classList.add('reveal');
        if (delay) el.style.transitionDelay = delay + 's';
        return el;
    }

    /* -------------------------------------------------------------------------
       Education
       ------------------------------------------------------------------------- */
    function renderEducation() {
        const grid = document.getElementById('eduGrid');
        if (!grid) return;
        SITE_DATA.education.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'edu-card' + (item.featured ? ' is-featured' : '');
            reveal(card, i * 0.1);
            if (item.featured) {
                const badge = bi('div', item.badge, { class: 'edu-badge' });
                card.appendChild(badge);
            }
            card.appendChild(bi('div', item.degree, { class: 'edu-degree' }));
            card.appendChild(bi('div', item.field, { class: 'edu-field' }));
            card.appendChild(bi('div', item.uni, { class: 'edu-uni' }));
            const meta = document.createElement('div');
            meta.className = 'edu-meta';
            meta.appendChild(bi('span', item.year, { class: 'edu-year' }));
            meta.appendChild(bi('span', item.gpa, { class: 'edu-gpa' }));
            card.appendChild(meta);
            grid.appendChild(card);
        });
    }

    /* -------------------------------------------------------------------------
       Experience timeline (interactive)
       ------------------------------------------------------------------------- */
    function renderExperience() {
        const ol = document.getElementById('expTimeline');
        if (!ol) return;
        SITE_DATA.experience.forEach((item, i) => {
            const li = document.createElement('li');
            li.className = 'timeline-item';
            reveal(li, 0);
            const content = document.createElement('div');
            content.className = 'timeline-content';
            if (item.current) {
                content.appendChild(bi('span', { fa: 'در حال حاضر', en: 'Current' }, { class: 'timeline-status' }));
            }
            content.appendChild(bi('span', item.date, { class: 'timeline-date' }));
            content.appendChild(bi('div', item.title, { class: 'timeline-title' }));
            content.appendChild(bi('p', item.desc, { class: 'timeline-desc' }));
            li.appendChild(content);
            ol.appendChild(li);
        });
    }

    /* -------------------------------------------------------------------------
       Certificates
       ------------------------------------------------------------------------- */
    function renderCertificates() {
        const grid = document.getElementById('certGrid');
        if (!grid) return;
        const certIcon = 'M21.21 15.89A10 10 0 1 0 8 2.83M22 4 12 14.01';
        SITE_DATA.certificates.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            reveal(card, i * 0.1);
            const iconWrap = document.createElement('div');
            iconWrap.className = 'card-icon';
            iconWrap.setAttribute('aria-hidden', 'true');
            iconWrap.appendChild(icon(certIcon));
            card.appendChild(iconWrap);
            card.appendChild(bi('h3', item.title));
            grid.appendChild(card);
        });
    }

    /* -------------------------------------------------------------------------
       Skills — modern filterable chip visualization
       ------------------------------------------------------------------------- */
    function renderSkills() {
        const tabs = document.getElementById('skillsTabs');
        const grid = document.getElementById('skillsGrid');
        if (!tabs || !grid) return;

        const allTab = document.createElement('button');
        allTab.className = 'skill-tab active';
        allTab.type = 'button';
        allTab.dataset.filter = 'all';
        allTab.appendChild(bi('span', { fa: 'همه', en: 'All' }));
        tabs.appendChild(allTab);

        SITE_DATA.skills.forEach((group, gi) => {
            const tab = document.createElement('button');
            tab.className = 'skill-tab';
            tab.type = 'button';
            tab.dataset.filter = group.id;
            tab.appendChild(bi('span', group.title));
            tabs.appendChild(tab);

            const panel = document.createElement('div');
            panel.className = 'skill-panel';
            panel.dataset.group = group.id;
            reveal(panel, gi * 0.08);

            const head = document.createElement('div');
            head.className = 'skill-panel-head';
            const iconWrap = document.createElement('span');
            iconWrap.className = 'skill-panel-icon';
            iconWrap.appendChild(icon(group.icon));
            head.appendChild(iconWrap);
            head.appendChild(bi('h3', group.title));
            panel.appendChild(head);

            const chipWrap = document.createElement('ul');
            chipWrap.className = 'skill-chip-list';
            group.tags.forEach((tag, ti) => {
                const li = document.createElement('li');
                li.className = 'skill-chip';
                li.style.transitionDelay = (ti * 0.04) + 's';
                li.appendChild(bi('span', tag));
                chipWrap.appendChild(li);
            });
            panel.appendChild(chipWrap);
            grid.appendChild(panel);
        });

        tabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.skill-tab');
            if (!btn) return;
            tabs.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            grid.querySelectorAll('.skill-panel').forEach(panel => {
                panel.classList.toggle('is-hidden', filter !== 'all' && panel.dataset.group !== filter);
            });
        });
    }

    /* -------------------------------------------------------------------------
       Courses (collapsible)
       ------------------------------------------------------------------------- */
    function renderCourses() {
        const wrap = document.getElementById('coursesList');
        if (!wrap) return;
        SITE_DATA.courses.forEach((group) => {
            const item = document.createElement('div');
            item.className = 'simple-item' + (group.visible ? '' : ' hidden-course');
            reveal(item, 0);
            const h3 = document.createElement('h3');
            h3.className = 'item-title';
            const emoji = document.createElement('span');
            emoji.className = 'emoji';
            emoji.setAttribute('aria-hidden', 'true');
            emoji.textContent = group.icon;
            h3.appendChild(emoji);
            h3.appendChild(document.createTextNode(' '));
            h3.appendChild(bi('span', group.title));
            item.appendChild(h3);

            const ul = document.createElement('ul');
            ul.className = 'item-list';
            group.items.forEach(li => {
                ul.appendChild(bi('li', li));
            });
            item.appendChild(ul);
            wrap.appendChild(item);
        });
    }

    /* -------------------------------------------------------------------------
       Featured Projects
       ------------------------------------------------------------------------- */
    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        SITE_DATA.projects.forEach((proj, i) => {
            const card = document.createElement('article');
            card.className = 'project-card';
            reveal(card, i * 0.1);

            const top = document.createElement('div');
            top.className = 'project-card-top';
            const iconWrap = document.createElement('div');
            iconWrap.className = 'card-icon';
            iconWrap.appendChild(icon(proj.icon));
            top.appendChild(iconWrap);
            top.appendChild(bi('span', proj.tag, { class: 'project-tag' }));
            card.appendChild(top);

            card.appendChild(bi('h3', proj.title));

            const ul = document.createElement('ul');
            ul.className = 'list-style-none';
            proj.items.forEach(li => ul.appendChild(bi('li', li)));
            card.appendChild(ul);
            grid.appendChild(card);
        });
    }

    /* -------------------------------------------------------------------------
       Publications
       ------------------------------------------------------------------------- */
    function renderPublications() {
        const wrap = document.getElementById('pubsList');
        if (!wrap) return;
        const P = SITE_DATA.publications;

        function baseItem(entry, extraClass) {
            const div = document.createElement('div');
            div.className = 'simple-item' + (extraClass ? ' ' + extraClass : '') + (entry.visible ? '' : ' hidden-item');
            reveal(div, 0);
            const h3 = document.createElement('h3');
            h3.className = 'item-title';
            const emoji = document.createElement('span');
            emoji.className = 'emoji';
            emoji.setAttribute('aria-hidden', 'true');
            emoji.textContent = entry.emoji;
            h3.appendChild(emoji);
            h3.appendChild(document.createTextNode(' '));
            h3.appendChild(bi('span', entry.title));
            div.appendChild(h3);
            return div;
        }

        // Honors
        const honors = baseItem(P.honors, 'is-honor');
        honors.appendChild(bi('p', P.honors.text));
        wrap.appendChild(honors);

        // PhD dissertation
        const phd = baseItem(P.phd);
        P.phd.rows.forEach(row => {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.setAttribute('data-fa', row.label.fa);
            strong.setAttribute('data-en', row.label.en);
            strong.textContent = row.label.fa;
            p.appendChild(strong);
            p.appendChild(document.createTextNode(' '));
            p.appendChild(bi('span', row.value));
            phd.appendChild(p);
        });
        wrap.appendChild(phd);

        // MSc thesis
        const msc = baseItem(P.msc);
        P.msc.rows.forEach(row => {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.setAttribute('data-fa', row.label.fa);
            strong.setAttribute('data-en', row.label.en);
            strong.textContent = row.label.fa;
            p.appendChild(strong);
            p.appendChild(document.createTextNode(' '));
            p.appendChild(bi('span', row.value));
            msc.appendChild(p);
        });
        wrap.appendChild(msc);

        // Research projects
        const research = baseItem(P.research);
        research.appendChild(bi('p', P.research.text));
        const locP = document.createElement('p');
        locP.style.marginTop = '5px';
        locP.style.opacity = '0.8';
        locP.appendChild(document.createTextNode('\uD83D\uDCCD '));
        locP.appendChild(bi('span', P.research.location));
        research.appendChild(locP);
        wrap.appendChild(research);

        // Articles
        const articles = baseItem(P.articles);
        P.articles.list.forEach(text => {
            const wrap2 = document.createElement('div');
            wrap2.className = 'ltr-text';
            const p = document.createElement('p');
            p.textContent = text;
            wrap2.appendChild(p);
            articles.appendChild(wrap2);
        });
        wrap.appendChild(articles);
    }

    /* -------------------------------------------------------------------------
       Testimonials
       ------------------------------------------------------------------------- */
    function renderTestimonials() {
        const track = document.getElementById('testimonialsTrack');
        if (!track) return;
        SITE_DATA.testimonials.forEach((t, i) => {
            const card = reveal(document.createElement('figure'), i * 0.1);
            card.className = 'testimonial-card' + (t.placeholder ? ' is-placeholder' : '');
            const quoteMark = document.createElement('span');
            quoteMark.className = 'testimonial-quote-mark';
            quoteMark.setAttribute('aria-hidden', 'true');
            quoteMark.textContent = '\u201C';
            card.appendChild(quoteMark);
            card.appendChild(bi('blockquote', t.quote));
            const cap = document.createElement('figcaption');
            cap.appendChild(bi('span', t.name, { class: 'testimonial-name' }));
            cap.appendChild(bi('span', t.role, { class: 'testimonial-role' }));
            card.appendChild(cap);
            track.appendChild(card);
        });
    }

    function renderAll() {
        renderEducation();
        renderExperience();
        renderCertificates();
        renderSkills();
        renderCourses();
        renderProjects();
        renderPublications();
        // renderTestimonials(); // Hidden for now — re-enable when real quotes are ready.
        document.dispatchEvent(new CustomEvent('content:rendered'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }
})();
