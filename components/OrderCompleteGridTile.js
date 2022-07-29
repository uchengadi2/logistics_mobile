import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { selectToken, selectUserId } from "./../store/redux/auth";
import { baseURL } from "./util/util";
import { GlobalStyles } from "./Styles";
import api from "./../apis/local";

function OrderCompleteGridTile({
  orderNumber,
  color,
  category,
  orderQuantity,
  dateOrdered,
  status,
  consignmentCountry,
  destinationCountry,
  logisticsInsurancetype,
  orderedBy,
  consignmentName,
  consignmentDescription,
  weight,
  unit,
  owner,
  type,
  sourceName,
  sourceAddress,
  sourceCity,
  sourceState,
  sourcePlaceType,
  sourceContactPersonName,
  sourceContactPersonPhoneNumber,
  destinationAddress,
  destinationCity,
  destinationState,
  destinationPlaceType,
  destinationContactPersonName,
  destinationContactPersonPhoneNumber,
  onPress,
}) {
  // const navigation = useNavigation()
  //const baseURL = "http://192.168.43.16:5000";
  //const imageUrl = `${baseURL}/images/categories/${image}`;

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryImage, setCategoryImage] = useState();
  const [selectedSourceCountry, setSelectedSourceCountry] = useState();
  const [selectedSourceCity, setSelectedSourceCity] = useState();
  const [selectedSourceState, setSelectedSourceState] = useState();
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState();
  const [selectedDestinationState, setSelectedDestinationState] = useState();
  const [selectedDestinationCity, setSelectedDestinationCity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/categories/${category}`);
      const workingData = response.data.data.data;
      setSelectedCategory(workingData.name);
      setCategoryImage(workingData.image);
    };

    //call the function

    fetchData().catch(console.error);
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/countries/${consignmentCountry}`);
      const workingData = response.data.data.data;
      setSelectedSourceCountry(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [consignmentCountry]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/states/${sourceState}`);
      const workingData = response.data.data.data;
      setSelectedSourceState(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [sourceState]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/cities/${sourceCity}`);
      const workingData = response.data.data.data;
      setSelectedSourceCity(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [sourceCity]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/countries/${destinationCountry}`);
      const workingData = response.data.data.data;
      setSelectedDestinationCountry(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [destinationCountry]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/states/${destinationState}`);
      const workingData = response.data.data.data;
      setSelectedDestinationState(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [destinationState]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/cities/${destinationCity}`);
      const workingData = response.data.data.data;
      setSelectedDestinationCity(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [destinationCity]);

  //   function numberWithCommas(num) {
  //     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   }

  let insurance;

  if (logisticsInsurancetype === "notApplicable") {
    insurance = "Not Applicable";
  } else if (logisticsInsurancetype === "atSourceCountryOnly") {
    insurance = "Applicable Only at Source Location";
  } else if (logisticsInsurancetype === "atDestinationCountryOnly") {
    insurance = "Applicable Only at Destination Location";
  } else if (logisticsInsurancetype === "fromSourceToDestination") {
    insurance = "Covers the entire Journey";
  }

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
            {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
            <Text style={styles.name}>
              <Text style={styles.label}>Order Number:</Text>
              {orderNumber}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Date Ordered:</Text>
              {dateOrdered ? new Date(dateOrdered).toDateString() : ""}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Quantity Ordered:</Text>
              {orderQuantity}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Category:</Text>
              {selectedCategory}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Status:</Text>
              {status}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Consignment Owner:</Text>
              {owner}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Consignment Type:</Text>
              {consignmentName}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Consignment Description:</Text>
              {consignmentDescription}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Consignment Weight:</Text>
              {weight} <Text>{unit}</Text>
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Source Address:</Text>
              {sourceAddress}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Source Country:</Text>
              {selectedSourceCountry}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Source State:</Text>
              {selectedSourceState}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Source City:</Text>
              {selectedSourceCity}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Source Contact Person:</Text>
              {sourceContactPersonName}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Source Phone Number:</Text>
              {sourceContactPersonPhoneNumber}
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Source Place Type:</Text>
              {sourcePlaceType}
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Destination Address:</Text>
              {destinationAddress}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Destination Country:</Text>
              {selectedDestinationCountry}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Destination State:</Text>
              {selectedDestinationState}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Destination City:</Text>
              {selectedDestinationCity}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Destination Place Type:</Text>
              {destinationPlaceType}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Destination Contact Person:</Text>
              {destinationContactPersonName}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Destination Phone Number:</Text>
              {destinationContactPersonPhoneNumber}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Insurance Type:</Text>
              {insurance}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default OrderCompleteGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 850,
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
    // fontWeight: "bold",
    //textAlign: "center",
    fontSize: 13,
    margin: 7,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
  },
});
