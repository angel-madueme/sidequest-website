import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { ShapeArtwork } from './GraphicShape.jsx';
import './Footer.css';
import NavLink from './NavLink.jsx';

const letters = [
  { letter: 'S', color: 'pink', shape: 'smiley' },
  { letter: 'i', color: 'blue', shape: 'scribble' },
  { letter: 'd', color: 'orange', shape: 'burst' },
  { letter: 'e', color: 'lilac', shape: 'sparkle' },
  { letter: 'Q', color: 'mint', shape: 'clover' },
  { letter: 'u', color: 'pink', shape: 'heart' },
  { letter: 'e', color: 'blue', shape: 'blob' },
  { letter: 's', color: 'orange', shape: 'asterisk' },
  { letter: 't', color: 'lilac', shape: 'arrow' },
];

function FooterDoodle({ shape }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {shape === 'smiley' ? <><circle cx="50" cy="50" r="44" fill="currentColor" /><path d="M33 33v10m32-10v10M28 59q22 27 44-2" fill="none" stroke="var(--charcoal)" strokeWidth="5" strokeLinecap="round" /></> :
      shape === 'scribble' ? <path d="M8 73C14 5 42 3 33 56S62 104 65 38 94 18 91 56" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" /> :
      shape === 'heart' ? <path d="M50 88C-26 37 14-9 50 25 86-9 126 37 50 88Z" fill="currentColor" /> :
      shape === 'blob' ? <path d="M9 41C-1 8 32-1 49 19S76-6 93 23 79 48 89 69 59 104 42 81 15 92 7 70 18 59 9 41Z" fill="currentColor" /> :
      shape === 'arrow' ? <path d="M9 82Q23 21 78 30L60 10m18 20L60 49" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /> :
      <ShapeArtwork kind={shape} />}
  </svg>;
}

function FooterLetter({ item, index, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const active = hovered || focused || selected;
  return <motion.button type="button" className={`footer-letter ${active ? 'is-active' : ''}`} style={{ '--letter-accent': `var(--${item.color})` }}
    aria-label={`${item.letter}, letter ${index + 1}: ${item.shape}`} aria-pressed={selected}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}
    onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))} onBlur={() => setFocused(false)} onClick={onSelect}
    animate={reduced ? { y: 0, rotate: 0 } : { y: active ? -9 : 0, rotate: active ? [0, -2.5, 2, -1, 0] : 0 }}
    transition={{ y: { type: 'spring', stiffness: 260, damping: 21 }, rotate: { duration: .48, ease: 'easeInOut' } }}>
    <span className="footer-letter-glyph" aria-hidden="true">{item.letter}</span>
    <span className="footer-letter-mark" aria-hidden="true" />
    <motion.span className="footer-letter-doodle" initial={false} animate={{ opacity: active ? 1 : 0, scale: active ? 1 : .7, rotate: active ? (index % 2 ? 12 : -12) : 0 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 20 }}><FooterDoodle shape={item.shape} /></motion.span>
  </motion.button>;
}

export default function Footer() {
  const [selected, setSelected] = useState(null);
  const wordmark = useRef(null);
  useLayoutEffect(() => {
    const element = wordmark.current;
    let disposed = false;
    function fitWordmark() {
      if (disposed) return;
      // Fit natural letter widths, keeping the individual interactive buttons
      // together rather than distributing extra space between them.
      for (let pass = 0; pass < 2; pass += 1) {
        const width = [...element.children].reduce((sum, letter) => sum + letter.offsetWidth, 0);
        if (!width) return;
        const size = parseFloat(getComputedStyle(element).fontSize);
        element.style.setProperty('--footer-wordmark-size', `${size * element.clientWidth * .985 / width}px`);
      }
    }
    let previousWidth = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === previousWidth) return;
      previousWidth = entry.contentRect.width;
      fitWordmark();
    });
    observer.observe(element.parentElement);
    fitWordmark();
    document.fonts.ready.then(fitWordmark);
    return () => { disposed = true; observer.disconnect(); };
  }, []);
  return <footer className="sidequest-footer"><div className="content-width">
    <div className="footer-top"><div className="footer-message"><span className="footer-kicker">GOOD COMPANY. GREAT PLANS.</span><p>See you out there.</p></div>
      <nav className="footer-links" aria-label="Footer navigation"><NavLink href="#moods">Explore <ArrowUpRight size={16} aria-hidden="true" /></NavLink><NavLink href="#experiences">Discover <ArrowUpRight size={16} aria-hidden="true" /></NavLink><NavLink href="#how-it-works">How it works <ArrowUpRight size={16} aria-hidden="true" /></NavLink></nav>
      <div className="footer-top-doodles" aria-hidden="true">
        <span className="footer-top-smiley"><FooterDoodle shape="smiley" /></span>
        <span className="footer-top-sparkle"><FooterDoodle shape="sparkle" /></span>
        <span className="footer-top-scribble"><FooterDoodle shape="scribble" /></span>
      </div>
    </div>
    <div ref={wordmark} className="footer-wordmark" role="group" aria-label="SideQuest interactive wordmark">{letters.map((item, index) => <FooterLetter key={index} item={item} index={index} selected={selected === index} onSelect={() => setSelected(value => value === index ? null : index)} />)}</div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} SideQuest</span><span>A little out of the ordinary.</span><a href="#">Back to top <ArrowUp size={14} aria-hidden="true" /></a></div>
  </div></footer>;
}
