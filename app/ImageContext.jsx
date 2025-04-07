import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial image array with bundled assets
const initialImages = [
  { url: require("../assets/images/image1.jpg") },
  { url: require("../assets/images/image2.jpg") },
  { url: require("../assets/images/image3.jpg") },
  { url: require("../assets/images/image4.jpg") },
  { url: require("../assets/images/image5.jpg") },
  { url: require("../assets/images/image6.jpg") },
  { url: require("../assets/images/image7.jpg") },
  { url: require("../assets/images/image8.jpg") },
  { url: require("../assets/images/image9.jpg") },
  { url: require("../assets/images/image10.jpg") },
  { url: require("../assets/images/image11.jpg") },
  { url: require("../assets/images/image12.jpg") },
  { url: require("../assets/images/image13.jpg") },
  { url: require("../assets/images/image14.jpg") },
  { url: require("../assets/images/image15.jpg") },
  { url: require("../assets/images/image16.jpg") },
  { url: require("../assets/images/image17.jpg") },
];

// Create context
export const ImageContext = createContext();

// Storage key for saved images
const STORAGE_KEY = "gallery_custom_images";

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState(initialImages);
  const [customImages, setCustomImages] = useState([]);

  // Load custom images on startup
  useEffect(() => {
    const loadSavedImages = async () => {
      try {
        const savedImagesJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedImagesJson) {
          const savedImages = JSON.parse(savedImagesJson);

          // Check if saved image files still exist
          const validImages = [];
          for (const image of savedImages) {
            const fileInfo = await FileSystem.getInfoAsync(image.url.uri);
            if (fileInfo.exists) {
              validImages.push(image);
            }
          }

          setCustomImages(validImages);
          setImages([...initialImages, ...validImages]);
        }
      } catch (error) {
        console.error("Failed to load saved images", error);
      }
    };

    loadSavedImages();
  }, []);

  // Save custom images when they change
  useEffect(() => {
    const saveImages = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customImages));
      } catch (error) {
        console.error("Failed to save images", error);
      }
    };

    if (customImages.length > 0) {
      saveImages();
    }
  }, [customImages]);

  // Function to add a new image
  const addImage = async (uri) => {
    try {
      // Create a unique filename
      const fileName = `custom_image_${Date.now()}.jpg`;
      const newPath = FileSystem.documentDirectory + fileName;

      // Copy the image to app's document directory
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      const newImage = { url: { uri: newPath } };

      // Update state
      setCustomImages((prev) => [...prev, newImage]);
      setImages((prev) => [...prev, newImage]);

      Alert.alert("Success", "Image added to gallery successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save image: " + error.message);
    }
  };

  return (
    <ImageContext.Provider value={{ images, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};
