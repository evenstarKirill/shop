import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';

import { Context } from '../..';
import DeviceItem from '../DeviceItem/DeviceItem';

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex align-items-center mt-5">
      {device.devices.rows &&
        device.devices.rows.map((device: any) => (
          <DeviceItem key={device.id} device={device} />
        ))}
    </Row>
  );
});

export default DeviceList;
