import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { ImageContext } from "./ImageContext";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're already using this for other icons

export default function ImageCard() {
  const params = useLocalSearchParams();
  const { imageIndex } = params;
  const { images } = useContext(ImageContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (imageIndex !== undefined) {
      const index = parseInt(imageIndex, 10);
      if (!isNaN(index)) {
        setCurrentIndex(index);
      }
    }
  }, [imageIndex]);

  const increaseIndex = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex < images.length && images[nextIndex]?.url) {
        return nextIndex;
      }
      return prev; // stay the same if next index is invalid
    });
    // Reset zoom when changing images
    setIsZoomed(false);
  };

  const decreaseIndex = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex >= 0 && images[prevIndex]?.url) {
        return prevIndex;
      }
      return prev; // stay the same if previous index is invalid
    });
    // Reset zoom when changing images
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const imageSource = images[currentIndex]?.url;

  return (
    <View style={styles.container}>
      {imageSource && (
        <ImageBackground
          source={imageSource}
          style={[styles.image, isZoomed && styles.zoomedImage]}
          imageStyle={isZoomed ? styles.zoomedImageStyle : null}
        >
          {/* Left Button */}
          <TouchableOpacity style={styles.leftButton} onPress={decreaseIndex}>
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>

          {/* Right Button */}
          <TouchableOpacity style={styles.rightButton} onPress={increaseIndex}>
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>

          {/* Zoom Button */}
          <TouchableOpacity style={styles.zoomButton} onPress={toggleZoom}>
            <Ionicons
              name={isZoomed ? "contract-outline" : "expand-outline"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomedImage: {
    // Container style remains the same
  },
  zoomedImageStyle: {
    // This affects the actual image rendering within the ImageBackground
    transform: [{ scale: 3 }], // 150% zoom
    resizeMode: "contain",
  },
  leftButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -25 }],
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
    zIndex: 10, // Ensure buttons remain on top
  },
  rightButton: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -25 }],
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
    zIndex: 10, // Ensure buttons remain on top
  },
  zoomButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
    zIndex: 10, // Ensure buttons remain on top
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
