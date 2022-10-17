import jwtDecode from 'jwt-decode';
import {
  IAuth,
  IAuthResponse,
} from '../Types&Interfaces/Interfaces/Interfaces';

import { $authHost, $host } from './index';

export const registration = async ({
  email,
  password,
}: IAuth): Promise<IAuthResponse> => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: 'USER',
  });
  localStorage.setItem('token', data);

  return jwtDecode(data);
};

export const login = async ({
  email,
  password,
}: IAuth): Promise<IAuthResponse> => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  });

  localStorage.setItem('token', data);

  return jwtDecode(data);
};

export const checkIsAuth = async () => {
  const { data } = await $authHost.get('api/user/auth');

  localStorage.setItem('token', data.token);

  return jwtDecode(data.token);
};
