import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import OrderBookingForm from "../components/OrderBookingForm";

function OrderBookingScreen({ categoryId, imageUrl }) {
  return (
    <View>
      <OrderBookingForm categoryId={categoryId} imageUrl={imageUrl} />
    </View>
  );
}

export default OrderBookingScreen;

const styles = StyleSheet.create({});
