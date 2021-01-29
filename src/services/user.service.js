import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

class UserService {

  logout() {

    return axios.get(API_URL + 'logout', { headers: authHeader() })
      .then(response => {
        localStorage.removeItem('user');
        return response;
      });
  }

  update(user) {
    return axios.put(API_URL + 'user', {
      name: user.name,
      email: user.email
    }, { headers: authHeader() });
  }

}

export default new UserService();
