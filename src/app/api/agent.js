import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Menu = {
  list: () => requests.get('pizzas'),
  details: (id) => requests.get(`pizzas/${id}`),
};

const Basket = {
  get: () => requests.get('Basket'),
  addItem: (pizzaId, quantity = 1) =>
    requests.post(`Basket?pizzaId=${pizzaId}&quantity=${quantity}`, {}),
  removeItem: (pizzaId, quantity = 1) =>
    requests.delete(`Basket?pizzaId=${pizzaId}&quantity=${quantity}`),
};

const Account = {
  login: (values) => requests.post('account/login', values),
  register: (values) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
};

const agent = {
  Menu,
  Basket,
  Account,
};

export default agent;
