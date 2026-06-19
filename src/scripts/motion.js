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

  /* Hero load. A brand intro plays first: the logo assembles in open space
     (icon draws in, the name swoops in from the right), then the whole lockup
     flies up and shrinks to become the nav logo while the hero content takes
     its place. If the intro can't run, the content just reveals in place. */
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const lines = hero.querySelectorAll('.reveal-lines .line > span');
    const rule = hero.querySelector('[data-hero-rule]');
    if (rule) gsap.set(rule, { scaleX: 0, opacity: 1, transformOrigin: 'left center' });

    // Reveal of the hero copy. Returned so it can run after the logo lands,
    // or be played immediately as the fallback.
    const revealContent = () =>
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(hero.querySelector('[data-hero-kicker]'), { y: 14 }, { y: 0, opacity: 1, duration: 0.7 })
        .to(lines, { y: '0%', duration: 1.05, stagger: 0.1 }, '-=0.4')
        .to(rule, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.55')
        .fromTo(hero.querySelector('[data-hero-sub]'), { y: 18 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
        .fromTo(hero.querySelectorAll('[data-hero-cta] > *'), { y: 16 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.55');

    const intro = document.querySelector('[data-brand-intro]');
    const lockup = intro && intro.querySelector('[data-intro-lockup]');
    const navBrand = document.querySelector('.nav-brand');
    const canIntro =
      intro && lockup && navBrand &&
      document.documentElement.classList.contains('anim-ready') &&
      window.scrollY < 4;

    if (canIntro) {
      const iconPaths = intro.querySelectorAll('[data-intro-icon] svg path');
      const word = intro.querySelector('[data-intro-word]');

      // Measure source (lockup at its large native size) and target (nav logo).
      // The lockup is built large so the on-screen entrance is crisp; the flight
      // scales it DOWN onto the nav, which keeps it sharp the whole way.
      gsap.set(lockup, { scale: 1, x: 0, y: 0 });
      const L = lockup.getBoundingClientRect();
      const N = navBrand.getBoundingClientRect();
      const landScale = N.width / L.width;
      const dx = (N.left + N.width / 2) - (L.left + L.width / 2);
      const dy = (N.top + N.height / 2) - (L.top + L.height / 2);

      // Entrance state: centered at native size, icon as a wireframe, name held right.
      gsap.set(word, { opacity: 0, x: 90 });
      iconPaths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 0;
        p.style.stroke = p.getAttribute('fill');
        p.style.strokeWidth = '1.3';
        p.style.fillOpacity = '0';
        if (len) { p.style.strokeDasharray = len; p.style.strokeDashoffset = len; }
      });

      gsap
        .timeline({ delay: 0.15 })
        // 1. Icon draws itself in, then inks to full color.
        .to(iconPaths, { strokeDashoffset: 0, duration: 1, stagger: 0.12, ease: 'power2.inOut' })
        .to(iconPaths, { fillOpacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
        .to(iconPaths, { strokeWidth: 0, duration: 0.4, stagger: 0.04, ease: 'power1.out' }, '-=0.3')
        // 2. The name swoops in from the right.
        .to(word, { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out' }, '-=0.15')
        // 3. Beat, then the lockup flies up and shrinks onto the nav logo.
        .to({}, { duration: 0.35 })
        .to(lockup, { x: dx, y: dy, scale: landScale, duration: 1, ease: 'power3.inOut' })
        // 4. Hand off to the real nav logo, dissolve the intro, reveal the page.
        .add(() => gsap.set(navBrand, { opacity: 1 }))
        .to(intro, { autoAlpha: 0, duration: 0.25, ease: 'power1.out' }, '-=0.02')
        .add(() => { intro.style.display = 'none'; })
        .add(revealContent(), '-=0.05');
    } else {
      if (navBrand) gsap.set(navBrand, { opacity: 1 });
      if (intro) intro.style.display = 'none';
      revealContent();
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
  }

  ScrollTrigger.refresh();
});
