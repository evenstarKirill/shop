import { makeAutoObservable } from 'mobx';
import { Role } from '../ts/Interfaces';

interface IUser {
  id: string;
  role: Role;
}

export default class UserStore {
  _isAuth: boolean;
  _user: IUser;
  constructor() {
    this._isAuth = false;
    this._user = { id: '', role: Role.user };
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: IUser) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get userRole() {
    return this._user.role;
  }
}
