package com.nexora.robotcontrol.network

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.nexora.robotcontrol.model.MovementDirection
import com.nexora.robotcontrol.model.RobotMode
import com.nexora.robotcontrol.model.RobotTelemetry
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import okhttp3.*
import java.util.concurrent.TimeUnit

class EspRobotClient {
    private val client = OkHttpClient.Builder()
        .readTimeout(3, TimeUnit.SECONDS)
        .connectTimeout(3, TimeUnit.SECONDS)
        .build()

    private var webSocket: WebSocket? = null
    private val gson = Gson()
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    private val _telemetry = MutableStateFlow(RobotTelemetry())
    val telemetry: StateFlow<RobotTelemetry> = _telemetry.asStateFlow()

    private var movementJob: Job? = null

    fun connect(ip: String = "192.168.4.1", port: Int = 81) {
        val request = Request.Builder()
            .url("ws://$ip:$port/ws")
            .build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(ws: WebSocket, response: Response) {
                _telemetry.value = _telemetry.value.copy(
                    isConnected = true,
                    ipAddress = ip,
                    port = port,
                    lastMessage = "Connected to ESP32 Hardware"
                )
            }

            override fun onMessage(ws: WebSocket, text: String) {
                parseTelemetry(text)
            }

            override fun onFailure(ws: WebSocket, t: Throwable, response: Response?) {
                handleDisconnect("Hardware Connection Failed: ${t.localizedMessage}")
            }

            override fun onClosed(ws: WebSocket, code: Int, reason: String) {
                handleDisconnect("Robot Disconnected")
            }
        })
    }

    private fun parseTelemetry(jsonText: String) {
        try {
            val obj = gson.fromJson(jsonText, JsonObject::class.java)
            val current = _telemetry.value
            
            val dist = if (obj.has("dist")) obj.get("dist").asFloat else current.ultrasonicDistanceCm
            val bat = if (obj.has("bat")) obj.get("bat").asInt else current.batteryLevel
            val volt = if (obj.has("volt")) obj.get("volt").asFloat else current.batteryVoltage
            val rssi = if (obj.has("rssi")) obj.get("rssi").asInt else current.wifiRssi
            val irL = if (obj.has("ir_l")) obj.get("ir_l").asInt == 1 else current.irObstacleLeft
            val irR = if (obj.has("ir_r")) obj.get("ir_r").asInt == 1 else current.irObstacleRight

            _telemetry.value = current.copy(
                ultrasonicDistanceCm = dist,
                batteryLevel = bat,
                batteryVoltage = volt,
                wifiRssi = rssi,
                irObstacleLeft = irL,
                irObstacleRight = irR,
                lastMessage = if (obj.has("msg")) obj.get("msg").asString else current.lastMessage
            )
        } catch (e: Exception) {
            _telemetry.value = _telemetry.value.copy(lastMessage = "Packet: $jsonText")
        }
    }

    private fun handleDisconnect(message: String) {
        stopMovement()
        _telemetry.value = _telemetry.value.copy(
            isConnected = false,
            lastMessage = message,
            // Do not invent sensor readings or battery percentages when disconnected
            batteryLevel = null,
            batteryVoltage = null,
            ultrasonicDistanceCm = null,
            irObstacleLeft = null,
            irObstacleRight = null,
            wifiRssi = null
        )
    }

    fun startContinuousMovement(direction: MovementDirection, speed: Int) {
        movementJob?.cancel()
        val cmdCode = when (direction) {
            MovementDirection.FORWARD -> "F"
            MovementDirection.BACKWARD -> "B"
            MovementDirection.LEFT -> "L"
            MovementDirection.RIGHT -> "R"
            MovementDirection.STOP -> "S"
        }

        // Send immediately and repeat pulse every 150ms while held
        movementJob = scope.launch {
            while (isActive && _telemetry.value.isConnected) {
                sendCommand("MOVE:$cmdCode:$speed")
                delay(150)
            }
        }
    }

    fun stopMovement() {
        movementJob?.cancel()
        movementJob = null
        sendCommand("MOVE:S:0")
    }

    fun setSpeed(speed: Int) {
        _telemetry.value = _telemetry.value.copy(currentSpeed = speed)
        sendCommand("SPEED:$speed")
    }

    fun setMode(mode: RobotMode) {
        _telemetry.value = _telemetry.value.copy(currentMode = mode)
        sendCommand("MODE:${mode.name}")
    }

    fun sendCommand(cmd: String): Boolean {
        if (!_telemetry.value.isConnected) return false
        val sent = webSocket?.send(cmd) ?: false
        if (sent) {
            _telemetry.value = _telemetry.value.copy(lastCommand = cmd)
        }
        return sent
    }

    fun disconnect() {
        stopMovement()
        webSocket?.close(1000, "User disconnected")
        webSocket = null
        handleDisconnect("Robot Disconnected")
    }
}
