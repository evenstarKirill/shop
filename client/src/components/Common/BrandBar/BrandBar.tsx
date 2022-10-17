import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, ListGroup } from 'react-bootstrap';

import { Context } from '../../..';
import { deleteBrand } from '../../../http/deviceApi';

import Delete from '../../../assets/icons/Delete';
import Edit from '../../../assets/icons/Edit';
import CustomCheck from '../CustomCheck/CustomCheck';

import CustomToolTip from '../CustomToolTip/CustomToolTip';
import { IBrand } from '../../../Types&Interfaces/Interfaces/Interfaces';
interface IProps {
  handleShow?: () => void;
}

const BrandBar = observer(({ handleShow }: IProps) => {
  const { device } = useContext(Context);

  const { user } = useContext(Context);

  const [allCount, setAllCount] = useState<number>(3);

  const [show, setShow] = useState(false);

  const [selectedCheckBoxRef, setSelectedCheckBoxRef] =
    useState<React.RefObject<HTMLInputElement>>();

  const [localBrandsState, setLocalBrandsState] = useState<IBrand[]>();

  useEffect(() => {
    setLocalBrandsState(device.brands.rows);
  }, [device.brands.rows]);

  const handleCheckBoxCLick = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    let updatedList: number[] = [];
    if (e.target.checked && !device.filtered.brandsId) {
      updatedList = [Number(e.target.value)];
    } else if (e.target.checked && device.filtered.brandsId) {
      updatedList = [...device.filtered.brandsId, Number(e.target.value)];
    } else {
      updatedList.splice(
        device.filtered.brandsId.indexOf(Number(e.target.value)),
        1,
      );
    }
    device.setFilteredBrand(updatedList);
    device.setBrandTooltipActive();
    setShow(true);
    setSelectedCheckBoxRef(ref);
  };

  const handleDeleteBrand = async (id: number | null | undefined) => {
    if (!id || !localBrandsState) {
      return;
    }
    await deleteBrand(id);
    const objWithIdIndex: number = localBrandsState.findIndex(
      (obj: IBrand) => obj.id === id,
    );
    localBrandsState.splice(objWithIdIndex, 1);
  };

  return (
    <Form>
      <CustomToolTip
        show={
          device.toolTipStatus.brand &&
          device.filtered.brandsId.length >= 1 &&
          show
        }
        target={selectedCheckBoxRef?.current}
      />
      <ListGroup>
        {device.brands.rows &&
          localBrandsState?.slice(0, allCount).map((brand: IBrand) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              key={brand.id}
              className="p-2 d-flex justify-content-between"
            >
              <CustomCheck value={brand.id} onCheck={handleCheckBoxCLick} />
              {brand.name}
              <div className="d-flex mt-1 justify-content-between gap-2">
                {user.userRole === 'ADMIN' && (
                  <>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBrand(brand.id)}
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
        onClick={() => setAllCount(device.brands.count as number)}
      >
        Show all
      </Button>
    </Form>
  );
});

export default BrandBar;
