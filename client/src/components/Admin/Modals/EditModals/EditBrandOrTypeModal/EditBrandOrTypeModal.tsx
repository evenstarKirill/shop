import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from '../../../../..';
import { editBrand, editType } from '../../../../../http/deviceApi';
import ModalWrapper from '../../../ModalWrapper/ModalWrapper';

interface IProps {
  show: boolean;
  handleShow: () => void;
  name: string;
}

const EditBrandOrTypeModal = observer(({ show, handleShow, name }: IProps) => {
  const { device } = useContext(Context);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(
      name === 'type' ? device.selectedType.name : device.selectedBrand.name,
    );
  }, [show]);

  const edit = (name: string) => {
    if (name === 'brand') {
      editBrand(device.selectedBrand.id as number, { name: value })
        .then((data) => device.editBrand(data))
        .then(() => setValue(''));
    }
    if (name === 'type') {
      editType(device.selectedType.id as number, { name: value })
        .then((data) => device.editType(data))
        .then(() => setValue(''));
    }
    handleShow();
  };

  return (
    <ModalWrapper show={show} handleShow={handleShow} name={`Edit ${name}`}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              placeholder={`Type new ${name}`}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button onClick={() => edit(name)} variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleShow}>
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </ModalWrapper>
  );
});

export default EditBrandOrTypeModal;
