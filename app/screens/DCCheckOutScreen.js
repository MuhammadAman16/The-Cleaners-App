import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/form/index";
import colors from "../config/colors";
import FormImagePicker from "../components/form/FormImagePicker";
import AppText from "../components/AppText";
// import listingsApi from "../api/listings";

const phoneRegExp = /^\+?[0-9]{11}$/;

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  address: Yup.string().required().min(1).label("Address"),
  number_shirts: Yup.number().required().min(0).max(20).label("Shirts"),
  number_pants: Yup.number().required().min(0).max(20).label("Pants"),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select atleast one image"),
});

export default function DCCheckOutScreen() {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progess, setProgess] = useState(0);

  // const handleSubmit = async (listing, { resetForm }) => {
  //   setProgess(50);
  //   setUploadVisible(true);
  //   const result = await listingsApi.addListing(
  //     { ...listing, location },
  //     (progress) => setProgess(progress)
  //   );
  const handleSubmit = () => {
    console.log("listing screen clg");
  };
  //   if (!result.ok) {
  //     setUploadVisible(false);
  //     return alert("Could not save the listing");
  //   }
  //   resetForm();
  // };

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

  const calculateTotalPrice = (shirts, pants) => {
    const shirtPrice = 100; // Price per shirt
    const pantPrice = 120; // Price per pant
    return shirts * shirtPrice + pants * pantPrice;
  };
  const [shirts, setShirts] = useState("");
  const [pants, setPants] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState("");

  useEffect(() => {
    if (shirts !== "" && pants !== "") {
      const totalPrice = calculateTotalPrice(Number(shirts), Number(pants));
      setTotalPrice(totalPrice);
    }
  }, [shirts, pants]);

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppText style={styles.text}>Insert Images of Your Clothing</AppText>

          <FormImagePicker name="images" />
          <AppText style={styles.text}>Name</AppText>
          <AppFormField maxLength={255} name={"title"} />

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
            name={"Shirts"}
            width={120}
            onChangeText={(value) => {
              setShirts(value);
            }}
          />

          <AppText style={styles.text}>Number of Pants/Bottoms x Rs120</AppText>
          <AppFormField
            keyboardType={"number-pad"}
            maxLength={8}
            name={"Pants"}
            width={120}
            onChangeText={(value) => {
              setPants(value);
            }}
          />

          <AppText style={styles.text}>Any Special Instructions</AppText>
          <AppFormField
            maxLength={255}
            multiline
            name={"description"}
            numberOfLines={3}
          />
          <AppText style={styles.checkOutText}>Sum : Rs {totalPrice}</AppText>
          <AppText style={styles.checkOutText}>
            PickUp + Delivery Price : 250{" "}
          </AppText>
          <AppText style={styles.checkText}>
            Total Sum : Rs {totalPrice + 250}
          </AppText>
          <AppText style={styles.expDate}>
            {" "}
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
