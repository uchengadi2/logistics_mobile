import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./../apis/local";
import { authActions } from "../store/redux/auth";

import Input from "./Input";
import CustomButton from "./CustomButton";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function LoginForm() {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
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
      password: inputs.password.value,
    };

    //use axios post request here

    if (!data.email || !data.password) {
      Alert.alert("Empty Field", "Please provide all the fields to login");
      return;
    }

    if (!validateEmail(data.email)) {
      Alert.alert(
        "Validation Error",
        "One of your login credentials is not correct, Try again"
      );
      return;
    }

    if (data.email && data.password) {
      const loginForm = async () => {
        //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.post("/users/login", data);

        const authData = {
          token: response.data.token,
          userId: response.data.data.user.id,
        };

        dispatch(authActions.login(authData));

        AsyncStorage.setItem("token", authData.token);
        AsyncStorage.setItem("userId", authData.userId);

        navigation.goBack();
      };
      loginForm().catch((err) => {
        Alert.alert(
          "Authentication Error",
          "Please provide the correct credentials to login"
        );
      });
    } else {
      Alert.alert(
        "Invalid Credentials",
        "Please provide the correct credentials to login"
      );
    }
  }

  function renderSignUpScreen() {
    navigation.navigate("UserSignUpScreen");
  }
  function renderResetPasswordScreen() {
    navigation.navigate("ForgetPasswordScreen");
  }

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Email"
          textInputConfig={{
            keyboardType: "email-address",
            onChangeText: inputChangeHandler.bind(this, "email"),
            value: inputs.email.value,
          }}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Password"
          secure={true}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "password"),
            value: inputs.password.value,
          }}
        />
      </View>
      <View style={styles.submitButton}>
        <CustomButton onPress={submitForm}>Login</CustomButton>
      </View>
      <View style={styles.extraContainer}>
        <View style={styles.signUpButton}>
          <CustomButton mode="flat" onPress={renderSignUpScreen}>
            Sign Up
          </CustomButton>
        </View>
        {/* <View style={styles.resetPasswordButton}>
          <CustomButton mode="flat" onPress={renderResetPasswordScreen}>
            Forgot Password ?
          </CustomButton>
        </View> */}
      </View>
    </View>
  );
}

export default LoginForm;

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
    marginVertical: 20,
    flex: 1,
    width: "30%",
  },
  resetPasswordButton: {
    marginVertical: 20,
    marginLeft: 10,
    flex: 1,
    width: "60%",
  },
  extraContainer: {
    flexDirection: "row",
  },
});
