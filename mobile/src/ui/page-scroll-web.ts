// Ease discrete mouse-wheel notches without changing touch/trackpad scrolling or storing positions in React state.
export function smoothPageWheel(node: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, target = 0, last = 0;
  const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0; };
  const clamp = (y: number) => Math.max(0, Math.min(node.scrollHeight - node.clientHeight, y));
  const tick = (time: number) => {
    const dt = last ? Math.min(32, time - last) : 16;
    last = time;
    target = clamp(target);
    const next = node.scrollTop + (target - node.scrollTop) * (1 - Math.exp(-dt / 55));
    if (Math.abs(target - next) < 1) {
      node.scrollTop = target;
      frame = 0; last = 0;
    } else {
      node.scrollTop = next;
      frame = requestAnimationFrame(tick);
    }
  };
  const wheel = (event: WheelEvent) => {
    const dy = event.deltaY, amount = Math.abs(dy);
    // Small/fractional pixel deltas are trackpad motion, already eased by the OS. Ctrl-wheel is browser zoom.
    const discrete = event.deltaMode !== 0 || (amount >= 80 && Number.isInteger(dy) && amount % 10 === 0);
    if (reduced.matches || event.defaultPrevented || event.ctrlKey || event.shiftKey || !discrete || Math.abs(event.deltaX) > amount) { stop(); return; }
    // Let inputs and independently scrolling children consume their own wheel events.
    for (let el = event.target instanceof Element ? event.target : null; el && el !== node; el = el.parentElement) {
      if (el.matches('input,textarea,select,[contenteditable="true"]') ||
        (el.scrollHeight > el.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(el).overflowY))) { stop(); return; }
    }
    const delta = dy * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? node.clientHeight : 1);
    // Reverse immediately rather than finishing an earlier movement in the opposite direction.
    const from = frame && Math.sign(target - node.scrollTop) === Math.sign(delta) ? target : node.scrollTop;
    const next = clamp(from + delta);
    if (next === node.scrollTop) { stop(); return; }
    event.preventDefault();
    target = next;
    if (!frame) frame = requestAnimationFrame(tick);
  };
  node.addEventListener('wheel', wheel, { passive: false });
  node.addEventListener('pointerdown', stop, { passive: true });
  node.addEventListener('touchstart', stop, { passive: true });
  node.addEventListener('keydown', stop);
  reduced.addEventListener('change', stop);
  window.addEventListener('blur', stop);
  return () => {
    stop();
    node.removeEventListener('wheel', wheel);
    node.removeEventListener('pointerdown', stop);
    node.removeEventListener('touchstart', stop);
    node.removeEventListener('keydown', stop);
    reduced.removeEventListener('change', stop);
    window.removeEventListener('blur', stop);
  };
}
