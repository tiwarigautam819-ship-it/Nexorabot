/**
 * NEXORA - Robot Control Engine Microcontroller Firmware
 * Target: ESP32 Dev Module (or Arduino + ESP8266)
 * Lead Engineer: Gautam Tiwari (tiwarigautam819@gmail.com)
 * Tagline: Innovating Today, Engineering Tomorrow.
 *
 * SAFETY FEATURES:
 * - 400ms movement watchdog timeout (stops motors if commands cease)
 * - Hardware obstacle auto-braking when distance < 18cm
 * - Bidirectional JSON telemetry stream over WebSocket (Port 81)
 */

#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

// ==================== PIN DEFINITIONS ====================
// L298N Dual H-Bridge Motor Driver
#define PIN_ENA  14   // PWM Left Speed
#define PIN_IN1  27   // Left Motor Dir 1
#define PIN_IN2  26   // Left Motor Dir 2
#define PIN_IN3  25   // Right Motor Dir 1
#define PIN_IN4  33   // Right Motor Dir 2
#define PIN_ENB  32   // PWM Right Speed

// Ultrasonic Sensor (HC-SR04)
#define PIN_TRIG 12
#define PIN_ECHO 13

// IR Proximity Sensors
#define PIN_IR_LEFT  34
#define PIN_IR_RIGHT 35

// Battery Voltage Divider (R1=30k, R2=7.5k to ADC)
#define PIN_BATTERY  36

// ==================== CONSTANTS & SETTINGS ====================
const char* AP_SSID = "NEXORA_ROBOT_AP";
const char* AP_PASS = "nexora1234";

const int WS_PORT = 81;
WebSocketsServer webSocket = WebSocketsServer(WS_PORT);

// Motor State
int currentSpeed = 160; // 0 to 255 PWM
char currentDirection = 'S'; // 'F', 'B', 'L', 'R', 'S'
bool isAutoObstacleMode = false;

// Safety Watchdog
unsigned long lastCommandTime = 0;
const unsigned long SAFETY_TIMEOUT_MS = 400; // Auto-halt after 400ms without heartbeat

// Telemetry Timing
unsigned long lastTelemetryTime = 0;
const unsigned long TELEMETRY_INTERVAL_MS = 150;

// ==================== MOTOR CONTROL FUNCTIONS ====================
void stopMotors() {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, LOW);
  ledcWrite(0, 0);
  ledcWrite(1, 0);
  currentDirection = 'S';
}

void moveForward(int speed) {
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
  currentDirection = 'F';
}

void moveBackward(int speed) {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
  currentDirection = 'B';
}

void turnLeft(int speed) {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
  currentDirection = 'L';
}

void turnRight(int speed) {
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
  currentDirection = 'R';
}

// ==================== SENSOR READINGS ====================
float readUltrasonicDistanceCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  
  long duration = pulseIn(PIN_ECHO, HIGH, 25000); // 25ms timeout (~4m)
  if (duration == 0) return 400.0;
  return (duration * 0.0343) / 2.0;
}

float readBatteryVoltage() {
  int raw = analogRead(PIN_BATTERY);
  // Voltage divider calculation for 2S Li-ion battery (7.4V nominal, 8.4V max)
  float pinVoltage = (raw / 4095.0) * 3.3;
  return pinVoltage * ((30.0 + 7.5) / 7.5);
}

// ==================== WEBSOCKET EVENT HANDLER ====================
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_CONNECTED) {
    IPAddress ip = webSocket.remoteIP(num);
    Serial.printf("[NEXORA] Client #%u connected from %d.%d.%d.%d\n", num, ip[0], ip[1], ip[2], ip[3]);
  } else if (type == WStype_DISCONNECTED) {
    Serial.printf("[NEXORA] Client #%u disconnected. Halting motors.\n", num);
    stopMotors();
  } else if (type == WStype_TEXT) {
    String msg = String((char*)payload);
    lastCommandTime = millis(); // Refresh watchdog timer

    if (msg.startsWith("MOVE:")) {
      // Format: MOVE:F:50 (dir, speed 0-100)
      char dir = msg.charAt(5);
      int spdPercent = msg.substring(7).toInt();
      if (spdPercent <= 0) spdPercent = 50;
      int pwm = map(spdPercent, 0, 100, 0, 255);

      if (dir == 'F') moveForward(pwm);
      else if (dir == 'B') moveBackward(pwm);
      else if (dir == 'L') turnLeft(pwm);
      else if (dir == 'R') turnRight(pwm);
      else stopMotors();
    } else if (msg.startsWith("SPEED:")) {
      int spdPercent = msg.substring(6).toInt();
      currentSpeed = map(spdPercent, 0, 100, 0, 255);
    } else if (msg.startsWith("MODE:")) {
      isAutoObstacleMode = msg.indexOf("AUTO") >= 0;
      if (!isAutoObstacleMode) stopMotors();
    } else if (msg == "EMERGENCY_STOP" || msg == "STOP") {
      stopMotors();
    }
  }
}

// ==================== SETUP ====================
void setup() {
  Serial.begin(115200);
  Serial.println("\n[NEXORA] Initializing Robot Hardware...");

  // Motor pin modes
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT);
  pinMode(PIN_IN4, OUTPUT);

  // Configure ESP32 PWM channels (LEDC)
  ledcAttachPin(PIN_ENA, 0);
  ledcSetup(0, 5000, 8); // Channel 0, 5kHz, 8-bit resolution
  ledcAttachPin(PIN_ENB, 1);
  ledcSetup(1, 5000, 8); // Channel 1, 5kHz, 8-bit resolution

  stopMotors();

  // Sensor pins
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_IR_LEFT, INPUT);
  pinMode(PIN_IR_RIGHT, INPUT);
  pinMode(PIN_BATTERY, INPUT);

  // Launch Wi-Fi SoftAP
  WiFi.softAP(AP_SSID, AP_PASS);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("[NEXORA] SoftAP Ready. IP Address: ");
  Serial.println(IP);

  // Start WebSocket Server
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  Serial.println("[NEXORA] Robot Control Engine Online.");
}

// ==================== MAIN LOOP ====================
void loop() {
  webSocket.loop();
  unsigned long now = millis();

  // 1. SAFETY WATCHDOG TIMEOUT CHECK:
  // If moving forward/reverse/turn and no command arrives within 400ms, immediately halt motors!
  if (currentDirection != 'S' && (now - lastCommandTime > SAFETY_TIMEOUT_MS)) {
    Serial.println("[NEXORA SAFETY] Heartbeat lost. Automatic emergency stop.");
    stopMotors();
  }

  // 2. OBSTACLE AVOIDANCE SAFETY (Ultrasonic check):
  float distance = readUltrasonicDistanceCm();
  if (currentDirection == 'F' && distance < 18.0) {
    Serial.println("[NEXORA SAFETY] Obstacle collision hazard detected. Auto-braking!");
    stopMotors();
  }

  // 3. BROADCAST TELEMETRY TO ANDROID APP:
  if (now - lastTelemetryTime > TELEMETRY_INTERVAL_MS) {
    lastTelemetryTime = now;
    
    int irLeft = digitalRead(PIN_IR_LEFT) == LOW ? 1 : 0;
    int irRight = digitalRead(PIN_IR_RIGHT) == LOW ? 1 : 0;
    float batteryV = readBatteryVoltage();
    int batPercent = constrain(map((int)(batteryV * 100), 640, 840, 0, 100), 0, 100);

    // Build JSON packet
    StaticJsonDocument<200> doc;
    doc["dist"] = distance;
    doc["ir_l"] = irLeft;
    doc["ir_r"] = irRight;
    doc["bat"] = batPercent;
    doc["volt"] = batteryV;
    doc["rssi"] = WiFi.RSSI();
    doc["dir"] = String(currentDirection);
    doc["msg"] = "NEXORA_OK";

    String jsonOutput;
    serializeJson(doc, jsonOutput);
    webSocket.broadcastTXT(jsonOutput);
  }
}
