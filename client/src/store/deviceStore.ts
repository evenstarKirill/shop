import { makeAutoObservable } from 'mobx';
import isEqual from 'lodash.isequal';
import difference from 'lodash.difference';

interface IType {
  id: number | null;
  name: string | null;
}

interface ITypes {
  count?: number;
  rows?: IType[];
}

interface IBrand {
  id: number | null;
  name: string | null;
}

interface IBrands {
  count?: number;
  rows?: IBrand[];
}

interface IDevice {
  id: number | null;
  name: string | null;
  price: number | null;
  rating: number | null;
  img: string | null;
}

interface IDevices {
  count?: number;
  rows?: IDevice[];
}

export default class DeviceStore {
  _types: ITypes;
  _brands: IBrands;
  _devices: IDevices;
  _selectedType: IType;
  _selectedBrand: IBrand;
  _selectedDevice: IDevice;

  constructor() {
    this._types = {};

    this._brands = {};

    this._devices = {};

    this._selectedType = {
      id: null,
      name: null,
    };

    this._selectedBrand = {
      id: null,
      name: null,
    };

    this._selectedDevice = {
      id: null,
      name: null,
      price: null,
      rating: null,
      img: null,
    };

    makeAutoObservable(this);
  }

  setTypes(types: ITypes) {
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

  setBrands(brands: IBrands) {
    if (!this._brands.rows) {
      this._brands = brands;
    }

    if (isEqual(this._brands, brands)) {
      return;
    }

    if (
      difference(this._brands as ArrayLike<ITypes>, brands as ArrayLike<ITypes>)
        .length === 0
    ) {
      return (this._brands = brands);
    }

    this._brands = {
      count: brands.count,
      rows: [
        ...(this._brands.rows as Array<IBrand>),
        ...(brands.rows as Array<IBrand>),
      ],
    };
  }

  setDevices(devices: IDevices) {
    this._devices = devices;
  }

  setSelectedType(type: IType) {
    this._selectedType = type;
  }

  setSelectedBrand(brand: IBrand) {
    this._selectedBrand = brand;
  }

  setSelectedDevice(device: IDevice) {
    this._selectedDevice = device;
  }

  get types() {
    return this._types;
  }

  get devices() {
    return this._devices;
  }

  get brands() {
    return this._brands;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedDevice() {
    return this._selectedDevice;
  }
}
