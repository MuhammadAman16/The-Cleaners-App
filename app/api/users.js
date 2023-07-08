import client from "./client";

const register = ({ name, email, password }) => {
  client.post("/users", {
    username: name,
    email: email,
    password: password,
  });
};

export default {
  register,
};
