import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { GlobalStyles } from "./Styles";

function Input({ label, style, textInputConfig, type, title, list }) {
  const [state, setState] = useState();
  let inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }
  function renderInput() {
    if (type !== "select") {
      return (
        <View style={[styles.inputContainer, style]}>
          <Text style={styles.label}>{label}</Text>
          <TextInput style={inputStyle} {...textInputConfig} />
        </View>
      );
    } else if (type === "select") {
      return (
        <>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.container}>
            <RNPickerSelect
              onValueChange={(value) => setState(value)}
              items={list}
              {...textInputConfig}
            />
          </View>
        </>
      );
    }
  }
  return renderInput();
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    color: "#ccc",
    //alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
});
