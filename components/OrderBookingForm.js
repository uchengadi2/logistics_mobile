import React, { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectToken, selectUserId } from "./../store/redux/auth";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { GlobalStyles } from "./Styles";
import { orderActions } from "./../store/redux/orders";

import api from "./../apis/local";
import Input from "./Input";
import CustomButton from "./CustomButton";

function OrderBookingForm({
  categoryId,
  imageUrl,
  categoryName,
  onSubmit,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    category: {
      value: defaultValues ? defaultValues.category : " ",
      isValid: true,
    },
    // consignmentCountry: { value: " ", isValid: true },
    // destinationCountry: { value: " ", isValid: true },
    orderQuantity: { value: " ", isValid: true },
    // logisticsInsurancetype: { value: " ", isValid: true },
    consignmentType: { value: " ", isValid: true },
    consignmentDescription: { value: " ", isValid: true },
    consignmentWeight: { value: " ", isValid: true },
    consignmentOwner: { value: " ", isValid: true },
    consignmentSourceAddress: { value: " ", isValid: true },
    // sourceCity: { value: " ", isValid: true },
    // consignmentsourcestate: { value: " ", isValid: true },
    // sourcePlaceType: { value: " ", isValid: true },
    sourceContactPersonName: { value: " ", isValid: true },
    sourceContactPersonPhoneNumber: { value: " ", isValid: true },
    destinationAddress: { value: " ", isValid: true },
    // destinationCity: { value: " ", isValid: true },
    // consignmentDestinationState: { value: " ", isValid: true },
    // destinationPlaceType: { value: " ", isValid: true },
    destinationContactPersonName: { value: " ", isValid: true },
    destinationContactPersonPhoneNumber: { value: " ", isValid: true },
  });
  const [sourceCountryList, setSourceCountryList] = useState([]);
  const [sourceStateList, setSourceStateList] = useState([]);
  const [sourceCityList, setSourceCityList] = useState([]);
  const [destinationCountryList, setDestinationCountryList] = useState([]);
  const [destinationStateList, setDestinationStateList] = useState([]);
  const [destinationCityList, setDestinationCityList] = useState([]);
  const [sourceCountry, setSourceCountry] = useState();
  const [sourceState, setSourceState] = useState();
  const [sourceCity, setSourceCity] = useState();
  const [destinationCountry, setDestinationCountry] = useState();
  const [destinationState, setDestinationState] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [sourcePlaceType, setSourcePlaceType] = useState();
  const [destinationPlaceType, setDestinationPlaceType] = useState();
  const [logisticsInsurancetype, setLogisticsInsurancetype] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  // console.log("token is at book form:", token);
  // console.log("user id is at book form:", userId);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function sourceCountryInputHandler(enteredText) {
    setSourceCountry(enteredTexte);
  }
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      //data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ value: country._id, label: country.name });
      });
      setSourceCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      //data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ value: country._id, label: country.name });
      });
      setDestinationCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      //data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      // const response = await data.get("/states", {
      //   params: { country: sourceCountry },
      // });
      const response = await api.get("/states", {
        params: { country: sourceCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ value: state._id, label: state.name });
      });
      setSourceStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [sourceCountry]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      // data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      // const response = await data.get("/states", {
      //   params: { country: destinationCountry },
      // });
      const response = await api.get("/states", {
        params: { country: destinationCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ value: state._id, label: state.name });
      });
      setDestinationStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [destinationCountry]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // const response = await data.get("/cities", {
      //   params: { state: sourceState },
      // });
      const response = await api.get("/cities", {
        params: { state: sourceState },
      });
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ value: city._id, label: city.name });
      });
      setSourceCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [sourceState]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // const response = await data.get("/cities", {
      //   params: { state: destinationState },
      // });
      const response = await api.get("/cities", {
        params: { state: destinationState },
      });
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ value: city._id, label: city.name });
      });
      setDestinationCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [destinationState]);

  const placeType = [
    { label: "Warehouse", value: "warehouse" },
    { label: "Port", value: "port" },
    { label: "Jetty", value: "jetty" },
    { label: "Airport", value: "airport" },
    { label: "Park", value: "park" },
    { label: "Street", value: "street" },
    { label: "Business Premises", value: "businessPlace" },
    { label: "Residential Building", value: "residentialBuilding" },
    { label: "School", value: "school" },
    { label: "Complex", value: "complex" },
    { label: "Market Place", value: "market" },
    { label: "Place Of Worship", value: "placeofWorship" },
    { label: "Miliatry Place/Zone", value: "militaryZone" },
    { label: "Plantation", value: "plantation" },
    { label: "Farm", value: "farm" },
    { label: "Zoo", value: "zoo" },
    { label: "Barracks", value: "barracks" },
    { label: "Others", value: "others" },
  ];

  const insuranceType = [
    { label: "At Source Country Only", value: "atSourceCountryOnly" },
    { label: "At Destination Country Only", value: "atDestinationCountryOnly" },
    {
      label: "From Source to Destination Country",
      value: "fromSourceToDestination",
    },
  ];

  function submitForm() {
    const data = {
      orderNumber: Math.floor(Math.random() * 10000000000),
      category: categoryId,
      categoryId: categoryId,
      consignmentCountry: sourceCountry,
      destinationCountry: destinationCountry,
      orderQuantity: inputs.orderQuantity.value,
      orderedBy: userId,
      logisticsInsurancetype: logisticsInsurancetype,
      consignment: {
        name: inputs.consignmentType.value,
        description: inputs.consignmentDescription.value,
        weight: {
          weight: inputs.consignmentWeight.value,
          unit: "kg",
        },
        owner: inputs.consignmentOwner.value,
        type: inputs.consignmentType.value,
        quantity: "",
        coverImage: "",
        images: "",
      },
      sourceLocation: {
        sourceName: "",
        sourceDescription: "",
        sourceAddress: inputs.consignmentSourceAddress.value,
        sourceCity: sourceCity,
        sourceState: sourceState,
        sourcePlaceType: sourcePlaceType,
        sourceCoordinates: [],
        // sourceLatitude: "",
        // sourceLongtitude: "",
        sourceContactPerson: {
          contactPersonName: inputs.sourceContactPersonName.value,
          contactPersonPhoneNumber: inputs.sourceContactPersonPhoneNumber.value,
        },
      },
      destinationLocation: {
        destinationName: "",
        destinationDescription: "",
        destinationAddress: inputs.destinationAddress.value,
        destinationCoordinates: [],
        // destinationLatitude: "",
        // destinationLongtitude: "",
        destinationCity: destinationCity,
        destinationState: destinationState,
        destinationPlaceType: destinationPlaceType,
        destinationContactPerson: {
          destinationContactPersonName:
            inputs.destinationContactPersonName.value,
          destinationContactPersonPhoneNumber:
            inputs.destinationContactPersonPhoneNumber.value,
        },
      },
    };
    //console.log("enterred data:", data);
    //make an api call here

    if (data) {
      const createOrderForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.post("/orders", data);

        if (response.data.status === "success") {
          const orderData = response.data.data.data;

          dispatch(orderActions.createOrder(orderData));

          //navigation.pop();
          Alert.alert(
            "Successful",
            "Your order is placed, We will be reaching you soon!!!"
          );
        } else {
          Alert.alert(
            "Unsuccessful",
            "Something went wrong, please try again!!!"
          );
        }
        navigation.pop();
      };
      createOrderForm().catch((err) => {
        Alert.alert("Error", "Error Placing this Order, Please try again!!!!");
        //Alert.alert("Error", err.message);
      });
    } else {
      Alert.alert("Empty Form", "Please complete the order form");
    }

    //onSubmit(data);
  }
  return (
    <>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.title}>Book a Vehicle</Text>
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Category"
              textInputConfig={{
                //keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, "category"),
                value: categoryName,
              }}
            />
          </View>
          <View>
            <Input
              style={styles.rowInput}
              label="Number Required"
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, "orderQuantity"),
                value: inputs.orderQuantity.value,
              }}
            />
          </View>
          <Text style={styles.subtitle}>Source Location Details</Text>
          <Input
            label="Enter the Name of the owner of the Consignment"
            textInputConfig={{
              //multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(this, "consignmentOwner"),
              value: inputs.consignmentOwner.value,
            }}
          />
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Enter Consignment Type"
              textInputConfig={{
                placeholder: "container",
                onChangeText: inputChangeHandler.bind(this, "consignmentType"),
                value: inputs.consignmentType.value,
              }}
            />
            <Input
              style={styles.rowInput}
              label="Consignment Weight(in kg)"
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(
                  this,
                  "consignmentWeight"
                ),
                value: inputs.consignmentWeight.value,
              }}
            />
          </View>
          <Input
            label="Describe the Consignment"
            textInputConfig={{
              multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(
                this,
                "consignmentDescription"
              ),
              value: inputs.consignmentDescription.value,
            }}
          />
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Source Contact Person"
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(
                  this,
                  "sourceContactPersonName"
                ),
                value: inputs.sourceContactPersonName.value,
              }}
            />
            <Input
              style={styles.rowInput}
              label="Contact Phone Number"
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(
                  this,
                  "sourceContactPersonPhoneNumber"
                ),
                value: inputs.sourceContactPersonPhoneNumber.value,
              }}
            />
          </View>
          <Input
            label="Source Address"
            textInputConfig={{
              multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(
                this,
                "consignmentSourceAddress"
              ),
              value: inputs.consignmentSourceAddress.value,
            }}
          />
          <Text style={styles.selectionTitle}>Select Source Country</Text>
          <View style={styles.selectionContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSourceCountry(value)}
              items={sourceCountryList}
            />
          </View>
          <View style={styles.selectinputsRow}>
            <Text style={styles.selectionTitle}>Select Source State</Text>
            <View style={styles.selectionContainer}>
              <RNPickerSelect
                onValueChange={(value) => setSourceState(value)}
                items={sourceStateList}
              />
            </View>
            <Text style={styles.selectionTitle}>Select Source City</Text>
            <View style={styles.selectionContainer}>
              <RNPickerSelect
                onValueChange={(value) => setSourceCity(value)}
                items={sourceCityList}
              />
            </View>
          </View>
          <Text style={styles.selectionTitle}>Select Source Place Type</Text>
          <View style={styles.selectionContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSourcePlaceType(value)}
              items={placeType}
            />
          </View>
          <Text style={styles.subtitle}>Destination Address Details</Text>
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Contact Person"
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(
                  this,
                  "destinationContactPersonName"
                ),
                value: inputs.destinationContactPersonName.value,
              }}
            />
            <Input
              style={styles.rowInput}
              label="Phone Number"
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(
                  this,
                  "destinationContactPersonPhoneNumber"
                ),
                value: inputs.destinationContactPersonPhoneNumber.value,
              }}
            />
          </View>
          <Input
            label="Destination Address"
            textInputConfig={{
              multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(this, "destinationAddress"),
              value: inputs.destinationAddress.value,
            }}
          />
          <Text style={styles.selectionTitle}>Select Destination Country</Text>
          <View style={styles.selectionContainer}>
            <RNPickerSelect
              onValueChange={(value) => setDestinationCountry(value)}
              items={destinationCountryList}
            />
          </View>
          <View style={styles.selectinputsRow}>
            <Text style={styles.selectionTitle}>Select Destination State</Text>
            <View style={styles.selectionContainer}>
              <RNPickerSelect
                onValueChange={(value) => setDestinationState(value)}
                items={destinationStateList}
              />
            </View>
            <Text style={styles.selectionTitle}>Select Destination City</Text>
            <View style={styles.selectionContainer}>
              <RNPickerSelect
                onValueChange={(value) => setDestinationCity(value)}
                items={destinationCityList}
              />
            </View>
          </View>
          <Text style={styles.selectionTitle}>Destination Place Type</Text>
          <View style={styles.selectionContainer}>
            <RNPickerSelect
              onValueChange={(value) => setDestinationPlaceType(value)}
              items={placeType}
            />
          </View>
          <Text style={styles.subtitle}>Insurance Type</Text>
          <View style={styles.selectionContainer}>
            <RNPickerSelect
              onValueChange={(value) => setLogisticsInsurancetype(value)}
              items={insuranceType}
            />
          </View>

          {/* <SelectionInput title={"Languages"} list={list} /> */}
        </View>
        <View style={styles.submitButton}>
          <CustomButton onPress={submitForm}>Submit</CustomButton>
        </View>
      </ScrollView>
    </>
  );
}

export default OrderBookingForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    //textAlign: "center",
    marginTop: 15,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  selectinputsRow: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  submitButton: {
    marginVertical: 40,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    color: "#ccc",
    //alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  selectionTitle: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    marginTop: 10,
  },
});
