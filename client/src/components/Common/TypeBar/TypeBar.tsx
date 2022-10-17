import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

import { Context } from '../../..';

import Delete from '../../../assets/icons/Delete';
import Edit from '../../../assets/icons/Edit';

import { deleteType } from '../../../http/deviceApi';
import { IType } from '../../../Types&Interfaces/Interfaces/Interfaces';
import CustomCheck from '../CustomCheck/CustomCheck';
import CustomToolTip from '../CustomToolTip/CustomToolTip';

interface IProps {
  handleShow?: () => void;
}

const TypeBar = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  const [localTypesState, setLocalTypesState] = useState<IType[]>();

  const [allCount, setAllCount] = useState(3);

  const [show, setShow] = useState(false);

  const [selectedCheckBoxRef, setSelectedCheckBoxRef] =
    useState<React.RefObject<HTMLInputElement>>();

  const { user } = useContext(Context);

  const handleCheckBoxCLick = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    let updatedList: number[] = [];
    if (e.target.checked && !device.filtered.typesId) {
      updatedList = [Number(e.target.value)];
    } else if (e.target.checked && device.filtered.typesId) {
      updatedList = [...device.filtered.typesId, Number(e.target.value)];
    } else {
      updatedList.splice(
        device.filtered.typesId.indexOf(Number(e.target.value)),
        1,
      );
    }
    device.setFilteredType(updatedList);
    device.setTypeTooltipActive();
    setShow(true);
    setSelectedCheckBoxRef(ref);
  };

  useEffect(() => {
    setLocalTypesState(device.types.rows);
  }, [device.types.rows]);

  const handleDeleteType = async (id: number) => {
    if (!id || !localTypesState) {
      return;
    }

    await deleteType(id);
    const objWithIdIndex: number = localTypesState.findIndex(
      (obj: IType) => obj.id === id,
    );
    localTypesState.splice(objWithIdIndex, 1);
  };

  device.toolTipStatus.type && device.filtered.typesId.length >= 1 && show;

  return (
    <Form>
      <CustomToolTip
        show={
          device.toolTipStatus.type &&
          device.filtered.typesId.length >= 1 &&
          show
        }
        target={selectedCheckBoxRef?.current}
      />
      <ListGroup as="ul">
        {device.types.rows &&
          localTypesState?.slice(0, allCount).map((type: IType) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => device.setSelectedType(type)}
              key={type.id}
              className="p-2 m-0 d-flex justify-content-between"
            >
              <CustomCheck value={type.id} onCheck={handleCheckBoxCLick} />
              {type.name}
              <div className="d-flex mt-1 justify-content-between gap-2">
                {user.userRole === 'ADMIN' && (
                  <>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteType(type.id as number)}
                      size="sm"
                    >
                      <Delete />
                    </Button>
                    <Button variant="warning" onClick={handleShow} size="sm">
                      <Edit />
                    </Button>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Button
        className="mt-3 mb-3 d-flex w-100 justify-content-center"
        variant="outline-primary"
        size="sm"
        onClick={() => setAllCount(device.types.count as number)}
      >
        Show all
      </Button>
    </Form>
  );
});

export default TypeBar;
