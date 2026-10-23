package com.nexora.robotcontrol.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nexora.robotcontrol.model.MovementDirection
import com.nexora.robotcontrol.model.RobotMode
import com.nexora.robotcontrol.model.RobotTelemetry
import com.nexora.robotcontrol.network.EspRobotClient
import kotlinx.coroutines.flow.StateFlow

class RobotControlViewModel : ViewModel() {
    private val client = EspRobotClient()
    val telemetry: StateFlow<RobotTelemetry> = client.telemetry

    fun connect(ip: String = "192.168.4.1", port: Int = 81) {
        client.connect(ip, port)
    }

    fun disconnect() {
        client.disconnect()
    }

    fun startMovement(direction: MovementDirection) {
        val speed = telemetry.value.currentSpeed
        client.startContinuousMovement(direction, speed)
    }

    fun stopMovement() {
        client.stopMovement()
    }

    fun emergencyStop() {
        client.stopMovement()
        client.sendCommand("EMERGENCY_STOP")
    }

    fun setSpeed(speed: Int) {
        client.setSpeed(speed.coerceIn(0, 100))
    }

    fun setMode(mode: RobotMode) {
        client.setMode(mode)
    }

    override fun onCleared() {
        super.onCleared()
        client.disconnect()
    }
}
