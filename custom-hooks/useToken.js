import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useToken() {
  const getToken = () => {
    const userToken = AsyncStorage.getItem("token");
    //const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (userToken !== undefined) {
      AsyncStorage.setItem("token", JSON.stringify(userToken));
      setToken(userToken.token);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}
