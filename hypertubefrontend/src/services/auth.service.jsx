
import axios from "axios";

const API_URL = "http://localhost:9000/";

const register = (username,firstname, lastname, email, password, confirm) => {
  return axios.post(API_URL + "register", {
    username,
    firstname,
    lastname,
    email,
    password,
    confirm
  });
};

const forgotpassword = (email) => {
  return axios.post(API_URL + "forgotpassword", {
    email,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  forgotpassword,
  getCurrentUser,

};