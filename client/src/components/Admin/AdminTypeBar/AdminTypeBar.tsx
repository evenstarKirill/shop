import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

import { Context } from '../../..';

import Delete from '../../../assets/icons/Delete';
import Edit from '../../../assets/icons/Edit';

import { deleteType } from '../../../http/deviceApi';

interface IProps {
  handleShow: () => void;
}

const AdminTypeBar = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [allCount, setAllCount] = useState(3);

  return (
    <Form>
      <ListGroup as="ul">
        {device.types.rows &&
          device.types.rows.slice(0, allCount).map((type: any) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => device.setSelectedType(type)}
              // active={type.id === device.selectedType.id}
              key={type.id}
              className="p-2 m-0 d-flex justify-content-between"
            >
              <Form.Check inline className="m-0 p-0" type="checkbox" />
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
      <Button
        className="mt-3 mb-3 d-flex w-100 justify-content-center"
        variant="outline-primary"
        size="sm"
        onClick={() => setAllCount(device.brands.count)}
      >
        Show all
      </Button>
    </Form>
  );
});

export default AdminTypeBar;
