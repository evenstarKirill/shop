import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import { Context } from '../../..';
import { deleteDevice } from '../../../http/deviceApi';
import { IDevice } from '../../../Types&Interfaces/Interfaces/Interfaces';
import AdminDeviceItem from '../AdminDeviceItem/AdminDeviceItem';

interface IProps {
  handleShow: () => void;
}

const AdminDeviceList = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [localDevicesState, setLocalDevicesState] = useState<IDevice[]>();

  useEffect(() => {
    setLocalDevicesState(device.devices.rows);
  }, [device.devices.rows]);

  const handleDeleteDevice = async (id: number | null) => {
    if (!id || !localDevicesState) {
      return;
    }
    await deleteDevice(id);
    const objWithIdIndex: number = localDevicesState.findIndex(
      (obj: IDevice) => obj.id === id,
    );
    localDevicesState?.splice(objWithIdIndex, 1);
  };

  return (
    <Row className="d-flex align-items-center">
      {localDevicesState &&
        localDevicesState.map((device: IDevice) => (
          <AdminDeviceItem
            handleDeleteDevice={handleDeleteDevice}
            handleShow={handleShow}
            key={device.id}
            deviceProp={device}
          />
        ))}
    </Row>
  );
});

export default AdminDeviceList;
