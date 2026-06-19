import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // Nav condense (not "motion", always on)
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Close the mobile menu after a link is tapped
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.querySelectorAll('.nav-sheet a').forEach((a) =>
      a.addEventListener('click', () => navMenu.removeAttribute('open'))
    );
  }

  if (reduce) {
    document.querySelectorAll('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
    document.querySelectorAll('.reveal-lines .line > span').forEach((el) => (el.style.transform = 'none'));
    document.querySelectorAll('[data-living]').forEach((v) => {
      v.removeAttribute('autoplay');
      try { v.pause(); } catch (e) {}
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Hero load: headline mask-reveals, then the terracotta rule draws itself. */
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const lines = hero.querySelectorAll('.reveal-lines .line > span');
    const rule = hero.querySelector('[data-hero-rule]');
    if (rule) gsap.set(rule, { scaleX: 0, opacity: 1, transformOrigin: 'left center' });
    const logoPaths = hero.querySelectorAll('[data-hero-logo] svg path');

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
    tl.fromTo(hero.querySelector('[data-hero-kicker]'), { y: 14 }, { y: 0, opacity: 1, duration: 0.7 })
      .to(lines, { y: '0%', duration: 1.05, stagger: 0.1 }, '-=0.4')
      .to(rule, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.55')
      .fromTo(hero.querySelector('[data-hero-sub]'), { y: 18 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
      .fromTo(hero.querySelectorAll('[data-hero-cta] > *'), { y: 16 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.55');

    // The logo mark draws itself in like a wireframe, then inks to full color.
    if (logoPaths.length) {
      logoPaths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 0;
        p.style.stroke = p.getAttribute('fill');
        p.style.strokeWidth = '1.6';
        p.style.fillOpacity = '0';
        if (len) { p.style.strokeDasharray = len; p.style.strokeDashoffset = len; }
      });
      tl.to(logoPaths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.14, ease: 'power2.inOut' }, 0.4)
        .to(logoPaths, { fillOpacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.45')
        .to(logoPaths, { strokeWidth: 0, duration: 0.5, stagger: 0.05, ease: 'power1.out' }, '-=0.35');
    }
  }

  /* Scroll reveals via IntersectionObserver. Robust against anchor jumps and
     reload-at-anchor: any [data-reveal] already in view (or scrolled into view)
     reveals reliably, so content never stays hidden. */
  const reveals = document.querySelectorAll('[data-reveal]');
  gsap.set(reveals, { y: 24 });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));

  /* Magnetic primary CTAs (pointer-fine only). Eased, never snaps. */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const strength = 0.3;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
    });

    // Logo mark tilts gently toward the cursor (faux-3D, eased).
    const heroEl = document.querySelector('[data-hero]');
    const tilt = heroEl && heroEl.querySelector('[data-hero-logo] .hero-logo-tilt');
    if (heroEl && tilt) {
      const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.6, ease: 'power3' });
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.6, ease: 'power3' });
      heroEl.addEventListener('pointermove', (e) => {
        const r = heroEl.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
      });
      heroEl.addEventListener('pointerleave', () => { ry(0); rx(0); });
    }
  }

  ScrollTrigger.refresh();
});
