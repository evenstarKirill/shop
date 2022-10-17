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
import {
  IBrand,
  IBrands,
  IDevice,
  IType,
  ITypes,
} from '../../../../../Types&Interfaces/Interfaces/Interfaces';
import ModalWrapper from '../../../ModalWrapper/ModalWrapper';

interface IProps {
  show: boolean;
  handleShow: () => void;
}

const EditDeviceModal = observer(({ show, handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [deviceState, setDeviceState] = useState<IDevice>({} as IDevice);

  useEffect(() => {
    getTypes().then((data: ITypes) => device.setTypes(data));
    getBrands().then((data: IBrands) => device.setBrands(data));

    setDeviceState({
      name: device.selectedDevice.name,
      price: device.selectedDevice.price,
      file: device.selectedDevice.img,
      brandId: device.selectedDevice && device.selectedDevice.brandId,
      brandName:
        device.selectedDevice &&
        device.brands.rows &&
        (device.brands.rows.find(
          (brand: IBrand) => brand.id == device.selectedDevice.brandId,
        )?.name as string),
      typeId: device.selectedDevice && device.selectedDevice.typeId,
      typeName:
        device.selectedDevice &&
        device.types.rows &&
        device.types.rows.find(
          (type: IType) => type.id == device.selectedDevice.typeId,
        )?.name,
    } as IDevice);
  }, [show]);

  const selectFile = (e: any) => {
    setDeviceState((prevValue: IDevice) => ({
      ...prevValue,
      file: e.target.files[0],
    }));
  };

  const edit = (id: number) => {
    const formData = new FormData();
    formData.append('name', deviceState.name);
    formData.append('price', `${deviceState.price}`);
    formData.append('img', deviceState.file as string | Blob);
    formData.append('brandId', String(deviceState.brandId));
    formData.append('typeId', String(deviceState.typeId));

    editDevice(id, formData)
      .then((data) => {
        device.editDevice(data);
      })
      .then(() => handleShow());
  };

  return (
    <ModalWrapper show={show} handleShow={handleShow} name="Edit Device">
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {deviceState.typeName ||
                device.selectedDevice.typeName ||
                'Select type'}
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
              {deviceState.brandName ||
                device.selectedDevice.brandName ||
                'Select brand'}
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
                name: String(e.target.value),
              }))
            }
            value={deviceState.name}
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
            value={deviceState.price}
            placeholder="Add Price..."
            type="number"
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={(e: any) => selectFile(e)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Close
        </Button>
        <Button
          variant="outline-success"
          onClick={() =>
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
