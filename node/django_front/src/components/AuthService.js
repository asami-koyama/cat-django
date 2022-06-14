import axios from "axios";

const API_AUTH_URL = "http://18.221.251.5:8000/api/auth/";
class AuthService {
  login(email, password) {
    return axios.post(API_AUTH_URL + "jwt/create/", {
        email:email,
        password:password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.user.setItem('email',email)
          console.log("localStorage.user = "+localStorage.getItem(response.data));
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
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}

export default new AuthService();