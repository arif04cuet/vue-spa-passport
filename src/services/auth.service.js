import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        var data = response.data.data;
        if (data.accessToken) {
          localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
      });
  }


  register(user) {
    return axios.post(API_URL + 'register', {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    });
  }


}

export default new AuthService();
