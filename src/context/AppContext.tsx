import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AdminUser,
  ComponentItem,
  GalleryItem,
  MovementDirection,
  RobotConfig,
  RobotMode,
  RobotTelemetry,
  Screen,
  TeamMember,
  TimelinePhase,
} from '../types';
import { robotService } from '../services/robotService';
import { AUTHORIZED_ADMIN_EMAIL, storageService } from '../services/storageService';
import {
  deleteComponentFromFirestore,
  deleteGalleryItemFromFirestore,
  deleteTeamMemberFromFirestore,
  saveComponentToFirestore,
  saveGalleryItemToFirestore,
  saveTeamMemberToFirestore,
  subscribeToComponents,
  subscribeToGallery,
  subscribeToTeam,
} from '../services/firebase';

interface AppContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  screenHistory: Screen[];
  
  // Robot Hardware State & Actions
  telemetry: RobotTelemetry;
  config: RobotConfig;
  updateConfig: (newConfig: Partial<RobotConfig>) => void;
  connectRobot: (customIp?: string) => void;
  disconnectRobot: () => void;
  setRobotSpeed: (speed: number) => void;
  setRobotMode: (mode: RobotMode) => void;
  startMovement: (dir: MovementDirection) => void;
  stopMovement: () => void;
  triggerEmergencyStop: () => void;
  enableSimulatedLabHardware: () => void;

  // Showcase Data
  team: TeamMember[];
  components: ComponentItem[];
  gallery: GalleryItem[];
  timeline: TimelinePhase[];
  updateTeam: (members: TeamMember[]) => void;
  updateComponents: (components: ComponentItem[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateTimeline: (timeline: TimelinePhase[]) => void;
  deleteTeamMember: (id: string) => Promise<void>;
  deleteComponent: (id: string) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  resetAllData: () => void;

  // Admin Auth
  adminUser: AdminUser;
  loginAdmin: (email: string, pass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;

  // UI States
  viewMode: 'phone' | 'fullscreen';
  setViewMode: (mode: 'phone' | 'fullscreen') => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  showAndroidExportModal: boolean;
  setShowAndroidExportModal: (show: boolean) => void;
  notification: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['splash']);
  const [telemetry, setTelemetry] = useState<RobotTelemetry>(robotService.getTelemetry());
  const [config, setConfig] = useState<RobotConfig>(robotService.getConfig());
  
  const [team, setTeam] = useState<TeamMember[]>(storageService.getTeam());
  const [components, setComponents] = useState<ComponentItem[]>(storageService.getComponents());
  const [gallery, setGallery] = useState<GalleryItem[]>(storageService.getGallery());
  const [timeline, setTimeline] = useState<TimelinePhase[]>(storageService.getTimeline());
  const [adminUser, setAdminUser] = useState<AdminUser>(storageService.getAdminUser());

  const [viewMode, setViewMode] = useState<'phone' | 'fullscreen'>('phone');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAndroidExportModal, setShowAndroidExportModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsubRobot = robotService.subscribe((t) => {
      setTelemetry(t);
    });

    // Subscribe to Firebase Firestore real-time collections
    let initialTeamSnapshot = false;
    const unsubTeam = subscribeToTeam((cloudTeam) => {
      if (cloudTeam.length > 0 || initialTeamSnapshot) {
        setTeam(cloudTeam);
        storageService.saveTeam(cloudTeam);
      }
      initialTeamSnapshot = true;
    });

    let initialGallerySnapshot = false;
    const unsubGallery = subscribeToGallery((cloudGallery) => {
      if (cloudGallery.length > 0 || initialGallerySnapshot) {
        setGallery(cloudGallery);
        storageService.saveGallery(cloudGallery);
      }
      initialGallerySnapshot = true;
    });

    let initialComponentsSnapshot = false;
    const unsubComponents = subscribeToComponents((cloudComponents) => {
      if (cloudComponents.length > 0 || initialComponentsSnapshot) {
        setComponents(cloudComponents);
        storageService.saveComponents(cloudComponents);
      }
      initialComponentsSnapshot = true;
    });

    return () => {
      unsubRobot();
      unsubTeam();
      unsubGallery();
      unsubComponents();
    };
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const navigateTo = (screen: Screen) => {
    setIsDrawerOpen(false);
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const updateConfig = (newConfig: Partial<RobotConfig>) => {
    robotService.updateConfig(newConfig);
    setConfig(robotService.getConfig());
    showToast('Hardware configuration updated');
  };

  const connectRobot = (customIp?: string) => {
    robotService.connect(customIp);
  };

  const disconnectRobot = () => {
    robotService.disconnect();
    showToast('Robot disconnected');
  };

  const setRobotSpeed = (speed: number) => {
    robotService.setSpeed(speed);
  };

  const setRobotMode = (mode: RobotMode) => {
    robotService.setMode(mode);
    showToast(`Mode switched to: ${mode === 'manual' ? 'Manual' : 'Automatic Avoidance'}`);
  };

  const startMovement = (dir: MovementDirection) => {
    robotService.startMovement(dir);
  };

  const stopMovement = () => {
    robotService.stopActiveMovement();
  };

  const triggerEmergencyStop = () => {
    robotService.stopActiveMovement();
    robotService.sendCommand('EMERGENCY_STOP');
    showToast('EMERGENCY STOP ENGAGED');
  };

  const enableSimulatedLabHardware = () => {
    robotService.enableSimulatedLabHardware();
    showToast('Lab Hardware Demo Bridge Connected');
  };

  const updateTeam = async (members: TeamMember[]) => {
    storageService.saveTeam(members);
    setTeam(members);
    showToast('Saving to Firebase...');
    for (const m of members) {
      try {
        await saveTeamMemberToFirestore(m);
      } catch (e) {
        console.warn('Firebase team save warning:', e);
      }
    }
    showToast('Team profiles saved to Firebase');
  };

  const updateComponents = async (comps: ComponentItem[]) => {
    storageService.saveComponents(comps);
    setComponents(comps);
    for (const c of comps) {
      try {
        await saveComponentToFirestore(c);
      } catch (e) {
        console.warn('Firebase component save warning:', e);
      }
    }
    showToast('Components updated in Firebase');
  };

  const updateGallery = async (items: GalleryItem[]) => {
    storageService.saveGallery(items);
    setGallery(items);
    showToast('Saving photos to Firebase...');
    for (const item of items) {
      try {
        await saveGalleryItemToFirestore(item);
      } catch (e) {
        console.warn('Firebase gallery save warning:', e);
      }
    }
    showToast('Gallery saved to Firebase');
  };

  const updateTimeline = (phases: TimelinePhase[]) => {
    storageService.saveTimeline(phases);
    setTimeline(phases);
    showToast('Timeline updated');
  };

  const deleteTeamMember = async (id: string) => {
    const updated = team.filter((m) => m.id !== id);
    setTeam(updated);
    storageService.saveTeam(updated);
    try {
      await deleteTeamMemberFromFirestore(id);
    } catch (e) {
      console.warn('Firebase delete team warning:', e);
    }
    showToast('Team profile removed');
  };

  const deleteComponent = async (id: string) => {
    const updated = components.filter((c) => c.id !== id);
    setComponents(updated);
    storageService.saveComponents(updated);
    try {
      await deleteComponentFromFirestore(id);
    } catch (e) {
      console.warn('Firebase delete component warning:', e);
    }
    showToast('Component removed');
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    storageService.saveGallery(updated);
    try {
      await deleteGalleryItemFromFirestore(id);
    } catch (e) {
      console.warn('Firebase delete gallery warning:', e);
    }
    showToast('Image removed successfully');
  };

  const resetAllData = () => {
    storageService.resetToDefaults();
    setTeam(storageService.getTeam());
    setComponents(storageService.getComponents());
    setGallery(storageService.getGallery());
    setTimeline(storageService.getTimeline());
    showToast('Project database restored to original specifications');
  };

  const loginAdmin = (email: string, pass: string) => {
    const res = storageService.loginAdmin(email, pass);
    if (res.success) {
      setAdminUser(storageService.getAdminUser());
      showToast(res.message);
    }
    return res;
  };

  const logoutAdmin = () => {
    storageService.logoutAdmin();
    setAdminUser(storageService.getAdminUser());
    showToast('Administrator logged out');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goBack,
        screenHistory,
        telemetry,
        config,
        updateConfig,
        connectRobot,
        disconnectRobot,
        setRobotSpeed,
        setRobotMode,
        startMovement,
        stopMovement,
        triggerEmergencyStop,
        enableSimulatedLabHardware,
        team,
        components,
        gallery,
        timeline,
        updateTeam,
        updateComponents,
        updateGallery,
        updateTimeline,
        deleteTeamMember,
        deleteComponent,
        deleteGalleryItem,
        resetAllData,
        adminUser,
        loginAdmin,
        logoutAdmin,
        viewMode,
        setViewMode,
        isDrawerOpen,
        setIsDrawerOpen,
        showAndroidExportModal,
        setShowAndroidExportModal,
        notification,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
