import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';

import { Context } from '../../..';
import AdminDeviceItem from '../AdminDeviceItem/AdminDeviceItem';

interface IProps {
  handleShow: () => void;
}

const AdminDeviceList = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex align-items-center">
      {device.devices.rows &&
        device.devices.rows.map((device: any) => (
          <AdminDeviceItem
            handleShow={handleShow}
            key={device.id}
            deviceProp={device}
          />
        ))}
    </Row>
  );
});

export default AdminDeviceList;
