import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Context } from '../../..';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../../../utils/constants';
import { IAuthResponse } from '../../../ts/Interfaces';
import { getSearchedDevices } from '../../../http/deviceApi';

const NavBar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { device } = useContext(Context);

  const [search, setSearch] = useState<string | number>();

  const searchCall = (value: string) => {
    getSearchedDevices(String(value)).then((data) =>
      device.setDevices(data, true),
    );
  };

  const debounceSearch = debounce(searchCall, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const isInLogin = Boolean(
    location.pathname === LOGIN_ROUTE ||
      location.pathname === REGISTRATION_ROUTE,
  );

  const logOut = () => {
    user.setUser({} as IAuthResponse);
    user.setIsAuth(false);
    localStorage.setItem('token', '');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={SHOP_ROUTE}>FullStack Shop</Navbar.Brand>
        <Nav className="ml-auto">
          {user.isAuth && (
            <>
              <Form className="d-flex">
                <Form.Control
                  value={search}
                  type="search"
                  placeholder="Search"
                  className="me-3"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </Form>
              <Button
                variant="outline-light m-1"
                onClick={() => {
                  logOut();
                  navigate(SHOP_ROUTE);
                }}
              >
                Sign Out
              </Button>
              {location.pathname !== '/admin' && (
                <Button
                  onClick={() => navigate(ADMIN_ROUTE)}
                  variant="outline-light m-1"
                >
                  Admin Page
                </Button>
              )}
            </>
          )}
          {!isInLogin && !user.isAuth && (
            <Button
              variant="outline-light m-1"
              onClick={() => {
                navigate(REGISTRATION_ROUTE);
              }}
            >
              Authorization
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
