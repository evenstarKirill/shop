import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { Context } from '..';
import { getTypes, getDevice, getBrands } from '../http/deviceApi';

import AdminBrandBar from '../components/Admin/AdminBrandBar/AdminBrandBar';
import CreateButton from '../components/Admin/CreateButton/CreateButton';
import AdminDeviceList from '../components/Admin/AdminDeviceList/AdminDeviceList';
import CreateDeviceModal from '../components/Admin/Modals/CreateModals/CreateDeviceModal/CreateDeviceModal';
import CreateBrandModal from '../components/Admin/Modals/CreateModals/CreateBrandModal/CreateBrandModal';
import CreateTypeModal from '../components/Admin/Modals/CreateModals/CreateTypeModal/CreateTypeModal';
import AdminTypeBar from '../components/Admin/AdminTypeBar/AdminTypeBar';
import EditBrandOrTypeModal from '../components/Admin/Modals/EditModals/EditBrandOrTypeModal/EditBrandOrTypeModal';
import EditDeviceModal from '../components/Admin/Modals/EditModals/EditDeviceModal/EditDeviceModal';

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
    getTypes(3, 1).then((data) => device.setTypes(data));
    getDevice().then((data) => {
      device.setDevices(data);
    });
    getBrands(3, 1).then((data) => device.setBrands(data));
  }, []);

  //TODO: button "show all" - separate component

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <CreateButton
              name={Modals.type}
              handleShow={() => handleShow(Modals.type)}
            />
            <Form.Label>Types</Form.Label>
            <Form.Control placeholder="Search..." />
          </Form.Group>
          <AdminTypeBar handleShow={() => handleShow(Modals.editType)} />
          <Button
            className="mt-3 mb-3 d-flex w-100 justify-content-center"
            variant="outline-primary"
            size="sm"
            onClick={() => getTypes().then((data) => device.setTypes(data))}
          >
            Show all
          </Button>
          <div className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <CreateButton
                name={Modals.brand}
                handleShow={() => handleShow(Modals.brand)}
              />
              <Form.Label>Brands</Form.Label>
              <Form.Control placeholder="Search..." />
            </Form.Group>
            <AdminBrandBar handleShow={() => handleShow(Modals.editBrand)} />
            <Button
              className="mt-3 mb-3 d-flex w-100 justify-content-center"
              variant="outline-primary"
              size="sm"
              onClick={() => getBrands().then((data) => device.setBrands(data))}
            >
              Show all
            </Button>
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
