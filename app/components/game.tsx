"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Soccer air-hockey, orientation-aware.
 *  - Landscape (desktop): goals on the LEFT (AI) and RIGHT (you).
 *  - Portrait  (mobile):  goals on the TOP (AI) and BOTTOM (you).
 * Round mallets move freely in 2D within each half (drag with mouse / touch,
 * or keys) and push the puck. The puck is one of your skill balls; the next
 * skill steps in after every goal. First to 5 wins. Pause with the button,
 * the P key, or Esc. Self-contained on a full-screen canvas.
 */

type Cat = "frontend" | "backend" | "cloud" | "data" | "ai";
const CAT_COLOR: Record<Cat, string> = {
  frontend: "#d6ac63",
  backend: "#5fa974",
  cloud: "#7ba3a0",
  data: "#9b8ec4",
  ai: "#c47c64",
};

const SKILLS: { label: string; cat: Cat; r: number; speed: number; points: number }[] = [
  { label: "Node", cat: "backend", r: 23, speed: 6.0, points: 1 },
  { label: "React", cat: "frontend", r: 21, speed: 7.0, points: 1 },
  { label: "Py", cat: "backend", r: 20, speed: 7.8, points: 1 },
  { label: "TS", cat: "frontend", r: 18, speed: 8.8, points: 2 },
  { label: "AWS", cat: "cloud", r: 17, speed: 10.0, points: 2 },
  { label: "GenAI", cat: "ai", r: 15, speed: 11.5, points: 3 },
];

const MALLET_R = 36;
const SPEED_CAP = 17;
const AI_COLOR = "#6f9fc4";
const ME_COLOR = "#d6ac63";

type Mallet = { x: number; y: number; px: number; py: number; vx: number; vy: number; manualUntil: number };
type Puck = { x: number; y: number; vx: number; vy: number; r: number; base: number; angle: number; idx: number };

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

    // your photo on the player's keeper, AI motif on the AI's keeper
    const faceImg = new Image();
    faceImg.src = "/amith.jpeg";
    const aiImg = new Image();
    aiImg.onerror = () => { if (!aiImg.src.endsWith("/ai.svg")) aiImg.src = "/ai.svg"; };
    aiImg.src = "/ai.png";

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    let vertical = H > W; // portrait => goals on top/bottom
    let now = 0;

    const ai: Mallet = { x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0, manualUntil: 0 };
    const me: Mallet = { x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0, manualUntil: 0 };
    const puck: Puck = { x: 0, y: 0, vx: 0, vy: 0, r: SKILLS[0].r, base: SKILLS[0].speed, angle: 0, idx: 0 };
    const score = { ai: 0, me: 0 };
    const keys: Record<string, boolean> = {};
    const WIN = 5;
    let winner: "" | "ai" | "me" = "";

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

    const serve = (idx: number, towardAI: boolean) => {
      const s = SKILLS[idx];
      puck.idx = idx;
      puck.r = s.r;
      puck.base = s.speed;
      puck.x = W / 2;
      puck.y = H / 2;
      const a = (Math.random() - 0.5) * 0.7;
      const main = (towardAI ? -1 : 1) * s.speed * Math.cos(a);
      const side = s.speed * Math.sin(a);
      if (vertical) { puck.vy = main; puck.vx = side; }
      else { puck.vx = main; puck.vy = side; }
    };

    const reset = () => {
      score.ai = 0;
      score.me = 0;
      winner = "";
      serve(0, Math.random() < 0.5);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      vertical = H > W;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      placeMallet(ai, aiHome());
      placeMallet(me, meHome());
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
      const isAI = vertical ? y < H / 2 : x < W / 2;
      const m = isAI ? ai : me;
      m.x = x; m.y = y; m.manualUntil = now + 1500;
      clampMallet(m, isAI);
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

    resize();
    serve(0, Math.random() < 0.5);
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointer);
    canvas.addEventListener("pointermove", onPointer);

    const collide = (m: Mallet) => {
      const dx = puck.x - m.x;
      const dy = puck.y - m.y;
      const dist = Math.hypot(dx, dy);
      const min = puck.r + MALLET_R;
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
      drawLineup(ctx, W, H, puck.idx, vertical);
      drawScore(ctx, W, H, vertical, score.ai, score.me);
      drawMallet(ctx, ai, AI_COLOR, aiImg);
      drawMallet(ctx, me, ME_COLOR, faceImg);
      if (!winner) { drawShadow(ctx, puck.x, puck.y, puck.r); drawPuck(ctx, puck); }
      if (winner) drawWin(ctx, W, H, winner, score.ai, score.me);
    };

    let last = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      now = t;
      const dt = Math.min((t - last) / 16.6667, 1.5);
      last = t;

      if (pausedRef.current && !winner) {
        renderScene();
        drawPauseOverlay(ctx, W, H);
        raf = requestAnimationFrame(loop);
        return;
      }

      const kS = 10 * dt;
      // player (me) keys: arrows
      if (keys["arrowup"]) { me.y -= kS; me.manualUntil = now + 1500; }
      if (keys["arrowdown"]) { me.y += kS; me.manualUntil = now + 1500; }
      if (keys["arrowleft"]) { me.x -= kS; me.manualUntil = now + 1500; }
      if (keys["arrowright"]) { me.x += kS; me.manualUntil = now + 1500; }
      // 2nd player (ai mallet) keys: WASD
      if (keys["w"]) { ai.y -= kS; ai.manualUntil = now + 1500; }
      if (keys["s"]) { ai.y += kS; ai.manualUntil = now + 1500; }
      if (keys["a"]) { ai.x -= kS; ai.manualUntil = now + 1500; }
      if (keys["d"]) { ai.x += kS; ai.manualUntil = now + 1500; }

      // CPU controls the AI mallet unless a human just used it
      if (now > ai.manualUntil) {
        const chasing = vertical ? puck.vy < 0 : puck.vx < 0;
        const home = aiHome();
        const tx = chasing ? puck.x : home.x;
        const ty = chasing ? puck.y : home.y;
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
        if (sp < puck.base) { const k = puck.base / (sp || 1); puck.vx *= k; puck.vy *= k; }
        puck.angle += (sp / puck.r) * dt;

        if (vertical) {
          // side walls (x) always bounce
          if (puck.x < puck.r) { puck.x = puck.r; puck.vx = Math.abs(puck.vx); }
          if (puck.x > W - puck.r) { puck.x = W - puck.r; puck.vx = -Math.abs(puck.vx); }
          // top/bottom bounce except through goal mouth
          const inMouth = puck.x > mA && puck.x < mB;
          if (!inMouth) {
            if (puck.y < puck.r) { puck.y = puck.r; puck.vy = Math.abs(puck.vy); }
            if (puck.y > H - puck.r) { puck.y = H - puck.r; puck.vy = -Math.abs(puck.vy); }
          }
        } else {
          if (puck.y < puck.r) { puck.y = puck.r; puck.vy = Math.abs(puck.vy); }
          if (puck.y > H - puck.r) { puck.y = H - puck.r; puck.vy = -Math.abs(puck.vy); }
          const inMouth = puck.y > mA && puck.y < mB;
          if (!inMouth) {
            if (puck.x < puck.r) { puck.x = puck.r; puck.vx = Math.abs(puck.vx); }
            if (puck.x > W - puck.r) { puck.x = W - puck.r; puck.vx = -Math.abs(puck.vx); }
          }
        }

        collide(ai);
        collide(me);

        // goals: AI defends first edge (left/top), you defend second (right/bottom)
        const pts = SKILLS[puck.idx].points;
        const aiConceded = vertical ? puck.y < -puck.r : puck.x < -puck.r;
        const meConceded = vertical ? puck.y > H + puck.r : puck.x > W + puck.r;
        if (aiConceded) {
          score.me += pts;
          if (score.me >= WIN) winner = "me"; else serve((puck.idx + 1) % SKILLS.length, true);
        } else if (meConceded) {
          score.ai += pts;
          if (score.ai >= WIN) winner = "ai"; else serve((puck.idx + 1) % SKILLS.length, false);
        }
      }

      renderScene();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointer);
      canvas.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <main style={{ position: "relative", margin: 0, width: "100vw", height: "100vh", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100vw", height: "100vh", cursor: "pointer", touchAction: "none" }}
      />

      {/* contact icons (top-left) */}
      <div style={{ position: "absolute", top: 24, left: "4%", display: "flex", flexDirection: "row", gap: 18, zIndex: 10 }}>
        <a className="goal-icon" href="https://www.linkedin.com/in/amithlakshmisha/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
        </a>
        <a className="goal-icon" href="https://github.com/amithlakshmisha" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 00-3.162 19.475c.5.1.685-.216.685-.48 0-.237-.008-.866-.013-1.7-2.782.604-3.37-1.338-3.37-1.338-.454-1.152-1.11-1.457-1.11-1.457-.908-.62.069-.607.069-.607 1.003.07 1.532 1.03 1.532 1.03.893 1.53 2.344 1.088 2.916.83.09-.646.35-1.087.637-1.337-2.22-.25-4.554-1.11-4.554-4.936 0-1.09.39-1.984 1.032-2.68-.103-.25-.448-1.267.098-2.635 0 0 .837-.267 2.75 1.02a9.61 9.61 0 012.51-.34 9.58 9.58 0 012.51.34c1.913-1.287 2.748-1.02 2.748-1.02.547 1.368.202 2.385.1 2.635.643.696 1.03 1.59 1.03 2.68 0 3.835-2.338 4.684-4.567 4.928.36.31.68.92.68 1.856 0 1.34-.012 2.425-.012 2.755 0 .267.18.583.69.48A10.006 10.006 0 0012 2z" /></svg>
        </a>
        <a className="goal-icon" href="mailto:amithlakshmisha@gmail.com" aria-label="Email">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
        </a>
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
        .goal-icon { color: #fff; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6)); transition: transform .2s ease, color .2s ease; display: inline-flex; }
        .goal-icon:hover { color: #d6ac63; transform: scale(1.18); }
        .scroll-hint {
          position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
          z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 2px;
          color: #fff; font: 700 12px Inter, system-ui, sans-serif; letter-spacing: 0.14em;
          text-decoration: none; padding: 8px 14px; border-radius: 999px;
          background: rgba(8,20,14,0.55); border: 1px solid rgba(214,176,104,0.5);
          text-shadow: 0 1px 3px rgba(0,0,0,0.6); animation: bob 1.6s ease-in-out infinite;
          transition: color .2s ease, border-color .2s ease;
        }
        .scroll-hint:hover { color: #d6ac63; border-color: #d6ac63; }
        @keyframes bob { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        .pause-btn {
          position: absolute; bottom: 18px; right: 20px; z-index: 10;
          display: inline-flex; align-items: center; gap: 6px;
          font: 700 13px Inter, system-ui, sans-serif; letter-spacing: 0.06em;
          color: #fff; cursor: pointer;
          background: rgba(8,20,14,0.6); border: 1px solid rgba(214,176,104,0.55);
          border-radius: 999px; padding: 8px 16px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
          transition: color .2s ease, border-color .2s ease, transform .15s ease;
        }
        .pause-btn:hover { color: #d6ac63; border-color: #d6ac63; transform: scale(1.05); }
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

// skill lineup; horizontal row (landscape) or vertical column on the right (portrait)
function drawLineup(ctx: CanvasRenderingContext2D, W: number, H: number, activeIdx: number, vertical: boolean) {
  const n = SKILLS.length;
  const r = vertical ? 15 : 18;
  const spacing = r * 2 + (vertical ? 10 : 14);
  for (let i = 0; i < n; i++) {
    let x: number, y: number;
    if (vertical) {
      // vertical column down the right edge, centered
      x = W - 16 - r;
      const total = (n - 1) * spacing;
      y = (H - total) / 2 + i * spacing;
    } else {
      // horizontal row across the top-right
      x = W - 30 - r - (n - 1 - i) * spacing;
      y = 30 + r;
    }
    const s = SKILLS[i];
    const color = CAT_COLOR[s.cat];
    if (i === activeIdx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r + 6, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();
    }
    drawSkillBall(ctx, x, y, r, 0, s.label, color, i === activeIdx ? 1 : 0.8, s.points);
  }
}

function drawSkillBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, _a: number, label: string, color: string, alpha: number, points = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color; ctx.fill();
  const hg = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
  hg.addColorStop(0, "rgba(255,255,255,0.45)");
  hg.addColorStop(0.55, "rgba(255,255,255,0)");
  ctx.fillStyle = hg; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.stroke();

  let fs = r * 0.7;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  do { ctx.font = `800 ${fs}px Inter, system-ui, sans-serif`; if (ctx.measureText(label).width <= r * 1.55) break; fs -= 1; } while (fs > 6);
  ctx.fillStyle = "#0b1f14";
  ctx.fillText(label, x, y + fs * 0.06);

  if (points > 1) {
    const bx = x + r * 0.74;
    const by = y - r * 0.74;
    const br = Math.max(8, r * 0.4);
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = "#0b1f14"; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = color; ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = `800 ${br * 1.1}px Inter, system-ui, sans-serif`;
    ctx.fillText(String(points), bx, by + br * 0.05);
  }
  ctx.restore();
}

function drawScore(ctx: CanvasRenderingContext2D, W: number, H: number, vertical: boolean, aiScore: number, meScore: number) {
  ctx.save();
  ctx.textBaseline = "top";
  if (vertical) {
    // AI mid-left-upper, YOU mid-left-lower (clear of the top/bottom goals)
    ctx.textAlign = "left";
    ctx.font = "800 16px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("AI", 22, H / 2 - 70);
    ctx.font = "900 42px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#6f9fc4";
    ctx.fillText(String(aiScore), 22, H / 2 - 52);
    ctx.font = "800 16px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("YOU", 22, H / 2 + 12);
    ctx.font = "900 42px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#d6ac63";
    ctx.fillText(String(meScore), 22, H / 2 + 30);
  } else {
    ctx.textAlign = "center";
    ctx.font = "800 18px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("AI", W / 2 - 70, 22);
    ctx.fillText("YOU", W / 2 + 70, 22);
    ctx.font = "900 52px Inter, system-ui, sans-serif";
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

function drawPuck(ctx: CanvasRenderingContext2D, p: Puck) {
  const s = SKILLS[p.idx];
  drawSkillBall(ctx, p.x, p.y, p.r, p.angle, s.label, CAT_COLOR[s.cat], 1, s.points);
}

function drawWin(ctx: CanvasRenderingContext2D, W: number, H: number, winner: "ai" | "me", aiScore: number, meScore: number) {
  ctx.save();
  ctx.fillStyle = "rgba(4,17,10,0.72)";
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const youWon = winner === "me";
  ctx.fillStyle = youWon ? "#d6ac63" : "#6f9fc4";
  ctx.font = "900 64px Inter, system-ui, sans-serif";
  ctx.fillText(youWon ? "YOU WIN! 🏆" : "AI WINS", W / 2, H / 2 - 60);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 38px Inter, system-ui, sans-serif";
  ctx.fillText(`${aiScore}  :  ${meScore}`, W / 2, H / 2 + 10);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "600 20px Inter, system-ui, sans-serif";
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
  ctx.font = "900 64px Inter, system-ui, sans-serif";
  ctx.fillText("PAUSED", W / 2, H / 2 - 10);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "600 20px Inter, system-ui, sans-serif";
  ctx.fillText("Press P or tap Resume to continue", W / 2, H / 2 + 44);
  ctx.restore();
}

export default Game;
