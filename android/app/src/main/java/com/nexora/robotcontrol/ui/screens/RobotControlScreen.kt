package com.nexora.robotcontrol.ui.screens

import androidx.compose.foundation.clickable
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.nexora.robotcontrol.model.MovementDirection
import com.nexora.robotcontrol.model.RobotMode
import com.nexora.robotcontrol.theme.*
import com.nexora.robotcontrol.viewmodel.RobotControlViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidRobotControlScreen(
    navController: NavController,
    viewModel: RobotControlViewModel = androidx.lifecycle.viewmodel.compose.viewModel()
) {
    val telemetry by viewModel.telemetry.collectAsState()
    var speed by remember { mutableFloatStateOf(50f) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Robot Control", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { navController.navigate("settings") }) {
                        Icon(Icons.Default.Settings, contentDescription = "Settings", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Hardware Status Banner
            if (!telemetry.isConnected) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color(0xFF260E14))
                        .border(1.dp, NexoraError, RoundedCornerShape(12.dp))
                        .padding(12.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Warning, contentDescription = "Alert", tint = NexoraError)
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text("Robot Disconnected", color = NexoraError, fontSize = 13.sp)
                            Text(
                                "Check your Wi-Fi connection and hardware.",
                                color = NexoraTextSecondary,
                                fontSize = 11.sp
                            )
                        }
                    }
                }
            } else {
                Text(
                    "Connected to ESP32: ${telemetry.ipAddress}",
                    color = NexoraSuccess,
                    fontSize = 12.sp
                )
            }

            // Mode Selector
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(NexoraSurface)
                    .padding(4.dp)
            ) {
                Button(
                    onClick = { viewModel.setMode(RobotMode.MANUAL) },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (telemetry.currentMode == RobotMode.MANUAL) NexoraCyan else Color.Transparent
                    )
                ) {
                    Text(
                        "Manual",
                        color = if (telemetry.currentMode == RobotMode.MANUAL) Color.Black else Color.White
                    )
                }
                Button(
                    onClick = { viewModel.setMode(RobotMode.AUTO) },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (telemetry.currentMode == RobotMode.AUTO) NexoraCyan else Color.Transparent
                    )
                ) {
                    Text(
                        "Automatic (Avoid)",
                        color = if (telemetry.currentMode == RobotMode.AUTO) Color.Black else Color.White
                    )
                }
            }

            // Virtual Joystick / Directional D-Pad Console
            Box(
                modifier = Modifier
                    .size(240.dp)
                    .clip(CircleShape)
                    .background(NexoraSurface)
                    .border(2.dp, NexoraCyan.copy(alpha = 0.4f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                // Forward Button
                TouchDirectionButton(
                    icon = Icons.Default.KeyboardArrowUp,
                    modifier = Modifier.align(Alignment.TopCenter).padding(top = 10.dp),
                    onPress = { viewModel.startMovement(MovementDirection.FORWARD) },
                    onRelease = { viewModel.stopMovement() }
                )

                // Backward Button
                TouchDirectionButton(
                    icon = Icons.Default.KeyboardArrowDown,
                    modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 10.dp),
                    onPress = { viewModel.startMovement(MovementDirection.BACKWARD) },
                    onRelease = { viewModel.stopMovement() }
                )

                // Left Button
                TouchDirectionButton(
                    icon = Icons.Default.KeyboardArrowLeft,
                    modifier = Modifier.align(Alignment.CenterStart).padding(start = 10.dp),
                    onPress = { viewModel.startMovement(MovementDirection.LEFT) },
                    onRelease = { viewModel.stopMovement() }
                )

                // Right Button
                TouchDirectionButton(
                    icon = Icons.Default.KeyboardArrowRight,
                    modifier = Modifier.align(Alignment.CenterEnd).padding(end = 10.dp),
                    onPress = { viewModel.startMovement(MovementDirection.RIGHT) },
                    onRelease = { viewModel.stopMovement() }
                )

                // Center Stop Button
                Box(
                    modifier = Modifier
                        .size(60.dp)
                        .clip(CircleShape)
                        .background(NexoraError)
                        .clickable { viewModel.emergencyStop() },
                    contentAlignment = Alignment.Center
                ) {
                    Text("STOP", color = Color.White, fontSize = 12.sp)
                }
            }

            // Speed Control Slider
            Column(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Speed", color = NexoraTextSecondary, fontSize = 12.sp)
                    Text("${speed.toInt()}%", color = NexoraCyan, fontSize = 12.sp)
                }
                Slider(
                    value = speed,
                    onValueChange = {
                        speed = it
                        viewModel.setSpeed(it.toInt())
                    },
                    valueRange = 0f..100f,
                    colors = SliderDefaults.colors(
                        thumbColor = NexoraCyan,
                        activeTrackColor = NexoraCyan
                    )
                )
            }

            // Secondary Quick Action Buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Button(
                    onClick = { },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = NexoraSurface)
                ) {
                    Text("Forward", color = NexoraCyan)
                }
                Button(
                    onClick = { viewModel.emergencyStop() },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = NexoraError)
                ) {
                    Text("Stop", color = Color.White)
                }
                Button(
                    onClick = { },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = NexoraSurface)
                ) {
                    Text("Backward", color = NexoraCyan)
                }
            }
        }
    }
}

@Composable
fun TouchDirectionButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    onPress: () -> Unit,
    onRelease: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .size(54.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFF0F1F40))
            .border(1.dp, NexoraCyan.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = {
                        onPress()
                        tryAwaitRelease()
                        onRelease()
                    }
                )
            },
        contentAlignment = Alignment.Center
    ) {
        Icon(icon, contentDescription = null, tint = NexoraCyan, modifier = Modifier.size(32.dp))
    }
}
