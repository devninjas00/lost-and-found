const firebaseConfig = {
    apiKey: "AIzaSyBcoa2LEXqWzV9otofqKB7gpYzAVbGaaYQ",
    authDomain: "lost-and-found-5fee0.firebaseapp.com",
    databaseURL: "https://lost-and-found-5fee0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lost-and-found-5fee0",
    storageBucket: "lost-and-found-5fee0.appspot.com",
    messagingSenderId: "454929712249",
    appId: "1:454929712249:web:09c49e8ac660d1c6fc40a8",
    measurementId: "G-FYN1K8CCLR"
};

firebase.initializeApp(firebaseConfig)

const data = firebase.database()




const form = document.getElementById("form")
const itemlist = document.getElementById("itemlist")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const items = document.getElementById("item").value
    const desc = document.getElementById("textarea").value
    const loc = document.getElementById("location").value
    const name = document.getElementById("name").value
    const contact = document.getElementById("contact").value
    const status = document.getElementById("status").value
    const identity = document.getElementById("identity").value

    const item = {
        name: name,
        items: items,
        desc: desc,
        loc: loc,
        contact: contact,
        identity: identity,
        date: new Date().toLocaleString(),
        status: status

    }


    data.ref("iit").push(item)

    form.reset()

});


data.ref("iit").on("child_added", (snapshot) => {
    const item = snapshot.val()
    displayitem(item)
});
function displayitem(item) {
    const div = document.createElement("div")
    div.classList.add("msg")
    div.innerHTML = `
    <h1>MAI HU ${item.name}</h1>
    <h3>item name: ${item.items}</h3>
    <p>item description: ${item.desc}</p>
    <p>item location: ${item.loc}</p>
    <p>item contact: ${item.contact}</p>
    <p>item identity: ${item.identity}</p>
    <p>item date: ${item.date}</p>
    <p>item status: ${item.status}</p>
    `
    itemlist.appendChild(div)
}








function searchAndScroll() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const items = document.querySelectorAll(".item");
    let found = false;

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query) && !found) {
            item.scrollIntoView({ behavior: "smooth", block: "center" });
            item.style.backgroundColor = "#ffeaa7"; // Optional highlight
            setTimeout(() => item.style.backgroundColor = "", 2000); // Remove highlight
            found = true;
        }
    });

    if (!found) {
        alert("Item not found!");
    }
}


"use strict";

const screen = document.getElementById("screen");

// Debug: Check if screen element is found
console.log("Dragon screen element:", screen);

// Only initialize dragon animation if screen element exists
if (screen) {
    console.log("Initializing dragon animation...");
    const xmlns = "http://www.w3.org/2000/svg";
    const xlinkns = "http://www.w3.org/1999/xlink";

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    console.log("Device type:", isMobile ? "Mobile" : "PC");

    // Dragon movement variables
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentEdge = 0; // 0=top, 1=right, 2=bottom, 3=left
    let edgeProgress = 0;
    let lastEdgeChange = 0;
    let attackMode = false;
    let attackStartTime = 0;
    let lastAttack = 0;

    // Special effects arrays
    const thunderBolts = [];
    const fireBalls = [];
    const effects = [];

    // Create thunder bolt effect
    const createThunderBolt = (x, y) => {
        const thunder = document.createElementNS(xmlns, "path");
        const zigzagPath = generateZigzagPath(x, y, x + Math.random() * 200 - 100, y + 150 + Math.random() * 100);
        thunder.setAttributeNS(null, "d", zigzagPath);
        thunder.setAttributeNS(null, "stroke", "#00FFFF");
        thunder.setAttributeNS(null, "stroke-width", "3");
        thunder.setAttributeNS(null, "fill", "none");
        thunder.setAttributeNS(null, "filter", "drop-shadow(0 0 10px #00FFFF)");
        thunder.style.opacity = "0";
        screen.appendChild(thunder);

        // Animate thunder
        let opacity = 1;
        let flickerCount = 0;
        const thunderAnim = () => {
            flickerCount++;
            opacity = Math.random() > 0.5 ? 1 : 0.3;
            thunder.style.opacity = opacity;
            thunder.setAttributeNS(null, "stroke-width", 2 + Math.random() * 3);

            if (flickerCount < 10) {
                setTimeout(thunderAnim, 50 + Math.random() * 100);
            } else {
                screen.removeChild(thunder);
            }
        };
        thunderAnim();
    };

    // Generate zigzag lightning path
    const generateZigzagPath = (x1, y1, x2, y2) => {
        let path = `M ${x1} ${y1}`;
        const steps = 8;
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 40;
            const y = y1 + (y2 - y1) * t;
            path += ` L ${x} ${y}`;
        }
        return path;
    };

    // Create fire ball effect
    const createFireBall = (x, y, targetX, targetY) => {
        const fireBall = document.createElementNS(xmlns, "circle");
        fireBall.setAttributeNS(null, "cx", x);
        fireBall.setAttributeNS(null, "cy", y);
        fireBall.setAttributeNS(null, "r", "8");
        fireBall.setAttributeNS(null, "fill", "url(#fireGradient)");
        fireBall.setAttributeNS(null, "filter", "drop-shadow(0 0 15px #FF4500)");
        screen.appendChild(fireBall);

        let currentX = x;
        let currentY = y;
        const speed = 5;
        const dx = (targetX - x) / 100;
        const dy = (targetY - y) / 100;

        const animateFireBall = () => {
            currentX += dx * speed;
            currentY += dy * speed;
            fireBall.setAttributeNS(null, "cx", currentX);
            fireBall.setAttributeNS(null, "cy", currentY);

            // Add fire trail effect
            const trail = document.createElementNS(xmlns, "circle");
            trail.setAttributeNS(null, "cx", currentX);
            trail.setAttributeNS(null, "cy", currentY);
            trail.setAttributeNS(null, "r", "4");
            trail.setAttributeNS(null, "fill", "#FF6600");
            trail.style.opacity = "0.6";
            screen.appendChild(trail);

            setTimeout(() => {
                if (screen.contains(trail)) screen.removeChild(trail);
            }, 200);

            if (Math.abs(currentX - targetX) > 10 || Math.abs(currentY - targetY) > 10) {
                requestAnimationFrame(animateFireBall);
            } else {
                // Explosion effect
                createExplosion(currentX, currentY);
                if (screen.contains(fireBall)) screen.removeChild(fireBall);
            }
        };
        animateFireBall();
    };

    // Create explosion effect
    const createExplosion = (x, y) => {
        for (let i = 0; i < 8; i++) {
            const spark = document.createElementNS(xmlns, "circle");
            spark.setAttributeNS(null, "cx", x);
            spark.setAttributeNS(null, "cy", y);
            spark.setAttributeNS(null, "r", "3");
            spark.setAttributeNS(null, "fill", "#FFD700");
            spark.setAttributeNS(null, "filter", "drop-shadow(0 0 8px #FFD700)");
            screen.appendChild(spark);

            const angle = (i / 8) * Math.PI * 2;
            const speed = 3 + Math.random() * 3;
            let distance = 0;

            const animateSpark = () => {
                distance += speed;
                const sparkX = x + Math.cos(angle) * distance;
                const sparkY = y + Math.sin(angle) * distance;
                spark.setAttributeNS(null, "cx", sparkX);
                spark.setAttributeNS(null, "cy", sparkY);
                spark.style.opacity = Math.max(0, 1 - distance / 50);

                if (distance < 50) {
                    requestAnimationFrame(animateSpark);
                } else {
                    if (screen.contains(spark)) screen.removeChild(spark);
                }
            };
            animateSpark();
        }
    };

    // Add fire gradient to SVG
    const defs = screen.querySelector("defs") || screen.appendChild(document.createElementNS(xmlns, "defs"));
    const fireGradient = document.createElementNS(xmlns, "radialGradient");
    fireGradient.setAttributeNS(null, "id", "fireGradient");
    fireGradient.innerHTML = `
        <stop offset="0%" stop-color="#FFD700"/>
        <stop offset="50%" stop-color="#FF4500"/>
        <stop offset="100%" stop-color="#FF0000"/>
    `;
    defs.appendChild(fireGradient);

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
    };

    let width, height;
    window.addEventListener("resize", () => resize(), false);
    resize();

    const prepend = (use, i) => {
        const elem = document.createElementNS(xmlns, "use");
        elems[i].use = elem;
        elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
        screen.appendChild(elem);
    };

    const N = 14;
    const elems = [];
    for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };

    // Initialize pointer position based on device type
    const pointer = isMobile ?
        { x: width / 2, y: height / 2 } :
        { x: 100, y: 100 }; // Start at top-left for PC auto mode

    const radm = Math.min(width, height) / 4;
    let frm = Math.random();
    let rad = 0;

    if (isMobile) {
        // Mobile: Perimeter tracing movement
        let mobileEdge = 0; // 0=top, 1=right, 2=bottom, 3=left
        let mobileProgress = 0;

        const updateMobileDragonTarget = () => {
            const margin = 50;

            // Move along perimeter
            mobileProgress += 0.005; // Slow movement speed

            if (mobileProgress > 1) {
                mobileProgress = 0;
                mobileEdge = (mobileEdge + 1) % 4; // Next edge
            }

            // Calculate position based on current edge
            switch (mobileEdge) {
                case 0: // Top edge
                    pointer.x = margin + (width - 2 * margin) * mobileProgress;
                    pointer.y = margin;
                    break;
                case 1: // Right edge
                    pointer.x = width - margin;
                    pointer.y = margin + (height - 2 * margin) * mobileProgress;
                    break;
                case 2: // Bottom edge
                    pointer.x = width - margin - (width - 2 * margin) * mobileProgress;
                    pointer.y = height - margin;
                    break;
                case 3: // Left edge
                    pointer.x = margin;
                    pointer.y = height - margin - (height - 2 * margin) * mobileProgress;
                    break;
            }
        };

        // Update mobile dragon position continuously
        setInterval(updateMobileDragonTarget, 50); // Update every 50ms
    } else {
        // PC: Automatic movement around edges
        const updateDragonTarget = () => {
            const margin = 100;
            const now = Date.now();

            // Random chance to switch to a different edge (5% chance every frame)
            if (Math.random() < 0.005 && now - lastEdgeChange > 3000) {
                currentEdge = Math.floor(Math.random() * 4);
                edgeProgress = Math.random();
                lastEdgeChange = now;
            }

            // Move along current edge
            edgeProgress += 0.003 + Math.random() * 0.002;
            if (edgeProgress > 1) {
                edgeProgress = 0;
                currentEdge = (currentEdge + 1) % 4;
            }

            // Calculate position based on current edge
            switch (currentEdge) {
                case 0: // Top edge
                    targetX = margin + (width - 2 * margin) * edgeProgress;
                    targetY = margin;
                    break;
                case 1: // Right edge
                    targetX = width - margin;
                    targetY = margin + (height - 2 * margin) * edgeProgress;
                    break;
                case 2: // Bottom edge
                    targetX = width - margin - (width - 2 * margin) * edgeProgress;
                    targetY = height - margin;
                    break;
                case 3: // Left edge
                    targetX = margin;
                    targetY = height - margin - (height - 2 * margin) * edgeProgress;
                    break;
            }

            pointer.x = targetX;
            pointer.y = targetY;
        };

        // Update target position regularly
        setInterval(updateDragonTarget, 16); // ~60fps
    }

    for (let i = 1; i < N; i++) {
        if (i === 1) prepend("Cabeza", i);
        else if (i === 4 || i === 8) prepend("Aletas", i);
        else prepend("Espina", i);
    }

    const updateDragonGlow = () => {
        let totalDistance = 0;
        for (let i = 1; i < N; i++) {
            const dx = elems[i].x - elems[i - 1].x;
            const dy = elems[i].y - elems[i - 1].y;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }

        const avgDistance = totalDistance / (N - 1);
        const isStretched = avgDistance > 25;

        for (let i = 1; i < N; i++) {
            const elem = elems[i].use;
            if (elem) {
                elem.classList.remove('dragon-stretched', 'dragon-collapsed', 'dragon-head', 'dragon-fins');

                if (i === 1) {
                    elem.classList.add('dragon-head');
                } else if (i === 4 || i === 8) {
                    elem.classList.add('dragon-fins');
                } else {
                    elem.classList.add(isStretched ? 'dragon-stretched' : 'dragon-collapsed');
                }
            }
        }
    };

    const run = () => {
        requestAnimationFrame(run);
        let e = elems[0];
        const ax = (Math.cos(3 * frm) * rad * width) / height;
        const ay = (Math.sin(4 * frm) * rad * height) / width;
        e.x += (ax + pointer.x - e.x) / 10;
        e.y += (ay + pointer.y - e.y) / 10;

        for (let i = 1; i < N; i++) {
            let e = elems[i];
            let ep = elems[i - 1];
            const a = Math.atan2(e.y - ep.y, e.x - ep.x);
            e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
            e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;

            // Scale smaller for mobile devices
            const baseScale = isMobile ?
                (70 + 2 * (1 - i)) / 90 :   // Mobile: smaller but visible
                (120 + 3 * (1 - i)) / 70;   // PC: original size
            const s = baseScale;
            e.use.setAttributeNS(
                null,
                "transform",
                `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a
                }) translate(${0},${0}) scale(${s},${s})`
            );
        }

        updateDragonGlow();

        if (rad < radm) rad++;
        frm += 0.003;
        if (rad > 60) {
            pointer.x += (width / 2 - pointer.x) * 0.05;
            pointer.y += (height / 2 - pointer.y) * 0.05;
        }
    };

    run();
}

