import { AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';

import { $authHost, $host } from './index';

export const createType = async (type: any) => {
  const { data } = await $authHost.post('api/type', type);

  return data;
};

export const getTypes = async (
  type?: AxiosRequestConfig<string> | undefined,
) => {
  const { data } = await $host.get('api/type', type);

  return data;
};

export const getDevices = async () => {
  const { data } = await $host.get('api/device');

  return data;
};

export const getOneDevice = async (
  id?: AxiosRequestConfig<number> | undefined,
) => {
  const { data } = await $host.get(`api/device/${id}`);

  return data;
};

export const getBrands = async () => {
  const { data } = await $host.get('api/brand');

  return data;
};
