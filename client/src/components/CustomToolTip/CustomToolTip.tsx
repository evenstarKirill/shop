import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import { Context } from '../..';
import { getFilteredDevices } from '../../http/deviceApi';

import styles from './CustomToolTip.module.scss';

interface IProps {
  target: any;
  show: boolean;
}

const CustomToolTip = observer(({ target, show }: IProps) => {
  const { device } = useContext(Context);

  return (
    <Overlay target={target} show={show} placement="left">
      {(props) => (
        <Tooltip
          className={styles.tooltip}
          onClick={() =>
            getFilteredDevices({
              brandsId: device.filtered.brandsId,
              typesId: device.filtered.typesId,
            }).then((data) => device.setDevices(data, true))
          }
          id="brand_toolTip"
          {...props}
        >
          Filter
        </Tooltip>
      )}
    </Overlay>
  );
});

export default CustomToolTip;
