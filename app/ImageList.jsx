import React, { useContext } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageContext } from "./ImageContext"; // We'll create this next

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    height: deviceHeight / 3,
    width: deviceWidth / 3 - 4,
    borderRadius: 10,
    margin: 2,
  },
});

export default function ImageList() {
  const navigation = useNavigation();
  const { images } = useContext(ImageContext);

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate("imagecard", {
              imageIndex: index,
            });
          }}
        >
          <Image source={image.url} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
