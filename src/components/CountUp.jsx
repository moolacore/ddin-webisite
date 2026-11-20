import { useEffect, useRef, useState } from 'react';

function CountUp({ value, duration = 1300, className, style, suffix = '' }) {
  const numberRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      setStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return undefined;
    }

    let frame;
    const startTime = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration]);

  return (
    <span
      ref={numberRef}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums', ...style }}
      aria-label={`${new Intl.NumberFormat().format(value)}${suffix}`}
    >
      {new Intl.NumberFormat().format(current)}{suffix}
    </span>
  );
}

export default CountUp;
