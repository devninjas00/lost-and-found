// Cat SVG and animation logic for jumping on team cards
// This script creates a realistic cat SVG and animates it to jump on #c1, #c2, #c3, #c4 in a loop

// --- SVG CAT DEFINITION ---
function createCatSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const cat = document.createElementNS(svgNS, "svg");
    // Make cat 1/20th the original size (original: 48x38)
    cat.setAttribute("width", "2.4");
    cat.setAttribute("height", "1.9");
    cat.setAttribute("viewBox", "0 0 48 38");
    cat.style.position = "absolute";
    cat.style.left = "0px";
    cat.style.top = "0px";
    cat.style.zIndex = 10000;
    cat.style.pointerEvents = "none";
    cat.style.transition = "transform 0.4s cubic-bezier(.5,1.8,.5,1), left 0.4s, top 0.4s";
    cat.innerHTML = `
        <!-- Tail -->
        <path d="M8 32 Q2 28 10 24 Q18 20 8 14" stroke="#b48a5a" stroke-width="2.5" fill="none"/>
        <!-- Body -->
        <ellipse cx="24" cy="28" rx="15" ry="8" fill="#e2b97f"/>
        <!-- Head -->
        <ellipse cx="24" cy="15" rx="10" ry="9" fill="#e2b97f"/>
        <!-- Ears -->
        <polygon points="14,8 18,2 20,12" fill="#e2b97f" stroke="#b48a5a" stroke-width="1.2"/>
        <polygon points="34,8 30,2 28,12" fill="#e2b97f" stroke="#b48a5a" stroke-width="1.2"/>
        <!-- Eyes -->
        <ellipse cx="20.5" cy="16" rx="1.3" ry="2.1" fill="#222"/>
        <ellipse cx="27.5" cy="16" rx="1.3" ry="2.1" fill="#222"/>
        <ellipse cx="20.2" cy="15.3" rx=".4" ry=".7" fill="#fff" opacity=".7"/>
        <ellipse cx="27.2" cy="15.3" rx=".4" ry=".7" fill="#fff" opacity=".7"/>
        <!-- Nose -->
        <ellipse cx="24" cy="19" rx="1.1" ry=".7" fill="#b48a5a"/>
        <!-- Mouth -->
        <path d="M23 20 Q24 21 25 20" stroke="#b48a5a" stroke-width=".7" fill="none"/>
        <path d="M23.5 20.5 Q24 21.5 24.5 20.5" stroke="#b48a5a" stroke-width=".5" fill="none"/>
        <!-- Whiskers -->
        <path d="M19 19 Q15 19 13 17" stroke="#b48a5a" stroke-width=".6" fill="none"/>
        <path d="M19 20 Q15 21 13 22" stroke="#b48a5a" stroke-width=".6" fill="none"/>
        <path d="M29 19 Q33 19 35 17" stroke="#b48a5a" stroke-width=".6" fill="none"/>
        <path d="M29 20 Q33 21 35 22" stroke="#b48a5a" stroke-width=".6" fill="none"/>
        <!-- Paws -->
        <ellipse cx="16" cy="34" rx="2.2" ry="1.2" fill="#e2b97f"/>
        <ellipse cx="32" cy="34" rx="2.2" ry="1.2" fill="#e2b97f"/>
    `;
    return cat;
}

// --- JUMP ANIMATION LOGIC ---
function animateCatJump(cat, from, to, cb) {
    // Start at from (x, y)
    cat.style.left = (from.x) + "px";
    cat.style.top = (from.y) + "px";
    cat.style.transform = "scale(1)";
    setTimeout(() => {
        // Jump arc: up, then down to to (x, y)
        cat.style.transition = "transform 0.25s cubic-bezier(.5,1.8,.5,1), left 0.5s, top 0.5s";
        cat.style.left = (to.x) + "px";
        cat.style.top = (to.y) + "px";
        cat.style.transform = "scale(1.15,0.85) translateY(-0.5px)";
        setTimeout(() => {
            cat.style.transform = "scale(1)";
            if (cb) setTimeout(cb, 200);
        }, 350);
    }, 100);
}

// --- MAIN LOOP ---
document.addEventListener("DOMContentLoaded", function () {
    let cat = createCatSVG();
    document.body.appendChild(cat);
    // Start at a random position
    function getRandomPos() {
        // Cat SVG is 2.4x1.9, so pad by 1px and cat size
        const padX = 1, padY = 1;
        const catW = 2.4, catH = 1.9;
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Clamp to ensure cat stays fully visible
        let x = padX + Math.random() * (w - catW - 2 * padX);
        let y = padY + Math.random() * (h - catH - 2 * padY);
        x = Math.max(padX, Math.min(x, w - catW - padX));
        y = Math.max(padY, Math.min(y, h - catH - padY));
        return { x, y };
    }
    let current = getRandomPos();
    cat.style.left = (current.x) + "px";
    cat.style.top = (current.y) + "px";
    function jumpToNext() {
        const next = getRandomPos();
        animateCatJump(cat, current, next, () => {
            current = next;
            setTimeout(jumpToNext, 1200 + Math.random() * 800);
        });
    }
    setTimeout(jumpToNext, 1000);
});
