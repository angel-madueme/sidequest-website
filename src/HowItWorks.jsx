import { motion, useReducedMotion } from 'framer-motion';
import GraphicShape, { ShapeArtwork } from './GraphicShape.jsx';
import './HowItWorks.css';

const steps = [
  { title: 'Discover', copy: 'Find something fun happening around you.', color: 'blue', rotation: -12, offset: 42 },
  { title: 'Pick', copy: 'Choose what matches your mood.', color: 'pink', rotation: -4, offset: 0 },
  { title: 'Invite', copy: 'Send it to your people.', color: 'lilac', rotation: 4, offset: 0 },
  { title: 'Go', copy: 'Stop saying “we should hang out” and actually do it.', color: 'orange', rotation: 12, offset: 42 },
];

function StepIllustration({ step }) {
  return <svg viewBox="0 0 180 160" fill="none" aria-hidden="true">
    {step === 'Discover' && <>
      <path d="m24 113 37-14 48 15 44-18v39l-44 17-48-16-37 14Z" fill="#fff9ef" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M61 99v37m48-22v38" stroke="currentColor" strokeWidth="3" />
      <path d="M90 116s-36-33-36-59a36 36 0 0 1 72 0c0 26-36 59-36 59Z" fill="currentColor" />
      <circle cx="90" cy="56" r="13" fill="#fff9ef" />
      <path d="m145 20 3 11 11 3-11 3-3 11-3-11-11-3 11-3Z" fill="currentColor" />
      <path d="m25 59 9-7m-9-8 8 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>}
    {step === 'Pick' && <>
      <circle cx="86" cy="78" r="53" fill="#fff9ef" stroke="currentColor" strokeWidth="3" />
      <path d="M66 62v11m39-11v11M61 91q26 33 51-2" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <circle cx="135" cy="119" r="25" fill="currentColor" />
      <path d="m122 120 9 9 17-20" stroke="#fff9ef" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M137 23c-15-18-29 4 0 21 29-17 15-39 0-21Z" fill="currentColor" />
    </>}
    {step === 'Invite' && <>
      <path d="M54 52h79q23 0 23 23v35q0 23-23 23h-9l-23 20v-20H54q-23 0-23-23V75q0-23 23-23Z" fill="currentColor" />
      <path d="M40 22h75q20 0 20 20v35q0 20-20 20H69l-27 22V97h-2q-20 0-20-20V42q0-20 20-20Z" fill="#fff9ef" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M77 49c-18-19-36 8 0 30 36-22 18-49 0-30Z" fill="currentColor" />
      <path d="m146 31 11-9m-4 24 13-1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>}
    {step === 'Go' && <>
      <path d="M41 106 107 40H70V16h81v81h-25V61l-65 66Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="m30 73 25-25M43 136l29-29m-50 0 16-16" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="m122 116 4 12 13 4-13 4-4 12-4-12-13-4 13-4Z" fill="#fff9ef" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="28" r="7" fill="#fff9ef" />
    </>}
  </svg>;
}

function StepCard({ step, index }) {
  return <li className="how-step-position" style={{ '--step-offset': `${step.offset}px`, '--step-rotation': `${step.rotation}deg`, '--step-color': `var(--${step.color})` }}>
    {index === 0 && <GraphicShape kind="burst" className="how-card-burst" />}
    <motion.article className="how-step-card" initial="rest" whileHover="hover" animate="rest"
      variants={{ rest: { rotate: step.rotation, y: 0 }, hover: { rotate: step.rotation * .15, y: -16 } }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
      <div className="how-step-top"><span>0{index + 1}</span><span aria-hidden="true">✳</span></div>
      <motion.div className="how-step-art" variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -4, rotate: -3 } }} transition={{ type: 'spring', stiffness: 180, damping: 19 }}><StepIllustration step={step.title} /></motion.div>
      <h3>{step.title}</h3><p>{step.copy}</p>
      <div className="how-step-bottom" aria-hidden="true"><span />✳<span /></div>
    </motion.article>
  </li>;
}

export default function HowItWorks() {
  const reduced = useReducedMotion();
  return <section className="how-section" id="how-it-works" aria-labelledby="how-heading">
    <div className="content-width how-content">
      <header className="how-heading"><span className="eyebrow">HOW IT WORKS</span><h2 id="how-heading">Making plans<br />should feel easy.</h2><p>Find something fun, pick your vibe, invite your people, and go.</p></header>
      <motion.svg className="how-doodle how-doodle-star" viewBox="0 0 100 100" aria-hidden="true" animate={reduced ? {} : { y: [0, -7, 0], rotate: [-8, 5, -8] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}><ShapeArtwork kind="sparkle" /></motion.svg>
      <motion.svg className="how-doodle how-doodle-squiggle" viewBox="0 0 100 70" aria-hidden="true" animate={reduced ? {} : { x: [0, 6, 0], y: [0, 4, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}><path d="M8 51C19 0 41 1 34 39S54 77 59 30 84 7 92 26" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></motion.svg>
      <ol className="how-fan">{steps.map((step, index) => <StepCard key={step.title} step={step} index={index} />)}</ol>
    </div>
  </section>;
}

