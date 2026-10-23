package com.nexora.robotcontrol.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.nexora.robotcontrol.theme.*

@Composable
fun AndroidSplashScreen(onEnterApp: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(NexoraDarkNavy),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(RoundedCornerShape(20.dp))
                    .background(NexoraCyan),
                contentAlignment = Alignment.Center
            ) {
                Text("N", fontSize = 48.sp, color = Color.Black)
            }
            Spacer(modifier = Modifier.height(16.dp))
            Text("NEXORA", fontSize = 28.sp, color = NexoraCyan)
            Text("Robot Control Engine", fontSize = 14.sp, color = Color.White)
            Text("Innovating Today, Engineering Tomorrow.", fontSize = 12.sp, color = NexoraTextSecondary)
            Spacer(modifier = Modifier.height(32.dp))
            Button(
                onClick = onEnterApp,
                colors = ButtonDefaults.buttonColors(containerColor = NexoraElectricBlue)
            ) {
                Text("Enter Nexora Engine")
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidSensorScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Sensors", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
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
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            SensorRowCard(title = "Ultrasonic Sensor", value = "-- cm", status = "Data Unavailable")
            SensorRowCard(title = "IR Sensor", value = "----", status = "Not Available")
            SensorRowCard(title = "Wi-Fi Signal", value = "-- dBm", status = "Not Connected")
            SensorRowCard(title = "Battery Level", value = "-- %", status = "Not Available")
        }
    }
}

@Composable
fun SensorRowCard(title: String, value: String, status: String) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(NexoraSurface)
            .border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            .padding(14.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(title, color = Color.White, fontSize = 14.sp)
                Text(status, color = NexoraTextSecondary, fontSize = 11.sp)
            }
            Text(value, color = NexoraCyan, fontSize = 16.sp)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidCameraScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Camera View", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
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
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(Icons.Default.VideocamOff, contentDescription = null, tint = NexoraError, modifier = Modifier.size(64.dp))
            Spacer(modifier = Modifier.height(16.dp))
            Text("No stream available", color = Color.White, fontSize = 16.sp)
            Text(
                "Please check the camera connection or stream URL in admin panel.",
                color = NexoraTextSecondary,
                fontSize = 12.sp,
                modifier = Modifier.padding(horizontal = 24.dp)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidProjectScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Our Project", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
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
                .padding(16.dp)
        ) {
            Text("Nexora Smart Robot", color = Color.White, fontSize = 20.sp)
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                "Nexora Smart Robot is a prototype of a smart, mobile-controlled robot designed with advanced sensors, wireless communication and our own Control Engine to provide seamless control and monitoring.",
                color = NexoraTextSecondary,
                fontSize = 13.sp
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidComponentsScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Components", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp)) {
            Text("Verified Hardware Inventory", color = Color.White)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidGalleryScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Project Gallery", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp)) {
            Text("Prototype & Circuit Photographs", color = Color.White)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidTeamScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Our Team", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp)) {
            Text("Gautam Tiwari (Team Lead & Developer)", color = NexoraCyan, fontSize = 16.sp)
            Text("Handles project planning, web development and control engine.", color = NexoraTextSecondary, fontSize = 12.sp)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidTimelineScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Project Development", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp)) {
            Text("Phase 1: Prototype Development [Completed]", color = NexoraSuccess)
            Text("Phase 2: Control Engine Development [In Progress]", color = NexoraCyan)
            Text("Phase 3: Hardware Integration & Testing [Pending]", color = NexoraTextSecondary)
            Text("Phase 4: Live Demonstration [Pending]", color = NexoraTextSecondary)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidAdminScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Admin Panel", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp)) {
            Text("Authorized Admin: tiwarigautam819@gmail.com", color = NexoraCyan)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AndroidSettingsScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Settings", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = NexoraDarkNavy)
            )
        },
        containerColor = NexoraDarkNavy
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp)) {
            Text("App Settings & Robot Communication", color = Color.White)
        }
    }
}
