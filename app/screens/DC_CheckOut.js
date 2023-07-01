import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form/index";
import colors from "../config/colors";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/form/FormImagePicker";
import AppText from "../components/AppText";
// import listingsApi from "../api/listings";
// import UploadScreen from "./UploadScreen";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  number_shirts: Yup.number().required().min(0).max(20).label("Shirts"),
  number_pants: Yup.number().required().min(0).max(20).label("Pants"),
  number_others: Yup.number().required().min(0).max(20).label("Others"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select atleast one image"),
});

const categories = [
  {
    label: "Standard",
    value: 1,
    backgroundColor: colors.primary,
    icon: "table-furniture",
  },
  {
    label: "Express",
    value: 2,
    backgroundColor: "#E4572E",
    icon: "tshirt-crew",
  },

  {
    label: "Urgent",
    value: 6,
    backgroundColor: colors.secondary,
    icon: "car",
  },
];
export default function ListingEditScreen() {
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
        {/* <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progess}
        visible={uploadVisible}
      /> */}
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
          <AppFormField maxLength={255} name={""} />

          <AppText style={styles.text}>Address</AppText>
          <AppFormField maxLength={255} name={""} numberOfLines={3} />
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
