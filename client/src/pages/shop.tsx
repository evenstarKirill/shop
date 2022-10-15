import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/Common/BrandBar/BrandBar';
import DeviceList from '../components/User/DeviceList/DeviceList';
import ResetButton from '../components/Common/ResetButton/ResetButton';
import TypeBar from '../components/Common/TypeBar/TypeBar';
import { getBrands, getDevices, getTypes } from '../http/deviceApi';

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getDevices().then((data) => {
      device.setDevices(data);
    });
    getBrands().then((data) => device.setBrands(data));
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <ResetButton />
          <div className="mb-3">
            Types
            <TypeBar />
          </div>
          <div>
            Brands
            <BrandBar />
          </div>
        </Col>
        <Col md={9}>
          <DeviceList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
