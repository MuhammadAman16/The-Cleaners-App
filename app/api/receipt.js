import client from "./client";

const getReceipt = (id) => client.get(`/orders/${id}`);

export default {
  getReceipt,
};
