import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/form/index";
import AppText from "../components/AppText";

import colors from "../config/colors";

import ordersApi from "../api/orders";
import AuthContext from "../auth/context";
import routes from "../navigation/routes";
import OrderContext from "../navigation/OrderContext";

const phoneRegExp = /^\+?[0-9]{11}$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  address: Yup.string().required().min(1).label("Address"),
  phone_number: Yup.string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
  description: Yup.string().label("Description"),
  shirts: Yup.number().integer().min(0).label("Number of Shirts"),
  pants: Yup.number().integer().min(0).label("Number of Pants"),
});

export default function DCCheckOutScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { order, setOrder } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (listing, { resetForm }) => {
    setLoading(true);
    const result = await ordersApi.addOrder({
      userId: user.id,
      ...listing,
    });
    setLoading(false);

    if (!result.ok) {
      console.log(result);
      return alert("Failed to place order");
    }

    setOrder(result.data.orderId);
    console.log(result.data.orderId);
    navigation.navigate(routes.RECEIPT);

    resetForm();
  };

  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(currentDate.getDate() + 4); // Adding 3 days to the current date
    const formattedDate = expectedDeliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDeliveryDate(formattedDate);
  }, []);

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />
      <ScrollView>
        <AppForm
          initialValues={{
            name: "",
            address: "",
            phone_number: "",
            shirts: 0,
            pants: 0,
            description: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppText style={styles.text}>Name</AppText>
          <AppFormField maxLength={255} name={"name"} />

          <AppText style={styles.text}>Address</AppText>
          <AppFormField maxLength={255} name={"address"} numberOfLines={3} />

          <AppText style={styles.text}>Contact Number</AppText>
          <AppFormField
            maxLength={255}
            name={"phone_number"}
            numberOfLines={1}
            keyboardType={"number-pad"}
          />

          <AppText style={styles.text}>Number of Shirts/Tops x Rs100</AppText>
          <AppFormField
            keyboardType={"number-pad"}
            maxLength={8}
            name={"shirts"}
            width={120}
          />

          <AppText style={styles.text}>Number of Pants/Bottoms x Rs120</AppText>
          <AppFormField
            keyboardType={"number-pad"}
            maxLength={8}
            name={"pants"}
            width={120}
          />

          <AppText style={styles.text}>Any Special Instructions</AppText>
          <AppFormField
            maxLength={255}
            multiline
            name={"description"}
            numberOfLines={3}
          />
          <AppText style={styles.checkOutText}>
            PickUp + Delivery Price : 250{" "}
          </AppText>
          <AppText style={styles.expDate}>
            Expected Delivery Date: {deliveryDate}
          </AppText>
          <SubmitButton title={"Post"} />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  checkOutText: {
    padding: 3,
    fontWeight: "bold",
    color: colors.medium,
  },
  checkText: {
    padding: 3,
    fontWeight: "bold",
    color: colors.dark,
  },
  text: {
    color: colors.medium,
  },
  expDate: {
    color: colors.secondary,
    padding: 5,
    paddingBottom: 20,
    fontWeight: "bold",
  },
});
