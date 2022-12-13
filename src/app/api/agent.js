import axios from 'axios';
//import { store } from "../store/configureStore"

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  axios.interceptors.request.use((config) => {
    const token = user.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

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
  fetchAddress: () => requests.get('account/savedAddress'),
};

const Orders = {
  list: () => requests.get('orders'),
  fetch: (id) => requests.get(`orders/${id}`),
  create: (values) => requests.post('orders', values),
};

const agent = {
  Menu,
  Basket,
  Account,
  Orders,
};

export default agent;
