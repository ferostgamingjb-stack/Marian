/* =============================================
   ASVALTCLAN — Animated Background Engine
   Effect: Multi-point Neon Green Glow Pulse
   (different locations, every ~4s)
   ============================================= */

(function() {
  'use strict';

  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  /* ---- resize ---- */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ================================================
     SUBTLE STAR FIELD (always on — very dim)
     ================================================ */
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 0.9 + 0.2,
      alpha: Math.random() * 0.35 + 0.05,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002
    });
  }

  function drawStars() {
    stars.forEach(s => {
      s.pulse += s.speed;
      const a = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse));
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(46,235,90,${a})`;
      ctx.fill();
    });
  }

  /* ================================================
     GLOW PULSES — multiple can be active at once
     Each has a random position on the canvas
     ================================================ */
  const glows = [];

  // Predefined glow zones spread across the page
  const glowZones = [
    { cx: 0.10, cy: 0.15 },
    { cx: 0.85, cy: 0.10 },
    { cx: 0.50, cy: 0.30 },
    { cx: 0.20, cy: 0.65 },
    { cx: 0.78, cy: 0.55 },
    { cx: 0.35, cy: 0.85 },
    { cx: 0.65, cy: 0.78 },
    { cx: 0.05, cy: 0.50 },
    { cx: 0.92, cy: 0.80 },
    { cx: 0.50, cy: 0.90 },
  ];

  let lastZone = -1;

  function triggerGlow() {
    // Pick a zone that's different from the last
    let idx;
    do { idx = Math.floor(Math.random() * glowZones.length); }
    while (idx === lastZone);
    lastZone = idx;

    const zone = glowZones[idx];
    glows.push({
      cx:    zone.cx + (Math.random() - 0.5) * 0.08,
      cy:    zone.cy + (Math.random() - 0.5) * 0.08,
      life:  0,
      dur:   2.0 + Math.random() * 0.8,  // 2.0–2.8s
      maxA:  0.14 + Math.random() * 0.10, // intensity 0.14–0.24
      r:     0.45 + Math.random() * 0.25  // radius factor
    });
  }

  function updateGlows(dt) {
    for (let i = glows.length - 1; i >= 0; i--) {
      const g = glows[i];
      g.life += dt;
      if (g.life >= g.dur) { glows.splice(i, 1); continue; }

      const p = g.life / g.dur;
      // Smooth bell curve: rise fast, fade slow
      const env = p < 0.3
        ? p / 0.3
        : 1 - ((p - 0.3) / 0.7);

      const alpha = g.maxA * env;
      const cx = g.cx * canvas.width;
      const cy = g.cy * canvas.height;
      const r  = g.r * Math.max(canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0,   `rgba(46,235,90,${alpha})`);
      grad.addColorStop(0.35,`rgba(46,235,90,${alpha * 0.45})`);
      grad.addColorStop(0.7, `rgba(20,100,50,${alpha * 0.12})`);
      grad.addColorStop(1,   'rgba(46,235,90,0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ================================================
     MAIN LOOP
     ================================================ */
  let lastTime = 0;

  function loop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateGlows(dt);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(ts => { lastTime = ts; loop(ts); });

  /* ================================================
     GLOW TIMER — fires every 4s, always a new spot
     ================================================ */
  // Fire first glow immediately
  triggerGlow();

  setInterval(function() {
    triggerGlow();
    // Occasionally fire a second simultaneous glow for variety
    if (Math.random() > 0.55) {
      setTimeout(triggerGlow, 700 + Math.random() * 600);
    }
  }, 4000);

})();
