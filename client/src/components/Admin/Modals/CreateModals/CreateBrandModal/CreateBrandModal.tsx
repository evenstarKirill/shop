import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createBrand } from '../../../../../http/deviceApi';
import ModalWrapper from '../../../ModalWrapper/ModalWrapper';

interface IProps {
  show: boolean;
  handleShow: () => void;
}

const CreateBrandModal = ({ show, handleShow }: IProps) => {
  const [value, setValue] = useState<string>('');

  const addBrand = () => {
    createBrand({ name: value }).then(() => setValue(''));
    handleShow();
  };
  return (
    <ModalWrapper show={show} handleShow={handleShow} name="Create Brand">
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              placeholder="Type Brand..."
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button onClick={addBrand} variant="primary" type="submit">
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
};

export default CreateBrandModal;
