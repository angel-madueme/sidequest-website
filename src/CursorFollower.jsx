import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import './CursorFollower.css';

export default function CursorFollower() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 550, damping: 40 });
  const smoothY = useSpring(y, { stiffness: 550, damping: 40 });
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('rest');
  const [pressed, setPressed] = useState(false);
  const [host, setHost] = useState(null);
  const [color, setColor] = useState('lemon');

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const palette = getComputedStyle(document.documentElement);
    function matchingSurface(element, accent) {
      const hex = palette.getPropertyValue(`--${accent}`).trim().replace('#', '');
      const rgb = [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16));
      // Transparent text/icon wrappers inherit the visible card surface beneath.
      for (let node = element; node && node !== document.documentElement; node = node.parentElement) {
        const background = getComputedStyle(node).backgroundColor;
        const channels = background.match(/[\d.]+/g)?.map(Number);
        if (!channels || (channels.length > 3 && channels[3] < .8)) continue;
        return Math.hypot(...rgb.map((channel, index) => channel - channels[index])) < 65;
      }
      return false;
    }
    function move(event) {
      if (!media.matches || event.pointerType !== 'mouse') { setVisible(false); return; }
      x.set(event.clientX); y.set(event.clientY);
      const accent = event.target.closest('.weekend-section') ? 'lemon' : event.target.closest('.experiences-section') ? 'orange' : event.target.closest('#how-it-works') ? 'lilac' : event.target.closest('.mood-section') ? 'blue' : event.target.closest('.sidequest-footer') ? 'mint' : 'pink';
      setColor(matchingSurface(event.target, accent) ? 'soft-white' : accent);
      setVisible(!event.target.closest('.desktop-nav a, .desktop-nav button, .footer-links a, .mobile-menu a, .mobile-menu button, .footer-bottom a'));
      // A modal is in the browser's top layer; render its follower there too.
      setHost(event.target.closest('dialog[open]') || document.body);
      const target = event.target.closest('button, a, [role="button"], .how-step-card, .activity-stamp');
      setMode(!target || target.matches(':disabled, [aria-disabled="true"]') ? 'rest' : target.matches('.activity-handle, .activity-stamp') ? 'drag' : 'hover');
    }
    const hide = () => { setVisible(false); setPressed(false); };
    const leave = event => { if (!event.relatedTarget) hide(); };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerout', leave);
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    window.addEventListener('blur', hide);
    media.addEventListener('change', hide);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      media.removeEventListener('change', hide);
    };
  }, [x, y]);

  if (!host) return null;
  return createPortal(<motion.div className="cursor-follower" aria-hidden="true" style={{ '--cursor-color': `var(--${color})`, left: reduced ? x : smoothX, top: reduced ? y : smoothY }}>
    <motion.div className={`cursor-follower-dot cursor-${mode}`} animate={{ opacity: visible ? 1 : 0, width: mode === 'rest' ? 10 : 34, height: mode === 'rest' ? 10 : 34, scale: pressed ? .85 : 1 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 450, damping: 30 }}>
      {mode !== 'rest' && <svg viewBox="0 0 100 100"><path d={Array.from({ length: 240 }, (_, i) => {
        const angle = i / 240 * Math.PI * 2;
        const radius = 36 + 8 * Math.cos(angle * 12);
        return `${i ? 'L' : 'M'}${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
      }).join(' ') + 'Z'} fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" /></svg>}
    </motion.div>
  </motion.div>, host);
}
