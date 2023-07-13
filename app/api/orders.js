import client from "./client";

const endpoint = "/orders";

const addOrder = ({
  userId,
  name,
  address,
  phone_number,
  shirts,
  pants,
  description,
}) => {
  return client.post(endpoint, {
    userid: userId,
    name,
    address,
    phone: phone_number,
    shirts,
    pants,
    instructions: description,
  });
};
export default {
  addOrder: addOrder,
};
