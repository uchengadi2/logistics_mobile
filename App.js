import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import useToken from "./custom-hooks/useToken";
import useUserId from "./custom-hooks/useUserId";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoriesOverviewScreen from "./screens/CategoriesOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import OrderBookingScreen from "./screens/OrderBookingScreen";
import PendingOrdersScreen from "./screens/PendingOrdersScreen";
import CompletedOrders from "./screens/CompletedOrders";
import ProfileScreen from "./screens/ProfileScreen";
import PendingPaymentScreen from "./screens/PendingPaymentScreen";
import CompletedPaymentsScreen from "./screens/CompletedPaymentsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();

  console.log("token is:", token);
  console.log("userid is:", userId);

  function DrawerNavigation() {
    return (
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
          token={token}
          userId={userId}
          options={{
            title: "Marketplace",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
        {token !== undefined ? (
          <Drawer.Screen
            name="Pending Orders"
            component={PendingOrdersScreen}
            token={token}
            userId={userId}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="basket-outline" color={color} size={size} />
              ),
            }}
          />
        ) : (
          <></>
        )}
        {token !== undefined ? (
          <Drawer.Screen
            name="Completed Orders"
            component={CompletedOrders}
            token={token}
            userId={userId}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="archive-outline" color={color} size={size} />
              ),
            }}
          />
        ) : (
          <></>
        )}
        {token !== undefined ? (
          <Drawer.Screen
            name="Pending Payments"
            component={PendingPaymentScreen}
            token={token}
            userId={userId}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="md-logo-euro" color={color} size={size} />
              ),
            }}
          />
        ) : (
          <></>
        )}
        {token !== undefined ? (
          <Drawer.Screen
            name="Completed Payments"
            component={CompletedPaymentsScreen}
            token={token}
            userId={userId}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="md-logo-usd" color={color} size={size} />
              ),
            }}
          />
        ) : (
          <></>
        )}
        {token !== undefined ? (
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            token={token}
            userId={userId}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            }}
          />
        ) : (
          <></>
        )}
      </Drawer.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" />
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
            name="Drawer"
            component={DrawerNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CategoriesOverviewScreen"
            component={CategoriesOverviewScreen}
            token={token}
            userId={userId}
            options={{
              title: "About this Category",
            }}
          />
          <Stack.Screen
            name="OrderBookingScreen"
            component={OrderBookingScreen}
            token={token}
            userId={userId}
            options={{
              title: "Book a Vehicle",
            }}
            // options={{
            //   title: "Meals Details",
            // }}
            // options={{
            //   headerRight: () => {
            //     return <Button title="Tap Me!" />;
            //   },
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
