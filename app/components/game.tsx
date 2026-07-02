"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Soccer air-hockey, orientation-aware.
 *  - Landscape (desktop): goals on the LEFT (AI) and RIGHT (you).
 *  - Portrait  (mobile):  goals on the TOP (AI) and BOTTOM (you).
 * You drive the keeper in your half (drag with mouse / touch, or arrow keys)
 * and push the ball — a FIFA 26 Trionda-style football. The CPU drives the
 * other keeper. First to 5 wins. Pause with the button, the P key, or Esc.
 * Self-contained on a full-screen canvas.
 */

const BALL_R = 21;
const BALL_SPEED = 7;
const MALLET_R = 36;
// resolved at mount from the --font-display CSS var (next/font hashes family names)
let CANVAS_FONT = "system-ui, sans-serif";
const SPEED_CAP = 17;
const AI_COLOR = "#6f9fc4";
const ME_COLOR = "#d6ac63";

type Mallet = { x: number; y: number; px: number; py: number; vx: number; vy: number };
type Puck = { x: number; y: number; vx: number; vy: number; angle: number };

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const displayFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim();
    if (displayFamily) CANVAS_FONT = `${displayFamily}, system-ui, sans-serif`;

    // your photo on the player's keeper, AI motif on the AI's keeper
    const faceImg = new Image();
    faceImg.src = "/amith.jpeg";
    const aiImg = new Image();
    aiImg.onerror = () => { if (!aiImg.src.endsWith("/ai.svg")) aiImg.src = "/ai.svg"; };
    aiImg.src = "/ai.png";

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = document.documentElement.clientWidth;
    let H = window.innerHeight;
    let vertical = H > W; // portrait => goals on top/bottom
    let now = 0;

    const ai: Mallet = { x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0 };
    const me: Mallet = { x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0 };
    const puck: Puck = { x: 0, y: 0, vx: 0, vy: 0, angle: 0 };
    const score = { ai: 0, me: 0 };
    const keys: Record<string, boolean> = {};
    const WIN = 5;
    let winner: "" | "ai" | "me" = "";
    // anti-stuck tracking: last position the ball meaningfully moved from
    let stuckX = 0, stuckY = 0, stuckAt = 0;

    // goal mouth bounds along the cross axis (y when landscape, x when portrait)
    const cross = () => (vertical ? W : H);
    const goalMouth = (): [number, number] => {
      const c = cross();
      const half = c * 0.17;
      return [c / 2 - half, c / 2 + half];
    };
    const aiHome = () => (vertical ? { x: W / 2, y: 64 } : { x: 64, y: H / 2 });
    const meHome = () => (vertical ? { x: W / 2, y: H - 64 } : { x: W - 64, y: H / 2 });

    const placeMallet = (m: Mallet, home: { x: number; y: number }) => {
      m.x = home.x; m.y = home.y; m.px = home.x; m.py = home.y; m.vx = 0; m.vy = 0;
    };

    const serve = (towardAI: boolean) => {
      puck.x = W / 2;
      puck.y = H / 2;
      const a = (Math.random() - 0.5) * 0.7;
      const main = (towardAI ? -1 : 1) * BALL_SPEED * Math.cos(a);
      const side = BALL_SPEED * Math.sin(a);
      if (vertical) { puck.vy = main; puck.vx = side; }
      else { puck.vx = main; puck.vy = side; }
    };

    const reset = () => {
      score.ai = 0;
      score.me = 0;
      winner = "";
      serve(Math.random() < 0.5);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = document.documentElement.clientWidth;
      H = window.innerHeight;
      vertical = H > W;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      placeMallet(ai, aiHome());
      placeMallet(me, meHome());
      needsRepaint = true;
    };

    const clampMallet = (m: Mallet, isAI: boolean) => {
      if (vertical) {
        m.x = Math.max(MALLET_R + 6, Math.min(W - MALLET_R - 6, m.x));
        const yMin = isAI ? MALLET_R + 6 : H / 2 + MALLET_R;
        const yMax = isAI ? H / 2 - MALLET_R : H - MALLET_R - 6;
        m.y = Math.max(yMin, Math.min(yMax, m.y));
      } else {
        m.y = Math.max(MALLET_R + 6, Math.min(H - MALLET_R - 6, m.y));
        const xMin = isAI ? MALLET_R + 6 : W / 2 + MALLET_R;
        const xMax = isAI ? W / 2 - MALLET_R : W - MALLET_R - 6;
        m.x = Math.max(xMin, Math.min(xMax, m.x));
      }
    };

    const onPointer = (e: PointerEvent) => {
      if (winner && e.type === "pointerdown") { reset(); return; }
      if (pausedRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inAiHalf = vertical ? y < H / 2 : x < W / 2;
      if (inAiHalf) return; // the AI's half is off-limits
      me.x = x; me.y = y;
      clampMallet(me, false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (winner && e.key === " ") { reset(); return; }
      if ((e.key === "p" || e.key === "P" || e.key === "Escape") && !winner) {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
        return;
      }
      keys[e.key.toLowerCase()] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = false; };

    // freeze the match while the hero is scrolled out of view
    let offscreen = false;
    let needsRepaint = false;
    const vis = new IntersectionObserver((entries) => { offscreen = !entries[entries.length - 1].isIntersecting; }, { threshold: 0.05 });
    vis.observe(canvas);

    resize();
    serve(Math.random() < 0.5);
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointer);
    canvas.addEventListener("pointermove", onPointer);

    const collide = (m: Mallet) => {
      const dx = puck.x - m.x;
      const dy = puck.y - m.y;
      const dist = Math.hypot(dx, dy);
      const min = BALL_R + MALLET_R;
      if (dist > 0 && dist < min) {
        const nx = dx / dist;
        const ny = dy / dist;
        puck.x = m.x + nx * min;
        puck.y = m.y + ny * min;
        const vn = puck.vx * nx + puck.vy * ny;
        if (vn < 0) { puck.vx -= 2 * vn * nx; puck.vy -= 2 * vn * ny; }
        puck.vx += m.vx * 0.55;
        puck.vy += m.vy * 0.55;
        const sp = Math.hypot(puck.vx, puck.vy);
        if (sp > SPEED_CAP) { puck.vx *= SPEED_CAP / sp; puck.vy *= SPEED_CAP / sp; }
      }
    };

    const renderScene = () => {
      const [mA, mB] = goalMouth();
      drawPitch(ctx, W, H, vertical, mA, mB);
      if (vertical) { drawGoalEdge(ctx, "top", mA, mB, W, H); drawGoalEdge(ctx, "bottom", mA, mB, W, H); }
      else { drawGoalEdge(ctx, "left", mA, mB, W, H); drawGoalEdge(ctx, "right", mA, mB, W, H); }
      drawScore(ctx, W, H, vertical, score.ai, score.me);
      drawMallet(ctx, ai, AI_COLOR, aiImg);
      drawMallet(ctx, me, ME_COLOR, faceImg);
      if (!winner) { drawShadow(ctx, puck.x, puck.y, BALL_R); drawFootball(ctx, puck.x, puck.y, BALL_R, puck.angle); }
      if (winner) drawWin(ctx, W, H, winner, score.ai, score.me);
    };

    let last = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      now = t;
      const dt = Math.min((t - last) / 16.6667, 1.5);
      last = t;

      if (offscreen) {
        if (needsRepaint) { renderScene(); needsRepaint = false; }
        stuckAt = now;
        raf = requestAnimationFrame(loop);
        return;
      }

      if (pausedRef.current && !winner) {
        renderScene();
        drawPauseOverlay(ctx, W, H);
        stuckAt = now;
        raf = requestAnimationFrame(loop);
        return;
      }

      const kS = 10 * dt;
      // player keys: arrows
      if (keys["arrowup"]) me.y -= kS;
      if (keys["arrowdown"]) me.y += kS;
      if (keys["arrowleft"]) me.x -= kS;
      if (keys["arrowright"]) me.x += kS;

      // the CPU drives the AI keeper
      {
        const chasing = vertical ? puck.vy < 0 : puck.vx < 0;
        const home = aiHome();
        // aim goal-side of the ball, never at its center — pressing the ball
        // into a wall or corner would wedge it there
        const gap = MALLET_R + BALL_R + 2;
        const tx = chasing ? (vertical ? puck.x : puck.x - gap) : home.x;
        const ty = chasing ? (vertical ? puck.y - gap : puck.y) : home.y;
        const aiS = 7 * dt;
        ai.x += Math.max(-aiS, Math.min(aiS, tx - ai.x));
        ai.y += Math.max(-aiS, Math.min(aiS, ty - ai.y));
      }

      clampMallet(ai, true);
      clampMallet(me, false);

      ai.vx = (ai.x - ai.px) / dt; ai.vy = (ai.y - ai.py) / dt;
      me.vx = (me.x - me.px) / dt; me.vy = (me.y - me.py) / dt;
      ai.px = ai.x; ai.py = ai.y;
      me.px = me.x; me.py = me.y;

      const [mA, mB] = goalMouth();

      if (!winner) {
        puck.x += puck.vx * dt;
        puck.y += puck.vy * dt;
        const sp = Math.hypot(puck.vx, puck.vy);
        if (sp < BALL_SPEED) { const k = BALL_SPEED / (sp || 1); puck.vx *= k; puck.vy *= k; }
        puck.angle += (sp / BALL_R) * dt;

        if (vertical) {
          // side walls (x) always bounce
          if (puck.x < BALL_R) { puck.x = BALL_R; puck.vx = Math.abs(puck.vx); }
          if (puck.x > W - BALL_R) { puck.x = W - BALL_R; puck.vx = -Math.abs(puck.vx); }
          // top/bottom bounce except through goal mouth
          const inMouth = puck.x > mA && puck.x < mB;
          if (!inMouth) {
            if (puck.y < BALL_R) { puck.y = BALL_R; puck.vy = Math.abs(puck.vy); }
            if (puck.y > H - BALL_R) { puck.y = H - BALL_R; puck.vy = -Math.abs(puck.vy); }
          }
        } else {
          if (puck.y < BALL_R) { puck.y = BALL_R; puck.vy = Math.abs(puck.vy); }
          if (puck.y > H - BALL_R) { puck.y = H - BALL_R; puck.vy = -Math.abs(puck.vy); }
          const inMouth = puck.y > mA && puck.y < mB;
          if (!inMouth) {
            if (puck.x < BALL_R) { puck.x = BALL_R; puck.vx = Math.abs(puck.vx); }
            if (puck.x > W - BALL_R) { puck.x = W - BALL_R; puck.vx = -Math.abs(puck.vx); }
          }
        }

        collide(ai);
        collide(me);

        // goals: AI defends first edge (left/top), you defend second (right/bottom)
        const aiConceded = vertical ? puck.y < -BALL_R : puck.x < -BALL_R;
        const meConceded = vertical ? puck.y > H + BALL_R : puck.x > W + BALL_R;
        if (aiConceded) {
          score.me += 1;
          if (score.me >= WIN) winner = "me"; else serve(true);
        } else if (meConceded) {
          score.ai += 1;
          if (score.ai >= WIN) winner = "ai"; else serve(false);
        }

        // failsafe: if the ball has been pinned in place for a while
        // (wedged in a corner by a mallet), just re-serve from the center
        if (Math.hypot(puck.x - stuckX, puck.y - stuckY) > 48) {
          stuckX = puck.x; stuckY = puck.y; stuckAt = now;
        } else if (now - stuckAt > 2500) {
          serve(Math.random() < 0.5);
          stuckX = puck.x; stuckY = puck.y; stuckAt = now;
        }
      }

      renderScene();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      vis.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointer);
      canvas.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <main style={{ position: "relative", margin: 0, width: "100%", height: "100vh", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100vh", cursor: "pointer", touchAction: "none" }}
      />

      {/* who's playing — identity plate (bottom-left) */}
      <div className="hero-id">
        <p className="hero-id-name">Amith Lakshmisha</p>
        <p className="hero-id-role">Full Stack Engineer · Co-Founder &amp; CTO @ Mela</p>
      </div>

      {/* pause / resume */}
      <button onClick={togglePause} className="pause-btn" aria-label={paused ? "Resume game" : "Pause game"}>
        {paused ? "▶ Resume" : "⏸ Pause"}
      </button>

      {/* scroll cue into the story below */}
      <a href="#story" className="scroll-hint" aria-label="Scroll to my player history">
        <span>PLAYER HISTORY</span>
        <span style={{ fontSize: 18, lineHeight: 1 }}>⌄</span>
      </a>

      <style>{`
        .hero-id {
          position: absolute; bottom: 64px; left: 4%; z-index: 10;
          pointer-events: none;
          padding: 12px 18px; border-radius: 14px;
          background: rgba(8,20,14,0.55); border: 1px solid rgba(222,181,104,0.45);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
          animation: heroIdIn 0.9s cubic-bezier(0.22, 0.8, 0.3, 1) both 0.3s;
        }
        .hero-id-name {
          margin: 0; color: #fff;
          font-family: var(--font-display), sans-serif;
          font-weight: 800; font-size: clamp(22px, 3.4vw, 34px);
          line-height: 1.05; letter-spacing: 0.03em; text-transform: uppercase;
        }
        .hero-id-role {
          margin: 3px 0 0; color: #deb568;
          font-family: var(--font-body), sans-serif;
          font-weight: 600; font-size: clamp(11px, 1.4vw, 14px);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        @keyframes heroIdIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-height: 500px) { .hero-id { display: none; } }
        /* portrait: lift the plate clear of the bottom goal, keeper and buttons */
        @media (orientation: portrait) {
          .hero-id { bottom: 132px; padding: 10px 14px; }
        }
        .scroll-hint {
          position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
          z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 2px;
          color: #fff; font: 700 12px var(--font-body), system-ui, sans-serif; letter-spacing: 0.14em;
          text-decoration: none; padding: 8px 14px; border-radius: 999px;
          background: rgba(8,20,14,0.55); border: 1px solid rgba(222,181,104,0.5);
          text-shadow: 0 1px 3px rgba(0,0,0,0.6); animation: bob 1.6s ease-in-out infinite;
          transition: color .2s ease, border-color .2s ease;
        }
        .scroll-hint:hover { color: #deb568; border-color: #deb568; }
        @keyframes bob { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        .pause-btn {
          position: absolute; bottom: 18px; right: 20px; z-index: 10;
          display: inline-flex; align-items: center; gap: 6px;
          font: 700 13px var(--font-body), system-ui, sans-serif; letter-spacing: 0.06em;
          color: #fff; cursor: pointer;
          background: rgba(8,20,14,0.6); border: 1px solid rgba(222,181,104,0.55);
          border-radius: 999px; padding: 12px 20px; min-height: 44px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
          transition: color .2s ease, border-color .2s ease, transform .15s ease;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none; -webkit-user-select: none;
        }
        .pause-btn:hover { color: #deb568; border-color: #deb568; transform: scale(1.05); }
        .pause-btn:active { transform: scale(0.97); }
      `}</style>
    </main>
  );
};

/* ----------------- drawing helpers ----------------- */

function drawPitch(ctx: CanvasRenderingContext2D, W: number, H: number, vertical: boolean, mA: number, mB: number) {
  const grad = vertical ? ctx.createLinearGradient(0, 0, 0, H) : ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#0f5a31");
  grad.addColorStop(1, "#0b4426");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const stripe = 100;
  if (vertical) {
    for (let i = 0; i < Math.ceil(H / stripe); i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.04)";
      ctx.fillRect(0, i * stripe, W, stripe);
    }
  } else {
    for (let i = 0; i < Math.ceil(W / stripe); i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.04)";
      ctx.fillRect(i * stripe, 0, stripe, H);
    }
  }

  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 3;
  ctx.strokeRect(14, 14, W - 28, H - 28);

  ctx.beginPath();
  if (vertical) { ctx.moveTo(14, H / 2); ctx.lineTo(W - 14, H / 2); }
  else { ctx.moveTo(W / 2, 14); ctx.lineTo(W / 2, H - 14); }
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(W / 2, H / 2, Math.min(90, Math.min(W, H) * 0.2), 0, Math.PI * 2);
  ctx.stroke();

  // penalty boxes around each goal
  const pad = 60;
  if (vertical) {
    const bx = mA - pad;
    const bw = (mB - mA) + pad * 2;
    const bh = Math.min(H * 0.13, 160);
    ctx.strokeRect(bx, 14, bw, bh);
    ctx.strokeRect(bx, H - 14 - bh, bw, bh);
  } else {
    const by = mA - pad;
    const bh = (mB - mA) + pad * 2;
    const bw = Math.min(W * 0.13, 200);
    ctx.strokeRect(14, by, bw, bh);
    ctx.strokeRect(W - 14 - bw, by, bw, bh);
  }
}

function drawGoalEdge(ctx: CanvasRenderingContext2D, edge: "left" | "right" | "top" | "bottom", mA: number, mB: number, W: number, H: number) {
  const depth = 46;
  const post = 8;
  let rx: number, ry: number, rw: number, rh: number;
  if (edge === "left") { rx = 0; ry = mA; rw = depth; rh = mB - mA; }
  else if (edge === "right") { rx = W - depth; ry = mA; rw = depth; rh = mB - mA; }
  else if (edge === "top") { rx = mA; ry = 0; rw = mB - mA; rh = depth; }
  else { rx = mA; ry = H - depth; rw = mB - mA; rh = depth; }

  // net mesh
  ctx.save();
  ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip();
  ctx.strokeStyle = "rgba(255,255,255,0.28)"; ctx.lineWidth = 1;
  const mesh = 18;
  for (let x = rx; x <= rx + rw; x += mesh) { ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + rh); ctx.stroke(); }
  for (let y = ry; y <= ry + rh; y += mesh) { ctx.beginPath(); ctx.moveTo(rx, y); ctx.lineTo(rx + rw, y); ctx.stroke(); }
  ctx.restore();

  // frame
  ctx.fillStyle = "#ffffff";
  if (edge === "left" || edge === "right") {
    ctx.fillRect(rx, ry - post / 2, depth, post);
    ctx.fillRect(rx, ry + rh - post / 2, depth, post);
    const backX = edge === "left" ? 0 : W - post;
    ctx.fillRect(backX, ry, post, rh);
  } else {
    ctx.fillRect(rx - post / 2, ry, post, depth);
    ctx.fillRect(rx + rw - post / 2, ry, post, depth);
    const backY = edge === "top" ? 0 : H - post;
    ctx.fillRect(rx, backY, rw, post);
  }
}

function drawScore(ctx: CanvasRenderingContext2D, W: number, H: number, vertical: boolean, aiScore: number, meScore: number) {
  ctx.save();
  ctx.textBaseline = "top";
  if (vertical) {
    // AI mid-left-upper, YOU mid-left-lower (clear of the top/bottom goals)
    ctx.textAlign = "left";
    ctx.font = `800 16px ${CANVAS_FONT}`;
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("AI", 22, H / 2 - 70);
    ctx.font = `900 42px ${CANVAS_FONT}`;
    ctx.fillStyle = "#6f9fc4";
    ctx.fillText(String(aiScore), 22, H / 2 - 52);
    ctx.font = `800 16px ${CANVAS_FONT}`;
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("YOU", 22, H / 2 + 12);
    ctx.font = `900 42px ${CANVAS_FONT}`;
    ctx.fillStyle = "#d6ac63";
    ctx.fillText(String(meScore), 22, H / 2 + 30);
  } else {
    ctx.textAlign = "center";
    ctx.font = `800 18px ${CANVAS_FONT}`;
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("AI", W / 2 - 70, 22);
    ctx.fillText("YOU", W / 2 + 70, 22);
    ctx.font = `900 52px ${CANVAS_FONT}`;
    ctx.fillStyle = "#6f9fc4"; ctx.fillText(String(aiScore), W / 2 - 70, 42);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fillText(":", W / 2, 46);
    ctx.fillStyle = "#d6ac63"; ctx.fillText(String(meScore), W / 2 + 70, 42);
  }
  ctx.restore();
}

function drawMallet(ctx: CanvasRenderingContext2D, m: { x: number; y: number }, color: string, img?: HTMLImageElement) {
  ctx.save();
  ctx.beginPath(); ctx.arc(m.x, m.y, MALLET_R, 0, Math.PI * 2);
  ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 20; ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.stroke();

  const ri = MALLET_R * 0.7;
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath(); ctx.arc(m.x, m.y, ri, 0, Math.PI * 2); ctx.clip();
    const s = Math.max((2 * ri) / img.naturalWidth, (2 * ri) / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.drawImage(img, m.x - dw / 2, m.y - dh / 2, dw, dh);
    ctx.restore();
    ctx.beginPath(); ctx.arc(m.x, m.y, ri, 0, Math.PI * 2);
    ctx.lineWidth = 3; ctx.strokeStyle = "#ffffff"; ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(m.x, m.y, MALLET_R * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.stroke();
  }
  ctx.restore();
}

function drawShadow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y + r * 0.85);
  ctx.scale(1, 0.32);
  ctx.beginPath(); ctx.arc(0, 0, r * 0.95, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fill();
  ctx.restore();
}

// FIFA 26 Trionda-style ball: white base, red/blue/green pinwheel panels, gold seams
function drawFootball(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  const base = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.15, 0, 0, r);
  base.addColorStop(0, "#ffffff");
  base.addColorStop(0.75, "#f1f1ee");
  base.addColorStop(1, "#d8d8d3");
  ctx.fillStyle = base;
  ctx.fill();
  ctx.clip();

  // the three curved panels spin with the ball
  ctx.rotate(angle);
  const panels = ["#e4002b", "#0033a0", "#00953b"];
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate((i * 2 * Math.PI) / 3);
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.1);
    ctx.quadraticCurveTo(r * 0.55, -r * 0.5, r * 1.02, -r * 0.12);
    ctx.quadraticCurveTo(r * 0.72, r * 0.14, r * 0.45, r * 0.3);
    ctx.quadraticCurveTo(r * 0.16, r * 0.2, r * 0.06, -r * 0.1);
    ctx.closePath();
    ctx.fillStyle = panels[i];
    ctx.fill();
    ctx.strokeStyle = "rgba(200, 169, 81, 0.9)";
    ctx.lineWidth = Math.max(1, r * 0.05);
    ctx.stroke();
    ctx.restore();
  }
  ctx.rotate(-angle);

  // sheen + soft bottom shading (doesn't spin)
  const sheen = ctx.createRadialGradient(-r * 0.35, -r * 0.45, r * 0.05, 0, 0, r);
  sheen.addColorStop(0, "rgba(255,255,255,0.55)");
  sheen.addColorStop(0.5, "rgba(255,255,255,0)");
  sheen.addColorStop(1, "rgba(0,0,0,0.20)");
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = sheen;
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.stroke();
}

function drawWin(ctx: CanvasRenderingContext2D, W: number, H: number, winner: "ai" | "me", aiScore: number, meScore: number) {
  ctx.save();
  ctx.fillStyle = "rgba(4,17,10,0.72)";
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const youWon = winner === "me";
  ctx.fillStyle = youWon ? "#d6ac63" : "#6f9fc4";
  ctx.font = `900 64px ${CANVAS_FONT}`;
  ctx.fillText(youWon ? "YOU WIN! 🏆" : "AI WINS", W / 2, H / 2 - 60);
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 38px ${CANVAS_FONT}`;
  ctx.fillText(`${aiScore}  :  ${meScore}`, W / 2, H / 2 + 10);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `600 20px ${CANVAS_FONT}`;
  ctx.fillText("Tap or press Space to play again", W / 2, H / 2 + 70);
  ctx.restore();
}

function drawPauseOverlay(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.save();
  ctx.fillStyle = "rgba(4,17,10,0.55)";
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#e8ede4";
  ctx.font = `900 64px ${CANVAS_FONT}`;
  ctx.fillText("PAUSED", W / 2, H / 2 - 10);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `600 20px ${CANVAS_FONT}`;
  ctx.fillText("Press P or tap Resume to continue", W / 2, H / 2 + 44);
  ctx.restore();
}

export default Game;
