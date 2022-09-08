import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';

import { Context } from '../../..';

import Delete from '../../../assets/icons/Delete';
import Edit from '../../../assets/icons/Edit';

import { deleteType } from '../../../http/deviceApi';

interface IProps {
  handleShow: () => void;
}

const AdminTypeBar = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  return (
    <ListGroup as="ul">
      {device.types.rows &&
        device.types.rows.map((type: any) => (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            onClick={() => device.setSelectedType(type)}
            active={type.id === device.selectedType.id}
            key={type.id}
            className="p-2 d-flex justify-content-between"
          >
            {type.name}
            <div className="d-flex mt-1 justify-content-between gap-2">
              <Button
                variant="danger"
                onClick={() => deleteType(type.id)}
                size="sm"
              >
                <Delete />
              </Button>
              <Button variant="warning" onClick={handleShow} size="sm">
                <Edit />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
});

export default AdminTypeBar;
