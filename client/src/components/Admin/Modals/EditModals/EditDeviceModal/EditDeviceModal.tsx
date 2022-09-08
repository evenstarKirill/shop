import { observer } from 'mobx-react-lite';
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';

import { Context } from '../../../../..';
import { getTypes, getBrands, editDevice } from '../../../../../http/deviceApi';
import ModalWrapper from '../../../ModalWrapper/ModalWrapper';

interface IProps {
  show: boolean;
  handleShow: () => void;
}

interface IDeviceState {
  name: string;
  price: number;
  file: string | Blob;
  brandId: string;
  brandName: string;
  typeId: string;
  typeName: string;
}

const EditDeviceModal = observer(({ show, handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [deviceState, setDeviceState] = useState<IDeviceState>({
    name: '',
    price: 0,
    file: '',
    brandId: '',
    brandName: '',
    typeId: '',
    typeName: '',
  });

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));

    setDeviceState({
      name: device.selectedDevice.name || '',
      price: device.selectedDevice.price || 0,
      file: '',
      brandId: '',
      brandName:
        (device.selectedDevice &&
          device.brands.rows &&
          device.brands.rows.find(
            (brand: any) => brand.id == device.selectedDevice.brandId,
          ).name) ||
        '',
      typeId: '',
      typeName:
        (device.selectedDevice &&
          device.types.rows &&
          device.types.rows.find(
            (type: any) => type.id == device.selectedDevice.typeId,
          ).name) ||
        '',
    });
  }, [show]);

  const selectFile = (e: any) => {
    setDeviceState((prevValue: any) => ({
      ...prevValue,
      file: e.target.files[0],
    }));
  };

  const edit = (id: string) => {
    const formData = new FormData();
    formData.append('name', deviceState.name);
    formData.append('price', `${deviceState.price}`);
    formData.append('img', deviceState.file);
    formData.append('brandId', deviceState.brandId);
    formData.append('typeId', deviceState.typeId);
    editDevice(id, formData).then(() => handleShow());
  };

  return (
    <ModalWrapper show={show} handleShow={handleShow} name="Edit Device">
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {deviceState.typeName ||
                device.selectedDevice.type ||
                'Select type'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.rows &&
                device.types.rows.map((type: any) => (
                  <Dropdown.Item
                    onClick={() =>
                      setDeviceState((prevValue: any) => ({
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
                device.brands.rows.map((brand: any) => (
                  <Dropdown.Item
                    onClick={() =>
                      setDeviceState((prevValue: any) => ({
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
              setDeviceState((prevValue: IDeviceState) => ({
                ...prevValue,
                name: e.target.value,
              }))
            }
            value={deviceState.name}
            className="mt-3"
            placeholder="Add Name..."
          />
          <Form.Control
            onChange={(e) =>
              setDeviceState((prevValue: any) => ({
                ...prevValue,
                price: e.target.value,
              }))
            }
            className="mt-3"
            value={deviceState.price}
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
        <Button
          variant="outline-success"
          onClick={
            edit(device.selectedDevice.id) as
              | MouseEventHandler<HTMLButtonElement>
              | undefined
          }
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </ModalWrapper>
  );
});

export default EditDeviceModal;
