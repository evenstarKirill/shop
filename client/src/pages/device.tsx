import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Context } from '..';
import { getDevice } from '../http/deviceApi';
import { AxiosRequestConfig } from 'axios';

const Device = observer(() => {
  const { id } = useParams();

  const [device, setDevice] = useState<any>({});

  useEffect(() => {
    id &&
      getDevice(id as AxiosRequestConfig<number>).then((data) =>
        setDevice(data),
      );
  }, []);
  getDevice;
  return (
    <div>
      <Image
        width={300}
        height={300}
        src={process.env.REACT_APP_HOST_URL + device.img}
      />
    </div>
  );
});
export default Device;
