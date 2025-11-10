# 📱 iOS Smartphone Anleitung – Web AR testen

## Schnellste Methode: GitHub Pages (empfohlen für iOS)

### Schritt 1: Repository auf GitHub erstellen

1. Gehe zu https://github.com und erstelle ein neues Repository (z.B. "SimpleAR-Web")
2. Lade die Dateien aus dem `web-ar` Ordner hoch:
   - `index.html`
   - `README.md`

### Schritt 2: GitHub Pages aktivieren

1. Gehe in deinem Repository zu **Settings** → **Pages**
2. Unter "Source" wähle **main** Branch
3. Klicke auf **Save**
4. Nach 1-2 Minuten ist deine Seite verfügbar unter:
   `https://dein-username.github.io/SimpleAR-Web/`

### Schritt 3: Auf iOS öffnen

1. Öffne Safari auf deinem iPhone
2. Gehe zu der GitHub Pages URL
3. Erlaube Kamera-Zugriff (wichtig!)
4. Richte die Kamera auf den Hiro-Marker
5. ✅ Der Würfel erscheint sofort!

---

## Alternative: Cloudflared Tunnel (für lokales Testen)

### Voraussetzungen
- Cloudflared installiert (bereits erledigt)
- Lokaler Webserver läuft

### Schritt 1: Webserver starten

Öffne ein Terminal und führe aus:

```cmd
cd c:\Users\FMO\.qodo\SimpleAR\web-ar
npx http-server -p 8000
```

Falls npx nicht verfügbar ist, nutze PHP:

```cmd
cd c:\Users\FMO\.qodo\SimpleAR\web-ar
php -S localhost:8000
```

### Schritt 2: Cloudflared Tunnel starten

Öffne ein **zweites Terminal** und führe aus:

```cmd
cloudflared tunnel --url http://localhost:8000
```

Du erhältst eine URL wie:
```
https://random-name-1234.trycloudflare.com
```

### Schritt 3: Auf iOS öffnen

1. Kopiere die Cloudflare-URL
2. Öffne Safari auf deinem iPhone
3. Füge die URL ein und öffne sie
4. Erlaube Kamera-Zugriff
5. ✅ Scanne den Hiro-Marker!

---

## Alternative: ngrok (falls Cloudflared nicht funktioniert)

### Schritt 1: ngrok installieren

1. Gehe zu https://ngrok.com/download
2. Lade ngrok für Windows herunter
3. Entpacke die Datei

### Schritt 2: Webserver starten

```cmd
cd c:\Users\FMO\.qodo\SimpleAR\web-ar
npx http-server -p 8000
```

### Schritt 3: ngrok Tunnel starten

```cmd
ngrok http 8000
```

Du erhältst eine URL wie:
```
https://abc123.ngrok.io
```

### Schritt 4: Auf iOS öffnen

1. Kopiere die ngrok-URL
2. Öffne Safari auf deinem iPhone
3. Füge die URL ein
4. Erlaube Kamera-Zugriff
5. ✅ Scanne den Hiro-Marker!

---

## 🎯 Hiro-Marker herunterladen

**Wichtig:** Du brauchst den Hiro-Marker zum Testen!

1. Öffne: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
2. **Drucke den Marker aus** (mindestens 5x5 cm) ODER
3. **Zeige ihn auf einem zweiten Bildschirm/Tablet an**

---

## ✅ Checkliste für iOS

- [ ] HTTPS-URL verwenden (GitHub Pages, Cloudflared oder ngrok)
- [ ] Safari Browser nutzen (Chrome funktioniert auf iOS nicht für AR)
- [ ] Kamera-Berechtigung erteilen
- [ ] Hiro-Marker ausgedruckt oder auf zweitem Bildschirm
- [ ] Gute Beleuchtung sicherstellen
- [ ] Marker flach halten
- [ ] Abstand: 20-50 cm zur Kamera

---

## 🐛 Troubleshooting iOS

**Kamera startet nicht:**
- Stelle sicher, dass du HTTPS verwendest (nicht http://)
- Prüfe in iOS Einstellungen → Safari → Kamera, ob Zugriff erlaubt ist
- Lade die Seite neu und tippe auf "Kamera erlauben"

**Marker wird nicht erkannt:**
- Marker muss gut beleuchtet sein
- Halte das iPhone ruhig
- Versuche verschiedene Abstände (20-50 cm)
- Marker sollte komplett im Bild sein

**Schwarzer Bildschirm:**
- Warte 5-10 Sekunden nach dem Laden
- Tippe auf den Bildschirm (iOS benötigt manchmal User-Interaktion)
- Lade die Seite neu

**Performance-Probleme:**
- Schließe andere Apps
- Teste auf neueren iOS-Versionen (iOS 11+)
- Reduziere die Helligkeit (spart Akku)

---

## 🎉 Fertig!

Sobald du eine der Methoden eingerichtet hast, kannst du:
1. Die Seite auf deinem iPhone öffnen
2. Kamera-Zugriff erlauben
3. Den Hiro-Marker scannen
4. **Der Würfel erscheint sofort über dem Marker!**

---

## 📝 Nächste Schritte

- Eigene 3D-Modelle hinzufügen (siehe README.md)
- Videos integrieren
- Eigene Marker erstellen
- Styling anpassen
