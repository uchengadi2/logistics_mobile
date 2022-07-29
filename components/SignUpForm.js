import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "./Styles";
import { authActions } from "../store/redux/auth";

import Input from "./Input";
import CustomButton from "./CustomButton";
import api from "./../apis/local";

function SignUpForm() {
  const [inputs, setInputs] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    passwordConfirm: { value: "", isValid: true },
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

  function renderLoginForm() {
    navigation.navigate("UserLoginScreen");
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function submitForm() {
    const data = {
      name: inputs.name.value,
      email: inputs.email.value,
      password: inputs.password.value,
      passwordConfirm: inputs.passwordConfirm.value,
      role: "user",
    };

    if (!data.name || !data.email || !data.password || !data.passwordConfirm) {
      Alert.alert("Empty Field", "Please provide all the fields to sign up");
      return;
    }

    if (data.password !== data.passwordConfirm) {
      Alert.alert(
        "Inconsistent Password",
        "Confirm password must be same with your password"
      );
      return;
    }

    if (!validateEmail(data.email)) {
      Alert.alert(
        "Email Validation",
        "Please enter a valid email and try again"
      );
      return;
    }

    const signUpForm = async () => {
      //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.post("/users/signup", data);

      const authData = {
        token: response.data.token,
        userId: response.data.data.user.id,
      };

      dispatch(authActions.signup(authData));

      AsyncStorage.setItem("token", authData.token);
      AsyncStorage.setItem("userId", authData.userId);

      navigation.popToTop();
    };
    signUpForm().catch((err) => {
      console.log(err.message);
      Alert.alert(
        "Sign Up Error",
        "Please provide the correct credentials to signup"
      );
    });
  }

  return (
    <>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Full Name"
              textInputConfig={{
                keyboardType: "default",
                onChangeText: inputChangeHandler.bind(this, "name"),
                value: inputs.name.value,
              }}
            />
          </View>
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
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Confirm Password"
              secure={true}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "passwordConfirm"),
                value: inputs.passwordConfirm.value,
              }}
            />
          </View>
          <View style={styles.submitButton}>
            <CustomButton onPress={submitForm}>Sign Up</CustomButton>
          </View>

          <View style={styles.loginButton}>
            <CustomButton mode="flat" onPress={renderLoginForm}>
              Already a User? Tap to Login
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default SignUpForm;

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
  loginButton: {
    marginVertical: 20,
  },
});
