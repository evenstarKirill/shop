import { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

import { $authHost, $host } from './index';

//TypesApi

export const createType = async (type: any) => {
  const { data } = await $authHost.post('api/type', type);

  return data;
};

export const getTypes = async (
  // type?: AxiosRequestConfig<string> | undefined,
  limit?: number,
  page?: number,
) => {
  const { data } = await $host.get(
    `api/type/?${queryString.stringify(
      {
        page: page,
        limit: limit,
      },
      { skipNull: true },
    )}`,
    // type,
  );

  return data;
};

export const deleteType = async (typeId: string) => {
  const { data } = await $authHost.delete(`api/type/${typeId}`);

  return data;
};

export const editType = async (typeId: string, editedData: any) => {
  const { data } = await $authHost.patch(`api/type/${typeId}`, editedData);

  return data;
};

//DeviceApi

export const getDevice = async (
  id?: AxiosRequestConfig<number> | undefined,
  page?: number,
  brandId?: number,
  typeId?: number,
  limit?: number,
) => {
  const { data } = await $host.get(
    `api/device/${queryString.stringify(
      {
        id,
        page: page,
        brandId: brandId,
        typeId: typeId,
        limit: limit,
      },
      { skipNull: true },
    )}`,
  );

  return data;
};

export const createDevice = async (device: any) => {
  const { data } = await $authHost.post('api/device', device);

  return data;
};

export const deleteDevice = async (deviceId: string) => {
  const { data } = await $authHost.delete(`api/device/${deviceId}`);

  return data;
};

export const editDevice = async (deviceId: string, editedData: any) => {
  const { data } = await $authHost.patch(`api/device/${deviceId}`, editedData);

  return data;
};

//BrandsApi

export const getBrands = async (limit?: number, page?: number) => {
  const { data } = await $host.get(
    `api/brand/?${queryString.stringify(
      {
        page: page,
        limit: limit,
      },
      { skipNull: true },
    )}`,
  );

  return data;
};

export const createBrand = async (brand: any) => {
  const { data } = await $authHost.post('api/brand', brand);

  return data;
};

export const deleteBrand = async (brandId: string) => {
  const { data } = await $authHost.delete(`api/brand/${brandId}`);

  return data;
};

export const editBrand = async (brandId: string, editedData: any) => {
  const { data } = await $authHost.patch(`api/brand/${brandId}`, editedData);

  return data;
};
