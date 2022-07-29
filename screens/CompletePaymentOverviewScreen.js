import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import PaymentCompleteDetails from "../components/PaymentCompleteDetails";
import { baseURL } from "./../components/util/util";
import { selectToken, selectUserId } from "./../store/redux/auth";

import api from "./../apis/local";

function CompletePaymentOverviewScreen({ route, navigation }) {
  const [categoryImage, setCategoryImage] = useState();
  const [categoryName, setCategoryName] = useState();

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const data = {
    currency: route.params.agreedPaymentCurrency,
    id: route.params.id,
    totalAmountAlreadyPaid: route.params.totalAmountAlreadyPaid,
    totalAmountExpected: route.params.totalAmountExpected,
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //       const response = await api.get(`/categories/${data.category}`);
  //       const workingData = response.data.data.data;
  //       setCategoryName(workingData.name);
  //       setCategoryImage(workingData.image);
  //     };

  //     //call the function

  //     fetchData().catch(console.error);
  //   }, [data.category]);

  //const imageUrl = `${baseURL}/images/categories/${categoryImage}`;

  return (
    <PaymentCompleteDetails
      currency={data.currency}
      totalAmountAlreadyPaid={data.totalAmountAlreadyPaid}
      paymentId={data.id}
      totalAmountExpected={data.totalAmountExpected}
      //   imageUrl={imageUrl}
    />
  );
}

export default CompletePaymentOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
