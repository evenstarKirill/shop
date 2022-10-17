import { makeAutoObservable } from 'mobx';
import isEqual from 'lodash.isequal';
import difference from 'lodash.difference';
import findIndex from 'lodash.findindex';
import {
  ITypes,
  IBrands,
  IDevices,
  IType,
  IBrand,
  IDevice,
  IFiltered,
  IToolkitActive,
} from '../ts/Interfaces';

export default class DeviceStore {
  _types: ITypes;
  _brands: IBrands;
  _devices: IDevices;
  _selectedType: IType;
  _selectedBrand: IBrand;
  _selectedDevice: IDevice;
  _filtered: IFiltered;
  _isToolTipActive: IToolkitActive;

  constructor() {
    this._types = {};

    this._brands = {};

    this._devices = {};

    this._selectedType = {} as IType;

    this._selectedBrand = {} as IBrand;

    this._selectedDevice = {} as IDevice;

    this._filtered = {} as IFiltered;

    this._isToolTipActive = {} as IToolkitActive;

    makeAutoObservable(this);
  }

  //Types

  setTypes(types: ITypes) {
    if (!types.rows) {
      this._types.count = types.count;
      this._types.rows?.push(types as IType);
      return this._types;
    }

    if (!this._types.rows) {
      this._types = types;
    }

    if (isEqual(this._types, types)) {
      return;
    }

    if (
      difference(this._types as ArrayLike<ITypes>, types as ArrayLike<ITypes>)
        .length === 0
    ) {
      return (this._types = types);
    }

    this._types = {
      count: types.count,
      rows: [
        ...(this._types.rows as Array<IType>),
        ...(types.rows as Array<IType>),
      ],
    };
  }

  editType(type: IType) {
    const objWithIdIndex: number = findIndex(
      this._types.rows as ArrayLike<IType>,
      (obj: IType) => obj.id == type.id,
    );

    this._types.rows?.splice(objWithIdIndex, 1, type);
  }

  //Brands

  setBrands(brands: IBrands) {
    if (!brands.rows) {
      this._brands.count = brands.count;
      this._brands.rows?.push(brands as IBrand);
      return this._types;
    }

    if (!this._brands.rows) {
      this._brands = brands;
    }

    if (isEqual(this._brands, brands)) {
      return;
    }

    this._brands = {
      count: brands.count,
      rows: [
        ...(this._brands.rows as Array<IBrand>),
        ...(brands.rows as Array<IBrand>),
      ],
    };
  }

  editBrand(brand: IBrand) {
    const objWithIdIndex: number = findIndex(
      this._brands.rows as ArrayLike<IBrand>,
      (obj: IBrand) => obj.id == brand.id,
    );

    this._brands.rows?.splice(objWithIdIndex, 1, brand);
  }

  //Devices

  setDevices(devices: IDevices, filter?: boolean, resetFilter?: boolean) {
    if (!devices.rows) {
      this._devices.count = devices.count;
      this._devices.rows?.push(devices as IDevice);
      return this._devices;
    }

    if (!this._devices.rows) {
      this._devices = devices;
    }

    if (isEqual(this._devices, devices)) {
      return;
    }

    if (filter) {
      return (this._devices = devices);
    }

    if (resetFilter) {
      return (this._devices = devices);
    }

    this._devices = {
      count: devices.count,
      rows: [
        ...(this._devices.rows as Array<IDevice>),
        ...(devices.rows as Array<IDevice>),
      ],
    };
  }

  editDevice(device: IDevice) {
    const objWithIdIndex: number = findIndex(
      this._devices.rows as ArrayLike<IDevice>,
      (obj: IDevice) => obj.id == device.id,
    );

    this._devices.rows?.splice(objWithIdIndex, 1, device);
  }

  //                                  *** Setters ***

  //Selected

  setSelectedType(type: IType) {
    this._selectedType = type;
  }

  setSelectedBrand(brand: IBrand) {
    this._selectedBrand = brand;
  }

  setSelectedDevice(device: IDevice) {
    this._selectedDevice = device;
  }

  //Filtered

  setFilteredBrand(brand: number[]) {
    this._filtered.brandsId = brand;
  }

  setFilteredType(type: number[]) {
    this._filtered.typesId = type;
  }

  //Tooltip

  setTypeTooltipActive() {
    this._isToolTipActive = {
      type: true,
      brand: false,
    };
  }

  setBrandTooltipActive() {
    this._isToolTipActive = {
      type: false,
      brand: true,
    };
  }

  //                                  *** Getters ***

  get types() {
    return this._types;
  }

  get devices() {
    return this._devices;
  }

  get brands() {
    return this._brands;
  }

  //Selected

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedDevice() {
    return this._selectedDevice;
  }

  //Filtered

  get filtered() {
    return this._filtered;
  }

  //Tooltip Status

  get toolTipStatus() {
    return this._isToolTipActive;
  }
}
