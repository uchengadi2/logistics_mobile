import React, { useState, useEffect } from "react";

import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import data from "./../apis/local";
import Input from "./Input";
import CustomButton from "./CustomButton";
import SelectionInput from "./SelectionInput";

function OrderBookingForm({
  categoryId,
  imageUrl,
  onSubmit,
  defaultValues,
  token,
}) {
  const [inputs, setInputs] = useState({
    category: {
      value: defaultValues ? defaultValues.category : " ",
      isValid: true,
    },
    consignmentCountry: { value: " ", isValid: true },
    destinationCountry: { value: " ", isValid: true },
    orderQuantity: { value: " ", isValid: true },
    logisticsInsurancetype: { value: " ", isValid: true },
    consignmentType: { value: " ", isValid: true },
    consignmentDescription: { value: " ", isValid: true },
    consignmentWeight: { value: " ", isValid: true },
    consignmentOwner: { value: " ", isValid: true },
    consignmentType: { value: " ", isValid: true },
    consignmentSourceAddress: { value: " ", isValid: true },
    sourceCity: { value: " ", isValid: true },
    consignmentsourcestate: { value: " ", isValid: true },
    sourcePlaceType: { value: " ", isValid: true },
    sourceContactPersonName: { value: " ", isValid: true },
    sourceContactPersonPhoneNumber: { value: " ", isValid: true },
    destinationAddress: { value: " ", isValid: true },
    destinationCity: { value: " ", isValid: true },
    consignmentDestinationState: { value: " ", isValid: true },
    destinationPlaceType: { value: " ", isValid: true },
    destinationContactPersonName: { value: " ", isValid: true },
    destinationContactPersonPhoneNumber: { value: " ", isValid: true },
  });
  const [sourceCountryList, setSourceCountryList] = useState([]);
  const [sourceStateList, setSourceStateList] = useState([]);
  const [sourceCityList, setSourceCityList] = useState([]);
  const [destinationCountryList, setDestinationCountryList] = useState([]);
  const [destinationStateList, setDestinationStateList] = useState([]);
  const [destinationCityList, setDestinationCityList] = useState([]);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      //data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
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
      const response = await data.get("/countries");
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
      const response = await data.get("/states");
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ value: state._id, label: state.name });
      });
      setSourceStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      // data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      // const response = await data.get("/states", {
      //   params: { country: destinationCountry },
      // });
      const response = await data.get("/states");
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ value: state._id, label: state.name });
      });
      setDestinationStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // const response = await data.get("/cities", {
      //   params: { state: sourceState },
      // });
      const response = await data.get("/cities");
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ value: city._id, label: city.name });
      });
      setSourceCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // const response = await data.get("/cities", {
      //   params: { state: destinationState },
      // });
      const response = await data.get("/cities");
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ value: city._id, label: city.name });
      });
      setDestinationCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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
      category: inputs.category.value,
      consignmentCountry: inputs.consignmentCountry.value,
      destinationCountry: inputs.destinationCountry.value,
      orderQuantity: inputs.value.orderQuantity,
      orderedBy: userId,
      logisticsInsurancetype: inputs.value.logisticsInsuranceType,
      consignment: {
        name: inputs.consignmentType.value,
        description: inputs.consignmentDescription.value,
        weight: {
          weight: inputs.consignmentWeight.value,
          unit: "",
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
        sourceCity: inputs.sourceCity.value,
        sourceState: inputs.consignmentsourcestate.value,
        sourcePlaceType: inputs.sourcePlaceType.value,
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
        destinationCity: inputs.destinationCity.value,
        destinationState: inputs.consignmentDestinationState.value,
        destinationPlaceType: inputs.destinationPlaceType.value,
        destinationContactPerson: {
          destinationContactPersonName:
            inputs.destinationContactPersonName.value,
          destinationContactPersonPhoneNumber:
            inputs.destinationContactPersonPhoneNumber.value,
        },
      },
    };

    //state the code of valid data for each input entry

    console.log("enterred data:", data);

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
                value: inputs.category.value,
              }}
            />
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
          <Input
            title="Source Country"
            type={"select"}
            list={sourceCountryList}
            textInputConfig={{
              //multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(this, "consignmentCountry"),
              value: inputs.consignmentCountry.value,
            }}
          />
          <View style={styles.selectinputsRow}>
            <Input
              style={styles.rowInput}
              type={"select"}
              title="Source State/Region"
              list={sourceStateList}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(
                  this,
                  "consignmentsourcestate"
                ),
                value: inputs.consignmentsourcestate.value,
              }}
            />
            <Input
              style={styles.rowInput}
              title="Source City"
              type={"select"}
              list={sourceCityList}
              textInputConfig={{
                //keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, "sourceCity"),
                value: inputs.sourceCity.value,
              }}
            />
          </View>
          <Input
            title="Source Place Type"
            type={"select"}
            list={placeType}
            textInputConfig={{
              //multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(this, "sourcePlaceType"),
              value: inputs.sourcePlaceType.value,
            }}
          />
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
          <Input
            title="Destination Country"
            type={"select"}
            list={destinationCountryList}
            textInputConfig={{
              //multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(this, "destinationCountry"),
              value: inputs.destinationCountry.value,
            }}
          />
          <View style={styles.selectinputsRow}>
            <Input
              style={styles.rowInput}
              title="Destination State/Region"
              type={"select"}
              list={destinationStateList}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(
                  this,
                  "consignmentDestinationState"
                ),
                value: inputs.consignmentDestinationState.value,
              }}
            />
            <Input
              style={styles.rowInput}
              type={"select"}
              list={destinationCityList}
              title="Destination City"
              textInputConfig={{
                //keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, "destinationCity"),
                value: inputs.destinationCity.value,
              }}
            />
          </View>
          <Input
            title="Destination Place Type"
            list={placeType}
            type={"select"}
            textInputConfig={{
              //multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(
                this,
                "destinationPlaceType"
              ),
              value: inputs.destinationPlaceType.value,
            }}
          />
          <Text style={styles.subtitle}>Insurance Type</Text>
          <Input
            title="Insurance Type"
            type={"select"}
            list={insuranceType}
            textInputConfig={{
              //multiline: true,
              //autoCorrect: false,
              //autoCapitalize: "character"
              onChangeText: inputChangeHandler.bind(
                this,
                "logisticsInsurancetype"
              ),
              value: inputs.logisticsInsurancetype.value,
            }}
          />

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
    marginVertical: 20,
  },
});
