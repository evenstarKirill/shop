import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
