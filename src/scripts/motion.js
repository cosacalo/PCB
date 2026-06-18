import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // Nav condense (always, it is not "motion")
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (reduce) {
    // Reveal everything, no animation. Pause the living portrait.
    document.querySelectorAll('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
    document.querySelectorAll('.reveal-lines .line > span').forEach((el) => (el.style.transform = 'none'));
    document.querySelectorAll('[data-living]').forEach((v) => {
      v.removeAttribute('autoplay');
      try { v.pause(); } catch (e) {}
    });
    runCounts(true);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------
     Hero load — one orchestrated cinematic beat
  --------------------------------------------------------------- */
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const lines = hero.querySelectorAll('.reveal-lines .line > span');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.12 });

    tl.fromTo(hero.querySelector('[data-hero-eyebrow]'), { y: 16 }, { y: 0, opacity: 1, duration: 0.7 })
      .to(lines, { y: '0%', duration: 1.05, stagger: 0.09 }, '-=0.45')
      .fromTo(hero.querySelector('[data-hero-sub]'), { y: 18 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo(hero.querySelectorAll('[data-hero-cta] > *'), { y: 16 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.5')
      .fromTo(hero.querySelector('[data-hero-note]'), { y: 12 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo(
        hero.querySelector('[data-hero-figure]'),
        { y: 44, scale: 0.97 },
        { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=1.2'
      )
      .fromTo(hero.querySelector('[data-hero-cred]'), { y: 14 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');

    // Subtle parallax drift on the portrait as you scroll past the hero
    const fig = hero.querySelector('[data-hero-figure]');
    if (fig) {
      gsap.to(fig, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }
  }

  /* ---------------------------------------------------------------
     Scroll reveals — batched, directional, staggered
  --------------------------------------------------------------- */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    onEnter: (els) =>
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      }),
  });
  gsap.set('[data-reveal]', { y: 26 });

  /* ---------------------------------------------------------------
     Count-up for any [data-count]
  --------------------------------------------------------------- */
  runCounts(false);

  /* ---------------------------------------------------------------
     Magnetic buttons (pointer-fine devices only)
  --------------------------------------------------------------- */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const strength = 0.35;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
      });
    });
  }

  /* ---------------------------------------------------------------
     SVG line-draw accents
  --------------------------------------------------------------- */
  document.querySelectorAll('[data-draw] path').forEach((path) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: path, start: 'top 85%' },
    });
  });

  ScrollTrigger.refresh();
});

function runCounts(instant) {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    if (instant) {
      el.textContent = prefix + target;
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = prefix + Math.round(obj.v)),
    });
  });
}
