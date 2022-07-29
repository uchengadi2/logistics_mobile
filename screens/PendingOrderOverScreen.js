import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderDetails from "../components/OrderDetails";
import { baseURL } from "./../components/util/util";
import { selectToken, selectUserId } from "./../store/redux/auth";

import api from "./../apis/local";

function PendingOrderOverScreen({ route, navigation }) {
  const [categoryImage, setCategoryImage] = useState();
  const [categoryName, setCategoryName] = useState();

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const data = {
    category: route.params.category,
    id: route.params.id,
    orderNumber: route.params.orderNumber,
  };

  useEffect(() => {
    const fetchData = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/categories/${data.category}`);
      const workingData = response.data.data.data;
      setCategoryName(workingData.name);
      setCategoryImage(workingData.image);
    };

    //call the function

    fetchData().catch(console.error);
  }, [data.category]);

  const imageUrl = `${baseURL}/images/categories/${categoryImage}`;

  return (
    <OrderDetails
      categoryName={categoryName}
      categoryId={data.category}
      id={data.id}
      orderNumber={data.orderNumber}
      imageUrl={imageUrl}
    />
  );
}

export default PendingOrderOverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
