# Project: Photo Gallery app

Student id: 22110028

Student name: Nguyễn Mai Huy Hoàng

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Fearture

### 1. Grid View with Clickable Images

- Students will implement a grid layout displaying photo thumbnails using `LazyVerticalGrid` in Jetpack Compose.
- Each thumbnail will be a **clickable image**, opening the full photo view when tapped.
- This satisfies the **"clickable images"** requirement and introduces students to **efficient list handling** in Compose.

### 2. Full Photo View with Buttons

- The full photo view will include **navigation buttons** for moving to the previous or next photo.
- This fulfills the **"buttons"** requirement.
- It teaches students about **UI navigation** and **state management**.

### 3. Floating Action Button (FAB)

- A **FloatingActionButton** will be implemented for quick access to:
  - Adding new photos (from **camera** or **gallery**)
  - Accessing **settings**
- This meets the **"floating action button"** requirement and introduces students to Compose's **FloatingActionButton** component.

### 4. Gesture Implementation

- Common gestures include:
  - **Swiping left or right** in full photo view to navigate between photos
  - **Pinch to zoom** for detailed photo viewing
  - **Long press** on grid items to delete or favorite photos
- This covers the **"common gestures"** requirement and utilizes Compose's **gesture APIs**, enhancing understanding of **touch interactions**.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
