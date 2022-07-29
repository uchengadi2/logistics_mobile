import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, FlatList } from "react-native";

import api from "./../apis/local";
import { GlobalStyles } from "../components/Styles";

import { selectToken, selectUserId } from "./../store/redux/auth";
import { pendingPaymentActions } from "../store/redux/pendingPayment";
import PaymentGridTile from "../components/PaymentGridTile";

function PendingPaymentScreen({ navigation }) {
  const [paymentList, setPaymentList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState();

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get("/payments", {
        params: { paymentStatus: "pending", customer: userId },
      });
      // const response = await api.get("/payments", {
      //   params: { paymentStatus: "pending" },
      // });
      const paymentsData = response.data.data.data;
      paymentsData.map((payment) => {
        allData.push({
          id: payment._id,
          order: payment.order,
          vendor: payment.vendor,
          customer: payment.customer,
          totalAmountExpected: payment.totalAmountExpected,
          totalAmountAlreadyPaid: payment.totalAmountAlreadyPaid,
          lastPaymentRound: payment.lastPaymentRound,
          currentPaymentRound: payment.currentPaymentRound,
          startingPaymentDate: payment.startingPaymentDate,
          lastPaymentDate: payment.lastPaymentDate,
          agreedPaymentCurrency: payment.agreedPaymentCurrency,
          agreedNumberOfPaymentInstallements:
            payment.agreedNumberOfPaymentInstallements,
          paymentStatus: payment.paymentStatus,
          paymentAgreementBookedBy: payment.paymentAgreementBookedBy,
          datePosted: payment.datePosted,
          percentageForInitialPayment:
            payment.paymentBreakdown.initialPaymentInstallment
              .percentageForInitialPayment,
          initialPaymentAmountExpected:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountExpected,
          initialPaymentAmountPaid:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountPaid,
          lastInitialPaymentAmountMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .lastInitialPaymentAmountMade,
          dateFirstInitialPaymentWasMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .dateFirstInitialPaymentWasMade,
          dateLastInitialPaymentAmountWasMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .dateLastInitialPaymentAmountWasMade,
          initialPaymentStatus:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentStatus,

          percentageForSecondPayment:
            payment.paymentBreakdown.secondInstallmentPayment
              .percentageForSecondPayment,
          secondPaymentAmountExpected:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountExpected,
          secondPaymentAmountPaid:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountPaid,
          lastSecondPaymentAmountMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .lastSecondPaymentAmountMade,
          dateFirstSecondPaymentWasMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .dateFirstSecondPaymentWasMade,
          dateLastSecondPaymentAmountWasMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .dateLastSecondPaymentAmountWasMade,
          secondPaymentStatus:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentStatus,

          percentageForThirdPayment:
            payment.paymentBreakdown.thirdInstallmentPayment
              .percentageForThirdPayment,
          thirdPaymentAmountExpected:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountExpected,
          thirdPaymentAmountPaid:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountPaid,
          lastThirdPaymentAmountMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .lastThirdPaymentAmountMade,
          thirdSecondPaymentWasMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdSecondPaymentWasMade,
          dateLastThirdPaymentAmountWasMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .dateLastThirdPaymentAmountWasMade,
          thirdPaymentStatus:
            payment.paymentBreakdown.thirdInstallmentPayment.thirdPaymentStatus,
        });

        const pendingPayment = {
          id: payment._id,
          order: payment.order,
          vendor: payment.vendor,
          customer: payment.customer,
          totalAmountExpected: payment.totalAmountExpected,
          totalAmountAlreadyPaid: payment.totalAmountAlreadyPaid,
          lastPaymentRound: payment.lastPaymentRound,
          currentPaymentRound: payment.currentPaymentRound,
          startingPaymentDate: payment.startingPaymentDate,
          lastPaymentDate: payment.lastPaymentDate,
          agreedPaymentCurrency: payment.agreedPaymentCurrency,
          agreedNumberOfPaymentInstallements:
            payment.agreedNumberOfPaymentInstallements,
          paymentStatus: payment.paymentStatus,

          paymentAgreementBookedBy: payment.paymentAgreementBookedBy,
          datePosted: payment.datePosted,
          percentageForInitialPayment:
            payment.paymentBreakdown.initialPaymentInstallment
              .percentageForInitialPayment,
          initialPaymentAmountExpected:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountExpected,
          initialPaymentAmountPaid:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountPaid,
          lastInitialPaymentAmountMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .lastInitialPaymentAmountMade,
          dateFirstInitialPaymentWasMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .dateFirstInitialPaymentWasMade,
          dateLastInitialPaymentAmountWasMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .dateLastInitialPaymentAmountWasMade,
          initialPaymentStatus:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentStatus,

          percentageForSecondPayment:
            payment.paymentBreakdown.secondInstallmentPayment
              .percentageForSecondPayment,
          secondPaymentAmountExpected:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountExpected,
          secondPaymentAmountPaid:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountPaid,
          lastSecondPaymentAmountMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .lastSecondPaymentAmountMade,
          dateFirstSecondPaymentWasMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .dateFirstSecondPaymentWasMade,
          dateLastSecondPaymentAmountWasMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .dateLastSecondPaymentAmountWasMade,
          secondPaymentStatus:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentStatus,

          percentageForThirdPayment:
            payment.paymentBreakdown.thirdInstallmentPayment
              .percentageForThirdPayment,
          thirdPaymentAmountExpected:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountExpected,
          thirdPaymentAmountPaid:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountPaid,
          lastThirdPaymentAmountMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .lastThirdPaymentAmountMade,
          thirdSecondPaymentWasMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdSecondPaymentWasMade,
          dateLastThirdPaymentAmountWasMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .dateLastThirdPaymentAmountWasMade,
          thirdPaymentStatus:
            payment.paymentBreakdown.thirdInstallmentPayment.thirdPaymentStatus,
        };

        dispatch(pendingPaymentActions.storePayment(pendingPayment));
      });
      setPaymentList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  function renderPaymentItem(itemData) {
    function pressHandler() {
      navigation.navigate("PendingPaymentOverviewScreen", {
        id: itemData.item.id,
        order: itemData.item.order,
        vendor: itemData.item.vendor,
        customer: itemData.item.customer,
        totalAmountExpected: itemData.item.totalAmountExpected,
        totalAmountAlreadyPaid: itemData.item.totalAmountAlreadyPaid,
        lastPaymentRound: itemData.item.lastPaymentRound,
        currentPaymentRound: itemData.item.currentPaymentRound,
        startingPaymentDate: itemData.item.startingPaymentDate,
        lastPaymentDate: itemData.item.lastPaymentDate,
        agreedPaymentCurrency: itemData.item.agreedPaymentCurrency,
        agreedNumberOfPaymentInstallements:
          itemData.item.agreedNumberOfPaymentInstallements,
        paymentStatus: itemData.item.paymentStatus,
        paymentAgreementBookedBy: itemData.item.paymentAgreementBookedBy,
        datePosted: itemData.item.datePosted,
        percentageForInitialPayment: itemData.item.percentageForInitialPayment,
        initialPaymentAmountExpected:
          itemData.item.initialPaymentAmountExpected,
        initialPaymentAmountPaid: itemData.item.initialPaymentAmountPaid,
        lastInitialPaymentAmountMade:
          itemData.item.lastInitialPaymentAmountMade,
        dateFirstInitialPaymentWasMade:
          itemData.item.dateFirstInitialPaymentWasMade,
        dateLastInitialPaymentAmountWasMade:
          itemData.item.dateLastInitialPaymentAmountWasMade,
        initialPaymentStatus: itemData.item.initialPaymentStatus,
        percentageForSecondPayment: itemData.item.percentageForSecondPayment,
        secondPaymentAmountExpected: itemData.item.secondPaymentAmountExpected,
        secondPaymentAmountPaid: itemData.item.secondPaymentAmountPaid,
        lastSecondPaymentAmountMade: itemData.item.lastSecondPaymentAmountMade,
        dateFirstSecondPaymentWasMade:
          itemData.item.dateFirstSecondPaymentWasMade,
        dateLastSecondPaymentAmountWasMade:
          itemData.item.dateLastSecondPaymentAmountWasMade,
        secondPaymentStatus: itemData.item.secondPaymentStatus,
        percentageForThirdPayment: itemData.item.percentageForThirdPayment,
        thirdPaymentAmountExpected: itemData.item.thirdPaymentAmountExpected,
        thirdPaymentAmountPaid: itemData.item.thirdPaymentAmountPaid,
        lastThirdPaymentAmountMade: itemData.item.lastThirdPaymentAmountMade,
        thirdSecondPaymentWasMade: itemData.item.thirdSecondPaymentWasMade,
        dateLastThirdPaymentAmountWasMade:
          itemData.item.dateLastThirdPaymentAmountWasMade,
        thirdPaymentStatus: itemData.item.thirdPaymentStatus,
        paymentList: paymentList,
      });
    }
    return (
      <PaymentGridTile
        id={itemData.item.id}
        order={itemData.item.order}
        vendor={itemData.item.vendor}
        customer={itemData.item.customer}
        totalAmountExpected={itemData.item.totalAmountExpected}
        totalAmountAlreadyPaid={itemData.item.totalAmountAlreadyPaid}
        lastPaymentRound={itemData.item.lastPaymentRound}
        currentPaymentRound={itemData.item.currentPaymentRound}
        startingPaymentDate={itemData.item.startingPaymentDate}
        lastPaymentDate={itemData.item.lastPaymentDate}
        agreedPaymentCurrency={itemData.item.agreedPaymentCurrency}
        agreedNumberOfPaymentInstallements={
          itemData.item.agreedNumberOfPaymentInstallements
        }
        paymentStatus={itemData.item.paymentStatus}
        paymentAgreementBookedBy={itemData.item.paymentAgreementBookedBy}
        datePosted={itemData.item.datePosted}
        percentageForInitialPayment={itemData.item.percentageForInitialPayment}
        initialPaymentAmountExpected={
          itemData.item.initialPaymentAmountExpected
        }
        initialPaymentAmountPaid={itemData.item.initialPaymentAmountPaid}
        lastInitialPaymentAmountMade={
          itemData.item.lastInitialPaymentAmountMade
        }
        dateFirstInitialPaymentWasMade={
          itemData.item.dateFirstInitialPaymentWasMade
        }
        dateLastInitialPaymentAmountWasMade={
          itemData.item.dateLastInitialPaymentAmountWasMade
        }
        initialPaymentStatus={itemData.item.initialPaymentStatus}
        percentageForSecondPayment={itemData.item.percentageForSecondPayment}
        secondPaymentAmountExpected={itemData.item.secondPaymentAmountExpected}
        secondPaymentAmountPaid={itemData.item.secondPaymentAmountPaid}
        lastSecondPaymentAmountMade={itemData.item.lastSecondPaymentAmountMade}
        dateFirstSecondPaymentWasMade={
          itemData.item.dateFirstSecondPaymentWasMade
        }
        dateLastSecondPaymentAmountWasMade={
          itemData.item.dateLastSecondPaymentAmountWasMade
        }
        secondPaymentStatus={itemData.item.secondPaymentStatus}
        percentageForThirdPayment={itemData.item.percentageForThirdPayment}
        thirdPaymentAmountExpected={itemData.item.thirdPaymentAmountExpected}
        thirdPaymentAmountPaid={itemData.item.thirdPaymentAmountPaid}
        lastThirdPaymentAmountMade={itemData.item.lastThirdPaymentAmountMade}
        thirdSecondPaymentWasMade={itemData.item.thirdSecondPaymentWasMade}
        dateLastThirdPaymentAmountWasMade={
          itemData.item.dateLastThirdPaymentAmountWasMade
        }
        thirdPaymentStatus={itemData.item.thirdPaymentStatus}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      // data={CATEGORIES}
      data={paymentList}
      keyExtractor={(item) => item.id}
      renderItem={renderPaymentItem}
      numColumns={1}
    />
  );
}

export default PendingPaymentScreen;

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
