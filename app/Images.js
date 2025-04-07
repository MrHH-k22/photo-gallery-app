import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";

// Initial image array
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

// Create custom hook for image state management
export function useImages() {
  const [images, setImages] = useState(initialImages);

  // Add method to add new images
  const addImage = (imageUri) => {
    // Create a copy of the image to the app's documents directory for persistence
    const persistImage = async (uri) => {
      try {
        const fileName = uri.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });

        // Add the new image to the state
        setImages((currentImages) => [
          ...currentImages,
          { url: { uri: newPath } },
        ]);
      } catch (error) {
        Alert.alert("Error", "Failed to save image: " + error.message);
      }
    };

    persistImage(imageUri);
  };

  return {
    images,
    addImage,
  };
}

// For backward compatibility
const Images = [...initialImages];
Images.addImage = function (image) {
  // This will only work temporarily until page refresh
  this.push(image);

  // Log warning
  console.warn(
    "Warning: directly modifying Images array will not persist changes or trigger UI updates. Use useImages hook instead."
  );
};

export default Images;
