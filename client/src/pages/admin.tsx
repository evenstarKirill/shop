import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { Context } from '..';
import { getTypes, getDevices, getBrands } from '../http/deviceApi';

import CreateButton from '../components/Admin/CreateButton/CreateButton';
import AdminDeviceList from '../components/Admin/AdminDeviceList/AdminDeviceList';
import CreateDeviceModal from '../components/Admin/Modals/CreateModals/CreateDeviceModal/CreateDeviceModal';
import CreateBrandModal from '../components/Admin/Modals/CreateModals/CreateBrandModal/CreateBrandModal';
import CreateTypeModal from '../components/Admin/Modals/CreateModals/CreateTypeModal/CreateTypeModal';
import EditBrandOrTypeModal from '../components/Admin/Modals/EditModals/EditBrandOrTypeModal/EditBrandOrTypeModal';
import EditDeviceModal from '../components/Admin/Modals/EditModals/EditDeviceModal/EditDeviceModal';
import jwtDecode from 'jwt-decode';
import BrandBar from '../components/BrandBar/BrandBar';
import TypeBar from '../components/TypeBar/TypeBar';
import ResetButton from '../components/ResetButton/ResetButton';

interface IModalSHow {
  device: boolean;
  type: boolean;
  brand: boolean;
  editDevice: boolean;
  editType: boolean;
  editBrand: boolean;
}

enum Modals {
  type = 'type',
  device = 'device',
  brand = 'brand',
  editType = 'editType',
  editDevice = 'editDevice',
  editBrand = 'editBrand',
}

const Admin = observer(() => {
  const { device } = useContext(Context);
  const { user } = useContext(Context);

  const [show, setShow] = useState<IModalSHow>({
    device: false,
    type: false,
    brand: false,
    editDevice: false,
    editType: false,
    editBrand: false,
  });

  const handleShow = (modal: Modals) =>
    setShow((state: IModalSHow) => ({ ...state, [modal]: !state[modal] }));

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getDevices().then((data) => {
      device.setDevices(data);
    });
    getBrands().then((data) => device.setBrands(data));

    const userData = jwtDecode(localStorage.getItem('token') || '');

    user.setUser(userData);
    user.setIsAuth(true);
  }, []);

  //TODO: button "show all" - separate component

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex flex-row justify-content-between">
              <CreateButton
                name={Modals.type}
                handleShow={() => handleShow(Modals.type)}
              />
              <ResetButton />
            </div>
            <Form.Label>Types</Form.Label>
          </Form.Group>
          <TypeBar handleShow={() => handleShow(Modals.editType)} />
          <div className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <CreateButton
                name={Modals.brand}
                handleShow={() => handleShow(Modals.brand)}
              />
              <Form.Label>Brands</Form.Label>
            </Form.Group>
            <BrandBar handleShow={() => handleShow(Modals.editBrand)} />
          </div>
        </Col>
        <Col md={9}>
          <CreateButton
            name={Modals.device}
            handleShow={() => handleShow(Modals.device)}
          />
          <AdminDeviceList handleShow={() => handleShow(Modals.editDevice)} />
        </Col>
        {show.device && (
          <CreateDeviceModal
            show={show.device}
            handleShow={() => handleShow(Modals.device)}
          />
        )}
        {show.brand && (
          <CreateBrandModal
            show={show.brand}
            handleShow={() => handleShow(Modals.brand)}
          />
        )}
        {show.type && (
          <CreateTypeModal
            show={show.type}
            handleShow={() => handleShow(Modals.type)}
          />
        )}
        {show.editType && (
          <EditBrandOrTypeModal
            name={Modals.type}
            show={show.editType}
            handleShow={() => handleShow(Modals.editType)}
          />
        )}
        {show.editBrand && (
          <EditBrandOrTypeModal
            name={Modals.brand}
            show={show.editBrand}
            handleShow={() => handleShow(Modals.editBrand)}
          />
        )}
        {show.editDevice && (
          <EditDeviceModal
            show={show.editDevice}
            handleShow={() => handleShow(Modals.editDevice)}
          />
        )}
      </Row>
    </Container>
  );
});

export default Admin;
