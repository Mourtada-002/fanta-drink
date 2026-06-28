// --- REGISTRE GSAP ---
gsap.registerPlugin(ScrollTrigger);

const canContainer = document.getElementById("can-img-container");
const canImg = document.getElementById("can-img");

const isMobile = () => window.innerWidth < 768;
const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

function getPositions() {
  if (isMobile()) {
    return {
      hero: { left: "50%", top: "28%", w: 170, h: 265, rot: 0, scale: 1.0 },
      section2: {
        left: "50%",
        top: "28%",
        w: 160,
        h: 248,
        rot: 6,
        scale: 0.95,
      },
      section3: {
        left: "50%",
        top: "28%",
        w: 175,
        h: 272,
        rot: -4,
        scale: 1.0,
      },
      section4: { left: "50%", top: "38%", w: 195, h: 302, rot: 2, scale: 1.1 },
      section5: {
        left: "50%",
        top: "26%",
        w: 155,
        h: 240,
        rot: -5,
        scale: 0.88,
      },
    };
  }
  if (isTablet()) {
    return {
      hero: { left: "70%", top: "50%", w: 260, h: 400, rot: 3, scale: 1.0 },
      section2: {
        left: "30%",
        top: "48%",
        w: 240,
        h: 370,
        rot: -5,
        scale: 0.93,
      },
      section3: {
        left: "70%",
        top: "50%",
        w: 265,
        h: 408,
        rot: 4,
        scale: 1.02,
      },
      section4: {
        left: "50%",
        top: "50%",
        w: 295,
        h: 455,
        rot: 0,
        scale: 1.15,
      },
      section5: {
        left: "68%",
        top: "45%",
        w: 225,
        h: 348,
        rot: -7,
        scale: 0.87,
      },
    };
  }
  return {
    hero: { left: "72%", top: "50%", w: 340, h: 520, rot: 3, scale: 1.0 },
    section2: { left: "28%", top: "48%", w: 310, h: 480, rot: -6, scale: 0.92 },
    section3: { left: "72%", top: "50%", w: 345, h: 530, rot: 4, scale: 1.03 },
    section4: { left: "50%", top: "50%", w: 390, h: 600, rot: 0, scale: 1.18 },
    section5: { left: "70%", top: "45%", w: 295, h: 455, rot: -8, scale: 0.87 },
  };
}

function applyCanPos(pos) {
  canContainer.style.left = pos.left;
  canContainer.style.top = pos.top;
  canContainer.style.width = pos.w + "px";
  canContainer.style.height = pos.h + "px";
}

// --- SECTION C: ANIMATION D'ENTRÉE (DROP-IN) ---
window.addEventListener("load", () => {
  const pos = getPositions();
  applyCanPos(pos.hero);

  canImg.classList.remove("idle-float", "spinning");
  void canImg.offsetWidth;

  // Animation d'entrée en chute
  canImg.classList.add("drop-in");
  canImg.addEventListener(
    "animationend",
    () => {
      canImg.classList.remove("drop-in");
      canImg.classList.add("idle-float");
    },
    { once: true },
  );
});

// --- GSAP SCROLLTRIGGER POUR LA CANETTE ---
function setupScrollAnimations() {
  ScrollTrigger.getAll().forEach((t) => t.kill());

  const pos = getPositions();
  applyCanPos(pos.hero);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  });

  // Hero → Section 2
  tl.to(
    canContainer,
    {
      left: pos.section2.left,
      top: pos.section2.top,
      width: pos.section2.w,
      height: pos.section2.h,
      ease: "power1.inOut",
    },
    0,
  );
  tl.to(
    canImg,
    {
      rotation: pos.section2.rot,
      scale: pos.section2.scale,
      ease: "power1.inOut",
    },
    0,
  );

  // Section 2 → Section 3
  tl.to(
    canContainer,
    {
      left: pos.section3.left,
      top: pos.section3.top,
      width: pos.section3.w,
      height: pos.section3.h,
      ease: "power1.inOut",
    },
    1,
  );
  tl.to(
    canImg,
    {
      rotation: pos.section3.rot,
      scale: pos.section3.scale,
      ease: "power1.inOut",
    },
    1,
  );

  // Section 3 → Section 4 (Stats zoom)
  tl.to(
    canContainer,
    {
      left: pos.section4.left,
      top: pos.section4.top,
      width: pos.section4.w,
      height: pos.section4.h,
      ease: "power1.inOut",
    },
    2,
  );
  tl.to(
    canImg,
    {
      rotation: pos.section4.rot,
      scale: pos.section4.scale,
      ease: "power1.inOut",
    },
    2,
  );

  // Section 4 → Section 5 (CTA)
  tl.to(
    canContainer,
    {
      left: pos.section5.left,
      top: pos.section5.top,
      width: pos.section5.w,
      height: pos.section5.h,
      ease: "power1.inOut",
    },
    3,
  );
  tl.to(
    canImg,
    {
      rotation: pos.section5.rot,
      scale: pos.section5.scale,
      ease: "power1.inOut",
    },
    3,
  );
}

// --- SECTION E: SÉLECTION DE SAVEUR ---
let currentFlavor = "orange";

function selectFlavor(flavor) {
  if (currentFlavor === flavor) return;
  currentFlavor = flavor;

  // E1. Animation de spin sur la canette (CSS class)
  canImg.classList.remove("idle-float", "spinning");
  void canImg.offsetWidth;
  canImg.classList.add("spinning");
  canImg.addEventListener(
    "animationend",
    () => {
      canImg.classList.remove("spinning");
      canImg.classList.add("idle-float");
    },
    { once: true },
  );

  // E2. Teintes du filtre drop-shadow selon la saveur
  const shadowColors = {
    orange: "rgba(255, 100, 0, 0.45)",
    grape: "rgba(142, 36, 170, 0.45)",
    lemon: "rgba(175, 180, 43, 0.50)",
  };
  canImg.style.filter = `drop-shadow(0 30px 60px ${shadowColors[flavor]}) drop-shadow(0 10px 20px rgba(0,0,0,0.5))`;

  // E3. Transition de fond
  gsap.to(["#bg-orange", "#bg-grape", "#bg-lemon"], {
    opacity: 0,
    duration: 0.8,
  });
  gsap.to(`#bg-${flavor}`, { opacity: 1, duration: 0.8 });

  // E4. Variables CSS thème
  const themes = {
    orange: {
      primary: "#ff7c00",
      dark: "#e64a19",
      glow: "rgba(255, 124, 0, 0.4)",
    },
    grape: {
      primary: "#8e24aa",
      dark: "#4a148c",
      glow: "rgba(142, 36, 170, 0.4)",
    },
    lemon: {
      primary: "#afb42b",
      dark: "#689f38",
      glow: "rgba(175, 180, 43, 0.4)",
    },
  };
  const t = themes[flavor];
  document.documentElement.style.setProperty("--theme-primary", t.primary);
  document.documentElement.style.setProperty("--theme-primary-dark", t.dark);
  document.documentElement.style.setProperty("--theme-primary-glow", t.glow);

  // E5. Boutons actifs / inactifs
  document.querySelectorAll(".flavor-btn").forEach((btn) => {
    btn.classList.remove("bg-white/5");
    btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
    const span = btn.querySelector("span:last-child");
    if (span) {
      span.classList.add("opacity-0");
      span.innerHTML = 'Sélectionner <span class="arrow-indicator">➔</span>';
    }
  });

  const activeBtn = document.getElementById(`btn-${flavor}`);
  if (activeBtn) {
    activeBtn.classList.add("bg-white/5");
    activeBtn.style.borderColor = t.primary + "99";
    const span = activeBtn.querySelector("span:last-child");
    if (span) {
      span.classList.remove("opacity-0");
      span.innerHTML = 'Actif <span class="arrow-indicator">➔</span>';
      span.style.color = t.primary;
    }
  }

  // E6. Transition couleur bulles
  transitionBubbleColors(flavor);
}

// --- SECTION F: BULLES FLOTTANTES (CANVAS) ---
const bubbleCanvas = document.getElementById("bubble-canvas");
const bCtx = bubbleCanvas.getContext("2d");

let bubbles = [];
const bubbleCount = 45;

let bubbleColorObj = {
  c1: { r: 255, g: 124, b: 0 },
  c2: { r: 255, g: 224, b: 130 },
};

let bubbleColor1 = "rgba(255, 124, 0, 0.15)";
let bubbleColor2 = "rgba(255, 224, 130, 0.08)";

function transitionBubbleColors(flavor) {
  const targets = {
    orange: { c1: { r: 255, g: 124, b: 0 }, c2: { r: 255, g: 224, b: 130 } },
    grape: { c1: { r: 142, g: 36, b: 170 }, c2: { r: 225, g: 190, b: 231 } },
    lemon: { c1: { r: 175, g: 180, b: 43 }, c2: { r: 255, g: 245, b: 157 } },
  };
  const tc = targets[flavor];

  gsap.to(bubbleColorObj.c1, {
    r: tc.c1.r,
    g: tc.c1.g,
    b: tc.c1.b,
    duration: 0.8,
    onUpdate: () => {
      bubbleColor1 = `rgba(${Math.round(bubbleColorObj.c1.r)}, ${Math.round(bubbleColorObj.c1.g)}, ${Math.round(bubbleColorObj.c1.b)}, 0.15)`;
      bubbleColor2 = `rgba(${Math.round(bubbleColorObj.c2.r)}, ${Math.round(bubbleColorObj.c2.g)}, ${Math.round(bubbleColorObj.c2.b)}, 0.08)`;
    },
  });
  gsap.to(bubbleColorObj.c2, {
    r: tc.c2.r,
    g: tc.c2.g,
    b: tc.c2.b,
    duration: 0.8,
  });
}

// Mouse tracking
let mouse = { x: -1000, y: -1000 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

class Bubble {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.radius = 3 + Math.random() * 20;
    this.x = Math.random() * bubbleCanvas.width;
    this.y = initial
      ? Math.random() * bubbleCanvas.height
      : bubbleCanvas.height + this.radius + 10;
    this.speedY = 0.4 + Math.random() * 1.2;
    this.speedX = -0.3 + Math.random() * 0.6;
    this.oscSpeed = 0.005 + Math.random() * 0.015;
    this.oscDist = 0.4 + Math.random() * 1.2;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = 0.08 + Math.random() * 0.28;
  }
  update() {
    this.y -= this.speedY;
    this.angle += this.oscSpeed;
    this.x += Math.sin(this.angle) * this.oscDist * 0.4 + this.speedX;
    if (mouse.x !== -1000) {
      const dx = this.x - mouse.x,
        dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        const f = (160 - dist) / 160;
        this.x += (dx / dist) * f * 5;
        this.y += (dy / dist) * f * 2;
      }
    }
    if (
      this.y < -this.radius ||
      this.x < -this.radius ||
      this.x > bubbleCanvas.width + this.radius
    ) {
      this.reset(false);
    }
  }
  draw() {
    bCtx.beginPath();
    const grad = bCtx.createRadialGradient(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      this.radius * 0.1,
      this.x,
      this.y,
      this.radius,
    );
    grad.addColorStop(
      0,
      bubbleColor2.replace("0.08", (this.opacity * 1.6).toFixed(2)),
    );
    grad.addColorStop(1, bubbleColor1.replace("0.15", this.opacity.toFixed(2)));
    bCtx.fillStyle = grad;
    bCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    bCtx.fill();
    // Reflet lumineux
    bCtx.beginPath();
    bCtx.fillStyle = "rgba(255,255,255,0.35)";
    bCtx.arc(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      this.radius * 0.15,
      0,
      Math.PI * 2,
    );
    bCtx.fill();
  }
}

function initBubbles() {
  bubbles = [];
  for (let i = 0; i < bubbleCount; i++) bubbles.push(new Bubble());
}

function animateBubbles() {
  bCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
  bubbles.forEach((b) => {
    b.update();
    b.draw();
  });
  requestAnimationFrame(animateBubbles);
}

function resizeCanvas() {
  bubbleCanvas.width = window.innerWidth;
  bubbleCanvas.height = window.innerHeight;
  setupScrollAnimations();
}
window.addEventListener("resize", resizeCanvas);

// --- SECTION G: INITIALISATION ---
bubbleCanvas.width = window.innerWidth;
bubbleCanvas.height = window.innerHeight;
initBubbles();
animateBubbles();
setupScrollAnimations();
