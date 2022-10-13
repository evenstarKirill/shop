import { makeAutoObservable } from 'mobx';

enum User {
  admin = 'ADMIN',
  user = 'USER',
}

interface IUser {
  id: string;
  role: User;
}

export default class UserStore {
  _isAuth: boolean;
  _user: IUser;
  constructor() {
    this._isAuth = false;
    this._user = { id: '', role: User.user };
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: any) {
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
