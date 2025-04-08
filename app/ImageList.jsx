import React, { useContext } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageContext } from "./ImageContext";
import { Ionicons } from "@expo/vector-icons";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    position: "relative",
    height: deviceHeight / 3,
    width: deviceWidth / 3 - 4,
    margin: 2,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(245, 237, 237, 0.4)",
    borderRadius: 15,
    padding: 5,
    zIndex: 10,
  },
});

export default function ImageList() {
  const navigation = useNavigation();
  const { images, toggleFavorite } = useContext(ImageContext);

  const handleFavoritePress = (id, event) => {
    // Stop the press event from propagating to the image TouchableOpacity
    event.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <View style={styles.container}>
      {images.map((image, index) => {
        // Create a guaranteed unique key by combining id and index
        const uniqueKey = `image-${image.id || ""}-${index}`;

        return (
          <View key={uniqueKey} style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("imagecard", {
                  imageIndex: index,
                });
              }}
            >
              <Image source={image.url} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={(event) =>
                handleFavoritePress(image.id || String(index), event)
              }
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Ionicons
                name={image.isFavorite ? "heart" : "heart-outline"}
                size={20}
                color="##e31b23"
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
