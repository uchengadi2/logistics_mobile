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
import { useSelector } from "react-redux";
import { selectToken, selectUserId } from "./../store/redux/auth";

function OrderDetails({ id, categoryName, imageUrl }) {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const message = {
    message:
      "We are preparing  the quotation on this order for you and will get back to you in the shortest possible time  ",
    nextstep: "Expect to hear from us as soon as possible",
  };
  return (
    <>
      <ScrollView>
        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.name}>{categoryName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
              <Text style={styles.description}>{message.message}</Text>
            </View>
          </View>
        </View>

        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
              <Text style={styles.description}>{message.nextstep}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default OrderDetails;

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
    fontSize: 16,
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
