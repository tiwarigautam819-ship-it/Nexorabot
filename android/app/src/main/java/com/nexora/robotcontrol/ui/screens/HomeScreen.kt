package com.nexora.robotcontrol.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.nexora.robotcontrol.theme.*
import com.nexora.robotcontrol.ui.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidHomeScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(28.dp)
                                .clip(RoundedCornerShape(6.dp))
                                .background(NexoraCyan),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("N", color = Color.Black, fontSize = 16.sp)
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("NEXORA", color = NexoraCyan, fontSize = 18.sp)
                    }
                },
                actions = {
                    IconButton(onClick = { navController.navigate(Screen.Sensors.route) }) {
                        Icon(Icons.Default.Notifications, contentDescription = "Alerts", tint = Color.White)
                    }
                    IconButton(onClick = { navController.navigate(Screen.Admin.route) }) {
                        Icon(Icons.Default.AccountCircle, contentDescription = "Admin", tint = NexoraCyan)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = NexoraDarkNavy
                )
            )
        },
        bottomBar = {
            NavigationBar(containerColor = NexoraSurface) {
                NavigationBarItem(
                    selected = true,
                    onClick = { },
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home") }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { navController.navigate(Screen.Project.route) },
                    icon = { Icon(Icons.Default.Layers, contentDescription = "Project") },
                    label = { Text("Project") }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { navController.navigate(Screen.Team.route) },
                    icon = { Icon(Icons.Default.Group, contentDescription = "Team") },
                    label = { Text("Team") }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { navController.navigate(Screen.Gallery.route) },
                    icon = { Icon(Icons.Default.Image, contentDescription = "Gallery") },
                    label = { Text("Gallery") }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { navController.navigate(Screen.Settings.route) },
                    icon = { Icon(Icons.Default.MoreHoriz, contentDescription = "More") },
                    label = { Text("More") }
                )
            }
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Featured Card
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(NexoraSurface)
                        .border(1.dp, NexoraCyan.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                        .padding(16.dp)
                ) {
                    Column {
                        Text("Nexora Smart Robot", color = Color.White, fontSize = 18.sp)
                        Text(
                            "Smart • Mobile Controlled • Autonomous",
                            color = NexoraCyan,
                            fontSize = 12.sp
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            "Robotics prototype with custom Control Engine, 4WD traction, and dual obstacle detection.",
                            color = NexoraTextSecondary,
                            fontSize = 13.sp
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = { navController.navigate(Screen.Project.route) },
                            colors = ButtonDefaults.buttonColors(containerColor = NexoraElectricBlue),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text("View Project Details")
                        }
                    }
                }
            }

            // 2x2 Telemetry Grid
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    StatusCard(
                        title = "Robot Status",
                        value = "Disconnected",
                        sub = "ESP32 Offline",
                        color = NexoraError,
                        modifier = Modifier.weight(1f)
                    )
                    StatusCard(
                        title = "Battery",
                        value = "-- %",
                        sub = "Not Available",
                        color = NexoraTextSecondary,
                        modifier = Modifier.weight(1f)
                    )
                }
                Spacer(modifier = Modifier.height(12.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    StatusCard(
                        title = "Sensors",
                        value = "Not Available",
                        sub = "Sonar & IR Offline",
                        color = NexoraTextSecondary,
                        modifier = Modifier.weight(1f)
                    )
                    StatusCard(
                        title = "Mode",
                        value = "Manual",
                        sub = "Speed: 50%",
                        color = NexoraCyan,
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            // Quick Actions
            item {
                Text("QUICK ACTIONS", color = NexoraTextSecondary, fontSize = 12.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    QuickActionCard(
                        title = "Robot Control",
                        subtitle = "Virtual Joystick & D-Pad",
                        icon = Icons.Default.SportsEsports,
                        onClick = { navController.navigate(Screen.Control.route) },
                        modifier = Modifier.weight(1f)
                    )
                    QuickActionCard(
                        title = "Camera View",
                        subtitle = "Live Wi-Fi Stream",
                        icon = Icons.Default.Videocam,
                        onClick = { navController.navigate(Screen.Camera.route) },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}

@Composable
fun StatusCard(title: String, value: String, sub: String, color: Color, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(NexoraSurface)
            .border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            .padding(12.dp)
    ) {
        Column {
            Text(title, color = NexoraTextSecondary, fontSize = 11.sp)
            Spacer(modifier = Modifier.height(4.dp))
            Text(value, color = color, fontSize = 15.sp)
            Text(sub, color = NexoraTextSecondary.copy(alpha = 0.7f), fontSize = 10.sp)
        }
    }
}

@Composable
fun QuickActionCard(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(14.dp))
            .background(NexoraSurface)
            .border(1.dp, NexoraCyan.copy(alpha = 0.3f), RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
            .padding(14.dp)
    ) {
        Column {
            Icon(icon, contentDescription = title, tint = NexoraCyan, modifier = Modifier.size(28.dp))
            Spacer(modifier = Modifier.height(8.dp))
            Text(title, color = Color.White, fontSize = 14.sp)
            Text(subtitle, color = NexoraTextSecondary, fontSize = 11.sp)
        }
    }
}
