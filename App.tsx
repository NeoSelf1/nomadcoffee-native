import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => {
    setLoading(false);
  };
  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const imagesToLoad = [
      require('./assets/icon.png'),
      'https://similarpng.com/instagram-name-logo-transparent-png/',
    ];
    //loadAsync =Promise를 반환
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    const fontPromises = fontsToLoad.map((font: any) => Font.loadAsync(font));
    console.log(fontPromises);
    //모든 Promise들을 어레이형태로 반환할때 까지 wait
    //token, profile과 같은 정보를 pre-fetch할 수 있음
    await Promise.all([...fontPromises, ...imagePromises]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  //Theme 변경 후, 앱에 돌아오면 현재 Theme을 파악
  // const light = Appearance.getColorScheme() === 'light';

  return <h1>hi</h1>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
