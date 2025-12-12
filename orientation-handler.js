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
        overlay.style.background = "white";    // ← Hintergrund jetzt komplett weiß
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "99999";
        overlay.style.visibility = "hidden";

        // Minimalistischer Spinner
        const spinner = document.createElement("div");
        spinner.style.width = "40px";
        spinner.style.height = "40px";
        spinner.style.border = "4px solid rgba(0,0,0,0.15)";
        spinner.style.borderTopColor = "black";
        spinner.style.borderRadius = "50%";
        spinner.style.animation = "spin 0.8s linear infinite";

        overlay.appendChild(spinner);
        document.body.appendChild(overlay);

        // Keyframes für Spinner (nur 1x einfügen)
        const style = document.createElement("style");
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    function showOverlayBriefly() {
        if (!overlay) return;

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
