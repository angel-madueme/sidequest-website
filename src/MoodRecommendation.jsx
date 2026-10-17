import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import GraphicShape from './GraphicShape.jsx';
import './MoodRecommendation.css';

export const recommendations = [
  { vibe: 'Food', color: 'orange', kicker: 'YOUR FOODIE SIDE SAYS...', title: 'Scoop & Stroll', description: 'Grab a cone, take a walk, and see where the evening goes.', time: 'Saturday · 5 PM', location: 'The Creamery', image: 'photo-1563805042-7684c019e1cb', alt: 'Scoops of ice cream ready for an afternoon treat' },
  { vibe: 'Music', color: 'pink', kicker: 'YOUR MUSIC SIDE SAYS...', title: 'Open Mic After Dark', description: 'Live music, good energy, and the kind of night that stretches a little longer.', time: 'Friday · 8 PM', location: 'The Listening Room', image: 'photo-1516280440614-37939bbacd81', alt: 'A microphone on a warmly lit stage' },
  { vibe: 'Games', color: 'blue', kicker: 'YOUR COMPETITIVE SIDE SAYS...', title: 'Game Night Showdown', description: 'Good vibes, tiny competition, and just enough chaos to make it interesting.', time: 'Saturday · 7 PM', location: 'Pixel Lounge', image: '/game-night.svg', alt: 'A colorful board game with dice, cards, and playing pieces' },
  { vibe: 'Art', color: 'lilac', kicker: 'YOUR ARTSY SIDE SAYS...', title: 'Paint, Wine & Bad Art', description: 'A little paint, a little wine, absolutely no talent required.', time: 'Saturday · 6 PM', location: 'The Color Loft', image: 'photo-1460661419201-fd4cecdf8a8b', alt: 'Colorful paint brushes on an artist’s worktable' },
  { vibe: 'Outdoors', color: 'mint', kicker: 'YOUR OUTDOOR SIDE SAYS...', title: 'Picnic in the Park', description: 'Good food, soft grass, sunshine, and absolutely no rush.', time: 'Sunday · 2 PM', location: 'Meadow Park', image: 'photo-1529156069898-49953e39b3ac', alt: 'Friends relaxing together outdoors' },
];

export default function MoodRecommendation({ recommendation: item, accent = item.color, onSelect }) {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  return <motion.article className="vibe-recommendation" style={{ '--vibe-accent': `var(--${accent})` }}
    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -4 }} transition={{ duration: reduced ? 0 : .25 }} aria-labelledby="vibe-title">
    <div className="vibe-copy">
      <span className="vibe-kicker">{item.kicker}</span>
      <h3 id="vibe-title">{item.title}</h3>
      <p className="vibe-description">{item.description}</p>
      <div className="vibe-meta"><span><CalendarDays size={18} aria-hidden="true" />{item.time}</span><span><MapPin size={18} aria-hidden="true" />{item.location}</span></div>
      <motion.button className="primary-button" type="button" whileHover={reduced ? {} : { scale: 1.02 }} whileTap={reduced ? {} : { scale: .98 }} onClick={() => onSelect({ ...item, detail: `${item.description} ${item.time} · ${item.location}.` })}>See this SideQuest<span className="cta-arrow-circle"><ArrowUpRight size={20} aria-hidden="true" /></span></motion.button>
    </div>
    <div className="vibe-image">{failed ? <div className="vibe-image-fallback"><GraphicShape kind="clover" /><span>{item.vibe}</span></div> : <motion.img initial={{ scale: reduced ? 1 : 1.025 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : .4 }} {...photoProps(item.image, '(max-width: 750px) 90vw, 50vw')} alt={item.alt} onError={() => setFailed(true)} />}</div>
    <GraphicShape kind="sparkle" className="vibe-panel-spark" />
  </motion.article>;
}
import { photoProps } from './imageAssets.js';
