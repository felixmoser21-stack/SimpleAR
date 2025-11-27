// Autostart script for index_tracker.html
// This script checks for QR scan completion and automatically starts AR

(function() {
    console.log('=== Autostart.js loaded ===');
    console.log('Current URL:', window.location.href);
    
    // Check if coming from QR scanner
    const urlParams = new URLSearchParams(window.location.search);
    const qrScanned = urlParams.get('qr');
    
    console.log('URL Parameter qr:', qrScanned);
    console.log('All URL Parameters:', window.location.search);
    
    // Retrieve QR code data from sessionStorage (NEW FORMAT)
    let videoUrl = sessionStorage.getItem('videoUrl');
    let stationId = sessionStorage.getItem('stationId');
    let qrRaw = sessionStorage.getItem('qr_raw');
    
    console.log('--- SessionStorage Data ---');
    console.log('videoUrl:', videoUrl || 'nicht gefunden');
    console.log('stationId:', stationId || 'nicht gefunden');
    console.log('qr_raw:', qrRaw || 'nicht gefunden');
    
    // FALLBACK: Try URL parameters if sessionStorage is empty
    if (!videoUrl && !stationId) {
        console.log('⚠ SessionStorage empty - trying URL parameters as fallback...');
        
        const videoParam = urlParams.get('video');
        const stationParam = urlParams.get('station');
        
        console.log('URL video parameter:', videoParam || 'nicht gefunden');
        console.log('URL station parameter:', stationParam || 'nicht gefunden');
        
        if (videoParam) {
            videoUrl = decodeURIComponent(videoParam);
            sessionStorage.setItem('videoUrl', videoUrl);
            console.log('✓ Recovered videoUrl from URL parameter:', videoUrl);
        }
        if (stationParam) {
            stationId = decodeURIComponent(stationParam);
            sessionStorage.setItem('stationId', stationId);
            console.log('✓ Recovered stationId from URL parameter:', stationId);
        }
    }
    
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
    
    console.log('--- Decision Logic ---');
    console.log('qrScanned:', qrScanned);
    console.log('hasData:', hasData);
    console.log('Will autostart?', qrScanned === 'scanned' && hasData);
    console.log('======================');
    
    if (qrScanned === 'scanned' && hasData) {
        console.log('✓ QR scan detected - will start AR automatically WITHOUT camera prompt');
        
        // ✅ HIDE THE "ALLOW ACCESS" DIALOG IMMEDIATELY
        const startARDiv = document.getElementById('startARDiv');
        if (startARDiv) {
            startARDiv.style.display = 'none';
            console.log('✓ "Allow Access" dialog hidden - camera permission already granted from QR scanner');
        } else {
            console.warn('⚠ startARDiv not found - might be too early');
        }
        
        // Wait for StartAR function to be available, then call it
        let attempts = 0;
        const maxAttempts = 50; // 50 * 100ms = 5 seconds
        
        const checkAndStart = setInterval(function() {
            attempts++;
            
            if (typeof StartAR === 'function') {
                console.log('✓ StartAR function found after', attempts * 100, 'ms - starting AR automatically...');
                clearInterval(checkAndStart);
                
                // ✅ Camera permission was already granted during QR scan
                // So we can start AR directly WITHOUT asking again
                StartAR();
            } else if (attempts >= maxAttempts) {
                console.error('✗ StartAR function not found after', maxAttempts * 100, 'ms');
                console.error('⚠ This might indicate a loading error');
                clearInterval(checkAndStart);
            } else if (attempts % 10 === 0) {
                // Log every second
                console.log('⏳ Still waiting for StartAR function... (', attempts * 100, 'ms )');
            }
        }, 100); // Check every 100ms
        
    } else if (!hasData && qrScanned === 'scanned') {
        // QR scan failed or data lost
        console.error('✗ QR scan parameter present but no data found');
        console.error('⚠ This might be a browser issue with sessionStorage across redirects');
        console.error('⚠ Try scanning the QR-Code again or check browser settings');
        
        // Show detailed error info
        console.error('--- Debug Info ---');
        console.error('sessionStorage.videoUrl:', sessionStorage.getItem('videoUrl'));
        console.error('sessionStorage.stationId:', sessionStorage.getItem('stationId'));
        console.error('sessionStorage.qr_raw:', sessionStorage.getItem('qr_raw'));
        console.error('URL video param:', urlParams.get('video'));
        console.error('URL station param:', urlParams.get('station'));
        console.error('==================');
        
        alert('QR-Code Daten nicht gefunden. Bitte scannen Sie erneut.');
        window.location.href = 'qr-scanner.html';
        
    } else if (!qrScanned) {
        console.log('ℹ No QR scan parameter - manual start required');
        console.log('ℹ User will see "Allow Access" button');
        console.log('ℹ To test autostart, add ?qr=scanned&video=... to URL');
    } else {
        console.warn('⚠ Unexpected state:');
        console.warn('  qrScanned:', qrScanned);
        console.warn('  hasData:', hasData);
    }
    
    console.log('=== Autostart.js initialization complete ===');
})();
