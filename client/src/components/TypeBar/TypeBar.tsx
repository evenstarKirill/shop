import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  Card,
  Row,
  Col,
  ListGroup,
} from 'react-bootstrap';

import { Context } from '../..';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
      {device.types.map((type: any) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          onClick={() => device.setSelectedType(type)}
          active={type.id === device.selectedType.id}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
