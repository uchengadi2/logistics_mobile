import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
// import {useNavigation} from '@react-navigation/native'
import { baseURL } from "./util/util";

function CategoryGridTile({ name, color, image, description, onPress }) {
  // const navigation = useNavigation()
  //const baseURL = "http://192.168.43.16:5000";
  const imageUrl = `${baseURL}/images/categories/${image}`;

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 280,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
    flex: 1,
  },

  buttonPressed: {
    opacity: 0.5,
  },
  // innerContainer: {
  //   flex: 1,
  //   padding: 16,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 8,
  // },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },
});
