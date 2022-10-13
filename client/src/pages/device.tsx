import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { getOneDevice } from '../http/deviceApi';
import { AxiosRequestConfig } from 'axios';

const Device = observer(() => {
  const { id } = useParams();

  const [device, setDevice] = useState<any>({});

  useEffect(() => {
    id &&
      getOneDevice(id as AxiosRequestConfig<number>).then((data) =>
        setDevice(data),
      );
  }, []);

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
