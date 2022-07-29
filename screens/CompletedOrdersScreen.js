import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, FlatList } from "react-native";

import api from "./../apis/local";
import { GlobalStyles } from "../components/Styles";

import { selectToken, selectUserId } from "./../store/redux/auth";
import { completedOrderActions } from "../store/redux/completedOrders";
import OrderCompleteGridTile from "../components/OrderCompleteGridTile";

function CompletedOrdersScreen({ navigation }) {
  const [orderList, setOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();

  // AsyncStorage.removeItem("token");
  // AsyncStorage.removeItem("userId");

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get("/orders", {
        params: { status: "fullfilled", orderedBy: userId },
      });
      const ordersData = response.data.data.data;
      ordersData.map((order) => {
        allData.push({
          id: order._id,
          orderNumber: order.orderNumber,
          dateOrdered: order.dateOrdered,
          status: order.status,
          category: order.category,
          orderQuantity: order.orderQuantity,
          consignmentCountry: order.consignmentCountry,
          destinationCountry: order.destinationCountry,
          orderedBy: order.orderedBy,
          logisticsInsurancetype: order.logisticsInsurancetype,
          consignmentName: order.consignment.name,
          consignmentDescription: order.consignment.description,
          weight: order.consignment.weight.weight,
          unit: order.consignment.weight.unit,
          owner: order.consignment.owner,
          type: order.consignment.type,
          sourceName: order.sourceLocation.sourceName,
          sourceAddress: order.sourceLocation.sourceAddress,
          sourceCity: order.sourceLocation.sourceCity,
          sourceState: order.sourceLocation.sourceState,
          sourcePlaceType: order.sourceLocation.sourcePlaceType,
          sourceContactPersonName:
            order.sourceLocation.sourceContactPerson.contactPersonName,
          sourceContactPersonPhoneNumber:
            order.sourceLocation.sourceContactPerson.contactPersonPhoneNumber,
          destinationAddress: order.destinationLocation.destinationAddress,
          destinationCity: order.destinationLocation.destinationCity,
          destinationState: order.destinationLocation.destinationState,
          destinationPlaceType: order.destinationLocation.destinationPlaceType,
          destinationContactPersonName:
            order.destinationLocation.destinationContactPerson
              .destinationContactPersonName,
          destinationContactPersonPhoneNumber:
            order.destinationLocation.destinationContactPerson
              .destinationContactPersonPhoneNumber,
        });

        const completedOrder = {
          id: order._id,
          orderNumber: order.orderNumber,
          dateOrdered: order.dateOrdered,
          status: order.status,
          category: order.category,
          orderQuantity: order.orderQuantity,
          consignmentCountry: order.consignmentCountry,
          destinationCountry: order.destinationCountry,
          orderedBy: order.orderedBy,
          logisticsInsurancetype: order.logisticsInsurancetype,
          consignmentName: order.consignment.name,
          consignmentDescription: order.consignment.description,
          weight: order.consignment.weight.weight,
          unit: order.consignment.weight.unit,
          owner: order.consignment.owner,
          type: order.consignment.type,
          sourceName: order.sourceLocation.sourceName,
          sourceAddress: order.sourceLocation.sourceAddress,
          sourceCity: order.sourceLocation.sourceCity,
          sourceState: order.sourceLocation.sourceState,
          sourcePlaceType: order.sourceLocation.sourcePlaceType,
          sourceContactPersonName:
            order.sourceLocation.sourceContactPerson.contactPersonName,
          sourceContactPersonPhoneNumber:
            order.sourceLocation.sourceContactPerson.contactPersonPhoneNumber,
          destinationAddress: order.destinationLocation.destinationAddress,
          destinationCity: order.destinationLocation.destinationCity,
          destinationState: order.destinationLocation.destinationState,
          destinationPlaceType: order.destinationLocation.destinationPlaceType,
          destinationContactPersonName:
            order.destinationLocation.destinationContactPerson
              .destinationContactPersonName,
          destinationContactPersonPhoneNumber:
            order.destinationLocation.destinationContactPerson
              .destinationContactPersonPhoneNumber,
        };

        dispatch(completedOrderActions.storeOrder(completedOrder));
      });
      setOrderList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  function renderOrderItem(itemData) {
    function pressHandler() {
      navigation.navigate("CompletedOrderOverScreen", {
        id: itemData.item.id,
        orderNumber: itemData.item.orderNumber,
        dateOrdered: itemData.item.dateOrdered,
        orderQuantity: itemData.item.orderQuantity,
        status: itemData.item.status,
        category: itemData.item.category,
        consignmentCountry: itemData.item.consignmentCountry,
        destinationCountry: itemData.item.destinationCountry,
        logisticsInsurancetype: itemData.item.logisticsInsurancetype,
        orderedBy: itemData.item.orderedBy,
        consignmentName: itemData.item.consignmentName,
        consignmentDescription: itemData.item.consignmentDescription,
        weight: itemData.item.weight,
        unit: itemData.item.unit,
        owner: itemData.item.owner,
        type: itemData.item.type,
        sourceName: itemData.item.sourceName,
        sourceAddress: itemData.item.sourceAddress,
        sourceCity: itemData.item.sourceCity,
        sourceState: itemData.item.sourceState,
        sourcePlaceType: itemData.item.sourcePlaceType,
        sourceContactPersonName: itemData.item.sourceContactPersonName,
        sourceContactPersonPhoneNumber:
          itemData.item.sourceContactPersonPhoneNumber,

        destinationAddress: itemData.item.destinationAddress,
        destinationCity: itemData.item.destinationCity,
        destinationState: itemData.item.destinationState,
        destinationPlaceType: itemData.item.destinationPlaceType,
        destinationContactPersonName:
          itemData.item.destinationContactPersonName,

        destinationContactPersonPhoneNumber:
          itemData.item.destinationContactPersonPhoneNumber,

        orderList: orderList,
      });
    }
    return (
      <OrderCompleteGridTile
        name={itemData.item.orderNumber}
        // image={itemData.item.image}
        orderNumber={itemData.item.orderNumber}
        dateOrdered={itemData.item.dateOrdered}
        orderQuantity={itemData.item.orderQuantity}
        category={itemData.item.category}
        status={itemData.item.status}
        consignmentCountry={itemData.item.consignmentCountry}
        destinationCountry={itemData.item.destinationCountry}
        logisticsInsurancetype={itemData.item.logisticsInsurancetype}
        orderedBy={itemData.item.orderedBy}
        consignmentName={itemData.item.consignmentName}
        consignmentDescription={itemData.item.consignmentDescription}
        weight={itemData.item.weight}
        unit={itemData.item.unit}
        owner={itemData.item.owner}
        type={itemData.item.type}
        sourceName={itemData.item.sourceName}
        sourceAddress={itemData.item.sourceAddress}
        sourceCity={itemData.item.sourceCity}
        sourceState={itemData.item.sourceState}
        sourcePlaceType={itemData.item.sourcePlaceType}
        sourceContactPersonName={itemData.item.sourceContactPersonName}
        sourceContactPersonPhoneNumber={
          itemData.item.sourceContactPersonPhoneNumber
        }
        destinationAddress={itemData.item.destinationAddress}
        destinationCity={itemData.item.destinationCity}
        destinationState={itemData.item.destinationState}
        destinationPlaceType={itemData.item.destinationPlaceType}
        destinationContactPersonName={
          itemData.item.destinationContactPersonName
        }
        destinationContactPersonPhoneNumber={
          itemData.item.destinationContactPersonPhoneNumber
        }
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      // data={CATEGORIES}
      data={orderList}
      keyExtractor={(item) => item.id}
      renderItem={renderOrderItem}
      numColumns={1}
    />
  );
}

export default CompletedOrdersScreen;

const styles = StyleSheet.create({
  selectionContainer: {
    //flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    color: "#ccc",
    //alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 12,
  },
  selectionTitle: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    marginTop: 10,
    marginHorizontal: 12,
  },
  submitButton: {
    marginVertical: 40,
    marginHorizontal: 100,
  },
});
