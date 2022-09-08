import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createType } from '../../../../../http/deviceApi';
import ModalWrapper from '../../../ModalWrapper/ModalWrapper';

interface IProps {
  show: boolean;
  handleShow: () => void;
}

const CreateTypeModal = ({ show, handleShow }: IProps) => {
  const [value, setValue] = useState<string>('');

  const addType = () => {
    createType({ name: value }).then(() => setValue(''));
    handleShow();
  };

  return (
    <ModalWrapper show={show} handleShow={handleShow} name="Create Type">
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              placeholder="Type Type..."
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button onClick={addType} variant="primary" type="submit">
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

export default CreateTypeModal;
