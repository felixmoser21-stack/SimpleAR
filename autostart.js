// Autostart script for index_tracker.html
// This script checks for the autostart parameter and automatically calls StartAR()

(function() {
    // Check if autostart parameter is present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const autostart = urlParams.get('autostart');
    
    if (autostart === 'true') {
        console.log('Autostart parameter detected - will start AR automatically');
        
        // Hide the startARDiv immediately
        const startARDiv = document.getElementById('startARDiv');
        if (startARDiv) {
            startARDiv.style.display = 'none';
        }
        
        // Wait for StartAR function to be available, then call it
        const checkAndStart = setInterval(function() {
            if (typeof StartAR === 'function') {
                console.log('StartAR function found - starting AR...');
                clearInterval(checkAndStart);
                StartAR();
            }
        }, 100); // Check every 100ms
        
        // Timeout after 5 seconds
        setTimeout(function() {
            clearInterval(checkAndStart);
            if (typeof StartAR !== 'function') {
                console.error('StartAR function not found after 5 seconds');
            }
        }, 5000);
    }
})();
