import { createSlice } from "@reduxjs/toolkit";

const pendingPaymentSlice = createSlice({
  name: "pendingPayments",
  initialState: {
    payments: [],
    selectedPayment: null,
  },
  reducers: {
    storePayment: (state, action) => {
      state.payments.push({
        id: action.payload.id,
        order: action.payload.order,
        vendor: action.payload.vendor,
        customer: action.payload.customer,
        totalAmountExpected: action.payload.totalAmountExpected,
        totalAmountAlreadyPaid: action.payload.totalAmountAlreadyPaid,
        lastPaymentRound: action.payload.lastPaymentRound,
        currentPaymentRound: action.payload.currentPaymentRound,
        startingPaymentDate: action.payload.startingPaymentDate,
        lastPaymentDate: action.payload.lastPaymentDate,
        agreedPaymentCurrency: action.payload.agreedPaymentCurrency,
        agreedNumberOfPaymentInstallements:
          action.payload.agreedNumberOfPaymentInstallements,
        paymentStatus: action.payload.paymentStatus,
        paymentAgreementBookedBy: action.payload.paymentAgreementBookedBy,
        datePosted: action.payload.datePosted,
        percentageForInitialPayment: action.payload.percentageForInitialPayment,
        initialPaymentAmountExpected:
          action.payload.initialPaymentAmountExpected,
        initialPaymentAmountPaid: action.payload.initialPaymentAmountPaid,
        lastInitialPaymentAmountMade:
          action.payload.lastInitialPaymentAmountMade,
        dateFirstInitialPaymentWasMade:
          action.payload.dateFirstInitialPaymentWasMade,
        dateLastInitialPaymentAmountWasMade:
          action.payload.dateLastInitialPaymentAmountWasMade,
        initialPaymentStatus: action.payload.initialPaymentStatus,

        percentageForSecondPayment: action.payload.percentageForSecondPayment,
        secondPaymentAmountExpected: action.payload.secondPaymentAmountExpected,
        secondPaymentAmountPaid: action.payload.secondPaymentAmountPaid,
        lastSecondPaymentAmountMade: action.payload.lastSecondPaymentAmountMade,
        dateFirstSecondPaymentWasMade:
          action.payload.dateFirstSecondPaymentWasMade,
        dateLastSecondPaymentAmountWasMade:
          action.payload.dateLastSecondPaymentAmountWasMade,
        secondPaymentStatus: action.payload.secondPaymentStatus,

        percentageForThirdPayment: action.payload.percentageForThirdPayment,
        thirdPaymentAmountExpected: action.payload.thirdPaymentAmountExpected,
        thirdPaymentAmountPaid: action.payload.thirdPaymentAmountPaid,
        lastThirdPaymentAmountMade: action.payload.lastThirdPaymentAmountMade,
        thirdSecondPaymentWasMade: action.payload.thirdSecondPaymentWasMade,
        dateLastThirdPaymentAmountWasMade:
          action.payload.dateLastThirdPaymentAmountWasMade,
        thirdPaymentStatus: action.payload.thirdPaymentStatus,
      });
    },
    deletePayment: (state, action) => {},

    selectedPayment: (state, action) => {
      state.selectedPayment = action.payload.selectedPayment;
    },
  },
});

export const getAllPendingPayments = (state) => state.pendingPayment.payments;

export const getSelectedPayment = (state) =>
  state.pendingPayment.selectedPayment;

export const pendingPaymentActions = pendingPaymentSlice.actions;

export default pendingPaymentSlice.reducer;
