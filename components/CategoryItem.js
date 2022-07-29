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
import { Provider, useSelector, useDispatch } from "react-redux";
import { selectToken, selectUserId } from "./../store/redux/auth";
import { useNavigation } from "@react-navigation/native";
import { getSelectedOrder } from "../store/redux/pendingOrders";

function CategoryItem({ id, name, imageUrl, description }) {
  const navigation = useNavigation();

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  // const selectedOrder = useSelector(getSelectedOrder);

  // console.log("selected order at cat:", selectedOrder);

  function selectCategoryItemHandler() {
    if (!token) {
      navigation.navigate("UserLoginScreen");
    } else {
      navigation.navigate("OrderBookingScreen", {
        categoryId: id,
        imageUrl: imageUrl,
        categoryName: name,
        categoryDescription: description,
      });
    }
  }

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
