import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUserId() {
  const getUserId = () => {
    const userUserId = AsyncStorage.getItem("token");
    //const userUserId = JSON.parse(userIdString);
    return userUserId?.userId;
  };
  const [userId, setUserId] = useState(getUserId());

  const saveUserId = (userUserId) => {
    if (userUserId !== undefined) {
      AsyncStorage.setItem("token", JSON.stringify(userUserId));
      setUserId(userUserId.userId);
    }
  };

  return {
    setUserId: saveUserId,
    userId,
  };
}
