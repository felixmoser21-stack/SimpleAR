(function() {
    let overlay = null;
    let lastOrientation = null;

    function getOrientation() {
        // Erst versuchen wir es "offiziell" über matchMedia
        if (window.matchMedia) {
            if (window.matchMedia("(orientation: portrait)").matches) {
                return "portrait";
            }
            if (window.matchMedia("(orientation: landscape)").matches) {
                return "landscape";
            }
        }
        // Fallback: einfach Breite/Höhe vergleichen
        return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    }

    function createOverlay() {
        overlay = document.createElement("div");
        overlay.id = "orientation-overlay";

        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "white";              // voller weißer Hintergrund
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "99999999";               // sicher über Unity-Canvas
        overlay.style.visibility = "hidden";
        overlay.style.pointerEvents = "none";            // Klicks gehen weiter an Unity etc.

        const logo = document.createElement("img");
        logo.src = "storiies-logo.png";                  // Pfad ggf. anpassen
        logo.alt = "STORIES Logo";
        logo.style.width = "140px";
        logo.style.height = "auto";
        logo.style.transformOrigin = "center center";
        // Animation wird dynamisch gesetzt, damit sie bei jedem Dreh neu startet
        overlay.appendChild(logo);

        document.body.appendChild(overlay);

        const style = document.createElement("style");
        style.textContent = `
            @keyframes spin-logo {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    function showOverlayBriefly() {
        if (!overlay) return;

        const logo = overlay.querySelector("img");
        if (logo) {
            // Animation zurücksetzen, damit sie jedes Mal neu startet
            logo.style.animation = "none";
            void logo.offsetWidth; // Reflow erzwingen
            logo.style.animation = "spin-logo 1s linear 1";
        }

        overlay.style.visibility = "visible";

        setTimeout(() => {
            overlay.style.visibility = "hidden";
        }, 1000); // 1 Sekunde sichtbar
    }

    function handleOrientationChange() {
        const current = getOrientation();

        if (!lastOrientation) {
            // Beim ersten Aufruf nur Zustand merken
            lastOrientation = current;
            return;
        }

        if (current !== lastOrientation) {
            lastOrientation = current;
            showOverlayBriefly();
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        createOverlay();
        // Initialen Zustand merken
        lastOrientation = getOrientation();
    });

    // Mehrere Hooks: wir reagieren auf jede sinnvolle Änderung
    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    if (window.screen && window.screen.orientation && window.screen.orientation.addEventListener) {
        window.screen.orientation.addEventListener("change", handleOrientationChange);
    }
})();
