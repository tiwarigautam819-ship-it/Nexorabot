# NEXORA – Robot Control Engine (Android Native)

**Package Name:** `com.nexora.robotcontrol`  
**Tagline:** *Innovating Today, Engineering Tomorrow.*  
**Project Lead:** Gautam Tiwari (`tiwarigautam819@gmail.com`)  
**Architecture:** Kotlin, Jetpack Compose, Material Design 3, MVVM, StateFlow, Navigation Compose, OkHttp WebSockets.

---

## 1. Project Overview

NEXORA is a native Android remote control engine and showcase application designed for the **Nexora Smart Robot** 4WD prototype. It features:
- **Mobile Remote Driving:** Touch-sensitive directional D-pad with continuous movement on press and immediate stop on release.
- **Hardware Safety Watchdog:** 400ms microcontroller timeout halting motors if communication stops.
- **Sensor Telemetry:** Ultrasonic distance, IR obstacle detection, Wi-Fi RSSI signal, and battery voltage.
- **ESP32-CAM Live Stream:** Configurable video feed embedding.
- **Secure Admin Panel:** Firestore-backed content management for authorized lead `tiwarigautam819@gmail.com`.

---

## 2. Android Studio Build Instructions

### Prerequisites
- Android Studio Iguana (2023.2.1) or Ladybug (2024.2.1) or newer
- JDK 17
- Android SDK 35 (compileSdk), Min SDK 26 (Android 8.0 Oreo)

### Steps to Build APK
1. Open Android Studio and select **Open** -> Navigate to the `/android` directory.
2. Allow Gradle to sync dependencies (`OkHttp 4.12`, `Jetpack Compose BoM 2024.06.00`, `Firebase BoM 33.1.2`, `Coil 2.6`).
3. To generate the debug APK, open the Terminal tab in Android Studio and run:
   ```bash
   ./gradlew assembleDebug
   ```
4. The generated APK will be at:
   `app/build/outputs/apk/debug/app-debug.apk`
5. Connect your Android phone via USB with USB Debugging enabled, then click **Run** (Green play arrow).

---

## 3. Firebase Authentication & Authorization Setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add an Android app with package name: `com.nexora.robotcontrol`.
3. Download `google-services.json` and place it in `/android/app/`.
4. Enable **Firebase Authentication** (Email/Password & Google Sign-In providers).
5. In the Firebase Authentication users tab, create the super-admin user with email:
   `tiwarigautam819@gmail.com`
6. In Cloud Firestore, create a document in collection `admins/` matching Gautam Tiwari's UID to activate Firestore rule authorization (`firestore.rules`).

---

## 4. Hardware Wiring & ESP32 Flashing

### Wiring Diagram
| Hardware Component | ESP32 Pin | Arduino Pin | Notes |
|---|---|---|---|
| L298N IN1 | GPIO 27 | D8 | Left Motor Direction 1 |
| L298N IN2 | GPIO 26 | D9 | Left Motor Direction 2 |
| L298N IN3 | GPIO 25 | D10 | Right Motor Direction 1 |
| L298N IN4 | GPIO 33 | D11 | Right Motor Direction 2 |
| L298N ENA | GPIO 14 | D5 (PWM) | Left Speed (LEDC Ch 0) |
| L298N ENB | GPIO 32 | D6 (PWM) | Right Speed (LEDC Ch 1) |
| HC-SR04 TRIG | GPIO 12 | D12 | Ultrasonic trigger pulse |
| HC-SR04 ECHO | GPIO 13 | D13 | Echo duration return |
| IR Sensor Left | GPIO 34 | A0 | Active LOW obstacle signal |
| IR Sensor Right | GPIO 35 | A1 | Active LOW obstacle signal |

### Flashing Firmware
1. Open `/firmware/Nexora_ESP32_Robot_Controller.ino` in Arduino IDE.
2. Install libraries: `WebSockets` by Markus Sattler, `ArduinoJson` by Benoit Blanchon.
3. Select Board: `ESP32 Dev Module`.
4. Flash the code to the ESP32.
5. Connect phone to Wi-Fi SSID `NEXORA_ROBOT_AP` (Password: `nexora1234`).
6. Launch NEXORA on Android!
