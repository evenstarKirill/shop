import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, ListGroup } from 'react-bootstrap';

import { Context } from '../..';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup horizontal className="d-flex flex-row gap-3">
      {device.brands.map((brand: any) => (
        <Card
          style={{ cursor: 'pointer' }}
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'primary' : ''}
          key={brand.id}
          className="p-2"
        >
          {brand.name}
        </Card>
      ))}
    </ListGroup>
  );
});

export default BrandBar;
