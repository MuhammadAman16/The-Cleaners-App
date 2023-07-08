import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/form/index";

import AppText from "../components/AppText";
import colors from "../config/colors";

import AuthContext from "../auth/context";
import authApi from "../api/auth";
import userAPI from "../api/user";
import useAuth from "../auth/useAuth";
import useApi from "../../hooks/useApi";
import usersAPI from "../api/users";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirm_password: Yup.string()
    .required()
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function SettingsScreen(props) {
  const getUserAPI = useApi(userAPI.getUser);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserAPI.request(user.id);
  }, []);

  const registerApi = useApi(usersAPI.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occured");
        console.log(result);
      }
      return;
    }
    //renaming data to authToken
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };
  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <Screen style={styles.container}>
        {/* <ErrorMessage visible={error} error={error} /> */}
        <AppForm
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          //   handleSubmit
          // onSubmit={console.log("submit")}
          validationSchema={validationSchema}
        >
          <View style={styles.fieldContainer}>
            <AppText style={styles.text}>Full Name</AppText>
            <AppFormField
              autoCorrect={false}
              name={"name"}
              value={getUserAPI.data[0].username}
            />
          </View>

          <View style={styles.fieldContainer}>
            <AppText style={styles.text}>Email</AppText>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name={"email"}
              textContentType="emailAddress"
              value={getUserAPI.data[0].email}
            />
          </View>

          <View style={styles.fieldContainer}>
            <AppText style={styles.text}>Password</AppText>
            <AppFormField
              autoCorrect={false}
              name={"password"}
              value={getUserAPI.data[0].password}
              secureTextEntry
              textContentType="password"
            />
          </View>
          <AppText style={styles.text}>Confirm Password</AppText>
          <View style={styles.fieldContainer}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name={"confirm_password"}
              secureTextEntry
              textContentType="password"
              value={getUserAPI.data[0].password}
            />
          </View>
          <SubmitButton title={"SAVE"} />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  fieldContainer: {
    paddingBottom: 15,
  },
  text: {
    color: colors.medium,
    fontSize: 14,
    fontWeight: "bold",
  },
});
