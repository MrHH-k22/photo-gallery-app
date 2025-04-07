import React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import ImageList from "./ImageList";
import FloatingActionButton from "./FloatingActionButton";

export default function Index() {
  const navigation = useNavigation(); // Use the hook to get the navigation object

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
