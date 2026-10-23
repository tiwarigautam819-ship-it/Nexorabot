package com.nexora.robotcontrol

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.nexora.robotcontrol.theme.NexoraTheme
import com.nexora.robotcontrol.theme.NexoraDarkNavy
import com.nexora.robotcontrol.ui.navigation.NexoraNavGraph

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NexoraTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = NexoraDarkNavy
                ) {
                    NexoraNavGraph()
                }
            }
        }
    }
}
