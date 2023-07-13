import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import AppText from "../components/AppText";
import colors from "../config/colors";

import OrderContext from "../navigation/OrderContext";
import useApi from "../../hooks/useApi";
import receiptAPI from "../api/receipt";

export default function ReceiptScreen(props) {
  const getOrderAPI = useApi(receiptAPI.getReceipt);
  const { orderId } = useContext(OrderContext);

  useEffect(() => {
    getOrderAPI.request(orderId);
  }, []);

  console.log(getOrderAPI.data.order);
  // const { error, loading } = getOrderAPI;
  // const order = getOrderAPI.data.order[0];

  // if (loading) {
  //   return <AppText>Loading...</AppText>;
  // }

  // if (error) {
  //   console.log(error);
  //   <AppText>Error Loading Receipt</AppText>;
  //   return;
  // }

  // return (
  //   <View style={styles.container}>
  //     <AppText>{order.userid}</AppText>
  //     <AppText>{order.name}</AppText>
  //     <AppText>{order.address}</AppText>
  //     <AppText>{order.phone}</AppText>
  //     <AppText>{order.shirts}</AppText>
  //     <AppText>{order.pants}</AppText>
  //     <AppText>{order.instructions}</AppText>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {},
});
