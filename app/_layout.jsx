import { Stack } from "expo-router";
import { ImageProvider } from "./ImageContext";

export default function RootLayout() {
  return (
    <ImageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ImageProvider>
  );
}
