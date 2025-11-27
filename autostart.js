// Autostart script for index_tracker.html
// This script checks for QR scan completion and automatically starts AR

(function() {
    console.log('=== Autostart.js loaded ===');
    
    // Check if coming from QR scanner
    const urlParams = new URLSearchParams(window.location.search);
    const qrScanned = urlParams.get('qr');
    
    console.log('URL Parameter qr:', qrScanned);
    
    // Retrieve QR code data from sessionStorage (NEW FORMAT)
    const videoUrl = sessionStorage.getItem('videoUrl');
    const stationId = sessionStorage.getItem('stationId');
    const qrRaw = sessionStorage.getItem('qr_raw');
    
    console.log('--- SessionStorage Data ---');
    console.log('videoUrl:', videoUrl || 'nicht gefunden');
    console.log('stationId:', stationId || 'nicht gefunden');
    console.log('qr_raw:', qrRaw || 'nicht gefunden');
    console.log('===========================');
    
    // Store globally in window object for Unity access (backwards compatibility)
    if (videoUrl) {
        window.QR_VIDEO_URL = videoUrl;
        console.log('✓ Set window.QR_VIDEO_URL:', videoUrl);
    }
    
    if (stationId) {
        window.QR_STATION_ID = stationId;
        console.log('✓ Set window.QR_STATION_ID:', stationId);
    }
    
    if (qrRaw) {
        window.QR_CODE_DATA = qrRaw;
        console.log('✓ Set window.QR_CODE_DATA:', qrRaw);
    }
    
    // Check if we have at least one value
    const hasData = videoUrl || stationId || qrRaw;
    
    if (qrScanned === 'scanned' && hasData) {
        console.log('✓ QR scan detected - will start AR automatically WITHOUT camera prompt');
        
        // ✅ HIDE THE "ALLOW ACCESS" DIALOG IMMEDIATELY
        const startARDiv = document.getElementById('startARDiv');
        if (startARDiv) {
            startARDiv.style.display = 'none';
            console.log('✓ "Allow Access" dialog hidden - camera permission already granted from QR scanner');
        }
        
        // Wait for StartAR function to be available, then call it
        const checkAndStart = setInterval(function() {
            if (typeof StartAR === 'function') {
                console.log('✓ StartAR function found - starting AR automatically...');
                clearInterval(checkAndStart);
                
                // ✅ Camera permission was already granted during QR scan
                // So we can start AR directly WITHOUT asking again
                StartAR();
            }
        }, 100); // Check every 100ms
        
        // Timeout after 5 seconds
        setTimeout(function() {
            clearInterval(checkAndStart);
            if (typeof StartAR !== 'function') {
                console.error('✗ StartAR function not found after 5 seconds');
            }
        }, 5000);
    } else if (!hasData && qrScanned === 'scanned') {
        // QR scan failed or data lost
        console.error('✗ QR scan parameter present but no data found in sessionStorage');
        alert('QR-Code Daten nicht gefunden. Bitte scannen Sie erneut.');
        window.location.href = 'qr-scanner.html';
    } else if (!qrScanned) {
        console.log('ℹ No QR scan parameter - manual start required (will show "Allow Access" button)');
    }
})();
