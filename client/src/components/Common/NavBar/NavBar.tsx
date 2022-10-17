import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../..';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../../../utils/constants';
import { IAuthResponse } from '../../../ts/Interfaces';

const NavBar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

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
