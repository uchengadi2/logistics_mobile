import { View, Text, StyleSheet } from "react-native";
import ForgetPasswordForm from "../components/ForgetPasswordForm";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUserId, tokenObj } from "../store/redux/auth";

function ForgetPasswordScreen({ route, navigation }) {
  const token = useSelector(selectToken);

  if (token) {
    navigation.pop();
  }

  return (
    <View>
      <ForgetPasswordForm />
    </View>
  );
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({});
