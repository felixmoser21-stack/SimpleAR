# Zoo AR - Web-basierte AR Experience

## 🎯 Was ist das?

Eine Web-basierte Augmented Reality Anwendung für Zoo-Besucher. Keine App-Installation nötig!

## ✨ Features

- ✅ **Marker-basierte AR** - QR-Codes als Anker
- ✅ **3D-Objekte** - Tiere erscheinen vor dem Gehege
- ✅ **Video-Integration** - Tierpfleger-Erklärungen
- ✅ **Keine App nötig** - läuft im Browser
- ✅ **Funktioniert auf allen Smartphones**

## 🚀 Schnellstart

### 1. Lokaler Test

Öffnen Sie `index.html` in einem lokalen Webserver:

```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (npx)
npx http-server -p 8000

# Mit PHP
php -S localhost:8000
```

Dann öffnen Sie: `http://localhost:8000`

### 2. Test-Marker herunterladen

**Hiro Marker (Löwe):**
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

**Kanji Marker (Elefant):**
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/kanji.png

**Drucken Sie diese Marker aus oder zeigen Sie sie auf einem zweiten Bildschirm!**

### 3. Testen

1. Öffnen Sie die Website auf Ihrem Smartphone
2. Klicken Sie "AR-Erlebnis starten"
3. Erlauben Sie Kamera-Zugriff
4. Richten Sie die Kamera auf einen gedruckten Marker
5. Der 3D-Würfel erscheint über dem Marker!

## 📱 Smartphone-Anforderungen

- **iOS**: Safari 11+ (iOS 11+)
- **Android**: Chrome 67+ (Android 8+)
- **Kamera-Berechtigung** muss erteilt werden

## 🎨 Anpassungen

### Eigene Marker erstellen

1. Gehen Sie zu: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Laden Sie Ihr Bild hoch (z.B. Zoo-Logo)
3. Laden Sie das `.patt` File herunter
4. Fügen Sie es in Ihr Projekt ein

### 3D-Modelle hinzufügen

Ersetzen Sie `<a-box>` mit einem GLTF-Modell:

```html
<a-gltf-model 
    src="models/lion.glb" 
    position="0 0 0" 
    scale="0.5 0.5 0.5"
    animation="property: rotation; to: 0 360 0; loop: true; dur: 10000">
</a-gltf-model>
```

### Videos hinzufügen

```html
<a-video 
    src="videos/lion-keeper.mp4" 
    width="2" 
    height="1.5" 
    position="0 2 0">
</a-video>
```

## 🌐 Deployment

### Option 1: Netlify (Empfohlen)

1. Erstellen Sie ein GitHub Repository
2. Pushen Sie den `web-ar` Ordner
3. Verbinden Sie mit Netlify
4. Fertig! URL: `https://your-zoo-ar.netlify.app`

### Option 2: GitHub Pages

1. Pushen Sie zu GitHub
2. Aktivieren Sie GitHub Pages in Settings
3. URL: `https://username.github.io/zoo-ar`

### Option 3: Eigener Server

Laden Sie die Dateien auf Ihren Webserver hoch. **Wichtig: HTTPS ist erforderlich für Kamera-Zugriff!**

## 🔧 Technologie-Stack

- **A-Frame** - 3D/VR Framework
- **AR.js** - Marker-basierte AR
- **Three.js** - 3D-Rendering (unter der Haube)

## 📝 Nächste Schritte

1. ✅ Grundfunktion läuft
2. ⏳ Eigene Marker erstellen
3. ⏳ 3D-Tier-Modelle hinzufügen
4. ⏳ Videos integrieren
5. ⏳ Styling anpassen
6. ⏳ Deployment

## 🐛 Troubleshooting

**Kamera funktioniert nicht:**
- Stellen Sie sicher, dass Sie HTTPS verwenden (oder localhost)
- Überprüfen Sie Browser-Berechtigungen
- Testen Sie in Chrome/Safari

**Marker wird nicht erkannt:**
- Marker muss gut beleuchtet sein
- Marker sollte flach liegen
- Kamera sollte 20-50cm Abstand haben
- Marker sollte mindestens 5x5cm groß sein

**Performance-Probleme:**
- Reduzieren Sie die Polygon-Anzahl der 3D-Modelle
- Komprimieren Sie Videos
- Testen Sie auf echten Geräten (nicht Emulator)

## 📚 Ressourcen

- **AR.js Dokumentation**: https://ar-js-org.github.io/AR.js-Docs/
- **A-Frame Dokumentation**: https://aframe.io/docs/
- **Kostenlose 3D-Modelle**: https://sketchfab.com/
- **Marker Generator**: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

## 🎉 Fertig!

Ihre Web-AR App ist bereit zum Testen!
