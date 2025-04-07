import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {open && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => alert("Open Camera")}
          >
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.actionText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => alert("Open Gallery")}
          >
            <Ionicons name="image" size={20} color="#fff" />
            <Text style={styles.actionText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => alert("Open Settings")}
          >
            <Ionicons name="settings" size={20} color="#fff" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Ionicons name={open ? "close" : "add"} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#6200ee",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  actions: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  actionText: {
    color: "#fff",
    marginLeft: 8,
  },
});
