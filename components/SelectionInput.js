import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "./Styles";

function SelectionInput({ title, list, textInputConfig }) {
  const [state, setState] = useState();
  //list props is  an array of objects
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

export default SelectionInput;

const styles = StyleSheet.create({
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
