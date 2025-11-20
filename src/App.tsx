import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CameraScreen from './screens/CameraScreen';
import HomeScreen from './screens/HomeScreen';
import ExportScreen from './screens/ExportScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from './components/SplashScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Export: { videoPath?: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'GlowCam', headerShown: false }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Export"
            component={ExportScreen}
            options={{ title: '영상 내보내기' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: '설정' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

