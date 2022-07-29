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
import { useSelector } from "react-redux";
import { selectToken, selectUserId } from "./../store/redux/auth";
import api from "./../apis/local";

function PaymentPendingDetails({
  paymentId,
  currency,
  totalAmountAlreadyPaid,
  totalAmountExpected,
}) {
  const [currencyCode, setCurrencyCode] = useState();
  const [currencyName, setCurrencyName] = useState();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/currencies/${currency}`);
      const workingData = response.data.data.data;
      setCurrencyCode(workingData.code);
      setCurrencyName(workingData.name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [currency]);

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const amountRemaining =
    parseFloat(totalAmountExpected) - parseFloat(totalAmountAlreadyPaid);

  const amount = numberWithCommas(amountRemaining);

  const message = {
    message:
      "Above is the total amount that is remaining to complete this order. Transfer this amount to the account that is included in your invoice or proposal. We will be glad to hear from you as soon as possible  ",
    nextstep: "",
  };
  return (
    <>
      <ScrollView>
        {/* <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.name}>{categoryName}</Text>
            </View>
          </View>
        </View> */}

        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
              <Text style={styles.amount}>
                <Text>{currencyCode}</Text>
                {amount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.name}>{message.message}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default PaymentPendingDetails;

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
  amount: {
    fontWeight: "100",
    fontSize: 40,
    textAlign: "center",
    margin: 8,
  },
  name: {
    //fontWeight: "bold",
    // textAlign: "center",
    fontSize: 16,
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
