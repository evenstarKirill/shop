import { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';

import { Context } from '../../../../..';
import {
  getTypes,
  getBrands,
  createDevice,
} from '../../../../../http/deviceApi';
import {
  IBrand,
  IDevice,
  IType,
} from '../../../../../Types&Interfaces/Interfaces/Interfaces';
import ModalWrapper from '../../../ModalWrapper/ModalWrapper';

interface IProps {
  show: boolean;
  handleShow: () => void;
}

const CreateDeviceModal = ({ show, handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [deviceState, setDeviceState] = useState<IDevice>({} as IDevice);

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));
  }, []);

  const selectFile = (e: any) => {
    setDeviceState((prevValue: IDevice) => ({
      ...prevValue,
      file: e.target.files[0],
    }));
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', deviceState.name);
    formData.append('price', `${deviceState.price}`);
    formData.append('img', deviceState.file as string | Blob);
    formData.append('brandId', String(deviceState.brandId));
    formData.append('typeId', String(deviceState.typeId));

    createDevice(formData)
      .then((data) => device.setDevices(data))
      .then(() => handleShow());
  };

  return (
    <ModalWrapper show={show} handleShow={handleShow} name="Create Device">
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {deviceState.typeName || 'Select type'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.rows &&
                device.types.rows.map((type: IType) => (
                  <Dropdown.Item
                    onClick={() =>
                      setDeviceState((prevValue: IDevice) => ({
                        ...prevValue,
                        typeId: type.id,
                        typeName: type.name,
                      }))
                    }
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {deviceState.brandName || 'Select brand'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.rows &&
                device.brands.rows.map((brand: IBrand) => (
                  <Dropdown.Item
                    onClick={() =>
                      setDeviceState((prevValue: IDevice) => ({
                        ...prevValue,
                        brandId: brand.id,
                        brandName: brand.name,
                      }))
                    }
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            onChange={(e) =>
              setDeviceState((prevValue: IDevice) => ({
                ...prevValue,
                name: e.target.value,
              }))
            }
            className="mt-3"
            placeholder="Add Name..."
          />
          <Form.Control
            onChange={(e) =>
              setDeviceState((prevValue: IDevice) => ({
                ...prevValue,
                price: Number(e.target.value),
              }))
            }
            className="mt-3"
            placeholder="Add Price..."
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Save Changes
        </Button>
      </Modal.Footer>
    </ModalWrapper>
  );
};

export default CreateDeviceModal;
