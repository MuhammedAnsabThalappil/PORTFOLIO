// Muhammed Ansab Thalappil — Main Application Logic (Clean & Dynamic)

import {
  PROFILE,
  SOCIALS,
  TIMELINE,
  HERO_ACHIEVEMENT,
  ACHIEVEMENT_STATS,
  SECONDARY_ACHIEVEMENTS,
  MEDIA_RECOGNITION,
  ACHIEVEMENT_FLOW_TIMELINE,
  FEATURED_PROJECT,
  EXTRA_PROJECTS,
  BUSINESSES,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  BUSINESS_TECH_FLOW,
  CURRENTLY_EXPLORING
} from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  renderNavbar();
  renderHero();
  renderAbout();
  renderTimeline();
  renderAchievement();
  renderProjects();
  renderEntrepreneurship();
  renderExperience();
  renderEducationAndSkills();
  renderBusinessTechFlow();
  renderMarquee();
  renderPhilosophy();
  renderContact();
  renderFooter();
  initModals();
  initLightbox();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   01. INTERACTIVE MOUSE PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  let canvas = document.getElementById('bg-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);
  }
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 0.5;
      this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(139, 92, 246, ';
      this.alpha = Math.random() * 0.45 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < 55; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   02. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function renderNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.innerHTML = `
    <a href="#" class="nav-brand">
      <span class="nav-brand-dot"></span>
      <span>ANSAB<span class="cyan-text">.AI</span></span>
    </a>
    <ul class="nav-links">
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#journey" class="nav-link">Journey</a></li>
      <li><a href="#achievement" class="nav-link">Achievements</a></li>
      <li><a href="#projects" class="nav-link">Projects</a></li>
      <li><a href="#entrepreneurship" class="nav-link">Business</a></li>
      <li><a href="#experience" class="nav-link">Experience</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle Menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  `;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close');

  if (mobileToggle && drawer) {
    mobileToggle.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

/* --------------------------------------------------------------------------
   03. HERO SECTION
   -------------------------------------------------------------------------- */
function renderHero() {
  const heroContainer = document.getElementById('hero-content');
  if (!heroContainer) return;

  heroContainer.innerHTML = `
    <div class="hero-grid">
      <div class="hero-text-block">
        <div class="hero-tagline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          AI × CODE × BUSINESS
        </div>
        <h1 class="hero-name">${PROFILE.fullName.toUpperCase()}</h1>
        <div class="hero-slogan gradient-text">${PROFILE.coreBrand}</div>
        <div class="hero-role">
          <span>AI & DATA SCIENCE STUDENT</span>
          <span>·</span>
          <span>DEVELOPER</span>
          <span>·</span>
          <span>ENTREPRENEUR</span>
        </div>
        <blockquote class="hero-quote">
          “${PROFILE.heroStatement}”
        </blockquote>
        <p class="hero-bio">
          I’m Muhammed Ansab, an AI & Data Science student, programmer and entrepreneur passionate about turning ideas into impact.
        </p>
        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">
            <span>EXPLORE MY WORK</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" class="btn btn-secondary">
            <span>LET'S CONNECT</span>
          </a>
        </div>
        <div class="social-links-bar">
          <a href="${SOCIALS.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            <span>LinkedIn</span>
          </a>
          <a href="${SOCIALS.github}" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span>GitHub</span>
          </a>
          <a href="${SOCIALS.email}" class="social-link">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
            <span>Email</span>
          </a>
        </div>
      </div>

      <div class="hero-visual-block">
        <div class="hero-visual-card">
          <div class="hero-floating-stat-badge">
            <div style="font-size: 1.2rem;">🏆</div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--primary-cyan);">CONVERGE 2026 1ST PRIZE</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">₹25,000 Team Champion</div>
            </div>
          </div>
          <img src="/assets/profile.jpg" alt="Muhammed Ansab Thalappil" class="hero-profile-img" />
          <div class="hero-visual-badge">
            <div class="visual-badge-icon">⚡</div>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; color: #fff;">MUHAMMED ANSAB</div>
              <div style="font-size: 0.8rem; color: var(--primary-cyan);">Co-Founder @ Motherbits LLP</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-card stats-banner-grid" style="margin-top: 4.5rem;">
      <div class="stat-box">
        <div class="stat-number cyan-text">₹25K</div>
        <div class="stat-label">CONVERGE 2026 1ST PRIZE</div>
      </div>
      <div class="stat-box">
        <div class="stat-number violet-text">03</div>
        <div class="stat-label">Ventures Founded</div>
      </div>
      <div class="stat-box">
        <div class="stat-number amber-text">07</div>
        <div class="stat-label">Months Flutter Internship</div>
      </div>
      <div class="stat-box">
        <div class="stat-number emerald-text">B.TECH</div>
        <div class="stat-label">AI & Data Science Degree</div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   04. ABOUT ME SECTION
   -------------------------------------------------------------------------- */
function renderAbout() {
  const aboutContainer = document.getElementById('about-content');
  if (!aboutContainer) return;

  aboutContainer.innerHTML = `
    <div class="section-eyebrow">01 — ABOUT ME</div>
    <h2 class="section-title">FROM PROJECTS <span class="gradient-text">TO BUSINESSES.</span></h2>
    <div class="about-grid">
      <div class="about-story-col">
        ${PROFILE.aboutStory.map((p, idx) => `
          <p class="about-story-p">${idx === 0 ? `<strong>${p}</strong>` : p}</p>
        `).join('')}
      </div>
      <div class="about-mission-col">
        <div class="glass-card" style="border-color: rgba(139, 92, 246, 0.35); background: linear-gradient(135deg, rgba(13, 16, 26, 0.95), rgba(22, 18, 38, 0.95));">
          <div class="mono-text violet-text" style="margin-bottom: 0.85rem;">PERSONAL MISSION</div>
          <blockquote style="font-size: 1.15rem; font-style: italic; line-height: 1.75; color: var(--text-main); margin-bottom: 1.75rem;">
            “${PROFILE.mission}”
          </blockquote>
          <div style="display: flex; gap: 0.6rem; align-items: center;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--secondary-violet); box-shadow: 0 0 10px var(--secondary-violet);"></div>
            <span class="mono-text" style="font-size: 0.825rem; color: var(--text-muted);">${PROFILE.location}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="identity-cards-grid">
      ${PROFILE.identityCards.map(card => `
        <div class="glass-card identity-card">
          <div>
            <div class="identity-num">${card.number}</div>
            <h3 class="identity-title">${card.title}</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.7;">${card.description}</p>
          </div>
          <div class="identity-tags">
            ${card.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   05. MY JOURNEY TIMELINE
   -------------------------------------------------------------------------- */
function renderTimeline() {
  const timelineContainer = document.getElementById('timeline-content');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 3.5rem;">
      <div class="section-eyebrow">VISUAL ROADMAP</div>
      <h2 class="section-title">THE JOURNEY <span class="gradient-text">SO FAR</span></h2>
    </div>

    <div class="timeline-track">
      <div class="timeline-line"></div>
      ${TIMELINE.map(item => `
        <div class="timeline-item">
          <div class="timeline-node"></div>
          <div class="glass-card timeline-content">
            <div class="timeline-step-badge">${item.step} · ${item.badge}</div>
            <h3 class="timeline-title">${item.title}</h3>
            <div class="timeline-subtitle">${item.subtitle}</div>
            <p style="font-size: 0.925rem; color: var(--text-muted); line-height: 1.65;">${item.description}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   06. REDESIGNED EDITORIAL ACHIEVEMENTS & RECOGNITION SECTION
   -------------------------------------------------------------------------- */
function renderAchievement() {
  const container = document.getElementById('achievement-content');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <div class="section-eyebrow">02 — ACHIEVEMENTS & RECOGNITION</div>
      <h2 class="section-title">ACHIEVEMENTS <span class="gradient-text">& RECOGNITION</span></h2>
      <p class="section-subtitle" style="margin: 0 auto 2.5rem auto;">
        “Learning, building, competing — and turning ideas into results.”
      </p>
    </div>

    <!-- Visual Story Pipeline -->
    <div class="story-pipeline-bar">
      <span class="story-pipeline-step">LEARN</span>
      <span class="story-pipeline-arrow">→</span>
      <span class="story-pipeline-step">BUILD</span>
      <span class="story-pipeline-arrow">→</span>
      <span class="story-pipeline-step">INNOVATE</span>
      <span class="story-pipeline-arrow">→</span>
      <span class="story-pipeline-step">COMPETE</span>
      <span class="story-pipeline-arrow">→</span>
      <span class="story-pipeline-step active">ACHIEVE</span>
    </div>

    <!-- HERO FEATURED ACHIEVEMENT — CONVERGE 2026 -->
    <div class="converge-hero-card">
      <div class="converge-img-container lightbox-trigger" data-img="${HERO_ACHIEVEMENT.image}" data-caption="CONVERGE 2026 Reverse Pitch 1st Prize Winners — Abraham Jolly, Muhammed Ansab Thalappil, Muhammad Finan, Parvathi Sreejith">
        <img src="${HERO_ACHIEVEMENT.image}" alt="CONVERGE 2026 1st Prize Team Photo" class="converge-img" />
        <div class="img-lightbox-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          <span>CLICK TO EXPAND</span>
        </div>
      </div>

      <div class="converge-content">
        <div class="converge-award-badge">
          <span>${HERO_ACHIEVEMENT.badge}</span>
          <span style="opacity: 0.5;">|</span>
          <span>${HERO_ACHIEVEMENT.prize}</span>
        </div>
        <h3 class="converge-title">${HERO_ACHIEVEMENT.title}</h3>
        <div class="converge-subtitle">${HERO_ACHIEVEMENT.subtitle}</div>
        <p class="converge-wording">“${HERO_ACHIEVEMENT.wording}”</p>

        <!-- Team Members List -->
        <div class="team-list-box">
          <div class="team-list-title">TEAM MEMBERS</div>
          <div class="team-members-chips">
            ${HERO_ACHIEVEMENT.teamMembers.map(m => `
              <span class="team-chip ${m.includes('Ansab') ? 'ansab' : ''}">${m}</span>
            `).join('')}
          </div>
        </div>

        <!-- Expandable Story Accordion -->
        <div class="story-accordion-box">
          <button class="story-accordion-header" id="toggle-story-btn">
            <span>THE STORY</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="story-chevron"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="story-teaser-text">“${HERO_ACHIEVEMENT.storyTeaser}”</div>
          <div class="story-expand-body" id="story-expand-body">
            ${HERO_ACHIEVEMENT.storyFull.split('\n\n').map(paragraph => `
              <p class="story-expand-p">${paragraph}</p>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- FOUR STATS BLOCKS -->
    <div class="converge-stats-grid">
      ${ACHIEVEMENT_STATS.map(st => `
        <div class="converge-stat-card">
          <div class="converge-stat-val gradient-text">${st.value}</div>
          <div class="converge-stat-lbl">${st.label}</div>
        </div>
      `).join('')}
    </div>

    <!-- SECONDARY ACHIEVEMENTS GRID -->
    <div class="secondary-achievements-grid">
      ${SECONDARY_ACHIEVEMENTS.map(sec => `
        <div class="glass-card">
          <div class="mono-text cyan-text" style="margin-bottom: 0.5rem;">${sec.issuer}</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.4rem;">${sec.title}</h3>
          <div style="font-size: 0.9rem; color: var(--secondary-violet); margin-bottom: 1rem; font-family: var(--font-mono);">${sec.subtitle}</div>
          <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">${sec.description}</p>
          <div class="identity-tags">
            ${sec.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- MEDIA RECOGNITION CARD (NEWSPAPER CLIPPING) -->
    <div class="media-recognition-card">
      <div>
        <div class="mono-text" style="color: var(--secondary-violet); margin-bottom: 0.5rem; font-weight: 700;">${MEDIA_RECOGNITION.title}</div>
        <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">${MEDIA_RECOGNITION.newspaper}</h3>
        <div class="mono-text" style="color: #64748b; margin-bottom: 1.25rem;">CAPTION: ${MEDIA_RECOGNITION.caption} · ${MEDIA_RECOGNITION.page}</div>
        <p style="font-size: 1.05rem; line-height: 1.7; color: #475569; margin-bottom: 1.5rem;">
          “${MEDIA_RECOGNITION.description}”
        </p>
        <button class="btn btn-primary btn-sm lightbox-trigger" data-img="${MEDIA_RECOGNITION.image}" data-caption="${MEDIA_RECOGNITION.newspaper} (${MEDIA_RECOGNITION.caption})">
          VIEW FULL NEWSPAPER CLIPPING
        </button>
      </div>
      <div class="media-img-wrapper lightbox-trigger" data-img="${MEDIA_RECOGNITION.image}" data-caption="${MEDIA_RECOGNITION.newspaper} (${MEDIA_RECOGNITION.caption})">
        <img src="${MEDIA_RECOGNITION.image}" alt="Mangalam Kozhikode Newspaper Clipping" class="media-img" />
        <div class="img-lightbox-hint" style="background: rgba(0, 0, 0, 0.75);">
          <span>CLICK TO ENLARGE</span>
        </div>
      </div>
    </div>

    <!-- ACHIEVEMENT TIMELINE -->
    <div class="achievement-timeline-section">
      <div class="section-eyebrow">EVOLUTION</div>
      <h3 style="font-size: 2rem; text-transform: uppercase; margin-bottom: 1rem;">FROM LEARNING <span class="gradient-text">TO RECOGNITION.</span></h3>
      <div class="glass-card achievement-timeline-horizontal">
        ${ACHIEVEMENT_FLOW_TIMELINE.map((step, idx) => `
          <div class="achievement-timeline-step">
            <div class="mono-text cyan-text" style="margin-bottom: 0.4rem;">${step.step} · ${step.badge}</div>
            <div style="font-size: 1.05rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.25rem;">${step.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">${step.category}</div>
          </div>
          ${idx < ACHIEVEMENT_FLOW_TIMELINE.length - 1 ? `<div class="achievement-timeline-arrow">→</div>` : ''}
        `).join('')}
      </div>
    </div>

    <!-- PERSONAL BRAND CONNECTION -->
    <div class="glass-card" style="text-align: center; padding: 3rem 2rem; background: linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.08)); border-color: rgba(0, 240, 255, 0.3);">
      <blockquote style="font-size: 1.4rem; font-family: var(--font-heading); font-weight: 700; color: #fff; margin-bottom: 1.25rem;">
        “I'm not just learning technology. I'm learning how to turn ideas into impact.”
      </blockquote>
      <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap;" class="mono-text cyan-text">
        <span>AI</span>
        <span>+</span>
        <span>SOFTWARE</span>
        <span>+</span>
        <span>INNOVATION</span>
        <span>+</span>
        <span>ENTREPRENEURSHIP</span>
      </div>
    </div>
  `;

  // Accordion toggle handler
  const storyBtn = document.getElementById('toggle-story-btn');
  const storyBody = document.getElementById('story-expand-body');
  const storyChevron = document.getElementById('story-chevron');

  if (storyBtn && storyBody) {
    storyBtn.addEventListener('click', () => {
      const isExpanded = storyBody.classList.contains('expanded');
      if (isExpanded) {
        storyBody.classList.remove('expanded');
        if (storyChevron) storyChevron.style.transform = 'rotate(0deg)';
      } else {
        storyBody.classList.add('expanded');
        if (storyChevron) storyChevron.style.transform = 'rotate(180deg)';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   07. PROJECTS SECTION
   -------------------------------------------------------------------------- */
function renderProjects() {
  const projectsContainer = document.getElementById('projects-content');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = `
    <div class="section-eyebrow">03 — PROJECTS</div>
    <h2 class="section-title">THINGS I'VE <span class="gradient-text">BUILT.</span></h2>

    <div class="glass-card featured-project-card">
      <div class="project-img-holder">
        <img src="${FEATURED_PROJECT.image}" alt="${FEATURED_PROJECT.name}" class="project-img" />
      </div>
      <div>
        <div class="mono-text cyan-text" style="margin-bottom: 0.5rem;">${FEATURED_PROJECT.number} · FEATURED</div>
        <h3 style="font-size: 2.15rem; margin-bottom: 0.5rem;">${FEATURED_PROJECT.name}</h3>
        <div style="font-size: 0.95rem; color: var(--secondary-violet); margin-bottom: 1.25rem;">${FEATURED_PROJECT.category}</div>
        <p style="font-size: 1.05rem; line-height: 1.75; margin-bottom: 1.5rem; color: var(--text-muted);">${FEATURED_PROJECT.description}</p>
        <div class="identity-tags" style="margin-bottom: 2rem;">
          ${FEATURED_PROJECT.technologies.map(tech => `<span class="tag-pill">${tech}</span>`).join('')}
        </div>
        <div class="project-card-actions">
          <a href="#achievement" class="btn btn-primary btn-sm">VIEW PROJECT</a>
          <a href="${FEATURED_PROJECT.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">GITHUB</a>
        </div>
      </div>
    </div>

    <div class="projects-grid">
      ${EXTRA_PROJECTS.map(proj => `
        <div class="glass-card extra-project-card">
          <div>
            <div class="project-card-num">${proj.number}</div>
            <h3 class="project-card-title">${proj.name}</h3>
            <div class="project-card-cat">${proj.category}</div>
            <p class="project-card-desc">${proj.description}</p>
            <div class="identity-tags" style="margin-bottom: 1.5rem;">
              ${proj.technologies.map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
          </div>
          <div class="project-card-actions">
            <button class="btn btn-secondary open-project-modal-btn" data-id="${proj.id}">VIEW DETAILS</button>
            <a href="${proj.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-icon" aria-label="GitHub Code">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   08. ENTREPRENEURSHIP SECTION
   -------------------------------------------------------------------------- */
function renderEntrepreneurship() {
  const container = document.getElementById('entrepreneurship-content');
  if (!container) return;

  container.innerHTML = `
    <div class="section-eyebrow">04 — ENTREPRENEURSHIP</div>
    <h2 class="section-title">BUILDING <span class="gradient-text">BEYOND CODE.</span></h2>
    <div class="entrepreneurship-intro">
      <blockquote style="font-size: 1.45rem; font-family: var(--font-heading); color: var(--primary-cyan); margin-bottom: 0.85rem; text-transform: uppercase;">
        “Technology is what I learn. Building is what I do.”
      </blockquote>
      <p style="font-size: 1.15rem; max-width: 780px; margin: 0 auto; color: var(--text-muted); line-height: 1.75;">
        Beyond academics and software development, I am actively involved in building businesses and exploring opportunities across technology, products and international trade.
      </p>
    </div>

    <div class="businesses-grid">
      ${BUSINESSES.map(biz => `
        <div class="glass-card brand-card">
          <div class="brand-card-header">
            <img src="${biz.image}" alt="${biz.name}" class="brand-avatar" />
            <div>
              <div class="brand-role-badge">${biz.role}</div>
              <h3 class="brand-name">${biz.name}</h3>
              <div class="brand-category">${biz.category}</div>
            </div>
          </div>
          <p class="brand-desc">${biz.shortDesc || biz.description}</p>
          <div class="identity-tags" style="margin-top: auto; padding-top: 0.75rem;">
            ${biz.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
          <button class="btn btn-secondary open-biz-modal-btn" data-id="${biz.id}" style="margin-top: 1rem; width: 100%;">
            EXPLORE VENTURE
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   09. EXPERIENCE SECTION
   -------------------------------------------------------------------------- */
function renderExperience() {
  const container = document.getElementById('experience-content');
  if (!container) return;

  container.innerHTML = `
    <div class="section-eyebrow">05 — EXPERIENCE</div>
    <h2 class="section-title">LEARNING BY <span class="gradient-text">BUILDING.</span></h2>

    <div class="glass-card experience-card">
      <div>
        <h3 class="experience-company-title">${EXPERIENCE.company}</h3>
        <div class="experience-role-title">${EXPERIENCE.position}</div>
        <div class="experience-duration-pill" style="margin-bottom: 1.5rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${EXPERIENCE.duration} (${EXPERIENCE.length})
        </div>
        <div class="mono-text" style="color: var(--text-dim); margin-bottom: 1.5rem;">LOCATION: ${EXPERIENCE.location}</div>
        <div class="identity-tags">
          ${EXPERIENCE.skillsHighlighted.map(sk => `<span class="tag-pill" style="border-color: var(--primary-cyan); color: var(--primary-cyan);">${sk}</span>`).join('')}
        </div>
      </div>

      <div>
        ${EXPERIENCE.paragraphs.map(p => `<p class="about-story-p">${p}</p>`).join('')}
        <div class="mentorship-quote-box">
          <div class="mono-text violet-text" style="margin-bottom: 0.5rem;">MENTORSHIP & GUIDANCE</div>
          <p class="mentorship-quote-text">“${EXPERIENCE.mentorship}”</p>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   10. EDUCATION & SKILLS
   -------------------------------------------------------------------------- */
function renderEducationAndSkills() {
  const container = document.getElementById('edu-skills-content');
  if (!container) return;

  container.innerHTML = `
    <div class="edu-skills-grid">
      <div>
        <div class="section-eyebrow">06 — EDUCATION</div>
        <h2 class="section-title">THE <span class="gradient-text">FOUNDATION.</span></h2>
        ${EDUCATION.map(edu => `
          <div class="glass-card edu-item">
            <div class="mono-text cyan-text" style="margin-bottom: 0.5rem;">${edu.badge}</div>
            <h3 class="edu-degree">${edu.degree}</h3>
            <div class="edu-field">${edu.field}</div>
            <div class="edu-inst">${edu.institution}</div>
          </div>
        `).join('')}
      </div>

      <div>
        <div class="section-eyebrow">07 — SKILLS</div>
        <h2 class="section-title">MY <span class="gradient-text">TOOLKIT.</span></h2>
        
        <div class="skills-category-block">
          <div class="skills-cat-title">PROGRAMMING</div>
          <div class="skills-chips-wrapper">
            ${SKILLS.programming.map(s => `<span class="skill-chip">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skills-category-block">
          <div class="skills-cat-title">DEVELOPMENT</div>
          <div class="skills-chips-wrapper">
            ${SKILLS.development.map(s => `<span class="skill-chip">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skills-category-block">
          <div class="skills-cat-title">DATA & AI</div>
          <div class="skills-chips-wrapper">
            ${SKILLS.dataAi.map(s => `<span class="skill-chip" style="border-color: var(--primary-cyan); color: var(--primary-cyan);">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skills-category-block">
          <div class="skills-cat-title">DATABASE & HARDWARE</div>
          <div class="skills-chips-wrapper">
            ${SKILLS.database.map(s => `<span class="skill-chip">${s}</span>`).join('')}
            ${SKILLS.hardware.map(s => `<span class="skill-chip">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skills-category-block">
          <div class="skills-cat-title">PROFESSIONAL & BUSINESS</div>
          <div class="skills-chips-wrapper">
            ${SKILLS.professional.map(s => `<span class="skill-chip" style="border-color: var(--secondary-violet); color: var(--secondary-violet);">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   11. BUSINESS + TECH CONNECTION MAP
   -------------------------------------------------------------------------- */
function renderBusinessTechFlow() {
  const container = document.getElementById('flow-content');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 2.5rem;">
      <div class="section-eyebrow">SYNERGY</div>
      <h2 class="section-title">WHERE TECHNOLOGY <span class="gradient-text">MEETS BUSINESS.</span></h2>
      <p style="max-width: 680px; margin: 0 auto; color: var(--text-muted); font-size: 1.15rem; line-height: 1.7;">
        “My interests extend beyond writing code. I enjoy exploring how technology can become useful products, practical solutions and business opportunities.”
      </p>
    </div>

    <div class="glass-card flow-pipeline-wrapper">
      ${BUSINESS_TECH_FLOW.map((step, idx) => `
        <div class="flow-step-card">
          <div class="flow-step-num">${step.step}</div>
          <div class="flow-step-name">${step.name}</div>
        </div>
        ${idx < BUSINESS_TECH_FLOW.length - 1 ? `<div class="flow-arrow">→</div>` : ''}
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   12. CURRENTLY EXPLORING MARQUEE
   -------------------------------------------------------------------------- */
function renderMarquee() {
  const container = document.getElementById('exploring-content');
  if (!container) return;

  const doubleExploring = [...CURRENTLY_EXPLORING, ...CURRENTLY_EXPLORING];

  container.innerHTML = `
    <div style="padding: 0 1.5rem 1.25rem 1.5rem;">
      <div class="section-eyebrow">09 — CURRENTLY EXPLORING</div>
    </div>
    <div class="marquee-container">
      <div class="marquee-track">
        ${doubleExploring.map(item => `
          <div class="marquee-item">
            <span>⚡</span>
            <span>${item}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   13. CINEMATIC PHILOSOPHY
   -------------------------------------------------------------------------- */
function renderPhilosophy() {
  const container = document.getElementById('philosophy-content');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <div class="cinematic-giant-text gradient-text">
        SKILLS<br>CREATE<br>OPPORTUNITIES.
      </div>
      <p class="cinematic-sub">
        “I believe consistency, curiosity and practical skills matter more than labels.”
      </p>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   14. CONTACT SECTION
   -------------------------------------------------------------------------- */
function renderContact() {
  const container = document.getElementById('contact-content');
  if (!container) return;

  container.innerHTML = `
    <div class="section-eyebrow">10 — CONTACT</div>
    <h2 class="section-title">LET'S BUILD <span class="gradient-text">SOMETHING.</span></h2>
    
    <div class="contact-grid">
      <div>
        <p style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 2.5rem; line-height: 1.65;">
          Have an idea, opportunity, project or collaboration in mind? Let's turn it into reality.
        </p>

        <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem;">
          <a href="${SOCIALS.linkedin}" target="_blank" rel="noopener" class="btn btn-secondary" style="justify-content: flex-start;">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            <span>LINKEDIN PROFILE</span>
          </a>
          <a href="${SOCIALS.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="justify-content: flex-start;">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span>GITHUB REPOSITORIES</span>
          </a>
          <a href="${SOCIALS.email}" class="btn btn-secondary" style="justify-content: flex-start;">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
            <span>SEND AN EMAIL</span>
          </a>
        </div>
      </div>

      <div class="glass-card">
        <form class="contact-form" id="contact-form">
          <div class="form-group">
            <label class="form-label" for="contact-name">YOUR NAME</label>
            <input type="text" id="contact-name" class="form-input" placeholder="e.g. Alex Morgan" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-email">YOUR EMAIL</label>
            <input type="email" id="contact-email" class="form-input" placeholder="alex@company.com" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-message">YOUR MESSAGE</label>
            <textarea id="contact-message" class="form-textarea" placeholder="Tell me about your idea, opportunity, or collaboration..." required></textarea>
          </div>

          <button type="submit" class="btn btn-primary">
            <span>SEND MESSAGE</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
          
          <div class="toast-msg success" id="toast-msg">
            Message received! Thank you for reaching out. Let's turn ideas into reality.
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (toast) {
        toast.classList.add('success');
        triggerConfetti();
        form.reset();
        setTimeout(() => {
          toast.classList.remove('success');
        }, 5000);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   15. FOOTER SECTION
   -------------------------------------------------------------------------- */
function renderFooter() {
  const footerContainer = document.getElementById('footer-content');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <div class="footer-content">
      <div>
        <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">
          MUHAMMED ANSAB THALAPPIL
        </div>
        <div style="color: var(--primary-cyan); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.85rem;">
          AI & DATA SCIENCE STUDENT · DEVELOPER · ENTREPRENEUR
        </div>
        <div style="font-style: italic; color: var(--text-muted);">
          “${PROFILE.brandLine}”
        </div>
      </div>

      <div style="display: flex; gap: 1.75rem;">
        <a href="${SOCIALS.linkedin}" target="_blank" rel="noopener" class="nav-link">LinkedIn</a>
        <a href="${SOCIALS.github}" target="_blank" rel="noopener" class="nav-link">GitHub</a>
        <a href="${SOCIALS.email}" class="nav-link">Email</a>
      </div>
    </div>

    <div class="footer-bottom">
      © ${new Date().getFullYear()} Muhammed Ansab Thalappil. All rights reserved.
    </div>
  `;
}

/* --------------------------------------------------------------------------
   16. MODALS LOGIC FOR PROJECTS & BUSINESSES
   -------------------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  if (!modalOverlay || !modalBody) return;

  document.body.addEventListener('click', (e) => {
    const projBtn = e.target.closest('.open-project-modal-btn');
    if (projBtn) {
      const projId = projBtn.getAttribute('data-id');
      const proj = EXTRA_PROJECTS.find(p => p.id === projId);
      if (proj) {
        modalBody.innerHTML = `
          <div class="mono-text cyan-text" style="margin-bottom: 0.5rem;">${proj.number} · DETAILS</div>
          <h3 style="font-size: 1.85rem; margin-bottom: 0.5rem;">${proj.name}</h3>
          <div style="color: var(--secondary-violet); font-size: 0.95rem; margin-bottom: 1.25rem;">${proj.category}</div>
          <p style="font-size: 1.05rem; line-height: 1.75; color: var(--text-muted); margin-bottom: 1.75rem;">${proj.description}</p>
          <div class="identity-tags" style="margin-bottom: 2rem;">
            ${proj.technologies.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener" class="btn btn-primary">VIEW REPOSITORY</a>
        `;
        modalOverlay.classList.add('open');
      }
    }

    const bizBtn = e.target.closest('.open-biz-modal-btn');
    if (bizBtn) {
      const bizId = bizBtn.getAttribute('data-id');
      const biz = BUSINESSES.find(b => b.id === bizId);
      if (biz) {
        modalBody.innerHTML = `
          <div class="mono-text cyan-text" style="margin-bottom: 0.5rem;">${biz.number} · ${biz.role}</div>
          <h3 style="font-size: 1.85rem; margin-bottom: 0.5rem;">${biz.name}</h3>
          <div style="color: var(--secondary-violet); font-size: 0.95rem; margin-bottom: 1.25rem;">${biz.category}</div>
          <p style="font-size: 1.05rem; line-height: 1.75; color: var(--text-muted); margin-bottom: 1.75rem;">${biz.description}</p>
          <div class="identity-tags" style="margin-bottom: 2rem;">
            ${biz.tags.map(t => `<span class="tag-pill" style="border-color: var(--primary-cyan); color: var(--primary-cyan);">${t}</span>`).join('')}
          </div>
          ${biz.website ? `<a href="${biz.website}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-right: 0.75rem;">OFFICIAL WEBSITE</a>` : ''}
          <button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').classList.remove('open')">CLOSE</button>
        `;
        modalOverlay.classList.add('open');
      }
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
  }
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('open');
  });
}

/* --------------------------------------------------------------------------
   17. LIGHTBOX VIEWER FOR REAL PHOTOGRAPHS
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightboxOverlay || !lightboxImg) return;

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) {
      const imgSrc = trigger.getAttribute('data-img');
      const caption = trigger.getAttribute('data-caption') || '';
      if (imgSrc) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxOverlay.classList.add('open');
      }
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightboxOverlay.classList.remove('open'));
  }
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) lightboxOverlay.classList.remove('open');
  });
}

/* --------------------------------------------------------------------------
   18. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.glass-card, .converge-hero-card, .media-recognition-card, .section-title, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   19. CONFETTI EFFECT
   -------------------------------------------------------------------------- */
function triggerConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}
