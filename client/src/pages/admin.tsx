import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Context } from '..';
import AdminBrandBar from '../components/Admin/AdminBrandBar/AdminBrandBar';
import ItemList from '../components/Admin/ItemList/ItemList';
import BrandBar from '../components/BrandBar/BrandBar';
import TypeBar from '../components/TypeBar/TypeBar';
import { getTypes, getDevices, getBrands } from '../http/deviceApi';

const Admin = observer(() => {
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
          <TypeBar />
          <div className="mt-5">
            Brands
            <AdminBrandBar />
          </div>
        </Col>
        <Col md={9}>
          <ItemList />
        </Col>
      </Row>
    </Container>
  );
});

export default Admin;
