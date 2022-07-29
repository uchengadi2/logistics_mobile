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

function PaymentGridTile({
  color,
  id,
  order,
  vendor,
  customer,
  totalAmountExpected,
  totalAmountAlreadyPaid,
  lastPaymentRound,
  currentPaymentRound,
  startingPaymentDate,
  lastPaymentDate,
  agreedPaymentCurrency,
  agreedNumberOfPaymentInstallements,
  paymentStatus,
  paymentAgreementBookedBy,
  datePosted,
  percentageForInitialPayment,
  initialPaymentAmountExpected,
  initialPaymentAmountPaid,
  lastInitialPaymentAmountMade,
  dateFirstInitialPaymentWasMade,
  dateLastInitialPaymentAmountWasMade,
  initialPaymentStatus,
  percentageForSecondPayment,
  secondPaymentAmountExpected,
  secondPaymentAmountPaid,
  dateFirstSecondPaymentWasMade,
  dateLastSecondPaymentAmountWasMade,
  secondPaymentStatus,
  percentageForThirdPayment,
  thirdPaymentAmountPaid,
  lastThirdPaymentAmountMade,
  thirdSecondPaymentWasMade,
  dateLastThirdPaymentAmountWasMade,
  thirdPaymentStatus,
  onPress,
}) {
  // const navigation = useNavigation()
  //const baseURL = "http://192.168.43.16:5000";
  //const imageUrl = `${baseURL}/images/categories/${image}`;

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const [orderNumber, setOrderNumber] = useState();
  const [currency, setCurrency] = useState();

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/orders/${order}`);
      const workingData = response.data.data.data;
      setOrderNumber(workingData.orderNumber);
    };

    //call the function

    fetchData().catch(console.error);
  }, [order]);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/currencies/${agreedPaymentCurrency}`);
      const workingData = response.data.data.data;
      setCurrency(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [agreedPaymentCurrency]);

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
              <Text style={styles.label}>Agreed Payment Currency:</Text>
              {currency}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Total Amount Expected:</Text>
              {numberWithCommas(totalAmountExpected)}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Total Amount Already Paid:</Text>
              {numberWithCommas(totalAmountAlreadyPaid)}
            </Text>
            {/* <Text style={styles.name}>
              <Text style={styles.label}>Last payment Round:</Text>
              {lastPaymentRound}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Current Payment Round:</Text>
              {currentPaymentRound}
            </Text> */}
            <Text style={styles.name}>
              <Text style={styles.label}>Payment Starting Date:</Text>
              {startingPaymentDate
                ? new Date(startingPaymentDate).toDateString()
                : ""}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Last Payment Date:</Text>
              {lastPaymentDate ? new Date(lastPaymentDate).toDateString() : ""}
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Number of Payment Installment:</Text>
              {agreedNumberOfPaymentInstallements}
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Payment Status:</Text>
              {paymentStatus}
            </Text>
            {/* <Text style={styles.name}>
              <Text style={styles.label}>
                Initial Payment Installment(in %):
              </Text>
              {percentageForInitialPayment}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Initial Payment Amount Expected:</Text>
              {initialPaymentAmountExpected}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Initial Payment Amount Paid:</Text>
              {initialPaymentAmountPaid}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>
                Date First Initial Payment was Made:
              </Text>
              {dateFirstInitialPaymentWasMade}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>
                Second Payment Installment(in %):
              </Text>
              {percentageForSecondPayment}
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Second Payment Amount Expected:</Text>
              {secondPaymentAmountExpected}
            </Text>

            <Text style={styles.name}>
              <Text style={styles.label}>Second Payment Installment Made:</Text>
              {secondPaymentAmountPaid}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>
                Date Second Installment commenced:
              </Text>
              {dateFirstSecondPaymentWasMade}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Third Payment Installment(in %):</Text>
              {percentageForThirdPayment}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.label}>Third Payment Installment Made:</Text>
              {thirdPaymentAmountPaid}
            </Text> */}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default PaymentGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 300,
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
