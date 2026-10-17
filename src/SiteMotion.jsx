import { useLayoutEffect } from 'react';

// Additive transforms leave Framer's hover, parallax, and drag transforms intact.
// Prepare paused entrances before paint so visible content never flashes then hides.
// Cancellation restores the original styles, including when reduced motion is enabled.
export default function SiteMotion() {
  useLayoutEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const running = new Map();
    const seen = new WeakSet();
    function setup() {
      observer?.disconnect();
      running.forEach(animation => animation.cancel());
      running.clear();
      if (preference.matches) return;
      const mobile = matchMedia('(max-width: 750px)').matches;
      const travel = mobile ? 7 : 16;
      const entries = new Map();
      function group(selector, kind, delay = 0, stagger = 0) {
        document.querySelectorAll(selector).forEach((element, index) => {
          entries.set(element, { kind, delay: delay + index * stagger });
        });
      }
      group('.navbar', 'nav');
      group('.hero-copy h1 > .motion-line', 'mask', 90, 85);
      group('.hero-description > p', 'rise', 300);
      group('.hero-cta', 'settle', 390);
      group('.collage .event-card', 'deal', 460, 70);
      group('.collage-decorations, .collage-smile', 'pop', 720, 65);
      group('.marquee', 'fade');
      group('.mood-heading .eyebrow, .how-heading .eyebrow, .weekend-heading .eyebrow', 'fade');
      for (const parent of ['.mood-heading', '.how-heading', '.experiences-heading', '.weekend-heading']) {
        group(`${parent} .motion-line`, 'mask', 70, 80);
        group(`${parent} p`, 'rise', 180);
      }
      group('.mood-pill', 'pill', 180, 65);
      group('.vibe-panel-wrap', 'rise', 120);
      group('.how-step-position', 'fan', 180, 90);
      group('.experience-card', 'rise', 80, 65);
      group('.activity-paper', 'pop', 80, 60);
      group('.footer-top', 'rise');
      group('.footer-letter-glyph', 'settle', 80, 60);
      group('.footer-top-doodles', 'pop', 360);
      function prepare(element, { kind, delay }) {
        if (seen.has(element)) return;
        let transform = `translateY(${travel}px)`;
        if (kind === 'nav') transform = 'translateY(-8px)';
        if (kind === 'pill') transform = `translateX(${mobile ? -5 : -10}px)`;
        if (kind === 'pop') transform = 'scale(.97)';
        if (kind === 'deal') transform = `translateY(${travel}px) rotate(2deg)`;
        if (kind === 'fan') transform = `translateY(${travel}px) rotate(${parseFloat(element.style.getPropertyValue('--step-rotation')) * -.2}deg)`;
        if (kind === 'fade') transform = 'none';
        const frames = [{ transform }, { transform: 'none' }];
        if (kind === 'mask') {
          frames[0].clipPath = 'inset(0 -15% 100% -15%)';
          frames[1].clipPath = 'inset(0 -15% -40% -15%)';
        }
        const animation = element.animate(frames, {
          duration: mobile ? 440 : kind === 'deal' || kind === 'fan' ? 650 : 520,
          delay: mobile ? delay * .6 : delay,
          easing: kind === 'deal' || kind === 'fan' || kind === 'settle' ? 'cubic-bezier(.2,.85,.3,1.08)' : 'cubic-bezier(.2,.7,.2,1)',
          composite: 'add', fill: 'backwards',
        });
        // Opacity must replace rather than add to the element's existing opacity.
        const fade = element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: mobile ? 300 : 420, delay: mobile ? delay * .6 : delay, fill: 'backwards' });
        animation.pause();
        fade.pause();
        animation.currentTime = 0;
        fade.currentTime = 0;
        running.set(element, {
          play: () => { animation.play(); fade.play(); },
          cancel: () => { animation.cancel(); fade.cancel(); },
        });
        animation.onfinish = () => running.delete(element);
      }
      // Observe the unmasked heading, not its clipped lines: a fully clipped
      // line has no intersection area and cannot trigger its own reveal.
      const targets = new Map();
      observer = new IntersectionObserver(items => {
        items.forEach(item => {
          if (item.isIntersecting) {
            targets.get(item.target)?.forEach(element => {
              if (seen.has(element)) return;
              seen.add(element);
              running.get(element)?.play();
            });
            observer.unobserve(item.target);
          }
        });
      }, { threshold: .2 });
      entries.forEach((options, element) => {
        if (seen.has(element)) return;
        prepare(element, options);
        const target = options.kind === 'mask' ? element.closest('h1, h2') : element;
        if (!targets.has(target)) targets.set(target, []);
        targets.get(target).push(element);
      });
      targets.forEach((_, target) => observer.observe(target));
    }
    // Keyboard focus must never wait for a delayed entrance.
    const focus = event => running.forEach((animation, element) => {
      if (element.contains(event.target)) {
        seen.add(element);
        observer?.unobserve(element);
        animation.cancel();
        running.delete(element);
      }
    });
    setup();
    preference.addEventListener('change', setup);
    document.addEventListener('focusin', focus);
    return () => { observer?.disconnect(); running.forEach(animation => animation.cancel()); preference.removeEventListener('change', setup); document.removeEventListener('focusin', focus); };
  }, []);
  return null;
}
