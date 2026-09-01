/* ==========================================================================
   NEXORA — script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader ---------------- */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (pre) setTimeout(() => pre.classList.add('done'), 250);
  });

  /* ---------------- Sticky header shrink ---------------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) header.style.borderBottomColor = 'rgba(201,162,75,0.34)';
    else header.style.borderBottomColor = 'rgba(201,162,75,0.16)';
  });

  /* ---------------- Mobile hamburger ---------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  /* ---------------- Back to top ---------------- */
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    topBtn.hidden = window.scrollY < 500;
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- 3D mouse-reactive logo (About section) ---------------- */
  const logoStage = document.getElementById('logoStage');
  const logoTilt = document.getElementById('logoTilt');
  if (logoStage && logoTilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const maxTilt = 18;
    logoStage.addEventListener('mousemove', (e) => {
      const rect = logoStage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * maxTilt * 2;
      const rotX = (0.5 - py) * maxTilt * 2;
      logoTilt.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    logoStage.addEventListener('mouseleave', () => {
      logoTilt.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
    // Light touch support
    logoStage.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = logoStage.getBoundingClientRect();
      const px = (touch.clientX - rect.left) / rect.width;
      const py = (touch.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * maxTilt * 2;
      const rotX = (0.5 - py) * maxTilt * 2;
      logoTilt.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }, { passive: true });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll(
    '.stat-card, .service-card, .project-card, .yt-card, .portfolio-item, .about-visual, .about-copy, .contact-info, .contact-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     PLACEHOLDER IMAGE HELPER
     Falls back to a clean labelled placeholder if a replacement image
     hasn't been added yet, instead of showing a broken image icon.
     ========================================================================== */
  function imgWithFallback(src, alt, filenameLabel) {
    const wrap = document.createElement('div');
    wrap.className = 'thumb-wrap';
    wrap.style.width = '100%';
    wrap.style.height = '100%';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      img.remove();
      const tag = document.createElement('span');
      tag.className = 'placeholder-tag';
      tag.textContent = filenameLabel;
      wrap.appendChild(tag);
    });
    wrap.appendChild(img);
    return wrap;
  }

  /* ==========================================================================
     PROJECTS DATA — replace image, title, description, tools and category
     category must be one of: mechanical, cad, electrical, automation, product, creative
     ========================================================================== */
  const projectsData = [
    {
      title: 'Swept-Feature CAD Modeling Series',
      category: 'cad',
      categoryLabel: 'CAD',
      desc: 'A set of complex swept and lofted surface studies — multi-profile sweeps, twisted paths and constant-normal geometry.',
      tools: ['SolidWorks'],
      image: 'images/projects/project-01.jpg'
    },
    {
      title: 'Four-Cylinder Crank Assembly',
      category: 'mechanical',
      categoryLabel: 'Mechanical',
      desc: 'Piston, connecting rod and crankshaft assembly with a fully dimensioned front and isometric drawing sheet.',
      tools: ['CATIA', 'Technical Drawing'],
      image: 'images/projects/project-02.jpg'
    },
    {
      title: 'Clevis Bracket — Dimensioned CAD',
      category: 'mechanical',
      categoryLabel: 'Mechanical',
      desc: 'Fully toleranced clevis-style mounting bracket, modeled and dimensioned for manufacturing handoff.',
      tools: ['SolidWorks', 'GD&T'],
      image: 'images/projects/project-03.jpg'
    },
    {
      title: 'Arbor Press — Exploded Assembly',
      category: 'product',
      categoryLabel: 'Product Design',
      desc: 'Full exploded assembly drawing with parts list, covering column, gear, rack and handle components.',
      tools: ['Technical Drawing', 'BOM'],
      image: 'images/projects/project-04.jpg'
    },
    {
      title: 'Turbine Housing — Model-Based Definition',
      category: 'mechanical',
      categoryLabel: 'Mechanical',
      desc: 'Fully toleranced housing with in-model GD&T callouts, built for a model-based definition workflow.',
      tools: ['PTC Creo', 'GD&T'],
      image: 'images/projects/project-05.jpg'
    },
    {
      title: 'Mounting Block — Four-View Drawing',
      category: 'mechanical',
      categoryLabel: 'Mechanical',
      desc: 'Orthographic four-view technical drawing with full dimensioning for a machined mounting block.',
      tools: ['AutoCAD', 'Technical Drawing'],
      image: 'images/projects/project-06.jpg'
    },
    {
      title: 'Microcontroller Board — PCB Layout',
      category: 'electrical',
      categoryLabel: 'Electrical',
      desc: 'Two-layer PCB routing for a microcontroller board, with header, IC and passive component placement.',
      tools: ['PCB Design'],
      image: 'images/projects/project-07.jpg'
    },
    {
      title: 'GSM Motor-Control PCB',
      category: 'electrical',
      categoryLabel: 'Electrical',
      desc: 'Compact PCB layout for a GSM-connected motor controller, including power regulation and driver stage.',
      tools: ['PCB Design'],
      image: 'images/projects/project-08.jpg'
    },
    {
      title: 'DOL Starter — Power & Control Wiring',
      category: 'automation',
      categoryLabel: 'Automation',
      desc: 'Typical power and control wiring schematic for a 2.2kW direct-on-line starter feeder.',
      tools: ['AutoCAD Electrical'],
      image: 'images/projects/project-09.jpg'
    },
    {
      title: 'Flanged Ball Valve — CAD Render',
      category: 'cad',
      categoryLabel: 'CAD',
      desc: 'Fully modeled flanged ball valve assembly with bolted joints, rendered for design review.',
      tools: ['SolidWorks', 'CAD Rendering'],
      image: 'images/projects/project-10.jpg'
    },
    {
      title: 'Intake Duct — Rendered Assembly',
      category: 'product',
      categoryLabel: 'Product Design',
      desc: 'Sheet-formed intake duct with dual flanged ports, modeled and rendered for a manufacturing review.',
      tools: ['SolidWorks', 'Surfacing'],
      image: 'images/projects/project-11.jpg'
    },
    {
      title: 'Flanged Pipe Spool — CAD Render',
      category: 'mechanical',
      categoryLabel: 'Mechanical',
      desc: 'Bolted pipe spool with dual flange connections, modeled for piping and fabrication layout.',
      tools: ['SolidWorks', 'CAD Rendering'],
      image: 'images/projects/project-12.jpg'
    }
  ];

  const projectGrid = document.getElementById('projectGrid');
  projectsData.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = p.category;

    const thumb = document.createElement('div');
    thumb.className = 'project-thumb';
    thumb.appendChild(imgWithFallback(p.image, p.title, p.image.split('/').pop() + ' (replace me)'));

    const body = document.createElement('div');
    body.className = 'project-body';
    body.innerHTML = `
      <span class="project-cat">${p.categoryLabel}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tools">${p.tools.map(t => `<span>${t}</span>`).join('')}</div>
      <a href="#" class="project-link">View Project &rarr;</a>
    `;

    card.appendChild(thumb);
    card.appendChild(body);
    projectGrid.appendChild(card);
  });

  /* Project filtering */
  const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#projectGrid .project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------------- Portfolio strip (reuses project images 1-8) ---------------- */
  const portfolioStrip = document.getElementById('portfolioStrip');
  for (let i = 1; i <= 10; i++) {
    const num = String(i).padStart(2, '0');
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.appendChild(imgWithFallback(`images/projects/portfolio-${num}.jpg`, `Portfolio piece ${num}`, `portfolio-${num}.jpg`));
    portfolioStrip.appendChild(item);
  }

  /* ==========================================================================
     YOUTUBE VIDEOS — replace videoId, thumbnail and details with your own.
     Get a video ID from its YouTube URL: youtube.com/watch?v=VIDEO_ID
     ========================================================================== */
  /* Titles: confirmed from the video's own thumbnail text where visible;
     the rest are working titles by category — swap in the exact titles
     whenever you have them (see README). */
  const youtubeVideos = [
    {
      title: 'PTC Creo Tips & Tricks — Model Like a Pro',
      videoId: 'OT0US0xXWAI',
      thumbnail: 'https://img.youtube.com/vi/OT0US0xXWAI/maxresdefault.jpg',
      category: 'CAD Tutorials',
      duration: ''
    },
    {
      title: 'CAD Modeling Walkthrough',
      videoId: 'POvlAxG3G_w',
      thumbnail: 'https://img.youtube.com/vi/POvlAxG3G_w/maxresdefault.jpg',
      category: 'CAD Tutorials',
      duration: ''
    },
    {
      title: 'Mechanical Design Process, Explained',
      videoId: '92NGRk_LF-4',
      thumbnail: 'https://img.youtube.com/vi/92NGRk_LF-4/maxresdefault.jpg',
      category: 'Mechanical Design',
      duration: ''
    },
    {
      title: 'Inside a Nexora Engineering Project',
      videoId: 'nZsTUcXtsHI',
      thumbnail: 'https://img.youtube.com/vi/nZsTUcXtsHI/maxresdefault.jpg',
      category: 'Projects',
      duration: ''
    },
    {
      title: 'Engineering & Design — Behind the Scenes',
      videoId: 't9mGJob7PS0',
      thumbnail: 'https://img.youtube.com/vi/t9mGJob7PS0/maxresdefault.jpg',
      category: 'Design',
      duration: ''
    }
  ];

  /* ---------------- Channel subscriber count ----------------
     Set to a number to display it (e.g. 1240). Leave as null to
     show the generic "YouTube Channel" label instead of a guessed
     figure — per the brief, never show a fake statistic here. */
  const CHANNEL_SUBSCRIBERS = null;
  const ytSubCount = document.getElementById('ytSubCount');
  if (ytSubCount && typeof CHANNEL_SUBSCRIBERS === 'number') {
    const formatted = CHANNEL_SUBSCRIBERS >= 1000
      ? (CHANNEL_SUBSCRIBERS / 1000).toFixed(CHANNEL_SUBSCRIBERS % 1000 === 0 ? 0 : 1) + 'K'
      : String(CHANNEL_SUBSCRIBERS);
    ytSubCount.textContent = `${formatted} subscribers`;
  }

  const ytGrid = document.getElementById('ytGrid');
  const ytModal = document.getElementById('ytModal');
  const ytModalFrame = document.getElementById('ytModalFrame');

  function openVideoModal(videoId) {
    ytModalFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    ytModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeVideoModal() {
    ytModal.hidden = true;
    ytModalFrame.innerHTML = '';
    document.body.style.overflow = '';
  }
  document.getElementById('ytModalClose').addEventListener('click', closeVideoModal);
  document.getElementById('ytModalBackdrop').addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !ytModal.hidden) closeVideoModal(); });

  youtubeVideos.forEach(v => {
    const card = document.createElement('article');
    card.className = 'yt-card';
    card.dataset.category = v.category;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Play video: ${v.title}`);

    const thumb = document.createElement('div');
    thumb.className = 'yt-thumb';

    // YouTube thumbnails: try maxresdefault first, fall back to hqdefault
    // (maxres isn't generated for every video), then a labelled placeholder.
    const ytImg = document.createElement('img');
    ytImg.src = v.thumbnail;
    ytImg.alt = v.title;
    ytImg.loading = 'lazy';
    ytImg.addEventListener('error', function onErr() {
      if (!ytImg.dataset.fallenBack && v.videoId) {
        ytImg.dataset.fallenBack = '1';
        ytImg.src = `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
      } else {
        ytImg.removeEventListener('error', onErr);
        ytImg.remove();
        const tag = document.createElement('span');
        tag.className = 'placeholder-tag';
        tag.textContent = 'thumbnail unavailable';
        thumb.appendChild(tag);
      }
    });
    thumb.appendChild(ytImg);

    const play = document.createElement('div');
    play.className = 'yt-play';
    play.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11"/><path d="M10 8l6 4-6 4z" fill="currentColor" stroke="none"/></svg>`;
    thumb.appendChild(play);

    if (v.duration) {
      const duration = document.createElement('span');
      duration.className = 'yt-duration';
      duration.textContent = v.duration;
      thumb.appendChild(duration);
    }

    const body = document.createElement('div');
    body.className = 'yt-body';
    body.innerHTML = `
      <span class="yt-cat">${v.category}</span>
      <h3>${v.title}</h3>
      <p>Watch this video for a closer look at how Nexora approaches this part of the process.</p>
      <span class="yt-watch">Watch on YouTube &rarr;</span>
    `;

    card.appendChild(thumb);
    card.appendChild(body);

    const trigger = () => {
      if (!v.videoId || v.videoId.startsWith('YOUR_VIDEO_ID')) {
        window.open('https://youtube.com/@Nexora-k9x', '_blank', 'noopener');
      } else {
        openVideoModal(v.videoId);
      }
    };
    card.addEventListener('click', trigger);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } });

    ytGrid.appendChild(card);
  });

  /* YouTube category filter */
  const ytFilterBtns = document.querySelectorAll('.yt-filter-bar .filter-btn');
  ytFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ytFilterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.ytfilter;
      document.querySelectorAll('#ytGrid .yt-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------------- Contact form (front-end only — wire to your backend/email service) ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      formNote.textContent = 'Please fill in all required fields.';
      formNote.style.color = '#E9C878';
      return;
    }
    formNote.textContent = 'Thanks — your message is ready to send. Connect this form to your email service or backend to deliver it.';
    formNote.style.color = '#56B378';
    contactForm.reset();
  });

});
