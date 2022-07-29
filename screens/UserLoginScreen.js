import { View, Text, StyleSheet } from "react-native";
import LoginForm from "./../components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUserId, tokenObj } from "../store/redux/auth";

function UserLoginScreen({ route, navigation }) {
  const token = useSelector(selectToken);

  if (token) {
    navigation.pop();
  }

  return (
    <View>
      <LoginForm />
    </View>
  );
}

export default UserLoginScreen;

const styles = StyleSheet.create({});
