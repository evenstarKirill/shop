import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';

import { Context } from '../../..';
import DeviceItem from '../DeviceItem/DeviceItem';
import { IDevice } from '../../../ts/Interfaces';

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex align-items-center mt-5">
      {device.devices.rows &&
        device.devices.rows.map((item: IDevice) => (
          <DeviceItem key={item.id} device={item} />
        ))}
    </Row>
  );
});

export default DeviceList;
