import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/userStore';
import DeviceStore from './store/deviceStore';

import './index.css';

type ContextValue = {
  user: UserStore;
  device: DeviceStore;
};

export const Context = createContext<ContextValue>({} as ContextValue);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
);
