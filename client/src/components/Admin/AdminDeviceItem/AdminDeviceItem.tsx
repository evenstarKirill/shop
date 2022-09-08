import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import { deleteDevice } from '../../../http/deviceApi';

import { DEVICE_ROUTE } from '../../../utils/constants';

import styles from './AdminDeviceItem.module.scss';

interface IProps {
  handleShow: () => void;
  deviceProp: any;
}

const AdminDeviceItem = observer(({ deviceProp, handleShow }: IProps) => {
  const navigate = useNavigate();
  const { device } = useContext(Context);

  return (
    <Col
      style={{
        marginBottom: '30px',
      }}
    >
      <Card
        onClick={() => device.setSelectedDevice(deviceProp)}
        style={{
          width: '18rem',
          cursor: 'pointer',
          padding: '0',
        }}
        border="light"
        bg="light"
      >
        <Card.Img
          onClick={() => navigate(DEVICE_ROUTE + '/' + deviceProp.id)}
          variant="top"
          src={process.env.REACT_APP_HOST_URL + deviceProp.img}
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{deviceProp.name}</Card.Title>
          <Card.Text>Users Rating {deviceProp.rating}</Card.Text>
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <Button variant="danger" onClick={() => deleteDevice(deviceProp.id)}>
            Delete
          </Button>
          <Button onClick={handleShow} variant="warning">
            Edit
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
});

export default AdminDeviceItem;
