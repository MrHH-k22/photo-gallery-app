import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Images from "./Images"; // Import the Images array

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);

  // Function to request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera permission is required to take photos"
      );
      return false;
    }
    return true;
  };

  // Function to request media library permissions
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Media library permission is required to select photos"
      );
      return false;
    }
    return true;
  };

  // Function to open camera
  const openCamera = async () => {
    if (await requestCameraPermission()) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        addImageToGallery(result.assets[0].uri);
      }
    }
    setOpen(false);
  };

  // Function to open gallery
  const openGallery = async () => {
    if (await requestMediaLibraryPermission()) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        addImageToGallery(result.assets[0].uri);
      }
    }
    setOpen(false);
  };

  // Function to add image to Images.js
  const addImageToGallery = (uri) => {
    // Since we can't directly modify the imported array (it's readonly),
    // we'll need to use a method to add the image
    if (typeof Images.addImage === "function") {
      Images.addImage({ url: { uri } });
      Alert.alert("Success", "Image added to gallery successfully");
    } else {
      Alert.alert(
        "Error",
        "Unable to add image to gallery. Images module needs to be updated."
      );
    }
  };

  return (
    <View style={styles.container}>
      {open && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.actionText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={openGallery}>
            <Ionicons name="image" size={20} color="#fff" />
            <Text style={styles.actionText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Ionicons name={open ? "close" : "add"} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#6200ee",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  actions: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  actionText: {
    color: "#fff",
    marginLeft: 8,
  },
});
