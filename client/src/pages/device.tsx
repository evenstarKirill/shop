import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { getOneDevice } from '../http/deviceApi';
import { AxiosRequestConfig } from 'axios';
import { IDevice } from '../Types&Interfaces/Interfaces/Interfaces';

const Device = observer(() => {
  const { id } = useParams();

  const [device, setDevice] = useState<IDevice>({} as IDevice);

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
      <div>
        Name <b>{device.name}</b>
      </div>
      <div>
        Price <b>{device.price}</b>
      </div>
    </div>
  );
});
export default Device;
