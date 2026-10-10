import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import './Experiences.css';
import GraphicShape from './GraphicShape.jsx';

const experiences = [
  { id: 'open-mic', title: 'Open Mic After Dark', category: 'Music', color: 'pink', date: 'Fri, Sep 25 · 8 PM', location: 'The Listening Room', image: 'photo-1516280440614-37939bbacd81', alt: 'Microphone waiting on a warmly lit stage' },
  { id: 'pottery', title: 'Sunday Pottery Club', category: 'Art & making', color: 'lilac', date: 'Sun, Sep 27 · 11 AM', location: 'Clay House Studio', image: 'photo-1493106641515-6b5631de4bb9', alt: 'Handmade ceramic vessels and pottery in a studio' },
  { id: 'ice-cream', title: 'Scoop & Stroll', category: 'Food', color: 'orange', date: 'Sat, Sep 27 · 5 PM', location: 'The Creamery', image: 'photo-1563805042-7684c019e1cb', alt: 'Scoops of ice cream ready for a sweet afternoon treat' },
  { id: 'picnic', title: 'Picnic in the Park', category: 'Outdoors', color: 'mint', date: 'Sun, Sep 28 · 2 PM', location: 'Meadow Park', image: 'photo-1529156069898-49953e39b3ac', alt: 'Friends spending time together outdoors' },
  { id: 'arcade', title: 'Arcade & Pizza Night', category: 'Games & food', color: 'blue', date: 'Sat, Sep 26 · 7 PM', location: 'The Playroom Arcade', image: 'photo-1511512578047-dfb367046420', alt: 'Colorful illuminated arcade machines ready for game night' },
  { id: 'paint', title: 'Paint Outside the Lines', category: 'Art & making', color: 'orange', date: 'Sun, Sep 27 · 3 PM', location: 'The Open Studio', image: 'photo-1460661419201-fd4cecdf8a8b', alt: 'Expressive colorful paint and brushes on an art worktable' },
];

function ExperienceCard({ experience, onSelect }) {
  const [failed, setFailed] = useState(false);
  return <motion.button className="experience-card" style={{ '--experience-color': `var(--${experience.color})` }}
    initial="rest" animate="rest" whileHover="hover" whileFocus="hover" whileTap={{ scale: .99 }}
    variants={{ rest: { y: 0 }, hover: { y: -4 } }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    onClick={() => onSelect({ title: experience.title, detail: `${experience.date} · ${experience.location}.` })} aria-label={`View ${experience.title}`}>
    <div className="experience-image">
      {failed ? <div className="experience-fallback" aria-label={experience.alt}><span aria-hidden="true">✳</span><span>{experience.category}</span></div> : <motion.img {...photoProps(experience.image, '(max-width: 650px) 86vw, (max-width: 1050px) 45vw, 31vw')} alt={experience.alt} loading="lazy" onError={() => setFailed(true)} variants={{ rest: { scale: 1 }, hover: { scale: 1.045 } }} transition={{ duration: .5, ease: 'easeOut' }} />}
      <span className="experience-category card-label">{experience.category}</span>
      <motion.span className="experience-spark" aria-hidden="true" variants={{ rest: { rotate: -12, scale: .8, opacity: 0 }, hover: { rotate: 10, scale: 1, opacity: 1 } }} transition={{ duration: .25 }}>✳</motion.span>
    </div>
    <div className="experience-body"><h3>{experience.title}</h3><div className="experience-meta"><span><CalendarDays size={15} aria-hidden="true" />{experience.date}</span><span><MapPin size={15} aria-hidden="true" />{experience.location}</span></div><motion.span className="experience-arrow" aria-hidden="true" variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}><ArrowUpRight size={21} /></motion.span></div>
  </motion.button>;
}

export default function Experiences({ onSelect }) {
  const track = useRef(null);
  const [position, setPosition] = useState(0);
  const reduced = useReducedMotion();
  const lastPosition = experiences.length - 1;
  function syncPosition() {
    const element = track.current;
    const distance = element.scrollWidth - element.clientWidth;
    setPosition(distance > 0 ? Math.round(element.scrollLeft / distance * lastPosition) : 0);
  }
  function goTo(next) {
    const element = track.current;
    element.scrollTo({ left: (element.scrollWidth - element.clientWidth) * Math.max(0, Math.min(lastPosition, next)) / lastPosition, behavior: reduced ? 'instant' : 'smooth' });
  }
  useEffect(() => {
    const observer = new ResizeObserver(syncPosition);
    observer.observe(track.current);
    return () => observer.disconnect();
  }, []);
  return <section id="experiences" className="experiences-section" aria-labelledby="experiences-heading"><div className="content-width">
    <header className="experiences-heading"><GraphicShape kind="clover" className="experience-heading-shape" /><h2 id="experiences-heading">Your next SideQuest<br />is waiting.</h2><p>From low-key hangs to ‘how did we end up here?’ kind of nights.</p></header>
    <div ref={track} id="experience-carousel" className="experience-track" role="region" aria-roledescription="carousel" aria-label="Explore six experiences" tabIndex={0} onScroll={syncPosition} onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        goTo(event.key === 'Home' ? 0 : event.key === 'End' ? lastPosition : position + (event.key === 'ArrowRight' ? 1 : -1));
      }
    }}>{experiences.map(experience => <ExperienceCard key={experience.id} experience={experience} onSelect={onSelect} />)}</div>
    <nav className="experience-controls" aria-label="Experience carousel controls">
      <button className="experience-control-arrow" aria-label="Previous experiences" aria-controls="experience-carousel" disabled={position === 0} onClick={() => goTo(position - 1)}><ArrowLeft size={20} aria-hidden="true" /></button>
      <div className="experience-dots">{experiences.map((experience, index) => <button key={experience.id} className="experience-dot" style={{ '--dot-color': `var(--${experience.color})` }} aria-label={`Carousel position ${index + 1} of ${experiences.length}`} aria-current={position === index ? 'step' : undefined} aria-controls="experience-carousel" onClick={() => goTo(index)}><span /></button>)}</div>
      <button className="experience-control-arrow" aria-label="Next experiences" aria-controls="experience-carousel" disabled={position === lastPosition} onClick={() => goTo(position + 1)}><ArrowRight size={20} aria-hidden="true" /></button>
    </nav>
  </div></section>;
}
import { photoProps } from './imageAssets.js';
