import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "secretkey";
const storeToken = async (authToken) => {
  console.log(authToken);
  try {
    await SecureStore.setItemAsync(authToken, key);
  } catch (error) {
    console.log("error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) return jwtDecode(token);
  return null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("error deleting the token", error);
  }
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
};
