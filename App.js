import { StyleSheet, StatusBar, View } from 'react-native';
import MusicPlayer from './component/MusicPlayer';
import CameraScreen from './component/songSuggestions';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <MusicPlayer/>
      {/* <CameraScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
