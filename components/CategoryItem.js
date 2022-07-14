import React from "react";
import {
  View,
  Pressable,
  Text,
  Image,
  Button,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryExtraDetail from "./CategoryExtraDetail";

function CategoryItem({ id, name, imageUrl, description }) {
  const navigation = useNavigation();

  function selectCategoryItemHandler() {
    navigation.navigate("OrderBookingScreen", {
      id: id,
      imageUrl: imageUrl,
      name: name,
      description: description,
    });
  }
  const descriptionText =
    "A truck or lorry is a motor vehicle designed to transport cargo, carry specialized payloads, or perform other utilitarian work. Trucks vary greatly in size, power, and configuration, but the vast majority feature body-on-frame construction, with a cabin that is independent of the payload portion of the vehicle. Smaller varieties may be mechanically similar to some auto";
  return (
    <>
      <ScrollView>
        <View style={styles.categoryItem}>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
            onPress={selectCategoryItemHandler}
          >
            <View style={styles.innerContainer}>
              <View>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.name}>{name}</Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={styles.categoryItem}>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
            onPress={selectCategoryItemHandler}
          >
            <View style={styles.innerContainer}>
              <View>
                {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
                <Text style={styles.bookVehicle}>Tap to Book</Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={styles.categoryItem}>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
            onPress={selectCategoryItemHandler}
          >
            <View style={styles.innerContainer}>
              <View>
                {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
                <Text style={styles.description}>{description}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  categoryItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    width: "100%",
    height: 200,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  description: {
    fontWeight: "100",
    fontSize: 14,
    margin: 8,
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  bookVehicle: {
    fontWeight: "100",
    fontSize: 10,
    margin: 8,
    textAlign: "center",
  },
});
