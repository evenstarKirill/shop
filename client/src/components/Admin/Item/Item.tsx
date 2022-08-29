import React from 'react';
import { Card, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { DEVICE_ROUTE } from '../../../utils/constants';

import styles from './Item.module.scss';

const Item = ({ device }: any) => {
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
          src={process.env.REACT_APP_HOST_URL + device.img}
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <Card.Text>Users Rating {device.rating}</Card.Text>
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <Button variant="danger">Delete</Button>
          <Button variant="warning">Edit</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Item;
