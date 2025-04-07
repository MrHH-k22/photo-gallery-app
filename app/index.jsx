import React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageList from "./ImageList";
import FloatingActionButton from "./FloatingActionButton";
import { ImageProvider } from "./ImageContext";

export default function Index() {
  const navigation = useNavigation();

  const handleSelectedImage = (imageUrl) => {
    navigation.navigate("ImageCard", { image: imageUrl });
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageList onImagePress={handleSelectedImage} />
        </View>
      </ScrollView>
      <FloatingActionButton />
    </>
  );
}
