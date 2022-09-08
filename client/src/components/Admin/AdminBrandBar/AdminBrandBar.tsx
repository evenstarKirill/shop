import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { Context } from '../../..';
import { deleteBrand } from '../../../http/deviceApi';
import Delete from '../../../assets/icons/Delete';
import Edit from '../../../assets/icons/Edit';

interface IProps {
  handleShow: () => void;
}

const AdminBrandBar = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  //TODO: ListItem component

  return (
    <ListGroup>
      {device.brands.rows &&
        device.brands.rows.map((brand: any) => (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            onClick={() => device.setSelectedBrand(brand)}
            active={brand.id === device.selectedBrand.id}
            key={brand.id}
            className="p-2 d-flex justify-content-between"
          >
            {brand.name}
            <div className="d-flex mt-1 justify-content-between gap-2">
              <Button
                variant="danger"
                onClick={() => deleteBrand(brand.id)}
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

export default AdminBrandBar;
