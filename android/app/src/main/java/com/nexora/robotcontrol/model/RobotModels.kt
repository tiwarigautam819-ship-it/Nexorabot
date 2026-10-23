package com.nexora.robotcontrol.model

enum class MovementDirection {
    FORWARD, BACKWARD, LEFT, RIGHT, STOP
}

enum class RobotMode {
    MANUAL, AUTO
}

data class RobotTelemetry(
    val isConnected: Boolean = false,
    val ipAddress: String = "192.168.4.1",
    val port: Int = 81,
    val batteryLevel: Int? = null, // null when unavailable - never fake!
    val batteryVoltage: Float? = null,
    val ultrasonicDistanceCm: Float? = null, // null when unavailable
    val irObstacleLeft: Boolean? = null,
    val irObstacleRight: Boolean? = null,
    val wifiRssi: Int? = null,
    val currentMode: RobotMode = RobotMode.MANUAL,
    val currentSpeed: Int = 50,
    val lastCommand: String = "STOP",
    val lastMessage: String = "Robot Disconnected"
)

data class TeamMember(
    val id: String,
    val name: String,
    val role: String,
    val skills: List<String>,
    val contribution: String,
    val bio: String,
    val photoUrl: String,
    val isLead: Boolean = false
)

data class ComponentItem(
    val id: String,
    val name: String,
    val category: String,
    val description: String,
    val purpose: String,
    val specification: String,
    val status: String,
    val imageUrl: String
)

data class GalleryItem(
    val id: String,
    val title: String,
    val subtitle: String,
    val category: String,
    val imageUrl: String,
    val date: String,
    val description: String
)

data class TimelinePhase(
    val id: Int,
    val phaseNumber: Int,
    val title: String,
    val description: String,
    val status: String,
    val milestones: List<String>,
    val targetDate: String
)
