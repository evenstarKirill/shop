import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../..';
import { getDevices } from '../../http/deviceApi';

const ResetButton = () => {
  const { device } = useContext(Context);

  return (
    <Button
      onClick={() =>
        getDevices().then((data) => {
          device.setDevices(data, false, true);
          device.setFilteredBrand([]);
          device.setFilteredType([]);
        })
      }
      className="mb-5"
    >
      Reset Filters
    </Button>
  );
};

export default ResetButton;
