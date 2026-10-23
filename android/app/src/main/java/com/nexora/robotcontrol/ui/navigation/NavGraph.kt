package com.nexora.robotcontrol.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.nexora.robotcontrol.ui.screens.*

sealed class Screen(val route: String) {
    object Splash : Screen("splash")
    object Home : Screen("home")
    object Control : Screen("control")
    object Sensors : Screen("sensors")
    object Camera : Screen("camera")
    object Project : Screen("project")
    object Components : Screen("components")
    object Gallery : Screen("gallery")
    object Team : Screen("team")
    object Timeline : Screen("timeline")
    object Admin : Screen("admin")
    object Settings : Screen("settings")
}

@Composable
fun NexoraNavGraph() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Splash.route
    ) {
        composable(Screen.Splash.route) {
            AndroidSplashScreen(
                onEnterApp = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                }
            )
        }
        composable(Screen.Home.route) {
            AndroidHomeScreen(navController = navController)
        }
        composable(Screen.Control.route) {
            AndroidRobotControlScreen(navController = navController)
        }
        composable(Screen.Sensors.route) {
            AndroidSensorScreen(navController = navController)
        }
        composable(Screen.Camera.route) {
            AndroidCameraScreen(navController = navController)
        }
        composable(Screen.Project.route) {
            AndroidProjectScreen(navController = navController)
        }
        composable(Screen.Components.route) {
            AndroidComponentsScreen(navController = navController)
        }
        composable(Screen.Gallery.route) {
            AndroidGalleryScreen(navController = navController)
        }
        composable(Screen.Team.route) {
            AndroidTeamScreen(navController = navController)
        }
        composable(Screen.Timeline.route) {
            AndroidTimelineScreen(navController = navController)
        }
        composable(Screen.Admin.route) {
            AndroidAdminScreen(navController = navController)
        }
        composable(Screen.Settings.route) {
            AndroidSettingsScreen(navController = navController)
        }
    }
}
