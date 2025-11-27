// Autostart script for index_tracker.html
// This script checks for QR scan completion and automatically starts AR

(function() {
    // Check if coming from QR scanner
    const urlParams = new URLSearchParams(window.location.search);
    const qrScanned = urlParams.get('qr');
    
    // Retrieve QR code content from sessionStorage
    const qrCodeContent = sessionStorage.getItem('qrCodeContent');
    
    // Store globally in window object for Unity access
    if (qrCodeContent) {
        window.QR_CODE_DATA = qrCodeContent;
        console.log('QR Code data loaded:', qrCodeContent);
    }
    
    if (qrScanned === 'scanned' && qrCodeContent) {
        console.log('QR scan detected - will start AR automatically without camera prompt');
        
        // Hide the startARDiv immediately (no camera permission dialog)
        const startARDiv = document.getElementById('startARDiv');
        if (startARDiv) {
            startARDiv.style.display = 'none';
        }
        
        // Wait for StartAR function to be available, then call it
        const checkAndStart = setInterval(function() {
            if (typeof StartAR === 'function') {
                console.log('StartAR function found - starting AR with QR data...');
                clearInterval(checkAndStart);
                
                // Camera permission was already granted during QR scan
                // So we can start AR directly
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
    } else if (!qrCodeContent && qrScanned === 'scanned') {
        // QR scan failed or data lost
        console.error('QR scan parameter present but no data found in sessionStorage');
        alert('QR-Code Daten nicht gefunden. Bitte scannen Sie erneut.');
        window.location.href = 'qr-scanner.html';
    }
})();
