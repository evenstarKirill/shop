import { makeAutoObservable } from 'mobx';

interface IType {
  id: number | null;
  name: string | null;
}

interface IBrand {
  id: number | null;
  name: string | null;
}

interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
}

interface IDevices {
  count?: number;
  rows?: IDevice[];
}

export default class DeviceStore {
  _types: IType[] = [];
  _brands: IBrand[] = [];
  _devices: IDevices = {};
  _selectedType: IType = {
    id: null,
    name: null,
  };
  _selectedBrand: IBrand = {
    id: null,
    name: null,
  };

  constructor() {
    this._types = [];

    this._brands = [];

    this._devices = {};

    this._selectedType = {
      id: null,
      name: null,
    };

    this._selectedBrand = {
      id: null,
      name: null,
    };

    makeAutoObservable(this);
  }

  setTypes(types: IType[]) {
    this._types = types;
  }

  setBrands(brands: IBrand[]) {
    this._brands = brands;
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
}
