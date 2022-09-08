import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar/BrandBar';
import DeviceList from '../components/DeviceList/DeviceList';
import TypeBar from '../components/TypeBar/TypeBar';
import { getBrands, getDevice, getTypes } from '../http/deviceApi';

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getDevice().then((data) => {
      device.setDevices(data);
    });
    getBrands().then((data) => device.setBrands(data));
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
