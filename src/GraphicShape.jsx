// Small graphic accents inspired by the supplied shape reference.
// Inherit color so every use stays connected to the SideQuest palette.
export function ShapeArtwork({ kind = 'burst' }) {
  if (kind === 'clover') {
    return <path d="M50 36C16-6-9 36 29 50C-9 64 16 106 50 64C84 106 109 64 71 50C109 36 84-6 50 36Z" fill="currentColor" />;
  }
  if (kind === 'sparkle') {
    return <path d="M50 5C53 37 63 47 95 50C63 53 53 63 50 95C47 63 37 53 5 50C37 47 47 37 50 5Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />;
  }
  if (kind === 'asterisk') {
    return <g fill="currentColor">{Array.from({ length: 6 }, (_, i) => <rect key={i} x="43" y="5" width="14" height="90" rx="3" transform={`rotate(${i * 30} 50 50)`} />)}</g>;
  }
  return <g fill="currentColor"><circle cx="50" cy="50" r="30" />{Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="50" cy="25" rx="10" ry="23" transform={`rotate(${i * 30} 50 50)`} />)}</g>;
}

export default function GraphicShape({ kind, className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><ShapeArtwork kind={kind} /></svg>;
}
