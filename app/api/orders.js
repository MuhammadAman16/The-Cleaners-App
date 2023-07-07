import client from "./client";

const endpoint = "/orders";

const addListing = ({
  images,
  name,
  address,
  phone_number,
  shirts,
  pants,
  description,
}) => {
  const data = new FormData();
  data.append("images", images);
  data.append("name", name);
  data.append("address", address);
  data.append("phone", phone_number);
  data.append("shirts", shirts);
  data.append("pants", pants);
  data.append("instructions", description);
  data.append("userid", "1");

  return client.post(endpoint, data);
};

const deleteListings = (index) => client.delete(index);

export default {
  addListing,
  deleteListings,
};
