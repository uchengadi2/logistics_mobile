import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import OrderBookingForm from "../components/OrderBookingForm";
import useToken from "../custom-hooks/useToken";
import useUserId from "../custom-hooks/useUserId";
import LoginForm from "./../components/LoginForm";

function OrderBookingScreen({ route, navigation }) {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();

  const categoryId = route.params.categoryId;
  const categoryName = route.params.categoryName;
  const imageUrl = route.params.imageUrl;
  const categoryDescription = route.params.categoryDescription;

  return (
    <View>
      <OrderBookingForm
        categoryId={categoryId}
        imageUrl={imageUrl}
        categoryName={categoryName}
        categoryDescription={categoryDescription}
        userId={userId}
        // token={token}
        // userId={userId}
      />
    </View>
  );
}

export default OrderBookingScreen;

const styles = StyleSheet.create({});
