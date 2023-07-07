import client from "./client";

const getUser = (id) => client.get(`/users/${id}`);

export default {
  getUser,
};
