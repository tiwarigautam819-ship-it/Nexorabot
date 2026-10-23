/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AndroidFrame } from './components/AndroidFrame';
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { RobotControlScreen } from './components/screens/RobotControlScreen';
import { CameraScreen } from './components/screens/CameraScreen';
import { SensorsScreen } from './components/screens/SensorsScreen';
import { ProjectScreen } from './components/screens/ProjectScreen';
import { ComponentsScreen } from './components/screens/ComponentsScreen';
import { GalleryScreen } from './components/screens/GalleryScreen';
import { TeamScreen } from './components/screens/TeamScreen';
import { TimelineScreen } from './components/screens/TimelineScreen';
import { AdminPanelScreen } from './components/screens/AdminPanelScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'login':
      return <LoginScreen />;
    case 'home':
      return <HomeScreen />;
    case 'control':
      return <RobotControlScreen />;
    case 'camera':
      return <CameraScreen />;
    case 'sensors':
      return <SensorsScreen />;
    case 'project':
      return <ProjectScreen />;
    case 'components':
      return <ComponentsScreen />;
    case 'gallery':
      return <GalleryScreen />;
    case 'team':
      return <TeamScreen />;
    case 'timeline':
      return <TimelineScreen />;
    case 'admin':
      return <AdminPanelScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <HomeScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <AndroidFrame>
        <ScreenRouter />
      </AndroidFrame>
    </AppProvider>
  );
}
