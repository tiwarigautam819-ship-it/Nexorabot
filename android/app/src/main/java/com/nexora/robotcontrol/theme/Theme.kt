package com.nexora.robotcontrol.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val NexoraDarkNavy = Color(0xFF060B16)
val NexoraSurface = Color(0xFF09152B)
val NexoraSurfaceVariant = Color(0xFF0E1F3D)
val NexoraCyan = Color(0xFF00E5FF)
val NexoraElectricBlue = Color(0xFF2563EB)
val NexoraAccent = Color(0xFF06B6D4)
val NexoraError = Color(0xFFEF4444)
val NexoraSuccess = Color(0xFF10B981)
val NexoraTextPrimary = Color(0xFFF8FAFC)
val NexoraTextSecondary = Color(0xFF94A3B8)

private val DarkColorScheme = darkColorScheme(
    primary = NexoraCyan,
    onPrimary = Color.Black,
    secondary = NexoraElectricBlue,
    onSecondary = Color.White,
    background = NexoraDarkNavy,
    onBackground = NexoraTextPrimary,
    surface = NexoraSurface,
    onSurface = NexoraTextPrimary,
    error = NexoraError,
    onError = Color.White
)

@Composable
fun NexoraTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
