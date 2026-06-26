const NAV_HEIGHT = 56;
const DURATION = 800;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScroll(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const scrollEl = document.scrollingElement || document.documentElement;
  const start = scrollEl.scrollTop;
  const target = el.getBoundingClientRect().top + start - NAV_HEIGHT;
  const distance = target - start;

  if (Math.abs(distance) < 1) return;

  let startTime: number | null = null;

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / DURATION, 1);
    scrollEl.scrollTop = start + distance * easeInOutCubic(progress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
