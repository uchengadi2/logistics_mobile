import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, FlatList } from "react-native";

import { CATEGORIES } from "./../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "./../apis/local";
import { useRoute } from "@react-navigation/native";
import { authActions } from "../store/redux/auth";

function CategoriesScreen({ navigation }) {
  const [categoryList, setCategoryList] = useState([]);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  // AsyncStorage.removeItem("token");
  // AsyncStorage.removeItem("userId");

  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
    };
    storedToken().catch(console.error);
  }, []);

  useEffect(() => {
    const storedUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);
    };
    storedUserId().catch(console.error);
  }, []);

  const authData = {
    token: token,
    userId: userId,
  };

  useEffect(() => {
    if (authData.token && authData.userId) {
      dispatch(authActions.login(authData));
    }
  }, [authData]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await data.get("/categories");
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({
          id: category._id,
          name: category.name,
          image: category.image || " ",
          description: category.description || " ",
        });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  // console.log("this is the token:", token);
  // console.log("this is the user:", userId);

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("CategoriesOverviewScreen", {
        id: itemData.item.id,
        name: itemData.item.name,
        description: itemData.item.description,
        image: itemData.item.image,
        categoryList: categoryList,
      });
    }
    return (
      <CategoryGridTile
        name={itemData.item.name}
        image={itemData.item.image}
        description={itemData.item.description}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      // data={CATEGORIES}
      data={categoryList}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={1}
    />
  );
}

export default CategoriesScreen;
