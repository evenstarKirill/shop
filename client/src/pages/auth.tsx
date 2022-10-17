import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userApi';
import {
  IAuth,
  IAuthResponse,
} from '../ts/Interfaces';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../utils/constants';

const Auth = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const { user } = useContext(Context);

  const [inputs, setInputs] = useState<IAuth>({
    email: '',
    password: '',
  });

  const handleInputsChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    }));
  };

  const signIn = async () => {
    try {
      let data: IAuthResponse;
      if (isLogin) {
        data = await login(inputs);
      } else {
        data = await registration(inputs);
      }

      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 62 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h3 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h3>
        <Form className="d-flex flex-column">
          <input
            name="email"
            className="mt-2"
            placeholder="Email"
            type="email"
            value={inputs.email}
            onChange={(e) => handleInputsChange(e)}
          />
          <input
            name="password"
            className="mt-2"
            placeholder="Password"
            type="password"
            value={inputs.password}
            onChange={(e) => handleInputsChange(e)}
          />
          {isLogin ? (
            <>
              <div className="mt-3">
                Have no account?{' '}
                <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
              </div>
              <Button
                onClick={signIn}
                className="mt-2"
                variant="outline-success"
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <div className="mt-3">
                Have account? <NavLink to={LOGIN_ROUTE}>Sign In!</NavLink>
              </div>
              <Button
                onClick={signIn}
                className="mt-2"
                variant="outline-success"
              >
                Register
              </Button>
            </>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
