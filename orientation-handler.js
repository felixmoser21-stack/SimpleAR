(function() {
    let overlay = null;

    function createOverlay() {
        overlay = document.createElement("div");
        overlay.id = "orientation-overlay";

        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "white"; // voller weißer Hintergrund
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "99999";
        overlay.style.visibility = "hidden";

        // Logo als "Spinner"
        const logo = document.createElement("img");
        logo.src = "storiies-logo.png";     // ggf. Pfad anpassen
        logo.alt = "STORIES Logo";
        logo.style.width = "140px";         // kannst du anpassen
        logo.style.height = "auto";
        logo.style.animation = "spin-logo 1s linear 1"; // einmal drehen in 1 Sek.

        overlay.appendChild(logo);
        document.body.appendChild(overlay);

        // Keyframes für die Logo-Drehung
        const style = document.createElement("style");
        style.textContent = `
            @keyframes spin-logo {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }

            /* Falls du später andere Elemente mit der Animation nutzen willst */
            #orientation-overlay img {
                transform-origin: center center;
            }
        `;
        document.head.appendChild(style);
    }

    function showOverlayBriefly() {
        if (!overlay) return;

        // Animation zurücksetzen, damit sie bei jedem Dreh neu startet
        const logo = overlay.querySelector("img");
        if (logo) {
            logo.style.animation = "none";
            // Reflow erzwingen, damit CSS-Animation neu startet
            void logo.offsetWidth;
            logo.style.animation = "spin-logo 1s linear 1";
        }

        overlay.style.visibility = "visible";

        setTimeout(() => {
            overlay.style.visibility = "hidden";
        }, 1000); // 1 Sekunde sichtbar
    }

    function handleOrientation() {
        showOverlayBriefly();
    }

    window.addEventListener("orientationchange", handleOrientation);

    document.addEventListener("DOMContentLoaded", () => {
        createOverlay();
    });
})();
