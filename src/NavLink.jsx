import { useEffect, useState } from 'react';

export default function NavLink({ href, children, onClick }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = document.querySelector(href);
        const section = target?.closest('section');
        const rect = section?.getBoundingClientRect();
        const line = window.innerHeight * .35;
        setActive(Boolean(rect && rect.top <= line && rect.bottom > line && window.scrollY > 80));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [href]);
  return <a href={href} onClick={onClick} aria-current={active ? 'location' : undefined}>{children}</a>;
}
