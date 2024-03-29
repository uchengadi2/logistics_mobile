import { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUserId } from "./../store/redux/auth";
import api from "./../apis/local";
import { GlobalStyles } from "../components/Styles";
import CustomButton from "../components/CustomButton";
import { authActions } from "./../store/redux/auth";

function ProfileScreen({ navigation, route }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/users/${userId}`);
      const workingData = response.data.data.data;
      //console.log(response.data);
      if (response.data.status === "success") {
        if (workingData.name !== undefined) {
          setName(workingData.name);
        }
        if (workingData.email !== undefined) {
          setEmail(workingData.email);
        }
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [userId]);

  function submitForm() {
    //use axios post request here

    dispatch(authActions.logout());

    //navigation.replace("CompletedOrdersScreen");
  }

  return (
    <>
      <ScrollView>
        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
              <Text style={styles.description}>
                <Text style={styles.label}>Name:</Text> {name}
              </Text>
              <Text style={styles.description}>
                <Text style={styles.label}>Email:</Text> {email}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              <CustomButton onPress={submitForm}>Log Out</CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default ProfileScreen;

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
    fontSize: 20,
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
  label: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 8,
    color: GlobalStyles.colors.primary800,
  },
});
