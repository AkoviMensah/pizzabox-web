import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.get(url, body).then(responseBody),
  put: (url, body) => axios.get(url, body).then(responseBody),
  delete: (url) => axios.get(url).then(responseBody),
};

const Store = {
  list: () => requests.get('pizzas'),
  details: (id) => requests.get(`pizzas/${id}`),
};

const agent = {
  Store,
};

export default agent;
