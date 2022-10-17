import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { IDevice } from '../../../ts/Interfaces';

import { DEVICE_ROUTE } from '../../../utils/constants';

interface IProps {
  device: IDevice;
}

const DeviceItem = ({ device }: IProps) => {
  const navigate = useNavigate();

  return (
    <Col
      style={{
        marginBottom: '30px',
      }}
    >
      <Card
        style={{
          width: '18rem',
          cursor: 'pointer',
          padding: '0',
        }}
        onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        border="light"
        bg="light"
      >
        <Card.Img
          variant="top"
          src={
            process.env.REACT_APP_HOST_URL &&
            process.env.REACT_APP_HOST_URL + device.img
          }
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <Card.Text>Users Rating {device.rating}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DeviceItem;
