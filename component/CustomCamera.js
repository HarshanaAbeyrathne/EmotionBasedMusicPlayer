import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from "react-native-vision-camera";
import { useEffect, useRef, useState } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import CameraPermissions from "./CameraPermissions";

function CustomCamera() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef(null); // Using useRef hook to create a ref
  const [currentImage, setCurrentImage] = useState(null);

  const device = useCameraDevice("front");

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [requestPermission]);

  console.log("hasPermission:", hasPermission);

  const captureImage = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setCurrentImage(photo.path);
      console.log(photo);
    }
  };

  if (!hasPermission) return <CameraPermissions />;
  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        photo={true}
        isActive={true}
      />
      <View style={styles.captureButtonContainer}>
        <Pressable
          style={styles.captureButton}
          onPress={() => captureImage()}
        ></Pressable>
        {currentImage && <Image source={{ uri: 'file://' + currentImage }} style={styles.capturedImage} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "transparent",
  },
  camera: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  captureButtonContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
    height: 210,
    bottom: 0,
  },
  captureButton: {
    position: "absolute",
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 30,
    elevation: 0,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    backgroundColor: "transparent",
  },
  capturedImage: {
    position: "absolute",
    right: 20,
    width: 90,
    height: 160,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
});

export default CustomCamera;
