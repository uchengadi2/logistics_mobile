import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector, useDispatch } from "react-redux";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CategoriesScreen from "./screens/CategoriesScreen";
import CategoriesOverviewScreen from "./screens/CategoriesOverviewScreen";
import OrderBookingScreen from "./screens/OrderBookingScreen";
import UserLoginScreen from "./screens/UserLoginScreen";
import UserSignUpScreen from "./screens/UserSignUpScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import PendingOrdersScreen from "./screens/PendingOrdersScreen";
import CompletedOrders from "./screens/CompletedOrders";
import CompletedOrdersScreen from "./screens/CompletedOrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PendingPaymentScreen from "./screens/PendingPaymentScreen";
import CompletedPaymentsScreen from "./screens/CompletedPaymentsScreen";
import { store } from "./store/redux/store";
import { selectToken, selectUserId } from "./store/redux/auth";
import PendingOrderOverScreen from "./screens/PendingOrderOverScreen";
import CompletedOrderOverviewScreen from "./screens/CompletedOrderOverviewScreen";
import PendingPaymentOverviewScreen from "./screens/PendingPaymentOverviewScreen";
import CompletePaymentOverviewScreen from "./screens/CompletePaymentOverviewScreen";
import CustomButton from "./components/CustomButton";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// function renderStoreValues() {

//   //console.log("token:", token);
//   console.log("userId:", userId);
// }

export default function App() {
  // function PendingOrders() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Home"
  //         component={}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen name="EditPost" component={[]} />
  //     </Stack.Navigator>
  //   );
  // }

  function DrawerNavigation() {
    return (
      <>
        <Provider store={store}>
          <Drawer.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              sceneContainerStyle: {
                backgroundColor: "#3f2f25",
              },
              drawerContentStyle: { backgroundColor: "#351401" },
              drawerInactiveTintColor: "white",
              drawerActiveTintColor: "#351401",
              drawerActiveBackgroundColor: "#e4baa1",
            }}
          >
            <Drawer.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{
                title: "Marketplace",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="list" color={color} size={size} />
                ),
              }}
            />

            {useSelector(selectToken) && (
              <Drawer.Screen
                name="PendingOrdersScreen"
                component={PendingOrdersScreen}
                options={{
                  title: "Pending Orders",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="basket-outline" color={color} size={size} />
                  ),
                }}
              />
            )}

            {useSelector(selectToken) && (
              <Drawer.Screen
                name="CompletedOrdersScreen"
                component={CompletedOrdersScreen}
                options={{
                  title: "Completed Orders",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="archive-outline"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
            )}

            {useSelector(selectToken) && (
              <Drawer.Screen
                name="PendingPaymentsScreen"
                component={PendingPaymentScreen}
                options={{
                  title: "Pending Payments",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="md-logo-euro" color={color} size={size} />
                  ),
                }}
              />
            )}

            {useSelector(selectToken) && (
              <Drawer.Screen
                name="CompletedPaymentsScreen"
                component={CompletedPaymentsScreen}
                options={{
                  title: "Completed Payments",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="md-logo-usd" color={color} size={size} />
                  ),
                }}
              />
            )}

            {useSelector(selectToken) && (
              <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" color={color} size={size} />
                  ),
                }}
              />
            )}
          </Drawer.Navigator>
        </Provider>
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: {
                backgroundColor: "#3f2f25",
              },
            }}
          >
            <Stack.Screen
              name="CategoriesDrawer"
              component={DrawerNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CategoriesOverviewScreen"
              component={CategoriesOverviewScreen}
              options={{
                title: "About this Category",
              }}
            />
            <Stack.Screen
              name="OrderBookingScreen"
              component={OrderBookingScreen}
              options={{
                title: "Book a Vehicle",
              }}
            />
            <Stack.Screen
              name="UserLoginScreen"
              component={UserLoginScreen}
              options={{
                title: "Login Form",
              }}
            />
            <Stack.Screen
              name="UserSignUpScreen"
              component={UserSignUpScreen}
              options={{
                title: "Sign Up Form",
              }}
            />
            <Stack.Screen
              name="ForgetPasswordScreen"
              component={ForgetPasswordScreen}
              options={{
                title: "Reset Password Form",
              }}
            />
            <Stack.Screen
              name="PendingOrderOverScreen"
              component={PendingOrderOverScreen}
              options={{
                title: "Pending Order Details",
              }}
            />
            <Stack.Screen
              name="CompletedOrderOverScreen"
              component={CompletedOrderOverviewScreen}
              options={{
                title: "Completed Order Details",
              }}
            />
            <Stack.Screen
              name="PendingPaymentOverviewScreen"
              component={PendingPaymentOverviewScreen}
              options={{
                title: "Pending Payment Details",
              }}
            />
            <Stack.Screen
              name="CompletePaymentOverviewScreen"
              component={CompletePaymentOverviewScreen}
              options={{
                title: "Complete Payment Details",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
