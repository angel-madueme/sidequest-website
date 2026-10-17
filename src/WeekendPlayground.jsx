import { useRef, useState, useEffect } from 'react';
import { motion, useDragControls, useMotionValue, useReducedMotion } from 'framer-motion';
import { Mic2, Umbrella, Joystick, Coffee, Palette, Dices, Music2, Utensils, Grip, RotateCcw } from 'lucide-react';
import GraphicShape from './GraphicShape.jsx';
import './WeekendPlayground.css';

const activities = [
  { name: 'Karaoke', color: 'pink', Icon: Mic2, tilt: -7, image: 'photo-1516280440614-37939bbacd81', alt: 'Microphone on a warmly lit stage' },
  { name: 'Beach Day', color: 'blue', Icon: Umbrella, tilt: 4, image: 'photo-1507525428034-b723cf961d3e', alt: 'Sandy beach beside turquoise water' },
  { name: 'Arcade', color: 'lilac', Icon: Joystick, tilt: -4, image: 'photo-1511512578047-dfb367046420', alt: 'Colorful glowing arcade machines' },
  { name: 'Brunch', color: 'orange', Icon: Coffee, tilt: 7, image: 'photo-1533089860892-a7c6f0a88666', alt: 'A freshly prepared brunch spread' },
  { name: 'Paint & Sip', color: 'mint', Icon: Palette, tilt: 5, image: 'photo-1460661419201-fd4cecdf8a8b', alt: 'Paint-covered brushes on an art table' },
  { name: 'Game Night', color: 'lilac', Icon: Dices, tilt: -6, image: 'photo-1610890716171-6b1bb98ffd09', alt: 'Board game pieces laid out for a game' },
  { name: 'Live Music', color: 'pink', Icon: Music2, tilt: 6, image: 'photo-1506157786151-b8491531f063', alt: 'A crowd enjoying an outdoor concert' },
  { name: 'Food Crawl', color: 'orange', Icon: Utensils, tilt: -4, image: 'photo-1555939594-58d7cb561ad1', alt: 'Freshly grilled food ready to share' },
];

function ActivityStamp({ activity, index, board, nextLayer, reset }) {
  const controls = useDragControls();
  const card = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const [layer, setLayer] = useState(index + 1);
  const [dragging, setDragging] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => { x.set(0); y.set(0); }, [reset, x, y]);
  const raise = () => setLayer(nextLayer());
  function moveWithKeys(event) {
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (event.key === 'Home') { event.preventDefault(); x.set(0); y.set(0); return; }
    if (!directions[event.key]) return;
    event.preventDefault();
    const step = event.shiftKey ? 30 : 12;
    const [dx, dy] = directions[event.key];
    const el = card.current;
    // Keep the unrotated card footprint within the tabletop, like pointer dragging.
    x.set(Math.max(-el.offsetLeft, Math.min(board.current.clientWidth - el.offsetLeft - el.offsetWidth, x.get() + dx * step)));
    y.set(Math.max(-el.offsetTop, Math.min(board.current.clientHeight - el.offsetTop - el.offsetHeight, y.get() + dy * step)));
    raise();
  }
  const Icon = activity.Icon;
  return <motion.div ref={card} className={`activity-stamp activity-stamp-${index}`} style={{ x, y, zIndex: layer, '--activity-color': `var(--${activity.color})` }}
    drag dragControls={controls} dragListener={false} dragConstraints={board} dragElastic={.06} dragMomentum={false}
    onDragStart={() => { raise(); setDragging(true); }} onDragEnd={() => setDragging(false)}
    onPointerDown={event => { if (event.pointerType === 'mouse' && !event.target.closest('button')) controls.start(event); }}
    animate={{ rotate: dragging ? activity.tilt * .15 : activity.tilt, scale: dragging ? 1.025 : 1 }}
    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 290, damping: 24 }}>
    <div className="activity-paper"><div className="activity-art">{imageFailed ? <Icon strokeWidth={1.6} aria-hidden="true" /> : <img {...photoProps(activity.image, '(max-width: 650px) 43vw, 20vw')} alt={activity.alt} draggable={false} onError={() => setImageFailed(true)} />}</div>
      <div className="activity-caption"><h3>{activity.name}</h3><button className="activity-handle" aria-label={`Move ${activity.name}`} aria-description="Use arrow keys to move this card. Home returns it to its starting position." onPointerDown={event => { raise(); controls.start(event); }} onKeyDown={moveWithKeys} onFocus={raise}><Grip size={21} aria-hidden="true" /></button></div>
    </div>
  </motion.div>;
}

export default function WeekendPlayground() {
  const board = useRef(null), layer = useRef(10);
  const [reset, setReset] = useState(0);
  useEffect(() => {
    let width = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (width && Math.abs(entry.contentRect.width - width) > 1) setReset(value => value + 1);
      width = entry.contentRect.width;
    });
    observer.observe(board.current);
    return () => observer.disconnect();
  }, []);
  return <section className="weekend-section" aria-labelledby="weekend-heading"><div className="content-width">
    <header className="weekend-heading"><span className="eyebrow">A LITTLE ROOM TO PLAY</span><h2 id="weekend-heading"><span className="motion-line">So… what are we doing</span><br /><span className="motion-line">this weekend?</span></h2><p>Grab a plan. Move it around. See what feels right.</p></header>
    <div className="weekend-table" ref={board}>
      <GraphicShape kind="clover" className="table-doodle table-clover" /><GraphicShape kind="sparkle" className="table-doodle table-sparkle" />
      <svg className="table-doodle table-scribble" viewBox="0 0 100 60" aria-hidden="true"><path d="M5 41Q28-5 33 30T62 27T94 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
      <GraphicShape kind="burst" className="table-doodle table-burst" />
      <GraphicShape kind="asterisk" className="table-doodle table-asterisk" />
      <svg className="table-doodle table-smiley" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="currentColor" /><path d="M34 32v10m32-10v10M29 58q21 26 42-2" fill="none" stroke="var(--charcoal)" strokeWidth="5" strokeLinecap="round" /></svg>
      {activities.map((activity, index) => <ActivityStamp key={activity.name} activity={activity} index={index} board={board} nextLayer={() => ++layer.current} reset={reset} />)}
    </div>
    <div className="weekend-tools"><button onClick={() => setReset(value => value + 1)}><RotateCcw size={16} aria-hidden="true" />Reset the table</button></div>
  </div></section>;
}
import { photoProps } from './imageAssets.js';
