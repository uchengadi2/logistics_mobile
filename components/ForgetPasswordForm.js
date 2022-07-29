import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "./Styles";
import { changeOwnPassword } from "../store/redux/auth";

import Input from "./Input";
import CustomButton from "./CustomButton";

function ForgetPasswordForm() {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitForm() {
    const data = {
      email: inputs.email.value,
    };

    dispatch(changeOwnPassword(data));
  }

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Enter Your Registered Email"
          textInputConfig={{
            keyboardType: "email-address",
            onChangeText: inputChangeHandler.bind(this, "email"),
            value: inputs.email.value,
          }}
        />
      </View>

      <View style={styles.submitButton}>
        <CustomButton onPress={submitForm}>Reset Password</CustomButton>
      </View>
    </View>
  );
}

export default ForgetPasswordForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    //textAlign: "center",
    marginTop: 15,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  selectinputsRow: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  submitButton: {
    marginVertical: 40,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    color: "#ccc",
    //alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  selectionTitle: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    marginTop: 10,
  },
  signUpButton: {
    marginVertical: 80,
  },
});
