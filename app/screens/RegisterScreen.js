import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/form/index";
import MemberLink from "../components/MemberLink";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import LoginScreen from "./LoginScreen";

import authAPI from "../api/auth";
import usersAPI from "../api/users";
import useApi from "../../hooks/useApi";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const registerAPI = useApi(usersAPI.register);
  const loginAPI = useApi(authAPI.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await registerAPI.request({ ...userInfo });

      if (!result.data) {
        setError("An unexpected error occurred");
        return;
      }

      if (!result.data.success) {
        setError(result.data.error);
        return;
      }
      console.log("Registration successful");
    } catch (error) {
      console.error("Error registering new user:", error);
      // setError("An unexpected error occurred");
    }

    // renaming data to authToken
    const { data: authToken } = await loginAPI.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken.authToken);
  };

  return (
    <>
      {/* <ActivityIndicator visible={registerAPI.loading || loginAPI.loading} /> */}
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <ErrorMessage visible={error} error={error} />
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          //   handleSubmit
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name={"name"}
            placeholder="Full Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            name={"email"}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name={"password"}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title={"Register"} />
        </AppForm>
        <MemberLink
          link={"Login"}
          onPress={() => {
            navigation.navigate(routes.LOGIN);
          }}
          text={"Already a member?"}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 200,
    height: 120,
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 20,
  },
});

export default RegisterScreen;
