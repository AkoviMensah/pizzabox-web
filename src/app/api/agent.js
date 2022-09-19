import axios from 'axios';
import { toast } from 'react-toastify';
import PaginatedResponse from '../util/PaginationResponse';
import { history } from '../..';

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const responseBody = (response) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        history.push({
          pathname: '/server-error',
          state: { error: data },
        });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Menu = {
  list: (params) => requests.get('pizzas', params),
  details: (id) => requests.get(`pizzas/${id}`),
  fetchFilters: () => requests.get('pizzas/filters'),
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
