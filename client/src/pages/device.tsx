import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  Card,
  Row,
  Col,
  ListGroup,
  Image,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Context } from '..';
import { getDevices, getOneDevice } from '../http/deviceApi';
import { AxiosRequestConfig } from 'axios';

const Device = () => {
  const { id } = useParams();

  const [device, setDevice] = useState<any>({});

  console.log('device', device);

  useEffect(() => {
    id &&
      getOneDevice(id as AxiosRequestConfig<number>).then((data) =>
        setDevice(data),
      );
  }, []);

  return (
    <div>
      <Image
        width={300}
        height={300}
        src={process.env.REACT_APP_HOST_URL + device.img}
      />
    </div>
  );
};
export default Device;
