import MoodRecommendation, { recommendations } from './MoodRecommendation.jsx';
import Experiences from './Experiences.jsx';
import WeekendPlayground from './WeekendPlayground.jsx';
import Footer from './Footer.jsx';
import NavLink from './NavLink.jsx';
import GraphicShape from './GraphicShape.jsx';
import HowItWorks from './HowItWorks.jsx';
import React, { useState, useRef } from 'react';

import { motion, MotionConfig, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Menu, X, MapPin, Utensils, Music2, Dices, Palette, Trees, Shuffle, Check } from 'lucide-react';


const events = [
  { id: 'food', title: 'Late Night Food Crawl', label: 'ONE MORE BITE', detail: 'Good food. Better company.', color: 'orange', image: 'photo-1555939594-58d7cb561ad1', alt: 'Freshly grilled food shared at an outdoor restaurant', rotation: -5, depth: 10 },
  { id: 'art', title: 'Paint, Wine & Bad Art', label: 'ZERO TALENT NEEDED', detail: 'Make a little mess.', color: 'lilac', image: 'photo-1460661419201-fd4cecdf8a8b', alt: 'Colorful paints and brushes on an artist’s worktable', rotation: 3, depth: 10 },
  { id: 'beach', title: 'Sunday Beach Hangout', label: 'OUT OF OFFICE', detail: 'Salt air. No agenda.', color: 'blue', image: 'photo-1507525428034-b723cf961d3e', alt: 'Golden sand and turquoise water on a sunny beach', rotation: 5, depth: 8 },
  { id: 'rooftop', title: 'Rooftop Listening Party', label: 'GOOD PEOPLE. GOOD MUSIC.', detail: 'Tonight · 7 PM', color: 'pink', image: 'photo-1516280440614-37939bbacd81', alt: 'A microphone on a warmly lit stage before a music performance', rotation: -5, depth: 6 },
];
const heroEvents = [
  ...events,
  { id: 'games', title: 'Game Night Showdown', label: 'LEVEL UP', detail: 'Good vibes. Tiny competition.', color: 'mint', image: '/game-night.svg', alt: 'A playful board game with colorful playing pieces, cards, and dice on a green tabletop', rotation: 3, depth: 8 },
];
const moods = [
  { name: 'Food', color: 'orange', icon: Utensils, event: 'food' },
  { name: 'Music', color: 'pink', icon: Music2, event: 'rooftop' },
  { name: 'Games', color: 'blue', icon: Dices },
  { name: 'Art', color: 'lilac', icon: Palette, event: 'art' },
  { name: 'Outdoors', color: 'mint', icon: Trees, event: 'beach' },
  { name: 'Surprise me', color: 'lemon', icon: Shuffle },
];
const spring = { type: 'spring', stiffness: 310, damping: 23 };

function PrimaryButton({ children = 'Find a SideQuest', className = '', href = '#moods' }) {
  return <motion.a href={href} className={`primary-button ${className}`} whileHover={{ scale: 1.025 }} whileTap={{ scale: .96 }} transition={spring}>{children}<span className="cta-arrow-circle"><ArrowUpRight size={20} aria-hidden="true" /></span></motion.a>;
}

function Navbar({ onInfo }) {
  const [open, setOpen] = useState(false);
  const links = ['Explore', 'Discover', 'How it works', 'About'];
  return <header className="nav-shell"><nav className="navbar content-width" aria-label="Main navigation">
    <a className="wordmark" href="#" aria-label="SideQuest home"><span className="logo-spark" aria-hidden="true">✳</span>SideQuest</a>
    <div className="desktop-nav">{links.map((link, i) => i < 3 ? <NavLink key={link} href={i === 0 ? '#moods' : i === 1 ? '#experiences' : '#how-it-works'}>{link}</NavLink> : <button key={link} onClick={() => onInfo(link)}>{link}</button>)}</div>
    <div className="nav-actions"><PrimaryButton>Start Exploring</PrimaryButton><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    {open && <div id="mobile-menu" className="mobile-menu">{links.map((link, i) => i < 3 ? <NavLink key={link} href={i === 0 ? '#moods' : i === 1 ? '#experiences' : '#how-it-works'} onClick={() => setOpen(false)}>{link}</NavLink> : <button key={link} onClick={() => { setOpen(false); onInfo(link); }}>{link}</button>)}</div>}
  </nav></header>;
}

function SplashShape({ type, className = '' }) {
  return <svg className={`splash ${className}`} viewBox="0 0 100 100" aria-hidden="true">{type === 'blob' ? <path d="M16 24C31 1 47 20 61 10S105 31 90 51 95 87 66 92 61 76 32 86 0 49 16 24Z" fill="currentColor" /> : type === 'star' ? <path d="m50 1 9 33 29-19-17 31 28 12-34 5 8 32-24-24-25 27 9-34L1 55l33-10L15 17l28 17Z" fill="currentColor" /> : type === 'smile' ? <><circle cx="50" cy="50" r="45" fill="currentColor" /><path d="M29 58q21 25 42-2M34 32v10m30-10v10" fill="none" stroke="#151515" strokeWidth="5" strokeLinecap="round" /></> : <path d="M8 66C21 11 38 13 34 54S52 94 57 46 83 20 91 40" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />}</svg>;
}

function EventCard({ event, pointerX, pointerY, onSelect }) {
  const x = useTransform(pointerX, [-1, 1], [-event.depth, event.depth]);
  const y = useTransform(pointerY, [-1, 1], [-event.depth, event.depth]);
  const [failed, setFailed] = useState(false);
  return <motion.div className={`event-position event-${event.id}`} style={{ x, y }}><motion.button className="event-card" style={{ '--accent': `var(--${event.color})`, rotate: event.rotation }} whileHover={{ y: -9, rotate: event.rotation * .3, scale: 1.03, zIndex: 10 }} whileFocus={{ y: -6, rotate: 0 }} whileTap={{ scale: .98 }} transition={spring} onClick={() => onSelect(event)} aria-label={`View ${event.title}`}>
    <div className={`event-photo ${failed ? 'photo-fallback' : ''}`}>{!failed && <img {...photoProps(event.image, '(max-width: 650px) 210px, 22vw')} alt={event.alt} onError={() => setFailed(true)} />}<span className="photo-grain" /><span className="event-sticker card-label">{event.label.charAt(0) + event.label.slice(1).toLowerCase()}</span>{failed && <span className="fallback-art" aria-label={event.alt}>✳</span>}</div>
    <div className="event-caption"><h3>{event.title}</h3><div><span>{event.detail}</span><ArrowUpRight size={17} aria-hidden="true" /></div></div>
  </motion.button></motion.div>;
}

function HeroCollage({ onSelect }) {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 22 }), pointerY = useSpring(rawY, { stiffness: 80, damping: 22 });
  const backgroundX = useTransform(pointerX, [-1, 1], [-14, 14]);
  const backgroundY = useTransform(pointerY, [-1, 1], [-14, 14]);
  function move(e) { if (reduced || e.pointerType !== 'mouse' || window.innerWidth < 768) return; const rect = e.currentTarget.getBoundingClientRect(); rawX.set((e.clientX - rect.left) / rect.width * 2 - 1); rawY.set((e.clientY - rect.top) / rect.height * 2 - 1); }
  return <div className="collage" id="collage" onPointerMove={move} onPointerLeave={() => { rawX.set(0); rawY.set(0); }} aria-label="A few ways to spend your weekend">
    <motion.div className="collage-decorations" style={{ x: backgroundX, y: backgroundY }}><SplashShape type="blob" className="blue-blob" /><GraphicShape kind="asterisk" className="splash hero-star" /><SplashShape type="squiggle" className="orange-squiggle" /></motion.div>
    {heroEvents.map(event => <EventCard key={event.id} event={event} pointerX={pointerX} pointerY={pointerY} onSelect={onSelect} />)}
    <SplashShape type="smile" className="collage-smile" />
  </div>;
}

function Hero({ onSelect }) {
  return <section className="hero"><div className="hero-inner content-width"><div className="hero-copy"><h1>Your weekend<br />needs a<br /><span className="headline-accent">SideQuest.<svg viewBox="0 0 510 35" preserveAspectRatio="none" aria-hidden="true"><path d="M6 19Q125-1 258 14T501 11M39 29Q239 11 447 25" /></svg></span></h1><div className="hero-description"><p>Find interesting things happening around you, make a plan, grab your people and go.</p><div className="hero-cta"><PrimaryButton>Find a SideQuest</PrimaryButton></div></div></div><HeroCollage onSelect={onSelect} /></div></section>;
}

function WavyMarquee() {
  const reduced = useReducedMotion();
  return <div className="marquee" aria-label="Find, plan, explore, vibe, repeat"><svg viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true"><defs><path id="ribbon-path" d="M-1450 105 C-1200 20 -970 20 -730 105 S-240 190 10 105 S490 20 730 105 S1220 190 1460 105 S1940 20 2180 105 S2670 190 2910 105" /></defs><use href="#ribbon-path" fill="none" stroke="var(--lemon)" strokeWidth="86" /><text dy="12"><textPath href="#ribbon-path" startOffset="0">{Array.from({ length: 9 }, (_, i) => <tspan key={i} textLength="900" lengthAdjust="spacing"> FIND <tspan fill="var(--lilac)">✳</tspan> PLAN · EXPLORE <tspan fill="var(--lilac)">✳</tspan> VIBE · REPEAT ·</tspan>)}{!reduced && <animate attributeName="startOffset" from="0" to="-900" dur="40s" repeatCount="indefinite" />}</textPath></text></svg></div>;
}

function MoodPill({ mood, selected, onClick }) {
  const Icon = mood.icon;
  return <motion.button className={`mood-pill ${selected ? 'selected' : ''}`} style={{ '--mood-color': `var(--${mood.color})` }} aria-pressed={selected} onClick={onClick} whileHover={{ scale: 1.045, y: -3 }} whileTap={{ scale: .96 }} transition={spring}><Icon size={21} strokeWidth={1.6} aria-hidden="true" />{mood.name}{selected && <Check size={16} aria-hidden="true" />}</motion.button>;
}

function DetailDialog({ selection, onClose }) {
  const ref = useRef(null);
  React.useEffect(() => { const dialog = ref.current; dialog.showModal(); const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; }; }, []);
  const event = typeof selection === 'object' ? selection : null;
  const messages = { 'How it works': 'Pick your vibe, find a plan that feels like you, and bring your people. A little adventure starts with a simple yes.', 'About': 'SideQuest is for the “we should do something” friends. We’re making room for good company, unexpected plans, and weekends worth talking about.', 'Sign in': 'Your next adventure is taking shape. Accounts will be available when SideQuest launches.' };
  return <dialog ref={ref} className="detail-dialog" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title"><button autoFocus className="dialog-close" onClick={onClose} aria-label="Close details"><X /></button><span className="eyebrow">{event ? 'A LITTLE WEEKEND INSPIRATION' : 'HELLO, SIDEQUEST'}</span><h2 id="dialog-title">{event ? event.title : selection}</h2><p>{event ? `${event.detail} This is a preview of the kind of plans you’ll discover on SideQuest. Live event details and booking are coming soon.` : messages[selection]}</p>{event && <span className="preview-note"><MapPin size={17} /> Sample adventure · Location coming soon</span>}<button className="primary-button" onClick={onClose}>Keep exploring <span className="cta-arrow-circle"><ArrowUpRight size={20} aria-hidden="true" /></span></button></dialog>;
}

export default function App() {
  const [selection, setSelection] = useState(null);
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#moods">Skip to categories</a><Navbar onInfo={setSelection} /><main><Hero onSelect={setSelection} /><WavyMarquee /><MoodSection onSelect={setSelection} /><HowItWorks /><Experiences onSelect={setSelection} /><WeekendPlayground /></main><Footer />{selection && <DetailDialog selection={selection} onClose={() => setSelection(null)} />}</MotionConfig>;
}

function MoodSection({ onSelect }) {
  const [selected, setSelected] = useState('Surprise me');
  const [recommendation, setRecommendation] = useState(() => recommendations[Math.floor(Math.random() * recommendations.length)]);
  function pick(mood) {
    setSelected(mood.name);
    if (mood.name === 'Surprise me') {
      const options = recommendations.filter(item => item.vibe !== recommendation.vibe);
      setRecommendation(options[Math.floor(Math.random() * options.length)]);
    } else setRecommendation(recommendations.find(item => item.vibe === mood.name));
  }
  return <section className="mood-section" id="moods"><div className="content-width mood-content">
    <div className="mood-heading"><div><span className="eyebrow">PICK YOUR VIBE</span><h2>What are you<br />in the mood for?</h2></div><div className="mood-aside"><span className="splash mood-asterisk" aria-hidden="true">✳</span><p>Big night? Slow Sunday?<br />There’s a SideQuest for that.</p></div></div>
    <div className="mood-pills" aria-label="Choose a category">{moods.map(mood => <MoodPill key={mood.name} mood={mood} selected={selected === mood.name} onClick={() => pick(mood)} />)}</div>
    <div className="vibe-panel-wrap"><MoodRecommendation key={recommendation.vibe} recommendation={recommendation} accent={moods.find(mood => mood.name === selected).color} onSelect={onSelect} /></div>
    <p className="vibe-announcement" aria-live="polite" aria-atomic="true">{recommendation.vibe}: {recommendation.title}</p>
  </div></section>;
}












import { photoProps } from './imageAssets.js';
