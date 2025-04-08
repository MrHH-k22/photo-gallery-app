import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial image array with bundled assets - ensure unique IDs
const initialImages = [
  {
    id: "default-1",
    url: require("../assets/images/image1.jpg"),
    isFavorite: false,
  },
  {
    id: "default-2",
    url: require("../assets/images/image2.jpg"),
    isFavorite: false,
  },
  {
    id: "default-3",
    url: require("../assets/images/image3.jpg"),
    isFavorite: false,
  },
  {
    id: "default-4",
    url: require("../assets/images/image4.jpg"),
    isFavorite: false,
  },
  {
    id: "default-5",
    url: require("../assets/images/image5.jpg"),
    isFavorite: false,
  },
  {
    id: "default-6",
    url: require("../assets/images/image6.jpg"),
    isFavorite: false,
  },
  {
    id: "default-7",
    url: require("../assets/images/image7.jpg"),
    isFavorite: false,
  },
  {
    id: "default-8",
    url: require("../assets/images/image8.jpg"),
    isFavorite: false,
  },
  {
    id: "default-9",
    url: require("../assets/images/image9.jpg"),
    isFavorite: false,
  },
  {
    id: "default-10",
    url: require("../assets/images/image10.jpg"),
    isFavorite: false,
  },
  {
    id: "default-11",
    url: require("../assets/images/image11.jpg"),
    isFavorite: false,
  },
  {
    id: "default-12",
    url: require("../assets/images/image12.jpg"),
    isFavorite: false,
  },
  {
    id: "default-13",
    url: require("../assets/images/image13.jpg"),
    isFavorite: false,
  },
  {
    id: "default-14",
    url: require("../assets/images/image14.jpg"),
    isFavorite: false,
  },
  {
    id: "default-15",
    url: require("../assets/images/image15.jpg"),
    isFavorite: false,
  },
  {
    id: "default-16",
    url: require("../assets/images/image16.jpg"),
    isFavorite: false,
  },
  {
    id: "default-17",
    url: require("../assets/images/image17.jpg"),
    isFavorite: false,
  },
];

// Create context
export const ImageContext = createContext();

// Storage keys
const STORAGE_KEY_IMAGES = "gallery_custom_images";
const STORAGE_KEY_FAVORITES = "gallery_favorites";

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState(initialImages);
  const [customImages, setCustomImages] = useState([]);

  // Load custom images and favorites on startup
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Load custom images
        const savedImagesJson = await AsyncStorage.getItem(STORAGE_KEY_IMAGES);
        let validCustomImages = [];

        if (savedImagesJson) {
          const savedImages = JSON.parse(savedImagesJson);

          // Ensure each saved image has a valid ID
          for (const image of savedImages) {
            const fileInfo = await FileSystem.getInfoAsync(image.url.uri);
            if (fileInfo.exists) {
              // If image doesn't have an ID, assign one
              if (!image.id) {
                image.id = `custom-${Date.now()}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`;
              }
              validCustomImages.push(image);
            }
          }
        }

        // Load favorites
        const favoritesJson = await AsyncStorage.getItem(STORAGE_KEY_FAVORITES);
        let favorites = [];
        if (favoritesJson) {
          favorites = JSON.parse(favoritesJson);
        }

        // Apply favorites to default images
        const updatedDefaultImages = initialImages.map((img) => ({
          ...img,
          isFavorite: favorites.includes(img.id),
        }));

        // Apply favorites to custom images
        validCustomImages = validCustomImages.map((img) => ({
          ...img,
          isFavorite: favorites.includes(img.id),
        }));

        setImages([...updatedDefaultImages, ...validCustomImages]);
        setCustomImages(validCustomImages);
      } catch (error) {
        console.error("Failed to load saved data", error);
        // If loading fails, at least set the initial images
        setImages(initialImages);
      }
    };

    loadSavedData();
  }, []);

  // Save custom images when they change
  useEffect(() => {
    const saveImages = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY_IMAGES,
          JSON.stringify(customImages)
        );
      } catch (error) {
        console.error("Failed to save images", error);
      }
    };

    if (customImages.length > 0) {
      saveImages();
    }
  }, [customImages]);

  // Save favorites when they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        const favorites = images
          .filter((img) => img.isFavorite)
          .map((img) => img.id);

        await AsyncStorage.setItem(
          STORAGE_KEY_FAVORITES,
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.error("Failed to save favorites", error);
      }
    };

    saveFavorites();
  }, [images]);

  // Function to add a new image
  const addImage = async (uri) => {
    try {
      // Create a unique filename and ID with timestamp and random string
      const uniqueId = `custom-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const fileName = `image_${uniqueId}.jpg`;
      const newPath = FileSystem.documentDirectory + fileName;

      // Copy the image to app's document directory
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      const newImage = {
        id: uniqueId,
        url: { uri: newPath },
        isFavorite: false,
      };

      // Update state
      setCustomImages((prev) => [...prev, newImage]);
      setImages((prev) => [...prev, newImage]);

      Alert.alert("Success", "Image added to gallery successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save image: " + error.message);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = (id) => {
    if (!id) return; // Skip if no ID is provided

    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
      )
    );

    // Also update customImages if it's a custom image
    setCustomImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
      )
    );
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        addImage,
        toggleFavorite,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
