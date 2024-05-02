import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import TrackPlayer, {Capability} from "react-native-track-player";
import { useEffect } from "react";

import MusicPlayer from "./component/MusicPlayer";
import CustomCamera from "./component/CustomCamera";


export default function App() {
  return (
    <View style={styles.container}>
      <CustomCamera/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
