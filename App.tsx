import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { GameProvider, useGameContext } from './src/context/GameContext';
import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import { GameScreen } from './src/screens/GameScreen/GameScreen';

const MainApp: React.FC = () => {
  const { isPlaying } = useGameContext();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {isPlaying ? <GameScreen /> : <HomeScreen />}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});