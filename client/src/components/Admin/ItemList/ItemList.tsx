import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';

import { Context } from '../../..';
import Item from '../Item/Item';

const ItemList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex align-items-center">
      {device.devices.rows &&
        device.devices.rows.map((device: any) => (
          <Item key={device.id} device={device} />
        ))}
    </Row>
  );
});

export default ItemList;
