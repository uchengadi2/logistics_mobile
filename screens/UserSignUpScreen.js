import { View, Text, StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUserId, tokenObj } from "../store/redux/auth";

function UserSignUpScreen({ route, navigation }) {
  const token = useSelector(selectToken);

  // if (token) {
  //   navigation.pop();
  // }

  return <View>{!token && <SignUpForm />}</View>;
}

export default UserSignUpScreen;

const styles = StyleSheet.create({});
