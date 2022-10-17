import { IDevice, IType } from './../Types&Interfaces/Interfaces/Interfaces';
import { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import {
  IBrand,
  IFilteredDevices,
} from '../Types&Interfaces/Interfaces/Interfaces';

import { $authHost, $host } from './index';

//TypesApi

export const createType = async (type: IType) => {
  const { data } = await $authHost.post('api/type', type);

  return data;
};

export const getTypes = async (
  // type?: AxiosRequestConfig<string> | undefined,
  limit?: number,
  page?: number,
) => {
  const { data } = await $host.get(
    `api/type/${queryString.stringify(
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

export const deleteType = async (typeId: number | null) => {
  const { data } = await $authHost.delete(`api/type/${typeId}`);

  return data;
};

export const editType = async (
  typeId: number,
  editedData: { name: string },
) => {
  const { data } = await $authHost.patch(`api/type/${typeId}`, editedData);

  return data;
};

//DeviceApi

export const getDevices = async (
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

export const getOneDevice = async (
  id?: AxiosRequestConfig<number> | undefined,
) => {
  const { data } = await $host.get(`api/device/${id}`);

  return data;
};

export const getFilteredDevices = async ({
  page,
  brandsId,
  typesId,
  limit,
}: IFilteredDevices) => {
  const { data } = await $host.get(
    `api/device/filter/${queryString.stringify(
      {
        page: page,
        brandId: brandsId,
        typeId: typesId,
        limit: limit,
      },
      { skipNull: true, arrayFormat: 'comma' },
    )}`,
  );

  return data;
};

export const createDevice = async (device: any) => {
  const { data } = await $authHost.post('api/device', device);

  return data;
};

export const deleteDevice = async (deviceId: number) => {
  const { data } = await $authHost.delete(`api/device/${deviceId}`);

  return data;
};

export const editDevice = async (deviceId: number, editedData: any) => {
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

export const createBrand = async (brand: IBrand) => {
  const { data } = await $authHost.post('api/brand', brand);

  return data;
};

export const deleteBrand = async (brandId: number | null) => {
  const { data } = await $authHost.delete(`api/brand/${brandId}`);

  return data;
};

export const editBrand = async (
  brandId: number,
  editedData: { name: string },
) => {
  const { data } = await $authHost.patch(`api/brand/${brandId}`, editedData);

  return data;
};
