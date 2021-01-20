import axios from 'axios';
const setToken = () =>
  (axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
    'token'
  ));
export default {
  // Gets all comments
  getComments: function () {
    setToken();

    return axios.get('/api/comments');
  },
  // Gets the comment with the given id
  getComment: function (id) {
    setToken();

    return axios.get('/api/comments/' + id);
  },
  // Deletes the comment with the given id
  deleteComment: function (id) {
    setToken();

    return axios.delete('/api/comments/' + id);
  },
  // Saves a comment to the database
  saveComment: function (commentData) {
    setToken();

    return axios.post('/api/comments', commentData);
  },
  approveRequest: function (replyData) {
    setToken();

    return axios.post('/api/comments/approveRequest', replyData);
  },
};
