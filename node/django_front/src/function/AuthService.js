import axios from "axios";


const API_AUTH_URL = "http://192.168.150.201:8000/api/auth/";


class AuthService {
  login(email, password) {
    return axios.post(API_AUTH_URL + "jwt/create/", {
        email:email,
        password:password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("localStorage.user = "+localStorage.getItem("user"));
          
          return response.data;
        }
      })
  }

  logout() {
    localStorage.removeItem("user");
    console.log("logout");
  }

  register(username, email, password, user_type) {
    return axios.post(API_AUTH_URL + "users/", {
      username: username, 
      email: email, 
      password: password,
      user_type: user_type
    })
    .then(function (response) {
      console.log(response);
      return axios.post(API_AUTH_URL + "jwt/create/", {
        email:email,
        password:password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("localStorage.user = "+localStorage.getItem("user"));
          return response.data;
        }
      })
    })
  };


}



export default new AuthService();