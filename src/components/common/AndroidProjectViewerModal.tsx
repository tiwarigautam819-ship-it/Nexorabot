import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileCode,
  Folder,
  Layers,
  Sparkles,
  X,
  Cpu,
  Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AndroidFile {
  name: string;
  path: string;
  category: 'kotlin' | 'gradle' | 'manifest' | 'security' | 'firmware';
  content: string;
}

export const AndroidProjectViewerModal: React.FC = () => {
  const { showAndroidExportModal, setShowAndroidExportModal, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const files: AndroidFile[] = [
    {
      name: 'RobotControlScreen.kt',
      path: 'app/src/main/java/com/nexora/robotcontrol/ui/screens/RobotControlScreen.kt',
      category: 'kotlin',
      content: `package com.nexora.robotcontrol.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.nexora.robotcontrol.model.MovementDirection
import com.nexora.robotcontrol.model.RobotMode
import com.nexora.robotcontrol.theme.*
import com.nexora.robotcontrol.viewmodel.RobotControlViewModel

/**
 * NEXORA Dedicated Mobile Remote Control Screen
 * - Continuous movement when direction button is pressed
 * - Immediate stop command when button is released
 * - 400ms microcontroller safety timeout
 */
@Composable
fun AndroidRobotControlScreen(
    navController: NavController,
    viewModel: RobotControlViewModel
) {
    val telemetry by viewModel.telemetry.collectAsState()
    var speed by remember { mutableFloatStateOf(50f) }

    // Screen layout with D-pad, Speed slider, and Emergency Stop...
    // Full code included in /android/app/src/main/java/com/nexora/robotcontrol/ui/screens/RobotControlScreen.kt
}`,
    },
    {
      name: 'EspRobotClient.kt',
      path: 'app/src/main/java/com/nexora/robotcontrol/network/EspRobotClient.kt',
      category: 'kotlin',
      content: `package com.nexora.robotcontrol.network

import com.google.gson.Gson
import com.nexora.robotcontrol.model.MovementDirection
import com.nexora.robotcontrol.model.RobotTelemetry
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import okhttp3.*

class EspRobotClient {
    private val client = OkHttpClient()
    private var webSocket: WebSocket? = null
    val telemetry = MutableStateFlow(RobotTelemetry())

    fun connect(ip: String = "192.168.4.1", port: Int = 81) {
        val request = Request.Builder().url("ws://$ip:$port/ws").build()
        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(ws: WebSocket, response: Response) {
                telemetry.value = telemetry.value.copy(isConnected = true, lastMessage = "Connected to ESP32 Hardware")
            }
            override fun onMessage(ws: WebSocket, text: String) {
                // Parse ultrasonic, IR, battery telemetry
            }
            override fun onClosed(ws: WebSocket, code: Int, reason: String) {
                telemetry.value = telemetry.value.copy(isConnected = false, lastMessage = "Robot Disconnected")
            }
        })
    }

    fun startContinuousMovement(direction: MovementDirection, speed: Int) {
        // Send MOVE packet and repeat 150ms heartbeat pulse
    }

    fun stopMovement() {
        webSocket?.send("MOVE:S:0")
    }
}`,
    },
    {
      name: 'AndroidManifest.xml',
      path: 'app/src/main/AndroidManifest.xml',
      category: 'manifest',
      content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

    <application
        android:label="NEXORA"
        android:usesCleartextTraffic="true"
        android:theme="@style/Theme.NexoraRobotControl">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
    },
    {
      name: 'build.gradle.kts',
      path: 'app/build.gradle.kts',
      category: 'gradle',
      content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.nexora.robotcontrol"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.nexora.robotcontrol"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.06.00"))
    implementation("androidx.compose.material3:material3")
    implementation("androidx.navigation:navigation-compose:2.7.7")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.google.code.gson:gson:2.10.1")
}`,
    },
    {
      name: 'firestore.rules',
      path: 'firestore.rules',
      category: 'security',
      content: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSuperAdmin() {
      return request.auth != null &&
             request.auth.token.email == 'tiwarigautam819@gmail.com';
    }

    match /{document=**} {
      allow read: if true;
      allow write: if isSuperAdmin();
    }
  }
}`,
    },
    {
      name: 'Nexora_ESP32_Robot_Controller.ino',
      path: 'firmware/Nexora_ESP32_Robot_Controller.ino',
      category: 'firmware',
      content: `// ESP32 Robot Controller with 400ms Watchdog Safety
#include <WiFi.h>
#include <WebSocketsServer.h>

const char* AP_SSID = "NEXORA_ROBOT_AP";
const char* AP_PASS = "nexora1234";
WebSocketsServer webSocket(81);

unsigned long lastCommandTime = 0;
const unsigned long SAFETY_TIMEOUT_MS = 400;

void loop() {
  webSocket.loop();
  // Auto-halt motors if heartbeat stops
  if (millis() - lastCommandTime > SAFETY_TIMEOUT_MS) {
    stopMotors();
  }
}`,
    },
  ];

  const [selectedFile, setSelectedFile] = useState<AndroidFile>(files[0]);

  if (!showAndroidExportModal) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    showToast(`Copied ${selectedFile.name} to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[88vh] rounded-2xl bg-[#081226] border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-cyan-950/80 bg-[#060c18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>NEXORA Native Android Studio Project</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono-code">
                  Kotlin + Jetpack Compose
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Package: <code className="text-cyan-400">com.nexora.robotcontrol</code> &bull; All files generated in workspace at <code className="text-slate-300">/android</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={() => setShowAndroidExportModal(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar files + Code preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-64 border-r border-cyan-950/70 bg-[#070e1e] p-3 space-y-1 overflow-y-auto shrink-0">
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Project Structure
            </div>
            {files.map((file) => {
              const isSelected = file.name === selectedFile.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cyan-950/30'
                  }`}
                >
                  <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}

            <div className="pt-4 px-2 text-[10px] text-slate-500 leading-normal">
              Physical project files are placed in:
              <br />
              <code className="text-cyan-400/90 font-mono-code">/android/</code>
              <br />
              <code className="text-cyan-400/90 font-mono-code">/firmware/</code>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-[#050b16] overflow-hidden">
            {/* File Path Bar */}
            <div className="px-4 py-2 bg-[#060e20] border-b border-cyan-950/60 flex items-center justify-between text-xs font-mono-code text-slate-400">
              <span className="truncate">{selectedFile.path}</span>
              <span className="text-[10px] text-cyan-400 uppercase">{selectedFile.category}</span>
            </div>

            {/* Code Content */}
            <pre className="flex-1 p-4 font-mono-code text-xs text-slate-200 overflow-auto leading-relaxed select-text">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-2.5 bg-[#060c18] border-t border-cyan-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready for Android Studio (Iguana / Ladybug) &bull; Gradle 8.4+</span>
          </div>
          <span className="font-mono-code text-[11px] text-cyan-400">
            Target: Android 14/15 (API 34/35)
          </span>
        </div>
      </div>
    </div>
  );
};
