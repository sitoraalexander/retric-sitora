import axios from 'axios';

export default {
  loginUser: function (user) {
    return axios.post('/api/user/login', user);
  },
  signup: function (user) {
    return axios.post('/api/user/signup', user);
  },
  authenticateUser: function () {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-auth-token': localStorage.getItem('token'),
    //   },
    // };
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios.post('/api/user/authenticate/');
  },
};
