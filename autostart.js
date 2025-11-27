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
    console.log('
