import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Card,
  Form,
  FormCheck,
  ListGroup,
  Overlay,
  Tooltip,
} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

import { Context } from '../../..';
import { deleteBrand } from '../../../http/deviceApi';
import Delete from '../../../assets/icons/Delete';
import Edit from '../../../assets/icons/Edit';

interface IProps {
  handleShow: () => void;
}

const AdminBrandBar = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [show, setShow] = useState(false);
  const target = useRef<any>();

  const [allCount, setAllCount] = useState(3);

  //TODO: ListItem component

  return (
    <Form>
      <ListGroup>
        {device.brands.rows &&
          device.brands.rows.slice(0, allCount).map((brand: any) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => device.setSelectedBrand(brand)}
              // active={brand.id === device.selectedBrand.id}
              key={brand.id}
              className="p-2 d-flex justify-content-between"
            >
              <Form.Check
                data-tip="Filter"
                data-event="click"
                type="checkbox"
              />
              <ReactTooltip place="left" globalEventOff="click" />
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

export default AdminBrandBar;
